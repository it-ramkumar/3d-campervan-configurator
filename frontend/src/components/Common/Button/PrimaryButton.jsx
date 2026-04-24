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
  // Base classes using theme variables
const baseClasses = `
    inline-flex items-center justify-center
    text-secondary font-bold uppercase tracking-[0.15em]
    !rounded-lg transition-all duration-300 ease-in-out
    text-[11px] sm:text-[12px]
    py-3 px-6 md:py-3.5 md:px-8
  `;
  // Enabled state using theme variables
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
    <Link href={link} aria-label={ariaLabel || label} className="inline-block">
      <ButtonContent />
    </Link>
  ) : (
    <ButtonContent />
  );
}