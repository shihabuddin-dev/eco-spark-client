"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/components/providers/AuthProvider";
import { toast } from "sonner";
import Link from "next/link";
import { useState } from "react";
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      toast.success("Login successful!");
    } catch (error: any) {
      toast.error(error.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900 p-6">
      <div className="w-full max-w-md bg-white dark:bg-zinc-950 p-8 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Welcome Back</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2">Log in to your EcoSpark account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input {...register("email")} placeholder="name@example.com" />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input type="password" {...register("password")} placeholder="••••••••" />
            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
          </div>

          <Button type="submit" className="w-full dark:bg-accent" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          {/* <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-200 dark:border-zinc-800"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-zinc-950 px-2 text-zinc-500">Or continue with</span>
            </div>
          </div>

          <GoogleAuthButton /> */}
        </form>

        <p className="mt-8 text-center text-sm text-zinc-500">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary dark:text-accent font-semibold hover:underline">
            Register for free
          </Link>
        </p>
      </div>
    </div>
  );
}
