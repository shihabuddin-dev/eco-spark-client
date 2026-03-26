import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/auth" // Points to http://localhost:5000/api/auth
});

export const { signIn, signUp, useSession, signOut } = authClient;
