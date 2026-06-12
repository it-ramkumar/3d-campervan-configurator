"use client";

import React from "react";
import Image from "next/image";
import SecondaryButton from "../Common/Button/SecondaryButton";
import { Heading2, RichParagraph } from "../Common/Common";
import { useRouter } from "next/navigation"; // Agar Next.js 13+ App Router hai
export default function ContactForm({
  formData,
  handleChange,
  handleSubmit,
  loading,
  initialVans,
}) {
  const router = useRouter();
  const van = normalizeVan(initialVans);

  const hasSelectedVan = !!van?.id && !!van?.title;

  const imageSrc = van?.image;

  return (
    <div className="bg-white p-6 md:p-12 rounded-xl border border-primary/5 shadow-sm max-w-[760px] mx-auto w-full">

      {/* 🚐 SELECTED VAN */}
      {hasSelectedVan && (
        <div className="mb-10 w-full animate-fadeIn">
          <div className="bg-secondary/30 p-4 sm:p-6 rounded-xl border border-primary/5 flex flex-col md:flex-row gap-6 items-center shadow-inner">

            {/* IMAGE */}
            {imageSrc && (
              <div className="relative w-full md:w-2/5 aspect-[16/10] bg-white rounded-lg overflow-hidden border border-primary/10 shadow-sm flex-shrink-0 group">
                <Image
                  src={imageSrc}
                  alt={van.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
            )}

            {/* DETAILS */}
            <div className="w-full md:w-3/5 space-y-2 text-center md:text-left flex flex-col justify-between h-full">
              <div>
                <span className="inline-block text-[9px] font-extrabold tracking-widest text-[#ED985F] uppercase bg-[#ED985F]/10 px-2.5 py-0.5 rounded-full border border-[#ED985F]/20 mb-1">
                  Selected Configuration
                </span>

                <h3 className="text-lg font-black text-[#001F3D] leading-snug">
                  {van.title}
                </h3>

                {van.subtitle && (
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {van.subtitle}
                  </p>
                )}
              </div>

              {/* PRICE */}
              {van.price && (
                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between mt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Base Investment
                  </span>

                  <span className="text-base font-black text-[#001F3D]">
                    ${Number(van.price).toLocaleString("en-US")}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* DIVIDER */}
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink mx-4 text-[10px] text-primary/20 font-bold uppercase tracking-widest">
              Inquiry Details
            </span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>
        </div>
      )}

      {/* HEADING */}
      <div className="text-center mb-10">
        <Heading2 text={hasSelectedVan ? "Let’s Custom Build It" : "Let’s Connect"} />

        <RichParagraph className="mt-2">
          {hasSelectedVan
            ? `Fill out the form below for ${van.title}.`
            : "Tell us what’s on your mind!"
          }
        </RichParagraph>
      </div>

      {/* FORM */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          try {
            // 1. Form data submit hone ka wait karein
            await handleSubmit(e, {
              ...formData,
              vanSlug: van?.slug,
              vanTitle: van?.title,
              vanPrice: van?.price,
            });

            // 2. Parameters tayar karein jo Thank You page par bhejne hain
            const formSource = hasSelectedVan ? "Inquiry Form" : "General Contact";
            const vanTitle = van?.title || "No Van Selected";

            // 3. Clean Redirect: Saara data URL parameters me bhej diya
            router.push(
              `/thank-you?email=${encodeURIComponent(formData.email)}&source=${encodeURIComponent(formSource)}&van=${encodeURIComponent(vanTitle)}`
            );

          } catch (error) {
            // Agar API/Server me error aaye to redirect nahi hoga aur error console ho jayega
            console.error("Form submission failed:", error);
          }
        }}
        className="space-y-6 w-full"
      >
        {/* HIDDEN INPUTS */}
        {hasSelectedVan && (
          <>
            <input type="hidden" name="vanSlug" value={van.slug || ""} />
            <input type="hidden" name="vanTitle" value={van.title || ""} />
            <input type="hidden" name="vanPrice" value={van.price || ""} />
          </>
        )}

        {/* INPUTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--gap-sm)]">
          {["name", "email", "phone"].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="text-[11px] font-bold uppercase tracking-wider text-primary/40 mb-2 ml-1">
                {field}
              </label>

              <input
                type={
                  field === "phone"
                    ? "tel"
                    : field === "email"
                      ? "email"
                      : "text"
                }
                name={field}
                value={formData[field]}
                onChange={(e) => {
                  if (field === "phone") {
                    const val = e.target.value.replace(/\D/g, "");
                    if (val.length <= 15) {
                      handleChange({ target: { name: field, value: val } });
                    }
                  } else {
                    handleChange(e);
                  }
                }}
                required
                className="w-full p-4 rounded-lg bg-secondary/50 border border-transparent focus:border-hover focus:bg-white focus:outline-none"
              />
            </div>
          ))}
        </div>

        {/* MESSAGE */}
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          placeholder={
            hasSelectedVan
              ? `Interested in ${van.title}`
              : "Your Message"
          }
          className="w-full p-4 rounded-lg bg-secondary/50 border border-transparent focus:border-hover focus:bg-white focus:outline-none"
        />

        {/* SUBMIT */}
        <div className="pt-4 flex justify-center">
          <SecondaryButton
            type="submit"
            disabled={loading}
            label={loading ? "Submitting..." : "Send Message"}
          />
        </div>
      </form>
    </div>
  );
}

const normalizeVan = (data) => {
  if (!data) return null;

  const listing = data.van_listing || data;

  return {
    id: data._id || data.id,
    slug: data.slug,

    title: listing?.title,
    subtitle: listing?.subtitle,
    description: listing?.description,

    price: listing?.price,

    image: data.image || data.gallery?.[0] || null,
    gallery: data.gallery || [],

    raw: data, // optional debug fallback
  };
};