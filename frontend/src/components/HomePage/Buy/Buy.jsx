"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowBigRightDash, ArrowBigLeftDash, Rotate3d, X } from "lucide-react";
import "swiper/css";

import {
  Heading1,
  RichParagraph,
  PrimaryButton,
  CustomLink,
} from "../../Common/Common";
import ContactForm from "@/components/Consultation/ContactForm";

export default function Buy({ initialVans = [] }) {
  const [swiper, setSwiper] = useState(null);
  const [selectedVan, setSelectedVan] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = (van) => {
    setSelectedVan(van);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedVan(null);
  };

  return (
    <section className="bg-white py-12 md:py-20 antialiased overflow-hidden relative rounded-lg">
      {/* Ghost Background Text */}
      <div className="absolute right-4 -top-24 inset-y-0 hidden lg:flex items-center pointer-events-none select-none overflow-hidden">
        <span className="text-[220px] font-black text-primary/[0.03] leading-none pr-4">
          VANS
        </span>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* ── HEADER ── */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <RichParagraph
              variant="sub"
              textColor="text-hover"
              className="uppercase font-bold"
            >
              Premium Builds
            </RichParagraph>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <Heading1
              as="h2"
              variant="section"
              textColor="text-primary"
              className="max-w-xl"
            >
              Premium Camper Vans Ready for Adventure
            </Heading1>

            <RichParagraph
              variant="body"
              className="max-w-md text-left md:text-right md:self-end"
            >
              Fully built premium camper vans available now — skip the wait and
              start your adventure today.
            </RichParagraph>
          </div>
        </div>

        {/* ── CONTROLS BAR ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-primary/10 pb-5">
          <CustomLink
            href="/camper-vans-for-sale"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-hover transition-colors duration-200"
            text={
              <span className="flex items-center gap-2">
                Browse all available camper vans for sale
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            }
          />

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => swiper?.slidePrev()}
              aria-label="Previous slide"
              className="w-10 h-10 rounded-full border border-primary/15 bg-primary/5 hover:bg-hover hover:border-hover hover:text-white text-primary flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer shadow-sm"
            >
              <ArrowBigLeftDash size={18} />
            </button>

            <button
              onClick={() => swiper?.slideNext()}
              aria-label="Next slide"
              className="w-10 h-10 rounded-full bg-primary hover:bg-hover text-white flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer shadow-sm"
            >
              <ArrowBigRightDash size={18} />
            </button>
          </div>
        </div>

        {/* ── SWIPER SLIDER ── */}
        {initialVans.length > 0 ? (
          <Swiper
            onSwiper={setSwiper}
            spaceBetween={16}
            slidesPerView={1.1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 3 },
            }}
            className="!overflow-visible"
          >
            {initialVans.map((van, i) => {
              const vanSlug = van?.slug || "#";
              const vanTitle = van?.title || "New Build";

              return (
                <SwiperSlide key={van?.id || vanSlug || i} className="!h-auto flex">
                  <div className="bg-white border border-primary/10 shadow-sm rounded-lg overflow-hidden group h-full flex flex-col w-full transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                    {/* Clickable Card Link Area */}
                    <Link
                      href={`/camper-vans-for-sale/${vanSlug}`}
                      className="flex flex-col flex-grow"
                    >
                      {/* Image Container (Strict 1:1 Aspect Ratio) */}
                      <div className="relative aspect-square w-full overflow-hidden bg-primary/5">
                        <RichParagraph
                          variant="sub"
                          textColor="text-secondary"
                          className="absolute top-4 left-4 z-10 bg-hover font-bold uppercase px-3 py-1 rounded-lg pointer-events-none shadow-md text-xs"
                        >
                          Available for Sale
                        </RichParagraph>

                        {van?.image ? (
                          <Image
                            src={van.image}
                            alt={vanTitle}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-primary/20 italic text-xs">
                            Coming Soon
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                        <div className="bbv-amber-line" />
                      </div>

                      {/* Content Area */}
                      <div className="p-5 flex flex-col flex-grow">
                        {/* Heading Level 3 (Correct H2 -> H3 Sequence) */}
                        <Heading1
                          text={vanTitle}
                          as="h3"
                          variant="card"
                          className="mb-1 !text-primary line-clamp-1"
                        />

                        {/* Card Description */}
                        <RichParagraph variant="card" className="mb-3 line-clamp-2">
                          {van?.subtitle ||
                            "High-end craftsmanship meeting rugged durability."}
                        </RichParagraph>

                        {/* Price (Locked at bottom) */}
                        <div className="mt-auto pt-2">
                          {van?.price ? (
                            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                              <RichParagraph
                                variant="card"
                                textColor="text-hover"
                                className="!font-black !text-xl"
                              >
                                {typeof van.price === "number"
                                  ? `$${van.price.toLocaleString()}`
                                  : van.price}
                              </RichParagraph>
                            </div>
                          ) : (
                            <RichParagraph
                              variant="card"
                              textColor="text-primary/40"
                              className="italic !normal-case !tracking-normal"
                            >
                              Pricing upon request
                            </RichParagraph>
                          )}
                        </div>
                      </div>
                    </Link>

                    {/* Action Area */}
                    <div className="p-2 pt-0 mt-auto">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="flex-1">
                          <PrimaryButton
                            label="I'm Interested"
                            onClick={() => handleOpenForm(van)}
                            className="w-full"
                          />
                        </div>

                        {van?.glb ? (
                          <div className="relative flex-1">
                            <span className="absolute -top-2 left-2 z-20 bg-primary text-secondary text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full shadow-md animate-bounce pointer-events-none">
                              3D
                            </span>
                            <Link
                              href={`/camper-vans-for-sale/${vanSlug}/configure`}
                              className="group/3d relative w-full h-full inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-hover to-hover/70 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-primary shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-95"
                            >
                              <span className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover/3d:translate-x-full" />
                              <Rotate3d size={16} className="relative z-10 shrink-0" />
                              <span className="relative z-10 whitespace-nowrap">
                                Explore in 3D
                              </span>
                            </Link>
                          </div>
                        ) : (
                          <div className="flex-1">
                            <PrimaryButton
                              label="View Details"
                              link={`/camper-vans-for-sale/${vanSlug}`}
                              className="w-full"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <div className="py-12 text-center text-primary/50 text-sm italic">
            No camper vans currently available for sale. Check back soon!
          </div>
        )}
      </div>

      {/* ── CONSULTATION MODAL ── */}
      {isFormOpen && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#020C18]/90 backdrop-blur-md pointer-events-auto p-4"
          onClick={handleCloseForm}
        >
          <div
            className="relative w-full max-w-2xl rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto pointer-events-auto"
            style={{
              background: "rgba(2,12,24,0.95)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseForm}
              aria-label="Close form"
              className="absolute top-5 right-5 z-30 text-primary cursor-pointer transition-all duration-200 hover:text-hover hover:scale-110 active:scale-95"
            >
              <X size={20} />
            </button>
            <ContactForm
              leadSource="inventory"
              initialVans={selectedVan ? [selectedVan] : []}
            />
          </div>
        </div>
      )}
    </section>
  );
}