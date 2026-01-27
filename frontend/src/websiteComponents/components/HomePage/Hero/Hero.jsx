"use client";
import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import BlackButton from "../../Common/Button/BlackButton";
import WhiteButton from "../../Common/Button/WhiteButton";
import ImageWithSkeleton from "../../Common/ImageWithSkeleton/ImageWithSkeleton";
import Heading1 from "../../Common/Headings/Heading1";
import Paragraph from "../../Common/Paragraph/HeroParagraph";

// Define the pure black color for buttons and primary accents


const slides = [
  {
    id: 1,
    image: "/heroSlider/joinadventure.webp",
    title: "Custom Camper Vans..",
    desc: "Buy, customize, or try the 3D configurator from Big Bear Vans today.",
  },
  {
    id: 2,
    image: "/heroSlider/heroimg2.webp",
    title: "Custom Camper Vans",
    desc: "Buy, customize, or try the 3D configurator from Big Bear Vans today.",
  },
  {
    id: 3,
    image: "/heroSlider/heroimg3.jpg",
    title: "Custom Camper Vans",
    desc: "Buy, customize, or try the 3D configurator from Big Bear Vans today.",
  },
];

export default function Hero() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiper, setSwiper] = useState(null);

  // useEffect is required to correctly initialize Swiper's navigation module with refs
  useEffect(() => {
    if (swiper) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper]);

  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-screen overflow-hidden">
      <Swiper
        onSwiper={setSwiper}
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        observer={true}
        observeParents={true}
        /* 🟢 Performance: GPU Acceleration enable ki hai */
        watchSlidesProgress={true}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        speed={1500}
        loop={true}
        className="w-full h-full will-change-transform" // 🟢 GPU help
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative overflow-hidden">
            {/* Background Image */}
            <ImageWithSkeleton
              src={slide.image}
              alt={slide.title}
              // 🟢 LCP Fix: Hero section ki pehli slide hamesha priority true hogi
              priority={index === 0}
              className={`absolute inset-0 w-full h-full object-cover z-0 slide-bg-image ${slide.id === 0.8 ? 'brightness-[1.15]' : ''
                }`}
                decoding={"sync"}
              style={{ contentVisibility: 'auto' }} // 🟢 Rendering optimization
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 md:bg-black/50 z-10 pointer-events-none"></div>
          </SwiperSlide>
        ))}

        {/* --- Content (Fixed over all slides) --- */}
        {/* 🟢 Reflow Fix: 'contain-layout' use kiya hai taake text animation se slides disturb na hon */}
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center h-full text-white px-4 md:px-8 pointer-events-none"
          style={{ contain: 'layout style' }}
        >
          <div className="max-w-4xl text-center space-y-4 animated-content -mt-4 md:mt-0 pointer-events-auto">
            <Heading1 text="Custom Camper Vans.." />
            <Paragraph text="Buy, customize, or try the 3D configurator from Big Bear Vans today." />
            <div className="flex flex-row gap-4 justify-center items-center pt-4 mobile-button-position">
              <BlackButton label="Order Custom Build" link="/inquiry" />
              <WhiteButton label="View Van Inventory" link="/vans-for-sale" />
            </div>
          </div>
        </div>
      </Swiper>
      {/* Custom Navigation (Prev Button) */}
      <div className="absolute left-4 md:left-6 top-1/2 z-30 -translate-y-1/2">
        <button
          ref={prevRef}
          aria-label="Previous slide" // <-- Ye line add ki
          className="bg-white/20 backdrop-blur-sm text-white w-5 h-5 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:bg-white/40"
          onClick={() => swiper?.slidePrev()}
        >
          <svg
            aria-hidden="true" // <-- Ye line add ki taaki icon skip ho jaye
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 md:w-6 md:h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      {/* Custom Navigation (Next Button) */}
      <div className="absolute right-4 md:right-6 top-1/2 z-30 -translate-y-1/2">
        <button
          ref={nextRef}
          aria-label="Next slide" // <-- Ye line add ki
          className="bg-white/20 backdrop-blur-sm pointer-events-auto text-white w-5 h-5 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:bg-white/40"
          onClick={() => swiper?.slideNext()}
        >
          <svg
            aria-hidden="true" // <-- Ye line add ki
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 md:w-6 md:h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      {/* Custom Pagination Container */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3 custom-pagination"></div>

      {/* Combined styles for pagination, mobile button position, and image brightness */}
      <style>{`
        /* --- Image Brightness Fix --- */
        .slide-bg-image {
            transition: filter 0.5s ease;
        }

        /* --- Pagination Styling --- */
        .custom-pagination .custom-bullet {
          width: 12px;
          height: 12px;
          background-color: grey;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 0.8;
        }
        .custom-pagination .custom-bullet-active {
          background-color: white;
          opacity: 1;
          transform: scale(1.2);
        }

        /* --- Mobile Button Position & Size Fix --- */
        @media (max-width: 768px) {
            /* 1. LOWER BUTTONS (Increased margin to push them down more) */
            .mobile-button-position {
                margin-top: 50px;
            }

            /* 2. REDUCE BUTTON SIZE */
            .custom-mobile-button {
                padding: 8px 15px !important;
                font-size: 12px !important;
            }
        }
      `}</style>
    </div>
  )
}