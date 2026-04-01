"use client"; // Next.js Client Component marker
import React from 'react';
import Link from "next/link";

export default function CustomLink({
  href, // Next.js standard is 'href', not 'to'
  text,
  children, // Add children support
  isExternal = false,
  className = '',
  ...props
}) {
  const baseStyles = "font-bold text-xs uppercase transition-all duration-300 active:scale-95 " + className;

  const content = children || text;

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseStyles}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={baseStyles} {...props}>
      {content}
    </Link>
  );
}