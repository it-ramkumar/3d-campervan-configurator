"use client";

import { motion } from "framer-motion";
import { Snowflake, Thermometer, Bed } from "lucide-react"; // Icons for cold, heat, storage, and bed// Icons for cold, heat, storage, and bed
import BlackButton from "../../Common/Button/BlackButton";
import ImageWithSkeleton from "../../Common/ImageWithSkeleton/ImageWithSkeleton";

// Placeholder Images (Assuming you have new ones for Montreal)
const imageMT1 = "/images/mt-build-main.webp"; // Main snow/forest shot
const imageMT2 = "/images/mt-build-insulation.webp"; // Wall insulation detail
const imageMT3 = "/images/mt-build-storage.webp"; // Custom storage detail
const imageMT4 = "/images/mt-build-bed.webp"; // Fixed bed area

// --- Framer Motion Variants (Reused for Consistency) ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeInUpSoft = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } },
};

// Helper Component for Stats Cards (Soft Neumorphism-like feel)
const StatCard = ({ value, label, variants }) => (
  <motion.div
    className="p-6 bg-gray-100 rounded-xl shadow-inner text-gray-800 cursor-pointer"
    variants={variants}
    whileHover={{
        y: 1,
        scale: 0.99,
        boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)"
    }}
    transition={{ duration: 0.2 }}
  >
    <div className="font-serif text-5xl font-extrabold text-amber-600 mb-1">{value}</div>
    <div className="font-sans uppercase tracking-wider text-xs text-gray-600">{label}</div>
  </motion.div>
);

export default function MontrealBuild() {
  return (
    <motion.section
      className="bg-gray-50 text-gray-800 pt-16 md:pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            className="font-serif text-5xl md:text-6xl font-light mb-3 tracking-tight text-amber-600"
            variants={fadeInUpSoft}
          >
            The Montreal Build
          </motion.h1>
          <motion.p
            className="font-sans text-xl text-gray-600 max-w-2xl mx-auto italic"
            variants={fadeInUpSoft}
          >
            A rugged, fully insulated home on wheels for year-round adventure.
          </motion.p>
        </div>

        {/* Stats & Main Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {/* Main Image Block */}
          <motion.div
            className="lg:col-span-2 overflow-hidden rounded-xl shadow-lg"
            variants={fadeInUpSoft}
          >
            <motion.div
              className="w-full h-80 md:h-96"
              whileHover={{ scale: 1.01, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)" }}
              transition={{ duration: 0.3 }}
            >
              <ImageWithSkeleton
                src={imageMT1}
                alt="Montreal build van in a snowy forest"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-6">
            <StatCard value="-20°C" label="Tested Rating" variants={fadeInUpSoft} />
            <StatCard value="R-10" label="Wall Insulation" variants={fadeInUpSoft} />
            <StatCard value="230Ah" label="Heated Battery" variants={fadeInUpSoft} />
          </div>
        </div>

        {/* Feature Showcase */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Feature 1: Four-Season Comfort */}
          <motion.div className="space-y-6 p-6 bg-white rounded-xl shadow-md" variants={fadeInUpSoft}>
            <h3 className="font-serif text-3xl font-light flex items-center gap-3">
              <Thermometer className="w-7 h-7 text-amber-600" />
              Intelligent Climate
            </h3>
            <p className="font-sans text-gray-700">
              Integrated diesel air and water heater system maintains perfect interior temperatures, complemented by superior foam board insulation.
            </p>
            <motion.div className="overflow-hidden rounded-lg">
              <motion.div
                className="w-full h-48"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <ImageWithSkeleton
                  src={imageMT2}
                  alt="Detail of the van's thick wall insulation"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Feature 2: Classic Design & Storage */}
          <motion.div className="space-y-6 p-6 bg-white rounded-xl shadow-md" variants={fadeInUpSoft}>
            <h3 className="font-serif text-3xl font-light flex items-center gap-3">
              {/* <Cabinet className="w-7 h-7 text-amber-600" /> */}
              Handcrafted Joinery
            </h3>
            <p className="font-sans text-gray-700">
              Dark walnut finishes and custom cabinet pulls give a refined, cabin-like feel, with ample hidden storage for winter gear.
            </p>
            <motion.div className="overflow-hidden rounded-lg">
              <motion.div
                className="w-full h-48"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <ImageWithSkeleton
                  src={imageMT3}
                  alt="Custom walnut storage cabinets"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        {/* Button */}
        <motion.div className="text-center mt-12" variants={fadeInUpSoft}>
          <BlackButton label="Explore Four-Season Builds" link="/portfolio/montreal-build" />
        </motion.div>
      </div>
    </motion.section>
  );
}