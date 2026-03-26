"use server";

import { fetchServer } from "@/lib/api-server";
import { revalidatePath } from "next/cache";

export async function toggleUserRole(userId: string, role: string) {
  try {
    const response = await fetchServer(`/admin/users/${userId}/role`, {
      method: "PATCH",
      body: JSON.stringify({ role }),
    });
    revalidatePath("/admin-dashboard/users");
    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update role" };
  }
}

export async function toggleUserStatus(userId: string, isBlocked: boolean) {
  try {
    const response = await fetchServer(`/admin/users/${userId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status: isBlocked ? "DEACTIVATED" : "ACTIVE" }),
    });
    revalidatePath("/admin-dashboard/users");
    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update status" };
  }
}

export async function createCategory(name: string, description: string) {
  try {
    const response = await fetchServer("/categories", {
      method: "POST",
      body: JSON.stringify({ name, description }),
    });
    revalidatePath("/admin-dashboard/categories");
    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to create category" };
  }
}

export async function updateCategory(id: string, name: string, description: string) {
  try {
    const response = await fetchServer(`/categories/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ name, description }),
    });
    revalidatePath("/admin-dashboard/categories");
    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update category" };
  }
}

export async function deleteCategory(id: string) {
  try {
    const response = await fetchServer(`/categories/${id}`, {
      method: "DELETE",
    });
    revalidatePath("/admin-dashboard/categories");
    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete category" };
  }
}

export async function approveIdea(id: string) {
  try {
    const response = await fetchServer(`/admin/ideas/${id}/approve`, {
      method: "PATCH",
      body: JSON.stringify({ status: "APPROVED" }),
    });
    revalidatePath("/admin-dashboard/ideas");
    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to approve idea" };
  }
}

export async function rejectIdea(id: string, feedback?: string) {
  try {
    const response = await fetchServer(`/admin/ideas/${id}/reject`, {
      method: "PATCH",
      body: JSON.stringify({ status: "REJECTED", feedback: feedback || "" }),
    });
    revalidatePath("/admin-dashboard/ideas");
    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to reject idea" };
  }
}

export async function updateAdminProfile(name: string, bio: string) {
  try {
    const response = await fetchServer("/admin/profile", {
      method: "PATCH",
      body: JSON.stringify({ name, bio }),
    });
    revalidatePath("/admin-dashboard/settings");
    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update profile" };
  }
}

export async function changePassword(currentPassword: string, newPassword: string) {
  try {
    const response = await fetchServer("/admin/password", {
      method: "PATCH",
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    revalidatePath("/admin-dashboard/settings");
    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to change password" };
  }
}

export async function updateSettings(language: string, theme: string, notificationsEnabled: boolean) {
  try {
    const response = await fetchServer("/admin/settings", {
      method: "PATCH",
      body: JSON.stringify({ language, theme, notificationsEnabled }),
    });
    revalidatePath("/admin-dashboard/settings");
    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update settings" };
  }
}

export async function updateIdeaStatus(
  id: string,
  status: "DRAFT" | "UNDER_REVIEW" | "APPROVED" | "REJECTED",
  feedback?: string
) {
  try {
    let response;

    switch (status) {
      case "APPROVED":
        response = await fetchServer(`/admin/ideas/${id}/approve`, {
          method: "PATCH",
        });
        break;

      case "REJECTED":
        response = await fetchServer(`/admin/ideas/${id}/reject`, {
          method: "PATCH",
          body: JSON.stringify({ feedback: feedback || "" }),
        });
        break;

      case "UNDER_REVIEW":
        response = await fetchServer(`/ideas/${id}/submit`, {
          method: "PATCH",
        });
        break;

      case "DRAFT":
        response = await fetchServer(`/ideas/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ status: "DRAFT" }),
        });
        break;

      default:
        throw new Error(`Invalid status: ${status}`);
    }

    revalidatePath("/admin-dashboard/ideas");
    return { success: true, data: response || { id, status } };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update idea status" };
  }
}
