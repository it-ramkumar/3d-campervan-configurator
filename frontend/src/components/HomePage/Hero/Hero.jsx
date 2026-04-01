"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Aapke Custom Components
import Paragraph from "../../Common/Paragraph/HeroParagraph";
import { SecondaryButton, PrimaryButton, ImageWithSkeleton, Heading1, RichParagraph } from '../../Common/Common'

const slides = [
    {
      id: 1,
      image: "/heroSlider/long_van.jpg",
      tag: "Vans For Sale",
      title: "Campervans For Sale.",
      desc: "Ready-to-roll premium builds. Hand-crafted for the ultimate road trip experience.",
      btnText: "View Inventory",
      link: "/vans-for-sale",
      type: "sale"
    },
    {
      id: 2,
      image: "/heroSlider/heroimg2.webp",
      tag: "Bespoke Service",
      title: "Custom Van Builds",
      desc: "Your vision, our engineering. Off-grid solar, full kitchens, and custom layouts.",
      btnText: "Build Your Own",
      link: "/inquiry",
      type: "custom"
    },
    {
      id: 3,
      image: "/images2/contact.webp",
      tag: "Our Layouts",
      title: "Previous Layouts",
      desc: "Explore our past projects and get inspired by our signature craftsmanship.",
      btnText: "Browse Gallery",
      link: "/van-layouts",
      type: "portfolio"
    }
  ];

export default function Hero() {
  const [swiper, setSwiper] = useState(null);

  return (
    <div className="relative w-full h-[85vh] md:h-[95vh] overflow-hidden bg-black">
      <Swiper
        onSwiper={setSwiper}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1200}
        loop={true}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative">
            {/* Background Image with Ken Burns Effect */}
            <div className="absolute inset-0 overflow-hidden">
              <ImageWithSkeleton
                src={slide.image}
                alt={slide.title}
                priority={index === 0}
                className="w-full h-full object-cover transform scale-110 animate-ken-burns"
              />
            </div>

            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>

            {/* Content Container */}
            <div className="relative z-20 container mx-auto h-full flex flex-col justify-center px-6 md:px-12 lg:px-20">
              <div className="max-w-4xl space-y-4 md:space-y-6">

                {/* Animated Tagline - Using Hover color as accent */}
                <div className="flex items-center gap-sm animate-fade-in-up">
                  <span className="w-8 h-[2px] bg-hover"></span>
                  <RichParagraph className="!text-hover uppercase font-bold !text-sm !tracking-wider">
                    {slide.tag}
                  </RichParagraph>
                </div>

                {/* Heading Component */}
                <div className="max-w-4/6 animate-fade-in-up delay-100 ">
                  <Heading1
                    text={slide.title}
                  />
                </div>

                {/* Paragraph Component */}
                <div className="max-w-4/6 animate-fade-in-up delay-200">
                  <Paragraph
                    text={slide.desc}
                    className="text-secondary/70"
                  />
                </div>

                {/* Button Components */}
                <div className="flex flex-wrap gap-[var(--gap-sm)] pt-4 md:pt-6 animate-fade-in-up delay-300">
                  <SecondaryButton
                    label={slide.btnText}
                    link={slide.link}
                  />
                  <PrimaryButton
                    label="ORDER CUSTOM BUILd"
                    link="/contact"
                  />
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modern Minimal Controls - Using Secondary & Hover interaction */}
      <div className="absolute bottom-12 right-6 md:right-12 z-30 flex items-center gap-[var(--gap-sm)]">
        <button
          onClick={() => swiper?.slidePrev()}
          className="w-12 h-12 flex items-center justify-center rounded-lg border border-secondary/20 text-secondary hover:bg-hover hover:border-hover hover:text-primary transition-all duration-300"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => swiper?.slideNext()}
          className="w-12 h-12 flex items-center justify-center rounded-lg border border-secondary/20 text-secondary hover:bg-hover hover:border-hover hover:text-primary transition-all duration-300"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Progress Indicator Line - Using Theme Hover color */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-secondary/10 z-30">
        <div className="h-full bg-hover animate-slide-progress"></div>
      </div>

      {/* Custom Keyframe Animations */}
      <style>{`
        @keyframes ken-burns {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        .animate-ken-burns {
          animation: ken-burns 10s ease-out forwards;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }

        @keyframes slide-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-slide-progress {
          animation: slide-progress 6s linear infinite;
        }
      `}</style>
    </div>
  );
}