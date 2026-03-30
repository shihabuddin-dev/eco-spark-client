"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/components/providers/AuthProvider";
import { toast } from "sonner";
import { useState } from "react";
import { MessageSquare, Reply, Trash2, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import { Comment } from "@/types";

export const CommentSection = ({ idea, initialComments }: { idea: any; initialComments?: Comment[] }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState("");
  const ideaId = idea.id;

  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments", ideaId],
    queryFn: async () => {
      const response: any = await api.get(`/comments/ideas/${ideaId}`);
      return response.data;
    },
    initialData: initialComments,
  });

  const addCommentMutation = useMutation({
    mutationFn: async ({ content, parentId }: { content: string; parentId?: string }) => {
      return api.post(`/comments/ideas/${ideaId}`, { content, parentId });
    },
    onSuccess: () => {
      setCommentText("");
      queryClient.invalidateQueries({ queryKey: ["comments", ideaId] });
      queryClient.invalidateQueries({ queryKey: ["idea", ideaId] });
      toast.success("Comment added!");
    },
    onError: (err: any) => toast.error(err),
  });

  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId: string) => {
      return api.delete(`/comments/${commentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", ideaId] });
      queryClient.invalidateQueries({ queryKey: ["idea", ideaId] });
      toast.success("Comment deleted");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error("Please login to comment");
    
    // Check if it's a paid idea and user hasn't purchased it
    if (idea.isPaid && !idea.hasPurchased && user.role !== "ADMIN" && user.id !== idea.authorId) {
      return toast.error("Payment required to join this discussion", {
        description: "Please purchase this idea to share your thoughts.",
      });
    }

    if (!commentText.trim()) return;
    addCommentMutation.mutate({ content: commentText });
  };

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => {
    const [isReplying, setIsReplying] = useState(false);
    const [replyText, setReplyText] = useState("");

    const handleReply = () => {
      if (!user) return toast.error("Please login to reply");
      if (!replyText.trim()) return;
      addCommentMutation.mutate({ content: replyText, parentId: comment.id });
      setIsReplying(false);
      setReplyText("");
    };

    return (
      <div className={cn("group mb-6", isReply && "ml-8 border-l-2 border-zinc-100 pl-6 dark:border-zinc-800")}>
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
            <UserIcon className="h-4 w-4" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">{comment.user.name}</span>
              <span className="text-[10px] uppercase text-zinc-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{comment.content}</p>
            
            <div className="flex items-center gap-4 pt-2">
               <button 
                 onClick={() => setIsReplying(!isReplying)}
                 className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-primary transition-colors"
               >
                 <Reply className="h-3.5 w-3.5" />
                 Reply
               </button>
               {(user?.id === comment.user.id || user?.role === "ADMIN") && (
                 <button 
                   onClick={() => deleteCommentMutation.mutate(comment.id)}
                   className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-destructive transition-colors"
                 >
                   <Trash2 className="h-3.5 w-3.5" />
                   Delete
                 </button>
               )}
            </div>

            {isReplying && (
              <div className="mt-4 flex gap-2">
                <Input 
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  className="h-9 text-xs"
                />
                <Button size="sm" onClick={handleReply}>Send</Button>
                <Button size="sm" variant="ghost" onClick={() => setIsReplying(false)}>Cancel</Button>
              </div>
            )}
          </div>
        </div>

        {comment.replies?.map((reply) => (
          <CommentItem key={reply.id} comment={reply} isReply />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-12">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative overflow-hidden rounded-[2rem] border-2 border-zinc-200 bg-white focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-950 dark:focus-within:border-primary/50 shadow-sm">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Share your insightful thoughts or constructive feedback..."
            className="w-full min-h-[140px] bg-transparent p-6 text-base focus:outline-none resize-none placeholder:text-zinc-400 dark:text-zinc-100"
          />
          <div className="flex items-center justify-between p-3 px-6 border-t border-zinc-100 bg-zinc-50/80 dark:border-zinc-800 dark:bg-zinc-900/50">
            <span className="text-[11px] font-bold tracking-widest uppercase text-zinc-400 hidden sm:inline-block">Be respectful & constructive</span>
            <Button 
              type="submit" 
              disabled={!commentText.trim() || addCommentMutation.isPending}
              className="rounded-xl px-8 h-11 font-bold shadow-lg shadow-primary/20 active:scale-95 transition-transform"
            >
              {addCommentMutation.isPending ? "Posting..." : "Join Discussion"}
            </Button>
          </div>
        </div>
      </form>

      <div className="space-y-2">
        {isLoading ? (
          <div className="py-12 text-center text-zinc-500">Loading comments...</div>
        ) : comments?.length > 0 ? (
          comments.map((comment: Comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        ) : (
          <div className="py-12 text-center text-zinc-500">No comments yet. Start the conversation!</div>
        )}
      </div>
    </div>
  );
};
