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

  useEffect(() => {
    if (!swiper) return;

    // --- Animation function for slide content ---
    const animateContent = (slide) => {
      gsap.killTweensOf(slide.querySelectorAll(".animated-content"));

      const titleChars = slide.querySelectorAll(".title-char");
      const desc = slide.querySelector(".desc-text");
      const buttons = slide.querySelectorAll(".action-button");

      gsap.set([desc, buttons], { opacity: 0, y: 30 });
      gsap.set(titleChars, { opacity: 0, y: 50 });

      const tl = gsap.timeline();
      tl.to(titleChars, {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        duration: 0.8,
        ease: "power3.out",
      })
      .to(desc, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      }, "-=0.5")
      .to(buttons, {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.6,
        ease: "power3.out",
      }, "-=0.4");
    };

    // --- Animation function for background image (Ken Burns Effect) ---
    const animateBackground = (slide) => {
      const image = slide.querySelector(".slide-bg-image");
      gsap.killTweensOf(image);

      gsap.fromTo(
        image,
        { scale: 1, x: 0, y: 0 },
        {
          scale: 1.1,
          x: "random(-5%, 5%)",
          y: "random(-5%, 5%)",
          duration: 10,
          ease: "none",
        }
      );
    };

    const handleSlideChange = () => {
      const activeSlide = swiper.slides[swiper.activeIndex];
      animateContent(activeSlide);
      animateBackground(activeSlide);
    };

    handleSlideChange();

    swiper.on("slideChangeTransitionEnd", handleSlideChange);

    return () => {
      swiper.off("slideChangeTransitionEnd", handleSlideChange);
    };
  }, [swiper]);

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
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-4 md:px-8">
          <div className="max-w-4xl text-center space-y-4 animated-content -mt-10 md:mt-0">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-[64px] font-extrabold leading-tight tracking-normal font-serif">
              {slide.title.split("").map((char, index) => (
                <span
                  key={index}
                  className="inline-block title-char"
                  style={{ whiteSpace: "pre" }}
                >
                  {char}
                </span>
              ))}
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-[20px] font-normal font-serif desc-text">
              {slide.desc}
            </p>

            <div className="flex flex-row gap-4 justify-center items-center pt-4">
              <button className="bg-[#2761FD] cursor-pointer text-white font-bold py-2 px-3 sm:py-2.5 sm:px-4 md:px-5 rounded-md text-xs sm:text-sm md:text-[14px] action-button">
                View Van Inventory
              </button>
              <Link to="/inquiry">
                <button className="bg-white cursor-pointer text-black font-bold py-2 px-3 sm:py-2.5 sm:px-4 md:px-5 rounded-md text-xs sm:text-sm md:text-[14px] action-button">
                  Request a Build
                </button>
              </Link>
            </div>
          </div>
        </div>
      </SwiperSlide>
    ))}
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

  <style jsx global>{`
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