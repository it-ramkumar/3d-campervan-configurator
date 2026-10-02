// Shared lead attribution for /contact, /inquery and /recommend.
// fbclid is added by Facebook/Instagram to every outbound click (ads and organic),
// so it only counts as "Meta Ads" when the UTM medium says the click was paid.
const META_SOURCES = ["facebook", "fb", "instagram", "ig", "meta"];
const PAID_MEDIUMS = ["cpc", "ppc", "paid", "paid_social", "paidsocial", "ads"];

const detectLeadSource = (body = {}) => {
  const source = String(body.utm_source || "").toLowerCase();
  const medium = String(body.utm_medium || "").toLowerCase();
  const referrer = String(body.referrer || "").toLowerCase();
  const isPaid = PAID_MEDIUMS.includes(medium);

  if (body.gclid) return "Google Ads";
  if (source === "google" && isPaid) return "Google Ads";

  const isMeta =
    body.fbclid ||
    META_SOURCES.includes(source) ||
    referrer.includes("facebook.") ||
    referrer.includes("instagram.");
  if (isMeta) return isPaid ? "Meta Ads" : "Facebook / Instagram";

  if (source === "google" || referrer.includes("google")) return "Organic Search";
  return "Direct";
};

// Stored with every lead so CAPI / offline conversions can dedupe on event_id
const trackingFields = (body = {}) => ({
  gclid: body.gclid || null,
  fbclid: body.fbclid || null,
  event_id: body.event_id || null,
  lead_source: body.lead_source || null,
  utm_source: body.utm_source || null,
  utm_medium: body.utm_medium || null,
  utm_campaign: body.utm_campaign || null,
  utm_term: body.utm_term || null,
  utm_content: body.utm_content || null,
  referrer: body.referrer || null,
  landing_page: body.landing_page || null,
});

module.exports = { detectLeadSource, trackingFields };
