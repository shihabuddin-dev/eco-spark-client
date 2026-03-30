import { createAuthClient } from "better-auth/react";

const getBaseURL = () => {
  // If running in the browser, always use an absolute proxy path
  // to ensure cookies are set on the frontend domain and avoid cross-domain issues.
  if (typeof window !== "undefined") {
    return window.location.origin + "/api/auth";
  }

  // Fallback for SSR NextJS
  // In SSR, we need an absolute URL. Try to use NEXT_PUBLIC_APP_URL or fallback.
  const frontendAppUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_FRONTEND_URL;
  if (frontendAppUrl) {
    return frontendAppUrl + "/api/auth";
  }

  // Fallback for SSR
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  if (apiURL) {
    return apiURL + "/auth";
  }
  
  return process.env.BACKEND_URL ? `${process.env.BACKEND_URL}/auth` : "https://eco-spark-server.vercel.app/api/auth";
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
});

export const { signIn, signUp, useSession, signOut } = authClient;
