"use client";
import React from "react";
import { Heading2, RichParagraph, ImageWithSkeleton, SecondaryButton } from '../../Common/Common'

const images = [
  { id: 1, src: "/images/p1.webp",alt: "Overhead view of kitchen", tag: "Kitchenette"
     },
  { id: 2, src: "/images2/finance.webp",alt: "Spacious custom van interior", tag: "Living Space"  },
  { id: 3, src: "/images/p3.webp", alt: "Compact kitchenette", tag: "Details" },
  { id: 4, src: "/images/p4.webp",alt: "Storage solutions", tag: "Storage" },
  { id: 5, src: "/images/p5.webp", alt: "Sleeping nook", tag: "Comfort"  },
];

export default function Portfolio() {

const PortfolioImage = ({ img, className }) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-lg border-2 border-white shadow-sm transition-all duration-500 hover:shadow-xl ${className}`}
    >
      <ImageWithSkeleton
        src={img.src}
        alt={img.alt}


      />

      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
        <span className="text-secondary text-[10px] font-black uppercase tracking-[0.2em] bg-hover px-3 py-1.5 rounded-lg shadow-lg">
          {img.tag}
        </span>
      </div>
    </div>
  );
};
  return (
    // Background secondary (#F5F5F0) use kiya hai taake sequence barkarar rahe
    <section className="w-full py-20 bg-secondary antialiased">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* --- Header --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-primary/10 pb-10">
          <div className="max-w-2xl">
            <RichParagraph className="!text-hover font-bold !text-sm tracking-wider uppercase mb-3 block">Our Craft</RichParagraph>
            <Heading2 text="From Dream to Your Driveway" />
            <RichParagraph className="mt-4">
              Explore the craftsmanship and attention to detail in our best custom van conversions.
            </RichParagraph>
          </div>
        </div>

        {/* --- DESKTOP VIEW (Bento Grid) --- */}
        <div className="hidden lg:grid grid-cols-12 gap-[var(--gap-sm)] h-[750px]">
          {/* Main Large Image */}
          <div className="col-span-5 h-full">
             <PortfolioImage img={images[0]} className="h-full" />
          </div>

          {/* Right Side Complex Grid */}
          <div className="col-span-7 grid grid-rows-12 gap-[var(--gap-sm)] h-full">
             {/* Middle Wide Image */}
             <div className="row-span-7">
                <PortfolioImage img={images[1]} className="h-full" />
             </div>
             {/* Bottom Three Small Images */}
             <div className="row-span-5 grid grid-cols-3 gap-sm">
                {images.slice(2).map((img) => (
                   <PortfolioImage key={img.id} img={img} className="h-full" />
                ))}
             </div>
          </div>
        </div>

        {/* --- MOBILE VIEW --- */}
        <div className="flex flex-col gap-sm lg:hidden">
          {images.slice(0, 4).map((img) => (
            <div key={img.id} className="w-full relative h-[250px]">
              <PortfolioImage img={img} className="w-full h-full" />
            </div>
          ))}
        </div>

        {/* --- Action CTA --- */}
        <div className="flex flex-col items-center mt-12 lg:mt-20">
          <SecondaryButton
            label="Explore Full Gallery"
            link="/van-layouts"
            className="!rounded-lg !px-12 !py-4 shadow-lg hover:-translate-y-1 transition-all"
          />
          <p className="mt-6 text-[10px] font-black uppercase tracking-widest text-primary/40">
              Updated Weekly • 2026 Collection
          </p>
        </div>

      </div>
    </section>
  );
}