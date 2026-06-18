"use client";
import React from "react";
import Link from "next/link";

export default function PrimaryButton({
  label,
  link,
  className = "",
  onClick,
  disabled,
  type,
  ariaLabel
}) {
  // 1. Font size ko text-xs (12px) se sm (14px) kiya readability ke liye
  // 2. Mobile padding wahi rakhi par md screen par thoda expand kiya
  const baseClasses = `
    inline-flex items-center justify-center
    text-secondary font-bold uppercase tracking-[0.12em]
    !rounded-lg transition-all duration-300 ease-in-out
    text-xs sm:text-sm
    py-3 px-6 md:py-3.5 md:px-8
  `;

  const enabledClasses = `
    bg-primary border border-primary
    cursor-pointer
    hover:bg-hover hover:border-hover hover:shadow-xl
    active:scale-95
  `;

  const disabledClasses = `
    bg-gray-300 text-gray-500
    cursor-not-allowed opacity-70
  `;

  // className ko aakhir me rakha taake 'w-full' jaisi classes baahar se override ho sakein
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
    /* w-full sm:w-auto lagaya taake jab aap baahar se button ko w-full dein to link bhi expand ho */
    <Link href={link} aria-label={ariaLabel || label} className="inline-block w-full sm:w-auto">
      <ButtonContent />
    </Link>
  ) : (
    <ButtonContent />
  );
}