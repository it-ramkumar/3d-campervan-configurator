"use client";
import React, { useRef } from "react";
import BlackButton from "../../Common/Button/BlackButton";
import ImageWithSkeleton from "../../Common/ImageWithSkeleton/ImageWithSkeleton";

const images = [
  { id: 1, src: "/images/p1.webp", alt: "Spacious custom van interior with wood paneling" },
  { id: 2, src: "/images/p2.webp", alt: "Overhead view of a custom van kitchen and seating area" },
  { id: 3, src: "/images/p3.webp", alt: "Detailed shot of a compact van kitchenette" },
  { id: 4, src: "/images/p4.webp", alt: "Cozy sleeping nook inside a custom camper van" },
  { id: 5, src: "/images/p5.webp", alt: "Van interior showing storage solutions and seating" },
];

export default function Portfolio() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const imageGridRef = useRef(null);

  return (
    // FIX: Changed py-12 to pt-6 for reduced mobile top padding, and lg:pt-12 pb-12 for desktop and bottom padding.
    <section ref={sectionRef} className="w-full pt-6 lg:pt-12 pb-12 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Heading + Desc */}
        {/* FIX 2: Reduced bottom margin from mb-16 to mb-8 */}
        <div className="text-center mb-8">
          <h2
            ref={headingRef}
            className="font-serif font-bold text-5xl leading-tight text-black max-w-3xl mx-auto"
          >
            From Dream to Your Driveway
          </h2>
          <p
            ref={subHeadingRef}
            className="font-serif text-xl text-black/70 max-w-4xl mx-auto mt-4"
          >
            Take a look at some of our best custom vans.
          </p>
        </div>

        {/* --- DESKTOP VIEW --- */}
        <div
          ref={imageGridRef}
          className="mx-auto max-w-screen-xl h-[725px] hidden lg:block"
          style={{ perspective: "1500px" }}
        >
          <div className="flex h-full gap-4">
            {/* Left Column (Image 1) */}
            <div
              className="image-container relative rounded-[28px] overflow-hidden border-2 border-gray-800 shadow-2xl w-[492px] h-[725px]"
              style={{ transformStyle: "preserve-3d" }}
              data-side="left"
            >
              <ImageWithSkeleton
                src={images[0].src}
                alt={images[0].alt}
                className="w-full h-full object-cover"

              />
            </div>


            {/* Right Column */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Top Image (Image 2) */}
              <div
                className="image-container relative rounded-[28px] overflow-hidden border-2 border-gray-800 shadow-2xl w-[699px] h-[402px]"
                style={{ transformStyle: "preserve-3d" }}
                data-side="right"
              >
                <ImageWithSkeleton
                  src={images[1].src}
                  alt={images[1].alt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom Row Images (3, 4, 5) */}
              <div className="flex-1 flex gap-4">
                {images.slice(2).map((image) => (
                  <div
                    key={image.id}
                    className="image-container relative rounded-[28px] overflow-hidden border-2 border-gray-800 shadow-2xl w-[227px] h-[313px]"
                    style={{ transformStyle: "preserve-3d" }}
                    data-side="right"
                  >
                    <ImageWithSkeleton
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"

                    />
                  </div>

                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- MOBILE VIEW --- */}
        <div className="block lg:hidden mt-8">
          {/* First row: 2 images */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {images.slice(0, 2).map((image) => (
              <div
                key={image.id}
                className="relative h-64 rounded-xl overflow-hidden shadow-lg border-2 border-gray-800"
              >
                <ImageWithSkeleton
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>

            ))}
          </div>
          {/* Second row: 3 images */}
          <div className="grid grid-cols-3 gap-4">
            {images.slice(2).map((image) => (
              <div
                key={image.id}
                className="relative h-40 rounded-xl overflow-hidden shadow-lg border-2 border-gray-800"
              >
                <ImageWithSkeleton
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"

                />
              </div>

            ))}
          </div>
        </div>

        {/* --- CHANGE 2: UPDATED THE BUTTON --- */}
        <div className="flex justify-center mt-16">
          <BlackButton label="View Our Portfolio" link="/layouts" />

        </div>
      </div>
    </section>
  );
}