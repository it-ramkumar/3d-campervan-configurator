import React from "react";

const RichParagraph = ({
  children,
  html,
  variant = "body", // 'hero' | 'body' | 'card' | 'sub'
  textColor = "text-primary/60",
  className = "",
  inlineStyle = {},
  onClick
}) => {
  // Standardized font-sizes and leading for different sections
  const variantStyles = {
    hero: "text-lg sm:text-xl lg:text-2xl leading-relaxed font-body",     // Hero section subheadings/paragraphs
    body: "text-base sm:text-lg leading-relaxed font-body opacity-95",   // Normal main sections
    card: "text-sm sm:text-base leading-normal font-body opacity-90",    // Cards & grid items
    sub: "text-xs sm:text-sm leading-normal font-body opacity-80",       // Badges, captions, small tags
  };

  const selectedVariantStyle = variantStyles[variant] || variantStyles.body;

  if (html) {
    return (
      <div
        className={`${selectedVariantStyle} ${textColor} ${className}`}
        style={inlineStyle}
        onClick={onClick}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <p
      className={`${selectedVariantStyle} ${textColor} ${className}`}
      style={inlineStyle}
      onClick={onClick}
    >
      {children}
    </p>
  );
};

export default RichParagraph;