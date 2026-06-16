"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Heading1, HeroParagraph, PrimaryButton, RichParagraph, SecondaryButton,WatermarkText } from "../../Common/Common";

import { slides } from "@/DataUseInComp/homeSlider";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function Hero() {
  const swiperRef = useRef(null);

  // Smooth scroll function for the Matchmaker quiz
  const scrollToQuiz = (e) => {
    e.preventDefault();
    const quizSection = document.getElementById("quiz-section");
    if (quizSection) {
      quizSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full h-[75vh] sm:h-[80vh] md:h-[95vh] overflow-hidden bg-black">
      <Swiper
        onSwiper={(s) => (swiperRef.current = s)}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        loop
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative">
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
                sizes="100vw"
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
                sizes="(min-width: 768px) 100vw"
                className="hidden md:block object-cover"
                style={{
                  objectPosition: slide.objectPosition || "center center",
                }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-tr from-black/75 via-black/40 to-transparent" />

              {/* Content Container */}
              <div className="relative z-20 h-full flex items-center">
                <div className="w-full px-6 pt-12 md:pt-0 md:pl-16 md:pr-12 lg:pl-24 lg:pr-20 text-white flex flex-col md:justify-center h-full">
                  {/* Slogan */}
                  <WatermarkText text= {slide.slogan || "You Dream It. We Build It."}/>
                  {/* Title (stacked lines) */}
                  <Heading1
                    textColor="text-white"
                  >
                    <span className="text-white block">{slide.title}</span>
                    <span className="text-hover block">{slide.titleColored}</span>
                  </Heading1>

                  {/* Divider Line */}
                  <div className="w-8 sm:w-12 h-[2px] sm:h-[3px] bg-hover rounded-full mb-4 animate-fade-up delay-200" />

                  <HeroParagraph
                    text={slide.desc}
                  />
                  <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto mt-auto md:mt-6 mb-20 md:mb-0 animate-fade-up delay-300">
<PrimaryButton label={slide.btnText || "Build Your Own"} link={slide.link || "/inquiry"} className="bg-secondary !text-primary"/>
<SecondaryButton
          label={<><Sparkles size={14} className="animate-pulse mr-2 " />Van Matchmaker Quiz</>}
          onClick={scrollToQuiz}
          className="!bg-hover text-secondary"
        />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* NAVIGATION */}
      <div className="absolute bottom-6 md:bottom-28 right-4 md:right-4 z-30 flex items-center gap-3 md:gap-4">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous Slide"
          className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-white/10 text-white backdrop-blur-md hover:bg-hover hover:text-black transition-all"
        >
          <ChevronLeft size={18} className="md:w-6 md:h-6" />
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next Slide"
          className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-white/10 text-white backdrop-blur-md hover:bg-hover hover:text-black transition-all"
        >
          <ChevronRight size={18} className="md:w-6 md:h-6" />
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