"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { IdeaCard } from "@/components/shared/IdeaCard";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function CommunityFavoritesSection() {
  const { data: ideasData } = useQuery({
    queryKey: ["featured-ideas"],
    queryFn: async () => {
      const response: any = await api.get("/ideas?limit=6&status=APPROVED");
      return response.data;
    },
  });

  return (
    <section className="bg-zinc-50 dark:bg-[#09090b] border-y border-zinc-200 dark:border-white/10 py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <SectionHeader 
          title="Teams trust EcoSpark"
          subtitle="To build, deploy, and scale reliable ideas in real-world production."
          badge="Trusted Community"
          align="center"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {ideasData?.slice(0, 3).map((idea: any) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      </div>
    </section>
  );
}
