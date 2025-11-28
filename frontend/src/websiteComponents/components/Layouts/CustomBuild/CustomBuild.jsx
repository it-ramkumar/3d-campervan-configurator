"use client";

import { motion } from "framer-motion";
import { Sparkles, Compass } from "lucide-react"; // Using luxurious icons
import BlackButton from "../../Common/Button/BlackButton";
import ImageWithSkeleton from "../../Common/ImageWithSkeleton/ImageWithSkeleton";

// Image Paths
const image1 = "/images/limage1.webp";
const image3 = "/images/limage3.webp";
const image4 = "/images/limage4.webp";

// --- Framer Motion Variants ---

// Parent container for stagger effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Slightly slower stagger for elegance
    },
  },
};

// Fade-in-up with soft easing
const fadeInUpSoft = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } },
};

export default function PortfolioCustom() {
  return (
    <motion.section
      className="bg-gray-50 text-gray-800 pt-16 md:pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden" // Soft Gray Background
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header (Elegant Serif) */}
        <div className="text-center mb-16">
          <motion.h1
            className="font-serif text-5xl md:text-6xl font-light mb-3 tracking-tight"
            variants={fadeInUpSoft}
          >
            Portfolio Custom Build
          </motion.h1>
          <motion.p
            className="font-sans text-xl text-gray-600 max-w-2xl mx-auto italic"
            variants={fadeInUpSoft}
          >
            Bespoke van conversions where craftsmanship meets innovation
          </motion.p>
        </div>

        {/* Stats & Main Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {/* Main Image Block */}
          <motion.div
            className="lg:col-span-2 overflow-hidden rounded-xl shadow-lg" // Rounded corners and soft shadow
            variants={fadeInUpSoft}
          >
            <motion.div
              className="w-full h-80 md:h-96"
              whileHover={{ scale: 1.01, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)" }} // Subtle lift and deeper shadow
              transition={{ duration: 0.3 }}
            >
              <ImageWithSkeleton
                src={image1}
                alt="Custom build masterpiece"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Stat Cards (Elegant Layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-6">
            <StatCard value="100%" label="Custom Designed" variants={fadeInUpSoft} />
            <StatCard value="12-16" label="Weeks Build Time" variants={fadeInUpSoft} />
            <StatCard value="∞" label="Design Possibilities" variants={fadeInUpSoft} />
          </div>
        </div>

        {/* Feature Showcase */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Feature 1: Materials */}
          <motion.div className="space-y-6 p-6 bg-white rounded-xl shadow-md" variants={fadeInUpSoft}>
            <h3 className="font-serif text-3xl font-light flex items-center gap-3">
              <Sparkles className="w-7 h-7 text-amber-600" /> {/* Gold Accent Icon */}
              Premium Materials
            </h3>
            <p className="font-sans text-gray-700">
              Every custom build features hand-selected materials, precision engineering,
              and attention to detail that sets our portfolio builds apart.
            </p>
            <motion.div className="overflow-hidden rounded-lg">
              <motion.div
                className="w-full h-48"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <ImageWithSkeleton
                  src={image3}
                  alt="Material detail"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Feature 2: Proportions */}
          <motion.div className="space-y-6 p-6 bg-white rounded-xl shadow-md" variants={fadeInUpSoft}>
            <h3 className="font-serif text-3xl font-light flex items-center gap-3">
              <Compass className="w-7 h-7 text-amber-600" /> {/* Gold Accent Icon */}
              Perfect Proportions
            </h3>
            <p className="font-sans text-gray-700">
              Optimized space utilization with custom storage solutions and
              ergonomic designs tailored to your specific needs.
            </p>
            <motion.div className="overflow-hidden rounded-lg">
              <motion.div
                className="w-full h-48"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <ImageWithSkeleton
                  src={image4}
                  alt="Space optimization"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Button */}
        <motion.div className="text-center mt-12" variants={fadeInUpSoft}>
          <BlackButton label="Explore Luxury Builds" link="/portfolio-custom" />
        </motion.div>
      </div>
    </motion.section>
  );
}

// Helper Component for Stats Cards (Soft Neumorphism-like feel)
const StatCard = ({ value, label, variants }) => (
  <motion.div
    className="p-6 bg-gray-100 rounded-xl shadow-inner text-gray-800 cursor-pointer" // Light background with inner shadow for depth
    variants={variants}
    // Subtle Press-in effect on hover
    whileHover={{
        y: 1,
        scale: 0.99,
        boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)" // Deeper inner shadow to look pressed
    }}
    transition={{ duration: 0.2 }}
  >
    <div className="font-serif text-5xl font-extrabold text-amber-600 mb-1">{value}</div> {/* Gold Accent */}
    <div className="font-sans uppercase tracking-wider text-xs text-gray-600">{label}</div>
  </motion.div>
);