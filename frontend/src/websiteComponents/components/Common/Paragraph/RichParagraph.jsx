import React from "react";

const RichParagraph = ({
  children,
  html,
  textColor = "text-[#5A5A5A]",
  className = "",
  inlineStyle = {},
  onClick
}) => {
  // Styles remains same, just changed tag from <p> to <div> to allow nested lists
  const baseStyles = "text-[14px] sm:text-base lg:text-[15px] leading-relaxed tracking-tighter font-body opacity-90";

  if (html) {
    return (
      <div
        className={`${baseStyles} ${textColor} ${className}`}
        style={inlineStyle}
        dangerouslySetInnerHTML={{ __html: html }}
        onClick={onClick}
      />
    );
  }

  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${textColor} ${className}`}
      style={inlineStyle}
    >
      {children}
    </div>
  );
};

export default RichParagraph;