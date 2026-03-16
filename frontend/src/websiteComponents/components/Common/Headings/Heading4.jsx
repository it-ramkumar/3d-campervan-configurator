import React from "react";
import { motion } from "framer-motion";

const Heading4 = ({
  text = "",
  textColor = "text-primary",
  className = "",
  inlineStyle = {}
}) => {

  // Minimalist animation for sub-headings
  const heading4Variants = {
    hidden: {
      opacity: 0,
      y: 15 // Very subtle move
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5, // Quick reveal
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.h4
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      variants={heading4Variants}
      className={`text-base sm:text-lg lg:text-xl font-semibold tracking-tighter leading-snug font-body ${textColor} ${className}`}
      style={{
        ...inlineStyle,
        borderRadius: '8px' // Following your rounded borders rule
      }}
    >
      {text}
    </motion.h4>
  );
};

export default Heading4;