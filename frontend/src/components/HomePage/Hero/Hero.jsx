"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { slides } from "@/DataUseInComp/homeSlider";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function Hero() {
  const [swiper, setSwiper] = useState(null);

  return (
    <div className="relative w-full h-[75vh] sm:h-[80vh] md:h-[95vh] overflow-hidden bg-black">
      <Swiper
        onSwiper={setSwiper}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        loop
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            <div className="relative w-full h-full overflow-hidden">
              {/* Background Images */}
              {/* Mobile Image */}
              <Image
                src={
                  slide.mobileImage || slide.image || "/images/blackLogo.webp"
                }
                alt={slide.title}
                fill
                priority={index === 0}
                quality={70}
                sizes="(max-width: 768px) 100vw, (max-width: 1536px) 100vw, 1536px"
                className="block md:hidden object-cover"
                style={{
                  objectPosition: slide.objectPosition || "center center",
                }}
              />
              {/* Desktop Image */}
              <Image
                src={slide.image || "/images/blackLogo.webp"}
                alt={slide.title}
                fill
                priority={index === 0}
                quality={70}
                sizes="(max-width: 768px) 100vw, (max-width: 1536px) 100vw, 1536px"
                className="hidden md:block object-cover"
                style={{
                  objectPosition: slide.objectPosition || "center center",
                }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-tr from-black/75 via-black/40 to-transparent" />

              {/* Content Container */}
              <div className="relative z-20 h-full flex items-center">
                {/* <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-4xl text-white flex flex-col items-start justify-center"> */}
                {/* <div className="w-full px-6 md:pl-16 md:pr-12 lg:pl-24 lg:pr-20 text-white flex flex-col items-start justify-center max-w-none"> */}
                {/* <div className="w-full px-6 md:pl-16 md:pr-12 lg:pl-24 lg:pr-20 text-white flex flex-col justify-center h-full"> */}
                <div className="w-full px-6 pt-12 md:pt-0 md:pl-16 md:pr-12 lg:pl-24 lg:pr-20 text-white flex flex-col md:justify-center h-full">
                  {/* Slogan */}
                  <p className="text-hover text-xs md:text-base font-semibold tracking-wide mb-2 animate-fade-up">
                    {slide.slogan || "You Dream It. We Build It."}
                  </p>

                  {/* Title (stacked lines) */}
                  <h1 className="text-[clamp(24px,7vw,40px)] sm:text-4xl md:text-6xl lg:text-7xl font-black italic uppercase leading-[0.95] tracking-tighter mb-3 animate-fade-up delay-100">
                    {slide.title === "Custom Van Builds" ? (
                      <>
                        <span className="text-white block">CUSTOM VAN</span>
                        {/* <span className="text-white block">VAN</span> */}
                        <span className="text-hover block">BUILDS.</span>
                      </>
                    ) : slide.title === "Campervans For Sale" ? (
                      <>
                        <span className="text-white block">CAMPERVANS</span>
                        <span className="text-hover block">FOR SALE.</span>
                      </>
                    ) : slide.title === "Previous Layouts" ? (
                      <>
                        <span className="text-white block">PREVIOUS</span>
                        <span className="text-hover block">LAYOUTS.</span>
                      </>
                    ) : (
                      slide.title
                    )}
                  </h1>

                  {/* Divider Line */}
                  <div className="w-8 sm:w-12 h-[2px] sm:h-[3px] bg-hover rounded-full mb-4 animate-fade-up delay-200" />

                  {/* Description */}
                  <p className="text-[11px] sm:text-sm md:text-base text-white/95 max-w-xs sm:max-w-md mb-5 leading-relaxed animate-fade-up delay-200">
                    {slide.desc}
                  </p>

                  {/* Buttons */}
                  {/* <div className="flex flex-row gap-2.5 w-full sm:w-auto animate-fade-up delay-300"> */}
                  {/* <div className="flex flex-row gap-2.5 w-full sm:w-auto mt-6 animate-fade-up delay-300"> */}
                  <div className="flex flex-row gap-2.5 w-full sm:w-auto mt-auto md:mt-6 mb-20 md:mb-0 animate-fade-up delay-300">
                    {/* Primary Button */}
                    <Link
                      href={slide.link || "/inquiry"}
                      className="bg-hover hover:bg-hover/90 text-primary text-[10px] sm:text-xs font-black uppercase tracking-wider px-4 py-2.5 sm:px-6 sm:py-3 rounded hover:scale-[1.02] transition-all duration-300 text-center flex-1 sm:flex-initial"
                    >
                      {slide.btnText || "Build Your Own"}
                    </Link>

                    {/* Secondary Button */}
                    <Link
                      href="/van-layouts"
                      className="bg-black/20 border border-white/60 hover:border-white/80 hover:bg-white/5 text-white text-[10px] sm:text-xs font-black uppercase tracking-wider px-4 py-2.5 sm:px-6 sm:py-3 rounded hover:scale-[1.02] transition-all duration-300 text-center flex-1 sm:flex-initial"
                    >
                      Explore Layouts &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* NAVIGATION */}
      {/* <div className="absolute bottom-18 right-6 md:left-12 z-30 flex items-center gap-65 md:gap-4"> */}
      <div className="absolute bottom-6 md:bottom-10 right-4 md:left-12 z-30 flex items-center gap-3 md:gap-4">
        <button
          onClick={() => swiper?.slidePrev()}
          aria-label="Previous Slide"
          // className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white backdrop-blur-md hover:bg-hover hover:text-black transition-all"
          className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full border border-white/10 text-white backdrop-blur-md hover:bg-hover hover:text-black transition-all"
        >
          <ChevronLeft size={20} className="md:w-7 md:h-7" />
        </button>

        <button
          onClick={() => swiper?.slideNext()}
          aria-label="Next Slide"
          className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white backdrop-blur-md hover:bg-hover hover:text-black transition-all"
        >
          <ChevronLeft size={20} className="md:w-7 md:h-7" />
        </button>
      </div>

      {/* SIMPLE CSS ANIMATION */}
      <style>{`
  .animate-fade-up {
    animation: fadeUp 0.8s ease forwards;
  }

  .delay-100 {
    animation-delay: 0.1s;
  }

  .delay-200 {
    animation-delay: 0.2s;
  }

  .delay-300 {
    animation-delay: 0.3s;
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`}</style>
    </div>
  );
}
