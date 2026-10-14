"use client";

import { useRef } from "react";
import { getImageProps } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Heading1, PrimaryButton, RichParagraph, SecondaryButton } from "../../Common/Common";

import { slides } from "@/DataUseInComp/homeSlider";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const FALLBACK_IMAGE = "/images/blackLogo.webp";

function HeroPicture({ slide, isFirst }) {
  const common = {
    alt: slide.title || "Hero Banner Image",
    fill: true,
    sizes: "100vw",
    quality: 70
  };

  const { props: { srcSet: desktopSrcSet } } = getImageProps({
    ...common,
    src: slide.image || FALLBACK_IMAGE,
  });

  const { props: { srcSet: mobileSrcSet, style, ...imgProps } } = getImageProps({
    ...common,
    src: slide.mobileImage || slide.image || FALLBACK_IMAGE,
    loading: isFirst ? "eager" : "lazy",
    fetchPriority: isFirst ? "high" : undefined,
  });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
      <img
        {...imgProps}
        alt={slide.title || "Hero Image"}
        srcSet={mobileSrcSet}
        className="object-cover [object-position:var(--hero-pos)] md:[object-position:center]"
        style={{ ...style, "--hero-pos": slide.objectPosition || "center center" }}
      />
    </picture>
  );
}

export default function Hero() {
  const swiperRef = useRef(null);

  const scrollToQuiz = (e) => {
    e.preventDefault();
    document.getElementById("quiz-section")?.scrollIntoView({ behavior: "smooth" });
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
        {slides.map((slide, index) => {
          const isFirst = index === 0;
          return (
            <SwiperSlide key={slide.id || index} className="relative">
              <div className="relative w-full h-full overflow-hidden">
                <HeroPicture slide={slide} isFirst={isFirst} />

                {/* Overlays */}
                <div className="absolute inset-0 z-10 bg-gradient-to-tr from-black/80 via-black/35 to-transparent" />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Content Box */}
                <div className="relative z-20 h-full flex items-end md:items-center">
                  <div className="w-full px-5 pb-24 md:pb-0 text-white flex flex-col justify-end md:justify-center h-auto md:h-full md:pl-16 md:pr-12 lg:pl-24 lg:pr-20">

                    <RichParagraph variant="sub" textColor="!text-hover" className="uppercase font-bold">
                      {slide.slogan || "You Dream It. We Build It."}
                    </RichParagraph>

                    {/* SEO FIX: First slide is h1, others are h2 */}
                    <Heading1
                      as={isFirst ? "h1" : "h2"}
                      variant="hero"
                    >
                      {slide.title} <span className="text-hover">{slide.subtitle}</span>
                    </Heading1>

                    {/* Divider Line */}
                    <div className="w-12 h-[3px] bg-hover rounded-full my-3 md:my-4 animate-[fadeUp_0.8s_ease_forwards] [animation-delay:200ms]" />

                    {/* Description */}
                    <RichParagraph variant="hero" textColor="text-secondary/90" className="max-w-2xl animate-[fadeUp_0.8s_ease_forwards] [animation-delay:300ms]">
                      {slide.desc}
                    </RichParagraph>

                    {/* Buttons Container */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full pr-16 sm:pr-0 sm:w-auto mt-5 md:mt-8 animate-[fadeUp_0.8s_ease_forwards] [animation-delay:300ms]">
                      <PrimaryButton
                        label={slide.btnText}
                        link={slide.link}
                        className="bg-secondary !text-primary"
                      />
                      <SecondaryButton
                        label={
                          <>
                            <Sparkles size={14} className="animate-pulse mr-2 inline" />
                            Van Matchmaker Quiz
                          </>
                        }
                        onClick={scrollToQuiz}
                        className="!bg-hover !text-secondary !border-hover hover:!bg-white hover:!text-black"
                      />
                    </div>

                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Orange bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#ED985F] z-30" />

      {/* NAVIGATION Controls */}
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
    </div>
  );
}