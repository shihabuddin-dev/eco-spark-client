import config from "@/config/env";

const BASE_URL = config.API_URL;

export const AdminService = {
  getDashboardStats: async () => {
    const response = await fetch(`${BASE_URL}/admin/dashboard`);
    if (!response.ok) throw new Error("Failed to fetch dashboard stats");
    return response.json();
  },

  getAllUsers: async (searchTerm = "", page = 1) => {
    const response = await fetch(
      `${BASE_URL}/admin/users?searchTerm=${searchTerm}&page=${page}`,
    );
    if (!response.ok) throw new Error("Failed to fetch users");
    return response.json();
  },

  getAllIdeas: async (searchTerm = "", page = 1) => {
    const response = await fetch(
      `${BASE_URL}/admin/ideas?searchTerm=${searchTerm}&page=${page}`,
    );
    if (!response.ok) throw new Error("Failed to fetch ideas");
    return response.json();
  },

  approveIdea: async (id: string) => {
    const response = await fetch(`${BASE_URL}/admin/ideas/${id}/approve`, {
      method: "PATCH",
    });
    if (!response.ok) throw new Error("Failed to approve idea");
    return response.json();
  },

  // Add more methods as needed...
};
