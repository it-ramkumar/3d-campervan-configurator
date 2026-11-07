"use client";

import { readTracking, cleanPageUrl } from "@/lib/track";

// BBV CRM intake (Google Apps Script web app in visit.bigbearvans@gmail.com).
// Every website lead is copied here so the CRM can track stages, send the
// follow-up email sequence and report lead quality back to Meta (CAPI).
// Fire-and-forget: the lead is already saved by the main API, so a CRM
// failure must never block the visitor.
export const CRM_URL =
  "https://script.google.com/macros/s/AKfycbxL8Xjvgu0AtOflmy7e4Fwfs5ajK2EoSMWzc6hjJTFMWmI0y0x22b5CWqmzLVlTqlaI4A/exec";

export const sendToCrm = (lead = {}) => {
  if (typeof window === "undefined") return;
  try {
    const body = JSON.stringify({
      type: "lead",
      ...readTracking(),
      ...lead,
      page_url: cleanPageUrl(),
      user_agent: navigator.userAgent,
      submitted_at: new Date().toISOString(),
    });
    // text/plain keeps this a "simple" request, so no CORS preflight is needed.
    fetch(CRM_URL, {
      method: "POST",
      mode: "no-cors",
      keepalive: true,
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body,
    }).catch(() => {});
  } catch {
    // never block a lead on the CRM copy
  }
};
