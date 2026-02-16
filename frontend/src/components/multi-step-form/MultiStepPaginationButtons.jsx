import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MultiStepPaginationButtons({ onClick, text, disabled = false, variant = "primary" }) {
  const baseClasses = "w-full py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1";

  const variants = {
    primary: "bg-cyan-500 hover:bg-cyan-400 text-white shadow-md",
    secondary: "bg-slate-700 hover:bg-slate-600 text-slate-200 border border-white/10",
    accent: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white shadow-md",
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