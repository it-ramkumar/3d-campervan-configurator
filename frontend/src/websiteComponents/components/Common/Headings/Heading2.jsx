import React from "react";

const Heading2 = ({
  text = "Section Title",
  textColor = "text-primary",
  className = "",
  inlineStyle = {}
}) => {
  return (
    <h2
      className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold tracker-tight leading-tight font-body ${textColor} ${className}`}
      style={inlineStyle}
    >
      {text}
    </h2>
  );
};

export default Heading2;