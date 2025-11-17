"use client";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function BlackFridayCard() {
  const [show, setShow] = useState(true);


  if (!show) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.5, ease: "backOut" }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9999]"
    >
      <div className="relative bg-[#FFD700] text-black rounded-2xl shadow-2xl w-[320px] sm:w-[360px] p-6 text-center">

        <button
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 text-black/60 hover:text-black transition"
        >
          <X size={22} />
        </button>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2">
          BLACK <br /> FRIDAY
        </h1>

        <p className="text-lg font-bold mb-1">
          Flat <span className="text-5xl font-extrabold">17%</span> off
        </p>
        <p className="text-sm text-black/70 mb-6">
          on this Black Friday! 🎉
        </p>

        <Link to={"/van-detail/4x4-santa-monica-v6-turbo"}>
          <button
            onClick={() => setShow(false)}
            className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition"
          >
            SHOP NOW
          </button>
        </Link>

      </div>
    </motion.div>
  );
}
