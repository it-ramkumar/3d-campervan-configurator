"use client"
import React from "react";
import { Users, Home, Zap, Shield, Coffee, Mountain } from "lucide-react";
import ClassicImageGrid from "./ClassicImageGrid";
import { Heading2, Heading3, Heading4, RichParagraph, CustomLink } from "../../Common/Common";

const FamilySection = ({ imageData }) => {
  const topFeatures = [
    { icon: Home, title: "Customized", desc: "A fully customized campervan from scratch according to your choices", delay: 0 },
    { icon: Users, title: "Smart Space", desc: "An elevator and a dinette bed system with double swivel seats to accommodate the family of 4-5", delay: 1 },
    { icon: Zap, title: "Off-Grid", desc: "Off-grid-ready vans with lithium batteries, inverters, a DC-DC charger, solar panels, and a heater.", delay: 2 },
    { icon: Shield, title: "Safe", desc: "Designs that prioritize safety, comfort, and convenience for travelers of all ages", delay: 3 },
  ];

  return (
    <section className="bbv-section-navy relative py-20">
      <div className="bbv-dot-grid" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p className="text-hover text-xs uppercase tracking-widest font-bold mb-3">Families</p>
          <div className="inline-flex p-3 bbv-glass-light rounded-lg text-hover mb-4">
            <Users size={32} />
          </div>
          <Heading2 text="Family-friendly Campervans" className="font-display text-secondary uppercase tracking-wide mb-4" />
          <div className="bbv-divider mb-6" />
          <RichParagraph className="text-secondary/70">
            Turn family trips into unforgettable adventures
          </RichParagraph>
        </div>

        {/* Top Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {topFeatures?.map((f, i) => (
            <div key={i} className="bbv-glass-light p-8 rounded-lg border border-hover/20 hover:border-hover/40 transition-all">
              <div className="w-12 h-12 bg-hover/20 rounded-lg flex items-center justify-center text-hover mb-4">
                <f.icon size={24} />
              </div>
              <Heading3 text={f.title} className="font-display text-secondary uppercase tracking-wide mb-2" />
              <RichParagraph className="text-secondary/70">
                {f.desc}
              </RichParagraph>
            </div>
          ))}
        </div>

        {/* Lake Tahoe Campervan */}
        <div className="bbv-glass-light rounded-lg p-8 md:p-12 border border-hover/20 shadow-xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3">
              <ClassicImageGrid images={imageData?.lakeTahoe} layout="standard" />
            </div>
            <div className="lg:col-span-2">
              <p className="text-hover text-xs uppercase tracking-widest font-bold mb-3">Featured Build</p>
              <div className="bbv-divider mb-4" />
              <Heading3 text="Lake Tahoe Campervan" className="font-display text-secondary uppercase tracking-wide mb-6" />
              <RichParagraph className="text-secondary/80 mb-6">
                We designed this
                <CustomLink href="/van-layouts/lake-tahoe" text={" 144 AWD Sprinter "} />
                van for a family of four. It's the perfect example of a family-first approach.
              </RichParagraph>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-hover/20 p-1.5 rounded-lg text-hover">
                    <Users size={16} />
                  </div>
                  <RichParagraph className="text-secondary/70">
                    Seating and sleeping arrangements for 4 people
                  </RichParagraph>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-hover/20 p-1.5 rounded-lg text-hover">
                    <Home size={16} />
                  </div>
                  <RichParagraph className="text-secondary/70">
                    Comes with an elevator & dinette bed system, and a fully functional kitchen
                  </RichParagraph>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-hover/20 p-1.5 rounded-lg text-hover">
                    <Zap size={16} />
                  </div>
                  <RichParagraph className="text-secondary/70">
                    Off-grid ready with dual 400Ah batteries and a Glycol diesel heater for all-season comfort
                  </RichParagraph>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blue Whale Campervan */}
        <div className="bbv-glass-light rounded-lg p-8 md:p-12 border border-hover/20 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3">
              <ClassicImageGrid images={imageData?.blueWhale} layout="blueWhale" />
            </div>

            <div className="lg:col-span-2">
              <p className="text-hover text-xs uppercase tracking-widest font-bold mb-3">Featured Build</p>
              <div className="bbv-divider mb-4" />
              <Heading3 text="Blue Whale Campervan" className="font-display text-secondary uppercase tracking-wide mb-6" />
              <RichParagraph className="text-secondary/80 mb-6">
                <CustomLink href="/van-layouts/blue-whale-van" text={" Blue "} />
                Whale is our one-of-a-kind short campervan that offers seating and sleeping for six people. This short van features:
              </RichParagraph>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-hover/20 p-1.5 rounded-lg text-hover">
                    <Home size={16} />
                  </div>
                  <RichParagraph className="text-secondary/70">
                    Elevator bed, kids' bunk bed, and 4 belted seats
                  </RichParagraph>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-hover/20 p-1.5 rounded-lg text-hover">
                    <Coffee size={16} />
                  </div>
                  <RichParagraph className="text-secondary/70">
                    Complete kitchen and bathroom facilities
                  </RichParagraph>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-hover/20 p-1.5 rounded-lg text-hover">
                    <Mountain size={16} />
                  </div>
                  <RichParagraph className="text-secondary/70">
                    Retractable balcony and rooftop hammock
                  </RichParagraph>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-hover/20 p-1.5 rounded-lg text-hover">
                    <Zap size={16} />
                  </div>
                  <RichParagraph className="text-secondary/70">
                    Solar panels and 12V AC for off-grid capability
                  </RichParagraph>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FamilySection;
