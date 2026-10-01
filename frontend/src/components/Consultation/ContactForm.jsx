"use client";

import React, { useState } from "react";
import Image from "next/image";
import SecondaryButton from "../Common/Button/SecondaryButton";
import { Heading1, RichParagraph } from "../Common/Common";
import { useRouter } from "next/navigation";
import { contact } from "@/api/contact/contact";
import { validateLead } from "@/lib/validateLead";
import { trackLead, saveLeadEmail, cleanPageUrl, createEventId } from "@/lib/track";

const EMPTY_FORM = { name: "", email: "", phone: "", message: "" };

// leadSource: "contact" | "inventory" | "layout"
export default function ContactForm({ leadSource = "contact", initialVans }) {
  const router = useRouter();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const van = normalizeVan(initialVans);

  const hasSelectedVan = !!van?.id && !!van?.title;

  const imageSrc = van?.image;

  const isPriceValid = van?.price && Number(van.price) >= 1000;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const fieldErrors = validateLead(formData, { requirePhone: true });
    setErrors(fieldErrors);
    setSubmitError("");
    if (Object.keys(fieldErrors).length) return;

    const message =
      formData.message.trim() ||
      (van?.title ? `Interested in ${van.title}` : "No message provided");

    const eventId = createEventId();
    setLoading(true);
    try {
      await contact({
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim(),
        message,
        vanSlug: van?.slug,
        vanTitle: van?.title,
        vanPrice: isPriceValid ? Number(van.price) : 0,
        pageUrl: cleanPageUrl(),
        event_id: eventId,
        lead_source: leadSource,
      });
    } catch (error) {
      setSubmitError(error.message || "We couldn't send your message.");
      setLoading(false);
      return;
    }

    trackLead({ source: leadSource, email: formData.email, phone: formData.phone, eventId });
    saveLeadEmail(formData.email);
    router.push(`/thank-you?source=${encodeURIComponent(leadSource)}`);
  };

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
                <RichParagraph variant="card">
                  Selected Configuration
                </RichParagraph>


                <Heading1 variant="card" text={van.title} textColor="text-[#001F3D]" />
                {van.subtitle && (
                  <RichParagraph variant="card" className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {van.subtitle}
                  </RichParagraph>
                )}
              </div>

              {/* PRICE */}
              <div className="pt-3 border-t border-slate-200/60 mt-2">
                <div className="flex items-center justify-between">
                  <RichParagraph variant="card">
Price
                  </RichParagraph>


                  {van?.price && Number(van.price) >= 1000 ? (
                    <RichParagraph variant="card" className="text-lg font-black text-[#001F3D]">
                      ${Number(van.price).toLocaleString("en-US")}
                    </RichParagraph>
                  ) : (
                    <RichParagraph variant="card" className="text-base font-black text-[#001F3D]">
                      Pricing Not Mentioned
                    </RichParagraph>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-slate-100"></div>
            <RichParagraph variant="card" className=" text-primary/20 font-bold uppercase">
              Inquiry Details
            </RichParagraph>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>
        </div>
      )}

      {/* HEADING */}
      <div className="text-center mb-10">
        <Heading1 variant="section" textColor="text-primary" text={hasSelectedVan ? "Let’s Custom Build It" : "Let’s Connect"} />

        <RichParagraph variant="body" className="mt-2">
          {hasSelectedVan
            ? `Fill out the form below for ${van.title}.`
            : "Tell us what’s on your mind!"
          }
        </RichParagraph>
      </div>
      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-6 w-full"
      >
        {/* HIDDEN INPUTS */}
        {hasSelectedVan && (
          <>
            <input type="hidden" name="vanSlug" value={van.slug || ""} />
            <input type="hidden" name="vanTitle" value={van.title || ""} />
            <input
              type="hidden"
              name="vanPrice"
              value={
                van?.price && Number(van.price) >= 1000
                  ? Number(van.price)
                  : 0
              }
            />
          </>
        )}

        {/* INPUTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--gap-sm)]">
          {["name", "email", "phone"].map((field) => (
            <div key={field} className="flex flex-col">
              <label htmlFor={`contact-${field}`} className="text-[11px] font-bold uppercase tracking-wider text-primary/40 mb-2 ml-1">
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
                id={`contact-${field}`}
                name={field}
                autoComplete={field === "phone" ? "tel" : field}
                aria-invalid={!!errors[field]}
                aria-describedby={errors[field] ? `contact-${field}-error` : undefined}
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
              {errors[field] && (
                <p id={`contact-${field}-error`} role="alert" className="mt-1 ml-1 text-xs font-semibold text-red-600">
                  {errors[field]}
                </p>
              )}
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
          className="w-full p-4 text-black rounded-lg bg-secondary/50 border border-transparent focus:border-hover focus:bg-white focus:outline-none"
        />

        {submitError && (
          <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {submitError} Please try again, or call us at{" "}
            <a href="tel:+19514419719" className="font-bold underline">
              (951) 441-9719
            </a>
            .
          </div>
        )}

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