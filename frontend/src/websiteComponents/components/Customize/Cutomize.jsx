"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import BlackButton from "../Common/Button/BlackButton";
import ImageWithSkeleton from "../Common/ImageWithSkeleton/ImageWithSkeleton";
import Heading2 from "../Common/Headings/Heading2";
import RichParagraph from "../Common/Paragraph/RichParagraph";
import Heading3 from "../Common/Headings/Heading3";

export default function Customize({
  mainTitle = "",
  sectionTitle,
  description = "",
  descriptionList = [],
  image = "/images/custom4.webp",
  orderButtonLabel = "Order Custom Build",
  orderButtonLink = "/inquiry",
  showToggle = true,
  lastText = "",
  showButton = true,
  className
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className={`pb-12 md:pb-24 pt-12 mt-10 md:mt-24 font-serif bg-gray-100 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
          <Heading2 text={mainTitle} className="py-4 md:py-6 text-gray-900" />
          <RichParagraph>{description}</RichParagraph>
        </div>

        {/* Main Grid: Mobile pe stack (1 col), Desktop pe 2 cols */}
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

          {/* Image Section: Responsiveness Fixed */}
          <div className="relative flex justify-center lg:justify-start">
            <div
              className="relative overflow-hidden shadow-2xl transition-all duration-300"
              style={{
                // Mobile pe 100% width, desktop pe 500px
                width: "100%",
                maxWidth: "500px",
                aspectRatio: "1/1", // Square shape maintain rakhega
                borderRadius: "30px",
                border: "2px solid #464444ff",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                backgroundColor: "white",
                padding: "1px"
              }}
            >
              <div
                className="w-full h-full overflow-hidden"
                style={{ borderRadius: "28px" }}
              >
                <ImageWithSkeleton
                  src={image}
                  alt="Custom van interior"
                  className="object-cover w-full h-full"
                  width={500}
                  height={500}
                />
              </div>
            </div>

            {/* Floating Badge: Mobile pe chota size */}
            <div className="absolute -top-4 right-0 lg:-right-4 bg-white rounded-2xl shadow-xl p-3 md:p-4 border border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs md:text-sm font-semibold text-gray-900">Premium Build</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full">
            <div className="mb-8">
              <Heading3
                text={sectionTitle}
                textColor="text-black mb-6"
              />

              {/* Features List */}
              <div
                className={`space-y-4 mb-6 transition-all duration-500 ease-in-out ${!expanded ? "max-h-[250px]" : "max-h-[1200px]"
                  } overflow-hidden relative`}
              >
                {descriptionList.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <Icon className="w-5 h-5 text-gray-700 flex-shrink-0 mt-1" />
                      <RichParagraph className="text-gray-700 text-sm md:text-base">
                        {item.text}
                      </RichParagraph>
                    </div>
                  );
                })}

                {/* Gradient Fade if collapsed */}
                {!expanded && (
                  <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-gray-100 to-transparent pointer-events-none"></div>
                )}
              </div>

              {/* Last Text Section */}
              {expanded && lastText && (
                <div className="mt-4 pt-4 border-t border-gray-200 animate-fadeIn">
                  <RichParagraph className="text-gray-700">
                    {lastText}
                  </RichParagraph>
                </div>
              )}

              {/* Toggle Button */}
              {showToggle && (
                <RichParagraph
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-2 text-blue-500 my-4 cursor-pointer"
                >
                  {expanded ? (
                    <><ChevronUp className="w-4 h-4" /> Show Less</>
                  ) : (
                    <><ChevronDown className="w-4 h-4" /> See More</>
                  )}
                </RichParagraph>
              )}

              {/* CTA Section */}
              {showButton && (
                <div className="space-y-4 mt-8">
                  <BlackButton
                    label={orderButtonLabel}
                    link={orderButtonLink}
                    className="w-full py-4 text-lg shadow-lg"
                  />
                  <RichParagraph className="text-center my-2">
                    Get a free quote within 24 hours

                  </RichParagraph>

                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}