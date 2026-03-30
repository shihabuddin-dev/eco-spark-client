"use client";

import { Idea, Comment } from "@/types";
import { useAuth } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/Button";
import { ArrowUp, ArrowDown, Tag, Calendar, User, ShieldCheck, Lock, Share2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { CommentSection } from "@/components/shared/CommentSection";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { IdeaCard } from "@/components/shared/IdeaCard";

import { voteIdea, purchaseIdea, getIdeaById } from "@/actions/idea.actions";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

interface IdeaDetailsContentProps {
  idea: Idea;
  comments: Comment[];
  recommendedIdeas?: Idea[];
}

export const IdeaDetailsContent = ({ idea: initialIdea, comments, recommendedIdeas = [] }: IdeaDetailsContentProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();

  // Use react-query for real-time-ish updates and syncing
  const { data: idea } = useQuery({
    queryKey: ["idea", initialIdea.id],
    queryFn: () => getIdeaById(initialIdea.id),
    initialData: initialIdea,
    refetchInterval: 30000, // Poll every 30s to keep it "real-time" from DB
    staleTime: 10000,
  });

  // Local state for optimistic UI updates
  const [localNetVotes, setLocalNetVotes] = useState(idea.netVotes || 0);
  const [localUserVote, setLocalUserVote] = useState(idea.userVote);

  // Sync local state when query data changes (e.g. from other users' votes or refetch)
  useEffect(() => {
    setLocalNetVotes(idea.netVotes || 0);
    setLocalUserVote(idea.userVote);
  }, [idea.netVotes, idea.userVote]);

  const voteMutation = useMutation({
    mutationFn: async (type: "UPVOTE" | "DOWNVOTE") => {
      // Optimistic logic
      let newNetVotes = localNetVotes;
      let newUserVote: "UPVOTE" | "DOWNVOTE" | null = type;

      if (localUserVote === type) {
        // Un-voting
        newNetVotes = type === "UPVOTE" ? localNetVotes - 1 : localNetVotes + 1;
        newUserVote = null;
      } else if (localUserVote === null) {
        // New vote
        newNetVotes = type === "UPVOTE" ? localNetVotes + 1 : localNetVotes - 1;
        newUserVote = type;
      } else {
        // Switching vote
        newNetVotes = type === "UPVOTE" ? localNetVotes + 2 : localNetVotes - 2;
        newUserVote = type;
      }

      setLocalNetVotes(newNetVotes);
      setLocalUserVote(newUserVote);

      const result = await voteIdea(idea.id, type);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["idea", idea.id] });
      toast.success("Vote recorded");
      // router.refresh(); // No longer needed as useQuery handles it
    },
    onError: (err: any) => {
      // Rollback on error
      setLocalNetVotes(idea.netVotes || 0);
      setLocalUserVote(idea.userVote);
      toast.error(err.message || err);
    },
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
    <section className="relative w-full">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 -top-24 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.05),transparent_40%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Main Content Area - Left */}
        <div className="flex-1 space-y-12">
          {/* Header Section */}
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
             <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                   <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 backdrop-blur-sm">
                      <Sparkles className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
                         {idea.category?.name || "Innovation"}
                      </span>
                   </div>
                   <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                      {format(new Date(idea.createdAt), "MMM d, yyyy")}
                   </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[1.1]">
                  {idea.title}
                </h1>
             </div>
             
             <div className="aspect-video overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl relative group">
                <img 
                  src={idea.images?.[0] || "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2000"} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt={idea.title} 
                />
             </div>
          </div>

          {/* Narrative Content */}
          <div className="space-y-16 max-w-3xl">
             <section className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="h-0.5 w-8 bg-emerald-500/20 rounded-full" />
                   <h2 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">The Problem</h2>
                </div>
                <p className="text-xl md:text-2xl font-medium leading-relaxed text-zinc-600 dark:text-zinc-400 tracking-tight">
                   {idea.problemStatement}
                </p>
             </section>

             <section className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="h-0.5 w-8 bg-emerald-500 rounded-full" />
                   <h2 className="text-[10px] font-black uppercase tracking-widest text-emerald-500">The Solution</h2>
                </div>
                <div className="relative p-8 md:p-10 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 shadow-md">
                   <p className="text-xl md:text-2xl font-black leading-snug text-zinc-900 dark:text-white tracking-tight italic">
                      "{idea.proposedSolution}"
                   </p>
                </div>
             </section>

             {isVisible && (
               <section className="space-y-4">
                  <div className="flex items-center gap-3">
                     <div className="h-0.5 w-8 bg-emerald-500/20 rounded-full" />
                     <h2 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Technical Details</h2>
                  </div>
                  <div className="whitespace-pre-wrap text-lg leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
                     {idea.description}
                  </div>
               </section>
             )}
          </div>

          <div className="pt-16 border-t border-zinc-100 dark:border-zinc-900">
             <CommentSection idea={idea} initialComments={comments} />
          </div>
        </div>

        {/* Sidebar Controls - Right */}
        <div className="lg:w-[320px] shrink-0">
          <div className="sticky top-24 space-y-8">
            {/* Stats & Actions */}
            <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-8">
               <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-6">
                  <div className="text-center">
                     <span className="block text-2xl font-black text-zinc-900 dark:text-white">{localNetVotes}</span>
                     <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Score</span>
                  </div>
                  <div className="w-px h-8 bg-zinc-100 dark:bg-zinc-800" />
                  <div className="text-center">
                     <span className="block text-2xl font-black text-emerald-500">{idea._count?.comments || 0}</span>
                     <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Comments</span>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-2">
                  <Button 
                      variant="outline"
                      className={`h-12 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${localUserVote === "UPVOTE" ? "bg-emerald-500 text-white border-emerald-500" : "bg-transparent text-zinc-500"}`}
                      onClick={() => voteMutation.mutate("UPVOTE")}
                      disabled={voteMutation.isPending}
                  >
                      <ArrowUp className="mr-1.5 h-3.5 w-3.5" /> Up
                  </Button>
                  <Button 
                      variant="outline"
                      className={`h-12 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${localUserVote === "DOWNVOTE" ? "bg-rose-500 text-white border-rose-500" : "bg-transparent text-zinc-500"}`}
                      onClick={() => voteMutation.mutate("DOWNVOTE")}
                      disabled={voteMutation.isPending}
                  >
                      <ArrowDown className="mr-1.5 h-3.5 w-3.5" /> Down
                  </Button>
               </div>

               <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                     <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                        {idea.author?.name?.charAt(0) || "A"}
                     </div>
                     <div className="overflow-hidden">
                        <span className="block text-[11px] font-black text-zinc-900 dark:text-white truncate">{idea.author?.name || "Architect"}</span>
                        <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-tighter">Idea Creator</span>
                     </div>
                  </div>
                  <Button variant="ghost" className="w-full justify-center gap-2 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-400 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800">
                     <Share2 className="h-3.5 w-3.5" /> Share
                  </Button>
               </div>
            </div>

            {/* Premium Purchase Card */}
            {idea.isPaid && !isVisible && (
              <div className="rounded-2xl bg-zinc-950 p-8 text-center space-y-6 shadow-xl border border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500" />
                  
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-emerald-400">
                     <Lock className="h-5 w-5" />
                  </div>
                  
                  <div className="space-y-2">
                     <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">Technical Blueprint</h3>
                     <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">Access full implementation details and secure communication channels.</p>
                  </div>

                  <div className="pt-2">
                     <div className="flex items-center justify-center gap-1.5 mb-6">
                        <span className="text-3xl font-black text-white tracking-tighter">${idea.price}</span>
                        <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest pt-1">USD</span>
                     </div>
                     <Button 
                        className="w-full h-12 rounded-xl font-black text-[11px] uppercase tracking-widest bg-emerald-500 text-white hover:bg-emerald-400 transition-all active:scale-95"
                        onClick={() => purchaseMutation.mutate()}
                        disabled={purchaseMutation.isPending}
                     >
                       {purchaseMutation.isPending ? "Connecting..." : "Get Access"}
                     </Button>
                  </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommended Ideas Section */}
      {recommendedIdeas.length > 0 && (
        <div className="mt-24 pt-24 border-t border-zinc-100 dark:border-zinc-900 space-y-12">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase italic">
                Discovery <span className="text-emerald-500">Hub</span>
              </h2>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Recommended for you based on this category</p>
            </div>
            <Button 
              variant="outline" 
              className="rounded-xl font-black text-[10px] uppercase tracking-widest h-10 px-6 border-zinc-200 dark:border-zinc-800"
              onClick={() => router.push("/ideas")}
            >
              View More
            </Button>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {recommendedIdeas.map((recIdea) => (
              <IdeaCard key={recIdea.id} idea={recIdea} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
