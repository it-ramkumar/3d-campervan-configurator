"use client"
import React from "react";
import { PawPrint, Users, Home, Shield, Car } from "lucide-react";
import { ImageWithSkeleton, Heading2, Heading3, RichParagraph, CustomLink, Heading4 } from "../../Common/Common";
import { motion } from "framer-motion";


const PetFriendlySection = ({ imageData }) => {
  return (
    <section className="bbv-section-light relative py-20">
      <div className="bbv-dot-grid-light" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-12">
          <div className="p-3 bg-hover/20 rounded-lg text-hover border border-hover/30">
            <PawPrint size={32} />
          </div>
          <div>
            <p className="text-hover text-xs uppercase tracking-widest font-bold mb-1">Pet Owners</p>
            <Heading2 text="Pet-friendly Campervans" className="font-display text-primary uppercase tracking-wide" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          <div className="lg:col-span-3 bbv-card border border-hover/20 text-primary p-10 rounded-lg shadow-xl">
            <Heading3 text="Travel Without Compromise" className="font-display text-primary uppercase tracking-wide mb-4" />
            <RichParagraph className="text-primary/80">
              Traveling with pets means expensive boarding, stressful logistics, and unwelcoming hotels. Moreover, pets often struggle in different hotel rooms when being left behind by their owners. That's why, at Big Bear Vans, we've built various mobile sanctuaries for pet owners to give their pets a home-like comfort on the road.
            </RichParagraph>
            <RichParagraph className="mt-4 text-primary/80">
              With our pet-specific campervans, you can comfortably go shopping or hiking on a trail where pets are not allowed by leaving them in the van with the A/C or heater on and the engine off.
              <CustomLink href="/van-layouts/cusco-campervan" text={" Cusco, "} />
              <CustomLink href="/van-layouts/santa-barbara" text={"  Santa Barbara, "} />
              <CustomLink href="/van-layouts/ventura-campervan" text={" Ventura, "} />
              etc, are our exclusive pet-friendly campervans.
            </RichParagraph>
          </div>
          <div className="lg:col-span-2 bbv-card border-l-4 border-hover p-8 rounded-lg">
            <RichParagraph className="italic text-primary/80 mb-4">
              "We love our camper van. We probably looked at 10 or 12 different kinds of Sprinter layouts and couldn't find exactly what we wanted till we found Big Bear Vans. One of the big reasons why we decided to go with a van was that we have four dogs, and it's a challenge to find something for your dog to sit on when you want to go on a trip. But these people make it possible for us to go on vacation with our dogs."
            </RichParagraph>
            <RichParagraph className="font-bold text-hover">
              — Cathy and Ben (Sasha Campervan)
            </RichParagraph>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { icon: Shield, title: "Safety First", desc: "Dog crates that protect pets from slipping in case of a sudden stop and L-tracks for maximum safety to tie the crate to the van to prevent sliding" },
            { icon: Home, title: "Climate Control", desc: "Multiple ventilation points, including roof fans, skylight, awning-style windows and an advanced glycol air-water heater to regulate the inner temperature of the van so the pets don't feel suffocated." },
            { icon: PawPrint, title: "Pet Amenities", desc: "A pet-specific bench with a built-in fridge for food, built-in water bowls and a scratch-resistant flooring that stands up to claws" },
            { icon: Car, title: "Outdoor Safety", desc: "External L-tracks on the doors allow for safe tethering outside at your campsite." },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bbv-card border border-hover/20 hover:border-hover/40 transition-all"
            >
              <div className="w-12 h-12 bg-hover/20 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-hover" />
              </div>
              <Heading4 text={feature.title} className="font-display text-primary uppercase tracking-wide mb-2" />
              <RichParagraph className="text-primary/70">
                {feature.desc}
              </RichParagraph>
            </motion.div>
          ))}
        </div>

        <div className="bbv-card rounded-lg overflow-hidden border border-hover/20">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 p-10 flex flex-col justify-center">
              <p className="text-hover text-xs uppercase tracking-widest font-bold mb-3">Featured Build</p>
              <div className="bbv-divider mb-4" />
              <Heading3 text="The Cusco Campervan" className="font-display text-primary uppercase tracking-wide mb-6" />
              <RichParagraph className="text-primary/80 my-6">
                <CustomLink href="/van-layouts/cusco-campervan" text={" Cusco "} />
                is our pet-friendly campervan designed for clients with two dogs, featuring dedicated pet areas and enhanced ventilation systems.
              </RichParagraph>
              <ul className="space-y-4">
                {[
                  { icon: Users, text: "Seating and sleeping for 4 with pet accommodations" },
                  { icon: PawPrint, text: "Dedicated pet bench with fridge and water bowls" },
                  { icon: Home, text: "Awnings windows for maximum view and airflow" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <item.icon size={20} className="text-hover" />
                    <RichParagraph className="text-primary/80">{item.text}</RichParagraph>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7 p-6 bg-primary/60">
              <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[400px] md:h-[500px]">
                <div className="col-span-1 row-span-2">
                  <ImageWithSkeleton src={imageData?.cusco[0]} alt={"Cusco Campervan"} className="w-full h-full object-cover rounded-lg border-2 border-hover bbv-amber-line" />
                </div>
                <div className="col-span-1">
                  <ImageWithSkeleton src={imageData?.cusco[1]} alt={"Cusco Campervan Interior"} className="w-full h-full object-cover rounded-lg border border-hover/30" />
                </div>
                <div className="col-span-1">
                  <ImageWithSkeleton src={imageData?.cusco[2]} alt={"Cusco Campervan Exterior"} className="w-full h-full object-cover rounded-lg border border-hover/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default PetFriendlySection;
