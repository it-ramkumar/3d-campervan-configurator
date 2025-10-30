"use client";

import { motion } from "framer-motion";

// Background image for the hero section
const heroImage = "/heroSlider/CampervansLayoutforCouples.webp";

export default function CoupleLayoutHero() {
  return (
    <div className="relative w-full h-[60vh] md:h-[90vh] overflow-hidden">
      {/* Background Image with slow zoom effect */}
      <motion.img
        src={heroImage}
        alt="Interior of a custom converted van"
        className="absolute inset-0 w-full h-full object-cover scale-100"
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        loading="eager"
        decoding="async"
      />

      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Text Section */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full text-left px-6 sm:px-8 md:px-16 lg:px-24">
        <motion.h1
          className="font-serif font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.span
            className="block text-white"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
          >
            Campervans Layouts
          </motion.span>

          <motion.span
            className="block text-white"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
          >
            for Couples <span className="text-[#2761FD]">(For 2)</span>
          </motion.span>
        </motion.h1>
      </div>
    </div>
  );
}
