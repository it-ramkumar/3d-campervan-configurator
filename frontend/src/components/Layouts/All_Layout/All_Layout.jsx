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
    label: imgSrc.link,// Aap isko dynamic bhi kar sakte hain
  }));

  if (images.length === 0) return null;
// 1. Function ko define karein (Sahi logic ke sath)


// Component mein aise use karein:
  return (
    <section className="bg-secondary text-primary py-20 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* --- Header Section --- */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {text && (
            <div className="mb-4">
              <RichParagraph className="uppercase">
                {introText}
              </RichParagraph>
              <RichParagraph className="mt-4  italic leading-relaxed">
                {description}
              </RichParagraph>
            </div>
          )}
          <Heading2 text={title} className="!text-center mt-2" />
        </div>

        {/* --- Navigation Bar --- */}
        <div className="flex items-center justify-between mb-6 border-b border-primary/10 pb-4">
          <div className="text-[10px] font-bold tracking-widest !text-hover uppercase">
            Gallery View
          </div>
          <div className="flex gap-2">
            <PrimaryButton
              aria-label="Previous slide"
              onClick={() => swiper?.slidePrev()}
              label={<ArrowBigLeftDash size={20} />}
            >

            </PrimaryButton>
            <PrimaryButton
              aria-label="Next slide"
              onClick={() => swiper?.slideNext()}
              label={<ArrowBigRightDash size={20} />
              }
            >

            </PrimaryButton>
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
                <div className="relative aspect-[3/4] bg-secondary rounded-lg overflow-hidden shadow-sm border border-[#001F3D]/5 group transition-all duration-500 hover:shadow-xl">
                  <ImageWithSkeleton
                    src={img.src}
                    alt={img.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/80 to-transparent p-6">
                    <Link href={img.label} className=" font-bold text-secondary !text-sm text-center uppercase">
                      {img.label.replace('/layout-detail/', '')}
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