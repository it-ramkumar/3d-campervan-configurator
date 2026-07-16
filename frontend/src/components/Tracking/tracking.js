export const saveTrackingData = () => {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const hasNewTracking = params.get("gclid") || params.get("utm_source");

  if (!hasNewTracking) return;

  const tracking = {
    gclid: params.get("gclid"),
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_term: params.get("utm_term"),
    utm_content: params.get("utm_content"),
    referrer: document.referrer,
    landing_page: window.location.href,
  };

  sessionStorage.setItem("tracking", JSON.stringify(tracking));
};