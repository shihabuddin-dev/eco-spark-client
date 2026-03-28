"use client";

import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const handlePopularSearch = (tag: string) => {
    setSearchQuery(tag);
  };

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-zinc-950 py-32 md:py-48 text-center transition-colors duration-300">
      {/* Background Gradients and Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.1),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.15),transparent_60%)] opacity-80" />
      
      {/* Grid Pattern */}
      <div className="absolute top-0 w-full h-full bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      {/* Glow Circles */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-500/20 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-cyan-500/20 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 flex flex-col items-center">
        {/* Glowy Pill Badge */}
        <div className="mb-8 inline-flex items-center justify-center gap-2 rounded-full border border-emerald-500/20 dark:border-emerald-500/30 bg-emerald-500/10 px-4 py-2 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.1)] dark:shadow-[0_0_15px_rgba(16,185,129,0.2)] animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
            EcoSpark Hub 2026 is Live
          </span>
        </div>

        {/* Hero Heading */}
        <h1 className="mb-6 max-w-4xl text-5xl font-extrabold tracking-tight md:text-7xl lg:text-[5rem] lg:leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both text-zinc-900 dark:text-zinc-100">
          Sparking Ideas for a{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-cyan-600 dark:from-emerald-400 dark:via-emerald-200 dark:to-cyan-400">
            Greener
          </span>{" "}
          Planet
        </h1>

        {/* Hero Subtitle */}
        <p className="mx-auto mb-10 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 md:text-xl leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200 fill-mode-both">
          The world's first decentralized sustainability portal. Share, discover,
          and support innovative ideas that make a real-world impact on our environment.
        </p>

        {/* AI-Style Form Input Container */}
        <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
          <div className="relative flex items-center w-full rounded-full border border-zinc-200 dark:border-zinc-700/50 bg-white/80 dark:bg-zinc-900/80 p-1.5 shadow-xl dark:shadow-2xl backdrop-blur-xl transition-all focus-within:border-emerald-500/50 hover:border-zinc-300 dark:hover:border-zinc-600 focus-within:ring-4 focus-within:ring-emerald-500/10 hover:shadow-2xl">
            <div className="pl-4 pr-2 text-zinc-500 dark:text-zinc-400">
              <Search className="h-5 w-5" />
            </div>
            <Input
              placeholder="Search ideas by keyword or category..."
              className="peer h-12 flex-1 border-0 bg-transparent text-base text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Link href={`/ideas?search=${searchQuery}`} className="peer-focus:scale-105 transition-transform absolute right-1.5">
              <Button className="h-12 rounded-full px-8 font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white shadow-md shadow-emerald-500/25 border-0">
                Search
              </Button>
            </Link>
          </div>
          
          {/* Quick Suggestions */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm text-zinc-600 dark:text-zinc-500">
            <p className="font-medium">Popular searches:</p>
            <div className="flex gap-2">
              {['Solar Array', 'Recycling', 'AI Tech'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => handlePopularSearch(tag)}
                  className="rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 px-4 py-1.5 hover:bg-zinc-100 hover:border-zinc-300 hover:text-zinc-900 dark:hover:border-zinc-600 dark:hover:text-zinc-300 dark:hover:bg-zinc-800 transition-all cursor-pointer font-medium"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
