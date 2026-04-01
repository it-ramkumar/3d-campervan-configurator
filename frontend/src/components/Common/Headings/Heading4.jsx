import React from "react";
import Reveal from "./Reveal"; // Aapka client-side animation wrapper

const Heading4 = ({
  text = "",
  textColor = "text-primary",
  className = "",
  inlineStyle = {},
  noReveal = false
}) => {

  // Asli H4 tag jo server-side render hoga
  const Content = (
    <h4
      className={`text-base sm:text-lg lg:text-xl font-semibold tracking-tighter leading-snug font-body ${textColor} ${className}`}
      style={{
        ...inlineStyle,
        borderRadius: '8px'
      }}
    >
      {text}
    </h4>
  );

  if (noReveal) return Content;

  // H4 ke liye displacement sab se kam (25) aur reveal sab se fast (0.5) rakha hai
  return (
    <Reveal y={25} duration={0.5}>
      {Content}
    </Reveal>
  );
};

export default Heading4;