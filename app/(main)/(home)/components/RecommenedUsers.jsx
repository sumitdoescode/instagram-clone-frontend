"use client";
import React from "react";
import useSWR from "swr";
import { useAuth } from "@clerk/nextjs";
import { fetchWithToken } from "@/utils/fetcher";
import GlobalSpinner from "@/components/GlobalSpinner";

import UserFollowUnfollowCard from "../../components/UserFollowUnfollowCard";

const RecommendedUsers = () => {
    const { getToken } = useAuth();

    const fetcher = async () => {
        const token = await getToken();
        const { data, error } = await fetchWithToken("/user/recommended", token);
        if (error) throw new Error("Failed to fetch recommended users");
        return data;
    };

    const { data, error, isLoading } = useSWR("/user/recommended", fetcher);
    if (isLoading) return <GlobalSpinner />;
    if (error) return <p className="text-base mt-5 text-red-500">❌ Error fetching recommended users</p>;
    if (!data?.users?.length) return <p className="text-base mt-5">There are no recommened users yet</p>;

    return (
        <div className="w-full">
            <div className="flex flex-col items-center gap-6">
                {data.users.map((user) => (
                    <UserFollowUnfollowCard key={user._id} {...user} />
                ))}
            </div>
        </div>
    );
};

export default RecommendedUsers;
