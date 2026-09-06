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
    if (Date.now() >= DEADLINE) return;

    const dismissed = sessionStorage.getItem("laborDayPopupDismissed2026");
    if (dismissed) return;

    const showTimer = setTimeout(() => {
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
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setVisible(false);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    updateCountdown();
    const countdownTimer = setInterval(updateCountdown, 1000);

    return () => clearInterval(countdownTimer);
  }, [visible]);

  const closePopup = () => {
    sessionStorage.setItem("laborDayPopupDismissed2026", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/75 p-3 sm:p-4 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="labor-day-title"
    >
      <div className="relative w-full max-w-5xl my-auto overflow-hidden rounded-[var(--radius-md)] bg-secondary shadow-2xl animate-[laborPopupIn_0.35s_ease-out_forwards] max-h-[90vh] flex flex-col md:max-h-none">
        {/* Close Button */}
        <button
          type="button"
          onClick={closePopup}
          aria-label="Close Labor Day offer"
          className="absolute right-3 top-3 z-30 flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-black/80"
        >
          ×
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto md:overflow-visible">
          {/* Image */}
          <div className="relative h-44 sm:h-56 md:h-auto md:min-h-[560px] shrink-0">
            <Image
              src="/Home/labor-day-sale.png"
              alt="Big Bear Vans Labor Day Sale"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <div className="absolute bottom-3 left-4 right-4 md:bottom-6 md:left-6 md:right-6 text-secondary">
              <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] opacity-90">
                Big Bear Vans
              </p>
              <p className="mt-0.5 md:mt-1 text-xs md:text-sm font-medium">
                Built for adventure. Designed for life.
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center px-4 py-6 md:px-10 lg:px-14 text-center overflow-y-auto">
            {/* Label */}
            <div className="mb-2 md:mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-6 md:w-8 bg-red-600" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] text-red-600">
                Labor Day Special
              </span>
              <span className="h-px w-6 md:w-8 bg-red-600" />
            </div>

            {/* Discount */}
            <h2
              id="labor-day-title"
              className="text-4xl font-black leading-[0.95] tracking-tight text-primary sm:text-5xl lg:text-7xl"
            >
              <span className="block text-red-600">$9,999</span>
              <span className="mt-1 md:mt-2 block text-xl tracking-[0.18em] sm:text-2xl lg:text-3xl">
                OFF
              </span>
            </h2>

            {/* Description */}
            <p className="mx-auto mt-3 md:mt-5 max-w-md text-xs md:text-sm leading-relaxed text-primary/70">
              Save $9,999 on any camper van in stock, currently in production,
              or a new custom build order.
            </p>

            {/* Countdown */}
            <div className="mt-4 md:mt-6">
              <p className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.25em] text-primary/50">
                Offer Ends September 7, 2026
              </p>

              <div className="mt-2 md:mt-3 grid grid-cols-4 gap-1.5 sm:gap-2">
                {[
                  ["days", timeLeft.days],
                  ["hours", timeLeft.hours],
                  ["min", timeLeft.minutes],
                  ["sec", timeLeft.seconds],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-[var(--radius-md)] border border-primary/10 bg-primary/[0.03] px-1.5 py-2 sm:px-2 sm:py-3"
                  >
                    <div className="text-base sm:text-lg md:text-xl font-bold leading-none text-primary">
                      {String(value).padStart(2, "0")}
                    </div>
                    <div className="mt-1 text-[7px] sm:text-[8px] font-semibold uppercase tracking-wider text-primary/45">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-5 md:mt-7 flex flex-col gap-2.5 sm:flex-row">
              <Link
                href="/contact"
                onClick={closePopup}
                className="flex-1 rounded-[var(--radius-md)] bg-red-600 px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-secondary shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-700"
              >
                Reserve Your Van
              </Link>

              <Link
                href="/camper-vans-for-sale"
                onClick={closePopup}
                className="flex-1 rounded-[var(--radius-md)] border border-primary px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-primary transition-all duration-200 hover:bg-primary hover:text-secondary"
              >
                Explore Vans
              </Link>
            </div>

            {/* Disclaimer */}
            <p className="mt-3 md:mt-4 text-[9px] md:text-[10px] leading-4 text-primary/45">
              Message us to reserve your van or custom build slot before the
              offer ends.
            </p>
          </div>
        </div>
      </div>

      {/* CSS Keyframes */}
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