import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @param {string} to - URL path
 * @param {string} text - Link text
 * @param {string} variant - 'primary', 'outline', or 'ghost'
 * @param {boolean} isExternal - Agar bahar ki website ka link ho
 * @param {string} className - Additional Tailwind classes
 */
export default function CustomLink({
  to,
  text,
  variant = 'primary',
  isExternal = false,
  className = '',
  ...props
}) {

  // Base styles including your mandatory rounded borders
  const baseStyles = "font-bold text-xs uppercase transition-all duration-300 active:scale-95 ";

  // Variants based on your theme colors
  // const variants = {
  //   primary: " text-secondary hover:bg-hover hover:text-secondary",
  //   outline: " text-primary bg-transparent hover:bg-primary hover:text-white",
  //   ghost: "text-primary hover:bg-secondary hover:text-hover shadow-none"
  // };

  // const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

  if (isExternal) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={baseStyles}
        {...props}
      >
        {text}
      </a>
    );
  }

  return (
    <Link to={to} className={baseStyles} {...props}>
      {text}
    </Link>
  );
}