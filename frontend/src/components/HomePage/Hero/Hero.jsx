"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import HeroImage from "@/components/Common/HeroSectionNew/HeroSectionNew";
import { slides } from "@/DataUseInComp/homeSlider";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function Hero() {
  const [swiper, setSwiper] = useState(null);

  return (
    <div className="relative w-full h-[60vh] sm:h-[75vh] md:h-[95vh] overflow-hidden bg-black">

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

          <HeroImage
  image={slide.image}
  alt={slide.title}
  title={slide.title}
  description={slide.desc}
  buttonText={slide.btnText}
  buttonLink={slide.link}
  showButton={true}
/>

          </SwiperSlide>
        ))}
      </Swiper>

      {/* NAVIGATION */}
      <div className="absolute bottom-12 right-6 md:right-12 z-30 flex items-center gap-4">

        <button
          onClick={() => swiper?.slidePrev()}
          aria-label="Previous Slide"
          className="w-14 h-14 flex items-center justify-center rounded-full border border-white/10 text-white backdrop-blur-md hover:bg-hover hover:text-black transition-all"
        >
          <ChevronLeft size={28} />
        </button>

        <button
          onClick={() => swiper?.slideNext()}
          aria-label="Next Slide"
          className="w-14 h-14 flex items-center justify-center rounded-full border border-white/10 text-white backdrop-blur-md hover:bg-hover hover:text-black transition-all"
        >
          <ChevronRight size={28} />
        </button>

      </div>

      {/* SIMPLE CSS ANIMATION */}
      <style jsx>{`
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