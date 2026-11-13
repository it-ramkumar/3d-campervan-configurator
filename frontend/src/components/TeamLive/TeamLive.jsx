"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LIVE_URL } from "@/lib/bbvt";

// BBV Live team page (/team/live#k=KEY): website chat inbox + visitor analytics.
// Data comes from the BBV Live Apps Script; the key in the link is the only "login".

const TABS = [
  ["inbox", "Chat inbox"],
  ["overview", "Overview"],
  ["forms", "Forms: where people get stuck"],
  ["leads", "Partial leads"],
  ["sources", "Sources & ads"],
  ["pages", "Pages & clicks"],
  ["sessions", "Sessions & replays"],
];
const QUICK_REPLIES = [
  (n) => `Hi ${n}! This is Anna from Big Bear Vans. Happy to help. Which van are you looking at?`,
  () => "Can I give you a quick call? What's a good time?",
  () => "I can send you a walkaround video of the van. Would that help?",
  () => "Would you like to come see it in Big Bear? I can book a time this weekend.",
  () => "Financing: RV loans up to 20 years with about 20% down are typical. Want me to connect you with our lender for a quick pre-qualification?",
];

const fmtT = (ms) => (ms ? new Date(ms).toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "");
const hm = (ms) => new Date(ms).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
const dur = (ms) => {
  const s = Math.round((ms || 0) / 1000);
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;
};
const pct = (a, b) => (b ? `${Math.round((a / b) * 1000) / 10}%` : "–");
const med = (a) => {
  const x = a.filter((v) => v != null).sort((p, q) => p - q);
  return x.length ? x[Math.floor(x.length / 2)] : 0;
};
const p75 = (a) => {
  const x = a.filter(Boolean).sort((p, q) => p - q);
  return x.length ? x[Math.floor(x.length * 0.75)] : 0;
};
const ago = (ms) => {
  const m = (Date.now() - ms) / 60000;
  if (m < 1) return "now";
  if (m < 60) return `${Math.round(m)}m`;
  if (m < 1440) return `${Math.round(m / 60)}h`;
  return `${Math.round(m / 1440)}d`;
};
const telOf = (p) => String(p || "").replace(/[^\d+]/g, "");

function useHashParams() {
  const [h, setH] = useState({});
  useEffect(() => {
    const read = () => {
      const p = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      let k = p.get("k") || "";
      try {
        if (k) window.localStorage.setItem("bbv_live_key", k);
        else k = window.localStorage.getItem("bbv_live_key") || "";
      } catch {
        // ignore
      }
      setH({ k, chat: p.get("chat") || "" });
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);
  return h;
}

const api = async (params) => {
  const res = await fetch(`${LIVE_URL}?${new URLSearchParams(params)}`);
  return res.json();
};
const apiPost = async (body) => {
  const res = await fetch(LIVE_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(body) });
  return res.json();
};

function beep() {
  try {
    const C = window.AudioContext || window.webkitAudioContext;
    const ctx = new C();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g);
    g.connect(ctx.destination);
    o.frequency.value = 880;
    g.gain.setValueAtTime(0.2, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    o.start();
    o.stop(ctx.currentTime + 0.5);
  } catch {
    // no audio
  }
}

/* ----------------------------------------------------------------- inbox */
function Inbox({ k, openId }) {
  const [data, setData] = useState({ chats: [], msgs: {} });
  const [cur, setCur] = useState(openId || "");
  const [draft, setDraft] = useState("");
  const [filter, setFilter] = useState("open");
  const [err, setErr] = useState("");
  const ver = useRef("");
  const known = useRef(null);
  const listRef = useRef(null);

  const load = useCallback(async () => {
    try {
      const r = await api({ api: "inbox", k, v: ver.current });
      if (!r.ok) {
        setErr(r.error === "key" ? "This link's key is wrong. Use the link from the chat alert email." : r.error);
        return;
      }
      setErr("");
      if (r.same) return;
      ver.current = r.v;
      // new visitor messages -> sound + notification
      const vis = {};
      Object.keys(r.msgs).forEach((cid) => (r.msgs[cid] || []).forEach((m) => m.f === "visitor" && (vis[m.id] = cid)));
      if (known.current) {
        const fresh = Object.keys(vis).filter((id) => !known.current[id]);
        if (fresh.length) {
          beep();
          const chat = r.chats.find((c) => c.cid === vis[fresh[0]]);
          try {
            if (window.Notification && Notification.permission === "granted") new Notification(`BBV chat: ${chat?.name || "visitor"}`, { body: "New message on the website chat" });
          } catch {
            // ignore
          }
          document.title = "(new) BBV Live chat";
        }
      }
      known.current = vis;
      setData({ chats: r.chats || [], msgs: r.msgs || {} });
    } catch {
      setErr("Can't reach the chat server. Retrying…");
    }
  }, [k]);

  useEffect(() => {
    load();
    const t = setInterval(() => document.visibilityState === "visible" && load(), 3000);
    const f = () => {
      document.title = "BBV Live · Team";
    };
    window.addEventListener("focus", f);
    return () => {
      clearInterval(t);
      window.removeEventListener("focus", f);
    };
  }, [load]);

  useEffect(() => {
    if (openId) setCur(openId);
  }, [openId]);

  const chats = useMemo(() => {
    const lastOf = (c) => {
      const m = data.msgs[c.cid] || [];
      return m.length ? m[m.length - 1].t : c.created;
    };
    return data.chats
      .map((c) => {
        const m = data.msgs[c.cid] || [];
        const lastAgent = Math.max(0, ...m.filter((x) => x.f === "agent").map((x) => x.t));
        const waiting = m.filter((x) => x.f === "visitor" && x.t > lastAgent).length;
        return { ...c, last: lastOf(c), waiting, preview: m.length ? m[m.length - 1].x : "" };
      })
      .filter((c) => (filter === "open" ? c.status !== "closed" : filter === "closed" ? c.status === "closed" : true))
      .sort((a, b) => (b.waiting > 0) - (a.waiting > 0) || b.last - a.last);
  }, [data, filter]);

  const chat = data.chats.find((c) => c.cid === cur);
  const msgs = (cur && data.msgs[cur]) || [];

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [msgs.length, cur]);
  useEffect(() => {
    if (cur) apiPost({ a: "seen", k, c: cur }).catch(() => {});
  }, [cur, msgs.length, k]);

  const send = async (text) => {
    const t = String(text || "").trim();
    if (!t || !cur) return;
    setDraft("");
    const tmp = { id: "tmp" + Date.now(), t: Date.now(), f: "agent", x: t, pending: true };
    setData((d) => ({ ...d, msgs: { ...d.msgs, [cur]: [...(d.msgs[cur] || []), tmp] } }));
    const r = await apiPost({ a: "agent", k, c: cur, text: t }).catch(() => null);
    if (!r || !r.ok) setErr("Message not sent. Try again.");
    ver.current = "";
    load();
  };
  const closeChat = async (reopen) => {
    await apiPost({ a: "close", k, c: cur, reopen: !!reopen }).catch(() => null);
    ver.current = "";
    load();
  };
  const first = chat ? String(chat.name).split(/\s+/)[0] : "";

  return (
    <div className="grid min-h-[70vh] grid-cols-1 overflow-hidden rounded-xl border border-slate-200 bg-white md:grid-cols-[320px_1fr]">
      <div className={`${cur ? "hidden md:block" : ""} border-r border-slate-200`}>
        <div className="flex items-center gap-2 border-b border-slate-200 p-3">
          {["open", "closed", "all"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-3 py-1 text-sm capitalize ${filter === f ? "bg-[#001F3D] text-white" : "bg-slate-100"}`}>
              {f}
            </button>
          ))}
          {typeof window !== "undefined" && window.Notification && Notification.permission !== "granted" && (
            <button onClick={() => Notification.requestPermission()} className="ml-auto text-xs font-bold text-[#c2410c] underline">
              Turn on alerts
            </button>
          )}
        </div>
        {err && <p className="bg-red-50 px-3 py-2 text-sm text-red-700">{err}</p>}
        <div className="max-h-[70vh] overflow-y-auto">
          {!chats.length && <p className="p-6 text-center text-sm text-slate-500">No chats yet. New website chats appear here within a few seconds.</p>}
          {chats.map((c) => (
            <button key={c.cid} onClick={() => setCur(c.cid)} className={`block w-full border-b border-slate-100 px-3 py-3 text-left hover:bg-slate-50 ${cur === c.cid ? "bg-orange-50" : ""}`}>
              <div className="flex items-center gap-2">
                <b className="truncate">{c.name}</b>
                {c.waiting > 0 && <span className="rounded-full bg-[#E11D48] px-2 text-xs font-bold text-white">{c.waiting} waiting</span>}
                <span className="ml-auto shrink-0 text-xs text-slate-500">{ago(c.last)}</span>
              </div>
              <p className="truncate text-xs text-slate-500">{c.van || c.page?.replace(/^https?:\/\/[^/]+/, "") || ""}</p>
              <p className="truncate text-sm text-slate-700">{c.preview}</p>
            </button>
          ))}
        </div>
      </div>
      <div className={`${cur ? "" : "hidden md:flex"} flex min-w-0 flex-col`}>
        {!chat ? (
          <p className="m-auto p-10 text-slate-500">Pick a chat on the left.</p>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 p-3">
              <button onClick={() => setCur("")} className="rounded bg-slate-100 px-2 py-1 text-sm md:hidden">←</button>
              <div className="min-w-0">
                <p className="font-bold">{chat.name}</p>
                <p className="text-xs text-slate-500">
                  {chat.phone} · {chat.email} · {chat.source} · {chat.device}
                </p>
                <p className="text-xs text-slate-500">
                  {chat.van ? `Van: ${chat.van} · ` : ""}
                  {chat.page ? <a className="underline" href={chat.page} target="_blank" rel="noreferrer">{chat.page.replace(/^https?:\/\/[^/]+/, "")}</a> : null} · started {fmtT(chat.created)}
                </p>
              </div>
              <div className="ml-auto flex flex-wrap gap-2">
                <a href={`tel:${telOf(chat.phone)}`} className="rounded-lg bg-[#001F3D] px-3 py-2 text-sm font-bold text-white">Call</a>
                <a href={`sms:${telOf(chat.phone)}`} className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-bold">Text</a>
                <a href={`mailto:${chat.email}`} className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-bold">Email</a>
                <button onClick={() => closeChat(chat.status === "closed")} className="rounded-lg bg-slate-100 px-3 py-2 text-sm">
                  {chat.status === "closed" ? "Reopen" : "Close chat"}
                </button>
              </div>
            </div>
            <div ref={listRef} className="flex-1 space-y-2 overflow-y-auto bg-slate-50 p-3" style={{ maxHeight: "58vh" }}>
              {msgs.map((m) => (
                <div key={m.id} className={`flex ${m.f === "visitor" ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-[15px] ${m.f === "visitor" ? "bg-white shadow-sm" : m.f === "agent" ? "bg-[#001F3D] text-white" : "bg-slate-200 text-slate-700"}`}>
                    <p className="text-[10px] font-bold uppercase opacity-60">{m.f === "visitor" ? chat.name : m.f === "agent" ? "You" : "Auto-reply"}</p>
                    {m.x}
                    <p className="mt-1 text-[10px] opacity-50">{m.pending ? "sending…" : hm(m.t)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5 border-t border-slate-200 px-3 pt-2">
              {QUICK_REPLIES.map((q, i) => (
                <button key={i} onClick={() => setDraft(q(first))} className="rounded-full border border-slate-200 px-2.5 py-1 text-xs hover:border-[#ED985F]">
                  {q(first).slice(0, 34)}…
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(draft);
              }}
              className="flex gap-2 p-3"
            >
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(draft);
                  }
                }}
                rows={2}
                placeholder={`Reply to ${first}… (Enter to send)`}
                className="flex-1 resize-none rounded-xl border border-slate-300 px-3 py-2 text-base outline-none focus:border-[#ED985F]"
              />
              <button type="submit" className="rounded-xl bg-[#ED985F] px-5 font-bold text-[#001F3D]">Send</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- analytics model */
function buildModel(raw) {
  const S = {};
  const evs = [];
  (raw.ev || []).forEach((r) => {
    const [ts, sid, vid, device, , , campaign, content, term, ref, landing, , , source] = r;
    let list = [];
    try {
      list = JSON.parse(r[15] || "[]");
    } catch {
      list = [];
    }
    let s = S[sid];
    if (!s)
      s = S[sid] = {
        sid, vid, dev: device, src: source || "Direct", camp: campaign, content, term, ref, land: landing,
        t0: ts, t1: ts, pages: [], sc: {}, dur: {}, clicks: 0, rage: 0, dead: 0, calls: 0, texts: 0,
        chatOpen: 0, chatStart: 0, fView: {}, fStart: {}, fSub: {}, fErr: 0, fOk: 0, fAbn: {}, contact: null, lcp: 0,
      };
    list.forEach(([t, ty, p, d = {}]) => {
      s.t0 = Math.min(s.t0, t);
      s.t1 = Math.max(s.t1, t);
      evs.push({ sid, t, ty, p, d, dev: device });
      switch (ty) {
        case "pv": s.pages.push(p); break;
        case "sc": s.sc[p] = Math.max(s.sc[p] || 0, d.p || 0); break;
        case "hide": case "leave": s.dur[p] = (s.dur[p] || 0) + (d.dur || 0); break;
        case "cl": s.clicks++; if (d.rage) s.rage++; if (d.dead) s.dead++; break;
        case "call": s.calls++; break;
        case "text": s.texts++; break;
        case "chat_open": s.chatOpen++; break;
        case "chat_start": s.chatStart++; break;
        case "f_view": s.fView[d.f] = 1; break;
        case "f_start": s.fStart[d.f] = 1; break;
        case "f_sub": s.fSub[d.f] = 1; break;
        case "f_err": s.fErr++; break;
        case "f_ok": s.fOk++; break;
        case "f_abn": s.fAbn[d.f] = d.last || ""; break;
        case "lead": s.contact = { ...(s.contact || {}), ...Object.fromEntries(Object.entries(d).filter(([, v]) => v)) }; break;
        case "perf": if (d.lcp) s.lcp = d.lcp; break;
        default:
      }
    });
  });
  const sessions = Object.values(S)
    .map((s) => ({ ...s, ms: s.t1 - s.t0, pv: s.pages.length, maxSc: Math.max(0, ...Object.values(s.sc)), converted: s.fOk > 0 || s.chatStart > 0 }))
    .filter((s) => s.pv > 0)
    .sort((a, b) => b.t1 - a.t1);
  return { sessions, evs };
}

function Tiles({ items }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {items.map(([k, v, s]) => (
        <div key={k} className="rounded-xl border border-slate-200 bg-white p-3">
          <p className="text-xs text-slate-500">{k}</p>
          <p className="text-2xl font-bold tabular-nums">{v}</p>
          {s ? <p className="text-xs text-slate-500">{s}</p> : null}
        </div>
      ))}
    </div>
  );
}
function Card({ title, note, children }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      <h2 className="mb-1 text-base font-bold">{title}</h2>
      {note && <p className="mb-3 text-sm text-slate-500">{note}</p>}
      {children}
    </section>
  );
}
function Table({ head, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>{head.map((h, i) => <th key={i} className={`whitespace-nowrap border-b border-slate-200 px-2 py-1.5 text-left font-medium text-slate-500 ${i ? "text-right" : ""}`}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-slate-100">
              {r.map((c, j) => <td key={j} className={`px-2 py-1.5 align-top ${j ? "text-right tabular-nums" : ""}`}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
      {!rows.length && <p className="p-4 text-center text-sm text-slate-500">No data yet for this period.</p>}
    </div>
  );
}
function Bars({ steps }) {
  const max = steps[0]?.[1] || 1;
  return (
    <div className="grid grid-cols-[minmax(120px,220px)_1fr_90px] items-center gap-x-3 gap-y-2 text-sm">
      {steps.map(([label, n], i) => (
        <div key={label} className="contents">
          <span>{label}</span>
          <div className="h-5 rounded bg-slate-100"><div className="h-5 rounded bg-[#001F3D]" style={{ width: `${Math.max(0.5, (n / max) * 100)}%` }} /></div>
          <span className="text-right tabular-nums">
            {n}
            {i > 0 && steps[i - 1][1] ? <span className="ml-1 text-xs text-red-600">−{Math.round((1 - n / steps[i - 1][1]) * 100)}%</span> : null}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ----------------------------------------------------------------- views */
function Overview({ M, raw }) {
  const L = M.sessions;
  const by = (f) => L.filter(f).length;
  const lcpBy = {};
  L.forEach((s) => s.lcp && (lcpBy[s.dev] = [...(lcpBy[s.dev] || []), s.lcp]));
  const formViews = by((s) => Object.keys(s.fView).length);
  const formStarts = by((s) => Object.keys(s.fStart).length);
  const formSubs = by((s) => Object.keys(s.fSub).length);
  const ok = by((s) => s.fOk);
  const chats = by((s) => s.chatStart);
  const partial = L.filter((s) => s.contact && !s.converted).length;
  return (
    <div className="space-y-4">
      <Tiles
        items={[
          ["Sessions", L.length, `${new Set(L.map((s) => s.vid)).size} visitors`],
          ["On phones", pct(by((s) => s.dev === "mobile"), L.length), `${by((s) => s.dev === "tablet")} tablet · ${by((s) => s.dev === "desktop")} desktop`],
          ["Median time on site", dur(med(L.map((s) => s.ms))), `median scroll ${med(L.map((s) => s.maxSc))}%`],
          ["Call / text taps", L.reduce((a, s) => a + s.calls + s.texts, 0), `${by((s) => s.calls)} sessions tapped Call`],
          ["Chats started", chats, `${by((s) => s.chatOpen)} opened the chat`],
          ["Forms sent", ok, `${formStarts} started a form`],
          ["Partial leads", partial, "typed phone/email, didn't send"],
          ["Rage clicks", L.reduce((a, s) => a + s.rage, 0), `${by((s) => s.rage)} frustrated sessions`],
          ["Dead clicks", L.reduce((a, s) => a + s.dead, 0), "taps on things that do nothing"],
          ["Form errors", L.reduce((a, s) => a + s.fErr, 0), "submits blocked by validation"],
          ["Speed (LCP p75)", Object.keys(lcpBy).map((d) => `${d[0].toUpperCase()} ${(p75(lcpBy[d]) / 1000).toFixed(1)}s`).join(" · ") || "–", "under 2.5s is good"],
          ["Replays recorded", Object.keys(raw.replays || {}).length, "see Sessions tab"],
        ]}
      />
      <Card title="Lead funnel" note="Sessions in this period. Each bar shows how many got that far; red shows how many dropped from the step above.">
        <Bars
          steps={[
            ["Sessions", L.length],
            ["Scrolled 50%+", by((s) => s.maxSc >= 50)],
            ["Saw a form", formViews],
            ["Started a form", formStarts],
            ["Pressed send", formSubs],
            ["Form sent OK", ok],
          ]}
        />
        <p className="mt-3 text-sm text-slate-600">
          Other ways people reached out: <b>{by((s) => s.calls)}</b> sessions tapped Call, <b>{by((s) => s.texts)}</b> tapped Text, <b>{chats}</b> started a chat.
        </p>
      </Card>
    </div>
  );
}

function Forms({ M }) {
  const forms = {};
  const F = (n) => (forms[n] = forms[n] || { views: 0, starts: 0, subs: 0, errs: 0, abn: 0, fields: {}, lastAbn: {}, errMsgs: {}, ms: [] });
  M.evs.forEach((e) => {
    const d = e.d;
    if (!d.f) return;
    const f = F(d.f);
    if (e.ty === "f_view") f.views++;
    if (e.ty === "f_start") f.starts++;
    if (e.ty === "f_sub") {
      f.subs++;
      if (d.ms) f.ms.push(d.ms);
    }
    if (e.ty === "f_err") {
      f.errs++;
      (d.m || []).forEach((m) => (f.errMsgs[m] = (f.errMsgs[m] || 0) + 1));
    }
    if (e.ty === "f_abn") {
      f.abn++;
      f.lastAbn[d.last || "(none)"] = (f.lastAbn[d.last || "(none)"] || 0) + 1;
    }
    if (e.ty === "f_fld") {
      const x = (f.fields[d.n] = f.fields[d.n] || { focus: 0, filled: 0, ms: [] });
      x.focus++;
      if (d.filled) x.filled++;
      x.ms.push(d.ms);
    }
  });
  const names = Object.keys(forms).sort((a, b) => forms[b].views + forms[b].starts - (forms[a].views + forms[a].starts));
  return (
    <div className="space-y-4">
      <Card title="Every form on the site" note="Seen = scrolled into view. Started = tapped a field. Abandoned = started but left without pressing send. Errors = send blocked by a validation message.">
        <Table
          head={["Form", "Seen", "Started", "Start rate", "Pressed send", "Errors", "Abandoned", "Median time to send"]}
          rows={names.map((n) => {
            const f = forms[n];
            return [n, f.views, f.starts, pct(f.starts, f.views), f.subs, f.errs, f.abn, f.ms.length ? dur(med(f.ms)) : "–"];
          })}
        />
      </Card>
      {names.filter((n) => forms[n].starts).map((n) => {
        const f = forms[n];
        const errs = Object.entries(f.errMsgs).sort((a, b) => b[1] - a[1]);
        const last = Object.entries(f.lastAbn).sort((a, b) => b[1] - a[1]);
        return (
          <Card key={n} title={`Form: ${n}`} note="Field by field. Low 'filled' or long time means people hesitate on that field. 'Last field before leaving' shows where they gave up.">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Table
                  head={["Field", "Tapped", "Filled", "Median time"]}
                  rows={Object.entries(f.fields).map(([k, x]) => [k, x.focus, pct(x.filled, x.focus), dur(med(x.ms))])}
                />
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-bold">Last field before leaving</p>
                  {last.length ? last.map(([k, c]) => <p key={k}>{k}: {c}</p>) : <p className="text-slate-500">No abandons</p>}
                </div>
                <div>
                  <p className="font-bold">Error messages shown</p>
                  {errs.length ? errs.map(([k, c]) => <p key={k}>{k}: {c}</p>) : <p className="text-slate-500">None</p>}
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

function Leads({ M, raw }) {
  const sent = new Set(M.sessions.filter((s) => s.converted).map((s) => s.sid));
  const chats = raw.chats || [];
  const rows = (raw.leads || []).slice().reverse();
  const seen = {};
  const list = rows.filter((r) => {
    const k = (r[3] || "") + "|" + (r[4] || "");
    if (seen[k]) return false;
    seen[k] = 1;
    return true;
  });
  return (
    <div className="space-y-4">
      <Card title="People who typed their contact details" note="Captured the moment they typed a phone or email, before pressing send. 'Did not send' rows are the ones to call: they showed interest and left. They are also in the CRM under 'Started form'.">
        <Table
          head={["When", "Name", "Phone", "Email", "Form", "Van", "Source", "Status"]}
          rows={list.map((r) => {
            const done = sent.has(r[2]) || chats.some((c) => c.email && r[3] && c.email === r[3]);
            return [fmtT(r[0]), r[5] || "–", r[4] ? <a className="underline" href={`tel:${telOf(r[4])}`}>{r[4]}</a> : "–", r[3] || "–", r[7], r[11] || "–", r[9],
              done ? <span className="rounded-full bg-emerald-100 px-2 text-emerald-800">sent</span> : <span className="rounded-full bg-red-100 px-2 text-red-700">did not send</span>];
          })}
        />
      </Card>
      <Card title={`Website chats (${chats.length})`}>
        <Table head={["When", "Name", "Phone", "Email", "Van", "Source", "Device", "Answered"]} rows={chats.slice().reverse().map((c) => [fmtT(c.t), c.name, c.phone, c.email, c.van || "–", c.src, c.dev, c.replied ? "yes" : "no"])} />
      </Card>
    </div>
  );
}

function Sources({ M }) {
  const g = {};
  M.sessions.forEach((s) => {
    const k = `${s.src}||${s.camp || "(no campaign)"}||${s.content || ""}`;
    const r = (g[k] = g[k] || { src: s.src, camp: s.camp || "(no campaign)", ad: s.content || "", n: 0, ms: [], sc: [], fs: 0, ok: 0, chat: 0, call: 0, partial: 0, rage: 0 });
    r.n++;
    r.ms.push(s.ms);
    r.sc.push(s.maxSc);
    if (Object.keys(s.fStart).length) r.fs++;
    if (s.fOk) r.ok++;
    if (s.chatStart) r.chat++;
    if (s.calls) r.call++;
    if (s.contact && !s.converted) r.partial++;
    r.rage += s.rage;
  });
  const rows = Object.values(g).sort((a, b) => b.n - a.n);
  return (
    <Card title="Traffic by source, campaign and ad" note="Ads are tagged with utm_campaign / utm_content. An ad with lots of sessions but low time and scroll is sending curiosity clicks.">
      <Table
        head={["Source", "Campaign", "Ad", "Sessions", "Median time", "Median scroll", "Started form", "Sent form", "Chats", "Tapped call", "Partial", "Rage"]}
        rows={rows.map((r) => [r.src, r.camp, r.ad || "–", r.n, dur(med(r.ms)), `${med(r.sc)}%`, r.fs, r.ok, r.chat, r.call, r.partial, r.rage])}
      />
    </Card>
  );
}

function Pages({ M }) {
  const P = {};
  M.sessions.forEach((s) => {
    new Set(s.pages).forEach((p) => {
      const r = (P[p] = P[p] || { n: 0, sc: [], ms: [] });
      r.n++;
      r.sc.push(s.sc[p] || 0);
      if (s.dur[p]) r.ms.push(s.dur[p]);
    });
  });
  const cl = {};
  M.evs.forEach((e) => {
    if (e.ty !== "cl") return;
    const k = `${e.p} · ${e.d.tx || ""} ‹${e.d.s || ""}›`;
    const r = (cl[k] = cl[k] || { c: 0, rage: 0, dead: 0, mob: 0 });
    r.c++;
    r.rage += e.d.rage || 0;
    r.dead += e.d.dead || 0;
    if (e.dev === "mobile") r.mob++;
  });
  const pages = Object.entries(P).sort((a, b) => b[1].n - a[1].n);
  const clicks = Object.entries(cl).sort((a, b) => b[1].c - a[1].c).slice(0, 60);
  const scrollRows = pages.slice(0, 25).map(([p, r]) => {
    const reach = (m) => pct(r.sc.filter((x) => x >= m).length, r.n);
    return [p, r.n, dur(med(r.ms)), reach(25), reach(50), reach(75), reach(90)];
  });
  return (
    <div className="space-y-4">
      <Card title="Pages" note="How far down people get. If the form or price sits below where most people stop, move it up.">
        <Table head={["Page", "Views", "Median time", "Reached 25%", "50%", "75%", "90%"]} rows={scrollRows} />
      </Card>
      <Card title="Most-tapped things" note="Rage = 3 fast taps in the same spot (frustration). Dead = taps on something that isn't a button or link.">
        <Table head={["Page · element", "Taps", "On phones", "Rage", "Dead"]} rows={clicks.map(([k, r]) => [k, r.c, r.mob, r.rage, r.dead])} />
      </Card>
    </div>
  );
}

function Sessions({ M, raw, k }) {
  const [play, setPlay] = useState(null);
  const L = M.sessions.slice(0, 300);
  return (
    <>
      <Card title="Recent sessions" note="Press ▶ to watch a visit like a video: taps, scrolling and what they saw. Everything typed is masked.">
        <Table
          head={["Last seen", "Source", "Ad / campaign", "Device", "Pages", "Time", "Scroll", "Did", "Contact", ""]}
          rows={L.map((s) => [
            fmtT(s.t1), s.src, s.content || s.camp || "–", s.dev, s.pv, dur(s.ms), `${s.maxSc}%`,
            [s.fOk ? "sent form" : "", s.chatStart ? "chat" : "", s.calls ? "tapped call" : "", Object.keys(s.fAbn).length ? "abandoned form" : "", s.rage ? `${s.rage} rage` : ""].filter(Boolean).join(", ") || "browsed",
            s.contact ? `${s.contact.name || ""} ${s.contact.phone || ""} ${s.contact.email || ""}` : "",
            raw.replays?.[s.sid] ? <button className="rounded bg-[#001F3D] px-2 text-white" onClick={() => setPlay(s.sid)}>▶</button> : "",
          ])}
        />
      </Card>
      {play && <Replay k={k} sid={play} onClose={() => setPlay(null)} />}
    </>
  );
}

function Replay({ k, sid, onClose }) {
  const box = useRef(null);
  const [msg, setMsg] = useState("Loading replay…");
  useEffect(() => {
    let dead = false;
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://cdn.jsdelivr.net/npm/rrweb-player@1.0.0-alpha.4/dist/style.css";
    document.head.appendChild(css);
    const load = () =>
      new Promise((res) => {
        if (window.rrwebPlayer) return res();
        const s = document.createElement("script");
        s.src = "https://cdn.jsdelivr.net/npm/rrweb-player@1.0.0-alpha.4/dist/index.js";
        s.onload = res;
        document.head.appendChild(s);
      });
    const unz = async (b64) => {
      const bin = atob(b64);
      const u = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
      const st = new Blob([u]).stream().pipeThrough(new DecompressionStream("gzip"));
      return JSON.parse(await new Response(st).text());
    };
    (async () => {
      await load();
      const r = await api({ api: "replay", k, s: sid });
      let evs = [];
      for (const c of r.chunks || []) {
        if (!c) continue;
        try {
          evs = evs.concat(await unz(c));
        } catch {
          // skip bad chunk
        }
      }
      if (dead) return;
      evs.sort((a, b) => a.timestamp - b.timestamp);
      if (evs.length < 2) {
        setMsg("Not enough recorded data for this visit.");
        return;
      }
      setMsg("");
      const meta = evs.find((e) => e.type === 4) || { data: { width: 390 } };
      const wide = meta.data.width > 900;
      // eslint-disable-next-line no-new
      new window.rrwebPlayer({
        target: box.current,
        props: { events: evs, width: Math.min(window.innerWidth - 60, wide ? 1000 : 400), height: Math.min(window.innerHeight - 220, wide ? 600 : 720), autoPlay: true, skipInactive: true },
      });
    })();
    return () => {
      dead = true;
    };
  }, [k, sid]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="max-h-[95vh] overflow-auto rounded-xl bg-white p-3">
        <div className="mb-2 flex items-center justify-between gap-4">
          <b>Replay {sid}</b>
          <button onClick={onClose} className="rounded bg-slate-100 px-3 py-1">Close</button>
        </div>
        {msg && <p className="p-6 text-slate-500">{msg}</p>}
        <div ref={box} />
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- page */
export default function TeamLive() {
  const { k, chat } = useHashParams();
  const [tab, setTab] = useState("inbox");
  const [days, setDays] = useState(7);
  const [dev, setDev] = useState("");
  const [src, setSrc] = useState("");
  const [raw, setRaw] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (chat) setTab("inbox");
  }, [chat]);

  const loadData = useCallback(async () => {
    if (!k) return;
    setStatus("Loading…");
    try {
      const r = await api({ api: "data", k, days });
      if (!r.ok) {
        setStatus(r.error === "key" ? "Wrong key in the link." : r.error);
        return;
      }
      setRaw(r);
      setStatus(`Updated ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`);
    } catch {
      setStatus("Could not load data. Retrying in 2 minutes.");
    }
  }, [k, days]);

  useEffect(() => {
    if (tab !== "inbox") loadData();
  }, [tab, loadData]);
  useEffect(() => {
    if (tab === "inbox") return undefined;
    const t = setInterval(() => document.visibilityState === "visible" && loadData(), 120000);
    return () => clearInterval(t);
  }, [tab, loadData]);

  const M = useMemo(() => {
    if (!raw) return null;
    const m = buildModel(raw);
    const keep = (s) => (!dev || s.dev === dev) && (!src || s.src === src);
    const ids = new Set(m.sessions.filter(keep).map((s) => s.sid));
    return { sessions: m.sessions.filter(keep), evs: m.evs.filter((e) => ids.has(e.sid)), allSources: [...new Set(m.sessions.map((s) => s.src))] };
  }, [raw, dev, src]);

  if (!k)
    return (
      <div className="mx-auto max-w-lg p-10 text-center">
        <h1 className="text-2xl font-bold">BBV Live</h1>
        <p className="mt-2 text-slate-600">Open this page with the team link (it ends in #k=…). You can find it in any chat alert email.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 text-[#0f172a]">
      <header className="sticky top-0 z-20 flex flex-wrap items-center gap-2 border-b border-slate-200 bg-white px-4 py-3">
        <h1 className="mr-2 text-lg font-bold">BBV Live</h1>
        <nav className="flex flex-wrap gap-1">
          {TABS.map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} className={`rounded-lg px-3 py-1.5 text-sm ${tab === id ? "bg-[#001F3D] text-white" : "bg-slate-100 hover:bg-slate-200"}`}>
              {label}
            </button>
          ))}
        </nav>
        {tab !== "inbox" && (
          <div className="ml-auto flex flex-wrap items-center gap-2 text-sm">
            <select value={days} onChange={(e) => setDays(+e.target.value)} className="rounded-lg border border-slate-200 px-2 py-1.5">
              <option value={1}>Today + yesterday</option>
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
            </select>
            <select value={dev} onChange={(e) => setDev(e.target.value)} className="rounded-lg border border-slate-200 px-2 py-1.5">
              <option value="">All devices</option>
              <option value="mobile">Phones</option>
              <option value="tablet">Tablets</option>
              <option value="desktop">Desktop</option>
            </select>
            <select value={src} onChange={(e) => setSrc(e.target.value)} className="rounded-lg border border-slate-200 px-2 py-1.5">
              <option value="">All sources</option>
              {(M?.allSources || []).map((s) => <option key={s}>{s}</option>)}
            </select>
            <button onClick={loadData} className="rounded-lg bg-slate-100 px-2 py-1.5">↻</button>
            <span className="text-xs text-slate-500">{status}</span>
          </div>
        )}
      </header>
      <main className="mx-auto max-w-7xl space-y-4 p-4">
        {tab === "inbox" ? (
          <Inbox k={k} openId={chat} />
        ) : !M ? (
          <p className="p-10 text-center text-slate-500">{status || "Loading…"}</p>
        ) : tab === "overview" ? (
          <Overview M={M} raw={raw} />
        ) : tab === "forms" ? (
          <Forms M={M} />
        ) : tab === "leads" ? (
          <Leads M={M} raw={raw} />
        ) : tab === "sources" ? (
          <Sources M={M} />
        ) : tab === "pages" ? (
          <Pages M={M} />
        ) : (
          <Sessions M={M} raw={raw} k={k} />
        )}
      </main>
    </div>
  );
}
