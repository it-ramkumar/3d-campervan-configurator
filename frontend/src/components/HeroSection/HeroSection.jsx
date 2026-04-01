"use client";
import React, { useState, useEffect } from "react";
import HeroParagrah from "../Common/Paragraph/HeroParagraph";
import { Heading1, PrimaryButton, ImageWithSkeleton } from '../Common/Common';

export default function HeroV({
  title,
  description,
  image,
  link,
  buttonText,
  showButton = true,
}) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = title || "";
      if (!isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length + 1));
        setTypingSpeed(100);
        if (displayText === fullText) {
          setTimeout(() => setIsDeleting(true), 2500);
          setTypingSpeed(200);
        }
      } else {
        setDisplayText(fullText.substring(0, displayText.length - 1));
        setTypingSpeed(50);
        if (displayText === "") {
          setIsDeleting(false);
          setTypingSpeed(500);
        }
      }
    };
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, title]);

  return (
    <div className="relative w-full h-[75vh] md:h-[90vh] flex items-center overflow-hidden bg-[#001F3D]">

      {/* 1. Background Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ImageWithSkeleton
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover scale-105 animate-subtle-zoom"
          priority={true}
        />
        {/* Darker overlay on left to make text readable, fading to clear on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#001F3D]/80 via-[#001F3D]/40 to-transparent z-10" />
      </div>

      {/* 2. Main Content Container - Now Left Aligned */}
      <div className="relative z-30 container mx-auto px-6 md:px-12">
        <div className="max-w-2xl text-left space-y-6 py-10 px-6 md:px-8 rounded-normal ">

          {/* Badge */}
          <div className="inline-block px-4 py-1.5 mb-2 bg-[#ACBAC4]/20 backdrop-blur-md border border-[#ACBAC4]/30 text-[#ACBAC4] text-[11px] font-bold uppercase tracking-[0.2em] rounded-normal">
            Interior Excellence
          </div>

          {/* Typing Heading */}
          <div className="min-h-[80px] flex items-center justify-start">
            <Heading1
              text={displayText}
              className="text-[#F0F0DB] leading-tight"
            />
          </div>

          <div className="relative py-2">
            <HeroParagrah
              text={description}
              className="text-[#ACBAC4] font-medium text-lg leading-relaxed max-w-lg"
            />
          </div>

          {showButton && (
            <div className="mt-8 flex items-center justify-start gap-6 relative z-40">
              <PrimaryButton
                label={buttonText}
                link={link}
              />
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes subtle-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-subtle-zoom {
          animation: subtle-zoom 15s infinite alternate ease-in-out;
        }
      `}</style>
    </div>
  );
}