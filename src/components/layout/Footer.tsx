import React from "react";

function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="text-zinc-500">
          © {new Date().getFullYear()} EcoSpark Hub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
