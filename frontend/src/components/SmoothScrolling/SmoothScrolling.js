"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function NativeScrollProvider({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return <>{children}</>;
}
