"use client";

import CountUp from "react-countup";
import { impactStatsData } from "@/data/home";

export function ImpactStatsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 relative z-10 -mt-10 lg:-mt-20 my-24 lg:mb-32">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {impactStatsData.map((stat, i) => (
          <div
            key={i}
            className="group relative flex flex-col items-start p-6 md:p-8 rounded-3xl bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl border border-zinc-200/50 dark:border-white/5 shadow-lg shadow-zinc-200/20 dark:shadow-none transition-all hover:bg-white/80 dark:hover:bg-zinc-900/60 overflow-hidden"
          >
            {/* Buildify style top gradient line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="mb-4 inline-flex items-center justify-center p-3 rounded-xl bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-zinc-100 ring-1 ring-zinc-200 dark:ring-white/10 group-hover:scale-110 transition-transform duration-300">
              <stat.icon className="h-6 w-6" />
            </div>
            
            <h4 className="text-4xl md:text-5xl font-semibold tracking-tighter text-zinc-900 dark:text-white mb-2">
              <CountUp end={stat.value} suffix={stat.suffix} enableScrollSpy scrollSpyOnce scrollSpyDelay={100} duration={2.5} />
            </h4>
            
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
