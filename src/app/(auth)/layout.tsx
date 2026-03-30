import Footer from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
// import { Leaf } from "lucide-react";
// import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar/>
      {/* <Link href="/" className="flex items-center gap-2 group max-w-7xl mx-auto py-2 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
          <Leaf className="h-6 w-6" />
        </div>
        <span className="text-xl font-bold tracking-tight">EcoSpark</span>
      </Link> */}

      {children}
      <Footer/>
    </>
  );
}
