import React from "react";

/**
 * Heading2 Component
 * Props:
 * - text: string → H2 text content
 * - textColor: string → Tailwind text color, default: black
 * - className: string → additional Tailwind classes
 * - inlineStyle: object → optional inline styles
 */
const Heading2 = ({
  text = "Your H2 Title Here",
  textColor = "text-black",
  className = "",
  inlineStyle = {},
}) => {
  return (
    <h2
      className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight tracking-normal font-serif  ${textColor} ${className}`}
      style={inlineStyle}
    >
      {text}
    </h2>
  );
};

export default Heading2;
