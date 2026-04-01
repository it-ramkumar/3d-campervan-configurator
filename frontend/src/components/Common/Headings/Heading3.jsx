import React from "react";
import Reveal from "./Reveal"; // Aapka client-side animation wrapper

const Heading3 = ({
  text = "",
  textColor = "text-primary",
  className = "",
  inlineStyle = {},
  noReveal = false
}) => {

  // Asli H3 tag jo server-side render hoga
  const Content = (
    <h3
      className={`text-base sm:text-base lg:text-2xl font-semibold tracking-tighter leading-snug font-body ${textColor} ${className}`}
      style={{
        ...inlineStyle,
        borderRadius: '8px'
      }}
    >
      {text}
    </h3>
  );

  if (noReveal) return Content;

  // H3 ke liye displacement thori kam (30) aur reveal thora fast (0.6) rakha hai
  return (
    <Reveal y={30} duration={0.6}>
      {Content}
    </Reveal>
  );
};

export default Heading3;