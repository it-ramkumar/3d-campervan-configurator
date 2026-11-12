"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heading1, RichParagraph } from "../Common/Common";
import { contact } from "@/api/contact/contact";
import { validateLead } from "@/lib/validateLead";
import { trackLead, saveLeadEmail, cleanPageUrl, createEventId } from "@/lib/track";
import { sendToCrm } from "@/lib/crm";
import { hasSale } from "@/utils/salePrice";
import BlackFridayTag from "@/components/BlackFriday/BlackFridayTag";

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
    sale_price: listing?.sale_price ?? rawData.sale_price,
    tagline: listing?.tagline ?? rawData.tagline,
    image:
      [rawData.image, ...(Array.isArray(rawData.gallery) ? rawData.gallery : [])].find(
        (src) => typeof src === "string" && src.trim() && !NON_IMAGE_EXT.test(src)
      ) || null,
    gallery: rawData.gallery || [],
  };
};

export default function ContactForm({ leadSource = "contact", initialVans, compact = false, autoFocus = false }) {
  const router = useRouter();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const [failedImage, setFailedImage] = useState(null);
  const [showNote, setShowNote] = useState(false);

  const van = normalizeVan(initialVans);
  const hasSelectedVan = !!van?.id && !!van?.title;
  const imageSrc = van?.image && van.image !== failedImage ? van.image : FALLBACK_VAN_IMAGE;
  const isInventory = leadSource === "inventory";
  const isPriceValid = van?.price && Number(van.price) >= 1000;
  const onSale = isPriceValid && hasSale(van);
  // Sale name comes from the van's Tagline field in the dashboard.
  const saleName = (typeof van?.tagline === "string" && van.tagline.trim()) || "Sale";

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

    // Always tag sale leads at the end, even when the customer typed a message.
    const message =
      (formData.message.trim() ||
        (van?.title ? `Interested in ${van.title}` : "No message provided")) +
      (onSale
        ? `\n\n[Lead from ${saleName}: sale price $${Number(van.sale_price).toLocaleString("en-US")}, regular $${Number(van.price).toLocaleString("en-US")}]`
        : "");

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
        ...(onSale && { salePrice: Number(van.sale_price) }),
        ...(onSale && van.tagline?.trim() && { saleTagline: van.tagline.trim() }),
        pageUrl: cleanPageUrl(),
        event_id: eventId,
        lead_source: leadSource,
      });
    } catch (error) {
      setSubmitError(error.message || "We couldn't send your message.");
      setLoading(false);
      return;
    }

    sendToCrm({
      event_id: eventId,
      lead_source: leadSource,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      van_slug: van?.slug || "",
      van_title: van?.title || "",
      van_price: isPriceValid ? Number(van.price) : "",
      sale_price: onSale ? Number(van.sale_price) : "",
      message: formData.message.trim(),
    });
    trackLead({ source: leadSource, email: formData.email, phone: formData.phone, name: formData.name, eventId });
    saveLeadEmail(formData.email);
    router.push(`/thank-you?source=${encodeURIComponent(leadSource)}`);
  };

  return (
    <div
      className={`bg-white rounded-xl border border-primary/5 shadow-sm max-w-[760px] mx-auto w-full ${
        hasSelectedVan ? "px-5 pb-6 pt-12 sm:px-8 sm:pb-8 md:px-10 md:pb-10" : "p-5 sm:p-8 md:p-12"
      }`}
    >
      {/* SELECTED VAN SUMMARY */}
      {hasSelectedVan && (
        <div className="mb-5 md:mb-6 flex items-center gap-3 sm:gap-5 rounded-xl border border-primary/10 bg-secondary/30 p-3 sm:p-4">
          <div className="relative h-20 w-24 sm:h-28 sm:w-40 shrink-0 overflow-hidden rounded-lg border border-primary/10 bg-white">
            <Image
              src={imageSrc}
              onError={() => setFailedImage(van.image)}
              alt={van.title || "Selected Van"}
              fill
              sizes="(max-width: 640px) 96px, 160px"
              className={imageSrc === FALLBACK_VAN_IMAGE ? "object-contain p-3" : "object-cover"}
              priority
            />
          </div>

          <div className="min-w-0 flex-1 text-left">
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-primary/50">
              Selected van
            </p>
            <h3 className="text-base sm:text-lg font-bold leading-snug text-[#001F3D] line-clamp-2">
              {van.title}
            </h3>
            {van.subtitle && (
              <p className="hidden sm:block mt-0.5 text-xs text-slate-500 line-clamp-1">{van.subtitle}</p>
            )}

            <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
              {isPriceValid ? (
                onSale ? (
                  <>
                    <span className="text-xs sm:text-sm font-semibold text-primary/45 line-through">
                      ${Number(van.price).toLocaleString("en-US")}
                    </span>
                    <span className="text-base sm:text-lg font-black text-hover">
                      ${Number(van.sale_price).toLocaleString("en-US")}
                    </span>
                    <BlackFridayTag label={van.tagline} />
                  </>
                ) : (
                  <span className="text-base sm:text-lg font-black text-[#001F3D]">
                    ${Number(van.price).toLocaleString("en-US")}
                  </span>
                )
              ) : (
                <span className="text-sm font-bold text-[#001F3D]">Price on request</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* HEADING SECTION */}
      {hasSelectedVan ? (
        <div className="mb-5 md:mb-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
            {isInventory ? "Check availability" : "Let’s Custom Build It"}
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-primary/60">
            {onSale
              ? `Lock in the ${saleName} price of $${Number(van.sale_price).toLocaleString("en-US")}.`
              : "Leave your details and our team will get back to you about this van."}
          </p>
        </div>
      ) : (
        <div className={`text-center ${compact ? "mb-5" : "mb-6 md:mb-10"}`}>
          {compact ? (
            <h2 className="text-2xl font-bold tracking-tight text-primary">Get prices &amp; answers</h2>
          ) : (
            <Heading1 variant="section" textColor="text-primary">
              Let’s Connect
            </Heading1>
          )}
          <RichParagraph variant="body" className="mt-2">
            Leave your number and Anna will text or call you back today.
          </RichParagraph>
        </div>
      )}

      {/* FORM SECTION: 3 short fields, one per row (easy on phones), note is optional */}
      <form
        onSubmit={handleSubmit}
        noValidate
        data-bbv-form={leadSource === "inventory" ? "van_availability" : "contact"}
        data-van-slug={van?.slug || ""}
        data-van-title={van?.title || ""}
        className="space-y-4 w-full"
      >
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

        <div className="grid grid-cols-1 gap-4">
          {/* NAME */}
          <div className="flex flex-col">
            <label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-wider text-primary/60 mb-1.5 ml-1">
              Your name
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              autoComplete="name"
              enterKeyHint="next"
              autoFocus={autoFocus}
              placeholder="First and last name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3.5 text-base text-primary rounded-lg bg-primary/10 border-2 border-transparent focus:border-hover focus:bg-white focus:outline-none transition-all placeholder:text-primary/35"
            />
            {errors.name && (
              <p id="contact-name-error" role="alert" className="mt-1 ml-1 text-xs font-semibold text-red-600">
                {errors.name}
              </p>
            )}
          </div>

          {/* PHONE */}
          <div className="flex flex-col">
            <label htmlFor="contact-phone" className="text-xs font-bold uppercase tracking-wider text-primary/60 mb-1.5 ml-1">
              Mobile phone
            </label>
            <input
              type="tel"
              id="contact-phone"
              name="phone"
              autoComplete="tel"
              inputMode="tel"
              enterKeyHint="next"
              placeholder="(555) 555-5555"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "contact-phone-error" : undefined}
              value={formData.phone}
              onChange={(e) => {
                // Allow the usual phone formatting characters; validation counts digits only
                const val = e.target.value.replace(/[^\d+()\-.\s]/g, "");
                if (val.replace(/\D/g, "").length <= 15) {
                  handleChange({ target: { name: "phone", value: val } });
                }
              }}
              required
              className="w-full px-4 py-3.5 text-base text-primary rounded-lg bg-primary/10 border-2 border-transparent focus:border-hover focus:bg-white focus:outline-none transition-all placeholder:text-primary/35"
            />
            {errors.phone && (
              <p id="contact-phone-error" role="alert" className="mt-1 ml-1 text-xs font-semibold text-red-600">
                {errors.phone}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div className="flex flex-col">
            <label htmlFor="contact-email" className="text-xs font-bold uppercase tracking-wider text-primary/60 mb-1.5 ml-1">
              Email
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              autoComplete="email"
              inputMode="email"
              autoCapitalize="none"
              spellCheck={false}
              enterKeyHint={showNote ? "next" : "send"}
              placeholder="you@email.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3.5 text-base text-primary rounded-lg bg-primary/10 border-2 border-transparent focus:border-hover focus:bg-white focus:outline-none transition-all placeholder:text-primary/35"
            />
            {errors.email && (
              <p id="contact-email-error" role="alert" className="mt-1 ml-1 text-xs font-semibold text-red-600">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* OPTIONAL NOTE */}
        {showNote ? (
          <div className="flex flex-col">
            <label htmlFor="contact-message" className="text-xs font-bold uppercase tracking-wider text-primary/60 mb-1.5 ml-1">
              Question <span className="normal-case font-normal tracking-normal">(optional)</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              autoFocus
              placeholder={hasSelectedVan ? `Anything you want to know about the ${van.title}?` : "How can we help?"}
              className="w-full px-4 py-3 text-base text-primary rounded-lg bg-primary/10 border-2 border-transparent focus:border-hover focus:bg-white focus:outline-none transition-all resize-none placeholder:text-primary/35"
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowNote(true)}
            className="ml-1 text-sm font-bold text-primary/70 underline underline-offset-4 hover:text-primary cursor-pointer"
          >
            + Add a question (optional)
          </button>
        )}

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
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg py-3.5 md:py-4 text-sm font-black uppercase tracking-[0.12em] shadow-md transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer ${
              onSale
                ? "bg-gradient-to-r from-[#E11D48] via-[#F97316] to-[#FACC15] text-white shadow-orange-500/30 hover:brightness-110"
                : "bg-primary text-secondary hover:bg-hover hover:text-primary"
            }`}
          >
            {loading
              ? "Submitting..."
              : onSale && isInventory
              ? "Claim Sale Price"
              : isInventory && hasSelectedVan
              ? "Check Availability"
              : hasSelectedVan
              ? "Get Price & Details"
              : "Send"}
          </button>
          <p className="mt-3 text-center text-xs sm:text-sm text-primary/60">
            Anna replies the same day (8am–7pm PT). Prefer to talk?{" "}
            <a href="tel:+19514419719" data-bbvt-click="form_call" className="font-bold text-primary underline underline-offset-2">
              Call (951) 441-9719
            </a>{" "}
            or{" "}
            <a href="sms:+19514419719" data-bbvt-click="form_text" className="font-bold text-primary underline underline-offset-2">
              text
            </a>
          </p>
          <p className="mt-1 text-center text-[11px] text-primary/40">We only use your details to answer you. No spam.</p>
        </div>
      </form>
    </div>
  );
}
