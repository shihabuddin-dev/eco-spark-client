"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export const BackButton = () => {
  const router = useRouter();
  
  return (
    <Button 
      variant="outline" 
      className="h-12 rounded-xl px-8 font-bold" 
      onClick={() => router.back()}
    >
       <ArrowLeft className="mr-2 h-4 w-4" />
       Go Back
    </Button>
  );
};
