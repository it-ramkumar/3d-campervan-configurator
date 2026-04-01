"use client"
import { motion } from "framer-motion";
import { RichParagraph } from "../../Common/Common";

export default function GraphicFeature({ text, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-primary/5"
    >
      <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mb-4 transition-transform hover:scale-105">
        {/* Graphic content goes here */}
      </div>
      <RichParagraph className="text-primary/80 font-medium">
        {text}
      </RichParagraph>
    </motion.div>
  );
}