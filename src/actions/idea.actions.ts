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
  const response: ApiResponse<Idea> = await fetchServer(`/ideas/${id}?include=author,category,votes,comments`);
  return response.data;
}

export async function voteIdea(ideaId: string, voteType: "UPVOTE" | "DOWNVOTE") {
  try {
     const response = await fetchServer(`/votes/${ideaId}/vote`, {
       method: "POST",
       body: JSON.stringify({ voteType }),
     });
     revalidatePath(`/ideas/${ideaId}`);
     revalidatePath("/ideas");
     return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to vote" };
  }
}

export async function purchaseIdea(ideaId: string) {
  try {
    const response = await fetchServer("/payments/create-checkout", {
      method: "POST",
      body: JSON.stringify({ ideaId }),
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to initiate purchase" };
  }
}
export async function purchaseProPlan() {
  try {
    const response = await fetchServer("/payments/create-checkout", {
      method: "POST",
      body: JSON.stringify({ isProPlan: true }),
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to initiate purchase" };
  }
}
