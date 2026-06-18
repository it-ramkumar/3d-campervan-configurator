"use client";
import React from "react";
import Link from "next/link";

export default function SecondaryButton({
  label,
  link,
  className = "",
  onClick,
  disabled,
  type,
  ariaLabel
}) {
  // 1. Font size barha kar text-xs sm:text-sm kiya readabilty ke liye
  const baseClasses = `
    inline-flex items-center justify-center
    font-bold uppercase tracking-[0.12em]
    !rounded-lg transition-all duration-300 ease-in-out
    text-xs sm:text-sm
    py-3 px-6 md:py-3.5 md:px-8
  `;

  // Default text-primary ko yahan rakha taake baahar se override ho sake
  const enabledClasses = `
    bg-secondary text-primary border-2 border-primary
    cursor-pointer
    hover:bg-primary hover:text-secondary
    hover:shadow-md
    active:scale-95
  `;

  const disabledClasses = `
    bg-transparent text-gray-400 border-gray-200
    cursor-not-allowed opacity-70
  `;

  const finalClass = `${baseClasses} ${disabled ? disabledClasses : enabledClasses} ${className}`;

  const ButtonContent = () => (
    <button
      onClick={disabled ? undefined : onClick}
      className={finalClass}
      disabled={disabled}
      type={type}
    >
      {label}
    </button>
  );

  return link ? (
    /* w-full sm:w-auto lagaya taake mobile vertical stack me ye expand ho sake */
    <Link href={link} aria-label={ariaLabel || label} className="inline-block w-full sm:w-auto">
      <ButtonContent />
    </Link>
  ) : (
    <ButtonContent />
  );
}