"use client";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Aapke Custom Components
import Paragraph from "../../Common/Paragraph/HeroParagraph";
import { SecondaryButton, PrimaryButton, ImageWithSkeleton, Heading1, RichParagraph } from '../../Common/Common';
import { slides } from "@/DataUseInComp/homeSlider";

export default function Hero() {
  const [swiper, setSwiper] = useState(null);

  // --- GSAP Animation Engine ---
  const animateSlideContent = (s) => {
    if (!s || !s.slides) return;

    // 1. Current Active Slide element ko target karna
    const activeSlide = s.slides[s.activeIndex];
    if (!activeSlide) return;

    // 2. Elements ko select karna (Classes wahi hain jo humne niche return mein di hain)
    const tag = activeSlide.querySelector(".gsap-tag");
    const title = activeSlide.querySelector(".gsap-title");
    const desc = activeSlide.querySelector(".gsap-desc");
    const btns = activeSlide.querySelectorAll(".gsap-btn");
    const img = activeSlide.querySelector("img");

    // 3. Pehle se chal rahi animations ko kill karna (for performance)
    gsap.killTweensOf([tag, title, desc, btns, img]);

    // 4. Initial Hidden State (Reset)
    gsap.set([tag, title, desc, btns], { opacity: 0, y: 50 });
    if (img) gsap.set(img, { scale: 1.2 });

    // 5. Timeline Creation
    const tl = gsap.timeline({
      defaults: { ease: "power4.out", duration: 1.2 }
    });

    tl.to(tag, { opacity: 1, y: 0, delay: 0.4 })
      .to(title, { opacity: 1, y: 0 }, "-=0.9")
      .to(desc, { opacity: 1, y: 0 }, "-=0.9")
      .to(btns, { opacity: 1, y: 0, stagger: 0.15 }, "-=0.9")
      .to(img, { scale: 1, duration: 8, ease: "sine.out" }, 0); // Background zoom-out effect
  };

  // Pehli slide trigger karne ke liye
  useEffect(() => {
    if (swiper) {
      animateSlideContent(swiper);
    }
  }, [swiper]);

  return (
    <div className="relative w-full h-[85vh] md:h-[95vh] overflow-hidden bg-black">
      <Swiper
        onSwiper={setSwiper}
        onSlideChange={(s) => animateSlideContent(s)}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1400} // Smooth transition between slides
        loop={true}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative overflow-hidden">
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0">
              <ImageWithSkeleton
                src={slide.image}
                alt={slide.title}
                priority={index === 0}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Cinematic Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />

            {/* Main Content Area */}
            <div className="relative z-20 container mx-auto h-full flex flex-col justify-center px-6 md:px-12 lg:px-20">
              <div className="max-w-4xl space-y-4 md:space-y-6">

                {/* Tagline */}
                <div className="gsap-tag flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-hover"></span>
                  <RichParagraph className="!text-hover uppercase font-bold !text-sm !tracking-wider">
                    {slide.tag}
                  </RichParagraph>
                </div>

                {/* Title */}
                <div className="gsap-title">
                  <Heading1 text={slide.title} />
                </div>

                {/* Description */}
                <div className="gsap-desc max-w-2xl">
                  <Paragraph text={slide.desc} className="text-secondary/70" />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4 md:pt-6">
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

      {/* Navigation Controls */}
      <div className="absolute bottom-12 right-6 md:right-12 z-30 flex items-center gap-4">
        <button
          onClick={() => swiper?.slidePrev()}
          className="w-14 h-14 flex items-center justify-center rounded-full border border-white/10 text-white backdrop-blur-md hover:bg-hover hover:border-hover hover:text-black transition-all duration-500"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={() => swiper?.slideNext()}
          className="w-14 h-14 flex items-center justify-center rounded-full border border-white/10 text-white backdrop-blur-md hover:bg-hover hover:border-hover hover:text-black transition-all duration-500"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Custom Progress Line (GSAP Driven) */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/10 z-30">
        <div
          className="h-full bg-hover origin-left"
          id="hero-progress-bar"
          style={{ width: '0%' }}
        ></div>
      </div>

      {/* Extra Modern Touch: Global Style for smooth font rendering */}
      <style jsx global>{`
        .gsap-title, .gsap-tag, .gsap-desc {
          will-change: transform, opacity;
        }
      `}</style>
    </div>
  );
}