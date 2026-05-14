"use client";
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from "next/link";
import { Heading2, Heading3, RichParagraph, PrimaryButton, SecondaryButton, CustomLink } from '../../Common/Common';
import { ArrowBigRightDash, ArrowBigLeftDash } from 'lucide-react';
import 'swiper/css';
import Image from 'next/image';

// initialVans prop receive karein
export default function Buy({ initialVans = [] }) {
  const [swiper, setSwiper] = useState(null);

  // loading aur useEffect ki ab zaroorat nahi kyunki data server se aa raha hai
  return (
    <section className="bg-secondary py-20 antialiased overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* --- Header Section --- */}
        <div className="text-center mb-4">
          <RichParagraph className="!text-hover font-bold !text-sm tracking-wider uppercase mb-3">
            Premium Builds
          </RichParagraph>
          <Heading2 text="Build or Buy Your Dream Van" />
        </div>

        {/* --- Info Cards --- */}
        {/* ... (Same as before) */}

        {/* --- Slider Section --- */}
        <div className="relative">
          <div className="flex items-center justify-between mb-5 border-b border-primary/10 pb-4">
            <CustomLink
              href="/camper-vans-for-sale"
              text={
                <span className="flex items-center gap-2">
                  Browse Full Inventory <span className="text-lg leading-none">→</span>
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
              640:  { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2 },
              1280: { slidesPerView: 3.2 },
            }}
            className="!overflow-visible"
          >
            {/* initialVans map karein */}
            {initialVans.map((van, i) => (
              <SwiperSlide key={i} className="h-auto">
                <div className="bg-white rounded-lg overflow-hidden border border-primary/5 shadow-sm group h-full flex flex-col transition-all duration-500 hover:shadow-xl">

                  {/* Image */}
                  <div className="relative h-48 md:h-56 overflow-hidden bg-primary/5">
                    {van?.gallery?.[0] ? (
                      <Image
                        src={van.gallery[0]}
                        alt={van?.van_listing?.title || "Van"}
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
                      text={van?.van_listing?.title || "New Build"}
                      className="truncate block"
                    />
                    <RichParagraph className="mt-2 mb-6 line-clamp-2 h-12">
                      {van?.van_listing?.description || "High-end craftsmanship meeting rugged durability."}
                    </RichParagraph>

                    <div className="mt-auto flex gap-3">
                      <Link
                        href={`/van-detail/${van?.slug}`}
                        className="flex-1 py-3 bg-secondary text-primary rounded-lg text-center text-[11px] font-bold uppercase tracking-widest hover:bg-primary hover:text-secondary transition-all duration-300 border border-primary/10"
                      >
                        Details
                      </Link>
                      <Link
                        href="/inquiry"
                        className="flex-1 py-3 bg-primary text-secondary rounded-lg text-center text-[11px] font-bold uppercase tracking-widest hover:bg-hover transition-all duration-300 shadow-lg shadow-primary/10"
                      >
                        Inquire
                      </Link>
                    </div>
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