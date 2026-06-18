
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
      className={`text-xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight font-body ${textColor} ${className}`}
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