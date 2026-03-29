import { Suspense } from "react";
import { IdeaList } from "@/components/features/ideas/IdeaList";
import { IdeaFilters } from "@/components/features/ideas/IdeaFilters";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { getIdeas } from "@/actions/idea.actions";
import { IdeaListSkeleton } from "@/components/features/ideas/IdeaListSkeleton";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function IdeasDataFetcher({ searchParams }: { searchParams: any }) {
  const params = await searchParams;
  const ideas = await getIdeas({
    ...params,
    status: "APPROVED",
  });

  return <IdeaList initialData={ideas} />;
}

export default function IdeasPage({ searchParams }: PageProps) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 space-y-12">
      <SectionHeader 
        title="Sustainability Ideas"
        subtitle="Explore and support community-driven projects aimed at reducing environmental impact and promoting a greener future."
        badge="Browse"
      />

      <IdeaFilters />

      <Suspense fallback={<IdeaListSkeleton />}>
        <IdeasDataFetcher searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
