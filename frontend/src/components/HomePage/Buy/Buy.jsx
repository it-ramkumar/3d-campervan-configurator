"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import {
  Heading2,
  Heading3,
  RichParagraph,
  PrimaryButton,
  SecondaryButton,
  CustomLink,
} from "../../Common/Common";
import { ArrowBigRightDash, ArrowBigLeftDash } from "lucide-react";
import "swiper/css";
import Image from "next/image";

export default function Buy({ initialVans = [] }) {
  const [swiper, setSwiper] = useState(null);

  return (
    <section className="bg-secondary py-20 antialiased overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* --- Header Section --- */}
        <div className="text-center mb-4">
          <RichParagraph className="!text-hover font-bold !text-sm tracking-wider uppercase mb-3">
            Premium Builds
          </RichParagraph>
          <Heading2 text="Premium Camper Vans Ready for Adventure" />
          <RichParagraph className="mt-4 max-w-3xl mx-auto">
            Fully built premium camper vans available now — skip the wait and
            start your adventure today.
          </RichParagraph>
        </div>

        {/* --- Slider Section --- */}
        <div className="relative ml-12 md:ml-18">
          <div className="flex items-center justify-between mb-5 border-b border-primary/10 pb-4">
            <CustomLink
              href="/camper-vans-for-sale"
              text={
                <span className="flex items-center gap-2">
                  Browse Full Inventory{" "}
                  <span className="text-lg leading-none">→</span>
                </span>
              }
            />
            <div className="flex gap-2">
              <SecondaryButton
                label={<ArrowBigLeftDash />}
                onClick={() => swiper?.slidePrev()}
                aria-label="Previous slide"
                className=" !px-3 !py-2"
              />
              <PrimaryButton
                label={<ArrowBigRightDash />}
                onClick={() => swiper?.slideNext()}
                aria-label="Next slide"
                className=" !px-3 !py-2"
              />
            </div>
          </div>

          <Swiper
            onSwiper={setSwiper}
            spaceBetween={16}
            slidesPerView={1.1}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2 },
              1280: { slidesPerView: 3.2 },
            }}
            className="!overflow-visible"
          >
            {initialVans
              .filter(
                (van) =>
                  van?.title !== "Santa Monica White" &&
                  van?.title !== "Ford Transit T-350 2026..",
              )
              .map((van, i) => (
                <SwiperSlide key={i} className="h-auto">
                  <div className="bg-white rounded-lg overflow-hidden border border-primary/5 shadow-sm group h-full flex flex-col transition-all duration-500 hover:shadow-xl">
                    {/* Image Container */}
                    <div className="relative h-48 md:h-56 overflow-hidden bg-primary/5">
                      {/* --- Available for Sale Tag --- */}
                      <div className="absolute top-4 left-4 z-10 bg-primary/90 border border-white/10 backdrop-blur-sm text-hover text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded shadow-md pointer-events-none transition-transform duration-300 group-hover:scale-105">
                        Available for Sale
                      </div>

                      {van?.image ? (
                        <Image
                          src={van.image}
                          alt={van?.title || "Van"}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          width={800}
                          height={600}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-primary/20 italic text-xs">
                          Coming Soon
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      <Heading3
                        text={van?.title || "New Build"}
                        className="truncate block"
                      />
                      <RichParagraph className="mt-2 mb-6 line-clamp-2 h-12">
                        {van?.subtitle ||
                          "High-end craftsmanship meeting rugged durability."}
                      </RichParagraph>

                      <div className="mt-auto flex gap-3">
                        <Link
                          href={`/van-detail/${van?.slug}`}
                          className="flex-1 py-3 bg-secondary text-primary rounded-lg text-center text-[11px] font-bold uppercase tracking-widest hover:bg-primary hover:text-secondary transition-all duration-300 border border-primary/10"
                        >
                          Details
                        </Link>
                        <Link
                          href="/contact"
                          className="flex-1 py-3 bg-primary text-secondary rounded-lg text-center text-[11px] font-bold uppercase tracking-widest hover:bg-hover transition-all duration-300 shadow-lg shadow-primary/10"
                        >
                          Get This Build
                        </Link>
                      </div>
                      {van?.slug && (
                        <PrimaryButton
                          label="Explore in 3D"
                          link={`/camper-vans-for-sale/${van.slug}/configure`}
                          className="w-full mt-4"
                        />
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
