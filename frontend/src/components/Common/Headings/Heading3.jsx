
import React from "react";

const Heading3 = ({
  text = "",
  textColor = "text-primary",
  className = "",
  inlineStyle = {},
  children
}) => {
  return (
    <h3
      className={`text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-snug font-body ${textColor} ${className}`}
      style={{
        ...inlineStyle,
        borderRadius: '8px'
      }}
    >
      {children ?? text}
    </h3>
  );
};

export default Heading3;