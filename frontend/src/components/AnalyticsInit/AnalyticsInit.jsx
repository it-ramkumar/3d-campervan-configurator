"use client";
import { useEffect } from "react";
import { initAnalytics } from "@/CustomHooks/analytics";

export default function AnalyticsInit() {
  useEffect(() => {
    initAnalytics();
  }, []);
  return null;
}
