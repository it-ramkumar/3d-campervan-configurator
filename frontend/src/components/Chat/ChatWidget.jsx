"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { validateLead } from "@/lib/validateLead";
import { createEventId, trackLead, saveLeadEmail } from "@/lib/track";
import { sendToCrm } from "@/lib/crm";
import { bbvt } from "@/lib/bbvt";
import { loadChat, saveChat, startChat, sendChat, pollChat } from "@/lib/chat";

// Website chat. Visitors must give name, mobile and email before chatting, so every chat
// is a lead in the CRM from the first message. Anna replies from /team/live.

const PHONE = "(951) 441-9719";
const TEL = "tel:+19514419719";
const QUICK = ["Is it still available?", "Price & financing", "Book a visit or video tour", "Delivery to my state"];

const timeOf = (t) => new Date(t).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

export default function ChatWidget({ open, onClose, onUnread, van }) {
  const [chat, setChat] = useState(null); // {cid, tok, name}
  const [msgs, setMsgs] = useState([]);
  const [online, setOnline] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", text: "" });
  const [errors, setErrors] = useState({});
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState("");
  const listRef = useRef(null);
  const lastT = useRef(0);
  const lastSeen = useRef(0);
  const idleSince = useRef(Date.now());

  useEffect(() => {
    const c = loadChat();
    if (c) setChat(c);
  }, []);

  const merge = useCallback((list) => {
    if (!list || !list.length) return;
    setMsgs((cur) => {
      const ids = new Set(cur.map((m) => m.id));
      const add = list.filter((m) => !ids.has(m.id));
      if (!add.length) return cur;
      // drop optimistic copies of the visitor's own messages
      const rest = cur.filter((m) => !(m.pending && add.some((a) => a.f === "visitor" && a.x === m.x)));
      const next = [...rest, ...add].sort((a, b) => a.t - b.t);
      lastT.current = Math.max(lastT.current, ...add.map((m) => m.t));
      idleSince.current = Date.now();
      return next;
    });
  }, []);

  // Poll for replies: fast while open, slow while closed (unread badge), stop after 30 idle minutes.
  useEffect(() => {
    if (!chat) return undefined;
    let stop = false;
    let timer;
    const tick = async () => {
      if (stop) return;
      if (Date.now() - idleSince.current < 30 * 60000 && document.visibilityState === "visible") {
        try {
          const r = await pollChat(chat.cid, chat.tok, lastT.current);
          if (r && r.ok) {
            merge(r.msgs);
            setOnline(!!r.online);
          } else if (r && r.error === "chat not found") {
            saveChat(null);
            setChat(null);
            setMsgs([]);
            return;
          }
        } catch {
          // network hiccup; try again next tick
        }
      }
      timer = setTimeout(tick, open ? 3500 : 20000);
    };
    tick();
    return () => {
      stop = true;
      clearTimeout(timer);
    };
  }, [chat, open, merge]);

  // Unread count for the dock badge
  useEffect(() => {
    if (open) {
      lastSeen.current = lastT.current;
      onUnread?.(0);
      return;
    }
    const n = msgs.filter((m) => m.f !== "visitor" && m.t > lastSeen.current).length;
    onUnread?.(n);
  }, [msgs, open, onUnread]);

  useEffect(() => {
    if (open && listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [msgs, open]);

  useEffect(() => {
    if (open) bbvt("chat_open", { started: !!chat });
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const change = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((x) => ({ ...x, [name]: undefined }));
  };

  const start = async (e) => {
    e.preventDefault();
    if (busy) return;
    const fe = validateLead(form, { requirePhone: true });
    if (form.phone.replace(/\D/g, "").length < 10 && !fe.phone) fe.phone = "Please enter your full mobile number.";
    setErrors(fe);
    setErr("");
    if (Object.keys(fe).length) {
      bbvt("chat_err", { m: Object.values(fe) });
      return;
    }
    setBusy(true);
    try {
      const r = await startChat({ name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim(), text: form.text.trim(), van: van?.title || "" });
      const c = { cid: r.cid, tok: r.tok, name: form.name.trim() };
      saveChat(c);
      setChat(c);
      merge(r.msgs);
      setOnline(!!r.online);
      const eventId = createEventId();
      sendToCrm({
        event_id: eventId,
        lead_source: "chat",
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        van_slug: van?.slug || "",
        van_title: van?.title || "",
        van_price: van?.price || "",
        sale_price: van?.sale_price || "",
        message: "Website chat" + (form.text.trim() ? ": " + form.text.trim() : "") + " (chat id " + r.cid + ")",
      });
      trackLead({ source: "chat", email: form.email, phone: form.phone, name: form.name, eventId });
      saveLeadEmail(form.email);
      bbvt("chat_start", { cid: r.cid, van: van?.title || "" });
    } catch (ex) {
      setErr((ex && ex.message) || "Chat is unavailable right now.");
      bbvt("chat_fail", { m: String(ex && ex.message).slice(0, 80) });
    } finally {
      setBusy(false);
    }
  };

  const send = async (text) => {
    const t = String(text || "").trim();
    if (!t || !chat) return;
    setDraft("");
    const tmp = { id: "tmp" + Date.now(), t: Date.now(), f: "visitor", x: t, pending: true };
    setMsgs((cur) => [...cur, tmp]);
    idleSince.current = Date.now();
    try {
      const r = await sendChat(chat.cid, chat.tok, t);
      merge(r.msgs);
      setOnline(!!r.online);
      bbvt("chat_msg", { n: t.length });
    } catch {
      setMsgs((cur) => cur.map((m) => (m.id === tmp.id ? { ...m, failed: true } : m)));
    }
  };

  if (!open) return null;

  const input =
    "w-full rounded-lg border-2 border-transparent bg-primary/10 px-3.5 py-3 text-base text-primary outline-none transition focus:border-hover focus:bg-white placeholder:text-primary/35";

  return (
    <div
      role="dialog"
      aria-label="Chat with Big Bear Vans"
      className="fixed z-[10001] flex flex-col overflow-hidden bg-white shadow-[0_20px_60px_rgba(0,0,0,0.35)] inset-0 lg:inset-auto lg:bottom-24 lg:right-6 lg:h-[min(640px,calc(100vh-130px))] lg:w-[400px] lg:rounded-2xl"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      {/* HEADER */}
      <div className="flex items-center gap-3 bg-primary px-4 py-3 text-white">
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-hover text-lg font-black text-primary">
          A
          <span className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-primary ${online ? "bg-emerald-400" : "bg-amber-300"}`} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-base font-bold leading-tight">Anna · Big Bear Vans</p>
          <p className="text-xs text-white/70">{online ? "Online now" : "Usually replies in a few minutes"}</p>
        </div>
        <a href={TEL} data-bbvt-click="chat_header_call" className="rounded-full bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-wider hover:bg-white/20">
          Call
        </a>
        <button type="button" onClick={onClose} aria-label="Close chat" className="rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white cursor-pointer">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {!chat ? (
        /* GATE: name, mobile, email are required to start */
        <form onSubmit={start} noValidate data-bbv-form="chat_start" className="flex-1 overflow-y-auto px-4 py-5">
          <p className="text-lg font-bold text-primary">Chat with Anna</p>
          <p className="mt-1 text-sm text-primary/65">
            Ask about any van, price, financing or a visit. Leave your details so Anna can text you back if you step away.
          </p>
          {van?.title && (
            <p className="mt-3 rounded-lg bg-secondary/60 px-3 py-2 text-sm text-primary">
              About: <b>{van.title}</b>
            </p>
          )}
          <div className="mt-4 grid gap-3">
            <div>
              <label htmlFor="chat-name" className="mb-1 block text-xs font-bold uppercase tracking-wider text-primary/60">Your name *</label>
              <input id="chat-name" name="name" autoComplete="name" enterKeyHint="next" value={form.name} onChange={change} className={input} placeholder="First and last name" aria-invalid={!!errors.name} />
              {errors.name && <p role="alert" className="mt-1 text-xs font-semibold text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="chat-phone" className="mb-1 block text-xs font-bold uppercase tracking-wider text-primary/60">Mobile phone *</label>
              <input id="chat-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" enterKeyHint="next" value={form.phone} onChange={change} className={input} placeholder="(555) 555-5555" aria-invalid={!!errors.phone} />
              {errors.phone && <p role="alert" className="mt-1 text-xs font-semibold text-red-600">{errors.phone}</p>}
            </div>
            <div>
              <label htmlFor="chat-email" className="mb-1 block text-xs font-bold uppercase tracking-wider text-primary/60">Email *</label>
              <input id="chat-email" name="email" type="email" inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck={false} enterKeyHint="next" value={form.email} onChange={change} className={input} placeholder="you@email.com" aria-invalid={!!errors.email} />
              {errors.email && <p role="alert" className="mt-1 text-xs font-semibold text-red-600">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="chat-text" className="mb-1 block text-xs font-bold uppercase tracking-wider text-primary/60">Your question</label>
              <div className="mb-2 flex flex-wrap gap-1.5">
                {QUICK.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, text: q }))}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${form.text === q ? "border-hover bg-hover/15 text-primary" : "border-primary/15 text-primary/80 hover:border-hover"}`}
                  >
                    {q}
                  </button>
                ))}
              </div>
              <textarea id="chat-text" name="text" rows={2} value={form.text} onChange={change} className={`${input} resize-none`} placeholder="Type your question (optional)" />
            </div>
          </div>
          {err && <p role="alert" className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{err} Please call or text {PHONE}.</p>}
          <button
            type="submit"
            disabled={busy}
            className="mt-4 w-full rounded-full bg-primary py-3.5 text-sm font-black uppercase tracking-[0.12em] text-white shadow-md transition hover:bg-hover hover:text-primary disabled:opacity-60 cursor-pointer"
          >
            {busy ? "Starting…" : "Start chat"}
          </button>
          <p className="mt-3 text-center text-xs text-primary/50">
            Prefer to talk? <a href={TEL} data-bbvt-click="chat_gate_call" className="font-bold text-primary underline">Call {PHONE}</a>
          </p>
        </form>
      ) : (
        /* THREAD */
        <>
          <div ref={listRef} className="flex-1 space-y-2 overflow-y-auto bg-secondary/40 px-3 py-4" aria-live="polite">
            {msgs.map((m) => (
              <div key={m.id} className={`flex ${m.f === "visitor" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[82%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2 text-[15px] leading-snug ${
                    m.f === "visitor" ? "rounded-br-md bg-primary text-white" : m.f === "agent" ? "rounded-bl-md bg-white text-primary shadow-sm" : "rounded-bl-md bg-white/80 text-primary/85 shadow-sm"
                  } ${m.pending ? "opacity-70" : ""}`}
                >
                  {m.f !== "visitor" && <p className="mb-0.5 text-[11px] font-bold uppercase tracking-wider text-hover">{m.f === "agent" ? "Anna" : "Big Bear Vans"}</p>}
                  {m.x}
                  <p className={`mt-1 text-[10px] ${m.f === "visitor" ? "text-white/60" : "text-primary/40"}`}>
                    {m.failed ? "Not sent. Tap send again." : m.pending ? "Sending…" : timeOf(m.t)}
                  </p>
                </div>
              </div>
            ))}
            {!msgs.some((m) => m.f === "visitor") && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {QUICK.map((q) => (
                  <button key={q} type="button" onClick={() => send(q)} className="rounded-full border border-primary/15 bg-white px-3 py-1.5 text-xs font-semibold text-primary/80 hover:border-hover cursor-pointer">
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
            data-bbvt-ignore
            className="flex items-end gap-2 border-t border-primary/10 bg-white p-3"
            style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom, 0px))" }}
          >
            <label htmlFor="chat-draft" className="sr-only">Message</label>
            <textarea
              id="chat-draft"
              rows={1}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && window.innerWidth >= 1024) {
                  e.preventDefault();
                  send(draft);
                }
              }}
              placeholder="Type a message…"
              className="max-h-28 min-h-[46px] flex-1 resize-none rounded-2xl border-2 border-transparent bg-primary/10 px-3.5 py-2.5 text-base text-primary outline-none focus:border-hover focus:bg-white"
            />
            <button type="submit" disabled={!draft.trim()} aria-label="Send" className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-primary text-white disabled:opacity-40 cursor-pointer">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
            </button>
          </form>
        </>
      )}
    </div>
  );
}
