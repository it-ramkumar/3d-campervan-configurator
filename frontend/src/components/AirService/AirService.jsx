"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plane, Car, MapPin, Navigation, Clock } from "lucide-react";
import { airportData } from "../../DataUseInComp/AirportData";
import { Heading2, Heading4, RichParagraph } from '../Common/Common';

const AirportCard = ({ airport, code, time, description, isPrivate = false, index }) => (
  <motion.div
    className="group relative bg-white p-6 rounded-[32px] border border-primary/5 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden w-full"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -10 }}
  >
    {/* Dynamic Top Accent using your primary/hover classes */}
    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${isPrivate ? 'from-amber-400 to-amber-600' : 'from-primary/10 to-hover/20'}`}></div>

    <div className="relative z-10">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-secondary/30 rounded-2xl group-hover:bg-hover group-hover:text-white transition-all duration-300">
            <Plane size={24} strokeWidth={1.5} className="text-primary group-hover:text-white" />
          </div>
          <div>
            <Heading4 text={airport} className="text-primary" />
            {code && (
              <RichParagraph className="text-primary/40 uppercase">{code}</RichParagraph>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-secondary/50 px-3 py-1 rounded-full text-[10px] font-bold text-primary">
          <Clock size={12} />
          {time}
        </div>
      </div>

      <RichParagraph className="!text-primary/70 mb-6">
        {description}
      </RichParagraph>

      {isPrivate && (
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border border-amber-200">
          <RichParagraph className="w-1.5 h-1.5 bg-hoverrounded-lg animate-pulse"></RichParagraph>
          Private Aviation Friendly
        </div>
      )}
    </div>
  </motion.div>
);

export default function AirService() {
  return (
    <motion.div
      className="max-w-6xl mx-auto mt-32 relative px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* Background Decorative Rings using Primary color */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] border border-primary/5 rounded-full opacity-50" />
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-[2rem] shadow-lg mb-8 text-primary"
          >
            <Navigation size={32} strokeWidth={1.5} />
          </motion.div>
          <Heading2 text="How to Get Here?" className="text-primary" />
          <RichParagraph className="max-w-xl mx-auto mt-4 !text-primary/60 italic">
            "Your adventure starts the moment you land. We've mapped out the easiest routes to our Big Bear facility."
          </RichParagraph>
        </div>

        {/* Airport Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {airportData.slice(0, 3).map((airport, index) => (
            <AirportCard key={index} {...airport} index={index} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {airportData.slice(3, 5).map((airport, index) => (
            <AirportCard key={index + 3} {...airport} index={index + 3} />
          ))}
        </div>

        {/* Premium Pickup Service CTA using Primary & Hover classes */}
        {/* <motion.div
          className="mt-20 bg-primary rounded-lg p-8 md:p-12 text-secondary shadow-2xl relative overflow-hidden group"
          whileHover={{ scale: 1.01 }}
        >

          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none overflow-hidden">
             <Car className="absolute -right-10 top-1/2 -translate-y-1/2 w-64 h-64 -rotate-12" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="flex items-center gap-8">
              <div className="w-20 h-20 bg-secondary/10 rounded-lg flex items-center justify-center border border-white/20 shrink-0">
                <Car size={40} className="text-white" />
              </div>
              <div>
                <Heading4 text="Complimentary Valet Pickup" className="text-white mb-2" />
                <RichParagraph className="opacity-70 w-max-4xl text-secondary">
                  Skip the rental counter. Our team will meet you directly at arrivals in a custom Sprinter to bring you to HQ.
                </RichParagraph>
              </div>
            </div>

            <Link href="/contact" className="w-full lg:w-auto">
              <motion.button
                className="w-full lg:w-auto px-10 py-5 bg-secondary text-primary rounded-lg font-black text-xs uppercase tracking-[0.2em] hover:bg-hover hover:text-white transition-all shadow-xl"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule My Pickup
              </motion.button>
            </Link>
          </div>
        </motion.div> */}
      </div>
    </motion.div>
  );
}