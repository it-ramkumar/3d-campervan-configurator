"use client";

import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Heading2, Heading3, RichParagraph, ImageWithSkeleton, PrimaryButton } from '../../Common/Common';

const ownersImage = "/images/anna.webp";
const ambulanceImage = "/images/ambulance.webp";
const prototypeImage = "/images/liftbed.webp";
const blueWhaleImage = "/images/bluewhale.webp";
const grayWolfImage = "/images/greywolf.webp";
const ctaBgImage = "/heroSlider/long_van.jpg";

export default function AboutPage() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const cardControls = useAnimation();
  const [cardRef, cardInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) controls.start("visible");
    if (cardInView) cardControls.start("visible");
  }, [controls, cardControls, inView, cardInView]);

  return (
    <div className="bg-secondary text-primary font-body overflow-x-hidden">

      {/* SECTION 1: Narrative Intro (Clean & Modern) */}
      <section className="container mx-auto px-6 py-24 lg:py-40">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <motion.div
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Design Element: Simple Primary Border Box */}
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-primary/20 rounded-lg -z-10 hidden md:block"></div>

            <ImageWithSkeleton
              src={ownersImage}
              alt="Artur and Anna"
              className="w-full h-[500px] object-cover rounded-lg shadow-xl relative z-10"
            />
          </motion.div>

          <motion.div
            className="w-full lg:w-1/2 space-y-8"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
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
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Van Evolution (Asymmetric Grid Design) */}
      <section className="bg-primary py-24 lg:py-40">
        <div className="container mx-auto px-6">
          <div className="mb-20">
            <RichParagraph className="!text-hover font-bold uppercase tracking-wider !text-sm">Our Journey</RichParagraph>
            <Heading2 text="The Evolution of Our Vans" className="text-secondary mt-2" />
          </div>

          <motion.div
            ref={cardRef}
            initial="hidden"
            animate={cardControls}
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8"
          >
            {/* Wide Card 1 */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="md:col-span-7 bg-secondary rounded-lg overflow-hidden group hover:shadow-2xl transition-all duration-500"
            >
              <div className="h-80 overflow-hidden relative">
                <ImageWithSkeleton src={ambulanceImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-4 left-4 bg-primary text-secondary px-4 py-1 rounded-lg text-xs font-bold uppercase">Build 01</div>
              </div>
              <div className="p-10">
                <Heading3 text="Ambulance Afterlife" className="text-primary mb-4" />
                <RichParagraph className="text-primary opacity-80">
                  Our journey began in 2020 with a Sprinter ambulance conversion. We crafted this for family use, retiring it only after 300,000 miles of memories.
                </RichParagraph>
              </div>
            </motion.div>

            {/* Small Card 2 */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="md:col-span-5 bg-secondary rounded-lg overflow-hidden group hover:shadow-2xl transition-all duration-500"
            >
              <div className="h-80 overflow-hidden relative">
                <ImageWithSkeleton src={prototypeImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-10">
                <Heading3 text="Lift Bed Prototype" className="text-primary mb-4" />
                <RichParagraph className="text-primary opacity-80">
                  This build featured our first attempt at an elevator bed—a feature that now defines the Santa Monica layout.
                </RichParagraph>
              </div>
            </motion.div>

            {/* Small Card 3 */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="md:col-span-5 bg-secondary rounded-lg overflow-hidden group hover:shadow-2xl transition-all duration-500"
            >
              <div className="h-80 overflow-hidden">
                <ImageWithSkeleton src={blueWhaleImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-10">
                <Heading3 text="Blue Whale" className="text-primary mb-4" />
                <RichParagraph className="text-primary opacity-80">
                  A Ford Transit 148 high roof with roof hammocks and rear decks. View the <Link to="/layout-detail/blue-whale-van" className="font-bold underline">Layout Details</Link>.
                </RichParagraph>
              </div>
            </motion.div>

            {/* Wide Card 4 */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="md:col-span-7 bg-secondary rounded-lg overflow-hidden group hover:shadow-2xl transition-all duration-500"
            >
              <div className="h-80 overflow-hidden">
                <ImageWithSkeleton src={grayWolfImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-10">
                <Heading3 text="Gray Wolf" className="text-primary mb-4" />
                <RichParagraph className="text-primary opacity-80">
                  Our 144 Sprinter demo sleeps five and reflects our commitment to innovation. View the <Link to="/layout-detail/santa-monica-gray" className="font-bold underline">Santa Monica</Link> build.
                </RichParagraph>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Minimalist CTA (Overlay Style) */}
      <section className="relative py-32 lg:py-48 flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img src={ctaBgImage} className="w-full h-full object-cover" alt="Adventure" />
          <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm"></div>
        </div>

        <motion.div
          className="relative z-10 text-center max-w-4xl px-6"
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 40 } }}
        >
          <Heading2 text="Join the Adventure" className="text-secondary mb-8" />
          <RichParagraph white={true} className="text-secondary opacity-90 mb-10 text-lg">
            Become a creator of your own home on wheels. Design your floor plan,
            select materials, and customize finishes for your dream rig.
          </RichParagraph>
          <div className="flex justify-center">
             <PrimaryButton label="Start Your Build" link="/contact" />
          </div>
        </motion.div>
      </section>
    </div>
  );
}