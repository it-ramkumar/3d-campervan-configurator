import { createHash } from "node:crypto";
import { cookies, headers } from "next/headers";

// Meta Conversions API: sends lead events server-side, alongside the browser
// Pixel. Both use the same event_id, so Meta counts each lead once.
//
// Env vars (set in AWS Amplify, never in this public repo):
//   META_CAPI_ACCESS_TOKEN  required; from Events Manager > Settings > Conversions API
//   META_PIXEL_ID           optional; defaults to the site's Pixel
//   META_TEST_EVENT_CODE    optional; only while testing in Events Manager > Test events

const PIXEL_ID = process.env.META_PIXEL_ID || "1313881125922339";
const GRAPH_VERSION = "v21.0";
const ALLOWED_EVENTS = new Set(["Lead", "Schedule", "Contact", "ViewContent"]);
const ALLOWED_HOSTS = ["bigbearvans.com", "www.bigbearvans.com", "localhost"];

const sha256 = (value) => createHash("sha256").update(value).digest("hex");

const hashEmail = (email) => {
  const v = String(email || "").trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? sha256(v) : undefined;
};

// Meta wants digits only, with country code (no "+").
const hashPhone = (phone) => {
  let digits = String(phone || "").replace(/\D/g, "");
  if (digits.length === 10) digits = `1${digits}`;
  return digits.length >= 7 && digits.length <= 15 ? sha256(digits) : undefined;
};

const hashName = (name) => {
  const v = String(name || "").trim().toLowerCase();
  return v ? sha256(v) : undefined;
};

const isAllowedOrigin = (value) => {
  if (!value) return false;
  try {
    const host = new URL(value).hostname;
    return ALLOWED_HOSTS.includes(host) || host.endsWith(".amplifyapp.com");
  } catch {
    return false;
  }
};

export async function POST(request) {
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!token) return Response.json({ ok: false, reason: "not_configured" }, { status: 202 });

  const h = await headers();
  if (!isAllowedOrigin(h.get("origin") || h.get("referer"))) {
    return Response.json({ ok: false }, { status: 403 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const eventName = String(body?.event_name || "");
  const eventId = String(body?.event_id || "").slice(0, 100);
  if (!ALLOWED_EVENTS.has(eventName) || !eventId) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const jar = await cookies();
  const fbp = jar.get("_fbp")?.value;
  let fbc = jar.get("_fbc")?.value;
  if (!fbc && body?.fbclid) fbc = `fb.1.${Date.now()}.${String(body.fbclid).slice(0, 500)}`;

  const ip = (h.get("x-forwarded-for") || "").split(",")[0].trim() || h.get("x-real-ip") || undefined;

  const userData = {
    em: hashEmail(body?.email),
    ph: hashPhone(body?.phone),
    fn: hashName(body?.first_name),
    ln: hashName(body?.last_name),
    client_ip_address: ip,
    client_user_agent: h.get("user-agent") || undefined,
    fbp,
    fbc,
  };
  for (const k of Object.keys(userData)) if (!userData[k]) delete userData[k];

  const event = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    action_source: "website",
    event_source_url: isAllowedOrigin(body?.event_source_url) ? body.event_source_url : undefined,
    user_data: userData,
    custom_data: body?.source ? { lead_source: String(body.source).slice(0, 50) } : undefined,
  };

  const payload = { data: [event] };
  if (process.env.META_TEST_EVENT_CODE) payload.test_event_code = process.env.META_TEST_EVENT_CODE;

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      },
    );
    if (!res.ok) {
      console.error("Meta CAPI error:", res.status, await res.text());
      return Response.json({ ok: false }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Meta CAPI request failed:", err?.message);
    return Response.json({ ok: false }, { status: 502 });
  }
}
