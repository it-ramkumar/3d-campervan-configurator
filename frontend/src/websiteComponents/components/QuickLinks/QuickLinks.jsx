import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const QuickLinksPage = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLinks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/quick-links`);
      setLinks(res.data.links || []);
    } catch (err) {
      console.error("Failed to load quick links", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  // Animation Variants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      <Navbar />

      <main className="relative pt-24 pb-32">
        {/* --- Minimalist Header --- */}
        <section className="flex flex-col items-center px-6 mb-16">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-1 border-2 border-black rounded-full mb-8"
          >
            <img
              src="/images/logoo.webp"
              alt="Brand Logo"
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain grayscale"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4 text-center"
          >
            Quick Links
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            className="h-1.5 bg-black mb-6"
          />

          <p className="max-w-md text-center text-gray-500 font-medium leading-tight">
            THE OFFICIAL HUB FOR ALL RESOURCES, SOCIAL CHANNELS, AND EXTERNAL CONNECTIONS.
          </p>
        </section>

        {/* --- Links Grid --- */}
        <section className="max-w-xl mx-auto px-6">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 w-full bg-gray-100 animate-pulse border border-gray-200" />
              ))}
            </div>
          ) : (
            <motion.div
              variants={containerVars}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-4"
            >
              <AnimatePresence>
                {links.map((link) => (
               // ... (baaki code same rahega, sirf link map ke andar ka content ye use karein)

<motion.a
  key={link._id}
  href={link.url}
  target="_blank"
  rel="noopener noreferrer"
  variants={itemVars}
  whileHover={{ x: 8 }}
  className="group relative flex items-center justify-between p-4 sm:p-5 bg-white border-2 border-black transition-colors duration-300 hover:bg-black hover:text-white min-h-[80px]"
>
  <div className="flex items-center gap-4 mr-4 min-w-0"> {/* min-w-0 is key for overflow */}

    {/* Icon Container */}
    <div className="relative flex-shrink-0 w-12 h-12 border border-gray-200 group-hover:border-white/20">
      {link.icon ? (
        <img
          src={link.icon}
          alt=""
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      ) : (
        <div className="w-full h-full bg-black group-hover:bg-white transition-colors" />
      )}
    </div>

    {/* Title Container - Overflow Fixed Here */}
    <div className="min-w-0">
      <span className="font-bold text-lg sm:text-xl uppercase tracking-tight break-words line-clamp-2 leading-tight block">
        {link.title}
      </span>
    </div>
  </div>

  {/* Arrow Icon - flex-shrink-0 ensures it doesn't get crushed */}
  <div className="flex-shrink-0 ml-2 transition-transform duration-300 group-hover:translate-x-1">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"/>
    </svg>
  </div>
</motion.a>
                ))}
              </AnimatePresence>

              {links.length === 0 && (
                <div className="text-center py-20 border-2 border-dashed border-gray-200">
                  <p className="text-gray-400 uppercase font-bold tracking-widest">Archive Empty</p>
                </div>
              )}
            </motion.div>
          )}
        </section>

        {/* --- Background Texture (Optional) --- */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] -z-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </main>

      <Footer />
    </div>
  );
};

export default QuickLinksPage;