"use client";

import { ArrowRight, Clock, User } from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { blogs } from "@/data/blog";

export const BlogContent = () => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-32 pt-24">
      <SectionHeader
        title="Insights & Updates"
        subtitle="Read the latest news, success stories, and deep dives on environmental innovation from our global community."
        badge="EcoSpark Blog"
      />

      <section className="container mx-auto px-6 max-w-7xl relative z-10 -mt-8">
        <div className="flex flex-col gap-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both">
          {/* Featured Post */}
          <div className="group relative rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl shadow-zinc-200/50 dark:shadow-none overflow-hidden hover:-translate-y-1 transition-all duration-300">
            <div className="grid lg:grid-cols-2">
              <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                <img
                  src={blogs[0].image}
                  alt={blogs[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 lg:bg-gradient-to-r lg:from-transparent lg:to-black/30 opacity-60" />
              </div>
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <div className="mb-6 flex items-center gap-4 text-sm font-bold tracking-widest uppercase">
                  <span className="text-primary">{blogs[0].category}</span>
                  <span className="text-zinc-400">&bull;</span>
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <Clock className="h-4 w-4" /> {blogs[0].readTime}
                  </span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6 line-clamp-3">
                  <Link href={`/blog/${blogs[0].slug}`} className="hover:text-primary transition-colors">
                    {blogs[0].title}
                  </Link>
                </h2>
                <p className="text-md text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium mb-8 line-clamp-3">
                  {blogs[0].excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                      <User className="h-5 w-5 text-zinc-500" />
                    </div>
                    <div>
                      <p className="font-bold">{blogs[0].author}</p>
                      <p className="text-sm text-zinc-500">{blogs[0].date}</p>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${blogs[0].slug}`}
                    className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-primary/30 shrink-0"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Posts */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
            {blogs.slice(1).map((post, idx) => (
              <div
                key={idx}
                className="group flex flex-col bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xl shadow-zinc-200/50 dark:shadow-none hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="px-5 py-2.5 rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-xs font-bold tracking-widest uppercase shadow-lg border border-white/20">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 md:p-10 flex flex-col flex-1">
                  <div className="mb-5 flex items-center gap-4 text-xs font-bold tracking-widest uppercase">
                    <span className="text-zinc-500 flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> {post.readTime}
                    </span>
                    <span className="text-zinc-400">&bull;</span>
                    <span className="text-zinc-500">{post.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight mb-4 line-clamp-2 group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium mb-8 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                        <User className="h-4 w-4 text-zinc-500" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{post.author}</p>
                      </div>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="h-10 w-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all group-hover:scale-110"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
