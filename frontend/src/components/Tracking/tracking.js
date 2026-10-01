const TRACKING_KEY = "tracking";
const PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
];

// First touch only: stored once per session on the landing page, never overwritten.
// Read back through withTracking() in lib/track.js.
export const saveTrackingData = () => {
  if (typeof window === "undefined") return;
  try {
    if (window.sessionStorage.getItem(TRACKING_KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const tracking = { landing_page: window.location.pathname };

    PARAMS.forEach((key) => {
      const value = params.get(key);
      if (value) tracking[key] = value.slice(0, 500);
    });

    // Referrer without its query string (it can carry PII from other sites)
    if (document.referrer) {
      try {
        const ref = new URL(document.referrer);
        tracking.referrer = `${ref.origin}${ref.pathname}`;
      } catch {
        // malformed referrer; skip it
      }
    }

    window.sessionStorage.setItem(TRACKING_KEY, JSON.stringify(tracking));
  } catch {
    // storage blocked; leads still submit without attribution
  }
};
