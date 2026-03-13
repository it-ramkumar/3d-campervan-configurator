"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Helmet } from 'react-helmet-async';

// --- SCHEMA GENERATOR ---
const generateQuickLinksSchema = (links) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Quick Links - Big Bear Vans",
  "description": "Official hub for all Big Bear Vans resources and social channels.",
  "url": "https://bigbearvans.com/quick-links",
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": links.length,
    "itemListElement": links.map((link, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "WebPage",
        "name": link.title,
        "url": link.url
      }
    }))
  }
});

const QuickLinksPage = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  // SEO Constants
  const pageTitle = "Quick Links - Big Bear Vans | Official Resource Hub";
  const pageDescription = "Access all official Big Bear Vans resources, social media channels, and contact links in one place.";
  const pageUrl = "https://bigbearvans.com/quick-links";
  const pageImage = "https://bigbearvans.com/images/blackLogo.jpg";

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

  // Framer Motion Variants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* ✅ SEO FIX: Helmet loading se bahar hai taake Title hamesha show ho */}
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />

        {/* Schema */}
        <script type="application/ld+json">
          {JSON.stringify(generateQuickLinksSchema(links))}
        </script>
      </Helmet>

      {/* ✅ OUTLINKS FIX: Navbar loading se bahar hai */}
      <Navbar />

      <div className="min-h-screen bg-[#F5F5F0] text-[#001F3D] selection:bg-[#001F3D] selection:text-white">
        <main className="relative pt-24 pb-32">

          {/* --- Header Section (Hamesha visible taake Duplicate Content ka masla na ho) --- */}
          <section className="flex flex-col items-center px-6 mb-16">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-1 border-2 border-[#001F3D] rounded-full mb-8"
            >
              <img src="/images/logoo.webp" alt="Logo" className="w-20 h-20 object-contain grayscale" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4 text-center"
            >
              Quick Links
            </motion.h1>

            <div className="h-1.5 w-20 bg-[#001F3D] mb-6" />

            <p className="max-w-md text-center text-gray-500 font-medium uppercase text-sm tracking-wide">
              The official hub for all resources and connections.
            </p>
          </section>

          {/* --- Links Grid Section --- */}
          <section className="max-w-xl mx-auto px-6">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-20 w-full bg-white/50 animate-pulse border border-[#ACBAC4] rounded-[8px]" />
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
                    <motion.a
                      key={link._id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={itemVars}
                      whileHover={{ x: 8 }}
                      // ✅ THEME FIX: Normal Rounded Borders (8px) and Theme Colors
                      className="group relative flex items-center justify-between p-5 bg-white border-2 border-[#001F3D] rounded-[8px] transition-all duration-300 hover:bg-[#001F3D] hover:text-white min-h-[80px] shadow-sm"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        {/* Icon Container */}
                        <div className="relative flex-shrink-0 w-12 h-12 border border-[#ACBAC4] rounded-[4px] overflow-hidden group-hover:border-white/20">
                          {link.icon ? (
                            <img src={link.icon} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                          ) : (
                            <div className="w-full h-full bg-[#001F3D] group-hover:bg-white" />
                          )}
                        </div>

                        {/* Title */}
                        <div className="min-w-0">
                          <span className="font-bold text-lg uppercase tracking-tight line-clamp-1">
                            {link.title}
                          </span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="flex-shrink-0 ml-2 transition-transform group-hover:translate-x-1">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12H19M19 12L13 6M19 12L13 18" strokeLinecap="square"/>
                        </svg>
                      </div>
                    </motion.a>
                  ))}
                </AnimatePresence>

                {links.length === 0 && (
                  <div className="text-center py-20 border-2 border-dashed border-[#ACBAC4] rounded-[8px]">
                    <p className="text-[#ACBAC4] uppercase font-bold tracking-widest text-sm">No Links Available</p>
                  </div>
                )}
              </motion.div>
            )}
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default QuickLinksPage;