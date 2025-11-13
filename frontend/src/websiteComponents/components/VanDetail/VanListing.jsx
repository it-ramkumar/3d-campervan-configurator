"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import ImageWithSkeleton from "../Common/ImageWithSkeleton/ImageWithSkeleton";

// --- SVG Icons (no design change) ---
const SvgInsulation = ({ className }) => (
  <svg
    className={`w-[59px] h-[59px] transition-colors duration-300 ${className}`}
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      className="fill-black group-hover:fill-[#2761FD]"
    />
    <path
      d="M9 16H15M9 8H15M12 5V19"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SvgElectric = ({ className }) => (
  <svg
    className={`w-[59px] h-[59px] transition-colors duration-300 ${className}`}
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      className="fill-black group-hover:fill-[#2761FD]"
    />
    <path
      d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SvgWater = ({ className }) => (
  <svg
    className={`w-[59px] h-[59px] transition-colors duration-300 ${className}`}
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      className="fill-black group-hover:fill-[#2761FD]"
    />
    <path
      d="M6 14C6 17.3137 8.68629 20 12 20C15.3137 20 18 17.3137 18 14C18 10 12 4 12 4C12 4 6 10 6 14Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SvgInterior = ({ className }) => (
  <svg
    className={`w-[59px] h-[59px] transition-colors duration-300 ${className}`}
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      className="fill-black group-hover:fill-[#2761FD]"
    />
    <path
      d="M21 8H3M21 12H3M21 16H3M7 20H17C18.1046 20 19 19.1046 19 18V6C19 4.89543 18.1046 4 17 4H7C5.89543 4 5 4.89543 5 6V18C5 19.1046 5.89543 20 7 20Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SvgSeating = ({ className }) => (
  <svg
    className={`w-[59px] h-[59px] transition-colors duration-300 ${className}`}
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      className="fill-black group-hover:fill-[#2761FD]"
    />
    <path
      d="M17 16H7C5.89543 16 5 15.1046 5 14V8C5 6.89543 5.89543 6 7 6H17C18.1046 6 19 6.89543 19 8V14C19 15.1046 18.1046 16 17 16ZM12 6V10M12 10H17M12 10H7"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SvgExterior = ({ className }) => (
  <svg
    className={`w-[59px] h-[59px] transition-colors duration-300 ${className}`}
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      className="fill-black group-hover:fill-[#2761FD]"
    />
    <path
      d="M3 12H21M12 3V21M7 7L17 17M7 17L17 7"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const VanPage = ({ vanDetail }) => {
  const heroRef = useRef(null);


  const van = {
    hero: {
      titlePrimary: vanDetail?.van_listing?.title?.split(" ")[0] || "",
      titleSecondary:
        vanDetail?.van_listing?.title?.split(" ").slice(1).join(" ") || "",
      tagline: vanDetail?.van_listing?.description || "",
      backgroundImage: vanDetail?.gallery?.[0] || "/default-hero.jpg",
    },
    specifications: [
      {
        label: "MAKE & MODEL",
        value: vanDetail?.van_listing?.specifications?.make_model || "-",
      },
      {
        label: "WHEELBASE",
        value: vanDetail?.van_listing?.specifications?.wheelbase || "-",
      },
      {
        label: "DRIVETRAIN",
        value: vanDetail?.van_listing?.specifications?.drivetrain || "-",
      },
      {
        label: "SIT & SLEEP",
        value: `${vanDetail?.van_listing?.specifications?.capacity?.sits || "-"
          } – ${vanDetail?.van_listing?.specifications?.capacity?.sleeps || "-"}`,
      },
      { label: "PRICE", value: vanDetail?.formatted_price || "-" },
    ],
    detailed_features:
      vanDetail?.detailed_features?.map((feature) => {
        const icons = {
          "Insulation and Paneling": <SvgInsulation />,
          "Water System": <SvgWater />,
          Electrics: <SvgElectric />,
          "Seating and Sleeping": <SvgSeating />,
          Kitchen: <SvgInterior />,
          Exterior: <SvgExterior />,
        };
        return {
          icon: icons[feature.category] || <SvgExterior />,
          category: feature.category,
          items: feature.items || [],
        };
      }) || [],
    flagship: {
      title: "Our Exclusive Flagship in Short Vans",
      description:
        "Our Santa Monica V6 turbo is expertly designed for families of 4-5. This is one of its kind off-grid-ready campervans equipped with lithium batteries, solar panels, gray & fresh water tanks, and a reliable heating system. Ready to buy? Book a call to schedule your test drive.",
    },
    gallery: vanDetail?.gallery || [],
  };
  console.log(vanDetail, "vanDetail")
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bg-image",
        { scale: 1 },
        { scale: 1.1, duration: 15, ease: "none", repeat: -1, yoyo: true }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-gray-100 font-noto-serif">
      {/* ================= Hero Section ================= */}
      <div
        ref={heroRef}
        className="relative w-full h-[85vh] md:h-[500px] overflow-hidden text-white"
      >
        <ImageWithSkeleton
          src={vanDetail.gallery[0]}
          alt={`${vanDetail.van_listing.title} custom van`}
          className="bg-image absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-[linear-gradient(270.39deg,rgba(0,0,0,0)_0.33%,#000000_106.96%)]"></div>

        <div className="relative z-10 h-full text-left px-4 sm:px-8">
          <h1 className="font-extrabold text-4xl sm:text-5xl md:text-[60px] leading-tight max-w-2xl">
            <span className="pt-10">{vanDetail.van_listing.title}</span>

          </h1>
          <p className="text-lg md:text-2xl mt-4 max-w-2xl opacity-90">
            {vanDetail.van_listing.subtitle}
          </p>

          <div className="flex flex-wrap justify-start gap-x-8 gap-y-6 mt-8 md:mt-12">

            {/* Make & Model */}
            <div className="group py-2 cursor-pointer">
              <div className="relative pb-2">
                <p className="text-xs md:text-sm opacity-80">Make & Model</p>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2761FD] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-in-out"></div>
              </div>
              <p className="font-bold text-base md:text-lg mt-1 w-60">
                {vanDetail?.van_listing.specifications?.make_model || "N/A"}
              </p>
            </div>

            {/* Wheelbase */}
            <div className="group py-2 cursor-pointer">
              <div className="relative pb-2">
                <p className="text-xs md:text-sm opacity-80">Wheelbase</p>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2761FD] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-in-out"></div>
              </div>
              <p className="font-bold text-base md:text-lg mt-1">
                {vanDetail?.van_listing.specifications?.wheelbase || "N/A"}
              </p>
            </div>

            {/* Drivetrain */}
            <div className="group py-2 cursor-pointer">
              <div className="relative pb-2">
                <p className="text-xs md:text-sm opacity-80">Drivetrain</p>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2761FD] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-in-out"></div>
              </div>
              <p className="font-bold text-base md:text-lg mt-1">
                {vanDetail?.van_listing.specifications?.drivetrain || "N/A"}
              </p>
            </div>


            {/* Sit & Sleep */}
            <div className="group py-2 cursor-pointer">
              <div className="relative pb-2">
                <p className="text-xs md:text-sm opacity-80">Sit & Sleep</p>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2761FD] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-in-out"></div>
              </div>
              <p className="font-bold text-base md:text-lg mt-1">
                {vanDetail?.van_listing.specifications?.capacity?.sits || "0"} - {vanDetail?.van_listing.specifications?.capacity?.sleeps || "0"}
              </p>

            </div>
            {/* price */}
            {vanDetail.slug === "4x4-santa-monica-v6-turbo" && (
              <div className="group py-3 px-4  rounded-xl shadow-lg border border-gray-800 hover:border-[#2761FD] transition duration-300 cursor-pointer max-w-sm">

                {/* Label */}
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs md:text-sm">Price</p>
                  <span className="bg-[#FFD700] text-black text-[10px] font-bold px-2 py-1 rounded-full">
                    🎉 Black Friday Offer
                  </span>
                </div>

                {/* Animated underline */}
                <div className="relative pb-1">
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2761FD] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-in-out"></div>
                </div>

                {/* Price area */}
                <div className="flex items-end gap-2 mt-2">
                  <p className="text-gray-400 text-base md:text-lg line-through">
                    ${vanDetail?.van_listing?.originalPrice?.toLocaleString() || "224,543"}
                  </p>
                  <p className="font-bold text-2xl md:text-3xl text-[#FFD700] drop-shadow-sm">
                    ${"185,000"}
                  </p>
                </div>

                {/* Discount label */}
                <p className="text-xs text-green-400 mt-1"> Flat 17% Off</p>
              </div>
            )}


          </div>

          <Link to={"/contact"}>

            <button className="mt-8 md:mt-12 w-[154px] h-[39px] px-[20px] py-[10px] bg-white text-black font-noto-sans font-bold text-sm rounded-[5px] transition-all duration-300 ease-in-out hover:bg-[#2761FD] hover:text-white hover:shadow-lg hover:-translate-y-1">
              Book A Call Now
            </button>
          </Link>

        </div>
      </div>

      {/* ================= Key Features ================= */}
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
                <h3 className="font-black text-2xl mt-4 mb-6">
                  {feature.category}
                </h3>
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
            <Link to={"/contact"}>
              <button className="px-5 py-2.5 bg-[#2761FD] text-white font-noto-sans font-bold text-sm rounded-md transition-all duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1">
                Buy Now
              </button>
            </Link>

          </div>
        </div>
      </div>

      {/* ================= Flagship ================= */}
      <div className="px-8 md:pl-[132px] md:pr-16 bg-gray-50">
        <div className="max-w-3xl text-left py-8">
          <h2 className="font-bold text-4xl mb-6">{vanDetail.van_listing.title}</h2>
          <p className="text-xl font-normal leading-relaxed mb-8">
            {vanDetail.van_listing.description}
          </p>
          <Link to={"/contact"}>
            <button className="px-5 py-2.5 bg-[#2761FD] text-white font-noto-sans font-bold text-sm rounded-md transition-all duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1">
              Book a call now
            </button></Link>
        </div>
      </div>

      {/* ================= Gallery ================= */}
      <div className="p-8 md:p-16 bg-white">
        {van.gallery.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {van.gallery.map((img, i) => (
              <ImageWithSkeleton
                key={i}
                src={img}
                alt={img}
                className="w-full h-64 object-cover "
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No gallery images available.</p>
        )}
      </div>
      {/* ================= Video Section ================= */}
      {vanDetail.media && vanDetail.media.length > 0 && (
        <div className="w-full bg-black py-16 px-4 md:px-16">
          <h2 className="text-center font-bold text-white text-4xl mb-10">
            Watch Video
          </h2>

          <div
            className={`grid gap-8 ${vanDetail.media.length === 1
                ? "grid-cols-1"
                : vanDetail.media.length === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }`}
          >
            {vanDetail.media.map((videoUrl, index) => {
              let embedUrl = videoUrl.trim();

              // ✅ Handle youtu.be format
              if (embedUrl.includes("youtu.be/")) {
                embedUrl = embedUrl.replace("youtu.be/", "www.youtube.com/embed/");
              }
              // ✅ Handle watch?v= format
              else if (embedUrl.includes("watch?v=")) {
                embedUrl = embedUrl.replace("watch?v=", "embed/");
              }
              // ✅ Handle shorts format
              else if (embedUrl.includes("youtube.com/shorts/")) {
                embedUrl = embedUrl.replace("youtube.com/shorts/", "youtube.com/embed/");
              }

              // Remove extra params like &t=5s
              embedUrl = embedUrl.split("&")[0];

              // ✅ Detect if it's a Shorts video
              const isShorts = videoUrl.includes("/shorts/");

              return (
                <div
                  key={index}
                  className="relative w-full overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-[1.02]"
                >
                  <div
                    className={`relative w-full ${isShorts
                        ? "aspect-[9/16] max-w-[400px] mx-auto" // 🎥 Tall for Shorts
                        : "aspect-video" // 📺 Normal landscape video
                      }`}
                  >
                    <iframe
                      src={`${embedUrl}?rel=0&modestbranding=1`}
                      title={`video-${index}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full border-0 rounded-2xl"
                    ></iframe>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}





    </div>
  );
};

export default VanPage;
