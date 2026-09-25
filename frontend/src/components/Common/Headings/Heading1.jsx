import React from "react";

const Heading = ({
  as: Tag = "h1",
  variant = "hero", // 'hero' | 'section' | 'card' | 'sub'
  textColor = "text-slate-900 dark:text-white",
  className = "",
  children,
  text,


  
  ...props
}) => {
  // Standardized size mapping based on modern web design systems
  const variantStyles = {
    hero: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]",
    section: "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.2]",
    card: "text-xl sm:text-2xl font-semibold tracking-normal leading-[1.3]",
    sub: "text-lg sm:text-xl font-medium tracking-normal leading-[1.4]",
  };

  return (
    <Tag
      className={` ${variantStyles[variant] || variantStyles.hero} ${textColor} ${className}`}
      {...props}
    >
      {children ?? text}
    </Tag>
  );
};

export default Heading;