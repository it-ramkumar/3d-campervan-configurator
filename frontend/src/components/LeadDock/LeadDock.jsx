"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { getLeadContext, subscribeLeadContext } from "@/lib/leadContext";
import { bbvt } from "@/lib/bbvt";

const ChatWidget = dynamic(() => import("@/components/Chat/ChatWidget"), { ssr: false });
const ContactForm = dynamic(() => import("@/components/Consultation/ContactForm"), { ssr: false });

// Site-wide contact bar (replaces the old floating call button).
// Phones & tablets: a bar pinned to the bottom with Call Anna · Chat · main button.
// Desktop: a floating group bottom-right with the same three actions.
// The main button comes from the page (setLeadContext): van pages open "Check availability"
// for that van, /black-friday scrolls to its form, everywhere else opens a short quote form.

const PHONE = "(951) 441-9719";
const TEL = "tel:+19514419719";
const HIDE = /^\/(dashboard|login|team|configurator|build-your-own-camper-van|van)(\/|$)|\/configure$|^\/quote\/preview\//;

const PhoneIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.045 15.045 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1A11.56 11.56 0 018.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.62c0-.55-.45-1-1-1z" />
  </svg>
);
const ChatIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

export default function LeadDock() {
  const pathname = usePathname() || "/";
  const [ctx, setCtx] = useState(getLeadContext());
  const [chatOpen, setChatOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [typing, setTyping] = useState(false);
  const [covering, setCovering] = useState(false);
  const hidden = HIDE.test(pathname);

  useEffect(() => subscribeLeadContext(setCtx), []);

  // Open from anywhere: window.dispatchEvent(new CustomEvent("bbv:chat"))
  useEffect(() => {
    const oc = () => setChatOpen(true);
    const of = () => setFormOpen(true);
    window.addEventListener("bbv:chat", oc);
    window.addEventListener("bbv:quickform", of);
    return () => {
      window.removeEventListener("bbv:chat", oc);
      window.removeEventListener("bbv:quickform", of);
    };
  }, []);

  // On phones the on-screen keyboard plus a bottom bar covers the field being typed in,
  // so the bar steps aside while a page field has focus.
  useEffect(() => {
    const on = (e) => {
      const t = e.target;
      if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) && !t.closest("[data-bbv-dock]") && window.innerWidth < 1024) setTyping(true);
    };
    const off = () => setTimeout(() => {
      const a = document.activeElement;
      if (!a || !/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) setTyping(false);
    }, 50);
    document.addEventListener("focusin", on);
    document.addEventListener("focusout", off);
    return () => {
      document.removeEventListener("focusin", on);
      document.removeEventListener("focusout", off);
    };
  }, []);

  // Step aside whenever a form field or Send button scrolls under the bar / desktop buttons,
  // so the bar never hides the thing the visitor is about to tap.
  useEffect(() => {
    if (hidden) return undefined;
    let frame = null;
    const check = () => {
      frame = null;
      const desk = window.innerWidth >= 1024;
      const zoneTop = window.innerHeight - (desk ? 210 : 90);
      const zoneLeft = desk ? window.innerWidth - 330 : 0;
      const hit = [...document.querySelectorAll("main form input:not([type=hidden]), main form textarea, main form select, main form button")].some((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && r.bottom > zoneTop && r.top < window.innerHeight && r.right > zoneLeft;
      });
      setCovering(hit);
    };
    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(check);
    };
    window.addEventListener("scroll", schedule, { passive: true, capture: true });
    window.addEventListener("resize", schedule);
    const t = setInterval(schedule, 1000);
    schedule();
    return () => {
      window.removeEventListener("scroll", schedule, { capture: true });
      window.removeEventListener("resize", schedule);
      clearInterval(t);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [hidden, pathname]);

  // Keep page content (footer, last buttons) clear of the bottom bar on phones/tablets.
  useEffect(() => {
    if (hidden) return undefined;
    const apply = () => {
      document.body.style.paddingBottom = window.innerWidth < 1024 ? "calc(76px + env(safe-area-inset-bottom, 0px))" : "";
    };
    apply();
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("resize", apply);
      document.body.style.paddingBottom = "";
    };
  }, [hidden]);

  // Lock page scroll behind the full-screen chat/form on phones
  useEffect(() => {
    const lock = (chatOpen || formOpen) && window.innerWidth < 1024;
    document.documentElement.style.overflow = lock ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [chatOpen, formOpen]);

  useEffect(() => {
    const esc = (e) => {
      if (e.key === "Escape") {
        setChatOpen(false);
        setFormOpen(false);
      }
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  const onUnread = useCallback((n) => setUnread(n), []);

  if (hidden) return null;

  const van = ctx.van || null;
  const primaryLabel = ctx.primaryLabel || (van ? "Check availability" : "Get prices");
  const primary = () => {
    bbvt("dock_primary", { label: primaryLabel, van: van?.title || "" });
    setChatOpen(false);
    if (ctx.onPrimary) ctx.onPrimary();
    else setFormOpen(true);
  };
  const toggleChat = () => {
    bbvt("dock_chat", { open: !chatOpen });
    setFormOpen(false);
    setChatOpen((o) => !o);
  };

  const badge = unread > 0 && !chatOpen && (
    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#E11D48] px-1 text-[11px] font-black text-white">{unread}</span>
  );

  return (
    <div data-bbv-dock>
      {/* PHONES & TABLETS: bottom bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-[9998] border-t border-primary/10 bg-white/95 backdrop-blur-md transition-transform duration-200 lg:hidden ${
          typing || covering || chatOpen || formOpen ? "translate-y-full" : "translate-y-0"
        }`}
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="mx-auto flex max-w-3xl items-stretch gap-2 px-3 py-2.5">
          <a
            href={TEL}
            data-bbvt-click="dock_call"
            className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-primary/15 py-1.5 text-primary active:scale-95"
          >
            <PhoneIcon className="h-5 w-5" />
            <span className="mt-0.5 text-[11px] font-bold leading-none">Call Anna</span>
          </a>
          <button
            type="button"
            onClick={toggleChat}
            data-bbvt-click="dock_chat"
            className="relative flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-primary/15 py-1.5 text-primary active:scale-95 cursor-pointer"
          >
            <ChatIcon className="h-5 w-5" />
            <span className="mt-0.5 text-[11px] font-bold leading-none">Chat</span>
            {badge}
          </button>
          <button
            type="button"
            onClick={primary}
            data-bbvt-click="dock_primary"
            className="flex-[2.2] rounded-xl bg-gradient-to-r from-[#E11D48] via-[#F97316] to-[#FACC15] px-3 text-sm font-black uppercase tracking-wider text-white shadow-md shadow-orange-500/25 active:scale-[0.98] cursor-pointer"
          >
            {primaryLabel}
          </button>
        </div>
      </div>

      {/* DESKTOP: floating group */}
      <div className="fixed bottom-6 right-6 z-[9998] hidden flex-col items-end gap-2.5 lg:flex">
        {!chatOpen && !covering && (
          <>
            <button
              type="button"
              onClick={primary}
              data-bbvt-click="dock_primary"
              className="rounded-full bg-gradient-to-r from-[#E11D48] via-[#F97316] to-[#FACC15] px-6 py-3 text-sm font-black uppercase tracking-wider text-white shadow-lg shadow-orange-500/30 transition hover:scale-[1.03] cursor-pointer"
            >
              {primaryLabel}
            </button>
            <a
              href={TEL}
              data-bbvt-click="dock_call"
              className="flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-2.5 text-sm font-bold text-primary shadow-lg transition hover:border-hover"
            >
              <PhoneIcon className="h-4 w-4 text-hover" />
              Call Anna {PHONE}
            </a>
          </>
        )}
        <button
          type="button"
          onClick={toggleChat}
          aria-label={chatOpen ? "Close chat" : "Chat with Anna"}
          data-bbvt-click="dock_chat"
          className="relative flex h-14 items-center gap-2 rounded-full bg-primary px-5 text-white shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition hover:scale-105 cursor-pointer"
        >
          {chatOpen ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <>
              <ChatIcon className="h-6 w-6 text-hover" />
              <span className="text-sm font-bold">Chat with Anna</span>
            </>
          )}
          {badge}
        </button>
      </div>

      <ChatWidget open={chatOpen} onClose={() => setChatOpen(false)} onUnread={onUnread} van={van} />

      {/* QUICK FORM (bottom sheet on phones, centered dialog on desktop) */}
      {formOpen && (
        <div
          className="fixed inset-0 z-[10001] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={(e) => e.target === e.currentTarget && setFormOpen(false)}
        >
          <div className="relative max-h-[94dvh] w-full overflow-y-auto rounded-t-2xl bg-white sm:max-w-xl sm:rounded-2xl" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-primary shadow hover:text-hover cursor-pointer"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <ContactForm leadSource={van ? "inventory" : ctx.source || "contact"} initialVans={van ? ctx.vanRaw || van : undefined} compact />
          </div>
        </div>
      )}
    </div>
  );
}
