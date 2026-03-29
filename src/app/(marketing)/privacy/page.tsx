"use client";

import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 p-10 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800">
        <h1 className="text-4xl font-black mb-8 tracking-tight">Privacy Policy</h1>
        
        <div className="space-y-8 text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">1. Information Collection</h2>
            <p>
              We collect information that you provide to us directly when you create an account, such as your name, email address, and profile picture. We also collect usage data to improve our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">2. Use of Information</h2>
            <p>
              The information we collect is used to manage your account, provide and improve our services, and communicate with you about updates and notifications relevant to your use of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">3. Data Security</h2>
            <p>
              We take reasonable measures to protect your personal information from unauthorized access, loss, or theft. We use encryption and other security protocols to ensure your data is safe.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">4. Sharing Information</h2>
            <p>
              We do not sell your personal information to third parties. We may only share information when required by law or to protect our legal rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">5. Cookies</h2>
            <p>
              EcoSpark Hub uses cookies to enhance user experience and analyze website traffic. You can manage cookie settings in your browser at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">6. Contact Us</h2>
            <p>
              If you have any questions or concerns about our Privacy Policy, please contact us at privacy@ecospark.com.
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
