import React from "react";

const Heading3 = ({
  text = "",
  textColor = "text-primary",
  className = "",
  inlineStyle = {}
}) => {
  return (
    <h3
      className={`text-base sm:text-base lg:text-2xl font-semibold tracking-tighter leading-snug font-body ${textColor} ${className}`}
      style={inlineStyle}
    >
      {text}
    </h3>
  );
};

export default Heading3;