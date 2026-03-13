"use client";
import React, { useState } from "react";
// import { ChevronRight, Plus, Minus, Settings2 } from "lucide-react";
import { Heading2, Heading3, RichParagraph, ImageWithSkeleton, SecondaryButton, CustomLink } from '../Common/Common'

export default function Customize({
  mainTitle = "Custom Build",
  sectionTitle = "Personalize Your Build",
  description = "",
  descriptionList = [],
  image = "/images/custom4.webp",
  orderButtonLabel = "Order Custom Build",
  orderButtonLink = "/inquiry",
  showButton = true,
  className = ""
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className={`bg-secondary py-16 antialiased overflow-hidden ${className}`}>
      <div className="container mx-auto px-4 max-w-7xl">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* LEFT: Image Container with FIXED Height */}
          <div className="relative group">
            {/* Div size fixed at 400px, background matches theme */}
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-lg border-2 border-white bg-primary/10 transition-all duration-500 group-hover:shadow-2xl flex items-center justify-center">

              <ImageWithSkeleton
                src={image}
                alt="Customization"
                /* object-contain: Poori image dikhayega bina cut kiye.
                   w-full h-full: Div ke andar rahegi.
                */
                className="w-full h-full object-contain object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Overlay - Subtle taaki image ke upar text nazar aaye */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent pointer-events-none"></div>

              {/* Overlay Content */}
              <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                <Heading3 text={mainTitle} className="!text-secondary !mb-1  drop-shadow-md" />
                <RichParagraph className="text-secondary !mb-0 line-clamp-1 !text-sm">{description}</RichParagraph>
              </div>
            </div>

            {/* Subtle Accent Background - Rounded as per your preference */}
            <div className="absolute -z-10 -top-4 -left-4 w-24 h-24 bg-secondary/30 rounded-lg blur-xl"></div>
          </div>

          {/* RIGHT: Content Section */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              {/* <Settings2 className="w-6 h-6 text-primary" /> */}
              <Heading2 text={sectionTitle} className="!mb-0 text-primary" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-8">
              {(expanded ? descriptionList : descriptionList).map((item, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary group-hover:bg-primary transition-colors shrink-0"></div>
                  <RichParagraph className="!mb-0 ">
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
    </section>
  );
}