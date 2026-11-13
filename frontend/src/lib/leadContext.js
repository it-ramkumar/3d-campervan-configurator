"use client";

// Page -> LeadDock context. A page tells the site-wide contact bar what its main button
// should do (e.g. van pages: "Check availability" for that van; /black-friday: scroll to
// the hold-price form). setLeadContext returns a cleanup so it resets when the page unmounts.

let ctx = {};
const subs = new Set();

export const getLeadContext = () => ctx;

export const setLeadContext = (next = {}) => {
  ctx = next || {};
  subs.forEach((fn) => fn(ctx));
  const mine = ctx;
  return () => {
    if (ctx === mine) {
      ctx = {};
      subs.forEach((fn) => fn(ctx));
    }
  };
};

export const subscribeLeadContext = (fn) => {
  subs.add(fn);
  return () => subs.delete(fn);
};

// Anything on the page can open the chat or the quick form through these events.
export const openChat = (detail = {}) => {
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("bbv:chat", { detail }));
};
export const openQuickForm = (detail = {}) => {
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("bbv:quickform", { detail }));
};
