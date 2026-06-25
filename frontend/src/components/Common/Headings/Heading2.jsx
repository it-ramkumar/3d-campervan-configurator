
import React from "react";

const Heading2 = ({
  text = "Section Title",
  textColor = "text-primary",
  className = "",
  inlineStyle = {},
  children
}) => {
  return (
    <h2
      className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide leading-[0.95] font-display ${textColor} ${className}`}
      style={{
        ...inlineStyle,
        borderRadius: '8px'
      }}
    >
      {children ?? text}
    </h2>
  );
};

export default Heading2;