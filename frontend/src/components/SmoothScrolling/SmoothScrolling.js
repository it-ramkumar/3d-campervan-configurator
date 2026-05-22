"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function NativeScrollProvider({ children }) {
  const pathname = usePathname();

  // 🚀 NEXT.JS LINK ROUTE RESET
  // Jaise hi pathname badlega, ye page ko instant zero top par phenk dega
  // Isse screen stuck ya freeze hone ka chance 0% ho jata hai
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" // Instant reset taake dynamic content frame render ho sake
    });
  }, [pathname]);

  return <>{children}</>;
}