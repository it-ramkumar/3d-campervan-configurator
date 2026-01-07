"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BlackButton from "../../Common/Button/BlackButton"
import WhiteButton from '../../Common/Button/WhiteButton';
import { availableVans } from '../../../../api/van/availableVans';
import Loader from '../../Loader/Loader';
import ImageWithSkeleton from '../../Common/ImageWithSkeleton/ImageWithSkeleton';
import Heading2 from '../../Common/Headings/Heading2';
import RichParagraph from '../../Common/Paragraph/RichParagraph';

// Custom Arrow Component for Slider Navigation
const ArrowIcon = () => (
  <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 1L8.5 8L1.5 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ✅ NEW: Icon for Custom Builds
const BuildIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

// ✅ NEW: Icon for Ready-to-Go Vans
const VanIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h2a1 1 0 001-1V6a1 1 0 00-1-1h-2v11z" />
  </svg>
);

// ✅ NEW: Coming Soon Icon
const ComingSoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function Buy() {
  const swiperRef = useRef(null);
  const [readyToGoVans, setReadyToGoVans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReadyToGoVans = async () => {
      try {
        const response = await availableVans();
        setReadyToGoVans(response.data || []);
      } catch (error) {
        console.error("Error fetching vans:", error);
        setReadyToGoVans([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReadyToGoVans();
  }, []);

  const custom = {
    // type: 'custom',
    // title: "Your Dream Van, Built to Order",
    // desc: "Our passion is crafting bespoke campervans tailored precisely to your adventure. While we offer a selection of ready-to-go vans, our main focus is bringing your unique vision to life from the ground up.",
    // video: "/videos/custom-build.mp4",
    // id: "custom-build-3d",
  }

  if (loading) {
    return <Loader />;
  }

  const data = readyToGoVans.length > 0 ? readyToGoVans : [];
  const hasVideo = custom && custom.video;
  const hasData = data.length > 0;

  // ✅ Calculate total slides
  const totalSlides = (hasVideo ? 1 : 0) + data.length;
  const showNavigation = totalSlides > 1;

  // ✅ Check if we need to show "Coming Soon" card
  const showComingSoon = !hasVideo && !hasData;

  return (
    <section className="bg-white mt-24 font-serif overflow-x-hidden">
      <div className="container mx-auto px-4">
        {/* Main Heading and Description Section */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <Heading2
            text="Custom Campervan Builders: Build or Buy"
          />
          <div className="max-w-3xl mx-auto text-base text-gray-700 leading-relaxed text-left">
            <RichParagraph className='my-2'>
              We are <b>premier custom campervan builders</b>, dedicated to crafting your
              perfect mobile home. Our priority is <b>bespoke builds</b> tailored to your vision.
            </RichParagraph>
            <RichParagraph className='my-2'>
              Use the slider below to start a custom project or browse our in-stock, ready-to-go inventory:
            </RichParagraph>

            {/* ✅ IMPROVED: Restructured list with icons and consistent styling */}
            <ul className="mt-6 space-y-4">
              {/* Custom Build */}
              <li className="p-4 bg-gray-50 border-l-4 border-gray-700 rounded-r-lg transition-all duration-300 hover:shadow-md hover:bg-gray-100">
                <div className="flex items-start gap-4">
                  <BuildIcon className="w-6 h-6 text-gray-700 flex-shrink-0 mt-1" />
                  <div>
                    <RichParagraph className="font-bold">
                      Custom Build (4-5 months):
                    </RichParagraph>
                    <RichParagraph>
                      Total design control, 3D rendering, and engineered CAD modeling.
                    </RichParagraph>
                  </div>
                </div>
              </li>

              {/* Ready-to-Go Vans */}
              <li className="p-4 bg-gray-50 border-l-4 border-gray-700 rounded-r-lg transition-all duration-300 hover:shadow-md hover:bg-gray-100">
                <div className="flex items-start gap-4">
                  <VanIcon className="w-6 h-6 text-gray-700 flex-shrink-0 mt-1" />
                  <div>
                    <RichParagraph className="font-bold">
                      Ready-to-Go Vans (Immediate):
                    </RichParagraph>
                    <RichParagraph>
                      Skip the wait and drive away in a van pre-equipped with our standard luxury features: <b>sleeps 5-6</b>, <b>full amenities</b>, and <b>advanced glycol heating</b>. Just pay, sign, and drive away!
                    </RichParagraph>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ✅ Coming Soon Card - Show when no video and no data */}
        {showComingSoon ? (
          <div className="relative mb-12">
            <div className="max-w-4xl mx-auto">
              <div className="relative w-full h-[450px] md:h-[500px] rounded-[30px] overflow-hidden shadow-lg bg-gradient-to-br from-gray-100 via-gray-50 to-white border-2 border-gray-200">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <ComingSoonIcon />
                  <Heading2 text="Vans Coming Soon" className="text-gray-700 mb-4" />
                  <RichParagraph className="text-gray-600 max-w-md mb-6">
                    We're currently building amazing campervans! Check back soon or start your custom build today.
                  </RichParagraph>
                  <div className="flex gap-4 flex-wrap justify-center">
                    <WhiteButton label="Start Custom Build" link="/inquiry" />
                    <BlackButton label="Contact Us" link="/contact" />
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-indigo-100 rounded-full opacity-50 blur-xl"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-100 rounded-full opacity-50 blur-xl"></div>
              </div>
            </div>
          </div>
        ) : (
          /* Slider Section - Show when there's video or data */
          <div className="relative mb-12">
            <div className="sm:px-0">
              <Swiper
                ref={swiperRef}
                modules={[Navigation]}
                loop={false}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                    centeredSlides: false,
                  },
                  768: {
                    slidesPerView: "auto",
                    spaceBetween: 30,
                    centeredSlides: true,
                  },
                }}
                className="!pb-8"
              >
                {/* 🔹 Custom Build Video Slide - FIRST */}
                {hasVideo && (
                  <SwiperSlide key="custom-slide" className="group w-full md:!w-[900px] md:!h-[500px]">
                    <div className="relative w-full h-[450px] md:h-full rounded-3xl overflow-hidden shadow-lg">
                      <video
                        src={custom.video}
                        autoPlay
                        loop
                        preload="none"
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover brightness-110"
                      />
                      <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

                      {/* Desktop version */}
                      <div className="hidden md:flex relative z-10 flex-col justify-end items-start w-full h-full p-10 text-left text-white">
                        <div className="w-full max-w-[650px]">
                          <h3 className="text-3xl font-semibold leading-normal mb-2 transition-all duration-700 ease-out">
                            {custom.title}
                          </h3>
                          <p className="text-base font-normal mb-5 transition-all duration-700 ease-out">
                            {custom.desc}
                          </p>
                          <div className="flex gap-4">
                            <WhiteButton label="Start Your Custom Build" link="/inquiry" />
                            <BlackButton label="Learn About Our Process" link="/our-process" />
                          </div>
                        </div>
                      </div>

                      {/* Mobile version */}
                      <div className="md:hidden absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-3 rounded-b-[30px] text-white">
                        <Heading2 text={custom.title} className="text-white" />
                        <RichParagraph className="mt-2 text-white">
                          {custom.desc}
                        </RichParagraph>

                        <div className="flex gap-2 mt-3">
                          <Link to="/inquiry">
                            <button className="bg-white text-black text-[10px] font-bold px-3 py-1 rounded-md">Start Build</button>
                          </Link>
                          <Link to="/our-process">
                            <button className="bg-[#2761FD] text-white text-[10px] font-bold px-3 py-1 rounded-md">Process</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                )}

                {/* 🔹 Ready To Go Vans Slides */}
                {data?.map((slide, i) => (
                  <SwiperSlide key={slide._id || i} className="group w-full md:!w-[900px] md:!h-[500px]">
                    <div
                      className="relative w-full h-[450px] md:h-full text-white rounded-[30px]
                    overflow-hidden shadow-lg transition-all duration-500 ease-in-out
                    group-hover:shadow-2xl group-hover:scale-[1.03]"
                    >
                      <ImageWithSkeleton
                        src={slide?.gallery?.[0]}
                        alt={slide.van_listing?.title || "Ready to Go Van"}
                        className="absolute inset-0 w-full h-full object-cover "
                      />
                      <div
                        className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 via-black/50
                      to-transparent transition-all duration-500 ease-in-out
                      group-hover:bg-black/20 group-hover:from-black/70 group-hover:via-black/30"
                      ></div>

                      {/* Desktop version */}
                      <div className="hidden md:flex relative z-10 flex-col justify-between items-start w-full h-full p-10 text-left">
                        <Heading2 text={slide?.van_listing?.title || "Ready to Go Van"} className="text-white mb-4" />

                        <div className="w-full max-w-[650px]">
                          <RichParagraph className="text-white mb-6">
                            {slide?.van_listing?.description || "Ready to Go Van"}
                          </RichParagraph>
                          <div className="flex gap-4">
                            <BlackButton label="Buy Now" link="/contact" />
                            <WhiteButton label="More Details" link={`/van-detail/${slide.slug}`} />
                          </div>
                        </div>
                      </div>

                      {/* Mobile version */}
                      <div className="md:hidden absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-3 rounded-b-[30px] text-white">
                        <Heading2 text={slide?.van_listing?.title || "Ready to Go Van"} className="text-white" />
                        <RichParagraph className="mt-2 text-white">
                          {slide.van_listing?.description || "Ready to Go Van"}
                        </RichParagraph>

                        <div className="flex gap-2 mt-3">
                          <Link to="/contact">
                            <button className="bg-white text-black text-[10px] font-bold px-3 py-1 rounded-md">
                              Buy
                            </button>
                          </Link>
                          <Link to={`/van-detail/${slide.slug}`}>
                            <button className="bg-[#2761FD] text-white text-[10px] font-bold px-3 py-1 rounded-md">
                              Details
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* ✅ Navigation buttons - Only show when total slides > 1 */}
              {showNavigation && (
                <div
                  className="absolute bottom-0 right-2 sm:right-4 md:right-8 lg:right-16 flex gap-3 sm:gap-4 mb-4 md:mb-0 z-20 translate-y-14 md:translate-y-14"
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
              )}
            </div>
          </div>
        )}

        {/* Bottom Call-to-Action Section */}
        <div className="text-center mt-8">
          <BlackButton label="View All Inventory" link="/vans-for-sale" />
        </div>
      </div>
    </section>
  );
}