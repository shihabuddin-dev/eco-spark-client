export const dynamic = "force-dynamic";

import { ApiResponse, Idea, Comment } from "@/types";
import { IdeaDetailsContent } from "@/components/features/ideas/IdeaDetailsContent";
import { getIdeaById } from "@/actions/idea.actions";
import { fetchServer } from "@/lib/api-server";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function IdeaDetailsPage({ params }: PageProps) {
  const { id } = await params;
  
  try {
    const idea: Idea = await getIdeaById(id);
    const commentsRes: ApiResponse<Comment[]> = await fetchServer(`/comments/ideas/${id}`);

    const comments: Comment[] = commentsRes.data;

    return (
      <div className="mx-auto max-w-7xl px-6 py-12">
        <Link href="/ideas" className="mb-8 inline-flex items-center text-sm font-medium text-zinc-500 hover:text-primary transition-colors">
           <ArrowLeft className="mr-2 h-4 w-4" /> Back to all ideas
        </Link>
        
        <IdeaDetailsContent idea={idea} comments={comments} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching idea:", error);
    return notFound();
  }
}
