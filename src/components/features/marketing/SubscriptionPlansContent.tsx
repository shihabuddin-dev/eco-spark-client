import { PricingSection } from "@/components/home/PricingSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

export const SubscriptionPlansContent = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b]">
      <PricingSection />
      <TestimonialsSection/>
    </div>
  );
};
