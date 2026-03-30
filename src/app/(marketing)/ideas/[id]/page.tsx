import { Suspense } from "react";
import { IdeaDetailsContent } from "@/components/features/ideas/IdeaDetailsContent";
import { getIdeaById } from "@/actions/idea.actions";
import { fetchServer } from "@/lib/api-server";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { IdeaDetailsSkeleton } from "@/components/features/ideas/IdeaDetailsSkeleton";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function IdeaDetailsDataFetcher({ id }: { id: string }) {
  try {
    const idea = await getIdeaById(id);
    const commentsRes = await fetchServer(`/comments/ideas/${id}`);
    const comments = commentsRes.data;

    // Fetch recommended ideas (same category, limit 4)
    const { getIdeas } = await import("@/actions/idea.actions");
    const recommendedIdeasRes = await getIdeas({ 
      categoryId: idea.categoryId,
      limit: 5, // Get 5 to ensure we have 4 if current is included
      sortBy: "createdAt",
      sortOrder: "desc"
    });
    const recommendedIdeas = recommendedIdeasRes.data.filter((i: any) => i.id !== id).slice(0, 4);

    return <IdeaDetailsContent idea={idea} comments={comments} recommendedIdeas={recommendedIdeas} />;
  } catch (error) {
    console.error("Error fetching idea:", error);
    return notFound();
  }
}

export default async function IdeaDetailsPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <Link 
        href="/ideas" 
        className="mb-8 inline-flex items-center text-sm font-black uppercase tracking-widest text-zinc-400 hover:text-primary transition-all active:scale-95 group"
      >
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> 
        Back to all ideas
      </Link>
      
      <Suspense fallback={<IdeaDetailsSkeleton />}>
        <IdeaDetailsDataFetcher id={id} />
      </Suspense>
    </div>
  );
}
