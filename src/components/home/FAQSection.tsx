"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { SectionHeader } from "../shared/SectionHeader";

export function FAQSection() {
  const faqs = [
    { q: "What is EcoSpark?", a: "EcoSpark is a decentralized portal designed to help teams and individuals share, deploy, and scale environmental impact projects efficiently." },
    { q: "Do I need prior experience to use EcoSpark?", a: "No. EcoSpark is designed for both environmental experts and everyday people, offering simple tools to share and support ideas." },
    { q: "Can I get funding for my idea?", a: "Yes. Through our platform, community-approved ideas can receive direct funding via our integrated payment pathways." },
    { q: "Is the platform secure?", a: "Absolutely. We utilize production-ready security controls, transparent voting logs, and stripe integration to protect community data and funds." },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 relative overflow-hidden bg-zinc-50 dark:bg-[#09090b] border-t border-zinc-50 dark:border-white/5">
      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <SectionHeader
          title="Got questions?"
          subtitle="Everything you need to know about EcoSpark and how to get started."
          badge="FAQ"
        />

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-zinc-200 dark:border-white/10 rounded-2xl bg-white dark:bg-zinc-900/50 overflow-hidden transition-all shadow-sm">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors"
              >
                <span className="font-semibold text-zinc-900 dark:text-white text-lg">{faq.q}</span>
                <ChevronDown className={`h-5 w-5 text-zinc-500 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-60 pb-6 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pt-2 border-t border-zinc-100 dark:border-white/5 mt-2">
                  <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed pt-4">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
