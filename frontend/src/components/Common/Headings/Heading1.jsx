import React from "react";

// Variant to Tag mapping (Default hero is now h2 for safer SEO fallback)
const variantTagMap = {
  hero: "h2", // Explicitly passed as="h1" will still render h1
  section: "h2",
  card: "h3",
  sub: "h4",
};

// Styling mapping
const variantStyles = {
  hero: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]",
  section: "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.2]",
  card: "text-xl sm:text-2xl font-semibold tracking-normal leading-[1.3]",
  sub: "text-lg sm:text-xl font-medium tracking-normal leading-[1.4]",
};

const Heading = ({
  as,
  variant = "hero",
  textColor = "text-slate-900 dark:text-white",
  className = "",
  children,
  text,
  ...props
}) => {
  // Priority: 1. Explicit 'as' prop -> 2. Variant default tag -> 3. Fallback 'h2'
  const Tag = as || variantTagMap[variant] || "h2";

  return (
    <Tag
      className={`${variantStyles[variant] || variantStyles.hero} ${textColor} ${className}`}
      {...props}
    >
      {children ?? text}
    </Tag>
  );
};

export default Heading;