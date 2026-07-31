
import React from "react";

const Heading1 = ({
  text = "Title",
  textColor = "text-secondary",
  className = "",
  inlineStyle = {},
  children,
  as: Tag = "h1"
}) => {
  return (
    <Tag
      className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-wide font-display ${textColor} ${className}`}
      style={{
        ...inlineStyle,
        borderRadius: '8px'
      }}
    >
      {children ?? text}
    </Tag>
  );
};

export default Heading1;