"use client";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function BlackFridayCard() {
  const [showPopup, setShowPopup] = useState(false); // initially false
  const [showBadge, setShowBadge] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // COUNTDOWN TIMER
  useEffect(() => {
    const targetDate = new Date("2025-12-31T23:59:59").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // DELAY POPUP AT PAGE START
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setShowPopup(true);
    }, 5000); // 8 seconds delay

    return () => clearTimeout(delayTimer);
  }, []);

  return (
    <>
      {/* MAIN POPUP */}
      {showPopup && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: "backOut" }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9999]"
        >
          <div className="relative bg-[#FFD700] text-black rounded-2xl shadow-2xl w-[320px] sm:w-[360px] p-6 text-center">

            <button
              onClick={() => {
                setShowPopup(false);
                setShowBadge(true);
              }}
              className="absolute top-3 right-3 text-black/60 hover:text-black transition"
            >
              <X size={22} />
            </button>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2">
                SPECIAL <br /> OFFER.
            </h1>

            <p className="text-lg font-bold mb-1">
              Flat <span className="text-5xl font-extrabold">17%</span> off
            </p>

            <p className="text-sm text-black/70 mb-4">
              Offer ends on 31 December 2025 🎉
            </p>

            <div className="flex justify-center gap-2 mb-6 font-bold text-black">
              <div className="bg-black/10 px-3 py-2 rounded-md text-center">
                <div className="text-2xl">{timeLeft.days}</div>
                <div className="text-xs">Days</div>
              </div>
              <div className="bg-black/10 px-3 py-2 rounded-md text-center">
                <div className="text-2xl">{timeLeft.hours}</div>
                <div className="text-xs">Hours</div>
              </div>
              <div className="bg-black/10 px-3 py-2 rounded-md text-center">
                <div className="text-2xl">{timeLeft.minutes}</div>
                <div className="text-xs">Min</div>
              </div>
              <div className="bg-black/10 px-3 py-2 rounded-md text-center">
                <div className="text-2xl">{timeLeft.seconds}</div>
                <div className="text-xs">Sec</div>
              </div>
            </div>

            <Link href={"/van-detail/4x4-santa-monica-v6-turbo"}>
              <button
                onClick={() => {
                  setShowPopup(false);
                  setShowBadge(true);
                }}
                className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition"
              >
                SHOP NOW
              </button>
            </Link>

          </div>
        </motion.div>
      )}

      {/* MINI BADGE BOTTOM RIGHT */}
      {showBadge && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => {
            setShowPopup(true);
            setShowBadge(false);
          }}
          className="fixed bottom-4 right-4 bg-[#FFD700] text-black px-4 py-2 animate-bounce  rounded-full cursor-pointer shadow-xl font-bold text-sm hover:scale-105 transition-all z-[9999]"
        >
           SPECIAL OFFER – {timeLeft.days}d {timeLeft.hours}h
        </motion.div>
      )}
    </>
  );
}
