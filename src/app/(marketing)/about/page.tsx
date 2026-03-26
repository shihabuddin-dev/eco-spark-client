"use client";

import { Leaf, Info, Mail, MapPin, Phone } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-24 text-center">
        <h1 className="mb-6 text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">Our Mission</h1>
        <p className="mx-auto max-w-2xl text-lg text-zinc-500 dark:text-zinc-400">
          EcoSpark Hub is a community-driven platform dedicated to accelerating the transition to a sustainable future by sharing and supporting innovative environmental ideas.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-8">
          <div className="rounded-3xl bg-emerald-50 p-12 dark:bg-emerald-950/20">
            <h2 className="mb-4 text-2xl font-bold text-emerald-700 dark:text-emerald-400">Why EcoSpark?</h2>
            <p className="leading-relaxed text-emerald-900/70 dark:text-emerald-400/70">
              We believe that the best solutions to our planet&apos;s most pressing challenges come from the collective wisdom of people like you. Whether it&apos;s a small change in daily habits or a massive industrial shift, every idea counts.
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { icon: Mail, label: "Email", value: "hello@ecospark.hub" },
              { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
              { icon: MapPin, label: "Office", value: "Green Valley, CA" },
              { icon: Info, label: "Status", value: "Active Community" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-50 text-primary dark:bg-zinc-900">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{item.label}</p>
                  <p className="text-sm font-semibold">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative aspect-square overflow-hidden rounded-[40px] shadow-2xl">
           <img 
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80" 
            alt="EcoSpark Community" 
            className="h-full w-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
           <div className="absolute bottom-10 left-10 text-white">
             <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary mb-4">
               <Leaf className="h-6 w-6" />
             </div>
             <h3 className="text-2xl font-bold">Growing Together</h3>
             <p className="text-white/60">Over 1,200 members worldwide.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
