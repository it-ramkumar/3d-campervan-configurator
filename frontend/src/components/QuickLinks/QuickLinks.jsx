"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const containerVars = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVars = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function QuickLinksClient({ initialLinks }) {
  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#001F3D] selection:bg-[#001F3D] selection:text-white">
      <main className="relative pt-24 pb-32">

        {/* Header Section */}
        <section className="flex flex-col items-center px-6 mb-16">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-1 border-2 border-[#001F3D] rounded-full mb-8"
          >
            <Image src="/images/logoo.webp" alt="Logo" className="object-contain grayscale" width={80} height={80}  />
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

        {/* Links Grid */}
        <section className="max-w-xl mx-auto px-6">
          <motion.div
            variants={containerVars}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-4"
          >
            <AnimatePresence mode="popLayout">
              {initialLinks.map((link) => (
                <motion.a
                  key={link._id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVars}
                  whileHover={{ x: 8 }}
                  className="group relative flex items-center justify-between p-5 bg-white border-2 border-[#001F3D] rounded-[8px] transition-all duration-300 hover:bg-[#001F3D] hover:text-white min-h-[80px] shadow-sm"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="relative flex-shrink-0 w-12 h-12 border border-[#ACBAC4] rounded-[4px] overflow-hidden group-hover:border-white/20">
                      {link.icon ? (
                        <Image src={link.icon} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" width={48} height={48} />
                      ) : (
                        <div className="w-full h-full bg-[#001F3D] group-hover:bg-white" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <span className="font-bold text-lg uppercase tracking-tight line-clamp-1">
                        {link.title}
                      </span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 ml-2 transition-transform group-hover:translate-x-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12H19M19 12L13 6M19 12L13 18" strokeLinecap="square"/>
                    </svg>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>

            {initialLinks.length === 0 && (
              <div className="text-center py-20 border-2 border-dashed border-[#ACBAC4] rounded-[8px]">
                <p className="text-[#ACBAC4] uppercase font-bold tracking-widest text-sm">No Links Available</p>
              </div>
            )}
          </motion.div>
        </section>
      </main>
    </div>
  );
}