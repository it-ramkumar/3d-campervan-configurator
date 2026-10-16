"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { Heading1, RichParagraph, SpanTag, PrimaryButton } from "../Common";
import { getItemTitle } from "@/components/Options/optionBlocks";
import { scrollToConsultation } from "@/utils/scrollToConsultation";

const GROUPS = [
  { key: "exterior", label: "Exterior", path: "/van-options/exterior-options" },
  { key: "interior", label: "Interior", path: "/van-options/interior-options" },
  { key: "system", label: "Systems", path: "/van-options/system-options" },
];

const ProductCard = ({ option }) => (
  <Link
    href={option.href}
    className="group h-full rounded-xl overflow-hidden bg-white flex flex-col border border-primary/10 transition-shadow duration-300 hover:shadow-xl"
  >
    <div className="relative aspect-square w-full overflow-hidden bg-primary/5">
      {option.image && (
        <Image
          src={option.image}
          alt={option.title}
          fill
          sizes="(max-width: 640px) 60vw, (max-width: 1024px) 30vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <span className="absolute top-2 left-2 px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest bg-primary text-secondary">
        {option.group}
      </span>
    </div>
    <div className="p-4 flex flex-col gap-2 flex-1 border-t border-hover/15">
      <RichParagraph variant="sub" textColor="text-primary" className="font-bold !opacity-100 leading-snug">
        {option.title}
      </RichParagraph>
      <span className="mt-auto inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest !text-hover">
        View details
        <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </div>
  </Link>
);

// Products fitted to a van / layout (`used_options`, populated by the API), as a swipeable row
// linking to each product's page
export default function BuildOptions({ usedOptions, buildTitle }) {
  const [tab, setTab] = useState("all");

  // Flatten to cards; deleted options come back as null from populate
  const products = GROUPS.flatMap(({ key, label, path }) =>
    (usedOptions?.[key] || [])
      .filter((o) => o && typeof o === "object" && o.slug)
      .map((o) => ({
        id: o._id,
        groupKey: key,
        group: label,
        title: getItemTitle(o),
        image: o.images?.[0],
        href: `${path}/${o.slug}`,
      }))
  );

  if (!products.length) return null;

  const tabs = [
    { key: "all", label: "All", count: products.length },
    ...GROUPS.map(({ key, label }) => ({ key, label, count: products.filter((p) => p.groupKey === key).length })),
  ].filter((t) => t.count > 0);
  const visible = tab === "all" ? products : products.filter((p) => p.groupKey === tab);

  return (
    <section className="py-16 px-4 bg-secondary text-primary overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <SpanTag text="Built With Our Own Products" className="justify-center mb-5" />
          <Heading1 variant="section" text="Key Upgrades in This Build" textColor="text-primary" className="mt-4" />
          <RichParagraph className="text-primary/70 mt-4">
            Here are {products.length} of the main products included in {buildTitle || "this van"}, the same
            tried-and-tested upgrades we install across our other Big Bear Vans builds. Tap any product to see how it
            works. For the complete build details, book a free consultation call with our team.
          </RichParagraph>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.length > 2 &&
              tabs.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-colors ${
                    tab === t.key
                      ? "bg-primary text-secondary border-primary"
                      : "bg-white text-primary/70 border-primary/15 hover:border-hover hover:text-primary"
                  }`}
                >
                  {t.label} ({t.count})
                </button>
              ))}
          </div>

          {/* Slider arrows */}
          <div className="flex gap-2 ml-auto">
            <button
              type="button"
              aria-label="Previous products"
              className="build-options-prev w-10 h-10 rounded-full border border-primary/15 bg-white flex items-center justify-center text-primary hover:border-hover hover:text-hover transition-colors disabled:opacity-30 [&.swiper-button-disabled]:opacity-30 [&.swiper-button-disabled]:pointer-events-none"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next products"
              className="build-options-next w-10 h-10 rounded-full border border-primary/15 bg-white flex items-center justify-center text-primary hover:border-hover hover:text-hover transition-colors disabled:opacity-30 [&.swiper-button-disabled]:opacity-30 [&.swiper-button-disabled]:pointer-events-none"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <Swiper
          // Remount on tab change so the row starts from the first product
          key={tab}
          modules={[Navigation]}
          navigation={{ prevEl: ".build-options-prev", nextEl: ".build-options-next" }}
          spaceBetween={16}
          slidesPerView={1.6}
          breakpoints={{
            640: { slidesPerView: 2.6, spaceBetween: 20 },
            1024: { slidesPerView: 3.6, spaceBetween: 24 },
            1280: { slidesPerView: 5, spaceBetween: 24 },
          }}
          className="!overflow-visible"
        >
          {visible.map((option) => (
            <SwiperSlide key={option.id} className="!h-auto">
              <ProductCard option={option} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex flex-col items-center gap-5 mt-10">
          <PrimaryButton label="Book a Free Consultation Call" link="/contact" onClick={scrollToConsultation} />
          <Link
            href="/van-options/exterior-options"
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest !text-hover hover:underline"
          >
            Explore all our van upgrades
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  );
}
