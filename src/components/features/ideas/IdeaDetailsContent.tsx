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

import { voteIdea, purchaseIdea } from "@/actions/idea.actions";

interface IdeaDetailsContentProps {
  idea: Idea;
  comments: Comment[];
}

export const IdeaDetailsContent = ({ idea, comments }: IdeaDetailsContentProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();

  const voteMutation = useMutation({
    mutationFn: async (type: "UPVOTE" | "DOWNVOTE") => {
       const result = await voteIdea(idea.id, type);
       if (!result.success) throw new Error(result.error);
       return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["idea", idea.id] });
      toast.success("Vote recorded");
      router.refresh();
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
    <section className="relative w-full">
      {/* Background Hero Patterns (Matching Home Page) */}
      <div className="absolute inset-0 -top-48 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.12),transparent_50%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[800px] bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-50" />

      <div className="relative z-10 flex flex-col lg:flex-row gap-20">
        {/* Main Content Area - Left */}
        <div className="flex-1 space-y-20">
          {/* Header Section */}
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-4">
                   {/* Glowy Pill Badge */}
                   <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 dark:border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.05)]">
                      <Sparkles className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
                         {idea.category?.name || "Innovation"}
                      </span>
                   </div>
                   <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest pl-2">
                      {format(new Date(idea.createdAt), "MMMM d, yyyy")}
                   </span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[0.9] max-w-4xl">
                  {idea.title.split(' ').map((word, i) => (
                    i === 0 ? <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-cyan-600 dark:from-emerald-400 dark:via-emerald-300 dark:to-cyan-400">{word} </span> : word + ' '
                  ))}
                </h1>
             </div>
             
             <div className="aspect-[21/9] overflow-hidden rounded-[3rem] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl relative group ring-1 ring-zinc-100 dark:ring-zinc-800">
                <img 
                  src={idea.images?.[0] || "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2000"} 
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  alt={idea.title} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
             </div>
          </div>

          {/* Narrative Modules */}
          <div className="grid gap-24 max-w-3xl">
             <section className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                <div className="flex items-center gap-4">
                   <div className="h-0.5 w-12 bg-emerald-500/30 rounded-full" />
                   <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">The Challenge</h2>
                </div>
                <p className="text-2xl md:text-3xl font-medium leading-[1.4] text-zinc-600 dark:text-zinc-400 tracking-tight">
                   {idea.problemStatement}
                </p>
             </section>

             <section className="space-y-10 group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                <div className="flex items-center gap-4">
                   <div className="h-0.5 w-12 bg-emerald-500" />
                   <h2 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500">The Solution Architecture</h2>
                </div>
                <div className="relative p-10 md:p-14 rounded-[3.5rem] bg-white/50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 backdrop-blur-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] dark:shadow-none overflow-hidden transition-all duration-500 hover:border-emerald-500/30">
                   <div className="absolute -top-12 -right-12 h-64 w-64 bg-emerald-500/10 blur-[100px] pointer-events-none group-hover:bg-emerald-500/15 transition-all" />
                   <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-20 transition-all duration-700">
                      <ShieldCheck className="h-40 w-40 text-emerald-500" />
                   </div>
                   <p className="text-2xl md:text-4xl font-black leading-[1.2] text-zinc-950 dark:text-white tracking-tighter relative z-10">
                      {idea.proposedSolution}
                   </p>
                </div>
             </section>

             {isVisible && (
               <section className="space-y-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
                  <div className="flex items-center gap-4">
                     <div className="h-0.5 w-12 bg-emerald-500/30 rounded-full" />
                     <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">Implementation Blueprint</h2>
                  </div>
                  <div className="whitespace-pre-wrap text-xl leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium border-l-4 border-emerald-500/10 pl-10 ml-2">
                     {idea.description}
                  </div>
               </section>
             )}
          </div>

          <div className="pt-24 border-t border-zinc-100 dark:border-zinc-900">
             <CommentSection ideaId={idea.id} initialComments={comments} />
          </div>
        </div>

        {/* Sidebar Controls - Right */}
        <div className="lg:w-[350px] shrink-0">
          <div className="sticky top-24 space-y-12">
            {/* Control Pod */}
            <div className="space-y-8 p-10 rounded-[3rem] bg-white/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/50 backdrop-blur-xl shadow-2xl dark:shadow-none">
               <div className="flex items-center justify-between">
                  <div className="space-y-1">
                     <span className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter leading-none">{idea._count?.votes || 0}</span>
                     <span className="block text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">Activity Score</span>
                  </div>
                  <div className="text-right space-y-1">
                     <span className="text-4xl font-black text-emerald-500 tracking-tighter leading-none">{idea._count?.comments || 0}</span>
                     <span className="block text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">Community Discourse</span>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-3">
                  <Button 
                      className={`h-16 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border shadow-sm ${idea.userVote === "UPVOTE" ? "bg-emerald-500 text-white border-none shadow-emerald-500/30" : "bg-white dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 hover:border-emerald-500/50 hover:text-emerald-500 border-zinc-200 dark:border-zinc-800"}`}
                      onClick={() => voteMutation.mutate("UPVOTE")}
                      disabled={voteMutation.isPending}
                  >
                      <ArrowUp className="mr-2 h-4 w-4" /> Up
                  </Button>
                  <Button 
                      className={`h-16 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border shadow-sm ${idea.userVote === "DOWNVOTE" ? "bg-rose-500 text-white border-none shadow-rose-500/30" : "bg-white dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 hover:border-rose-500/50 hover:text-rose-500 border-zinc-200 dark:border-zinc-800"}`}
                      onClick={() => voteMutation.mutate("DOWNVOTE")}
                      disabled={voteMutation.isPending}
                  >
                      <ArrowDown className="mr-2 h-4 w-4" /> Down
                  </Button>
               </div>

               <div className="space-y-6">
                  <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800/80">
                     <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                        <User className="h-5 w-5" />
                     </div>
                     <div>
                        <span className="block text-xs font-black text-zinc-900 dark:text-white uppercase tracking-wider">{idea.author?.name || "Architect"}</span>
                        <span className="text-[10px] text-zinc-400 font-bold">Project Lead</span>
                     </div>
                  </div>
                  <button className="w-full flex items-center justify-center gap-3 h-14 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:border-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-all">
                     <Share2 className="h-4 w-4" /> Share Discovery
                  </button>
               </div>
            </div>

            {/* Premium CTA Module */}
            {idea.isPaid && !isVisible && (
              <div className="relative group overflow-hidden rounded-[3.5rem] bg-zinc-950 p-12 text-center space-y-8 shadow-3xl shadow-zinc-950/20 border border-white/5">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 via-emerald-300 to-cyan-500 shadow-[0_4px_30px_rgba(16,185,129,0.4)]" />
                  <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-emerald-500/10 blur-[100px] pointer-events-none group-hover:bg-emerald-500/20 transition-all" />
                  
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[2rem] bg-white/5 border border-white/10 text-emerald-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 shadow-2xl">
                     <Lock className="h-8 w-8" />
                  </div>
                  
                  <div className="space-y-4">
                     <h3 className="text-3xl font-black text-white tracking-tighter uppercase leading-[0.9]">Unlock<br /><span className="text-emerald-500">The Blueprint</span></h3>
                     <p className="text-sm text-zinc-500 font-medium leading-relaxed max-w-[200px] mx-auto">Full technical documentation, CAD schematics, and lead-architect communication.</p>
                  </div>

                  <div className="pt-4">
                     <div className="flex items-center justify-center gap-2 mb-8">
                        <span className="text-5xl font-black text-white tracking-tighter">${idea.price}</span>
                        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">USD</span>
                     </div>
                     <Button 
                        className="w-full h-18 py-6 rounded-3xl font-black text-lg bg-emerald-500 text-white hover:bg-emerald-400 shadow-[0_20px_40px_-10px_rgba(16,185,129,0.5)] transition-all active:scale-95 disabled:opacity-50 ring-2 ring-emerald-500/20"
                        onClick={() => purchaseMutation.mutate()}
                        disabled={purchaseMutation.isPending}
                     >
                       {purchaseMutation.isPending ? "Connecting..." : "Acquire Blueprint"}
                     </Button>
                  </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
