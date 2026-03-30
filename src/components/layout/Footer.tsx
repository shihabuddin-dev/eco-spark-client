import React from "react";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import Logo from "../shared/Logo";

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-16">
           <div className="md:col-span-1 space-y-4">
              <Logo/>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed mt-4">
                Crowdsourcing and funding the most impactful sustainable ideas to accelerate the transition to a greener planet.
              </p>
           </div>
           
           <div className="md:col-span-1">
              <h4 className="font-bold mb-4 tracking-tight">Platform</h4>
              <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400 font-bold">
                 <li><Link href="/ideas" className="hover:text-primary transition-colors">Browse Ideas</Link></li>
                 <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing & Plans</Link></li>
                 <li><Link href="/register" className="hover:text-primary transition-colors">Join Community</Link></li>
              </ul>
           </div>
           
           <div className="md:col-span-1">
              <h4 className="font-bold mb-4 tracking-tight">Company</h4>
              <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400 font-bold">
                 <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                 <li><Link href="/blog" className="hover:text-primary transition-colors">Blog & News</Link></li>
                 <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
           </div>

           <div className="md:col-span-1">
              <h4 className="font-bold mb-4 tracking-tight">Resources</h4>
              <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400 font-bold">
                 <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                 <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                 <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              </ul>
           </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
           <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
             © {currentYear} EcoSpark Hub. All rights reserved.
           </p>
           <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest hidden sm:inline-block">Theme</span>
              <ThemeToggle />
           </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
