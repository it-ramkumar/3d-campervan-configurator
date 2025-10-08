"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import framer-motion
import { FaCog, FaFeatherAlt, FaRulerCombined, FaBolt, FaBed, FaPalette } from 'react-icons/fa';

// NEW: Reusable component for the word-by-word heading animation
const AnimatedHeading = ({ title }) => {
  const words = title.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.h2
      className="text-4xl md:text-5xl font-bold text-black text-center mb-12"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "0.5rem" }} // Adjust spacing between words
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
};


export default function Mission() {
  const advantages = [
    {
      icon: <FaCog size={40} />,
      text: "At Big Bear Vans, our van builders are dedicated to crafting the exact camper build you envision. From the initial concept to the final product, you can see a video model of your future campervan and make any changes you desire. This custom approach is complemented by our in-house painting and staining services, where you choose your colors and finishes to personalize every detail of your camper build."
    },
    {
      icon: <FaFeatherAlt size={40} />,
      text: "We use lightweight plywood for paneling and cabinets to reduce the weight of your campervan, ensuring that it performs efficiently on the road. With extensive experience from building over 105 custom camper builds, our team offers unparalleled expertise on vanlife products and solutions, helping you make informed decisions based on what works best."
    },
    {
      icon: <FaRulerCombined size={40} />,
      text: "Our commitment to staying ahead of market trends means that we incorporate the latest innovations into our camper builds. This includes advancements such as new window types, elevator beds, and other features that set us apart in the campervan sites."
    },
    {
      icon: <FaBolt size={40} />,
      text: "Precision is key in our engineering process. We utilize 3D CAD programs and CNC machines for exact cuts and designs, and our advanced 3D scanner ensures perfect measurements and fit for your campervan. Additionally, we produce our own electrical components, which come with a warranty and quick replacement service, ensuring long-term reliability for your camper build."
    },
    {
      icon: <FaBed size={40} />,
      text: "Our state-of-the-art elevator beds are designed with a unique expandable base, providing space-saving solutions tailored to your needs. Each campervan is meticulously insulated, including doors, wheel wells, headliner, and floors, to guarantee comfort in all climates."
    },
    {
      icon: <FaPalette size={40} />,
      text: "The designs of our camper builds reflect your personal style and preferences, with customized storage solutions and beautiful interiors. We offer compact aluminum bathrooms to maximize space, and our optimized roof space includes solar panels, fans, A/C, skylights, awnings, and decking, all tailored to enhance your experience."
    }
  ];

  // Animation variants for sections fading in
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Stagger container for advantage cards
  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Individual card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };


  return (
    <div className="bg-white min-h-screen py-16 px-4 md:px-12 lg:px-24 font-serif overflow-x-hidden">

      {/* Mission and Purpose Section */}
      <motion.div 
        className="flex flex-col items-center mb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <AnimatedHeading title="Mission and Purpose" />
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full max-w-7xl">
          {/* Image */}
          <motion.div 
            className="w-full lg:w-1/2 flex-shrink-0 p-2 border-2 border-gray-800 rounded-[18px]"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            // NEW: Continuous floating animation
            animate={{ y: ["0rem", "-0.75rem", "0rem"] }}
            whileHover={{ y: "-0.75rem", scale: 1.02, boxShadow: "0px 10px 30px rgba(0,0,0,0.1)" }}
          >
            <img
              src="/images/mission.png"
              alt="Cozy interior of a custom campervan"
              className="rounded-[15px] w-full h-auto object-cover max-w-[650px] mx-auto max-h-[550px]"
            />
          </motion.div>
          {/* Text */}
          <motion.div 
            className="w-full lg:w-1/2 max-w-[562px]"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <p className="text-xl md:text-2xl text-black leading-relaxed">
              At Big Bear Vans, our mission is to help more people hit the road sooner in their dream rigs. We focus on creating custom campervans that maximize space, especially for families needing to sit and sleep 4-5 people comfortably. Our camper builds feature innovative solutions like elevator beds, compact aluminum bathrooms, and custom kitchens to ensure optimal use of space and comfort. Additionally, our vans feature beautiful interior designs with personalized finishes, making each campervan unique and tailored to our clients' tastes.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Our Advantages Section */}
      <motion.div 
        className="flex flex-col items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <AnimatedHeading title="Our Advantages" />
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              className="group bg-black text-white rounded-[10px] p-8 flex flex-col items-center text-center shadow-lg cursor-pointer"
              style={{ minHeight: '500px' }}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.03, 
                boxShadow: "0px 20px 40px rgba(0,0,0,0.25)" 
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 15 
              }}
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 text-black group-hover:text-blue-600 transition-colors duration-300 ease-in-out">
                {/* NEW: Added motion.div to icon for individual hover animation */}
                <motion.div whileHover={{ rotate: 360, scale: 1.1 }}>
                  {advantage.icon}
                </motion.div>
              </div>
              <p className="text-lg leading-relaxed">
                {advantage.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}