"use client";

import React from "react";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 p-10 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800">
        <h1 className="text-4xl font-black mb-8 tracking-tight">Terms of Service</h1>
        
        <div className="space-y-8 text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">1. Introduction</h2>
            <p>
              Welcome to EcoSpark Hub. By accessing or using our website, platform, and services, you agree to comply with and be bound by these Terms of Service. Please read them carefully.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">2. User Accounts</h2>
            <p>
              To access certain features of the platform, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">3. Content Ownership</h2>
            <p>
              Users retain ownership of the ideas and content they submit to EcoSpark Hub. However, by submitting content, you grant EcoSpark Hub a worldwide, non-exclusive, royalty-free license to use, display, and distribute that content on our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">4. Prohibited Conduct</h2>
            <p>
              Users agree not to engage in any activity that interferes with or disrupts the platform, uses the platform for illegal purposes, or submits fraudulent or misleading information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">5. Limitation of Liability</h2>
            <p>
              EcoSpark Hub is not liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">6. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Your continued use of the platform after such changes constitutes acceptance of the new terms.
            </p>
          </section>
        </div>
        
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-sm text-zinc-500">
          Last updated: March 2024
        </div>
      </div>
    </div>
  );
}
