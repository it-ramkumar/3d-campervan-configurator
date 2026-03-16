import React from "react";
import { motion } from "framer-motion";

const Heading1 = ({
  text = "Title",
  textColor = "text-secondary", // Aapki theme ka F5F5F0 ya 001F3D
  className = "",
  inlineStyle = {}
}) => {

  // Animation settings
  const headingVariants = {
    hidden: {
      opacity: 0,
      y: 60
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for "slow & premium" feel
      }
    }
  };

  return (
    <motion.h1
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={headingVariants}
      className={`text-3xl sm:text-4xl md:text-5xl lg:text-[64px] xl:text-[72px] font-semibold leading-tight tracking-tight font-body ${textColor} ${className}`}
      style={{
        ...inlineStyle,
        borderRadius: '8px' // Rounded borders as per your instructions
      }}
    >
      {text}
    </motion.h1>
  );
};

export default Heading1;