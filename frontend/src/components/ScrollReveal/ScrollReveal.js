import { motion } from "framer-motion";

export function ScrollReveal({ children, delay = 0, yOffset = 40 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }} // Screen ke andar aate hi chalega
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.16, 1, 0.3, 1] // Custom Cinematic Ease-Out
      }}
    >
      {children}
    </motion.div>
  );
}