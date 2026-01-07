"use client";
import React, { useRef, useState } from "react";
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
}) {
  const section1Ref = useRef(null);
  const imageCardRef = useRef(null);
  const imageRef = useRef(null);

  const [expanded, setExpanded] = useState(false);

  return (
    <section className="bg-white mt-24 font-serif overflow-hidden">
      <div className="container mx-auto px-4">

        <Heading2 text={mainTitle} className="text-center mb-20" />
        {/* Section */}
        <div
          ref={section1Ref}
          className="relative mb-16 md:mb-32 w-full mx-auto"
          style={{ maxWidth: "1320px" }}
        >
          <div
            className="relative w-full md:w-11/12 bg-black/75 rounded-2xl md:rounded-none"
            style={{ height: "auto", minHeight: "400px" }}
          >
            {/* Mobile Image */}
            <div className="block md:hidden w-full h-80 px-4 py-6">
              <div
                className="bg-white p-1 w-full h-full"
                style={{
                  borderRadius: "30px",
                  border: "2px solid #464444ff",
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
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
                  />
                </div>
              </div>
            </div>

            {/* Text Section */}
            <div className="h-full flex flex-col md:flex-row items-center p-8 md:p-12 z-20">
              <div className="text-white w-full md:w-4/6 pr-0 md:pr-8 text-center md:text-left">
                <Heading3 text={sectionTitle} className="mb-4" />
                <p>{description}</p>
                {/* Description List */}
                <div
                  className={`space-y-4 text-sm md:text-xl font-normal text-white/90 overflow-hidden transition-all duration-500 ${!expanded ? "max-h-[130px]" : "max-h-[1000px]"
                    }`}
                >
                  {descriptionList.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-start gap-2 mt-4">
                        <Icon className="w-5 h-5 text-shadow-white flex-shrink-0 mt-1" />
                        <RichParagraph white={true}>
                          {item.text}
                        </RichParagraph>
                      </div>

                    );
                  })}
                  <div className="mt-4"><RichParagraph white={true}>{lastText}</RichParagraph></div>
                </div>

                {/* Toggle Button */}
                {showToggle && (
                  <BlackButton
                    onClick={() => setExpanded(!expanded)}
                    label={
                      expanded ? (
                        <>
                          Show Less <ChevronUp className="inline w-4" />
                        </>
                      ) : (
                        <>
                          See More <ChevronDown className="inline w-4" />
                        </>
                      )
                    }
                    className="mt-4 !text-xs !px-2 !py-1"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Desktop Image */}
          <div
            ref={imageCardRef}
            className="hidden md:block absolute top-[45%] right-0 transform -translate-y-1/2 z-10"
            style={{
              width: "500px",
              height: "500px",
              right: "calc(-600px + 50%)",
            }}
          >
            <div
              className="bg-white p-1 w-full h-full"
              style={{
                borderRadius: "30px",
                border: "2px solid #464444ff",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div
                className="w-full h-full overflow-hidden"
                style={{ borderRadius: "28px" }}
              >
                <ImageWithSkeleton
                  ref={imageRef}
                  src={image}
                  alt="Custom van interior"

                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Order Button */}
          <div className="w-full text-center md:text-left mt-6 px-8 md:px-12">
            {showButton && <BlackButton label={orderButtonLabel} link={orderButtonLink} />}
          </div>
        </div>
      </div>
    </section>
  );
}
