"use client";
import React from "react";
import { Heading2, RichParagraph, ImageWithSkeleton, SecondaryButton, SpanTag } from '../../Common/Common'

const images = [
  { id: 1, src: "/Home/home-portfolio-big-bear-vans.webp",   alt: "Overhead view of kitchen",    tag: "Kitchenette"   },
  { id: 2, src: "/Home/home-elevator-bed-big-bear.webp", alt: "Spacious custom van interior", tag: "Living Space With Elevator Bed"  },
  { id: 3, src: "/images/p3.webp",   alt: "Compact kitchenette",          tag: "Details"       },
  { id: 4, src: "/images/p4.webp",   alt: "Storage solutions",            tag: "Storage"       },
  { id: 5, src: "/images/p5.webp",   alt: "Sleeping nook",                tag: "Comfort"       },
];

export default function Portfolio() {

  const PortfolioImage = ({ img, className }) => (
    <div className={`group relative overflow-hidden rounded-lg shadow-md transition-all duration-500 hover:shadow-2xl ${className}`}>
      <ImageWithSkeleton src={img.src} alt={img.alt} />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/25 transition-colors duration-500 pointer-events-none" />

      {/* Tag — always visible, turns orange on hover */}
      <div className="absolute bottom-4 left-4">
        <SpanTag text={img.tag} className="px-4 py-1 rounded-lg shadow-lg bg-secondary/90 text-primary group-hover:bg-hover group-hover:text-white transition-all duration-300"/>


      </div>
    </div>
  );

  return (
    <section className="w-full py-20 bg-secondary antialiased overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-primary/10 pb-10 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <SpanTag text={"Our Craft"} />
            </div>
            <Heading2
              textColor="text-primary"
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95]"
            >
              From Dream to<br />
              <span className="text-hover">Your Driveway</span>
            </Heading2>
          </div>

          <RichParagraph className="text-primary max-w-xs md:text-right flex-shrink-0">
            Explore the craftsmanship and attention to detail in our best custom van conversions.
          </RichParagraph>
        </div>

        {/* ── BENTO GRID — Desktop ── */}
        <div className="hidden lg:grid grid-cols-12 gap-4 h-[750px]">

          {/* Main large left image */}
          <div className="col-span-5 h-full">
            <PortfolioImage img={images[0]} className="h-full" />
          </div>

          {/* Right side complex grid */}
          <div className="col-span-7 grid grid-rows-12 gap-4">
            <div className="row-span-7">
              <PortfolioImage img={images[1]} className="h-full" />
            </div>
            <div className="row-span-5 grid grid-cols-3 gap-4">
              {images.slice(2).map((img) => (
                <PortfolioImage key={img.id} img={img} className="h-full" />
              ))}
            </div>
          </div>
        </div>

        {/* ── MOBILE VIEW ── */}
        <div className="flex flex-col gap-4 lg:hidden">
          {images.slice(0, 4).map((img) => (
            <div key={img.id} className="w-full relative h-[250px]">
              <PortfolioImage img={img} className="w-full h-full" />
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="flex flex-col items-center mt-14">
          <SecondaryButton
            label="Explore Full Gallery"
            link="/van-layouts"
            className="!rounded-lg !px-12 !py-4 shadow-md hover:-translate-y-1 transition-all"
          />
          <SpanTag text={" Updated Weekly • 2026 Collection"} className="mt-5  uppercase tracking-widest text-primary/30"/>


        </div>

      </div>
    </section>
  );
}
