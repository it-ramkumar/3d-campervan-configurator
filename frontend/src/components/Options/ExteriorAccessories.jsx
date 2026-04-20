"use client";
import React from "react";
import { motion } from 'framer-motion';
import { Heading2, RichParagraph, Heading4,Heading3, ImageWithSkeleton, SecondaryButton } from '../Common/Common';
import {
  Waves, Lightbulb, ShowerHead, Camera, Maximize,
  Activity, Disc, Zap, Droplets, ArrowRight
} from "lucide-react";

// --- Accessory Icon Mapping (Switched to Lucide for BBV Consistency) ---
const getAccessoryIcon = (title) => {
  const iconMap = {
    "Saucer Swing": Waves,
    "Surfboard Rack": Maximize,
    "Exterior Van Lights": Lightbulb,
    "Outdoor Van Shower": ShowerHead,
    "360° Camera": Camera,
    "Rear Foldable Patio": Maximize,
    "Van Suspension System": Activity,
    "Tires & Wheels": Disc,
    // "Side Ladder": Ladder,
    "30A Shore Power Inlet": Zap,
    "Dump Valve": Droplets,
    "Freshwater Inlet": Droplets
  };
  return iconMap[title] || Waves;
};

export default function AdditionalAccessories() {
  const accessories = [
    { title: "Saucer Swing", description: "Easy to set up and pack away. Lightweight and can be stowed without requiring extra storage space.", image: "/Exterior/Sucerswing.webp" },
    { title: "Surfboard Rack", description: "Secure your surfboard to the roof or side of the van. The right rack depends on your van and board count.", image: "/Exterior/Surfboardrack.webp" },
    { title: "Exterior Van Lights", description: "Custom placement at the front, rear, or passenger side awning for perfect campsite illumination.", image: "/Exterior/exteriorfrontendlight.jpg" },
    { title: "Outdoor Van Shower", description: "Connects to your van's water system for hot and cold water. Pair with a privacy curtain for convenience.", image: "/Exterior/Rearoutdoorshower.jpg" },
    { title: "360° Camera", description: "Get a complete surround view of your campervan for safer parking and navigating tight spots.", image: "/Exterior/360.jpg" },
    { title: "Rear Foldable Patio", description: "Adds up to 6 sq ft of functional outdoor space. Unfolds in seconds for chairs or cooking.", image: "/Exterior/Foldablerearpatio.jpg" },
    { title: "Van Suspension System", description: "Upgraded Falcon shocks, bump buddies, and leaf springs for a smooth ride on any terrain.", image: "/Exterior/suspension.jpg" },
    { title: "Tires & Wheels", description: "Black Rhino Arsenal wheels (16\"-17\") paired with severe-snow-rated BFGoodrich KO2 All-Terrain Tires.", image: "/Exterior/tiree.jpg" },
    { title: "Side Ladder", description: "Lightweight (18 lbs) ladder for easy roof access, typically on the driver's side or rear.", image: "/Exterior/Sideladder.webp" },
    { title: "30A Shore Power Inlet", description: "Charge your campervan before traveling with an easy connection to campground power.", image: "/Exterior/30A.webp" },
    { title: "Dump Valve", description: "For easy & hygienic removal of grey water, positioned for quick connection at disposal stations.", image: "/Exterior/Dumpvalve.webp" },
    { title: "Freshwater Inlet", description: "Refill your freshwater tank with a secure, key-operated inlet to keep your water safe.", image: "/Exterior/Freshwateinlet.webp" }
  ];

  return (
    <section className="py-20 bg-[#F5F5F0] relative overflow-hidden">
      {/* --- BBV Decorative Background --- */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary rounded-lg -mt-20 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary rounded-lg -ml-20 -mb-20 blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">

        {/* --- Header: Clean & Authoritative --- */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-[2px] w-12 bg-primary" />
            <RichParagraph className="text-primary uppercase">Customization</RichParagraph>
          </motion.div>

          <Heading2 text="Additional Exterior Accessories"/>
          <RichParagraph className="mt-6  max-w-2xl ">
            Beyond our standard packages, we offer curated accessories to refine your van's utility.
            Choose from our tested selections or share your custom vision with us.
          </RichParagraph>
        </div>

        {/* --- Accessories Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accessories.map((item, index) => {
            const Icon = getAccessoryIcon(item.title);

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group bg-white rounded-lg border border-prmary hover:border-hover shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <ImageWithSkeleton
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Floating Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-3 rounded-lg shadow-xl">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <Heading4 text={item.title}  className="group-hover:!text-hover transition-colors" />
                  </div>

                  <RichParagraph className="!text-primary  mb-6 ">
                    {item.description}
                  </RichParagraph>

                  {/* Footer Interaction */}
                  <div className="pt-6 border-t border-[#001F3D]/5 flex items-center justify-between">
                    <RichParagraph className=" uppercase !text-sm !text-hover">Verified Accessory</RichParagraph>
                    {/* <div className="w-8 h-8 rounded-full bg-[#F5F5F0] group-hover:bg-[#001F3D] flex items-center justify-center transition-all duration-300">
                      <ArrowRight className="w-4 h-4 text-primary group-hover:!text-hover" />
                    </div> */}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* --- Bottom CTA Bar --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 p-8 bg-primary rounded-lg flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl"
        >
          <div className="text-center md:text-left">
            <Heading3 text={"Have a specific accessory in mind?"} className="mb-2 text-secondary"/>
            <RichParagraph className="text-secondary">We can source and install custom equipment tailored to your build.</RichParagraph>
          </div>
          <SecondaryButton label={"Discuss Custom Ideas"} link={"/contact"}/>

        </motion.div>

      </div>
    </section>
  );
}