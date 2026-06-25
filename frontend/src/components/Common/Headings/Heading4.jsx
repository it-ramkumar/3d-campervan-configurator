
import React from "react";

const Heading4 = ({
  text = "",
  textColor = "text-primary",
  className = "",
  inlineStyle = {},
  children
}) => {
  return (
    <h4
      className={`text-lg sm:text-xl md:text-2xl font-bold tracking-wide leading-snug font-display ${textColor} ${className}`}
      style={{
        ...inlineStyle,
        borderRadius: '8px'
      }}
    >
      {children ?? text}
    </h4>
  );
};

export default Heading4;