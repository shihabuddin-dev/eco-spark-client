"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Loader2, XCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  useEffect(() => {
    if (sessionId) {
      verifyPayment();
    } else {
      setStatus("error");
    }
  }, [sessionId]);

  const verifyPayment = async () => {
    try {
      await api.get(`/payments/verify/${sessionId}`);
      setStatus("success");
      toast.success("Payment verified! You now have access to this idea.");
    } catch (err: any) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-6 text-center">
      {status === "loading" && (
        <div className="space-y-4">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <h1 className="text-2xl font-bold">Verifying your payment...</h1>
          <p className="text-zinc-500">Please don&apos;t close this page.</p>
        </div>
      )}

      {status === "success" && (
        <div className="max-w-md space-y-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold">Payment Successful!</h1>
          <p className="text-zinc-500">
            Thank you for supporting sustainability innovation. You can now view
            the full details of the idea.
          </p>
          <div className="flex flex-col gap-3 pt-6">
            <Button className="h-12 rounded-xl font-bold" asChild>
              <Link href="/ideas">Browse More Ideas</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/member-dashboard" className="gap-2">
                Back to Dashboard <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="max-w-md space-y-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-rose-100 text-rose-600 dark:bg-rose-900/20">
            <XCircle className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold">Payment Error</h1>
          <p className="text-zinc-500">
            We couldn&apos;t verify your payment. If you have been charged,
            please contact our support team.
          </p>
          <div className="flex flex-col gap-3 pt-6">
            <Button className="h-12 rounded-xl font-bold" asChild>
              <Link href="/ideas">Try Again</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[80vh] items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
