"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Heading2, RichParagraph, SecondaryButton, ImageWithSkeleton } from "../Common/Common";

export default function Customize({
  sectionTitle = "Personalize Your Build",
  image = [],
  descriptionList = [],
  orderButtonLabel = "Order Custom Build",
  orderButtonLink = "/build-your-own-camper-van",
  showButton = true,
  className = ""
}) {
  // Normalize images into an array of objects
  const imageList = Array.isArray(image)
    ? image.map((img) => (typeof img === "string" ? { img } : img))
    : image
    ? [{ img: typeof image === "string" ? image : image?.image || image?.img }]
    : [];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const currentImageSrc = imageList[selectedImageIndex]?.img || "";
  const currentImageLink = imageList[selectedImageIndex]?.link;

  return (
    <section className={`bg-secondary/20 py-12 md:py-20 antialiased overflow-hidden ${className}`}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* LEFT: Image Container (Square aspect ratio) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="relative group w-full aspect-square rounded-2xl overflow-hidden shadow-xl border border-white/60 bg-white/50 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl">

              {/* Featured Image */}
              {currentImageSrc ? (
                <ImageWithSkeleton
                  src={currentImageSrc}
                  alt={sectionTitle}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary/40 font-medium">
                  No Image Available
                </div>
              )}

              {/* Optional Link Overlay on Main Image */}
              {currentImageLink && (
                <Link
                  href={currentImageLink}
                  className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold text-sm backdrop-blur-[2px]"
                >
                  View Details →
                </Link>
              )}

              {/* Gradient Overlay for subtle depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Thumbnail Navigation (Visible if more than 1 image) */}
            {imageList.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin">
                {imageList.map((imgObj, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 aspect-square rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImageIndex === idx
                        ? "border-primary ring-2 ring-primary/30 scale-105"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <ImageWithSkeleton
                      src={imgObj.img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Content Section */}
          <div className="lg:col-span-6 flex flex-col justify-center">

            {/* Category/Badge Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase w-fit mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Customization Options
            </div>

            {/* Section Title */}
            <Heading2 text={sectionTitle} className="!mb-6 text-primary !text-3xl md:!text-4xl font-bold leading-tight" />

            {/* Feature Bullet Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-8">
              {descriptionList.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-white/40 hover:bg-white/80 transition-all duration-300 border border-white/60 shadow-sm">
                  {/* Styled Check Icon */}
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <RichParagraph className="!mb-0 text-sm text-gray-700 leading-snug font-medium">
                    {item.text}
                  </RichParagraph>
                </div>
              ))}
            </div>

            {/* Action Button Section */}
            {showButton && (
              <div className="pt-6 border-t border-primary/10">
                <SecondaryButton
                  label={orderButtonLabel}
                  link={orderButtonLink}
                  className="!rounded-xl !px-8 !py-4 w-full sm:w-fit shadow-lg shadow-secondary/20 transition-transform active:scale-95"
                />
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}