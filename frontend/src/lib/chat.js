"use client";

import { LIVE_URL, visitorIds, campaignInfo, deviceType } from "@/lib/bbvt";

// Website chat client. Messages go through the BBV Live Apps Script; Anna answers from
// bigbearvans.com/team/live. The chat id + token stay in localStorage so the conversation
// follows the visitor across pages and return visits.

const KEY = "bbv_chat";

export const loadChat = () => {
  try {
    const c = JSON.parse(window.localStorage.getItem(KEY) || "null");
    if (c && c.cid && c.tok && Date.now() - (c.at || 0) < 14 * 864e5) return c;
  } catch {
    // storage blocked
  }
  return null;
};

export const saveChat = (c) => {
  try {
    if (c) window.localStorage.setItem(KEY, JSON.stringify({ ...c, at: Date.now() }));
    else window.localStorage.removeItem(KEY);
  } catch {
    // storage blocked
  }
};

const post = async (body) => {
  const res = await fetch(LIVE_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!data.ok) throw new Error(data.error || "Chat is unavailable right now.");
  return data;
};

export const startChat = ({ name, phone, email, text, van }) =>
  post({
    a: "start",
    name,
    phone,
    email,
    text,
    van,
    page: `${window.location.origin}${window.location.pathname}`,
    dev: deviceType(),
    u: campaignInfo(),
    ...visitorIds(),
  });

export const sendChat = (cid, tok, text) => post({ a: "msg", c: cid, t: tok, text });

export const pollChat = async (cid, tok, since) => {
  const res = await fetch(`${LIVE_URL}?api=poll&c=${encodeURIComponent(cid)}&t=${encodeURIComponent(tok)}&since=${since || 0}`);
  return res.json();
};
