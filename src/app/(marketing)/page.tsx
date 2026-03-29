import { HeroSection } from "@/components/home/HeroSection";
import { ImpactStatsSection } from "@/components/home/ImpactStatsSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { CoreFeaturesSection } from "@/components/home/CoreFeaturesSection";
import { FeaturedIdeasSection } from "@/components/home/FeaturedIdeasSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PricingSection } from "@/components/home/PricingSection";
import { FAQSection } from "@/components/home/FAQSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <div className="bg-white dark:bg-[#09090b]">
      <HeroSection />
      <ImpactStatsSection />
      <HowItWorksSection />
      <CoreFeaturesSection />
      <FeaturedIdeasSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <NewsletterSection />
    </div>
  );
}
