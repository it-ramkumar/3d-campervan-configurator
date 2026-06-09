"use client";

import React from "react";
import Image from "next/image";
import { RichParagraph, Heading1 } from "../../Common/Common";

export default function FloorPlanHero({ title, description, image }) {
  return (
    <section className="relative bg-[#001F3D] text-white overflow-hidden py-16 lg:py-24 px-6 md:px-12 min-h-[550px] flex items-center">

      {/* 🌌 BACKGROUND WATERMARK GLOW */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#ED985F]/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">

        {/* 📝 LEFT SIDE: TEXT CONTENT */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left order-2 lg:order-1">
          <span className="inline-block text-[11px] font-extrabold tracking-widest text-[#ED985F] uppercase bg-[#ED985F]/10 px-4 py-1.5 rounded-full border border-[#ED985F]/20">
            Big Bear Vans Studio
          </span>

          <Heading1
            text={title}
            className="!text-white !text-3xl md:!text-4xl lg:!text-5xl font-black tracking-tight leading-tight"
          />

          <RichParagraph className="text-white/70 !text-sm md:!text-base max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
            {description}
          </RichParagraph>

          <div className="pt-2 text-xs font-bold text-white/40 tracking-wider uppercase text-center lg:text-left">
            You Dream It, We Build It.
          </div>
        </div>

        {/* 🖼️ RIGHT SIDE: NEXT.JS NATIVE IMAGE (Bina Background Card Ke) */}
        <div className="lg:col-span-6 flex justify-center items-center w-full order-1 lg:order-2">
          {image ? (
            /* ⚡ Wrapper div bilkul clean hai, koi borders, background, gradient ya glassmorphism nahi hai */
            <div className="relative w-full max-w-[700px] flex items-center justify-center group">

              {/* 💡 Core Radial Glow behind the PNG (Taake dark background par image pop ho) */}
              <div className="absolute w-92 h-92 bg-[#ED985F]/10 rounded-full blur-[100px] pointer-events-none" />

              {/* 📷 Next.js Image Container */}
              <div className="relative w-full h-auto transition-transform duration-500 group-hover:scale-[1.01]">
                <Image
                  src={image}
                  alt={title || "Camper Van Floor Plan"}
                  width={800}    // Max width define ki taake layout scale up ho sake
                  height={600}   // Aspect ratio maintain rakhne ke liye height
                  priority       // LCP loading optimization ke liye
                  className="w-full h-auto max-h-[600px] object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)]"
                />
              </div>

            </div>
          ) : (
            <div className="w-full max-w-[650px] aspect-[16/10] bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center text-white/30 text-sm font-medium italic">
              Drawing vector processing...
            </div>
          )}
        </div>

      </div>
    </section>
  );
}