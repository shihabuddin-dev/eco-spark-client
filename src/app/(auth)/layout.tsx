import Logo from "@/components/shared/Logo";
import { Leaf } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex items-center gap-2 group max-w-7xl mx-auto py-2 px-6">
        <Logo />
      </div>
      {children}
    </>
  );
}
