import React from "react";
import Reveal from "./Reveal"; // Wrapper ko import kiya

const Heading1 = ({
  text = "Title",
  textColor = "text-secondary",
  className = "",
  inlineStyle = {},
  noReveal = false // Agar kabhi animation nahi chahiye ho
}) => {

  // Asli H1 tag jo Google crawl karega
  const Content = (
    <h1
      className={`text-3xl sm:text-4xl md:text-5xl lg:text-[64px] xl:text-[72px] font-semibold leading-tight tracking-tight font-body ${textColor} ${className}`}
      style={{
        ...inlineStyle,
        borderRadius: '8px'
      }}
    >
      {text}
    </h1>
  );

  // Agar animation chahiye (default), toh Reveal wrapper use karein
  if (noReveal) return Content;

  return <Reveal>{Content}</Reveal>;
};

export default Heading1;