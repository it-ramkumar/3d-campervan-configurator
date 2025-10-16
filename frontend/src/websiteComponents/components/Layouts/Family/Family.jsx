"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// --- NEW: Import icons from the library ---
import { MdFamilyRestroom } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";


// --- Enhanced Compact Category Item Component (No changes here) ---
const CategoryItem = ({ icon, title, description, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{
            y: -4,
            scale: 1.02,
            boxShadow: "0 12px 28px -8px rgba(0,0,0,0.15)",
            borderColor: "#3b82f6"
        }}
        transition={{
            duration: 0.3,
            ease: "easeOut",
            delay: delay,
            hover: { duration: 0.2 }
        }}
        viewport={{ once: true, amount: 0.5 }}
        className="group flex items-center w-full p-4 space-x-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer min-h-[80px]"
    >
        <div className="flex-shrink-0 p-2 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105 border border-gray-100">
            {icon}
        </div>

        <div className="flex-1 min-w-0">
            <h4 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-gray-800 transition-colors duration-300 truncate">
                {title}
            </h4>
            <p className="text-gray-600 leading-tight text-sm line-clamp-2">
                {description}
            </p>
        </div>

        {/* Subtle arrow indicator */}
        <motion.div
            initial={{ opacity: 0, x: -5 }}
            whileHover={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </motion.div>
    </motion.div>
);

// ... (The rest of your component code for images and animations remains the same)
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
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

export default function Family() {
  return (
    <section className="bg-white text-black font-serif pt-12 md:pt-20 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-8 md:mb-12"
          initial="initial"
          whileInView="animate"
          variants={staggerContainer}
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.p
            className="text-[1.25rem] leading-relaxed text-gray-700 mb-8"
            variants={fadeInUp}
          >
            Have a look at our completed projects. We're honoured to serve clients from different states in the USA. We've built custom vans for families, couples, pet-owners, remote workers, surfers, bikers, etc, all while considering their specific needs. You can check them all here.
          </motion.p>

          {/* --- REORDERED CATEGORIES SECTION - Family First, Couple Second --- */}
          <motion.div
            className="flex flex-col md:flex-row items-stretch justify-center gap-4 max-w-2xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex-1">
              <CategoryItem
              // --- NEW ICON USAGE ---
                  icon={<MdFamilyRestroom className="h-8 w-8 text-green-600" />}
                  title="For Families (2+)"
                  description="The first section has vans for larger groups."
                  delay={0.1}
              />
            </div>

            <div className="flex-1">
              <CategoryItem
              // --- NEW ICON USAGE ---
                  icon={<FaUserFriends className="h-8 w-8 text-blue-600" />}
                  title="For Two People"
                  description="The second section consists of these campervans."
                  delay={0.3}
              />
            </div>
          </motion.div>

          <motion.p
            className="mt-12 text-[1.25rem] leading-relaxed text-gray-700"
            variants={fadeInUp}
          >
            Browse to find inspiration for your dream campervan and to see our craftsmanship in every detail.
          </motion.p>
        </motion.div>

        {/* ... The rest of your code is unchanged ... */}
        <motion.h2
          className="text-center font-bold text-4xl md:text-5xl lg:text-[3rem] mb-8 md:mb-12 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
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
          <motion.div
            className="col-span-1 h-48 md:h-96"
            variants={fadeInUp}
          >
            <motion.img
              src={image1}
              alt="Campervan interior with bunk beds"
              className="w-full h-full object-cover rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Image 2 */}
          <motion.div className="col-span-1 h-48 md:h-96" variants={fadeInUp}>
            <motion.img
              src={image2}
              alt="Campervan kitchen and seating area"
              className="w-full h-full object-cover rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Image 4 (Tall one) */}
          <motion.div className="col-span-1 row-span-2" variants={fadeInUp}>
            <motion.img
              src={image4}
              alt="Detailed view of campervan kitchen amenities"
              className="w-full h-full object-cover rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Image 3 (Wide one) */}
          <motion.div className="col-span-2" variants={fadeInUp}>
            <motion.img
              src={image3}
              alt="Spacious interior view of a family campervan"
              className="w-full h-48 md:h-full object-cover rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>

        <Link to="/family-layout">
            <div className="flex justify-center">
            <motion.button
                className="bg-gradient-to-r from-[#2761FD] to-blue-600 text-white font-sans cursor-pointer font-bold text-lg rounded-xl w-48 h-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-600"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                Click To Explore
            </motion.button>
            </div>
        </Link>
      </div>
    </section>
  );
}