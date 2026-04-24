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
  // Base classes using theme variables
// ... baaqi code same ...
  const baseClasses = `
    inline-flex items-center justify-center
    text-primary font-bold uppercase tracking-[0.15em]
    !rounded-lg transition-all duration-300 ease-in-out
    text-[11px] sm:text-[12px]
    py-3 px-6 md:py-3.5 md:px-8
  `;
// ... baaqi code same ...

  // Enabled state using theme variables (No hard-coded hex)
  const enabledClasses = `
    bg-secondary border-2 border-primary
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
    <Link href={link} aria-label={ariaLabel || label} className="inline-block">
      <ButtonContent />
    </Link>
  ) : (
    <ButtonContent />
  );
}