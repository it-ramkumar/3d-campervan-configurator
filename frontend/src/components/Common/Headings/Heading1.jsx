
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
      className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-tight tracking-tight font-body ${textColor} ${className}`}
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