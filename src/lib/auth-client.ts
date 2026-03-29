import { createAuthClient } from "better-auth/react";

const getBaseURL = () => {
  // If NEXT_PUBLIC_API_URL is set (like in Vercel or local .env), use it
  // Example: http://localhost:5000/api or https://your-server.vercel.app/api
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  if (apiURL) {
    return apiURL + "/auth";
  }

  // Fallback for local development if no env is set
  if (typeof window !== "undefined") {
    // If we're in the browser and have no env variable, 
    // we assume the backend is on port 5000
    return "http://localhost:5000/api/auth";
  }

  // Fallback for SSR
  return "https://eco-spark-server.vercel.app/api/auth";
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
});

export const { signIn, signUp, useSession, signOut } = authClient;
