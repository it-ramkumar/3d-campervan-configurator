import React from "react";

/**
 * Heading3 Component
 * Props:
 * - text: string → H3 text content
 * - textColor: string → Tailwind text color, default: black
 * - className: string → additional Tailwind classes
 * - inlineStyle: object → optional inline styles
 */
const Heading4 = ({
  text = "Your H4 Title Here",
  textColor = "text-white",
  className = "",
  inlineStyle = {},
}) => {
  return (
    <h4
      className={`text-lg sm:text-sm md:text-lg lg:text-xl font-semibold leading-snug tracking-normal font-serif ${textColor} ${className}`}
      style={inlineStyle}
    >
      {text}
    </h4>
  );
};

export default Heading4;