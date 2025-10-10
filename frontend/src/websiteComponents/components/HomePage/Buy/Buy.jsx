"use client";

import React, { useEffect, useState, useRef, Suspense } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";


// gsap.registerPlugin(ScrollTrigger);
// ---------------------------------------------------


// Custom Arrow Component for Slider Navigation
const ArrowIcon = () => (
    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 1L8.5 8L1.5 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);


// Data for the 3D parts


// --- Animation Variants for Framer Motion ---
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2
        }
    }
};

const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

// --- Custom 3D Slide Component ---

// ---------------------------------------------------


export default function Buy() {
    const swiperRef = useRef(null);

    const readyToGoVansDummy = [
        {
            type: 'custom',
            title: "Your Dream Van, Built to Order",
            desc: "Our passion is crafting bespoke campervans tailored precisely to your adventure. While we offer a selection of ready-to-go vans, our main focus is bringing your unique vision to life from the ground up.",
            video: "/videos/custom-build.mp4",
            id: "custom-build-3d",
        },
        {
            type: 'van',
            title: "Santa Monica V6 Turbo",
            desc: "144 Sprinter is built for a family! Designed to sit & sleep 4. With indoor bathroom, kitchen, elevator bed, and dinette.",
            img: "/images/brown.jpg",
        }

    ];

    return (
        <section className="bg-white py-16 font-serif overflow-x-hidden">
            <div className="container mx-auto px-4">

                {/* Main Heading and Description Section */}
                <motion.div
                    className="text-center max-w-4xl mx-auto mb-12"
                    initial="hidden"
                    whileInView="visible"
                    variants={fadeInUp}
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <h1 className="text-3xl md:text-5xl font-bold text-blackish mb-6 leading-tight">
                        Custom Campervan Builders: Build or Buy
                    </h1>
                    <div className="max-w-[893px] mx-auto text-base font-normal text-gray-600 leading-relaxed text-center">
                        <p className="mb-4">
                            We are <b> premier custom campervan builders</b>, dedicated to crafting your perfect mobile home. Our priority is <b>bespoke builds</b> tailored to your vision.
                        </p>
                        <p className="mb-6 font-semibold text-blackish">
                            Use the slider below to start a custom project or browse our in-stock, ready-to-go inventory :
                        </p>

                        {/* Integrated the old "Ready-to-Go" bullet points as a feature summary for ALL vans */}
                        <motion.ul
                            className="list-disc list-inside space-y-2 max-w-sm mx-auto md:max-w-none text-left"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <motion.li variants={fadeInUp}><strong className="font-bold">Custom Build (4-5 months):</strong> Total design control, 3D rendering, and engineered CAD modeling.</motion.li>
                            <motion.li variants={fadeInUp}><strong className="font-bold">Ready-to-Go Vans (Immediate):</strong> Skip the wait and drive away in a van pre-equipped with our standard luxury features: <b>sleeps 5-6</b>, <b>full amenities</b>, and <b>advanced glycol heating</b>. Just pay, sign, and drive away!</motion.li>
                        </motion.ul>
                    </div>
                </motion.div>


               <motion.div
  className="relative mb-12"
  variants={slideInRight}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>
  {/* ✅ Outer wrapper for responsive padding */}
  <div className="px-3 sm:px-5 md:px-0">
    <Swiper
      ref={swiperRef}
      modules={[Navigation]}
      loop={false}
      breakpoints={{
        0: {
          slidesPerView: 1, // full width on mobile
          spaceBetween: 15,
          centeredSlides: false,
        },
        768: {
          slidesPerView: 'auto',
          spaceBetween: 30,
          centeredSlides: true,
        },
      }}
      className="!pb-8"
    >
      {readyToGoVansDummy.map((slide, i) => (
        <SwiperSlide
          key={slide.id || i}
          className="group w-full md:!w-[900px] md:!h-[500px]"
        >
          {slide.type === 'custom' ? (
            // ✅ Custom Build (Video Slide)
            <div className="relative w-full h-[450px] md:h-full rounded-[30px] overflow-hidden shadow-lg">
              <video
                src={slide.video}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover brightness-110"
              />
              <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
              <div className="relative z-10 flex flex-col justify-end items-start w-full h-full p-4 md:p-10 text-left text-white">
                <div className="w-full max-w-[650px]">
                  <h3
                    className="text-xl md:text-3xl opacity-0 translate-y-5
                    group-hover:opacity-100 group-hover:translate-y-0
                    transition-all duration-700 ease-out font-semibold
                    leading-tight md:leading-normal mb-2"
                  >
                    {slide.title}
                  </h3>
                  <p
                    className="text-sm md:text-base font-normal mb-5
                    opacity-0 translate-y-5 group-hover:opacity-100
                    group-hover:translate-y-0 transition-all duration-700 ease-out"
                  >
                    {slide.desc}
                  </p>
                  <div className="flex gap-4">
                    <Link to="/inquiry">
                      <button
                        className="bg-white cursor-pointer text-black font-serif font-bold
                        text-xs px-3 py-1.5 md:text-sm md:px-6 md:py-2 rounded-md
                        transform transition-all duration-300 ease-in-out
                        hover:scale-105 hover:shadow-lg"
                      >
                        Start Your Custom Build
                      </button>
                    </Link>
                    <Link to="/our-process">
                      <button
                        className="bg-[#2761FD] text-white cursor-pointer font-serif font-bold
                        text-xs px-3 py-1.5 md:text-sm md:px-6 md:py-2 rounded-md
                        transform transition-all duration-300 ease-in-out
                        hover:scale-105 hover:shadow-lg"
                      >
                        Learn About Our Process
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // ✅ Normal Van Slide (Image)
            <div
              className="relative w-full h-[450px] md:h-full text-white rounded-[30px]
              overflow-hidden shadow-lg transition-all duration-500 ease-in-out
              group-hover:shadow-2xl group-hover:scale-[1.03]"
            >
              <img
                src={slide.img}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover
                transition-all duration-500 ease-in-out group-hover:scale-110"
              />
              <div
                className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 via-black/50
                to-transparent transition-all duration-500 ease-in-out
                group-hover:bg-black/20 group-hover:from-black/70 group-hover:via-black/30"
              ></div>
              <div className="relative z-10 flex flex-col justify-between items-start w-full h-full p-4 md:p-10 text-left">
                <h3 className="text-xl md:text-3xl font-semibold whitespace-pre-line leading-tight md:leading-normal">
                  {slide.title}
                </h3>
                <div className="w-full max-w-[650px]">
                  <p className="text-sm md:text-base font-normal mb-5">{slide.desc}</p>
                  <div className="flex gap-4">
                    <Link to="/contact">
                      <button
                        className="bg-white cursor-pointer text-black font-serif font-bold text-sm
                        px-4 md:px-6 py-2 rounded-md transition-all duration-300
                        hover:scale-105 hover:shadow-lg"
                      >
                        Buy Now
                      </button>
                    </Link>
                    <Link to="/santa-monica">
                      <button
                        className="bg-[#2761FD] cursor-pointer text-white font-serif font-bold text-sm
                        px-4 md:px-6 py-2 rounded-md transition-all duration-300
                        hover:scale-105 hover:shadow-lg"
                      >
                        More Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>

    {/* ✅ Navigation buttons */}
    <div
      className="absolute bottom-0 right-2 sm:right-4 md:right-8 lg:right-16
      flex gap-3 sm:gap-4 mb-4 md:mb-0 z-20 translate-y-14 md:translate-y-14"
    >
      <button
        onClick={() => swiperRef.current?.swiper.slidePrev()}
        className="w-10 h-10 sm:w-12 sm:h-12 cursor-pointer bg-gray-800 rounded-full flex items-center justify-center
        transition-all duration-300 opacity-90 hover:opacity-100 hover:scale-110"
      >
        <span className="rotate-180">
          <ArrowIcon />
        </span>
      </button>
      <button
        onClick={() => swiperRef.current?.swiper.slideNext()}
        className="w-10 h-10 sm:w-12 sm:h-12 cursor-pointer bg-gray-800 rounded-full flex items-center justify-center
        transition-all duration-300 opacity-90 hover:opacity-100 hover:scale-110"
      >
        <ArrowIcon />
      </button>
    </div>
  </div>
</motion.div>


                {/* Bottom Call-to-Action Section */}
                <motion.div
                    className="text-center mt-8"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <Link to="/vans-for-sale">
                        <button className="bg-black cursor-pointer text-white font-serif font-bold text-sm px-8 py-3 rounded-md transform transition-transform duration-300 hover:scale-105">
                            View All Inventory
                        </button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}