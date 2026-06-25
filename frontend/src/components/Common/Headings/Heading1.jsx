
import React from "react";

const Heading1 = ({
  text = "Title",
  textColor = "text-secondary",
  className = "",
  inlineStyle = {},
  children
}) => {
  return (
    <h1
      className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-wide font-display ${textColor} ${className}`}
      style={{
        ...inlineStyle,
        borderRadius: '8px'
      }}
    >
      {children ?? text}
    </h1>
  );
};

export default Heading1;