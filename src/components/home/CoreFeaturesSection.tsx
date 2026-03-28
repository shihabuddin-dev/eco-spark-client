import { SectionHeader } from "@/components/shared/SectionHeader";
import { coreFeaturesData } from "@/data/home";

export function CoreFeaturesSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-white dark:bg-[#09090b]">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <SectionHeader 
          title="Everything you need to spark change"
          subtitle="Designed for speed, reliability, and real-world impact. Trusted by leading ecological teams."
          badge="Core Features"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreFeaturesData.map((feature, i) => (
            <div key={i} className="group p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-colors">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm ring-1 ring-zinc-200 dark:ring-white/10">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
