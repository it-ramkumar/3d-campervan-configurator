"use client";
import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";

const slides = [
  {
    id: 1,
    image: "/heroSlider/heroimg1.png",
    title: "Custom Camper Vans",
    desc: "Buy, customize, or try the 3D configurator from Big Bear Vans today.",
  },
  {
    id: 2,
    image: "/heroSlider/heroimg2.jpg",
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

  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-screen overflow-hidden">
      <Swiper
        onSwiper={setSwiper}
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        speed={1500}
        loop={true}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          bulletClass: "custom-bullet",
          bulletActiveClass: "custom-bullet-active",
        }}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover z-0 slide-bg-image"
            />

            {/* Dark Overlay */}


            {/* Content */}

          </SwiperSlide>
        ))}
        <div className="absolute inset-0 bg-black/50 z-10">  <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-4 md:px-8">
              <div className="max-w-4xl text-center space-y-4 animated-content -mt-10 md:mt-0">
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-[64px] font-extrabold leading-tight tracking-normal font-serif">

                    <span

                      className="inline-block title-char"
                      style={{ whiteSpace: "pre" }}
                    >
                 Custom Camper Vans
                    </span>

                </h1>

                <p className="text-sm sm:text-base md:text-lg lg:text-[20px] font-normal font-serif desc-text">
              Buy, customize, or try the 3D configurator from Big Bear Vans today.
                </p>

                <div className="flex flex-row gap-4 justify-center items-center pt-4">
                  <Link to="/vans-for-sale">

                    <button className="bg-[#2761FD] cursor-pointer text-white font-bold py-2 px-3 sm:py-2.5 sm:px-4 md:px-5 rounded-md text-xs sm:text-sm md:text-[14px] action-button">
                      View Van Inventory
                    </button>
                  </Link>
                  <Link to="/inquiry">
                    <button className="bg-white cursor-pointer text-black font-bold py-2 px-3 sm:py-2.5 sm:px-4 md:px-5 rounded-md text-xs sm:text-sm md:text-[14px] action-button">
                      Request a Build
                    </button>
                  </Link>
                </div>
              </div>
            </div></div>
      </Swiper>

      {/* Custom Navigation */}
      <div className="absolute left-4 md:left-6 top-1/2 z-30 -translate-y-1/2">
        <button
          ref={prevRef}
          className="bg-white/20 backdrop-blur-sm text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:bg-white/40"
          onClick={() => swiper?.slidePrev()}
        >
          <svg
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
      <div className="absolute right-4 md:right-6 top-1/2 z-30 -translate-y-1/2">
        <button
          ref={nextRef}
          className="bg-white/20 backdrop-blur-sm pointer-events-auto text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:bg-white/40"
          onClick={() => swiper?.slideNext()}
        >
          <svg
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

      <style>{`
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
  `}</style>
    </div>

  )
}