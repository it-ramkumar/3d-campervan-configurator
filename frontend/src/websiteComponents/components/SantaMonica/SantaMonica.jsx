"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

// --- SVG Icon Components (No Changes) ---
const SvgInsulation = ({ className }) => (
  <svg className={`w-[59px] h-[59px] transition-colors duration-300 ${className}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" className="fill-black group-hover:fill-[#2761FD]" />
    <path d="M9 16H15M9 8H15M12 5V19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SvgElectric = ({ className }) => (
  <svg className={`w-[59px] h-[59px] transition-colors duration-300 ${className}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" className="fill-black group-hover:fill-[#2761FD]" />
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SvgWater = ({ className }) => (
  <svg className={`w-[59px] h-[59px] transition-colors duration-300 ${className}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" className="fill-black group-hover:fill-[#2761FD]" />
    <path d="M6 14C6 17.3137 8.68629 20 12 20C15.3137 20 18 17.3137 18 14C18 10 12 4 12 4C12 4 6 10 6 14Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SvgInterior = ({ className }) => (
  <svg className={`w-[59px] h-[59px] transition-colors duration-300 ${className}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" className="fill-black group-hover:fill-[#2761FD]" />
    <path d="M21 8H3M21 12H3M21 16H3M7 20H17C18.1046 20 19 19.1046 19 18V6C19 4.89543 18.1046 4 17 4H7C5.89543 4 5 4.89543 5 6V18C5 19.1046 5.89543 20 7 20Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SvgSeating = ({ className }) => (
  <svg className={`w-[59px] h-[59px] transition-colors duration-300 ${className}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" className="fill-black group-hover:fill-[#2761FD]" />
    <path d="M17 16H7C5.89543 16 5 15.1046 5 14V8C5 6.89543 5.89543 6 7 6H17C18.1046 6 19 6.89543 19 8V14C19 15.1046 18.1046 16 17 16ZM12 6V10M12 10H17M12 10H7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SvgExterior = ({ className }) => (
  <svg className={`w-[59px] h-[59px] transition-colors duration-300 ${className}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" className="fill-black group-hover:fill-[#2761FD]" />
    <path d="M3 12H21M12 3V21M7 7L17 17M7 17L17 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


const VanPage = () => {
  const heroRef = useRef(null);

  // --- Centralized Data Object ---
  const van = {
    hero: {
      titlePrimary: "Santa Monica",
      titleSecondary: "V6 Turbo",
      tagline: "Versatile Comfort for Unforgettable Family Adventures",
      backgroundImage: "/heroSlider/santaa.jpg",
    },
    specifications: [
      { label: "MAKE & MODEL", value: "2022 Mercedes-Benz Sprinter" },
      { label: "WHEELBASE", value: "144" },
      { label: "DRIVETRAIN", value: "4X4" },
      { label: "SIT & SLEEP", value: "2 – 5" },
      { label: "PRICE", value: "$224,543" },
    ],
    detailed_features: [
      {
        icon: <SvgInsulation />,
        category: "Insulation and Paneling",
        items: [
          "4-season Thinsulate insulation",
          "Slatted wooden ceiling and wall panels",
          "Marine-style heavy-duty flooring",
        ],
      },
      {
        icon: <SvgWater />,
        category: "Water System",
        items: [
          "30-gal freshwater tank",
          "20-gal grey water tank",
          "Aluminum shower with L tracks and toilet (dry-flush or separating)",
        ],
      },
      {
        icon: <SvgElectric />,
        category: "Electrics",
        items: [
          "1200Ah lithium batteries",
          "2000W inverter",
          "200-400W of solar panels",
          "30A shore power",
          "Combined DCDC charger and solar controller",
          "110V outlets with USB-C and A ports",
          "Advanced glycol water and air heater",
          "12V roof-mounted AC",
        ],
      },
      {
        icon: <SvgSeating />,
        category: "Seating and Sleeping",
        items: [
          "Elevator bed with expandable sides with a custom mattress",
          "Dinette benches transform into a full-size bed",
          "Double swivel seats up front that fold flat into a bed",
          "The 5th extra click-in seat is available",
        ],
      },
      {
        icon: <SvgInterior />,
        category: "Kitchen",
        items: [
          "12V 3.2 cu ft fridge and freezer",
          "Induction cooktop and built-in microwave",
          "Deep sink with an insert and drainer",
          "Functional drawers and a pull-out pantry",
          "Pop-up countertop extension",
          "Wall cabinets with shelves",
        ],
      },
      {
        icon: <SvgExterior />,
        category: "Exterior",
        items: [
          "Side ladder",
          "Roof deck with a foldable hammock",
          "Motorized awning",
          "Double-glazed awning-style windows with built-in blackout curtains and mosquito nets",
          "Flares Raptor painted with insulated inserts",
        ],
      },
    ],
    flagship: {
        title: "Our Exclusive Flagship in Short Vans",
        description: "Our Santa Monica V6 turbo is expertly designed for families of 4-5. This is one of its kind off-grid-ready campervans equipped with lithium batteries, solar panels, gray & fresh water tanks, and a reliable heating system. Ready to buy? Book a call to schedule your test drive."
    },
    gallery: [
      { src: "/santamonica/santa1.jpg", alt: "Spacious interior of the Santa Monica van", layout: "full" },
      { src: "/santamonica/santa2.jpg", alt: "Custom seating arrangement in the van", layout: "grid-3" },
      { src: "/santamonica/santa3.jpg", alt: "Compact and modern kitchen area", layout: "grid-3" },
      { src: "/santamonica/santa4.png", alt: "Comfortable sleeping area with a view", layout: "grid-3" },
      { src: "/santamonica/santa5.jpg", alt: "Scenic view from the van's interior", layout: "grid-2-span" },
      { src: "/santamonica/santa6.jpg", alt: "Driver and passenger swivel seats", layout: "grid-2-single" },
      { src: "/santamonica/santa7.jpg", alt: "Van kitchen illuminated at night", layout: "full" },
    ]
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bg-image",
        { scale: 1 },
        {
          scale: 1.1,
          duration: 15,
          ease: "none",
          repeat: -1,
          yoyo: true,
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Helper to render gallery images based on layout property
  const renderGallery = () => (
    <div className="max-w-5xl mx-auto space-y-6">
        <img
            src={van.gallery[0].src}
            alt={van.gallery[0].alt}
            className="w-full h-auto object-cover rounded-lg border border-gray-700 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:rounded-2xl hover:brightness-110 origin-center"
        />
        <div className="grid grid-cols-3 gap-6">
            <img
                src={van.gallery[1].src}
                alt={van.gallery[1].alt}
                className="w-full h-40 md:h-64 object-cover rounded-lg border border-gray-700 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:rounded-2xl hover:brightness-110 origin-center"
            />
            <img
                src={van.gallery[2].src}
                alt={van.gallery[2].alt}
                className="w-full h-40 md:h-64 object-cover rounded-lg border border-gray-700 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:rounded-2xl hover:brightness-110 origin-center"
            />
            <img
                src={van.gallery[3].src}
                alt={van.gallery[3].alt}
                className="w-full h-40 md:h-64 object-cover rounded-lg border border-gray-700 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:rounded-2xl hover:brightness-110 origin-center"
            />
        </div>
        <div className="grid grid-cols-3 gap-6">
            <img
                src={van.gallery[4].src}
                alt={van.gallery[4].alt}
                className="col-span-2 w-full h-full object-cover rounded-lg border border-gray-700 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:rounded-2xl hover:brightness-110 origin-center"
            />
            <img
                src={van.gallery[5].src}
                alt={van.gallery[5].alt}
                className="w-full h-full object-cover rounded-lg border border-gray-700 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:rounded-2xl hover:brightness-110 origin-center"
            />
        </div>
        <img
            src={van.gallery[6].src}
            alt={van.gallery[6].alt}
            className="w-full h-auto object-cover rounded-lg border border-gray-700 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:rounded-2xl hover:brightness-110 origin-center"
        />
    </div>
  );

  return (
    <div className="bg-gray-100 font-noto-serif">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative w-full h-[85vh] md:h-[485px] overflow-hidden text-white"
      >
        <img
          src={van.hero.backgroundImage}
          alt={`${van.hero.titlePrimary} custom van`}
          className="bg-image absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(270.39deg,rgba(0,0,0,0)_0.33%,#000000_106.96%)]"></div>
        <div className="relative z-10 h-full flex flex-col justify-start md:justify-center items-start text-left px-4 pt-64 md:pt-0 sm:px-8 md:px-16">
          <h1 className="font-extrabold text-4xl sm:text-5xl md:text-[64px] leading-tight max-w-4xl">
            <span className="text-[#2761FD]">{van.hero.titlePrimary}</span> {van.hero.titleSecondary}
          </h1>
          <p className="text-lg md:text-2xl mt-4 max-w-2xl opacity-90">
            {van.hero.tagline}
          </p>
          <div className="flex flex-wrap justify-start gap-x-8 gap-y-6 mt-8 md:mt-12">
            {van.specifications.map((spec, index) => (
              <div key={index} className="group py-2 cursor-pointer">
                <div className="relative pb-2">
                  <p className="text-xs md:text-sm opacity-80">{spec.label}</p>
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2761FD] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-in-out"></div>
                </div>
                <p className="font-bold text-base md:text-lg mt-1">{spec.value}</p>
              </div>
            ))}
          </div>
          <button className="mt-8 md:mt-12 w-[154px] h-[39px] px-[20px] py-[10px] bg-white text-black font-noto-sans font-bold text-sm rounded-[5px] transition-all duration-300 ease-in-out hover:bg-[#2761FD] hover:text-white hover:shadow-lg hover:-translate-y-1">
            Book A Call Now
          </button>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center font-bold text-5xl text-black mb-16">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {van.detailed_features.map((feature, index) => (
              <div
                key={index}
                className="group w-full max-w-[400px] min-h-[430px] mx-auto bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-[10px_10px_18.8px_0px_rgba(0,0,0,0.25),-10px_-10px_22.6px_0px_rgba(0,0,0,0.25)] transition-all duration-300 ease-in-out hover:shadow-[10px_10px_25px_0px_rgba(0,0,0,0.3),-10px_-10px_30px_0px_rgba(0,0,0,0.3)] hover:-translate-y-2"
              >
                {feature.icon}
                <h3 className="font-black text-2xl mt-4 mb-6">{feature.category}</h3>
                <div className="w-full flex-grow text-left">
                  <ul className="space-y-2 font-normal text-base text-black">
                    {feature.items.map((item, i) => (
                      <li key={`item-${i}`} className="flex items-start">
                        <span className="flex-shrink-0 w-1.5 h-1.5 bg-black rounded-full mr-3 mt-[9px] group-hover:bg-[#2761FD] transition-colors duration-300"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <button className="px-5 py-2.5 bg-[#2761FD] text-white font-noto-sans font-bold text-sm rounded-md transition-all duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Exclusive Flagship Section */}
      <div className="px-8 md:pl-[132px] md:pr-16 bg-gray-50">
        <div className="max-w-3xl text-left py-8">
          <h2 className="font-bold text-4xl mb-6">{van.flagship.title}</h2>
          <p className="text-xl font-normal leading-relaxed mb-8">
            {van.flagship.description}
          </p>
          <div>
            <button className="px-5 py-2.5 bg-[#2761FD] text-white font-noto-sans font-bold text-sm rounded-md transition-all duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1">
              Book a call now
            </button>
          </div>
        </div>
      </div>

      {/* Image Gallery Section */}
      <div className="p-8 md:p-16 bg-white">
        {renderGallery()}
      </div>
    </div>
  );
};

export default VanPage;