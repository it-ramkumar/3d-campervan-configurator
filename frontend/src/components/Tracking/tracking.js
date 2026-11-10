const TRACKING_KEY = "tracking";
const TTL_MS = 90 * 24 * 60 * 60 * 1000; // keep ad attribution for 90 days
const PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
];

const store = () => {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

export const loadTracking = () => {
  if (typeof window === "undefined") return {};
  try {
    const saved = JSON.parse(store()?.getItem(TRACKING_KEY) || "null");
    if (saved && (!saved.saved_at || Date.now() - saved.saved_at < TTL_MS)) return saved;
  } catch {
    // corrupted or blocked storage
  }
  try {
    // older builds kept it in sessionStorage
    return JSON.parse(window.sessionStorage.getItem(TRACKING_KEY)) || {};
  } catch {
    return {};
  }
};

// Called on every page load. The first visit sets landing_page/referrer; any visit that
// arrives with UTM or click-id parameters (an ad or email click) replaces the campaign
// fields, so a lead is credited to the most recent ad click, not to an earlier
// direct visit. Read back through readTracking() in lib/track.js.
export const saveTrackingData = () => {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const fresh = {};
    PARAMS.forEach((key) => {
      const value = params.get(key);
      if (value) fresh[key] = value.slice(0, 500);
    });

    const prev = loadTracking();
    let tracking = prev;

    if (Object.keys(fresh).length) {
      tracking = {
        landing_page: window.location.pathname,
        first_landing_page: prev.first_landing_page || prev.landing_page || window.location.pathname,
        ...fresh,
      };
    } else if (!prev.landing_page) {
      tracking = { landing_page: window.location.pathname };
    } else {
      return; // nothing new; keep what we have
    }

    // Referrer without its query string (it can carry PII from other sites)
    if (document.referrer) {
      try {
        const ref = new URL(document.referrer);
        if (ref.host !== window.location.host) tracking.referrer = `${ref.origin}${ref.pathname}`;
      } catch {
        // malformed referrer; skip it
      }
    }

    tracking.saved_at = Date.now();
    const json = JSON.stringify(tracking);
    store()?.setItem(TRACKING_KEY, json);
    try {
      window.sessionStorage.setItem(TRACKING_KEY, json);
    } catch {
      // ignore
    }
  } catch {
    // storage blocked; leads still submit without attribution
  }
};
