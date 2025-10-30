"use client";

const heroImage = "/heroSlider/Showroomhero.webp";

export default function Hero() {
  return (
    <div className="relative w-full h-[60vh] md:h-[90vh] overflow-hidden">
      {/* Background Image with a slow zoom (Ken Burns effect) */}
      <img
        src={heroImage}
        alt="Interior of a custom converted van"
        className="absolute inset-0 w-full h-full object-cover scale-100 animate-zoomSlow"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Text Content */}
      <div className="relative flex flex-col items-start justify-center h-full text-left px-8 md:px-16 lg:px-24">
        {/* Heading */}
        <h1 className="animate-fadeInUp font-serif font-bold text-4xl md:text-[64px] text-white leading-tight drop-shadow-xl max-w-4xl">
          Visit Our Showroom in Big Bear,{" "}
          <span className="text-[#2761FD]">California</span>
        </h1>

        {/* Subheading */}
        <p className="animate-fadeInUp mt-4 font-serif font-normal text-lg md:text-xl text-white opacity-90 drop-shadow-lg max-w-2xl delay-200">
          Want us to customize your van? The best way to get started is by
          visiting our van workshop in Big Bear City, California.
        </p>
      </div>
    </div>
  );
}
