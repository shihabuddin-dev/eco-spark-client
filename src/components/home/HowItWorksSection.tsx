import { SectionHeader } from "@/components/shared/SectionHeader";
import { howItWorksData } from "@/data/home";

export function HowItWorksSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <SectionHeader 
          title="How EcoSpark Works"
          subtitle="Everything you need to share, review, and launch impactful ideas — designed for speed and reliability."
          badge="Workflow"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {howItWorksData.map((item, i) => (
            <div key={i} className="group flex flex-col p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-colors relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm ring-1 ring-zinc-200 dark:ring-white/10">
                <item.icon className="h-6 w-6" />
              </div>
              
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white flex items-center justify-between">
                {item.title}
                <span className="text-sm text-zinc-400 dark:text-zinc-500 font-mono">{item.step}</span>
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
