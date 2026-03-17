import React from "react";
import RichParagraph from "./RichParagraph";

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
  textColor = "text-secondary",
  className = "",
  inlineStyle = {},
}) => {
  return (
 <RichParagraph
  className={`text-sm sm:text-base md:text-lg lg:text-[20px] tracking-tight ${textColor} ${className}`}
  style={inlineStyle}
>
  {text}
</RichParagraph>
  );
};

export default Paragraph;
