"use client";

import { sendGTMEvent } from "@next/third-parties/google";

const TRACKING_KEY = "tracking";
const LEAD_EMAIL_KEY = "bbv_lead_email";

const isBrowser = () => typeof window !== "undefined";

// Google Ads conversion "BBV Lead - Website Form" (account 524-003-2500)
export const GOOGLE_ADS_ID = "AW-17907771927";
const GOOGLE_ADS_LEAD = `${GOOGLE_ADS_ID}/nJ9SCMP1hbQdEJfUi9tC`;

// Generate before the API call so the backend can store the same id Meta/Ads dedupe on
export const createEventId = () => {
  try {
    if (isBrowser() && window.crypto?.randomUUID) return window.crypto.randomUUID();
  } catch {
    // randomUUID needs a secure context; fall through
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
};

// E.164 (+1XXXXXXXXXX). Returns undefined when the number can't be trusted.
export const toE164 = (phone) => {
  if (!phone) return undefined;
  const raw = String(phone).trim();
  let digits = raw.replace(/\D/g, "");
  if (!raw.startsWith("+") && digits.startsWith("00")) digits = digits.slice(2);
  // Bare 10-digit numbers are assumed to be US/Canada
  if (!raw.startsWith("+") && digits.length === 10) digits = `1${digits}`;
  if (digits.length < 7 || digits.length > 15) return undefined;
  return `+${digits}`;
};

// Server-side copy of a Pixel event (Meta Conversions API), same event_id for dedupe.
export const sendMetaCapi = ({ eventName, eventId, source, email, phone, firstName, lastName } = {}) => {
  if (!isBrowser() || !eventName || !eventId) return;
  const tracking = readTracking();
  const body = JSON.stringify({
    event_name: eventName,
    event_id: eventId,
    source,
    email,
    phone,
    first_name: firstName,
    last_name: lastName,
    fbclid: tracking.fbclid,
    event_source_url: cleanPageUrl(),
  });
  try {
    fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // never block a lead on tracking
  }
};

export const trackLead = ({ source, email, phone, name, eventId = createEventId() } = {}) => {
  const [firstName, ...rest] = String(name || "").trim().split(/\s+/);
  const lastName = rest.join(" ");
  if (!isBrowser()) return;

  const userData = {};
  if (email) userData.email = String(email).trim().toLowerCase();
  const phoneNumber = toE164(phone);
  if (phoneNumber) userData.phone_number = phoneNumber;

  sendGTMEvent({
    event: "generate_lead",
    lead_source: source,
    event_id: eventId,
    user_data: userData,
  });

  // Google Ads lead conversion (+ enhanced conversions user data; gtag hashes it)
  try {
    if (typeof window.gtag === "function") {
      if (Object.keys(userData).length) window.gtag("set", "user_data", userData);
      window.gtag("event", "conversion", {
        send_to: GOOGLE_ADS_LEAD,
        value: 1.0,
        currency: "USD",
        transaction_id: eventId,
      });
    }
  } catch {
    // never block a lead on tracking
  }

  const metaEvent = source === "booking" ? "Schedule" : "Lead";
  window.fbq?.("track", metaEvent, { source }, { eventID: eventId });
  sendMetaCapi({ eventName: metaEvent, eventId, source, email, phone, firstName, lastName });

  return eventId;
};

export const readTracking = () => {
  if (!isBrowser()) return {};
  try {
    return JSON.parse(window.sessionStorage.getItem(TRACKING_KEY)) || {};
  } catch {
    return {};
  }
};

export const withTracking = (data = {}) => ({ ...data, ...readTracking() });

export const cleanPageUrl = () =>
  isBrowser() ? `${window.location.origin}${window.location.pathname}` : null;

export const saveLeadEmail = (email) => {
  if (!isBrowser() || !email) return;
  try {
    window.sessionStorage.setItem(LEAD_EMAIL_KEY, String(email).trim());
  } catch {
    // storage blocked; thank-you page falls back to generic copy
  }
};

export const readLeadEmail = () => {
  if (!isBrowser()) return "";
  try {
    return window.sessionStorage.getItem(LEAD_EMAIL_KEY) || "";
  } catch {
    return "";
  }
};
