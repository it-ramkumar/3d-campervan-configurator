"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {Heading2, Heading4, RichParagraph, SpanTag} from '../Common/Common';
const FeatureGridBlock = ({ block }) => {
  const [activeImg, setActiveImg] = useState(0);

  // Agar block hi na mile to crash na ho
  if (!block) return null;

  const layout = block.layout || "left";
  const imageRight = layout !== "right";

  // 1. Strictly sanitize image array
  const galleryImages = [
    ...(block.items || []).map(it => it?.media).filter(Boolean),
    ...(block.block_media || []).filter(m => m?.type === "image" && m?.url).map(m => m.url),
  ].filter(url => typeof url === 'string' && url.trim() !== '');

  // Auto-play feature
  useEffect(() => {
    if (galleryImages.length <= 1) return;

    const interval = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % galleryImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [galleryImages.length]);

  const currentImageSrc = galleryImages[activeImg];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 items-center">

      {/* IMAGE PANEL */}
      {galleryImages.length > 0 && currentImageSrc && currentImageSrc.trim() !== "" ? (
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

          {/* Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto no-scrollbar z-10">
              {galleryImages.map((img, i) => {
                if (!img || typeof img !== 'string' || img.trim() === '') return null;

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImg(i)}
                    className={`shrink-0 w-14 aspect-[4/3] rounded overflow-hidden border-2 transition-all duration-200 relative ${
                      i === activeImg ? "border-hover scale-95" : "border-white/20 opacity-50 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="" fill sizes="56px" className="object-cover" />
                  </button>
                );
              })}
            </div>
          )}

          <div className="absolute top-0 left-0 right-0 h-[2px] bg-hover" />
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-hover/30" />
        </div>
      ) : (
        /* Agar images bilkul na hon ya error de rahi hon to khali space ya fallback text */
        <div className={`w-full aspect-[4/3] bg-gray-800 ${imageRight ? "lg:order-2" : "lg:order-1"}`} />
      )}

      {/* CONTENT PANEL */}
      <div className={`flex flex-col justify-center px-8 py-14 lg:px-12 lg:py-16 ${imageRight ? "lg:order-1" : "lg:order-2"}`}>
        {(block.title || block.subtitle) && (
          <div className="mb-10">
            {block.subtitle && <SpanTag text={block.subtitle} className="mb-4" />}
            {block.title && (
              <Heading2 text={block.title} className="!text-secondary mt-3 leading-[0.95]" />
            )}
            <div className="w-12 h-0.5 bg-hover mt-5" />
          </div>
        )}

        <div className="divide-y divide-white/8">
          {(block.items || []).map((item, i) => (
            <div key={i} className="group flex items-start gap-5 py-5 cursor-default">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {/* YAHAN CHECK KAREIN: Agar item.icon koi image component hai jo khali hai */}
                  {item.icon && <span className="text-xl shrink-0">{item.icon}</span>}
                  {item.title && <Heading4 text={item.title} className="!text-secondary !text-base leading-tight" />}
                </div>
                {item.value && <p className="font-display font-black text-2xl text-hover mb-1">{item.value}</p>}
                {item.description && (
                  <RichParagraph className="!text-secondary/50 leading-relaxed">{item.description}</RichParagraph>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default FeatureGridBlock;