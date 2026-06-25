"use client"
import { motion } from "framer-motion";
import { RichParagraph } from "../../Common/Common";

export default function GraphicFeature({ text, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="flex flex-col items-center text-center p-6 bbv-glass rounded-lg border border-hover/20 hover:border-hover/40 transition-all duration-300"
    >
      <div className="w-16 h-16 bg-hover/20 rounded-lg flex items-center justify-center mb-4 transition-transform hover:scale-105 border border-hover/30">
        {/* Graphic content goes here */}
      </div>
      <RichParagraph className="text-secondary/80 font-medium">
        {text}
      </RichParagraph>
    </motion.div>
  );
}
