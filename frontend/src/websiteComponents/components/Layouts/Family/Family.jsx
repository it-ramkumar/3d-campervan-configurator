"use client";

import { motion } from "framer-motion";
import {Link} from "react-router-dom"
import BlackButton from "../../Common/Button/BlackButton";

// Placeholder images for the grid.
const image1 = "/images/limage1.png";
const image2 = "/images/limage2.png";
const image3 = "/images/limage3.jpg";
const image4 = "/images/limage4.png";

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


export default function Family() {
  return (
    // Adjusted padding for mobile (pt-12) and desktop (md:pt-20).
    <section className="bg-white text-black font-serif pt-12 md:pt-20 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Reduced margin on mobile (mb-8) and restored it for desktop (md:mb-12) */}
        <motion.div
          className="max-w-4xl mx-auto text-center mb-8 md:mb-12"
          initial="initial"
          whileInView="animate"
          variants={staggerContainer}
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.p
            className="text-[1.25rem] leading-relaxed text-gray-700"
            variants={fadeInUp}
          >
            Have a look at our completed projects. We’re honoured to serve clients from different states in the USA. We’ve built custom vans for families, couples, pet-owners, remote workers, surfers, bikers, etc, all while considering their specific needs. You can check them all here.
          </motion.p>
          <motion.div className="mt-6 text-gray-600" variants={fadeInUp}>
            <p className="mb-2">We have categorized our vans for you:</p>
            <ul className="list-disc list-inside inline-block text-left">
              <li>The first section consists of campervans for two people.</li>
              <li>The second section has vans for more than two people.</li>
            </ul>
          </motion.div>
          <motion.p
            className="mt-6 text-[1.25rem] leading-relaxed text-gray-700"
            variants={fadeInUp}
          >
            Browse to find inspiration for your dream campervan and to see our craftsmanship in every detail.
          </motion.p>
        </motion.div>

        {/* Reduced margin on mobile (mb-8) and restored it for desktop (md:mb-12) */}
        <motion.h2
          className="text-center font-bold text-4xl md:text-5xl lg:text-[3rem] mb-8 md:mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Campervans Layouts for Family (For 2+)
        </motion.h2>

        <motion.div
          className="grid grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Image 1 */}
          {/* CHANGED: Mobile height reduced from h-56 to h-48 */}
          <motion.div
            className="col-span-1 h-48 md:h-96"
            variants={fadeInUp}
          >
            <motion.img
              src={image1}
              alt="Campervan interior with bunk beds"
              className="w-full h-full object-cover rounded-3xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Image 2 */}
          {/* CHANGED: Mobile height reduced from h-56 to h-48 */}
          <motion.div className="col-span-1 h-48 md:h-96" variants={fadeInUp}>
            <motion.img
              src={image2}
              alt="Campervan kitchen and seating area"
              className="w-full h-full object-cover rounded-3xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Image 4 (Tall one) */}
          {/* NOTE: This image's height is reduced automatically because its rows are now shorter */}
          <motion.div className="col-span-1 row-span-2" variants={fadeInUp}>
            <motion.img
              src={image4}
              alt="Detailed view of campervan kitchen amenities"
              className="w-full h-full object-cover rounded-3xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Image 3 (Wide one) */}
          {/* CHANGED: Mobile height reduced from h-56 to h-48 to keep the grid aligned */}
          <motion.div className="col-span-2" variants={fadeInUp}>
            <motion.img
              src={image3}
              alt="Spacious interior view of a family campervan"
              className="w-full h-48 md:h-full object-cover rounded-3xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>
<div className="flex justify-center">

        <BlackButton label={" Click To Explore"} link={"/family-layout"}/>
        </div>
      </div>
    </section>
  );
}