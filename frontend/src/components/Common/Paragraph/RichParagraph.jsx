// export default RichParagraph;
import React from "react";

const RichParagraph = ({
  children,
  html,
  textColor = "text-primary",
  className = "",
  inlineStyle = {},
  onClick
}) => {
  const baseStyles = "text-[14px] sm:text-base lg:text-[15px] leading-relaxed tracking-tighter font-body opacity-90";

  // Asli Content jo direct render hoga
  if (html) {
    return (
      <div
        className={`${baseStyles} ${textColor} ${className}`}
        style={{ ...inlineStyle, borderRadius: '8px' }}
        onClick={onClick}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <div
      className={`${baseStyles} ${textColor} ${className}`}
      style={{ ...inlineStyle, borderRadius: '8px' }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default RichParagraph;