"use client";
import React from "react";
import Link from "next/link";

export default function BlackButton({
  label,
  link,
  className = "",
  onClick,
  disabled,
  type,
  ariaLabel
}) {
  const baseClasses = `
    text-black font-semibold
    font-serif
    rounded-sm sm:rounded-base md:rounded-lg
    text-xs sm:text-sm
    py-1 px-2 sm:py-2.5 sm:px-5 md:py-2.5 md:px-6
  `;

  const enabledClasses = `
    bg-gray-100
    cursor-pointer transition-all duration-300 ease-in-out
    hover:scale-105 hover:shadow-lg active:scale-95
  `;

  const disabledClasses = `
    bg-gray-200 text-gray-600
    cursor-not-allowed opacity-70
    hover:scale-100 hover:shadow-none active:scale-100
  `;

  const finalClass = `
    ${baseClasses}
    ${disabled ? disabledClasses : enabledClasses}
    ${className}
  `;

  // If link exists → wrap button inside <Link>
  if (link) {
    return (
      <Link href={link}
                aria-label={ariaLabel || label}
>
        <button
          onClick={disabled ? undefined : onClick}
          className={finalClass}
          disabled={disabled}
          type={type}
        >
          {label}
        </button>
      </Link>
    );
  }

  // Normal button
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={finalClass}
      disabled={disabled}
      type={type}
    >
      {label}
    </button>
  );
}
