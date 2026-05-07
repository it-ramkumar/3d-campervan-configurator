"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { SecondaryButton, PrimaryButton, ImageWithSkeleton, Heading1, RichParagraph } from '../../Common/Common';
import Paragraph from "../../Common/Paragraph/HeroParagraph";
import { slides } from "@/DataUseInComp/homeSlider";

export default function Hero() {
  const [swiper, setSwiper] = useState(null);

  const animateSlideContent = (s, isInitial = false) => {
    if (!s || !s.slides) return;

    const activeSlide = s.slides[s.activeIndex];
    const tag = activeSlide.querySelector(".gsap-tag");
    const title = activeSlide.querySelector(".gsap-title");
    const desc = activeSlide.querySelector(".gsap-desc");
    const btns = activeSlide.querySelectorAll(".gsap-btn");
    const img = activeSlide.querySelector("img");

    gsap.killTweensOf([tag, title, desc, btns, img]);

    // LCP Fix: Agar pehli baar load ho raha hai, to hide MAT karo
    if (!isInitial) {
      gsap.set([tag, title, desc, btns], { opacity: 0, y: 30 });
      if (img) gsap.set(img, { scale: 1.1 });
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 1 }
    });

    // Pehli slide ke liye delay 0, baaki ke liye standard delay
    const startDelay = isInitial ? 0 : 0.4;

    tl.to(tag, { opacity: 1, y: 0, delay: startDelay })
      .to(title, { opacity: 1, y: 0 }, "-=0.8")
      .to(desc, { opacity: 1, y: 0 }, "-=0.8")
      .to(btns, { opacity: 1, y: 0, stagger: 0.1 }, "-=0.8");

    if (img) {
      tl.to(img, { scale: 1, duration: 10, ease: "linear" }, 0);
    }
  };

  useEffect(() => {
    if (swiper) {
      // Force immediate render for the first slide
      animateSlideContent(swiper, true);
    }
  }, [swiper]);

  return (
    <div className="relative w-full h-[85vh] md:h-[95vh] overflow-hidden bg-black">
      <Swiper
        onSwiper={setSwiper}
        onSlideChange={(s) => animateSlideContent(s)}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        loop={true}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <ImageWithSkeleton
                src={slide.image}
                alt={slide.title}
                priority={index === 0} // Essential for LCP
                className="w-full h-full"
              />
            </div>

            <div className="absolute inset-0 bg-black/40 z-10" />

            <div className="relative z-20 container mx-auto h-full flex flex-col justify-center px-6 md:px-12 lg:px-20">
              <div className="max-w-4xl space-y-4">
                {/* Initial Opacity Classes Added: Initial load pe content dikhega */}
                <div className={`gsap-tag flex items-center gap-2 ${index === 0 ? 'opacity-100' : 'opacity-0'}`}>
                  <span className="w-8 h-[2px] bg-hover"></span>
                  <RichParagraph className="!text-hover uppercase font-bold !text-sm !tracking-wider">
                    {slide.tag}
                  </RichParagraph>
                </div>

                <div className={`gsap-title ${index === 0 ? 'opacity-100' : 'opacity-0'}`}>
                  <Heading1 text={slide.title} />
                </div>

                <div className={`gsap-desc max-w-2xl ${index === 0 ? 'opacity-100' : 'opacity-0'}`}>
                  <Paragraph text={slide.desc} className="text-secondary/70" />
                </div>

                <div className={`flex flex-wrap gap-4 pt-4 ${index === 0 ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="gsap-btn">
                    <SecondaryButton label={slide.btnText} link={slide.link} />
                  </div>
                  <div className="gsap-btn">
                    <PrimaryButton label="ORDER CUSTOM BUILD" link="/contact" />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Accessibility Fix: Added aria-labels to buttons */}
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
    </div>
  );
}