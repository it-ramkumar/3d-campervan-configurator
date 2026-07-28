import React from "react";
import Link from "next/link";
import {
  Heading2,
  Heading3,
  RichParagraph,
  ImageWithSkeleton,
  PrimaryButton,
} from "@/components/Common/Common";
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
    <div className="font-body overflow-x-hidden">
      {/* SECTION 1: Narrative Intro */}
      <section className="bbv-section-light relative overflow-hidden">
        <div className="bbv-dot-grid-light" />
        <div className="container mx-auto px-6 py-24 lg:py-40 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="w-full lg:w-1/2 relative">
              <div className="aspect-[4/5] relative">
                <ImageWithSkeleton src={ownersImage} alt="Artur and Anna" />
                <div className="bbv-amber-line" />
              </div>
            </div>

            <div className="w-full lg:w-1/2 space-y-8">
              <div>
                <p className="text-hover text-xs uppercase tracking-widest font-bold mb-3">
                  The Founders
                </p>
                <Heading2
                  text="Artur and Anna"
                  className="font-display text-primary uppercase tracking-wide mt-2"
                />
                <div className="bbv-divider mb-6" />
              </div>

              <RichParagraph className="text-xl font-medium leading-relaxed text-primary/90">
                Our journey wasn't born in a factory—it was born on the open road
                across Europe and the USA.
              </RichParagraph>

              <RichParagraph className="text-primary/60 leading-relaxed">
                Combining all the knowledge from our travels in trailers, buses,
                and fifth-wheels, we were eager to create the perfect compact van
                space for a family of 5. Every build we create is a result of that
                evolution.
              </RichParagraph>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Van Evolution */}
      <section className="bg-primary py-24 lg:py-40 relative overflow-hidden">
        <div className="bbv-dot-grid" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="mb-20">
            <p className="text-hover text-xs uppercase tracking-widest font-bold mb-3">
              Our Journey
            </p>
            <Heading2
              text="The Evolution of Our Vans"
              className="font-display text-secondary uppercase tracking-wide mt-2"
            />
            <div className="bbv-divider mb-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Wide Card 1 */}
            <div className="md:col-span-7 bbv-glass-light rounded-lg overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="aspect-[8/5] overflow-hidden relative">
                <ImageWithSkeleton
                  src={ambulanceImage}
                  alt={"ambulance custom build"}
                />
                <div className="absolute top-4 left-4 bg-hover text-primary px-4 py-1 rounded-lg text-xs font-bold uppercase">
                  Build 01
                </div>
              </div>
              <div className="p-10">
                <Heading3
                  text="Ambulance Afterlife"
                  className="font-display text-secondary uppercase tracking-wide mb-4"
                />
                <RichParagraph className="text-secondary/60">
                  Our journey began in 2020 with a Sprinter ambulance
                  conversion. We crafted this for family use, retiring it only
                  after 300,000 miles of memories.
                </RichParagraph>
              </div>
            </div>

            {/* Small Card 2 */}
            <div className="md:col-span-5 bbv-glass-light rounded-lg overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="aspect-[8/5] overflow-hidden relative">
                <ImageWithSkeleton
                  src={prototypeImage}
                  alt={"prototype custom build"}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-10">
                <Heading3
                  text="Lift Bed Prototype"
                  className="font-display text-secondary uppercase tracking-wide mb-4"
                />
                <RichParagraph className="text-secondary/60">
                  This build featured our first attempt at an elevator bed—a
                  feature that now defines the Santa Monica layout.
                </RichParagraph>
              </div>
            </div>

            {/* Small Card 3 */}
            <div className="md:col-span-5 bbv-glass-light rounded-lg overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="aspect-[8/5] overflow-hidden">
                <ImageWithSkeleton
                  src={blueWhaleImage}
                  alt={"blue whale custom build"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-10">
                <Heading3
                  text="Blue Whale"
                  className="font-display text-secondary uppercase tracking-wide mb-4"
                />
                <RichParagraph className="text-secondary/60">
                  A Ford Transit 148 high roof with roof hammocks and rear
                  decks. View the{" "}
                  <Link
                    href="/van-layouts/blue-whale-van"
                    className="text-hover font-bold underline hover:text-secondary transition-colors"
                  >
                    Layout Details
                  </Link>
                  .
                </RichParagraph>
              </div>
            </div>

            {/* Wide Card 4 */}
            <div className="md:col-span-7 bbv-glass-light rounded-lg overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="aspect-[8/5] overflow-hidden">
                <ImageWithSkeleton
                  src={grayWolfImage}
                  alt={"gray wolf custom build"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-10">
                <Heading3
                  text="Gray Wolf"
                  className="font-display text-secondary uppercase tracking-wide mb-4"
                />
                <RichParagraph className="text-secondary/60">
                  Our 144 Sprinter demo sleeps five and reflects our commitment
                  to innovation. View the{" "}
                  <Link
                    href="/van-layouts/santa-monica-gray"
                    className="text-hover font-bold underline hover:text-secondary transition-colors"
                  >
                    Santa Monica
                  </Link>{" "}
                  build.
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
          <ImageWithSkeleton
            src={ctaBgImage}
            alt="Adventure"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-primary/85 backdrop-blur-sm"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6">
          <p className="text-hover text-xs uppercase tracking-widest font-bold mb-3">
            Ready to Roll
          </p>
          <Heading2
            text="Join the Adventure"
            className="font-display text-secondary uppercase tracking-wide mb-4"
          />
          <div className="bbv-divider mb-6" />

          <p className="text-hover text-lg md:text-xl font-semibold italic tracking-wide mb-6">
            You Dream It. We Build It.
          </p>
          <RichParagraph className="text-secondary/80 mb-10 text-lg">
            Become a creator of your own home on wheels. Design your floor plan,
            select materials, and customize finishes for your dream rig.
          </RichParagraph>
          <div className="flex justify-center">
            <Link
              href="/contact"
              className="bg-hover text-primary font-bold uppercase tracking-wider px-8 py-4 rounded-lg hover:opacity-90 transition-opacity"
            >
              Start Your Build
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
