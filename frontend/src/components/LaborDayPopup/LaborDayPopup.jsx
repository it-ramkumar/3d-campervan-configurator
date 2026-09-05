"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const DEADLINE = new Date("2026-09-07T23:59:59-07:00").getTime();

export default function LaborDayPopup() {
  const [visible, setVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Show popup after 5 seconds
  useEffect(() => {
    // Don't show after the offer has expired
    if (Date.now() >= DEADLINE) return;

    const dismissed = sessionStorage.getItem("laborDayPopupDismissed2026");

    if (dismissed) return;

    const showTimer = setTimeout(() => {
      // Double-check expiry before showing
      if (Date.now() < DEADLINE) {
        setVisible(true);
      }
    }, 5000);

    return () => clearTimeout(showTimer);
  }, []);

  // Countdown
  useEffect(() => {
    if (!visible) return;

    const updateCountdown = () => {
      const difference = DEADLINE - Date.now();

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        setVisible(false);
        return;
      }

      setTimeLeft({
        days: Math.floor(
          difference / (1000 * 60 * 60 * 24)
        ),
        hours: Math.floor(
          (difference / (1000 * 60 * 60)) % 24
        ),
        minutes: Math.floor(
          (difference / (1000 * 60)) % 60
        ),
        seconds: Math.floor(
          (difference / 1000) % 60
        ),
      });
    };

    updateCountdown();

    const countdownTimer = setInterval(updateCountdown, 1000);

    return () => clearInterval(countdownTimer);
  }, [visible]);

  const closePopup = () => {
    sessionStorage.setItem(
      "laborDayPopupDismissed2026",
      "true"
    );

    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="labor-day-title"
    >
      <div className="relative w-full max-w-5xl overflow-hidden rounded-[var(--radius-md)] bg-secondary shadow-2xl animate-[laborPopupIn_0.35s_ease-out_forwards]">
        {/* Close Button */}
        <button
          type="button"
          onClick={closePopup}
          aria-label="Close Labor Day offer"
          className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-xl text-white backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-black/70"
        >
          ×
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative min-h-[260px] md:min-h-[560px]">
            <Image
              src="/Home/labor-day-sale.png"
              alt="Big Bear Vans Labor Day Sale"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 text-secondary">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-90">
                Big Bear Vans
              </p>

              <p className="mt-1 text-sm font-medium">
                Built for adventure. Designed for life.
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center px-6 py-9 text-center md:px-10 lg:px-14">
            {/* Label */}
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-red-600" />

              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">
                Labor Day Special
              </span>

              <span className="h-px w-8 bg-red-600" />
            </div>

            {/* Discount */}
            <h2
              id="labor-day-title"
              className="text-5xl font-black leading-[0.9] tracking-tight text-primary sm:text-6xl lg:text-7xl"
            >
              <span className="block text-red-600">
                $9,999
              </span>

              <span className="mt-2 block text-2xl tracking-[0.18em] sm:text-3xl">
                OFF
              </span>
            </h2>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-primary/70">
              Save $9,999 on any camper van in stock,
              currently in production, or a new custom
              build order.
            </p>

            {/* Countdown */}
            <div className="mt-6">
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-primary/50">
                Offer Ends September 7, 2026
              </p>

              <div className="mt-3 grid grid-cols-4 gap-2">
                {[
                  ["days", timeLeft.days],
                  ["hours", timeLeft.hours],
                  ["min", timeLeft.minutes],
                  ["sec", timeLeft.seconds],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-[var(--radius-md)] border border-primary/10 bg-primary/[0.03] px-2 py-3"
                  >
                    <div className="text-lg font-bold leading-none text-primary sm:text-xl">
                      {String(value).padStart(2, "0")}
                    </div>

                    <div className="mt-1 text-[8px] font-semibold uppercase tracking-wider text-primary/45">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                onClick={closePopup}
                className="flex-1 rounded-[var(--radius-md)] bg-red-600 px-5 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-secondary shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-700"
              >
                Reserve Your Van
              </Link>

              <Link
                href="/camper-vans-for-sale"
                onClick={closePopup}
                className="flex-1 rounded-[var(--radius-md)] border border-primary px-5 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-primary transition-all duration-200 hover:bg-primary hover:text-secondary"
              >
                Explore Vans
              </Link>
            </div>

            {/* Disclaimer */}
            <p className="mt-4 text-[10px] leading-5 text-primary/45">
              Message us to reserve your van or custom build
              slot before the offer ends.
            </p>
          </div>
        </div>
      </div>

      {/* Tailwind animation */}
      <style>{`
        @keyframes laborPopupIn {
          0% {
            opacity: 0;
            transform: scale(0.94) translateY(15px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}