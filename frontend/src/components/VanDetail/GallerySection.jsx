"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithSkeleton } from '../Common/Common';
import Image from "next/image";

const VanGallery = ({ gallery = [], title = "" }) => {
  const [activeImage, setActiveImage] = useState(0);

  const nextImage = () => {
    if (gallery.length > 0) {
      setActiveImage((prev) => (prev + 1) % gallery.length);
    }
  };

  const prevImage = () => {
    if (gallery.length > 0) {
      setActiveImage((prev) => (prev - 1 + gallery.length) % gallery.length);
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Display */}
      <div className="relative overflow-hidden rounded-lg shadow-lg group bg-white aspect-[4/3] flex items-center justify-center">
        {gallery && gallery.length > 0 ? (
          <>
            <ImageWithSkeleton
              src={gallery[activeImage]}
              alt={title}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
            <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white text-primary shadow-md transition-all z-10">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white text-primary shadow-md transition-all z-10">
              <ChevronRight size={24} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <span className="text-lg font-medium">Image Coming Soon</span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {gallery && gallery.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {gallery.map((img, i) => (
            <div
              key={i}
              onClick={() => setActiveImage(i)}
              className={`aspect-square cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                activeImage === i ? 'border-[#ED3500]' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image src={img} unoptimized  className="w-full h-full object-cover" alt={`Thumbnail ${i}`} width={80} height={80} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VanGallery;