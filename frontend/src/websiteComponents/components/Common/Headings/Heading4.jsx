import React from "react";

const Heading4 = ({
  text = "",
  textColor = "text-primary",
  className = "",
  inlineStyle = {}
}) => {
  return (
    <h4
      className={`text-base sm:text-lg lg:text-xl font-semibold tracking-tighter leading-snug font-body ${textColor} ${className}`}
      style={inlineStyle}
    >
      {text}
    </h4>
  );
};

export default Heading4;