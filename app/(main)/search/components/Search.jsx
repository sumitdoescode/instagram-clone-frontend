"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Section from "@/components/Section";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchResults from "./SearchResults";

const Search = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    const [searchText, setSearchText] = useState(query || "");
    const router = useRouter();

    // Sync input with URL query
    useEffect(() => {
        setSearchText(query || "");
    }, [query]);

    const handleSearch = () => {
        if (!searchText.trim()) return;
        router.push(`/search?query=${searchText.trim()}`);
    };

    return (
        <Section>
            <div className="max-w-lg w-full mx-auto">
                <div className="flex flex-col items-center gap-2 w-full">
                    <Input type="text" placeholder="Search..." value={searchText} onChange={(e) => setSearchText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} className="text-xl" />
                    <Button onClick={handleSearch} className="self-end">
                        Search
                    </Button>
                </div>
                <SearchResults query={query} />
            </div>
        </Section>
    );
};

export default Search;
