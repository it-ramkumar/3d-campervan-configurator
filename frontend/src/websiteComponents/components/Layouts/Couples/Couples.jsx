"use client";

import { motion } from "framer-motion";
import {Link} from "react-router-dom"
import BlackButton from "../../Common/Button/BlackButton"

// Placeholder images for the grid.
const image1 = "/images/image5l.png";
const image2 = "/images/image6l.png";
const image3 = "/images/image7l.png";
const image4 = "/images/image8l.png";

// Animation variants
const fadeInUp = {
  initial: { y: 60, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.2 },
  },
};

export default function Couples() {
  return (
    // CHANGED: Reduced top padding for mobile (pt-8) and desktop (md:pt-12).
    <section className="bg-white text-black font-serif pt-8 md:pt-12 pb-12 md:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading with animation */}
        <motion.h2
          className="text-center font-bold text-4xl md:text-5xl lg:text-[3rem] mt-0 mb-8 md:mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Campervans Layouts for Couples (For 2)
        </motion.h2>

        {/* Image Grid */}
        <motion.div
          className="grid grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Image 1 */}
          <motion.div
            className="col-span-1 h-48 md:h-96"
            variants={fadeInUp}
          >
            <motion.img
              src={image1}
              alt="Campervan interior for couples"
              className="w-full h-full object-cover rounded-3xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Image 2 */}
          <motion.div className="col-span-1 h-48 md:h-96" variants={fadeInUp}>
            <motion.img
              src={image2}
              alt="Campervan kitchen and seating area for couples"
              className="w-full h-full object-cover rounded-3xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Image 4 (Tall one) */}
          <motion.div className="col-span-1 row-span-2" variants={fadeInUp}>
            <motion.img
              src={image4}
              alt="Detailed view of campervan bedroom for couples"
              className="w-full h-full object-cover rounded-3xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Image 3 (Wide one) */}
          <motion.div className="col-span-2" variants={fadeInUp}>
            <motion.img
              src={image3}
              alt="Spacious interior view of a couple's campervan"
              className="w-full h-48 md:h-full object-cover rounded-3xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>

        <div className="flex justify-center">

        <BlackButton label={" Click To Explore"} link={"/couples-layout"}/>
        </div>

      </div>
    </section>
  );
}