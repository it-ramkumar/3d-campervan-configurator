import React from "react";
import Reveal from "./Reveal"; // Aapka client-side animation wrapper

const Heading2 = ({
  text = "Section Title",
  textColor = "text-primary",
  className = "",
  inlineStyle = {},
  noReveal = false
}) => {

  // Asli H2 tag jo Server par render hoga
  const Content = (
    <h2
      className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight leading-tight font-body ${textColor} ${className}`}
      style={{
        ...inlineStyle,
        borderRadius: '8px'
      }}
    >
      {text}
    </h2>
  );

  // Agar animation nahi chahiye toh direct Content return karein
  if (noReveal) return Content;

  // Reveal wrapper wahi parameters use karega jo aapne original motion div mein diye thay
  return (
    <Reveal y={55} duration={0.9}>
      {Content}
    </Reveal>
  );
};

export default Heading2;