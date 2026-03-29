"use client";


import { SectionHeader } from "@/components/shared/SectionHeader";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { aboutData } from "@/data/about";

export const AboutUsContent = () => {
 

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-20 pt-24 overflow-x-hidden">
      <SectionHeader
        title="Igniting Sustainable Innovation"
        subtitle="We are a community of visionaries, builders, and environmental advocates dedicated to crowdsourcing and funding the most impactful sustainable ideas on the planet."
        badge="About EcoSpark Hub"
      />

      {/* Mission Section - Restoring Previous Header Design Layout */}
      <section className="container mx-auto px-6 py-20 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Mission Image Card (Restored Style) */}
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-left-8 duration-700 delay-200 fill-mode-both">
            <img
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000"
              alt="Environmental Hands"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10 text-white">
              <h3 className="text-4xl font-bold mb-3 tracking-tight">
                Our Mission
              </h3>
              <p className="text-zinc-200 text-lg leading-relaxed font-medium">
                To accelerate the transition to a sustainable future by
                democratizing green technology architectures and providing a
                platform for the next generation of eco-innovators.
              </p>
            </div>
          </div>

          {/* Right: Why We Exist Header + Grid (Restored Style) */}
          <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-700 delay-300 fill-mode-both">
            <SectionHeader
              title="Why We Exist"
              subtitle="The climate crisis demands immediate, decentralized action. EcoSpark Hub was born out of the belief that the best solutions often come from the community."
              align="left"
              className="mb-6"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {aboutData.map((value, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:-translate-y-1 transition-transform"
                >
                  <div
                    className={`h-12 w-12 rounded-3xl ${value.color} flex items-center justify-center mb-6`}
                  >
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-bold mb-2 tracking-tight text-zinc-900 dark:text-white">
                    {value.title}
                  </h4>
                  <p className="text-zinc-500 font-medium">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story Section - Keeping the New Content but simplified UI */}
      <section className="container mx-auto px-6 py-20 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 space-y-8">
            <SectionHeader
              title="The Story of EcoSpark"
              subtitle="How a small conversation about plastic waste turned into a global platform for sustainable innovation."
              align="left"
              className="mb-8"
            />
            <div className="space-y-6 text-lg text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
              <p>
                Starting in 2023, EcoSpark Hub began as a simple forum for
                exchanging green building techniques. We quickly realized that
                while there were plenty of ideas, there was no centralized way
                to fund and refine them.
              </p>
              <p>
                Today, we serve as the primary bridge between sustainability
                visionaries and the resources they need to thrive.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-emerald-500 mb-2">
                  500+
                </span>
                <span className="text-xs font-black uppercase tracking-widest text-zinc-400">
                  Projects Funded
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-emerald-500 mb-2">
                  12M
                </span>
                <span className="text-xs font-black uppercase tracking-widest text-zinc-400">
                  Tons of CO2 Saved
                </span>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2000"
              alt="Sustainable City"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );
};

export default AboutUsContent;
