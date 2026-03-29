"use client";

import CountUp from "react-countup";
import { impactStatsData } from "@/data/home";

export function ImpactStatsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 relative z-10 -mt-12 lg:-mt-24 mb-32">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {impactStatsData.map((stat, i) => (
          <div
            key={i}
            className="group relative flex flex-col items-start p-8 rounded-2xl bg-white/70 dark:bg-zinc-900/40 backdrop-blur-2xl border border-zinc-200/50 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none transition-all hover:-translate-y-1 hover:border-emerald-500/30 overflow-hidden"
          >
            {/* Top Shine */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="mb-6 inline-flex items-center justify-center h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
              <stat.icon className="h-6 w-6" />
            </div>
            
            <div className="space-y-1">
              <h4 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 dark:text-white leading-none">
                <CountUp end={stat.value} suffix={stat.suffix} enableScrollSpy scrollSpyOnce scrollSpyDelay={100} duration={2.5} />
              </h4>
              
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover:text-emerald-500 transition-colors">
                {stat.label}
              </p>
            </div>

            {/* Subtle bottom glow */}
            <div className="absolute -bottom-10 -right-10 h-24 w-24 bg-emerald-500/5 blur-2xl group-hover:bg-emerald-500/10 transition-all pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
}
