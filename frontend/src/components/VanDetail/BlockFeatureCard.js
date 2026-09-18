"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Heading2,
  Heading4,
  RichParagraph,
  SpanTag,
} from "../Common/Common";

const FeatureGridBlock = ({ block }) => {
  const [activeImg, setActiveImg] = useState(0);

  const layout = block?.layout || "left";
  const imageRight = layout !== "right";

  const galleryImages = [
    ...(block?.items || []).map((it) => it?.media).filter(Boolean),
    ...(block?.block_media || [])
      .filter((m) => m?.type === "image" && m?.url)
      .map((m) => m.url),
  ].filter((url) => typeof url === "string" && url.trim() !== "");

  useEffect(() => {
    if (galleryImages.length <= 1) return;

    const interval = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % galleryImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [galleryImages.length]);

  if (!block) return null;

  const hasImages = galleryImages.length > 0;
  const currentImageSrc = galleryImages[activeImg % galleryImages.length];

  // Supports **bold**
  const renderBold = (text = "") => {
    return text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-bold text-secondary">
            {part.slice(2, -2)}
          </strong>
        );
      }

      return part;
    });
  };

  return (
    <div className={`grid grid-cols-1 ${hasImages ? "lg:grid-cols-2 items-center" : ""}`}>
      {/* IMAGE PANEL */}
      {galleryImages.length > 0 &&
      currentImageSrc &&
      currentImageSrc.trim() !== "" ? (
        <div
          className={`relative w-full aspect-[4/3] overflow-hidden ${
            imageRight ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <Image
            src={currentImageSrc}
            alt={block.title || "feature"}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={activeImg === 0}
            className="object-cover transition-opacity duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-primary/55 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent pointer-events-none" />

          {galleryImages.length > 1 && (
            <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto no-scrollbar z-10">
              {galleryImages.map((img, i) => {
                if (
                  !img ||
                  typeof img !== "string" ||
                  img.trim() === ""
                )
                  return null;

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImg(i)}
                    className={`shrink-0 w-14 aspect-[4/3] rounded overflow-hidden border-2 transition-all duration-200 relative ${
                      i === activeImg
                        ? "border-hover scale-95"
                        : "border-white/20 opacity-50 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}

          <div className="absolute top-0 left-0 right-0 h-[2px] bg-hover" />
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-hover/30" />
        </div>
      ) : null}

      {/* CONTENT PANEL */}
      <div
        className={`flex flex-col justify-center px-8 py-14 lg:px-12 lg:py-16 ${
          hasImages ? (imageRight ? "lg:order-1" : "lg:order-2") : ""
        }`}
      >
        {(block.title || block.subtitle) && (
          <div className="mb-10">
            {block.subtitle && (
              <SpanTag text={block.subtitle} className="mb-4" />
            )}

            {block.title && (
              <Heading2
                text={block.title}
                className="!text-secondary mt-3 leading-[0.95]"
              />
            )}

            <div className="w-12 h-0.5 bg-hover mt-5" />
          </div>
        )}

        <div className={hasImages ? "divide-y divide-white/8" : "divide-y divide-white/15"}>
          {(block.items || []).map((item, i) => (
            <div
              key={i}
              className={`group flex items-start gap-5 cursor-default ${hasImages ? "py-1" : "py-6 first:pt-0"}`}
            >
              <div className="flex-1 min-w-0">
                <div className={`flex items-start gap-3 ${hasImages ? "mb-1" : "mb-3"}`}>
                  {!hasImages && (
                    <span className="font-mono font-bold text-hover shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                  {item.icon && (
                    <span className="text-xl shrink-0">
                      {item.icon}
                    </span>
                  )}

                  {item.title && (
                    <Heading4
                      text={item.title}
                      className="!text-secondary !text-base leading-tight"
                    />
                  )}
                </div>

                {item.value && (
                  <p className="font-display font-black text-2xl text-hover mb-1">
                    {item.value}
                  </p>
                )}

                {item.description && (
                  <RichParagraph className={`${hasImages ? "!text-secondary/50" : "!text-secondary/70"} leading-relaxed`}>
                    {renderBold(item.description)}
                  </RichParagraph>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Supports **bold**
const renderFaqBold = (text = "") => {
  return text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-secondary">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return part;
  });
};

const FaqAccordionBlock = ({ block }) => {
  const items = (block?.items || []).filter((item) => item?.title);
  const [openIndex, setOpenIndex] = useState(items.length > 0 ? 0 : -1);

  if (!block || items.length === 0) return null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 lg:py-24">
      {(block.title || block.subtitle) && (
        <div className="text-center mb-12">
          {block.subtitle && (
            <SpanTag text={block.subtitle} className="!inline-flex justify-center mb-4" />
          )}

          {block.title && (
            <Heading2
              text={block.title}
              className="!text-secondary mt-3 leading-[0.95]"
            />
          )}

          <div className="w-12 h-0.5 bg-hover mt-5 mx-auto" />
        </div>
      )}

      <div className="flex flex-col gap-3">
        {items.map((item, i) => {
          const isOpen = openIndex === i;

          return (
            <div
              key={i}
              className={`rounded-xl border overflow-hidden transition-colors duration-300 ${
                isOpen ? "border-hover/40" : "border-white/10"
              }`}
              style={{
                background: "rgba(2,12,24,0.72)",
                backdropFilter: "blur(24px)",
              }}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-5 text-left cursor-pointer"
              >
                <span className="flex items-center gap-3 min-w-0">
                  {item.icon && (
                    <span className="text-lg shrink-0">{item.icon}</span>
                  )}

                  <Heading4
                    text={item.title}
                    className={`!text-base sm:!text-lg leading-snug transition-colors duration-300 ${
                      isOpen ? "!text-hover" : "!text-secondary"
                    }`}
                  />
                </span>

                <span
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isOpen ? "bg-hover border-hover rotate-45" : "border-white/20"
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 1V13M1 7H13"
                      stroke={isOpen ? "#001F3D" : "#FBFBF9"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>

              <div
                className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  {item.description && (
                    <RichParagraph className="!text-secondary/60 leading-relaxed px-5 sm:px-6 pb-5 sm:pb-6 -mt-1">
                      {renderFaqBold(item.description)}
                    </RichParagraph>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const isFaqFeatureBlock = (block) =>
  block?.block_type === "feature-grid" &&
  block.title?.trim().replace(/\s+/g, " ").toLowerCase() ===
    "frequently asked questions (faqs)";

export function FaqFeatureBlocks({ blocks }) {
  return blocks.filter(isFaqFeatureBlock).map((block, index) => (
    <section key={block._id || index} className="relative bg-primary overflow-hidden">
      <div className="bbv-dot-grid" />
      <div className="relative">
        <FaqAccordionBlock block={block} />
      </div>
    </section>
  ));
}

export default FeatureGridBlock;
