"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Search, ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";
import { IdeaCard } from "@/components/shared/IdeaCard";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");

  const { data: ideasData, isLoading } = useQuery({
    queryKey: ["featured-ideas"],
    queryFn: async () => {
      const response: any = await api.get("/ideas?limit=6&status=APPROVED");
      return response.data;
    },
  });

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
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden bg-zinc-950 py-32 text-center text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent)]" />
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-secondary uppercase tracking-widest">Sustainability Portal</span>
          </div>
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight md:text-7xl lg:leading-[1.1]">
            Sparking Ideas for a <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Greener</span> Planet
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-zinc-400 md:text-xl">
            Join our community of eco-innovators. Share, discover, and support sustainably oriented ideas that make a real impact on our environment.
          </p>

          <div className="mx-auto flex w-full max-w-2xl items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-2 backdrop-blur-md">
            <div className="flex flex-1 items-center px-4">
              <Search className="h-5 w-5 text-zinc-500" />
              <Input
                placeholder="Search ideas by keyword or category..."
                className="border-0 bg-transparent text-white focus-visible:ring-0 focus-visible:ring-offset-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Link href={`/ideas?search=${searchQuery}`}>
              <Button className="h-12 rounded-xl px-8 font-bold">Search</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features/Stats Section */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-3">
          {[
            { icon: Zap, title: "Action Oriented", desc: "Turn ideas into real-world sustainability projects." },
            { icon: ShieldCheck, title: "Verified Hub", desc: "Quality ideas moderated and approved by experts." },
            { icon: Globe, title: "Global Impact", desc: "Reducing consumption and waste for a better future." },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-50 dark:bg-zinc-900 text-primary shadow-sm">
                <item.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Ideas Section */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl text-zinc-900 dark:text-zinc-50">Impactful Ideas</h2>
            <p className="text-zinc-500 dark:text-zinc-400">Discover recent community submissions reviewed by our team.</p>
          </div>
          <Link href="/ideas">
            <Button variant="outline" className="gap-2">
              Browse All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-96 w-full animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-900" />
            ))}
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ideasData?.map((idea: any) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        )}
      </section>

      {/* Testimonials / Top Voted Section */}
      <section className="bg-zinc-50 dark:bg-zinc-900 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Community Favorites</h2>
            <p className="mx-auto max-w-2xl text-zinc-500 dark:text-zinc-400">These ideas have received the most support from our members.</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
             {ideasData?.slice(0, 3).map((idea: any) => (
               <IdeaCard key={idea.id} idea={idea} />
             ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground shadow-2xl shadow-primary/20">
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Stay Updated</h2>
            <p className="mb-10 max-w-md text-primary-foreground/80">
              Get weekly updates on new sustainability ideas, top voted projects, and community announcements.
            </p>
            <form onSubmit={handleNewsletter} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
              <Input
                placeholder="Enter your email"
                className="h-12 border-none bg-white/20 text-white placeholder:text-white/60 focus-visible:ring-white/30"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
              <Button 
                variant="secondary" 
                className="h-12 px-8 font-bold shadow-lg"
                disabled={newsletterMutation.isPending}
              >
                {newsletterMutation.isPending ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        </div>
      </section>
    </div>
  );
}
