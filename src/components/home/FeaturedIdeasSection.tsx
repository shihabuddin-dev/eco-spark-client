"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { IdeaCard } from "@/components/shared/IdeaCard";
import { IdeaCardSkeleton } from "@/components/shared/IdeaCardSkeleton";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function FeaturedIdeasSection() {
  const { data: ideasData, isLoading } = useQuery({
    queryKey: ["featured-ideas"],
    queryFn: async () => {
      // Fetching 8 items to fill two rows of a 4-column grid
      const response: any = await api.get("/ideas?limit=8&status=APPROVED");
      return response.data;
    },
  });

  return (
    <section className="container mx-auto px-6 max-w-7xl py-32">
      <SectionHeader
        title="Eco Innovation Hub"
        subtitle="Explore the latest community-driven sustainability projects making a real impact today."
        badge="Sustainability"
      />

      <div className="min-h-[600px]">
        {isLoading ? (
          <IdeaCardSkeleton count={8} />
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {ideasData?.map((idea: any) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center mt-16">
        <Button
          asChild
          variant="outline"
          className="py-6 px-10 rounded-2xl font-black text-lg gap-3 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-950 transition-all active:scale-95 shadow-xl shadow-zinc-200/50 dark:shadow-none group"
        >
          <Link href="/ideas">
            <Sparkles className="h-5 w-5 text-emerald-500 group-hover:rotate-12 transition-transform" />
            Explore All Ideas
            <ArrowRight className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
