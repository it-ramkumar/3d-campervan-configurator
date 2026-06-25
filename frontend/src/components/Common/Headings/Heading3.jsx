
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
      className={`text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold tracking-wide leading-tight font-display ${textColor} ${className}`}
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