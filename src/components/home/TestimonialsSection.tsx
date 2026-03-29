import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { testimonialsData } from "@/data/home";

const avatarColors = [
  "bg-emerald-500",
  "bg-blue-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-pink-500",
  "bg-cyan-500",
];

const firstRow = testimonialsData.slice(
  0,
  Math.ceil(testimonialsData.length / 2),
);
const secondRow = testimonialsData.slice(
  Math.ceil(testimonialsData.length / 2),
);

function ReviewCard({
  name,
  role,
  handle,
  text,
  colorClass,
}: {
  name: string;
  role: string;
  handle?: string;
  text: string;
  colorClass: string;
}) {
  return (
    <figure
      className={cn(
        "relative w-72 cursor-pointer overflow-hidden rounded-2xl border p-5 mx-3",
        // light
        "border-neutral-950/[0.08] bg-neutral-950/[0.02] hover:bg-neutral-950/[0.05]",
        // dark
        "dark:border-neutral-50/[0.08] dark:bg-neutral-50/[0.06] dark:hover:bg-neutral-50/[0.10]",
        "transition-colors duration-300",
      )}
    >
      {/* Header: avatar + name */}
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "h-9 w-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0",
            colorClass,
          )}
        >
          {name[0]}
        </div>
        <div>
          <figcaption className="text-sm font-semibold text-zinc-900 dark:text-white leading-tight">
            {name}
          </figcaption>
          <p className="text-xs text-zinc-500 dark:text-white/40">
            {handle ?? role}
          </p>
        </div>
      </div>

      {/* Quote */}
      <blockquote className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
        &ldquo;{text}&rdquo;
      </blockquote>
    </figure>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-zinc-50 dark:bg-[#09090b] border-t border-zinc-50 dark:border-white/5">
      {/* Header */}
      <div className="container mx-auto px-6 max-w-7xl text-center mb-12">
        <SectionHeader
          title="What our users say"
          subtitle="Teams trust EcoSpark to build, deploy, and scale reliable projects in the real world."
          badge="Testimonials"
          align="center"
        />
      </div>

      {/* Marquee rows */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-4 py-4">
        {/* Row 1 — left scroll */}
        <Marquee pauseOnHover className="[--duration:30s] [--gap:0px]">
          {firstRow.map((t, i) => (
            <ReviewCard
              key={t.name}
              {...t}
              colorClass={avatarColors[i % avatarColors.length]}
            />
          ))}
        </Marquee>

        {/* Row 2 — right scroll */}
        <Marquee reverse pauseOnHover className="[--duration:30s] [--gap:0px]">
          {secondRow.map((t, i) => (
            <ReviewCard
              key={t.name}
              {...t}
              colorClass={avatarColors[(i + 3) % avatarColors.length]}
            />
          ))}
        </Marquee>

        {/* Left & right fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-zinc-50 dark:from-[#09090b]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-zinc-50 dark:from-[#09090b]" />
      </div>
    </section>
  );
}
