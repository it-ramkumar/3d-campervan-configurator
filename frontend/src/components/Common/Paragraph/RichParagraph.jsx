import React from "react";

const RichParagraph = ({
  children,
  html,
  textColor = "text-primary",
  className = "",
  inlineStyle = {},
  onClick
}) => {
  // 1. tracking-tighter hata diya
  // 2. lg:text-base hata diya kyunki sm:text-base hi agay chalega
  const baseStyles = "text-sm sm:text-base leading-relaxed font-body opacity-90";

  if (html) {
    return (
      <div
        className={`${baseStyles} ${textColor} ${className}`}
        style={inlineStyle} // borderRadius ki zaroorat p par nahi hoti jab tak bg na ho
        onClick={onClick}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    // Isko div se badal kar p tag kar diya semantic HTML ke liye
    <p
      className={`${baseStyles} ${textColor} ${className}`}
      style={inlineStyle}
      onClick={onClick}
    >
      {children}
    </p>
  );
};

export default RichParagraph;