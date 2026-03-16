import React from "react";
import { motion } from "framer-motion";

const Heading3 = ({
  text = "",
  textColor = "text-primary", // 001F3D
  className = "",
  inlineStyle = {}
}) => {

  // Animation variants
  const heading3Variants = {
    hidden: {
      opacity: 0,
      y: 30 // H1 aur H2 se thora kam displacement taake subtle lage
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6, // Thora fast reveal
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.h3
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={heading3Variants}
      className={`text-base sm:text-base lg:text-2xl font-semibold tracking-tighter leading-snug font-body ${textColor} ${className}`}
      style={{
        ...inlineStyle,
        borderRadius: '8px' // Rounded borders constraint
      }}
    >
      {text}
    </motion.h3>
  );
};

export default Heading3;