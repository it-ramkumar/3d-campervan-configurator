import React from "react";

const VARIANT_STYLES = {
  hero: "text-lg sm:text-xl lg:text-2xl leading-relaxed font-body",
  body: "text-base sm:text-lg leading-relaxed font-body opacity-95",
  card: "text-sm sm:text-base leading-normal font-body opacity-90",
  sub: "text-xs sm:text-sm leading-normal font-body opacity-80",
};

// XSS Sanitizer Guard
const sanitize = (content) =>
  typeof content === "string"
    ? content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    : content;

export const RichParagraph = ({
  children,
  html,
  variant = "body",
  textColor = "text-primary/60",
  className = "",
  inlineStyle,
  onClick,
  ...props
}) => {
  const styles = `${VARIANT_STYLES[variant] || VARIANT_STYLES.body} ${textColor} ${className}`.trim();

  if (html) {
    return (
      <div
        className={styles}
        style={inlineStyle}
        onClick={onClick}
        dangerouslySetInnerHTML={{ __html: sanitize(html) }}
        {...props}
      />
    );
  }

  return (
    <p
      className={styles}
      style={inlineStyle}
      onClick={onClick}
      {...props}
    >
      {children}
    </p>
  );
};

export default RichParagraph;