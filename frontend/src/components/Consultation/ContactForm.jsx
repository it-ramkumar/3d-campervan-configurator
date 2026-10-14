"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SecondaryButton from "../Common/Button/SecondaryButton";
import { Heading1, RichParagraph } from "../Common/Common";
import { contact } from "@/api/contact/contact";
import { validateLead } from "@/lib/validateLead";
import { trackLead, saveLeadEmail, cleanPageUrl, createEventId } from "@/lib/track";

const EMPTY_FORM = { name: "", email: "", phone: "", message: "" };
const FALLBACK_VAN_IMAGE = "/images/blackLogo.webp";
const NON_IMAGE_EXT = /\.(mp4|mov|webm|m4v|pdf|glb|gltf)(\?|#|$)/i;

const normalizeVan = (data) => {
  if (!data) return null;
  const rawData = Array.isArray(data) ? data[0] : data;
  if (!rawData) return null;

  const listing = rawData.van_listing || rawData;

  return {
    id: rawData._id || rawData.id,
    slug: rawData.slug,
    title: listing?.title,
    subtitle: listing?.subtitle,
    description: listing?.description,
    price: listing?.price,
    image:
      [rawData.image, ...(Array.isArray(rawData.gallery) ? rawData.gallery : [])].find(
        (src) => typeof src === "string" && src.trim() && !NON_IMAGE_EXT.test(src)
      ) || null,
    gallery: rawData.gallery || [],
  };
};

export default function ContactForm({ leadSource = "contact", initialVans }) {
  const router = useRouter();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const [failedImage, setFailedImage] = useState(null);

  const van = normalizeVan(initialVans);
  const hasSelectedVan = !!van?.id && !!van?.title;
  const imageSrc = van?.image && van.image !== failedImage ? van.image : FALLBACK_VAN_IMAGE;
  const isInventory = leadSource === "inventory";
  const isPriceValid = van?.price && Number(van.price) >= 1000;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

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
      {/* 🚐 SELECTED VAN DETAILS */}
      {hasSelectedVan && (
        <div className="mb-10 w-full animate-fadeIn">
          <div className="bg-secondary/30 p-4 sm:p-6 rounded-xl border border-primary/5 flex flex-col md:flex-row gap-6 items-center shadow-inner">
            {/* IMAGE */}
            {imageSrc && (
              <div className="relative w-full md:w-2/5 aspect-[16/10] bg-white rounded-lg overflow-hidden border border-primary/10 shadow-sm flex-shrink-0 group">
                <Image
                  src={imageSrc}
                  onError={() => setFailedImage(van.image)}
                  alt={van.title || "Selected Van"}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className={`${
                    imageSrc === FALLBACK_VAN_IMAGE ? "object-contain p-6" : "object-cover"
                  } transition-transform duration-500 group-hover:scale-105`}
                  priority
                />
              </div>
            )}

            {/* DETAILS */}
            <div className="w-full md:w-3/5 space-y-2 text-center md:text-left flex flex-col justify-between h-full">
              <div>
                <RichParagraph variant="card">Selected Configuration</RichParagraph>
                <Heading1 variant="card" textColor="text-[#001F3D]">
                  {van.title}
                </Heading1>
                {van.subtitle && (
                  <RichParagraph variant="card" className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {van.subtitle}
                  </RichParagraph>
                )}
              </div>

              {/* PRICE */}
              <div className="pt-3 border-t border-slate-200/60 mt-2">
                <div className="flex items-center justify-between">
                  <RichParagraph variant="card">Price</RichParagraph>
                  {isPriceValid ? (
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
            <div className="flex-grow border-t border-slate-100" />
            <RichParagraph variant="card" className="px-4 text-primary/20 font-bold uppercase">
              Inquiry Details
            </RichParagraph>
            <div className="flex-grow border-t border-slate-100" />
          </div>
        </div>
      )}

      {/* HEADING SECTION */}
      <div className="text-center mb-10">
        <Heading1 variant="section" textColor="text-primary">
          {hasSelectedVan
            ? isInventory
              ? `Ask about ${van.title}`
              : "Let’s Custom Build It"
            : "Let’s Connect"}
        </Heading1>

        <RichParagraph variant="body" className="mt-2">
          {hasSelectedVan
            ? `Fill out the form below for ${van.title}.`
            : "Tell us what’s on your mind!"}
        </RichParagraph>
      </div>

      {/* FORM SECTION */}
      <form onSubmit={handleSubmit} noValidate className="space-y-6 w-full">
        {hasSelectedVan && (
          <>
            <input type="hidden" name="vanSlug" value={van.slug || ""} />
            <input type="hidden" name="vanTitle" value={van.title || ""} />
            <input
              type="hidden"
              name="vanPrice"
              value={isPriceValid ? Number(van.price) : 0}
            />
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* NAME */}
          <div className="flex flex-col">
            <label htmlFor="contact-name" className="text-[11px] font-bold uppercase tracking-wider text-primary/40 mb-2 ml-1">
              Full Name *
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-lg bg-primary/10 border border-transparent focus:border-hover focus:bg-secondary/80 focus:outline-none transition-all"
            />
            {errors.name && (
              <p id="contact-name-error" role="alert" className="mt-1 ml-1 text-xs font-semibold text-red-600">
                {errors.name}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div className="flex flex-col">
            <label htmlFor="contact-email" className="text-[11px] font-bold uppercase tracking-wider text-primary/40 mb-2 ml-1">
              Email Address *
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-lg bg-primary/10 border border-transparent focus:border-hover focus:bg-white focus:outline-none transition-all"
            />
            {errors.email && (
              <p id="contact-email-error" role="alert" className="mt-1 ml-1 text-xs font-semibold text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          {/* PHONE (Span 2 Columns for symmetry) */}
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="contact-phone" className="text-[11px] font-bold uppercase tracking-wider text-primary/40 mb-2 ml-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="contact-phone"
              name="phone"
              autoComplete="tel"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "contact-phone-error" : undefined}
              value={formData.phone}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                if (val.length <= 15) {
                  handleChange({ target: { name: "phone", value: val } });
                }
              }}
              required
              className="w-full p-4 rounded-lg bg-primary/10 border border-transparent focus:border-hover focus:bg-white focus:outline-none transition-all"
            />
            {errors.phone && (
              <p id="contact-phone-error" role="alert" className="mt-1 ml-1 text-xs font-semibold text-red-600">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* MESSAGE TEXTAREA */}
        <div className="flex flex-col">
          <label htmlFor="contact-message" className="text-[11px] font-bold uppercase tracking-wider text-primary/40 mb-2 ml-1">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder={
              hasSelectedVan
                ? `Interested in ${van.title}`
                : "Your Message"
            }
            className="w-full p-4 text-black rounded-lg bg-primary/10 border border-transparent focus:border-hover focus:bg-white focus:outline-none transition-all resize-none"
          />
        </div>

        {submitError && (
          <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {submitError} Please try again, or call us at{" "}
            <a href="tel:+19514419719" className="font-bold underline">
              (951) 441-9719
            </a>
            .
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <div className="pt-4 flex justify-center">
          <SecondaryButton
            type="submit"
            disabled={loading}
            label={
              loading
                ? "Submitting..."
                : isInventory && hasSelectedVan
                ? "Check Availability"
                : "Send Message"
            }
          />
        </div>
      </form>
    </div>
  );
}