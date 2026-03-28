"use client";

import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { pricingPlansData } from "@/data/home";
import { useMutation } from "@tanstack/react-query";
import { purchaseProPlan } from "@/actions/idea.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function PricingSection() {
  const router = useRouter();
  const purchaseMutation = useMutation({
    mutationFn: async () => {
      const result = await purchaseProPlan();
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: (data: any) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to initiate checkout");
    },
  });

  const handlePurchase = (planName: string) => {
    if (planName === "Pro") {
      purchaseMutation.mutate();
    } else if (planName === "Enterprise") {
      router.push("/contact");
    } else {
      toast.success("You are already on the starter plan!");
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-white dark:bg-[#09090b] border-t border-zinc-50 dark:border-white/5">
      <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
        <SectionHeader 
          title="Simple, transparent pricing"
          subtitle="Choose a plan that fits your vision. Scale as you launch and grow your impact."
          badge="Pricing"
          align="center"
        />

        <div className="grid md:grid-cols-3 gap-8 text-left max-w-6xl mx-auto">
          {pricingPlansData.map((plan, i) => (
            <div key={i} className={`relative flex flex-col p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border ${plan.popular ? 'border-emerald-500/50 shadow-xl shadow-emerald-500/10' : 'border-zinc-200 dark:border-white/5 shadow-sm'}`}>
              {plan.popular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">{plan.name}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">{plan.desc}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">{plan.price}</span>
                {plan.price !== "Free" && plan.price !== "Custom" && <span className="text-zinc-500 dark:text-zinc-400">/mo</span>}
              </div>
              <Button 
                onClick={() => handlePurchase(plan.name)}
                disabled={plan.popular && purchaseMutation.isPending}
                className={`cursor-pointer w-full mb-8 h-12 rounded-xl font-semibold ${plan.popular ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700'}`}
              >
                {plan.popular && purchaseMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : plan.price === "Custom" ? (
                  "Contact Sales"
                ) : (
                  "Get Started"
                )}
              </Button>
              <div className="flex flex-col gap-4 flex-1">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-emerald-500 shrink-0" />
                    <span className="text-sm text-zinc-600 dark:text-zinc-300 font-medium leading-tight">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
