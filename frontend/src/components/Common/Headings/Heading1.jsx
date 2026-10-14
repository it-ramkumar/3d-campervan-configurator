import React from "react";

// Semantic HTML Tag Mapping for SEO
const VARIANT_TAG_MAP = {
  hero: "h2",
  section: "h2",
  card: "h3",
  sub: "h4",
};

// Styling Mapping
const VARIANT_STYLES = {
  hero: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]",
  section: "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.2]",
  card: "text-xl sm:text-2xl font-semibold tracking-normal leading-[1.3]",
  sub: "text-lg sm:text-xl font-medium tracking-normal leading-[1.4]",
};

export const Heading = ({
  as,
  variant = "hero",
  textColor = "text-slate-900 dark:text-white",
  className = "",
  children,
  text,
  ...props
}) => {
  // Priority: 1. Explicit 'as' prop -> 2. Variant default tag -> 3. Fallback 'h2'
  const Tag = as || VARIANT_TAG_MAP[variant] || "h2";
  const styles = `${VARIANT_STYLES[variant] || VARIANT_STYLES.hero} ${textColor} ${className}`.trim();

  return (
    <Tag className={styles} {...props}>
      {children ?? text}
    </Tag>
  );
};

export default Heading;