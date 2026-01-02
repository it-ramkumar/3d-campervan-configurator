"use client";
import React from "react";
import BlackButton from "../../Common/Button/BlackButton";
import ImageWithSkeleton from "../../Common/ImageWithSkeleton/ImageWithSkeleton";

const images = [
  { id: 1, src: "/images/p1.webp", alt: "Spacious custom van interior" },
  { id: 2, src: "/images/p2.webp", alt: "Overhead view of kitchen" },
  { id: 3, src: "/images/p3.webp", alt: "Compact kitchenette" },
  { id: 4, src: "/images/p4.webp", alt: "Sleeping nook" },
  { id: 5, src: "/images/p5.webp", alt: "Storage solutions" },
];

export default function Portfolio() {
  // Mobile par height ko override karne ke liye !important style ya strict class
  const PortfolioImage = ({ img, className }) => (
    <div className={`relative rounded-xl overflow-hidden border-2 border-gray-800 shadow-sm ${className}`}>
      <ImageWithSkeleton
        src={img.src}
        alt={img.alt}
        className="absolute inset-0 w-full h-full object-cover" // Image ko container ke andar fit karne ke liye
      />
    </div>
  );

  return (
    <section className="w-full pt-6 lg:pt-12 pb-16 bg-white">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-6 lg:mb-16">
          <h2 className="font-serif font-bold text-3xl lg:text-5xl text-black">
            From Dream to Your Driveway
          </h2>
          <p className="font-serif text-sm lg:text-xl text-black/70 mt-2">
            Take a look at some of our best custom vans.
          </p>
        </div>

        {/* --- DESKTOP VIEW (Same as before) --- */}
        <div className="hidden lg:grid grid-cols-[492px_1fr] gap-4 max-w-screen-xl mx-auto h-[725px]">
          <PortfolioImage img={images[0]} className="h-full" />
          <div className="grid grid-rows-[402px_1fr] gap-4">
            <PortfolioImage img={images[1]} className="w-full" />
            <div className="grid grid-cols-3 gap-4">
              {images.slice(2).map((img) => (
                <PortfolioImage key={img.id} img={img} className="h-full" />
              ))}
            </div>
          </div>
        </div>

        {/* --- MOBILE VIEW (Strict Height Control) --- */}
        <div className="flex flex-col gap-3 lg:hidden">
          {images.map((img) => (
            <div key={img.id} className="w-full relative h-[160px]"> {/* Height ko 160px kar diya hai */}
              <PortfolioImage img={img} className="w-full h-full" />
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-center mt-8 lg:mt-16">
           <BlackButton label="View Our Portfolio" link="/layouts" />
        </div>

      </div>
    </section>
  );
}