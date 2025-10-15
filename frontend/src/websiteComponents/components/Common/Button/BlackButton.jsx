"use client";
import React from "react";
import { Link } from "react-router-dom";

export default function BlackButton({
  label,
  link,
  className = "",
  onClick,
  disabled,
  type
}) {
  const baseClasses = `
    ${className}
    bg-black
    text-white font-semibold
    rounded-sm sm:rounded-base md:rounded-lg
    cursor-pointer transition-all duration-300 ease-in-out
    hover:scale-105 hover:shadow-lg active:scale-95
    text-xs sm:text-sm md:text-base
    py-2 px-3 sm:py-2.5 sm:px-5 md:py-3 md:px-6

  `;

  // ✅ If link prop given → wrap with Link
  if (link) {
    return (
      <Link to={link}>
        <button onClick={onClick} className={baseClasses} disabled={disabled} type={type}>
          {label}
        </button>
      </Link>
    );
  }

  // ✅ Else, plain button
  return (
    <button onClick={onClick} className={baseClasses} disabled={disabled} type={type}>
      {label}
    </button>
  );
}
