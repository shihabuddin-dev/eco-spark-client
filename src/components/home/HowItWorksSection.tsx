import { SectionHeader } from "@/components/shared/SectionHeader";
import { howItWorksData } from "@/data/home";

export function HowItWorksSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <SectionHeader 
          title="How EcoSpark Works"
          subtitle="A streamlined journey from a raw concept to a funded, real-world sustainable solution. Designed for maximum impact."
          badge="The Workflow"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {howItWorksData.map((item, i) => (
            <div key={i} className="group relative flex flex-col p-10 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/40 transition-all hover:shadow-2xl hover:shadow-emerald-500/5 overflow-hidden">
              <div className="absolute -top-10 -right-10 h-32 w-32 bg-emerald-500/5 blur-3xl group-hover:bg-emerald-500/10 transition-all pointer-events-none" />
              
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                <item.icon className="h-7 w-7" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/60">{item.step}</span>
                </div>
                <h3 className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium tracking-tight">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
