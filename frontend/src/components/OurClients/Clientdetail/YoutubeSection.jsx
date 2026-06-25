"use client"
import React from 'react'
import { Heading2 } from '../../Common/Common'
import { motion } from "framer-motion";

export default function YoutubeSection() {
  return (
    <section className="bbv-section-navy relative py-16 md:py-24">
      <div className="bbv-dot-grid" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <p className="text-hover text-xs uppercase tracking-widest font-bold mb-3">Watch & Explore</p>
          <Heading2 text="See Our Vans in Action" className="font-display text-secondary uppercase tracking-wide" />
          <div className="bbv-divider mt-6" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            "_O6VyFcGD0A",
            "Qz4oqmWolC8",
            "LVlpGPNm8xo",
            "C7oKRJ_AhFY",
          ].map((videoId, index) => (
            <motion.div
              key={videoId}
              className="bbv-glass rounded-lg border border-hover/30 hover:border-hover/60 hover:shadow-2xl transition-all duration-300 overflow-hidden aspect-video lg:aspect-[9/16] relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <iframe
                className="w-full h-full lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:h-full lg:aspect-video"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
