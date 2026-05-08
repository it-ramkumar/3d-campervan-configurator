import React from "react";
import Link from "next/link";
import {
  Heading2,
  Heading3,
  RichParagraph,
  ImageWithSkeleton,
  PrimaryButton
} from '@/components/Common/Common';
import Image from "next/image";

// Assets
const ownersImage = "/images/anna.webp";
const ambulanceImage = "/images/ambulance.webp";
const prototypeImage = "/images/liftbed.webp";
const blueWhaleImage = "/images/bluewhale.webp";
const grayWolfImage = "/images/greywolf.webp";
const ctaBgImage = "/images2/vfs.webp";

export default function AboutPage() {
  return (
    <div className="bg-secondary text-primary font-body overflow-x-hidden">

      {/* SECTION 1: Narrative Intro */}
      <section className="container mx-auto px-6 py-24 lg:py-40">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="w-full lg:w-1/2 relative">
            {/* Design Element: Simple Primary Border Box */}
<div className="aspect-[4/5]">

            <ImageWithSkeleton
              src={ownersImage}
              alt="Artur and Anna"
              />
              </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <RichParagraph className="!text-hover font-bold uppercase tracking-wider !text-sm">The Founders</RichParagraph>
              <Heading2 text='Artur and Anna' className="mt-2" />
              <div className="h-1 w-20 bg-primary mt-4 rounded-lg"></div>
            </div>

            <RichParagraph className="text-xl font-medium leading-relaxed opacity-90">
              Our journey wasn’t born in a factory—it was born on the open road across Europe and the USA.
            </RichParagraph>

            <RichParagraph className="opacity-80">
              Combining all the knowledge from our travels in trailers, buses, and fifth-wheels, we were eager to create the perfect compact van space for a family of 5. Every build we create is a result of that evolution.
            </RichParagraph>
          </div>
        </div>
      </section>

      {/* SECTION 2: Van Evolution */}
      <section className="bg-primary py-24 lg:py-40">
        <div className="container mx-auto px-6">
          <div className="mb-20">
            <RichParagraph className="!text-hover font-bold uppercase tracking-wider !text-sm">Our Journey</RichParagraph>
            <Heading2 text="The Evolution of Our Vans" className="text-secondary mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Wide Card 1 */}
            <div className="md:col-span-7 bg-secondary rounded-lg overflow-hidden group hover:shadow-2xl transition-all duration-500">
                <div className="aspect-[8/5] overflow-hidden relative">
                  <ImageWithSkeleton src={ambulanceImage} alt={"ambulance custom build"} />
                <div className="absolute top-4 left-4 bg-primary text-secondary px-4 py-1 rounded-lg text-xs font-bold uppercase">Build 01</div>
              </div>
              <div className="p-10">
                <Heading3 text="Ambulance Afterlife" className="text-primary mb-4" />
                <RichParagraph className="text-primary opacity-80">
                  Our journey began in 2020 with a Sprinter ambulance conversion. We crafted this for family use, retiring it only after 300,000 miles of memories.
                </RichParagraph>
              </div>
            </div>

            {/* Small Card 2 */}
            <div className="md:col-span-5 bg-secondary rounded-lg overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="aspect-[8/5] overflow-hidden relative">
                <ImageWithSkeleton src={prototypeImage} alt={"prototype custom build"} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-10">
                <Heading3 text="Lift Bed Prototype" className="text-primary mb-4" />
                <RichParagraph className="text-primary opacity-80">
                  This build featured our first attempt at an elevator bed—a feature that now defines the Santa Monica layout.
                </RichParagraph>
              </div>
            </div>

            {/* Small Card 3 */}
            <div className="md:col-span-5 bg-secondary rounded-lg overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="aspect-[8/5] overflow-hidden">
                <ImageWithSkeleton src={blueWhaleImage} alt={"blue whale custom build"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-10">
                <Heading3 text="Blue Whale" className="text-primary mb-4" />
                <RichParagraph className="text-primary opacity-80">
                  A Ford Transit 148 high roof with roof hammocks and rear decks. View the <Link href="/layout-detail/blue-whale-van" className="font-bold underline">Layout Details</Link>.
                </RichParagraph>
              </div>
            </div>

            {/* Wide Card 4 */}
            <div className="md:col-span-7 bg-secondary rounded-lg overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="aspect-[8/5] overflow-hidden">
                <ImageWithSkeleton src={grayWolfImage} alt={"gray wolf custom build"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-10">
                <Heading3 text="Gray Wolf" className="text-primary mb-4" />
                <RichParagraph className="text-primary opacity-80">
                  Our 144 Sprinter demo sleeps five and reflects our commitment to innovation. View the <Link href="/layout-detail/santa-monica-gray" className="font-bold underline">Santa Monica</Link> build.
                </RichParagraph>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Minimalist CTA */}
      <section className="relative py-32 lg:py-48 flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute aspect-[9/5] inset-0 z-0">
          <ImageWithSkeleton src={ctaBgImage} alt="Adventure" width={1920} height={1080} />
          <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6">
          <Heading2 text="Join the Adventure" className="text-secondary mb-8" />
          <RichParagraph white={true} className="text-secondary opacity-90 mb-10 text-lg">
            Become a creator of your own home on wheels. Design your floor plan,
            select materials, and customize finishes for your dream rig.
          </RichParagraph>
          <div className="flex justify-center">
             <PrimaryButton label="Start Your Build" link="/contact" />
          </div>
        </div>
      </section>
    </div>
  );
}