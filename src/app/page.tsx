"use client";
import { useEffect } from "react";
import Section from "@/components/Section";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

export default function Home() {  
  

  const { isConnected } = useAccount();
  const router = useRouter();

  // Redirect to login if not connected
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!isConnected) {
        router.push("/login");
      } else {
        console.log("User is logged in");
      }
    }
  },[isConnected]);

  return (
    <div>
      {/* Section Component */}
      <Section />
    </div>
  );
}
