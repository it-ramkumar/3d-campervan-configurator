"use client";

import { sendGTMEvent } from "@next/third-parties/google";

const TRACKING_KEY = "tracking";
const LEAD_EMAIL_KEY = "bbv_lead_email";

const isBrowser = () => typeof window !== "undefined";

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

export const trackLead = ({ source, email, phone, eventId = createEventId() } = {}) => {
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

  window.fbq?.(
    "track",
    source === "booking" ? "Schedule" : "Lead",
    { source },
    { eventID: eventId }
  );

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
