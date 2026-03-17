import React from "react";
import { motion } from "framer-motion";

const RichParagraph = ({
  children,
  html,
  textColor = "text-secondary",
  className = "",
  inlineStyle = {},
  onClick
}) => {
  const baseStyles = "text-[14px] sm:text-base lg:text-[15px] leading-relaxed tracking-tighter font-body opacity-90";

  // Animation variants
  const fadeInVariant = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 0.9,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

const commonProps = {
    initial: "hidden",
    whileInView: "visible",
    // once: false karne se ye har baar scroll par chale ga
    // amount: 0.1 ka matlab hai jab 10% element nazar aaye tab animation shuru ho
    viewport: { once: false, amount: 0.1, margin: "-50px" },
    variants: fadeInVariant,

    onClick: onClick,
    className: `${baseStyles} ${textColor} ${className}`,
    style: { ...inlineStyle, borderRadius: '8px' }
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