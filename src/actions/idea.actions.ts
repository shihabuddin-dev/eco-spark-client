"use server";

import { fetchServer } from "@/lib/api-server";
import { Idea, ApiResponse } from "@/types";
import { buildQueryString } from "@/lib/query-builder";
import { revalidatePath } from "next/cache";

export async function getIdeas(params: any) {
  const queryString = buildQueryString(params);
  const response: ApiResponse<Idea[]> = await fetchServer(`/ideas?${queryString}`);
  return response;
}

export async function getIdeaById(id: string) {
  const response: Idea = await fetchServer(`/ideas/${id}?include=author,category,votes,comments`);
  return response;
}

export async function voteIdea(ideaId: string, voteType: "UPVOTE" | "DOWNVOTE") {
  try {
     const response = await fetchServer(`/ideas/${ideaId}/vote`, {
       method: "POST",
       body: JSON.stringify({ voteType }),
     });
     revalidatePath(`/ideas/${ideaId}`);
     revalidatePath("/ideas");
     return { success: true, data: response };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to vote" };
  }
}

export async function purchaseIdea(ideaId: string) {
  try {
    const response = await fetchServer("/payments/create-checkout-session", {
      method: "POST",
      body: JSON.stringify({ ideaId }),
    });
    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to initiate purchase" };
  }
}
