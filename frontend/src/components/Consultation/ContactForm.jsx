"use client";

import React from "react";
import Image from "next/image";
import SecondaryButton from "../Common/Button/SecondaryButton";
import { Heading2, RichParagraph } from '../Common/Common';

export default function ContactForm({ formData, handleChange, handleSubmit, loading, initialVans }) {
  // console.log(initialVans, "initialVans");

  // ✅ Safe conditional check: Agar van data valid hai toh true hoga
  const hasSelectedVan = initialVans && initialVans.id && initialVans.title;

  return (
    <div className="bg-white p-6 md:p-12 rounded-xl border border-primary/5 shadow-sm max-w-[760px] mx-auto w-full">

      {/* 🚐 TOP AREA: SELECTED VAN HORIZONTAL BANNER CARD (Conditional Render) */}
      {hasSelectedVan && (
        <div className="mb-10 w-full animate-fadeIn">
          <div className="bg-secondary/30 p-4 sm:p-6 rounded-xl border border-primary/5 flex flex-col md:flex-row gap-6 items-center shadow-inner">

            {/* Left/Top Side: Van Image */}
            {initialVans.image && (
              <div className="relative w-full md:w-2/5 aspect-[16/10] bg-white rounded-lg overflow-hidden border border-primary/10 shadow-sm flex-shrink-0 group">
                <Image
                  src={initialVans.image}
                  alt={initialVans.title}
                  fill
                  sizes="(max-w-768px) 100vw, 300px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
            )}

            {/* Right/Bottom Side: Van Details Text */}
            <div className="w-full md:w-3/5 space-y-2 text-center md:text-left flex flex-col justify-between h-full">
              <div>
                <span className="inline-block text-[9px] font-extrabold tracking-widest text-[#ED985F] uppercase bg-[#ED985F]/10 px-2.5 py-0.5 rounded-full border border-[#ED985F]/20 mb-1">
                  Selected Configuration
                </span>
                <h3 className="text-lg font-black text-[#001F3D] tracking-tight leading-snug">
                  {initialVans.title}
                </h3>
                {initialVans.subtitle && (
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1 line-clamp-2">
                    {initialVans.subtitle}
                  </p>
                )}
              </div>

              {/* Price Row */}
              {initialVans.price && (
                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between mt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Base Investment
                  </span>
                  <span className="text-base font-black text-[#001F3D]">
                    ${initialVans.price.toLocaleString("en-US")}
                  </span>
                </div>
              )}
            </div>

          </div>

          {/* Decorative Divider Line between Banner and Form */}
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink mx-4 text-[10px] text-primary/20 font-bold uppercase tracking-widest">
              Inquiry Details
            </span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>
        </div>
      )}

      {/* 📝 FORM HEADING SECTION */}
      <div className="text-center mb-10">
        <Heading2 text={hasSelectedVan ? "Let’s Custom Build It" : "Let’s Connect"} />
        <RichParagraph className="mt-2">
          {hasSelectedVan
            ? `Fill out the form below to initiate your build specification for the ${initialVans.title}.`
            : "Tell us what’s on your mind! Whether it’s a project idea or a quick question, we’re here to help."
          }
        </RichParagraph>
      </div>

      {/* 🎛️ MAIN AREA: CONTACT FORM */}
<form
  onSubmit={(e) => {
    e.preventDefault();
    // Agar aapka handleSubmit direct state accept karta hai, toh hum van data sath attach kar ke bhej rahe hain:
    handleSubmit(e, {
      ...formData,
      vanSlug: initialVans?.slug,
      vanTitle: initialVans?.title,
      vanSlug: initialVans?.slug,
      vanPrice: initialVans?.price
    });
  }}
  className="space-y-6 w-full"
>        {/* 🚀 HIDDEN INPUTS: Payload will go safely with submit event */}
        {hasSelectedVan && (
          <>
            <input type="hidden" name="vanSlug" value={initialVans.slug} />
            <input type="hidden" name="vanTitle" value={initialVans.title} />
            <input type="hidden" name="vanSlug" value={initialVans.slug || ""} />
            <input type="hidden" name="vanPrice" value={initialVans.price || ""} />
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--gap-sm)]">
          {["name", "email", "phone"]?.map((field) => (
            <div key={field} className="flex flex-col">
              <label className="text-[11px] font-bold uppercase tracking-wider text-primary/40 mb-2 ml-1">
                {field}
              </label>
              <input
                type={field === "phone" ? "tel" : field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={(e) => {
                  if (field === "phone") {
                    const val = e.target.value.replace(/\D/g, "");
                    if (val.length <= 15) {
                      handleChange({
                        target: { name: field, value: val }
                      });
                    }
                  } else {
                    handleChange(e);
                  }
                }}
                required
                minLength={field === "phone" ? 10 : undefined}
                pattern={field === "phone" ? ".{10,}" : undefined}
                placeholder={field === "phone" ? "Minimum 10 digits" : `Your ${field}`}
                className="w-full p-4 rounded-lg bg-secondary/50 border border-transparent focus:border-hover focus:bg-white focus:outline-none transition-all text-primary"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col">
          <label className="text-[11px] font-bold uppercase tracking-wider text-primary/40 mb-2 ml-1">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={hasSelectedVan ? `I'm highly interested in the ${initialVans.title}. Let's discuss next steps.` : "Your Message"}
            rows="4"
            className="w-full p-4 rounded-lg bg-secondary/50 border border-transparent focus:border-hover focus:bg-white focus:outline-none transition-all text-primary font-sans"
          />
        </div>

        <div className="pt-4 flex justify-center">
          <SecondaryButton
            type="submit"
            disabled={loading}
            label={loading ? "Submitting..." : "Send Message"}
          />
        </div>
      </form>

      {/* Slogan Brand Identity Footer */}
      <div className="text-[10px] text-center font-bold text-primary/20 uppercase tracking-widest mt-8">
        You Dream It, We Build It.
      </div>

    </div>
  );
}