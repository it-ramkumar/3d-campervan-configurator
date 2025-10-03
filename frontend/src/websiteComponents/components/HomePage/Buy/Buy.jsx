"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { motion } from "framer-motion";
// import { availableVans } from '../../../../api/van/availableVans';
import { Link } from "react-router-dom"


import 'swiper/css';
import 'swiper/css/navigation';


// Custom Arrow Component for Slider Navigation
const ArrowIcon = () => (
    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 1L8.5 8L1.5 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

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

export default function Buy() {
    const swiperRef = useRef(null);
    const [slidesData, setSlidesData] = useState([]);

    // useEffect(() => {
    //     async function fetchVans() {
    //         const result = await availableVans();
    //         if (result.success) {
    //             const slidesData = result.data.map(van => ({
    //                 title: van.van_listing.title,
    //                 desc: van.van_listing.description,
    //                 img: van.gallery[0]?.url || "/images/placeholder.jpg",
    //             }));
    //             setSlidesData(slidesData);
    //         }
    //     }
    //     fetchVans();
    // }, []);


    const slidesDummy = [
        // {
        //     title: "Montreal 170 AWD Blue Gray\n2025 NEW Sprinter Van",
        //     desc: "Our Montreal 170 AWD Blue-gray is a thoroughly insulated and winter ready camper van, which is designed for 4-5 people",
        //     img: "/images/Montrial.jpg",
        // },
        {
            title: "Santa Monica V6 Turbo",
            desc: "144 Sprinter is built for a family! Designed to sit & sleep 4. With indoor bathroom, kitchen, elevator bed, and dinette.",
            img: "/images/brown.jpg",
        },
    ];
    const data = slidesData && slidesData.length > 0 ? slidesData : slidesDummy;
    return (
        <section className="bg-white py-16 font-serif overflow-x-hidden">
            <div className="container mx-auto px-4">

                {/* Main Heading and Description Section (Changed for center alignment in mobile) */}
                <motion.div
                    className="text-center max-w-4xl mx-auto mb-12"
                    initial="hidden"
                    whileInView="visible"
                    variants={fadeInUp}
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <h1 className="text-3xl md:text-5xl font-bold text-blackish mb-6 leading-tight">
                        Buy a Ready-to-Go Campervan
                    </h1>
                    <div className="max-w-[893px] mx-auto text-base font-normal text-gray-600 leading-relaxed text-center md:text-left">
                        <p className="mb-4">
                            Skip the long (4-5 months) wait for customizing your van. And browse our vans for sale, equipped with top-of-the-line components:
                        </p>
                        <motion.ul
                            className="list-disc list-inside space-y-2"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <motion.li variants={fadeInUp}><strong className="font-bold">Sleeps 5-6:</strong> With an Elevator bed, dinette benches & double swivel seats.</motion.li>
                            <motion.li variants={fadeInUp}><strong className="font-bold">Power for Days:</strong> Lithium batteries, solar panels, and high-speed alternator charging.</motion.li>
                            <motion.li variants={fadeInUp}><strong className="font-bold">Full Amenities:</strong> Functional kitchen & lightweight aluminum bathroom.</motion.li>
                            <motion.li variants={fadeInUp}><strong className="font-bold">Advanced glycol heating:</strong> warms water, air, and floors off your diesel tank.</motion.li>
                        </motion.ul>
                    </div>
                    <p className="space-y-6 max-w-[893px] mx-auto text-base font-normal text-gray-600 text-center md:text-left mt-4">
                        Just pay, sign, and drive away in your new mobile home.
                    </p>

                </motion.div>

                {/* Swiper Slider Section (Changed for mobile view and buttons) */}
                <motion.div
                    className="relative mb-12"
                    variants={slideInRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <Swiper
                        ref={swiperRef}
                        modules={[Navigation]}
                        loop={false}
                        // UPDATED: Responsive breakpoints for Swiper to adjust spacing and slide view
                        breakpoints={{
                            0: {
                                slidesPerView: 1.2,
                                spaceBetween: 15,
                                centeredSlides: true,
                            },
                            768: {
                                slidesPerView: 'auto',
                                spaceBetween: 30, // Default desktop spacing
                                centeredSlides: true,
                            },
                        }}
                        className="!pb-16"
                    >
                        {data.map((slide, i) => (
                            // UPDATED: Removed fixed width on mobile view and updated image sizing
                            <SwiperSlide key={i} className="group md:!w-[900px] md:!h-[500px]">
                                <div className="relative w-full h-[450px] md:h-full text-white rounded-[30px] overflow-hidden shadow-lg transition-all duration-500 ease-in-out group-hover:shadow-2xl group-hover:scale-[1.03]">
                                    {/* Background Image */}
                                    <img
                                        src={slide.img}
                                        alt={slide.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 via-black/50 to-transparent transition-all duration-500 ease-in-out group-hover:bg-black/20 group-hover:from-black/70 group-hover:via-black/30"></div>

                                    {/* Content */}
                                    <div className="relative z-10 flex flex-col justify-between items-start w-full h-full p-4 md:p-10 text-left">
                                        <h3 className="text-xl md:text-3xl font-semibold whitespace-pre-line leading-tight md:leading-normal">
                                            {slide.title}
                                        </h3>
                                        <div className="w-full max-w-[650px]">
                                            <p className="text-sm md:text-base font-normal mb-5">{slide.desc}</p>
                                            <div className="flex gap-4">
                                              <Link to='/contact'>   <button className="bg-white text-black font-serif font-bold text-sm px-4 md:px-6 py-2 rounded-md transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                                                    Buy Now
                                                </button></Link>
                                                <button className="bg-[#2761FD] text-white font-serif font-bold text-sm px-4 md:px-6 py-2 rounded-md transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                                                    More Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {/* UPDATED: Navigation buttons for mobile view */}
                    <div className="absolute bottom-0 right-4 md:right-8 lg:right-16 flex gap-4 mb-4 md:mb-0 z-20 translate-y-2 md:translate-y-0">
                        <button
                            onClick={() => swiperRef.current?.swiper.slidePrev()}
                            className="w-12 h-12 bg-[#2761FD] rounded-full flex items-center justify-center transition-all duration-300 opacity-90 hover:opacity-100 hover:scale-110"
                        >
                            <span className="rotate-180"><ArrowIcon /></span>
                        </button>
                        <button
                            onClick={() => swiperRef.current?.swiper.slideNext()}
                            className="w-12 h-12 bg-[#2761FD] rounded-full flex items-center justify-center transition-all duration-300 opacity-90 hover:opacity-100 hover:scale-110"
                        >
                            <ArrowIcon />
                        </button>
                    </div>
                </motion.div>

                {/* Bottom Call-to-Action Section (No changes here) */}
                <motion.div
                    className="text-center mt-16"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >

                 <Link to="/vans-for-sale">
                    <button className="bg-[#2761FD] text-white font-serif font-bold text-sm px-8 py-3 rounded-md transform transition-transform duration-300 hover:scale-105">
                        View Van Inventory
                    </button>
                </Link>
                </motion.div>
            </div>
        </section>
    );
}