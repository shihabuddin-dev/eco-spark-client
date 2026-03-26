"use client";

import { Idea, Comment } from "@/types";
import { useAuth } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/Button";
import { ArrowUp, ArrowDown, Tag, Calendar, User, ShieldCheck, Lock } from "lucide-react";
import { useState } from "react";
import { CommentSection } from "@/components/shared/CommentSection";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

import { voteIdea, purchaseIdea } from "@/actions/idea.actions";

interface IdeaDetailsContentProps {
  idea: Idea;
  comments: Comment[];
}

export const IdeaDetailsContent = ({ idea, comments }: IdeaDetailsContentProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const voteMutation = useMutation({
    mutationFn: async (type: "UPVOTE" | "DOWNVOTE") => {
       const result = await voteIdea(idea.id, type);
       if (!result.success) throw new Error(result.error);
       return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["idea", idea.id] });
      toast.success("Vote recorded");
    },
    onError: (err: any) => toast.error(err.message || err),
  });

  const purchaseMutation = useMutation({
    mutationFn: async () => {
       const result = await purchaseIdea(idea.id);
       if (!result.success) throw new Error(result.error);
       return result.data;
    },
    onSuccess: (data: any) => {
       if (data.url) {
         window.location.href = data.url;
       }
    },
    onError: (err: any) => toast.error(err.message || err),
  });

  const isVisible = !idea.isPaid || idea.authorId === user?.id || idea.hasPurchased;

  return (
    <div className="grid gap-12 lg:grid-cols-3">
      {/* Sidebar: Stats & Info */}
      <div className="lg:col-span-1 space-y-6">
        <div className="sticky top-24 space-y-6">
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950 shadow-sm">
             <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-4 w-full justify-between">
                   <div className="flex flex-col items-center flex-1 border-r border-zinc-200 dark:border-zinc-800">
                      <span className="text-2xl font-bold">{idea._count?.votes || 0}</span>
                      <span className="text-xs text-zinc-500 uppercase font-bold tracking-tight">Votes</span>
                   </div>
                   <div className="flex flex-col items-center flex-1">
                      <span className="text-2xl font-bold">{idea._count?.comments || 0}</span>
                      <span className="text-xs text-zinc-500 uppercase font-bold tracking-tight">Comments</span>
                   </div>
                </div>

                <div className="flex w-full gap-2">
                   <Button 
                    variant={idea.userVote === "UPVOTE" ? "default" : "outline"} 
                    className="flex-1 rounded-xl h-12"
                    onClick={() => voteMutation.mutate("UPVOTE")}
                   >
                     <ArrowUp className="mr-2 h-4 w-4" /> Upvote
                   </Button>
                   <Button 
                    variant={idea.userVote === "DOWNVOTE" ? "default" : "outline"}
                    className="flex-1 rounded-xl h-12"
                    onClick={() => voteMutation.mutate("DOWNVOTE")}
                   >
                     <ArrowDown className="mr-2 h-4 w-4" /> Downvote
                   </Button>
                </div>
             </div>

             <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800 space-y-4">
                {idea.author && (
                  <div className="flex items-center gap-3 text-sm">
                     <User className="h-4 w-4 text-zinc-400" />
                     <span className="text-zinc-600 dark:text-zinc-400">By {idea.author.name || "Unknown Author"}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm">
                   <Calendar className="h-4 w-4 text-zinc-400" />
                   <span className="text-zinc-600 dark:text-zinc-400">{format(new Date(idea.createdAt), "PPP")}</span>
                </div>
                {idea.category && (
                  <div className="flex items-center gap-3 text-sm">
                     <Tag className="h-4 w-4 text-zinc-400" />
                     <span className="text-zinc-600 dark:text-zinc-400">{idea.category.name || "Uncategorized"}</span>
                  </div>
                )}
             </div>
          </div>

          {idea.isPaid && !isVisible && (
             <div className="rounded-3xl bg-primary/5 border border-primary/20 p-8 text-center space-y-4">
                <Lock className="h-10 w-10 text-primary mx-auto" />
                <h3 className="text-xl font-bold">Premium Content</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  This idea contains detailed implementation steps and resources exclusive to supporters.
                </p>
                <div className="pt-2">
                  <span className="text-3xl font-bold">${idea.price}</span>
                </div>
                <Button 
                  className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20"
                  onClick={() => purchaseMutation.mutate()}
                  disabled={purchaseMutation.isPending}
                >
                  {purchaseMutation.isPending ? "Connecting..." : "Unlock Full Access"}
                </Button>
             </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-2 space-y-12">
        <div className="space-y-6">
           <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:leading-[1.1]">
             {idea.title}
           </h1>
           <div className="aspect-video overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <img 
                src={idea.images?.[0] || "https://images.unsplash.com/photo-1473081556163-2a17de81fc97?q=80&w=2000"} 
                className="h-full w-full object-cover" 
                alt={idea.title} 
              />
           </div>
        </div>

        <div className="space-y-10 prose prose-zinc dark:prose-invert max-w-none">
           <section>
              <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
                 <ShieldCheck className="h-6 w-6 text-primary" />
                 Problem Statement
              </h2>
              <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                 {idea.problemStatement}
              </p>
           </section>

           <section>
              <h2 className="text-2xl font-bold mb-4">Proposed Solution</h2>
              <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900 p-8 border border-zinc-100 dark:border-zinc-800">
                 <p className="text-lg leading-relaxed text-zinc-800 dark:text-zinc-200">
                    {idea.proposedSolution}
                 </p>
              </div>
           </section>

           {isVisible ? (
             <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold mb-4">Detailed Implementation</h2>
                <div className="whitespace-pre-wrap text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                   {idea.description}
                </div>
             </section>
           ) : (
             <div className="h-32 bg-gradient-to-b from-zinc-100/50 to-transparent dark:from-zinc-900/50 rounded-b-3xl mt-[-100px] relative z-0 pointer-events-none" />
           )}
        </div>

        <div className="pt-12 border-t border-zinc-200 dark:border-zinc-800">
           <CommentSection ideaId={idea.id} initialComments={comments} />
        </div>
      </div>
    </div>
  );
};
