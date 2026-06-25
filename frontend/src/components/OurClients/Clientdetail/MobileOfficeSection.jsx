"use client"
import React from "react";
import { Briefcase, Camera, Heart, Users, Zap, Home, Video } from "lucide-react";
import { motion } from "framer-motion";
import { Heading2, Heading4, RichParagraph } from "../../Common/Common";

const MobileOfficeSection = () => {
  const businessUnits = [
    { title: "Mobile Photography Studios", icon: Camera },
    { title: "Psychology Offices", icon: Heart },
    { title: "Massage Cabins", icon: Users },
    { title: "Video Production Studios", icon: Video },
    { title: "Gaming Setups", icon: Zap },
    { title: "Mobile Libraries", icon: Home },
  ];

  return (
    <section className="bbv-section-navy relative py-20 lg:py-28">
      <div className="bbv-dot-grid" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <p className="text-hover text-xs uppercase tracking-widest font-bold mb-3">Business on the Road</p>
          <div className="p-4 bbv-glass-light rounded-lg text-hover shadow-xl mb-6">
            <Briefcase size={36} />
          </div>
          <Heading2 text="Mobile Office Campervans" className="font-display text-secondary uppercase tracking-wide mb-4" />
          <div className="bbv-divider mb-6" />
          <RichParagraph className="font-bold text-secondary/70 uppercase">
            Smart business investments that double as personal escapes
          </RichParagraph>
        </div>

        <div className="max-w-4xl mx-auto text-center mb-20 space-y-6">
          <RichParagraph className="text-secondary/80">
            A campervan can be more than just a camper. It can be a smart business investment that doubles as a personal escape.
          </RichParagraph>
          <div className="inline-block px-6 py-2 bg-hover text-primary rounded-lg font-black text-xs uppercase tracking-widest">
            We've built mobile units that double as:
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {businessUnits.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bbv-glass-light p-8 rounded-lg border-b-4 border-hover flex flex-col items-center text-center group hover:bg-hover/10 transition-all duration-500"
            >
              <div className="w-20 h-20 bg-hover/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-hover group-hover:rotate-6 transition-all duration-300">
                <item.icon className="w-10 h-10 text-hover group-hover:text-primary transition-colors duration-300" />
              </div>
              <Heading4 text={item.title} className="font-display text-secondary uppercase tracking-wide group-hover:text-hover transition-colors" />
            </motion.div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto bbv-glass-light border border-hover/30 p-8 md:p-12 rounded-lg shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-hover opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="shrink-0 hidden md:block">
              <div className="w-24 h-24 border-2 border-hover/30 rounded-lg flex items-center justify-center">
                <Zap className="text-hover" size={40} />
              </div>
            </div>
            <RichParagraph className="text-secondary/80 text-center md:text-left">
              A Big Bear Van serves as both a personal luxury and a business asset for you. It's a smart way to enjoy a camper while also investing in a versatile business tool.
            </RichParagraph>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileOfficeSection;
