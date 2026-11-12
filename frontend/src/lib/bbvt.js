"use client";

// BBV Live tracker (built Nov 2026): self-hosted visitor analytics for bigbearvans.com.
// Sends page views, scroll depth, sections seen, clicks (rage/dead), call/text taps,
// form behaviour (start, each field, errors, submit, abandon), contact details the moment
// they are typed (partial leads -> CRM), speed, JS errors and rrweb session replays
// (all inputs masked) to the "BBV Live" Apps Script. Dashboard: /team/live.
// Skips bots, iframes, the admin dashboard and ?bbvt_off=1.

import { readTracking, cleanPageUrl } from "@/lib/track";
import { CRM_URL } from "@/lib/crm";

// Same Apps Script web app as the CRM (BBV Lead Emails project); doPost/doGet route
// tracker batches, chat actions and ?api= reads to the BBV Live handlers.
export const LIVE_URL = CRM_URL;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SKIP_PATHS = /^\/(dashboard|login|team|configurator)(\/|$)/;

let S = null; // tracker state, one per page load

const ls = (k, v) => {
  try {
    if (v === undefined) return window.localStorage.getItem(k);
    window.localStorage.setItem(k, v);
  } catch {
    return null;
  }
  return null;
};
const rid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36);
const now = () => Date.now();

export const deviceType = () => {
  const w = window.innerWidth;
  return w < 768 ? "mobile" : w < 1024 ? "tablet" : "desktop";
};

export const visitorIds = () => {
  if (typeof window === "undefined") return {};
  return { vid: S?.vid || ls("bbvt_vid") || "", sid: S?.sid || ls("bbvt_sid") || "" };
};

export const campaignInfo = () => (S ? S.U : {});

// Public: components log their own events, e.g. bbvt("chat_open", {...})
export const bbvt = (ty, d) => {
  if (S) S.ev(ty, d);
};

function startSession() {
  const q = new URLSearchParams(window.location.search);
  let vid = ls("bbvt_vid");
  if (!vid) {
    vid = rid();
    ls("bbvt_vid", vid);
  }
  let sid = ls("bbvt_sid");
  const last = +(ls("bbvt_last") || 0);
  const tagged = q.get("utm_source") || q.get("fbclid") || q.get("gclid");
  if (!sid || now() - last > 30 * 60000 || (tagged && ls("bbvt_land") !== window.location.href)) {
    sid = rid();
    ls("bbvt_sid", sid);
    ls("bbvt_seq", "0");
    let ref = document.referrer;
    if (ref && ref.indexOf(window.location.host) > -1) ref = "";
    ls(
      "bbvt_u",
      JSON.stringify({
        s: q.get("utm_source") || "",
        m: q.get("utm_medium") || "",
        c: q.get("utm_campaign") || "",
        ct: q.get("utm_content") || "",
        tm: q.get("utm_term") || "",
        fb: q.get("fbclid") ? 1 : 0,
        g: q.get("gclid") ? 1 : 0,
        ref: ref ? ref.split("?")[0].slice(0, 200) : "",
        land: (window.location.pathname + window.location.search).slice(0, 280),
      })
    );
    ls("bbvt_land", window.location.href);
  }
  ls("bbvt_last", String(now()));
  let U = {};
  try {
    U = JSON.parse(ls("bbvt_u") || "{}");
  } catch {
    U = {};
  }
  return { vid, sid, U };
}

function selOf(el) {
  const out = [];
  let i = 0;
  while (el && el.nodeType === 1 && i < 3 && el !== document.body) {
    let s = el.tagName.toLowerCase();
    if (el.id) {
      out.unshift(s + "#" + el.id);
      break;
    }
    const c = (typeof el.className === "string" ? el.className : "").trim().split(/\s+/)[0];
    if (c) s += "." + c.replace(/[^\w-]/g, "").slice(0, 30);
    out.unshift(s);
    el = el.parentElement;
    i++;
  }
  return out.join(">").slice(0, 120);
}

// A short stable name for a form: data-bbv-form, id, or its submit button text.
export const formName = (f) => {
  if (!f) return "";
  const n =
    f.getAttribute("data-bbv-form") ||
    f.id ||
    f.getAttribute("name") ||
    (f.querySelector("button[type=submit],button:not([type])")?.textContent || "form");
  return String(n).replace(/\s+/g, " ").trim().slice(0, 40);
};

const fieldName = (el) =>
  String(el.getAttribute("name") || el.id || el.getAttribute("placeholder") || el.type || "field").slice(0, 30);

const isTrackedForm = (f) =>
  f && f.tagName === "FORM" && !f.querySelector("input[type=password]") && !f.hasAttribute("data-bbvt-ignore");

function contactOf(f) {
  const v = (sel) => (f.querySelector(sel)?.value || "").trim();
  return {
    name: v("input[name=name],input[autocomplete=name],input[name*=name i]"),
    email: v("input[type=email],input[name*=email i]"),
    phone: v("input[type=tel],input[name*=phone i]"),
    van_slug: f.getAttribute("data-van-slug") || f.querySelector("input[name=van]:checked")?.value || f.querySelector("input[name=vanSlug]")?.value || "",
    van_title: f.getAttribute("data-van-title") || f.querySelector("input[name=vanTitle]")?.value || "",
  };
}

// Contact details typed into any lead form go to the CRM right away (stage "Started form"),
// so a visitor who leaves before pressing Send can still be called back.
function sendPartial(f, how) {
  const c = contactOf(f);
  const okE = EMAIL_RE.test(c.email);
  const digits = c.phone.replace(/\D/g, "");
  const okP = digits.length >= 10 && digits.length <= 15;
  if (!okE && !okP) return;
  const key = formName(f) + "|" + (okE ? c.email.toLowerCase() : "") + "|" + (okP ? digits : "") + "|" + c.name;
  if (S.partials[key]) return;
  S.partials[key] = 1;
  const d = { f: formName(f), how, name: c.name.slice(0, 80), email: okE ? c.email : "", phone: okP ? c.phone : "", van: c.van_title || c.van_slug };
  S.ev("lead", d);
  S.flush();
  try {
    fetch(CRM_URL, {
      method: "POST",
      mode: "no-cors",
      keepalive: true,
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        type: "partial",
        ...readTracking(),
        form: d.f,
        name: d.name,
        email: d.email,
        phone: d.phone,
        van_slug: c.van_slug,
        van_title: c.van_title,
        page_url: cleanPageUrl(),
        visitor_id: S.vid,
        session_id: S.sid,
        user_agent: navigator.userAgent,
        submitted_at: new Date().toISOString(),
      }),
    }).catch(() => {});
  } catch {
    // never break the page
  }
}

export function initTracker() {
  if (typeof window === "undefined" || S || window.__bbvt) return;
  try {
    if (window.top !== window.self) return;
  } catch {
    return;
  }
  if (/bbvt_off=1/.test(window.location.search) || /bot|crawl|spider|lighthouse|headless|preview|pingdom/i.test(navigator.userAgent)) return;
  if (SKIP_PATHS.test(window.location.pathname)) return;
  window.__bbvt = 1;

  const { vid, sid, U } = startSession();
  const dev = deviceType();
  let seq = +(ls("bbvt_seq") || 0);
  let Q = [];
  let RR = [];
  let busy = false;
  const st = { vid, sid, U, partials: {}, forms: {}, maxP: 0, marks: {}, t0: now(), path: window.location.pathname };
  S = st;

  st.ev = (ty, d) => {
    Q.push({ t: now(), ty, p: window.location.pathname, d: d || {} });
    ls("bbvt_last", String(now()));
  };
  const base = () => ({ sid, vid, dev, u: U });
  const b64gz = (str) => {
    if (!window.CompressionStream) return Promise.resolve(null);
    return new Response(new Blob([str]).stream().pipeThrough(new CompressionStream("gzip")))
      .arrayBuffer()
      .then((ab) => {
        const b = new Uint8Array(ab);
        let s = "";
        for (let i = 0; i < b.length; i += 32768) s += String.fromCharCode.apply(null, b.subarray(i, i + 32768));
        return btoa(s);
      });
  };
  st.flush = () => {
    if (busy || (!Q.length && !RR.length)) return;
    busy = true;
    const p = base();
    p.ev = Q.splice(0);
    const rr = RR.splice(0);
    const rs = rr.length ? JSON.stringify(rr) : "";
    (rs ? b64gz(rs).catch(() => null) : Promise.resolve(null))
      .then((z) => {
        if (z) p.rr = z;
        else if (rs) p.rrj = rs;
        if (rs) {
          p.seq = seq++;
          ls("bbvt_seq", String(seq));
        }
        return fetch(LIVE_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain" }, body: JSON.stringify(p) });
      })
      .catch(() => {})
      .then(() => {
        busy = false;
      });
  };
  const finalFlush = () => {
    const p = base();
    p.ev = Q.splice(0);
    const rr = RR.splice(0);
    const s = JSON.stringify(rr);
    if (rr.length && s.length < 60000) {
      p.rrj = s;
      p.seq = seq++;
      ls("bbvt_seq", String(seq));
    }
    if (!p.ev.length && !p.rrj) return;
    const body = JSON.stringify(p);
    try {
      if (!(navigator.sendBeacon && navigator.sendBeacon(LIVE_URL, new Blob([body], { type: "text/plain" }))))
        fetch(LIVE_URL, { method: "POST", mode: "no-cors", keepalive: true, body });
    } catch {
      // ignore
    }
  };
  setInterval(st.flush, 5000);

  // ---- page views (first load + client-side route changes via trackPage)
  let lcp = 0;
  try {
    new PerformanceObserver((l) => {
      const e = l.getEntries();
      if (e.length) lcp = e[e.length - 1].startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });
  } catch {
    // unsupported
  }
  st.pv = () => {
    st.maxP = 0;
    st.marks = {};
    st.pageT0 = now();
    st.ev("pv", { ti: document.title.slice(0, 90), vw: window.innerWidth, vh: window.innerHeight, ua: navigator.userAgent.slice(0, 160), q: window.location.search.slice(0, 200) });
    setTimeout(watchSections, 1500);
    setTimeout(watchSections, 5000);
  };
  window.addEventListener("load", () => {
    setTimeout(() => {
      const n = (performance.getEntriesByType && performance.getEntriesByType("navigation")[0]) || {};
      st.ev("perf", { ttfb: Math.round(n.responseStart || 0), load: Math.round(n.loadEventEnd || 0), lcp: Math.round(lcp), dh: document.documentElement.scrollHeight });
    }, 3000);
  });

  // ---- scroll depth
  const onScroll = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (h <= 0) return;
    const p = Math.min(100, Math.round((window.scrollY / h) * 100));
    if (p <= st.maxP) return;
    st.maxP = p;
    [10, 25, 50, 75, 90, 100].forEach((m) => {
      if (p >= m && !st.marks[m]) {
        st.marks[m] = 1;
        st.ev("sc", { p: m, dh: document.documentElement.scrollHeight });
      }
    });
  };
  let sct;
  window.addEventListener("scroll", () => {
    clearTimeout(sct);
    sct = setTimeout(onScroll, 250);
  }, { passive: true });

  // ---- sections and forms actually seen
  let io = null;
  const seen = {};
  function watchSections() {
    if (!window.IntersectionObserver) return;
    if (!io)
      io = new IntersectionObserver(
        (es) => {
          es.forEach((e) => {
            if (!e.isIntersecting) return;
            const el = e.target;
            const isForm = el.tagName === "FORM";
            const t = isForm ? "form: " + formName(el) : (el.getAttribute("data-bbvt-sec") || el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 60);
            const k = window.location.pathname + "|" + t;
            if (!t || seen[k]) return;
            seen[k] = 1;
            st.ev(isForm ? "f_view" : "sec", { n: t, f: isForm ? formName(el) : undefined, y: Math.round(el.getBoundingClientRect().top + window.scrollY) });
            io.unobserve(el);
          });
        },
        { threshold: 0.35 }
      );
    document.querySelectorAll("main h1, main h2, main h3, [data-bbvt-sec], main form").forEach((el) => io.observe(el));
  }

  // ---- clicks, rage/dead clicks, call/text/email taps
  const CLK = "a,button,input,select,textarea,label,summary,[role=button],[onclick],video,[data-bbvt-click],details";
  let recent = [];
  document.addEventListener(
    "click",
    (e) => {
      const el = e.target;
      if (!el || !el.closest) return;
      const a = el.closest(CLK);
      const t = now();
      recent = recent.filter((c) => t - c.t < 800);
      recent.push({ t, x: e.clientX, y: e.clientY });
      const near = recent.filter((c) => Math.abs(c.x - e.clientX) < 30 && Math.abs(c.y - e.clientY) < 30).length;
      const tx = ((a || el).getAttribute("aria-label") || (a || el).innerText || (a || el).value || "").replace(/\s+/g, " ").trim().slice(0, 50);
      st.ev("cl", { x: Math.round(e.clientX), y: Math.round(e.pageY), vw: window.innerWidth, s: selOf(a || el), tx, dead: a ? 0 : 1, rage: near === 3 ? 1 : 0, cta: (a && a.getAttribute("data-bbvt-click")) || undefined });
      const href = (a && a.getAttribute("href")) || "";
      const kind = /^tel:/i.test(href) ? "call" : /^sms:/i.test(href) ? "text" : /^mailto:/i.test(href) ? "email" : "";
      if (kind) {
        st.ev(kind, { tx, where: (a && a.getAttribute("data-bbvt-click")) || selOf(a) });
        st.flush();
        try {
          window.fbq?.("track", "Contact", { method: kind });
          window.gtag?.("event", kind === "call" ? "call_click" : kind + "_click", { link_url: href.replace(/^\w+:/, "").slice(0, 20) });
        } catch {
          // ignore
        }
      }
    },
    true
  );

  // ---- forms: start, each field, errors, submit, abandon, partial contact capture
  const formState = (f) => {
    const n = formName(f);
    if (!st.forms[n]) st.forms[n] = { started: 0, submitted: 0, fields: {}, last: "", errs: 0 };
    return st.forms[n];
  };
  const focusT = new WeakMap();
  document.addEventListener(
    "focusin",
    (e) => {
      const t = e.target;
      const f = t && t.form;
      if (!isTrackedForm(f) || !/^(INPUT|SELECT|TEXTAREA)$/.test(t.tagName) || t.type === "hidden") return;
      const fs = formState(f);
      if (!fs.started) {
        fs.started = now();
        st.ev("f_start", { f: formName(f), n: fieldName(t) });
      }
      focusT.set(t, now());
    },
    true
  );
  document.addEventListener(
    "focusout",
    (e) => {
      const t = e.target;
      const f = t && t.form;
      if (!isTrackedForm(f) || !/^(INPUT|SELECT|TEXTAREA)$/.test(t.tagName) || t.type === "hidden") return;
      const fs = formState(f);
      const n = fieldName(t);
      const val = t.type === "radio" || t.type === "checkbox" ? (t.checked ? "1" : "") : String(t.value || "");
      fs.last = n;
      fs.fields[n] = val ? 1 : 0;
      st.ev("f_fld", { f: formName(f), n, filled: val ? 1 : 0, ms: now() - (focusT.get(t) || now()), len: Math.min(val.length, 99) });
      if (/email|tel|name/i.test(t.type + " " + n)) sendPartial(f, "typed");
    },
    true
  );
  document.addEventListener(
    "submit",
    (e) => {
      const f = e.target;
      if (!isTrackedForm(f)) return;
      const fs = formState(f);
      fs.submitted = now();
      st.ev("f_sub", { f: formName(f), filled: Object.keys(fs.fields).filter((k) => fs.fields[k]), ms: fs.started ? now() - fs.started : 0 });
      sendPartial(f, "submit");
      // Validation messages that appear after pressing submit
      setTimeout(() => {
        const alerts = [...f.querySelectorAll("[role=alert]")];
        const errs = (alerts.length ? alerts : [...f.querySelectorAll('[aria-invalid="true"]')])
          .map((x) => (x.getAttribute("role") === "alert" ? x.textContent : "invalid " + fieldName(x)).replace(/\s+/g, " ").trim().slice(0, 80))
          .filter(Boolean)
          .slice(0, 6);
        if (errs.length) {
          fs.errs++;
          st.ev("f_err", { f: formName(f), m: errs });
        }
      }, 400);
      st.flush();
    },
    true
  );
  // Success page
  st.checkThanks = () => {
    if (window.location.pathname === "/thank-you") {
      st.ev("f_ok", { src: new URLSearchParams(window.location.search).get("source") || "" });
      st.flush();
    }
  };

  // ---- JS errors
  let errs = 0;
  window.addEventListener("error", (e) => {
    if (!e.filename && /^Script error/.test(e.message || "")) return;
    if (errs++ < 5) st.ev("err", { m: String(e.message || "").slice(0, 160), f: String(e.filename || "").slice(-70), l: e.lineno || 0 });
  });

  // ---- leaving: abandoned forms + time on page
  const abandonCheck = () => {
    Object.keys(st.forms).forEach((n) => {
      const fs = st.forms[n];
      if (fs.started && !fs.submitted && !fs.abnSent) {
        fs.abnSent = 1;
        st.ev("f_abn", { f: n, last: fs.last, filled: Object.keys(fs.fields).filter((k) => fs.fields[k]), ms: now() - fs.started });
      }
    });
  };
  let hidSent = false;
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      hidSent = true;
      abandonCheck();
      st.ev("hide", { dur: now() - (st.pageT0 || st.t0), sc: st.maxP, lcp: Math.round(lcp) });
      finalFlush();
    } else hidSent = false;
  });
  window.addEventListener("pagehide", () => {
    if (!hidSent) {
      abandonCheck();
      st.ev("hide", { dur: now() - (st.pageT0 || st.t0), sc: st.maxP, lcp: Math.round(lcp) });
    }
    finalFlush();
  });
  st.leavePage = () => {
    abandonCheck();
    st.ev("leave", { dur: now() - (st.pageT0 || st.t0), sc: st.maxP });
    st.forms = {};
  };

  // ---- session replay (rrweb), inputs masked, stops after 20 minutes
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://cdn.jsdelivr.net/npm/rrweb@2.0.0-alpha.4/dist/record/rrweb-record.min.js";
  s.onload = () => {
    try {
      const stop = window.rrwebRecord({
        emit: (e) => {
          RR.push(e);
          if (RR.length > 3000) st.flush();
        },
        maskAllInputs: true,
        // blockSelector crashes on text nodes in rrweb 2.0.0-alpha.4, so block by class instead
        blockClass: "bbvt-block",
        recordCanvas: false,
        collectFonts: false,
        inlineImages: false,
        slimDOMOptions: "all",
        sampling: { mousemove: 120, scroll: 200, media: 800, input: "last" },
      });
      setTimeout(st.flush, 1500);
      setTimeout(st.flush, 4000);
      setTimeout(() => {
        try {
          stop && stop();
        } catch {
          // ignore
        }
      }, 20 * 60000);
    } catch {
      // ignore
    }
  };
  document.head.appendChild(s);

  st.pv();
  st.checkThanks();
}

// Called by the tracker component on every client-side route change.
export function trackPage(pathname) {
  if (!S) {
    initTracker();
    return;
  }
  if (S.path === pathname) return;
  S.leavePage();
  S.path = pathname;
  if (SKIP_PATHS.test(pathname)) return;
  S.pv();
  S.checkThanks();
}
