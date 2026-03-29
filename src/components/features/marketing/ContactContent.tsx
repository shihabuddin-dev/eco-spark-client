"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { FAQSection } from "@/components/home/FAQSection";
import ContactForm from "@/components/form/ContactForm";

export const ContactContent = () => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-32 pt-24">
      <SectionHeader
        title="Get in Touch"
        subtitle="Have questions about a premium idea or want to partner with us? Our team is always here to help."
        badge="Contact Us"
      />

      <ContactForm />
      <FAQSection />
    </div>
  );
};
