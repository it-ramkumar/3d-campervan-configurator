"use client"
import React from "react";
import { Users, Home, Zap, Shield, Coffee, Mountain } from "lucide-react";
import ClassicImageGrid from "./ClassicImageGrid";
import { Heading2, Heading3, Heading4, RichParagraph,CustomLink } from "../../Common/Common";

const FamilySection = ({ imageData }) => {
  const topFeatures = [
    { icon: Home, title: "Customized", desc: "A fully customized campervan from scratch according to your choices", delay: 0 },
    { icon: Users, title: "Smart Space", desc: "An elevator and a dinette bed system with double swivel seats to accommodate the family of 4-5", delay: 1 },
    { icon: Zap, title: "Off-Grid", desc: "Off-grid-ready vans with lithium batteries, inverters, a DC-DC charger, solar panels, and a heater.", delay: 2 },
    { icon: Shield, title: "Safe", desc: "Designs that prioritize safety, comfort, and convenience for travelers of all ages", delay: 3 },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex p-3 bg-primary rounded-lg !text-hover mb-4">
            <Users size={32} />
          </div>
          <Heading2 text="Family-friendly Campervans" className="mb-4" />
          <RichParagraph className=" text-primary/70">
            Turn family trips into unforgettable adventures
          </RichParagraph>
        </div>

        {/* Top Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {topFeatures?.map((f, i) => (
            <div key={i} className="bg-white p-8 rounded-lg border border-primary/10 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-secondary mb-4">
                <f.icon size={24} />
              </div>
              <Heading3 text={f.title} className="mb-2 font-bold" />
              <RichParagraph className=" text-primary/70">
                {f.desc}
              </RichParagraph>
            </div>
          ))}
        </div>

        {/* Lake Tahoe Campervan */}
        <div className="bg-white rounded-lg p-8 md:p-12 border border-primary/10 shadow-xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3">
              <ClassicImageGrid images={imageData?.lakeTahoe} layout="standard" />
            </div>
            <div className="lg:col-span-2">
              <Heading3 text="Lake Tahoe Campervan" className="mb-6" />
              <RichParagraph className="mb-6">
                We designed this
                <CustomLink href="/layout-detail/lake-tahoe" text={" 144 AWD Sprinter "}/>

                van for a family of four. It's the perfect example of a family-first approach.
              </RichParagraph>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-hover p-1.5 rounded-lg text-primary">
                    <Users size={16} />
                  </div>
                  <RichParagraph className=" text-primary/70">
                    Seating and sleeping arrangements for 4 people
                  </RichParagraph>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-hover p-1.5 rounded-lg text-primary">
                    <Home size={16} />
                  </div>
                  <RichParagraph className=" text-primary/70">
                    Comes with an elevator & dinette bed system, and a fully functional kitchen
                  </RichParagraph>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-hover p-1.5 rounded-lg text-primary">
                    <Zap size={16} />
                  </div>
                  <RichParagraph className="text-sm text-primary/70">
                    Off-grid ready with dual 400Ah batteries and a Glycol diesel heater for all-season comfort
                  </RichParagraph>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blue Whale Campervan */}
        <div className="bg-white rounded-lg p-8 md:p-12 border border-primary/10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3">
              <ClassicImageGrid images={imageData?.blueWhale} layout="blueWhale" />
            </div>

            <div className="lg:col-span-2">
              <Heading3 text="Blue Whale Campervan" className="mb-6" />
              <RichParagraph className="mb-6">
                <CustomLink  href="/layout-detail/blue-whale-van" text={" Blue "}/>

                Whale is our one-of-a-kind short campervan that offers seating and sleeping for six people. This short van features:
              </RichParagraph>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-hover p-1.5 rounded-lg text-primary">
                    <Home size={16} />
                  </div>
                  <RichParagraph className=" text-primary/70">
                    Elevator bed, kids' bunk bed, and 4 belted seats
                  </RichParagraph>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-hover p-1.5 rounded-lg text-primary">
                    <Coffee size={16} />
                  </div>
                  <RichParagraph className=" text-primary/70">
                    Complete kitchen and bathroom facilities
                  </RichParagraph>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-hover p-1.5 rounded-lg text-primary">
                    <Mountain size={16} />
                  </div>
                  <RichParagraph className=" text-primary/70">
                    Retractable balcony and rooftop hammock
                  </RichParagraph>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-hover p-1.5 rounded-lg text-primary">
                    <Zap size={16} />
                  </div>
                  <RichParagraph className=" text-primary/70">
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