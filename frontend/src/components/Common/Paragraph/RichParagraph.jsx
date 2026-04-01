import React from "react";
import Reveal from "../Headings/Reveal"; // Aapka client-side animation wrapper

const RichParagraph = ({
  children,
  html,
  textColor = "text-primary",
  className = "",
  inlineStyle = {},
  onClick,
  noReveal = false
}) => {
  const baseStyles = "text-[14px] sm:text-base lg:text-[15px] leading-relaxed tracking-tighter font-body opacity-90";

  // Asli Content jo Server par render hoga
  const Content = html ? (
    <div
      className={`${baseStyles} ${textColor} ${className}`}
      style={{ ...inlineStyle, borderRadius: '8px' }}
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  ) : (
    <div
      className={`${baseStyles} ${textColor} ${className}`}
      style={{ ...inlineStyle, borderRadius: '8px' }}
      onClick={onClick}
    >
      {children}
    </div>
  );

  if (noReveal) return Content;

  // Paragraph ke liye humne once: false rakha hai (taaki scroll par baar baar chale)
  return (
    <Reveal
      y={35}
      duration={0.8}
      once={false} // Har baar scroll par animation ke liye
      amount={0.1}
    >
      {Content}
    </Reveal>
  );
};

export default RichParagraph;