"use client";
import { Link } from "react-router-dom";
import WhiteButton from "../../Common/Button/WhiteButton";

const heroImage = "/heroSlider/processhero.webp";

export default function Hero() {
  return (
    <div className="relative w-full h-[60vh] md:h-[90vh] overflow-hidden">
      {/* Background Image with slow zoom */}
      <img
        src={heroImage}
        alt="Interior of a custom converted van"
        className="absolute inset-0 w-full h-full object-cover animate-zoomSlow"
        loading="eager"
        decoding="async"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Text Content */}
      <div className="relative flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 md:px-8">
        {/* Heading */}
        <h1 className="font-serif font-extrabold text-4xl md:text-[64px] text-white leading-none drop-shadow-xl max-w-[981px] opacity-0 animate-fadeInUp animation-delay-200">
          Our Process At Big Bear Vans
        </h1>

        {/* Subheading */}
        <p className="mt-4 font-serif font-normal text-lg md:text-[28px] text-white opacity-90 leading-none drop-shadow-lg max-w-[902px] opacity-0 animate-fadeInUp animation-delay-500">
          A complete process of how we customize your dream custom van
        </p>

        {/* Button */}
        <div className="opacity-0 animate-fadeInUp animation-delay-700">
          <WhiteButton label={"Contact Us"} link={"/contact"} className="!mt-4" />
        </div>
      </div>
    </div>
  );
}
