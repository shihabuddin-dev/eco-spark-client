import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Leaf, Home } from "lucide-react";
import { BackButton } from "@/components/ui/BackButton";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 dark:bg-zinc-950">
      <div className="relative flex flex-col items-center text-center">
        <div className="absolute -top-24 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-xl dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <Leaf className="h-10 w-10 text-primary animate-pulse" />
        </div>

        <h1 className="mb-4 text-8xl font-black tracking-tighter text-zinc-900 dark:text-white md:text-9xl">
          404
        </h1>
        
        <div className="mb-8 space-y-2">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-zinc-800 dark:text-zinc-100">
            Lost in the Wilderness?
          </h2>
          <p className="mx-auto max-w-md text-lg text-zinc-500 dark:text-zinc-400">
            The page you're looking for has either been moved, deleted, or never existed in our ecosystem.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="/">
            <Button className="h-12 rounded-xl px-8 font-bold shadow-lg shadow-primary/20">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <BackButton />
        </div>
      </div>
      
      <div className="mt-24 text-sm font-medium text-zinc-400">
        © {new Date().getFullYear()} EcoSpark Hub. All rights reserved.
      </div>
    </div>
  );
}
