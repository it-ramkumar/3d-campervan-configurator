"use client";
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Heading2, RichParagraph, ImageWithSkeleton, SecondaryButton, PrimaryButton } from '../../Common/Common';
import { ArrowBigRightDash, ArrowBigLeftDash } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import Link from "next/link";

export default function All_Layout({ layout, LayoutText, text }) {
  const { title, link, images: rawImages } = layout || {};
  const { text: introText, description } = LayoutText || {};

  // Instance state for manual control
  const [swiper, setSwiper] = useState(null);

  // Convert simple string array to object array for mapping
  const images = (rawImages || []).map((imgSrc) => ({
    src: imgSrc.img,
    label: imgSrc.link,
  }));

  if (images.length === 0) return null;

  return (
    <section className="bbv-section-dark py-20 px-6 lg:px-12 overflow-hidden relative">
      <div className="bbv-dot-grid" />
      <div className="max-w-7xl mx-auto relative z-10">

        {/* --- Header Section --- */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {text && (
            <div className="mb-4">
              <p className="text-hover text-xs uppercase tracking-widest font-bold mb-3">
                {introText}
              </p>
              <RichParagraph className="mt-4 italic leading-relaxed text-secondary/60">
                {description}
              </RichParagraph>
            </div>
          )}
          <Heading2 text={title} className="!text-center mt-2 font-display text-secondary uppercase tracking-wide" />
          <div className="bbv-divider mb-6" />
        </div>

        {/* --- Navigation Bar --- */}
        <div className="flex items-center justify-between mb-6 border-b border-secondary/10 pb-4">
          <div className="text-hover text-xs uppercase tracking-widest font-bold">
            Gallery View
          </div>
          <div className="flex gap-2">
            <PrimaryButton
              aria-label="Previous slide"
              onClick={() => swiper?.slidePrev()}
              label={<ArrowBigLeftDash size={20} />}
            />
            <PrimaryButton
              aria-label="Next slide"
              onClick={() => swiper?.slideNext()}
              label={<ArrowBigRightDash size={20} />}
            />
          </div>
        </div>

        {/* --- Swiper --- */}
        <div className="relative">
          <Swiper
            onSwiper={setSwiper}
            spaceBetween={16}
            slidesPerView={1.2}
            centeredSlides={true}
            loop={images.length > 1}
            grabCursor={true}
            breakpoints={{
              640: { slidesPerView: 2, centeredSlides: false },
              1024: { slidesPerView: 3, centeredSlides: false },
              1280: { slidesPerView: 4, centeredSlides: false },
            }}
            className="!overflow-visible"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index} className="h-auto">
                <div className="bbv-glass group relative aspect-[3/4] rounded-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-hover/40">
                  <ImageWithSkeleton
                    src={img.src}
                    alt={img.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                  />
                  {/* Amber bottom line accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 to-transparent p-6">
                    <Link href={img.label} className="font-bold text-secondary text-sm text-center uppercase tracking-wide">
                      {img.label.replace('/van-layouts/', '')}
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* --- Action Section --- */}
        <div className="mt-16 flex justify-center">
          <SecondaryButton
            label="Explore This Layout"
            link={link}
          />
        </div>
      </div>
    </section>
  );
}
