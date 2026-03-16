import React from "react";
import { motion } from "framer-motion";

const RichParagraph = ({
  children,
  html,
  textColor = "text-[#5A5A5A]",
  className = "",
  inlineStyle = {},
  onClick
}) => {
  const baseStyles = "text-[14px] sm:text-base lg:text-[15px] leading-relaxed tracking-tighter font-body opacity-90";

  // Animation variants
  const fadeInVariant = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 0.9,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const commonProps = {
    // Framer Motion specific props
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-50px" }, // Jab screen ke thora andar aaye tab trigger ho
    variants: fadeInVariant,

    onClick: onClick,
    className: `${baseStyles} ${textColor} ${className}`,
    style: { ...inlineStyle, borderRadius: '8px' } // Rounded borders as per your preference
  };

  if (html) {
    return (
      <motion.div
        {...commonProps}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <motion.div {...commonProps}>
      {children}
    </motion.div>
  );
};

export default RichParagraph;