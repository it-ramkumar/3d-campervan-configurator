"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Heading1, HeroParagraph, PrimaryButton, RichParagraph, SecondaryButton, SpanTag } from "../../Common/Common";

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
    <div className="relative w-full h-[88vh] sm:h-[92vh] md:h-screen overflow-hidden bg-black">
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

              />

              {/* Overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-tr from-black/80 via-black/35 to-transparent" />
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Content Box: Mobile pe content bottom me push karne k liye items-end aur padding-bottom lagai hai */}
              <div className="relative z-20 h-full flex items-end md:items-center">
                <div className="w-full px-5 pb-24 md:pb-0 text-white flex flex-col justify-end md:justify-center h-auto md:h-full md:pl-16 md:pr-12 lg:pl-24 lg:pr-20">

                  {/* Slogan */}
                  <div className="ml-2">
                    <SpanTag text={slide.slogan || "You Dream It. We Build It."} />
                  </div>

                  {/* Title (stacked lines) */}
                  <Heading1 textColor="text-white">
                    <span className="text-white block">{slide.title}</span>
                    <span className="text-hover block">{slide.titleColored}</span>
                  </Heading1>

                  {/* Divider Line */}
                  <div className="w-12 h-[3px] bg-hover rounded-full my-3 md:my-4 animate-fade-up delay-200" />

                  {/* Description */}
                  <HeroParagraph text={slide.desc} />

                  {/* Buttons Container: pr-20 taake navigation buttons k sath wrap/overlap na ho */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full pr-16 sm:pr-0 sm:w-auto mt-5 md:mt-8 animate-fade-up delay-300">
                    <PrimaryButton
                      label={slide.btnText}
                      link={slide.link}
                      className="w-full sm:w-auto bg-secondary !text-primary"
                    />
                    <SecondaryButton
                      label={<><Sparkles size={14} className="animate-pulse mr-2" />Van Matchmaker Quiz</>}
                      onClick={scrollToQuiz}
                      className="w-full sm:w-auto !bg-hover !text-secondary !border-hover hover:!bg-white hover:!text-black"
                    />
                  </div>

                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Orange bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#ED985F] z-30" />

      {/* NAVIGATION: Mobile button alignment safe zone */}
      <div className="absolute bottom-8 md:bottom-28 right-4 md:right-4 z-30 flex items-center gap-3 md:gap-4">
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