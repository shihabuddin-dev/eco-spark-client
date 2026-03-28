import { cookies } from "next/headers";

export const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const cookieHeader = allCookies
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  return {
    Cookie: cookieHeader,
  };
};

export const fetchServer = async (endpoint: string, options: RequestInit = {}) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  const authHeaders = await getAuthHeaders();

  const headers: Record<string, string> = {
    ...authHeaders,
  };

  if (options.body && typeof options.body === "string" && !options.headers?.hasOwnProperty("Content-Type")) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${baseUrl}/v1${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers as Record<string, string>,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch data from server");
  }

  return response.json();
};
