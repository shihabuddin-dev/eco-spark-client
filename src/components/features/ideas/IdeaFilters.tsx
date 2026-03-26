"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Category } from "@/types";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export const IdeaFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("searchTerm") || "");

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response: any = await api.get("/categories");
      return response.data;
    },
  });

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    router.push(`/ideas?${params.toString()}`);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      updateFilters("searchTerm", searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950 lg:flex-row lg:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <Input
          placeholder="Search ideas..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          className="h-10 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          value={searchParams.get("categoryId") || ""}
          onChange={(e) => updateFilters("categoryId", e.target.value)}
        >
          <option value="">All Categories</option>
          {categories?.map((cat: Category) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <select
          className="h-10 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          value={searchParams.get("sortBy") || "createdAt"}
          onChange={(e) => updateFilters("sortBy", e.target.value)}
        >
          <option value="createdAt">Recent</option>
          <option value="votes">Top Voted</option>
          <option value="comments">Most Commented</option>
        </select>

        <select
          className="h-10 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          value={searchParams.get("isPaid") || ""}
          onChange={(e) => updateFilters("isPaid", e.target.value)}
        >
          <option value="">All Types</option>
          <option value="true">Paid</option>
          <option value="false">Free</option>
        </select>
        
        <Button variant="ghost" size="icon" onClick={() => router.push("/ideas")}>
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
