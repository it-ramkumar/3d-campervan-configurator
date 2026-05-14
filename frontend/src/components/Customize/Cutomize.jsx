"use client";
import React from "react";
// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";


// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

    import { Heading2, RichParagraph, SecondaryButton,ImageWithSkeleton } from '../Common/Common'

export default function Customize({
  sectionTitle = "Personalize Your Build",
  image = "",
  descriptionList = [],
  orderButtonLabel = "Order Custom Build",
  orderButtonLink = "/inquiry",
  showButton = true,
  className = ""
}) {

  // Logic: Agar array hai aur length > 1 hai, tabhi slider chalayen
  const isSlider = Array.isArray(image) && image.length > 1;

const singleImageSrc = typeof image === "string" ? image : image?.image || image?.img;

  return (
    <section className={`bg-secondary py-8 antialiased overflow-hidden ${className}`}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* LEFT: Image/Slider Container */}
          <div className="relative group w-full">
            <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-lg border-2 border-white bg-primary/10 transition-all duration-500 group-hover:shadow-2xl flex items-center justify-center">

              {isSlider ? (
                /* CASE 1: MULTIPLE IMAGES (SLIDER) */
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={10}
                  slidesPerView={1.1}
                  breakpoints={{
                    // Jab screen 768px (Tablet/Desktop) ya us se bari ho
                    768: {
                      slidesPerView: 2.1,
                    },
                    // Agar aap mazeed bari screen par 3 dikhana chahte hain
                    1024: {
                      slidesPerView: 2.1, // Ya 3, jaisa aapko behtar lage
                    }
                  }}
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  className="h-full w-full custom-swiper"
                >
{image.map((img, index) => (
              <SwiperSlide key={index}>
                <ImageWithSkeleton
                  src={img?.img || img} // Handle array of objects or strings
                  alt={`Customization ${index + 1}`}
                />
                {img.link && (
                  <div className="absolute ...">
                     <Link href={img.link}>...</Link>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          /* SINGLE IMAGE CASE */
          <ImageWithSkeleton
            src={singleImageSrc} // Call the helper function
            alt={sectionTitle}
          />
        )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent pointer-events-none z-10"></div>
            </div>

            {/* Accent Background decoration */}
            <div className="absolute -z-10 -top-4 -left-4 w-24 h-24 bg-secondary/30 rounded-lg blur-xl"></div>
          </div>

          {/* RIGHT: Content Section */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <Heading2 text={sectionTitle} className="!mb-0 text-primary" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-8">
              {descriptionList.map((item, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary group-hover:bg-primary transition-colors shrink-0"></div>
                  <RichParagraph className="!mb-0">
                    {item.text}
                  </RichParagraph>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-6 pt-6 border-t border-primary/10">
              {showButton && (
                <SecondaryButton
                  label={orderButtonLabel}
                  link={orderButtonLink}
                  className="!rounded-lg !px-10 !py-4 w-full sm:w-fit shadow-md shadow-secondary/10"
                />
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Global Style for Swiper dots and buttons */}
      <style>{`
        .custom-swiper .swiper-button-next,
        .custom-swiper .swiper-button-prev {
          color: white !important;
          transform: scale(0.5);
          opacity: 0;
          transition: all 0.3s ease;
        }
        .group:hover .swiper-button-next,
        .group:hover .swiper-button-prev {
          opacity: 1;
        }
        .custom-swiper .swiper-pagination-bullet-active {
          background: white !important;
        }
      `}</style>
    </section>
  );
}