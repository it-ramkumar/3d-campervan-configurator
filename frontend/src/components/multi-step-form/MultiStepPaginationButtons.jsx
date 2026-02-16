import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MultiStepPaginationButtons({ onClick, text, disabled = false, variant = "primary" }) {
  const baseClasses = "w-full py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1";

  const variants = {
    primary: "bg-black hover:bg-gray-800 text-white shadow-md",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-700 border border-black/10",
    accent: "bg-black hover:bg-gray-800 text-white shadow-md",
  };

  const isBack = text.includes("←");
  const cleanText = text.replace(/[←→]/g, '').trim();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${disabled ? "opacity-40 cursor-not-allowed grayscale" : "active:scale-95"}
      `}
    >
      {isBack && <ChevronLeft size={14} />}
      <span>{cleanText}</span>
      {!isBack && <ChevronRight size={14} />}
    </button>
  );
}