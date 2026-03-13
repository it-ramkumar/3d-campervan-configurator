import React from "react";

const Heading1 = ({
  text = "Title",
  textColor = "text-secondary",
  className = "",
  inlineStyle = {}
}) => {
  return (
    <h1
      className={`text-3xl sm:text-4xl md:text-5xl lg:text-[64px] xl:text-[72px] font-sembold leading-tight tracking-tight font-body ${textColor} ${className}`}
      style={inlineStyle}
    >
      {text}
    </h1>
  );
};

export default Heading1;