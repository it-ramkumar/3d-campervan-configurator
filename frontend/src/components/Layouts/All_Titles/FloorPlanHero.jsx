"use client";

import React from "react";
import Image from "next/image";
import { RichParagraph, Heading1 } from "../../Common/Common";

export default function FloorPlanHero({ title, description, image }) {
  return (
    <section className="relative bg-primary text-secondary overflow-hidden py-16 lg:py-24 px-6 md:px-12 min-h-[520px] flex items-center">

      {/* Subtle orange atmospheric glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#ED985F]/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative z-10">

        {/* LEFT: Text */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left order-2 lg:order-1">

          {/* SpanTag-style label */}
          <span className="inline-flex items-center font-ui font-semibold text-[10px] uppercase tracking-[0.28em] text-[#ED985F] border-l-2 border-[#ED985F] pl-3 py-0.5">
            Big Bear Vans Studio
          </span>

          <Heading1 text={title} textColor="text-secondary" />

          <RichParagraph textColor="secondary" className="!text-secondary/65 max-w-xl mx-auto lg:mx-0">
            {description}
          </RichParagraph>

          <p className="font-ui font-semibold text-[10px] uppercase tracking-[0.22em] text-secondary/30 text-center lg:text-left">
            You Dream It, We Build It.
          </p>
        </div>

        {/* RIGHT: Image */}
        <div className="lg:col-span-6 flex justify-center items-center w-full order-1 lg:order-2">
          {image ? (
            <div className="relative w-full max-w-[680px] flex items-center justify-center group">
              <div className="absolute w-80 h-80 bg-[#ED985F]/8 rounded-full blur-[100px] pointer-events-none" />
              <div className="relative w-full h-auto transition-transform duration-500 group-hover:scale-[1.01]">
                <Image
                  src={image}
                  alt={title || "Camper Van Floor Plan"}
                  width={800}
                  height={600}
                  priority
                  className="w-full h-auto max-h-[580px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
                />
              </div>
            </div>
          ) : (
            <div className="w-full max-w-[640px] aspect-[16/10] bg-secondary/5 rounded-xl border border-secondary/8 flex items-center justify-center">
              <span className="font-ui text-secondary/25 text-sm tracking-wide">Blueprint loading...</span>
            </div>
          )}
        </div>

      </div>

      {/* Orange bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#ED985F]" />
    </section>
  );
}
