import React from "react";
import { motion } from "framer-motion";

const Heading2 = ({
  text = "Section Title",
  textColor = "text-primary", // Aapki theme ka 001F3D (Deep Blue)
  className = "",
  inlineStyle = {}
}) => {

  // Animation settings for a smooth reveal
  const heading2Variants = {
    hidden: {
      opacity: 0,
      y: 55 // Thora sa niche se start hoga
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9, // RichParagraph se thora slow taake hierarchy nazar aaye
        ease: [0.25, 0.1, 0.25, 1] // Smooth ease-out
      }
    }
  };

  return (
    <motion.h2
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }} // Jab screen mein 80px andar aye tab chale
      variants={heading2Variants}
      className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight leading-tight font-body ${textColor} ${className}`}
      style={{
        ...inlineStyle,
        borderRadius: '8px' // Rounded borders constraint followed
      }}
    >
      {text}
    </motion.h2>
  );
};

export default Heading2;