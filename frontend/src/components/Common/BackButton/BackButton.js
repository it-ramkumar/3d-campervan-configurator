"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton({
  label = "Go Back",
  className = "",
  variant = "default"
}) {
  const router = useRouter();

  // Different style choices (optional)
  const baseStyles = "absolute z-10 transition-all duration-300 rounded-full font-medium text-sm shadow-md border pointer-events-auto";

  const variants = {
    default: "p-3 bg-white/80 backdrop-blur-xl border-white/40 text-primary hover:bg-primary hover:text-white",
    dark: "px-4 py-2 bg-primary text-secondary border-slate-700 hover:bg-slate-800",
    minimal: "p-2 bg-transparent border-transparent text-primary hover:text-hover shadow-none"
  };

  return (
    <button
      onClick={() => router.back()}
      className={`${baseStyles} ${variants[variant] || variants.default} ${className}`}
      title={label}
    >
      <ArrowLeft size={18} />
      {/* Agar minimal ya simple icon-only button chahiye to label ko conditionally hide kar sakte hain */}
      {variant !== "default" && <span>{label}</span>}
    </button>
  );
}