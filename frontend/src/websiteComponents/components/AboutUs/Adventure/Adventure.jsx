"use client";

import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Heading2, RichParagraph, ImageWithSkeleton,WhiteButton } from '../../Common/Common'


// Placeholder images - replace with your actual image paths
const ownersImage = "/images/anna.webp";
const ambulanceImage = "/images/ambulance.webp";
const prototypeImage = "/images/liftbed.webp";
const blueWhaleImage = "/images/bluewhale.webp";
const grayWolfImage = "/images/greywolf.webp";
const ctaBgImage = "/heroSlider/joinadventure.webp";

export default function AboutPage() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2, // Trigger when 20% of the section is visible
  });

  // Use a separate InView hook for the card section to trigger the stagger animation
  const cardControls = useAnimation();
  const [cardRef, cardInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    if (cardInView) {
      cardControls.start("visible");
    }
  }, [cardControls, cardInView]);

  // const sentenceVariants = {
  //   hidden: { opacity: 1 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       delay: 0.3,
  //       staggerChildren: 0.06, // Controls the delay between each letter
  //     },
  //   },
  // };
  // const letterVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       type: "spring",
  //       stiffness: 100,
  //     },
  //   },
  // };
  const cardContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };
  const cardItemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      }
    },
  };


  return (
    <div className="bg-white text-black font-serif">
      {/* SECTION 1: Meet the Owners */}
      <section className="container mx-auto px-6 pt-1 md:pt-3 pb-20 md:pb-28">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20">
          <motion.div
            className="flex-shrink-0 w-full md:w-1/2 lg:max-w-[700px]"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
          >
            <ImageWithSkeleton
              src={ownersImage}
              alt="Artur and Anna, owners of Big Bear Vans"
              className="w-full h-auto !max-h-64 md:!max-h-[700px] object-cover "
            />
          </motion.div>
          <motion.div
            className="w-full md:w-1/2 max-w-xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Heading2 text='Meet the Owners of Big Bear Vans: Artur and Anna' className='text-center my-4' />

            <RichParagraph>
              As RV enthusiasts and travel bloggers back in Europe, we traveled
              with our kids with a trailer and later a bus. After moving to the
              USA, we continued exploring RV culture with a fifth-wheel trailer
              and later our first camper van. Combining all the knowledge and
              experience from our travels around Europe and the USA in different
              types of RVs, we were eager to create a perfect compact van space
              for a family of 5. Here is the story of our personal camper van
              evolution and how we came up with the Santa Monica layout.
            </RichParagraph>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Van Evolution Stories */}
      <section className="bg-gray-50">
        <div className="container mx-auto px-6 pt-1 md:pt-3 pb-10 md:pb-14">
          {/* NEW: Wrapper motion.div for staggered animation */}
          <motion.div
            ref={cardRef}
            variants={cardContainerVariants}
            initial="hidden"
            animate={cardControls}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">

              {/* Card 1: Ambulance afterlife */}
              <motion.div
                variants={cardItemVariants} // Apply item variant for staggered entry
                className="group flex flex-col bg-gray-800 shadow-xl rounded-lg overflow-hidden border border-gray-700 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/30 hover:border-cyan-400"
              >
                <div className="relative overflow-hidden">
                  <ImageWithSkeleton
                    src={ambulanceImage}
                    alt="The first Sprinter ambulance conversion"
                    className="w-full h-96 object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <Heading2 text="Ambulance Afterlife" className="absolute bottom-8 left-8 text-white" />

                </div>
                <div className="p-8 flex-grow">
                  <RichParagraph white={true}>
                    Our journey with campervans began with our first build in
                    2020—a 2011 Sprinter ambulance. We crafted this van with our
                    own hands for family use, giving it a second life after it
                    retired at 300,000 miles. It became not only our campervan
                    but also a mobile office.
                  </RichParagraph>

                </div>
              </motion.div>

              {/* Card 2: Lift bed prototype */}
              <motion.div
                variants={cardItemVariants} // Apply item variant for staggered entry
                className="group flex flex-col bg-gray-800 shadow-xl rounded-lg overflow-hidden border border-gray-700 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/30 hover:border-cyan-400"
              >
                <div className="relative overflow-hidden">
                  <ImageWithSkeleton
                    src={prototypeImage}
                    alt="Van featuring an elevator bed prototype"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <Heading2 text="Lift Bed Prototype" className="absolute bottom-8 left-8 text-white" />

                </div>
                <div className="p-8 flex-grow">
                  <RichParagraph white={true}>
                    Our second personal van was also an ambulance and featured our
                    first attempt at building an elevator bed.
                  </RichParagraph>

                </div>
              </motion.div>

              {/* Card 3: Blue Whale */}
              <motion.div
                variants={cardItemVariants} // Apply item variant for staggered entry
                className="group flex flex-col bg-gray-800 shadow-xl rounded-lg overflow-hidden border border-gray-700 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/30 hover:border-cyan-400"
              >
                <div className="relative overflow-hidden">
                  <ImageWithSkeleton
                    src={blueWhaleImage}
                    alt="The Blue Whale, a Ford Transit high roof van"
                    className="w-full h-96 object-cover "
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <Heading2 text="Blue Whale" className="absolute bottom-8 left-8 text-white" />

                </div>
                <div className="p-8 flex-grow">
                  <RichParagraph white={true}>
                    Our third van, <Link to="/layout-detail/blue-whale-van" className="text-blue-200 hover:text-blue-300">Blue Whale</Link>, was a standout. This pre-owned Ford
                    Transit 148 wheelbase high roof van, which could accommodate
                    six people, was showcased at expos. It included a bathroom, a
                    hammock on the roof, and a rear deck. Although we sold Blue
                    Whale to grow our company, our kids still miss it.
                  </RichParagraph>

                </div>
              </motion.div>

              {/* Card 4: Gray Wolf */}
              <motion.div
                variants={cardItemVariants} // Apply item variant for staggered entry
                className="group flex flex-col bg-gray-800 shadow-xl rounded-lg overflow-hidden border border-gray-700 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/30 hover:border-cyan-400"
              >
                <div className="relative overflow-hidden">
                  <ImageWithSkeleton
                    src={grayWolfImage}
                    alt="The Gray Wolf, a 144 wheelbase Sprinter van"
                    className="w-full h-96 object-cover "
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <Heading2 text="Gray Wolf" className="absolute bottom-8 left-8 text-white" />

                </div>
                <div className="p-8 flex-grow">
                  <RichParagraph white={true}>
                    Our fourth van, the demo van <Link to="/layout-detail/santa-monica-gray" className="text-blue-200 hover:text-blue-300">Gray Wolf</Link>, is a 144 wheelbase
                    Sprinter that sits and sleeps five, reflecting our commitment
                    as van builders to innovation and comfort.
                  </RichParagraph>

                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Join the Adventure CTA */}
      <motion.section
        className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center text-center text-white mb-7 md:mb-15 group overflow-hidden"
        ref={ref}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.5 } },
        }}
        initial="hidden"
        animate={controls}
      >
        <motion.img
          src={ctaBgImage}
          alt="Scenic view from inside a custom camper van"
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover bg-gray-800 transition-all duration-1000 ease-in-out group-hover:scale-110 group-hover:brightness-85"
          initial={{ scale: 1.15 }}
          variants={{
            visible: { scale: 1.05, transition: { duration: 2, ease: "easeOut" } }
          }}
        />
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative px-6 z-10 flex flex-col items-center">
          <Heading2 text="Join the Adventure" className='text-white' />
          <RichParagraph white={true} className='max-w-2xl my-4'>
            Become a creator of your own home on wheels. Design your floor plan,
            select materials, and customize finishes as if building your dream
            vacation home. When you have a vision, we make it come true with
            innovative solutions tailored to your requests.
          </RichParagraph>
          <WhiteButton label={"Start Your Build"} link={"/contact"} />


        </div>
      </motion.section>
    </div>
  );
}