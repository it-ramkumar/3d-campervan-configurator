import React from "react";

/**
 * Heading3 Component
 * Props:
 * - text: string → H3 text content
 * - textColor: string → Tailwind text color, default: black
 * - className: string → additional Tailwind classes
 * - inlineStyle: object → optional inline styles
 */
const Heading3 = ({
  text = "Your H3 Title Here",
  textColor = "text-white",
  className = "",
  inlineStyle = {},
}) => {
  return (
    <h3
      className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-snug tracking-normal font-serif ${textColor} ${className}`}
      style={inlineStyle}
    >
      {text}
    </h3>
  );
};

export default Heading3;
