"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { contact } from "@/api/contact/contact";
import { validateLead } from "@/lib/validateLead";
import { trackLead, saveLeadEmail, cleanPageUrl, createEventId, sendMetaCapi } from "@/lib/track";
import { sendToCrm } from "@/lib/crm";
import { BLACK_FRIDAY_END, isBlackFriday } from "@/utils/salePrice";
import { setLeadContext } from "@/lib/leadContext";

// Black Friday 2026 ad landing page (/black-friday). Prices come live from the
// dashboard (Price + Sale Price), so editing a van there updates this page.
// Highlights below are written per van; unknown vans fall back to their subtitle.

const PHONE = "951-441-9719";
const PHONE_HREF = "tel:+19514419719";
const SOURCE = "black_friday";
const SPEC_SOURCE = "bf_specs";

const HIGHLIGHTS = {
  "santa-monica-awd-charcoal-matte-gray": {
    chassis: "2025 Ford Transit 148 AWD · High roof",
    short: "Santa Monica",
    points: ["Seats & sleeps 4", "Full standing shower", "Electric elevator bed", "15.6 kWh lithium + 12V A/C"],
    bestFor: "Couples & small families who want a real shower and days off-grid",
  },
  "montreal-stone-gray-awd-170": {
    chassis: "Mercedes Sprinter 170 AWD · High roof",
    short: "Montreal Stone Gray",
    points: ["Full indoor bathroom", "Signature elevator bed", "2–7 belted seats, set up for you", "Our best-selling layout"],
    bestFor: "Families who need seats and a bathroom on long trips",
  },
  "montreal-170-awd-pop-top-blue-gray": {
    chassis: "Mercedes Sprinter 170 AWD · Pop-top",
    short: "Montreal Pop Top",
    points: ["Integrated pop-top", "Full indoor bathroom", "Sleeps up to 7", "4-season insulated"],
    bestFor: "Bigger families who want the most sleeping room",
  },
  "poptop-adventure-family-build": {
    chassis: "2025 Sprinter 144 AWD diesel · Low roof",
    short: "Lowroof Pop Top",
    points: ["Electric pop-top tent", "Seats 6, sleeps 5", "Hide-away indoor shower", "Big gear garage"],
    bestFor: "Families who want a shorter van that fits in a garage and parking lots",
  },
};

const money = (n) => `$${Number(n).toLocaleString("en-US")}`;

function useCountdown() {
  const [left, setLeft] = useState(null);
  useEffect(() => {
    const tick = () => {
      const ms = Math.max(0, BLACK_FRIDAY_END.getTime() - Date.now());
      setLeft({
        d: Math.floor(ms / 864e5),
        h: Math.floor((ms % 864e5) / 36e5),
        m: Math.floor((ms % 36e5) / 6e4),
        s: Math.floor((ms % 6e4) / 1e3),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return left;
}

function Countdown({ compact = false }) {
  const left = useCountdown();
  const units = [
    ["d", "Days"],
    ["h", "Hrs"],
    ["m", "Min"],
    ["s", "Sec"],
  ];
  return (
    <div className="flex gap-2" suppressHydrationWarning aria-label="Time left in the Black Friday sale">
      {units.map(([k, label]) => (
        <div
          key={k}
          className={`rounded-lg border border-white/15 bg-white/10 text-center backdrop-blur ${compact ? "min-w-[48px] px-2 py-1" : "min-w-[62px] px-3 py-2"}`}
        >
          <div className={`font-black tabular-nums text-white ${compact ? "text-lg" : "text-2xl md:text-3xl"}`}>
            {left ? String(left[k]).padStart(2, "0") : "--"}
          </div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-white/70">{label}</div>
        </div>
      ))}
    </div>
  );
}

function VanCard({ van, onClaim, onSpecs }) {
  const info = HIGHLIGHTS[van.slug];
  const savings = van.price - van.sale_price;
  const pct = Math.round((savings / van.price) * 100);
  const [img, setImg] = useState(0);
  const href = `/camper-vans-for-sale/${van.slug}`;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm transition-shadow hover:shadow-xl">
      <div className="relative aspect-[16/10] bg-primary/5">
        {van.images[img] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={van.images[img]}
            alt={van.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-[#E11D48] via-[#F97316] to-[#FACC15] px-3 py-1 text-xs font-black uppercase tracking-wider text-white shadow-lg">
          ⚡ Save {money(savings)}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white">
          Only 1 available
        </span>
        {van.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {van.images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Photo ${i + 1}`}
                onClick={() => setImg(i)}
                className={`h-2.5 w-2.5 rounded-full border border-white ${i === img ? "bg-white" : "bg-white/30"}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-hover">{info?.chassis || van.roof}</p>
        <h3 className="mt-1 text-xl font-black text-primary md:text-2xl">{van.title}</h3>
        {info?.bestFor && <p className="mt-1 text-sm text-primary/70">Best for: {info.bestFor}</p>}

        <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm text-primary">
          {(info?.points || [van.subtitle]).map((p) => (
            <li key={p} className="flex items-start gap-1.5">
              <span className="mt-0.5 text-hover" aria-hidden="true">✓</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>

        {van.availability && !/black friday/i.test(van.availability) && (
          <p className="mt-3 rounded-lg bg-secondary px-3 py-2 text-xs font-semibold text-primary/80">{van.availability}</p>
        )}

        <div className="mt-auto pt-5">
          <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
            <span className="text-3xl font-black text-primary">{money(van.sale_price)}</span>
            <span className="pb-1 text-base text-primary/50 line-through">{money(van.price)}</span>
            <span className="pb-1 text-sm font-bold text-[#E11D48]">{pct}% off</span>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => onClaim(van)}
              className="rounded-full bg-primary px-5 py-3 text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-hover"
            >
              Hold this price
            </button>
            <Link
              href={href}
              className="rounded-full border-2 border-primary/15 px-5 py-3 text-center text-sm font-bold uppercase tracking-wider text-primary transition-colors hover:border-hover hover:text-hover"
            >
              Photos & specs
            </Link>
          </div>
          <button
            type="button"
            onClick={() => onSpecs(van)}
            className="mt-3 w-full text-center text-sm font-bold text-hover underline underline-offset-4 hover:text-primary"
          >
            Email me the full spec sheet
          </button>
        </div>
      </div>
    </article>
  );
}


function LeadForm({ vans, selected, setSelected, formRef }) {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [showNote, setShowNote] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const van = vans.find((v) => v.slug === selected);
  const change = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((x) => ({ ...x, [name]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;
    const fieldErrors = validateLead(form, { requirePhone: true });
    setErrors(fieldErrors);
    setSubmitError("");
    if (Object.keys(fieldErrors).length) return;

    const vanLine = van
      ? `${van.title}: Black Friday price ${money(van.sale_price)} (regular ${money(van.price)})`
      : "Not sure yet, wants help choosing";
    const message =
      `[Black Friday landing page]\nVan: ${vanLine}` +
      (form.message.trim() ? `\n\n${form.message.trim()}` : "");

    const eventId = createEventId();
    setLoading(true);
    try {
      await contact({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message,
        vanSlug: van?.slug,
        vanTitle: van?.title || "Black Friday sale (van not chosen)",
        vanPrice: van ? van.price : 0,
        ...(van && { salePrice: van.sale_price, saleTagline: "Black Friday Sale" }),
        pageUrl: cleanPageUrl(),
        event_id: eventId,
        lead_source: SOURCE,
      });
    } catch (err) {
      setSubmitError(err.message || "We couldn't send your request. Please call us.");
      setLoading(false);
      return;
    }

    sendToCrm({
      event_id: eventId,
      lead_source: SOURCE,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      van_slug: van?.slug || "",
      van_title: van?.title || "",
      van_price: van?.price || "",
      sale_price: van?.sale_price || "",
      message: form.message.trim(),
    });
    trackLead({ source: SOURCE, email: form.email, phone: form.phone, name: form.name, eventId });
    saveLeadEmail(form.email);
    router.push(`/thank-you?source=${SOURCE}`);
  };

  const input =
    "w-full rounded-xl border-2 border-primary/10 bg-white px-4 py-3 text-base text-primary outline-none transition focus:border-hover focus:ring-4 focus:ring-hover/10 placeholder:text-primary/35";

  return (
    <form ref={formRef} id="hold-price" data-bbv-form="bf_hold_price" data-van-slug={van?.slug || ""} data-van-title={van?.title || ""} onSubmit={submit} noValidate className="scroll-mt-24 rounded-2xl bg-white p-5 shadow-xl sm:p-8">
      <h2 className="text-2xl font-black text-primary md:text-3xl">Hold your Black Friday price</h2>
      <p className="mt-2 text-sm text-primary/70">
        Pick a van and leave your number. Anna will text or call you the same day with a walkaround video and answers. No obligation.
      </p>

      <fieldset className="mt-6">
        <legend className="mb-2 text-sm font-bold text-primary">Which van?</legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {[...vans, { slug: "", title: "Not sure yet, help me choose" }].map((v) => (
            <label
              key={v.slug || "unsure"}
              className={`flex cursor-pointer items-center justify-between gap-2 rounded-xl border-2 px-4 py-3 text-sm transition ${
                selected === v.slug ? "border-hover bg-hover/10 font-bold text-primary" : "border-primary/10 text-primary hover:border-hover/60"
              }`}
            >
              <input type="radio" name="van" value={v.slug} checked={selected === v.slug} onChange={() => setSelected(v.slug)} className="sr-only" />
              <span>{HIGHLIGHTS[v.slug]?.short || v.title}</span>
              {v.sale_price ? <span className="whitespace-nowrap font-black">{money(v.sale_price)}</span> : null}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 grid grid-cols-1 gap-3">
        <div>
          <label htmlFor="bf-name" className="mb-1 block text-sm font-bold text-primary">Your name</label>
          <input id="bf-name" name="name" autoComplete="name" enterKeyHint="next" value={form.name} onChange={change} className={input} placeholder="First and last name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "bf-name-err" : undefined} />
          {errors.name && <p id="bf-name-err" role="alert" className="mt-1 text-xs font-semibold text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="bf-phone" className="mb-1 block text-sm font-bold text-primary">Mobile phone</label>
          <input id="bf-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" enterKeyHint="next" value={form.phone} onChange={change} className={input} placeholder="(555) 555-5555" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "bf-phone-err" : undefined} />
          {errors.phone && <p id="bf-phone-err" role="alert" className="mt-1 text-xs font-semibold text-red-600">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="bf-email" className="mb-1 block text-sm font-bold text-primary">Email</label>
          <input id="bf-email" name="email" type="email" inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck={false} enterKeyHint="send" value={form.email} onChange={change} className={input} placeholder="you@email.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "bf-email-err" : undefined} />
          {errors.email && <p id="bf-email-err" role="alert" className="mt-1 text-xs font-semibold text-red-600">{errors.email}</p>}
        </div>
        {showNote ? (
          <div>
            <label htmlFor="bf-msg" className="mb-1 block text-sm font-bold text-primary">Question <span className="font-normal text-primary/50">(optional)</span></label>
            <textarea id="bf-msg" name="message" rows={3} value={form.message} onChange={change} className={input} placeholder="Trade-in, delivery to your state, how many seats you need…" />
          </div>
        ) : (
          <button type="button" onClick={() => setShowNote(true)} className="justify-self-start text-sm font-bold text-primary/70 underline underline-offset-4 hover:text-primary">
            + Add a question (optional)
          </button>
        )}
      </div>

      {submitError && <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{submitError}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-full bg-gradient-to-r from-[#E11D48] via-[#F97316] to-[#FACC15] px-6 py-4 text-base font-black uppercase tracking-wider text-white shadow-lg shadow-orange-500/30 transition-transform hover:scale-[1.01] disabled:opacity-60"
      >
        {loading ? "Sending…" : van ? `Hold ${money(van.sale_price)} for me` : "Send my request"}
      </button>
      <p className="mt-3 text-center text-sm text-primary/60">
        Prefer to talk now?{" "}
        <a href={PHONE_HREF} data-bbvt-click="bf_form_call" className="font-bold text-primary underline">Call Anna {PHONE}</a>{" "}
        or <a href="sms:+19514419719" data-bbvt-click="bf_form_text" className="font-bold text-primary underline">text her</a>
      </p>
      <p className="mt-1 text-center text-xs text-primary/40">We only use your details to answer you. No spam.</p>
    </form>
  );
}


// Low-commitment offer: the full spec sheet by email (phone optional).
// Same Lead event as the main form, so Meta/Google learn from it too; the CRM
// emails the sheet and starts the Black Friday follow-up sequence.
function SpecSheetForm({ vans, selected, setSelected, formRef }) {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const van = vans.find((v) => v.slug === selected) || vans[0];

  const change = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((x) => ({ ...x, [name]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (loading || !van) return;
    const fieldErrors = validateLead(form, { requirePhone: false });
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length) return;

    const eventId = createEventId();
    setLoading(true);
    try {
      await contact({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: `[Black Friday spec sheet request]\nVan: ${van.title}: Black Friday price ${money(van.sale_price)} (regular ${money(van.price)})`,
        vanSlug: van.slug,
        vanTitle: van.title,
        vanPrice: van.price,
        salePrice: van.sale_price,
        saleTagline: "Black Friday Sale",
        pageUrl: cleanPageUrl(),
        event_id: eventId,
        lead_source: SPEC_SOURCE,
      });
    } catch {
      // The CRM copy below still captures the request and emails the sheet.
    }

    sendToCrm({
      event_id: eventId,
      lead_source: SPEC_SOURCE,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      van_slug: van.slug,
      van_title: van.title,
      van_price: van.price,
      sale_price: van.sale_price,
      message: "Requested the spec sheet",
    });
    trackLead({ source: SPEC_SOURCE, email: form.email, phone: form.phone, name: form.name, eventId });
    saveLeadEmail(form.email);
    router.push(`/black-friday/spec-sheet/${van.slug}?sent=1`);
  };

  const input =
    "w-full rounded-xl border-2 border-white/20 bg-white px-4 py-3 text-base text-primary outline-none transition focus:border-hover focus:ring-4 focus:ring-hover/20 placeholder:text-primary/35";

  return (
    <form ref={formRef} id="spec-sheet" data-bbv-form="bf_spec_sheet" data-van-slug={van?.slug || ""} data-van-title={van?.title || ""} onSubmit={submit} noValidate className="scroll-mt-24">
      <div className="flex flex-wrap gap-2">
        {vans.map((v) => (
          <button
            key={v.slug}
            type="button"
            onClick={() => setSelected(v.slug)}
            aria-pressed={van?.slug === v.slug}
            className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition ${
              van?.slug === v.slug ? "border-hover bg-hover text-white" : "border-white/25 text-white hover:border-white"
            }`}
          >
            {HIGHLIGHTS[v.slug]?.short || v.title}
          </button>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div>
          <label htmlFor="ss-name" className="sr-only">Name</label>
          <input id="ss-name" name="name" autoComplete="name" value={form.name} onChange={change} className={input} placeholder="Your name" aria-invalid={!!errors.name} />
          {errors.name && <p className="mt-1 text-xs text-red-300">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="ss-email" className="sr-only">Email</label>
          <input id="ss-email" name="email" type="email" autoComplete="email" value={form.email} onChange={change} className={input} placeholder="you@email.com" aria-invalid={!!errors.email} />
          {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="ss-phone" className="sr-only">Phone (optional)</label>
          <input id="ss-phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={change} className={input} placeholder="Phone (optional)" aria-invalid={!!errors.phone} />
          {errors.phone && <p className="mt-1 text-xs text-red-300">{errors.phone}</p>}
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full rounded-full bg-gradient-to-r from-[#E11D48] via-[#F97316] to-[#FACC15] px-6 py-4 text-base font-black uppercase tracking-wider text-white shadow-lg shadow-orange-500/30 transition-transform hover:scale-[1.01] disabled:opacity-60"
      >
        {loading ? "Sending…" : `Send me the ${HIGHLIGHTS[van?.slug]?.short || "van"} spec sheet`}
      </button>
      <p className="mt-2 text-center text-xs text-white/60">Opens right away and lands in your inbox. No spam, no pressure.</p>
    </form>
  );
}

const FAQS = [
  {
    q: "Are these vans really ready, or do I wait for a build?",
    a: "They are already built in Big Bear, CA, so there is no build queue. Each van card shows when it can go home; some are ready for pickup in December.",
  },
  {
    q: "How do I lock in the Black Friday price?",
    a: "Send the form or call us before the end of November 28 (Pacific). A $5,000 deposit holds your van at the sale price while we finish paperwork and schedule pickup or delivery.",
  },
  {
    q: "I'm not in California. Can I still buy?",
    a: "Yes. We do FaceTime walkthroughs of the exact van and arrange delivery across the US.",
  },
  {
    q: "Can I finance a camper van?",
    a: "Many buyers do. RV loans on these vans can run up to 20 years. Ask us and we will connect you with lenders we work with.",
  },
  {
    q: "Can you change anything before I take it?",
    a: "Small changes like seat setup in the Montreal front zone are part of the build. Ask about anything else and we will quote it.",
  },
  {
    q: "What happens after November 28?",
    a: "Prices go back to the regular price shown crossed out. Each van is one of a kind, so once it sells it's gone.",
  },
];

export default function BlackFridayLanding({ vans = [] }) {
  const [selected, setSelected] = useState(vans[0]?.slug || "");
  const formRef = useRef(null);
  const specRef = useRef(null);
  const [specVan, setSpecVan] = useState(vans[0]?.slug || "");
  const [live, setLive] = useState(true);
  const maxSavings = vans.reduce((m, v) => Math.max(m, v.price - v.sale_price), 0);
  const lowest = vans.reduce((m, v) => (m === null || v.sale_price < m ? v.sale_price : m), null);

  useEffect(() => {
    setLive(isBlackFriday());
    // ?van=<slug> (from the spec sheet "Book a FaceTime walkthrough" link) preselects that van
    try {
      const want = new URLSearchParams(window.location.search).get("van");
      if (want && vans.some((v) => v.slug === want)) setSelected(want);
    } catch {
      // ignore
    }
    // ViewContent: lets Meta build "viewed the Black Friday page" retargeting audiences
    // from both the Pixel and the Conversions API (same event_id, counted once).
    try {
      const eventId = createEventId();
      window.fbq?.("track", "ViewContent", { content_name: "Black Friday 2026", content_category: "camper_van_sale" }, { eventID: eventId });
      sendMetaCapi({ eventName: "ViewContent", eventId, source: SOURCE });
    } catch {
      // tracking never breaks the page
    }
  }, []);

  const claim = (van) => {
    setSelected(van.slug);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const specs = (van) => {
    setSpecVan(van.slug);
    specRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const toForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  // The site-wide contact bar (LeadDock) shows "Hold my price" here and scrolls to the form.
  useEffect(() => setLeadContext({ primaryLabel: "Hold my price", onPrimary: toForm, source: SOURCE }), []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="bg-secondary pb-24 md:pb-0">
      {/* HERO */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(249,115,22,0.35),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(225,29,72,0.35),transparent_45%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="mb-4 inline-block rounded-full bg-gradient-to-r from-[#E11D48] via-[#F97316] to-[#FACC15] px-4 py-1 text-xs font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-orange-500/40">
              {live ? "⚡ Black Friday · Ends Nov 28" : "Sale ended"}
            </p>
            <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-6xl">
              <span className="bg-gradient-to-r from-[#FACC15] via-[#F97316] to-[#E11D48] bg-clip-text text-transparent">Black Friday</span>
              <br />Camper Van Sale
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/90">
              {vans.length} AWD camper vans, built and ready, each with an indoor shower and an elevator bed.
              {maxSavings > 0 && <> Save up to <strong className="text-white">{money(maxSavings)}</strong>.</>}
              {lowest && <> From <strong className="text-white">{money(lowest)}</strong>.</>}
            </p>
            <div className="mt-7"><Countdown /></div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#vans" className="rounded-full bg-gradient-to-r from-[#E11D48] via-[#F97316] to-[#FACC15] px-8 py-4 text-center text-sm font-black uppercase tracking-wider text-white shadow-lg shadow-orange-500/40 transition-transform hover:scale-105">
                See the {vans.length} vans
              </a>
              <a href={PHONE_HREF} className="rounded-full border-2 border-white/30 px-8 py-4 text-center text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-white">
                Call {PHONE}
              </a>
            </div>
          </div>
          {vans[0]?.images?.[0] && (
            <div className="relative hidden overflow-hidden rounded-2xl shadow-2xl md:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={vans[0].images[0]} alt={vans[0].title} className="aspect-[4/3] w-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                <p className="text-sm font-bold">{vans[0].title}</p>
                <p className="text-2xl font-black">
                  {money(vans[0].sale_price)} <span className="text-base font-normal text-white/60 line-through">{money(vans[0].price)}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-b border-primary/10 bg-white">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 text-center text-sm font-bold text-primary md:grid-cols-5">
          {["Built in Big Bear, CA", "Ready now, no build wait", "AWD on every van", "Indoor shower in every van", "Delivery across the US"].map((t) => (
            <li key={t} className="flex items-center justify-center gap-2"><span className="text-hover">●</span>{t}</li>
          ))}
        </ul>
      </section>

      {/* VANS */}
      <section id="vans" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-14 md:py-20">
        <div className="mb-10 text-center">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-hover">One of each</p>
          <h2 className="mt-2 text-3xl font-black text-primary md:text-5xl">Pick your van</h2>
          <p className="mx-auto mt-3 max-w-2xl text-primary/70">
            Each van is a one-off build. When it sells, that layout and price are gone.
          </p>
        </div>
        {vans.length ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {vans.map((v) => <VanCard key={v.slug} van={v} onClaim={claim} onSpecs={specs} />)}
          </div>
        ) : (
          <p className="text-center text-primary/70">
            The Black Friday vans have sold. <Link href="/camper-vans-for-sale" className="font-bold underline">See vans for sale</Link>.
          </p>
        )}
      </section>

      {/* SPEC SHEET OFFER */}
      {vans.length > 0 && (
        <section className="bg-black text-white">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-5 md:py-16">
            <div className="md:col-span-2">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-hover">Not ready to talk yet?</p>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">Get the full spec sheet</h2>
              <p className="mt-3 text-white/75">
                Every detail in one page: chassis, electrical system, heating & A/C, water tanks, kitchen appliances and bathroom. Save it as a PDF and compare at your own pace.
              </p>
            </div>
            <div className="md:col-span-3">
              <SpecSheetForm vans={vans} selected={specVan} setSelected={setSpecVan} formRef={specRef} />
            </div>
          </div>
        </section>
      )}

      {/* WHY NOW */}
      <section className="bg-primary text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-3 md:py-20">
          {[
            ["Skip the wait", "Ordering a custom build means months in a queue. These vans are finished, so you can be camping this winter."],
            ["Built for 4 seasons", "AWD, insulated, with big lithium power systems. We build in Big Bear, which is snow country, so our vans are made for winter trips too."],
            ["Real bathrooms", "Every van on sale has an indoor shower, and both Montreals have a full indoor bathroom. That's rare at this price."],
          ].map(([h, p]) => (
            <div key={h}>
              <h3 className="text-xl font-black text-hover">{h}</h3>
              <p className="mt-2 text-white/80">{p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS + FORM */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-5 md:py-20">
        <div className="md:col-span-2">
          <h2 className="text-3xl font-black text-primary md:text-4xl">How it works</h2>
          <ol className="mt-6 space-y-6">
            {[
              ["Tell us which van", "Send the form or call. Anna gets back to you the same day."],
              ["See it live", "Get a FaceTime walkthrough of the exact van, or come drive it in Big Bear."],
              ["Hold your price", "A $5,000 deposit holds the Black Friday price. Pick up in Big Bear or we deliver."],
            ].map(([h, p], i) => (
              <li key={h} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-hover text-lg font-black text-white">{i + 1}</span>
                <div>
                  <p className="font-black text-primary">{h}</p>
                  <p className="text-sm text-primary/70">{p}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8 rounded-2xl bg-black p-5 text-white">
            <p className="text-sm font-bold uppercase tracking-widest text-white/70">Sale ends in</p>
            <div className="mt-3"><Countdown compact /></div>
          </div>
        </div>
        <div className="md:col-span-3">
          <LeadForm vans={vans} selected={selected} setSelected={setSelected} formRef={formRef} />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-14 md:py-20">
          <h2 className="text-center text-3xl font-black text-primary md:text-4xl">Questions</h2>
          <div className="mt-8 divide-y divide-primary/10">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-primary">
                  {f.q}
                  <span className="text-xl text-hover transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-primary/75">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
