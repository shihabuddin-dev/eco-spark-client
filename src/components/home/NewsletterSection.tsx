"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function NewsletterSection() {
  const [email, setEmail] = useState("");

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      return api.post("/newsletter/subscribe", { email });
    },
    onSuccess: () => {
      toast.success("Subscribed successfully!");
      setEmail("");
    },
    onError: (err: any) => toast.error(err),
  });

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    newsletterMutation.mutate(email);
  };

  return (
    <section className="container mx-auto px-6 max-w-5xl py-24 pb-32">
      <div className="relative overflow-hidden rounded-[2rem] bg-zinc-900 dark:bg-[#09090b] px-6 py-20 text-center border border-zinc-800 dark:border-white/10 flex flex-col items-center">
        {/* Subtle grid bg typical of Buildify */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute top-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1),transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl w-full">
          <h2 className="mb-4 text-4xl font-semibold tracking-tight md:text-5xl text-white">
            Ready to Join?
          </h2>
          <p className="mb-10 text-lg text-zinc-400 font-medium">
            Join thousands of teams building intelligent impact with EcoSpark. Get started today.
          </p>
          
          <form
            onSubmit={handleNewsletter}
            className="flex w-full items-center gap-3 flex-col sm:flex-row justify-center"
          >
            <Input
              placeholder="Enter your email address"
              className="h-12 w-full sm:w-80 rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-emerald-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
            <Button
              className="h-12 w-full sm:w-auto rounded-lg px-6 font-medium bg-white text-zinc-950 hover:bg-zinc-200 transition-colors"
              disabled={newsletterMutation.isPending}
            >
              {newsletterMutation.isPending ? "Subscribing..." : "Get Started"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
