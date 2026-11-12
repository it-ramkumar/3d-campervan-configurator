"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initTracker, trackPage } from "@/lib/bbvt";

// Starts the BBV Live tracker once and logs every client-side page change.
export default function BbvTracker() {
  const pathname = usePathname();
  useEffect(() => {
    initTracker();
  }, []);
  useEffect(() => {
    if (pathname) trackPage(pathname);
  }, [pathname]);
  return null;
}
