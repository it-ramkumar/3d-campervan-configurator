"use client";
import { useEffect } from "react";
import { initAnalytics } from "@/CustomHooks/analytics";

// Lead email click tracking: links in BBV lead emails carry ?bbvl=<lead id>.
// We ping the BBV Lead Emails Apps Script so the dashboard shows the click.
const BBV_EMAIL_TRACKER =
  "https://script.google.com/macros/s/AKfycbxL8Xjvgu0AtOflmy7e4Fwfs5ajK2EoSMWzc6hjJTFMWmI0y0x22b5CWqmzLVlTqlaI4A/exec";

function trackLeadEmailClick() {
  try {
    const params = new URLSearchParams(window.location.search);
    const lead = params.get("bbvl");
    if (!lead) return;
    const key = "bbvl_tracked_" + lead + "_" + window.location.pathname;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    const img = new Image();
    img.src =
      BBV_EMAIL_TRACKER +
      "?t=c&l=" + encodeURIComponent(lead) +
      "&p=" + encodeURIComponent(window.location.pathname);
  } catch (e) {
    // tracking must never break the page
  }
}

export default function AnalyticsInit() {
  useEffect(() => {
    initAnalytics();
    trackLeadEmailClick();
  }, []);
  return null;
}
