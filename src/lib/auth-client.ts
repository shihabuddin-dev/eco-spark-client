import { createAuthClient } from "better-auth/react";

const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return window.location.origin + "/api/auth";
  }
  return (process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://eco-spark-server.vercel.app/api") + "/auth";
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
});

export const { signIn, signUp, useSession, signOut } = authClient;
