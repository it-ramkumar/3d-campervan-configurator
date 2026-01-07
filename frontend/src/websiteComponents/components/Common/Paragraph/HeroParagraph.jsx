import React from "react";

/**
 * Paragraph Component
 * Props:
 * - text: string → the paragraph content
 * - textColor: string → Tailwind text color, default: black
 * - className: string → additional Tailwind classes
 * - inlineStyle: object → optional inline styles
 */
const Paragraph = ({
  text = "Buy, customize, or try the 3D configurator from Big Bear Vans today.",
  textColor = "text-white",
  className = "",
  inlineStyle = {},
}) => {
  return (
    <p
      className={`text-sm sm:text-base md:text-lg lg:text-[20px] font-normal font-serif desc-text ${textColor} ${className}`}
      style={inlineStyle}
    >
      {text}
    </p>
  );
};

export default Paragraph;
