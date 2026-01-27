"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules'; // ✅ Autoplay import kiya
import { availableVans } from '../../../../api/van/availableVans';
import Loader from '../../Loader/Loader';
import { Heading2, RichParagraph, ImageWithSkeleton, WhiteButton, BlackButton } from '../../Common/Common'

// Top mein add karo
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

// --- Icons ---
const ArrowIcon = () => (
  <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 1L8.5 8L1.5 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BuildIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const VanIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h2a1 1 0 001-1V6a1 1 0 00-1-1h-2v11z" />
  </svg>
);

const UPCOMING_VANS = [
  // { title: "Lowroof Poptop", desc: "Compact and versatile for quick escapes.", status: "In Production" },
  // { title: "Montreal AWD 170", desc: "Stone Gray powerhouse designed for all-terrain adventure.", status: "Chassis Arrived" },
  // { title: "Santa Monica (Matte Gray)", desc: "Luxury Ford Transit build with a sleek matte finish.", status: "Finishing Touches" },
  // { title: "Santa Monica Edition", desc: "Our signature Ford Transit floorplan, coming soon.", status: "Early Stages" },
  // { title: "Demo Van (Double Bed)", desc: "Ford Transit demo featuring our spacious double bed layout.", status: "Prototyping" },
];

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

    // Cleanup function add karo
    return () => {
      setLoading(false);
    };
  }, []);

  if (loading) return <Loader />;


  return (
    <section className="bg-white mt-10 md:mt-24 py-12  font-serif overflow-x-hidden">
      <div className="container mx-auto px-4">
        {/* Main Heading Section */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <Heading2 text="Custom Campervan Builders: Build or Buy" />
          <div className="max-w-3xl mx-auto text-base text-gray-700 leading-relaxed text-left">
            <RichParagraph className='my-2'>
              We are <b>premier custom campervan builders</b>, dedicated to crafting your perfect mobile home. Explore our current inventory and upcoming pipeline below.
            </RichParagraph>

            <ul className="mt-6 space-y-4">
              <li className="p-4 bg-gray-50 border-l-4 border-gray-700 rounded-r-lg transition-all hover:bg-gray-100">
                <div className="flex items-start gap-4">
                  <BuildIcon />
                  <div>
                    <RichParagraph className="font-bold">Custom Build (4-5 months):</RichParagraph>
                    <RichParagraph>Total design control, 3D rendering, and engineered CAD modeling.</RichParagraph>
                  </div>
                </div>
              </li>
              <li className="p-4 bg-gray-50 border-l-4 border-gray-700 rounded-r-lg transition-all hover:bg-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 flex-shrink-0 mt-1"><VanIcon /></div>
                  <div>
                    <RichParagraph className="font-bold">Ready-to-Go & Upcoming Builds:</RichParagraph>
                    <RichParagraph>Skip the wait with our in-stock inventory or reserve a build currently in our production line.</RichParagraph>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* Slider Section */}
        <div className="relative mb-12">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Autoplay]}
            loop={true}

            // ✅ Performance optimizations add karo
            cssMode={false} // Keep false for autoplay
            watchSlidesProgress={false}
            // watchSlidesVisibility={false}
            preventInteractionOnTransition={true}

            // ✅ Resize handling optimize karo
            updateOnWindowResize={false} // Change to false
            resizeObserver={false} // Add this

            observer={true}
            observeParents={true}

            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            spaceBetween={30}
            breakpoints={{
              0: { slidesPerView: 1, centeredSlides: false },
              768: { slidesPerView: "auto", centeredSlides: true },
            }}
            className="!pb-8"
          >
            {/* 🔹 1. REAL INVENTORY SLIDES */}
            {readyToGoVans.map((slide, i) => {
              const hasImage = slide?.gallery?.[0];

              return (
                <SwiperSlide
                  key={slide._id || i}
                  /* 🟢 Original Design: Aapki 900px width wapas restore kar di */
                  className="group w-full md:!w-[900px] md:!h-[500px]"
                >
                  {/* 🟢 Reflow Fix: Sirf transform aur opacity par transition rakhi hai */}
                  {/* ✅ YAHAN - div mein jo currently will-change-transform hai */}
                  <div className={`
    relative w-full h-[450px] md:h-full rounded-[30px] overflow-hidden shadow-lg
    transition-[transform,shadow] duration-500
    group-hover:scale-[1.01] group-hover:will-change-transform
  `}>
                    {/* Background Image OR Fallback */}
                    {hasImage ? (
                      <ImageWithSkeleton
                        src={hasImage}
                        alt={slide.van_listing?.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        /* 🟢 LCP Fix: Sirf pehli image eager hogi */
                        priority={i === 0}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex justify-center">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,#2761FD_0%,transparent_40%)]" />
                        <span className="text-gray-500 mt-20 text-sm uppercase tracking-widest">
                          Image coming soon...
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                    <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-12 text-white text-left">
                      <span className="bg-green-700 text-white text-[11px] font-bold px-3 py-1 rounded-full w-fit mb-3 uppercase tracking-widest shadow-sm">
                        Available Now
                      </span>

                      <Heading2
                        text={slide?.van_listing?.title || "Ready-To-Go Camper Van"}
                        className="text-white mb-2"
                      />

                      <RichParagraph className="text-gray-100 mb-6 line-clamp-2 max-w-2xl">
                        {slide?.van_listing?.description ||
                          "A premium camper conversion designed for comfort, performance, and adventure."}
                      </RichParagraph>

                      <div className="flex gap-4">
                        <BlackButton label="Buy Now" link="/contact" />
                        <WhiteButton
                          label="Details"
                          link={`/van-detail/${slide.slug}`}
                          ariaLabel={`View details for ${slide.van_listing?.title || "this camper van"}`}
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}

            {/* 🔹 2. UPCOMING BUILDS SLIDES */}
            {readyToGoVans.length === 0 && UPCOMING_VANS.map((van, idx) => (
              <SwiperSlide key={`upcoming-${idx}`} className="group w-full md:!w-[900px] md:!h-[500px]">
                <div className="relative w-full h-[450px] md:h-full rounded-[30px] overflow-hidden shadow-md bg-gradient-to-br from-gray-50 to-gray-200 border border-gray-200 flex flex-col justify-center items-center text-center p-8 transition-transform duration-500 will-change-transform group-hover:scale-[1.01]">
                  <div className="absolute top-0 right-0 p-10 opacity-10"><VanIcon /></div>
                  <div className="relative z-10">
                    <div className="mb-4 inline-block p-4 bg-white rounded-2xl shadow-sm"><VanIcon /></div>
                    <RichParagraph textColor='text-blue-500'>Coming Soon • {van.status}</RichParagraph>
                    <Heading2 text={van.title} />
                    <RichParagraph className='my-2'>{van.desc}</RichParagraph>
                    <div className="flex justify-center"><BlackButton label="Pre-Inquire Now" link="/contact" /></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-800 opacity-20"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* ⬇️ NEW ACTION BAR: Isme "Browse" aur "Arrows" aamne-saamne hain */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-12 px-2 md:px-16">

          {/* Left side: Browse Button */}
          <div className="order-2 md:order-1">
            <BlackButton label="Browse Full Inventory" link="/vans-for-sale" />
          </div>

          {/* Right side: Navigation Arrows */}
          <div className="flex gap-4 order-1 md:order-2">
            <button aria-label="Previous Slide"
              onClick={() => swiperRef.current?.swiper.slidePrev()}
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-black transition-all shadow-lg active:scale-95"
            >
              <span className="rotate-180"><ArrowIcon /></span>
            </button>
            <button aria-label="Next Slide"
              onClick={() => swiperRef.current?.swiper.slideNext()}
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-black transition-all shadow-lg active:scale-95"
            >
              <ArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}