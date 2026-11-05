"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BLACK_FRIDAY_END, isBlackFriday } from "@/utils/salePrice";

function timeLeft() {
  const ms = Math.max(0, BLACK_FRIDAY_END.getTime() - Date.now());
  const pad = (n) => String(n).padStart(2, "0");
  return {
    days: pad(Math.floor(ms / 86400000)),
    hours: pad(Math.floor((ms % 86400000) / 3600000)),
    minutes: pad(Math.floor((ms % 3600000) / 60000)),
    seconds: pad(Math.floor((ms % 60000) / 1000)),
  };
}

// Homepage announcement for the Black Friday sale. Hides itself after the end date.
export default function BlackFridayBanner({
  maxSavings = 0,
  ctaHref = "/camper-vans-for-sale",
  ctaLabel = "Shop Black Friday deals →",
}) {
  const [left, setLeft] = useState(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const tick = () => {
      setActive(isBlackFriday());
      setLeft(timeLeft());
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!active || !isBlackFriday()) return null;

  const units = [
    ["days", "Days"],
    ["hours", "Hours"],
    ["minutes", "Min"],
    ["seconds", "Sec"],
  ];

  return (
    <section
      aria-label="Black Friday sale"
      className="relative overflow-hidden bg-black text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(249,115,22,0.35),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(225,29,72,0.35),transparent_45%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-10 text-center md:flex-row md:justify-between md:py-12 md:text-left">
        <div className="max-w-2xl">
          <p className="mb-3 inline-block rounded-full bg-gradient-to-r from-[#E11D48] via-[#F97316] to-[#FACC15] px-4 py-1 text-xs font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-orange-500/40">
            ⚡ Biggest promotion of the year
          </p>
          <h2 className="text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
            <span className="bg-gradient-to-r from-[#FACC15] via-[#F97316] to-[#E11D48] bg-clip-text text-transparent">
              Black Friday
            </span>{" "}
            Sale
          </h2>
          <p className="mt-4 text-base font-semibold text-white/90 md:text-lg">
            {maxSavings > 0
              ? `Save up to $${maxSavings.toLocaleString()} on ready-to-go camper vans.`
              : "Our lowest prices of the year on ready-to-go camper vans."}{" "}
            Ends November 28.
          </p>
        </div>

        <div className="flex flex-col items-center gap-5">
          <div className="flex gap-2" suppressHydrationWarning>
            {units.map(([key, label]) => (
              <div
                key={key}
                className="min-w-[64px] rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-center backdrop-blur"
              >
                <div className="text-2xl font-black tabular-nums md:text-3xl">
                  {left ? left[key] : "--"}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/70">
                  {label}
                </div>
              </div>
            ))}
          </div>
          <Link
            href={ctaHref}
            className="rounded-full bg-gradient-to-r from-[#E11D48] via-[#F97316] to-[#FACC15] px-8 py-3 text-sm font-black uppercase tracking-wider text-white shadow-lg shadow-orange-500/40 transition-transform hover:scale-105"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
