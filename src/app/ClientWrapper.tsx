"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Main from "./layout";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [showNavbar, setShowNavbar] = useState(true);
  const pathname = usePathname();

  // Show or hide Navbar based on the current route
  useEffect(() => {
    if (pathname === "/login") {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [pathname]);

  return (
    <>
        
      {showNavbar && <Navbar />}

        {children}
       
        
    </>
  );
}
