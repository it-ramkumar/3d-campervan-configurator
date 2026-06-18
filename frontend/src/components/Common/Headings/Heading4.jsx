
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
      className={`text-base sm:text-lg md:text-xl lg:text-2xl font-semibold tracking-tight leading-snug font-body ${textColor} ${className}`}
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