"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  PawPrint,
  Mountain,
  Home,
  Briefcase,
  Star,
  CheckCircle,
  Car,
  Wifi,
  Zap,
  Shield,
  MapPin,
  Coffee,
  Camera,
  Heart,
} from "lucide-react";

import ImageWithSkeleton from "../../Common/ImageWithSkeleton/ImageWithSkeleton.jsx";
import { Link } from "react-router-dom";
// Reusable Components
function SectionHeader({ title, subtitle, icon: Icon }) {
  return (
    <div className="text-center mb-8 md:mb-12">
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-gray-900 rounded-2xl">
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function ClassicImageGrid({ images, layout = "standard" }) {
  if (layout === "vermont") {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* This first column stacks vertically on mobile by default */}
        <div className="grid grid-rows-2 gap-4 md:gap-6">
          <ImageWithSkeleton
            src={images[0]}
            alt="Vermont van 1"
            className="w-full h-64 md:h-80 object-cover "
          />
          <ImageWithSkeleton
            src={images[1]}
            alt="Vermont van 2"
            className="w-full h-64 md:h-80 object-cover "
          />
        </div>
        {/* This second column becomes 2-wide on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-1 lg:grid-rows-3 gap-4 md:gap-6">
          <ImageWithSkeleton
            src={images[2]}
            alt="Vermont van 3"
            className="w-full h-48 md:h-52 object-cover "
          />
          <ImageWithSkeleton
            src={images[3]}
            alt="Vermont van 4"
            className="w-full h-48 md:h-52 object-cover"
          />
          <ImageWithSkeleton
            src={images[4]}
            alt="Vermont van 5"
            className="w-full h-48 md:h-52 object-cover  col-span-2 lg:col-span-1"
          />
        </div>
      </div>
    );
  }

  if (layout === "blueWhale") {
    return (
      // Main grid is 1 col on mobile, 3 on desktop
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Image 1: Full width on mobile, spans 2 on desktop */}
        <div className="md:col-span-2">
          <ImageWithSkeleton
            src={images[0]}
            alt="Blue Whale van 1"
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>
        {/* Images 2 & 3: 2 cols on mobile, 1 col (stacked) on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-4 md:gap-6">
          <ImageWithSkeleton
            src={images[1]}
            alt="Blue Whale van 2"
            className="w-full h-40 md:h-44 object-cover "
          />
          <ImageWithSkeleton
            src={images[2]}
            alt="Blue Whale van 3"
            className="w-full h-40 md:h-44 object-cover "
          />
        </div>
        {/* Image 4: Full width on mobile, spans 3 on desktop */}
        <div className="md:col-span-3">
          <ImageWithSkeleton
            src={images[3]}
            alt="Blue Whale van 4"
            className="w-full h-64 md:h-72 object-cover "
          />
        </div>
      </div>
    );
  }

  if (layout === "motovan") {
    return (
      // 2 cols on mobile, 4 on desktop
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {/* Image 1: Full width on mobile, correct span on desktop */}
        <div className="col-span-2 md:col-span-2 md:row-span-2">
          <ImageWithSkeleton
            src={images[0]}
            alt="MotoVan 1"
            className="w-full h-full min-h-[300px] object-cover "
          />
        </div>
        {/* Image 2: Full width on mobile, correct span on desktop */}
        <div className="col-span-2 md:col-span-2">
          <ImageWithSkeleton
            src={images[1]}
            alt="MotoVan 2"
            className="w-full h-48 md:h-56 object-cover "
          />
        </div>
        {/* Image 3: Half width on mobile */}
        <div>
          <ImageWithSkeleton
            src={images[2]}
            alt="MotoVan 3"
            className="w-full h-48 md:h-56 object-cover "
          />
        </div>
        {/* Image 4: Half width on mobile */}
        <div>
          <ImageWithSkeleton
            src={images[3]}
            alt="MotoVan 4"
            className="w-full h-48 md:h-56 object-cover "
          />
        </div>
      </div>
    );
  }

  // Standard layout for others (2 cols on mobile, 3 on desktop)
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {images.map((image, index) => (
        <div
          key={index}
          // Image 1: Full width on mobile, correct span on desktop
          // Other images: Half width on mobile
          className={`${index === 0
              ? "col-span-2 md:col-span-2 md:row-span-2"
              : "col-span-1"
            }`}
        >
          <ImageWithSkeleton
            src={image}
            alt={`Van image ${index + 1}`}
            // Fixed height for small images on mobile, full height/min-h on desktop
            className={`w-full object-cover  ${index === 0
                ? "h-64 md:h-full md:min-h-[300px]"
                : "h-48 md:h-full md:min-h-[300px]"
              }`}
          />
        </div>
      ))}
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 group hover:border-gray-300"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-gray-900 rounded-xl group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h4 className="font-serif text-lg md:text-xl font-bold text-gray-900">
          {title}
        </h4>
      </div>
      <p className="text-gray-700 text-base leading-relaxed">{description}</p>
    </motion.div>
  );
}

function TestimonialCard({ quote, author, van }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="relative bg-gray-900 text-white p-6 md:p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
    >
      <div className="absolute top-6 left-6 text-6xl text-gray-700 opacity-50">
        "
      </div>
      <p className="text-base md:text-lg italic mb-6 relative z-10 leading-relaxed">
        "{quote}"
      </p>
      <div className="border-t border-gray-700 pt-4">
        <p className="font-semibold text-white text-base md:text-lg">
          {author}
        </p>
        <p className="text-gray-400">Owner of {van}</p>
      </div>
    </motion.div>
  );
}

function IconFeature({ text, index, icon: Icon = CheckCircle }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center gap-4 p-4 md:p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 group border border-gray-200"
    >
      <div className="flex-shrink-0 w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <span className="text-gray-700 font-medium text-base md:text-lg">
        {text}
      </span>
    </motion.div>
  );
}

function GraphicFeature({ text, index, graphic: Graphic }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="flex flex-col items-center text-center p-4 md:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
    >
      <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Graphic className="w-8 h-8 text-white" />
      </div>
      <span className="text-gray-700 font-medium text-base md:text-lg">
        {text}
      </span>
    </motion.div>
  );
}

// Image Data
const imageData = {
  vermont: [
    "/OurClients/v1.jpg",
    "/OurClients/v2.jpg",
    "/OurClients/v3.jpg",
    "/OurClients/v4.jpg",
    "/OurClients/v5.jpg",
  ],
  blueWhale: [
    "/OurClients/blue1.jpg",
    "/OurClients/blue2.jpeg",
    "/OurClients/blue3.jpg",
    "/OurClients/blue4.jpg",
  ],
  cusco: ["/OurClients/c1.jpg", "/OurClients/c2.jpg", "/OurClients/c3.jpg"],
  lakeTahoe: [
    "/OurClients/lt1.jpg",
    "/OurClients/lt2.jpg",
    "/OurClients/lt3.jpg",
  ],
  motovan: [
    "/OurClients/mv1.jpg",
    "/OurClients/mv2.jpg",
    "/OurClients/mv3.jpg",
    "/OurClients/mv4.jpg",
  ],
  sanDiego: [
    "/OurClients/sd1.jpg",
    "/OurClients/sd2.jpg",
    "/OurClients/sd3.jpg",
  ],
};

export default function ClientStories() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 md:py-24 lg:py-28 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 md:mb-6"
          >
            Our Client Stories
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            At Big Bear Vans, we build premium custom campervans. These luxurious
            vans enable our clients to hit the road, explore, and live off the
            grid for as long as they want.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto mt-4 md:mt-6"
          >
            Our clients come from different backgrounds. That's why every Big
            Bear Van is a custom reflection of its owner's specific style and
            adventure goals.
          </motion.p>
        </div>
      </section>


      {/* Families With Kids */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Families With Kids"
            subtitle="Turn family trips into unforgettable adventures"
            icon={Users}
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-center mb-8 md:mb-12">
            <div className="lg:col-span-3 lg:order-first">
              <ClassicImageGrid
                images={imageData.lakeTahoe}
                layout="standard"
              />
            </div>

            <div className="lg:col-span-2">
              <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed">
                Packing for a family, navigating flight timings, booking rooms,
                and renting cars with kids can turn any trip into a hassle.
                Therefore, parents like you choose Big Bear Vans. Our
                family-friendly campervans eliminate all your concerns and
                enable you to fully enjoy the family trips. Here's what our
                family-friendly vans feature:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0 * 0.1 }}
                  className="bg-white p-4 md:p-5 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 group hover:border-gray-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gray-900 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Home className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-serif text-base md:text-lg font-bold text-gray-900">
                      Complete Customization
                    </h4>
                  </div>
                  <p className="text-gray-700 text-l leading-relaxed">
                    A fully customized campervan from scratch according to your choices
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 * 0.1 }}
                  className="bg-white p-4 md:p-5 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 group hover:border-gray-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gray-900 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-serif text-base md:text-lg font-bold text-gray-900">
                      Smart Space Design
                    </h4>
                  </div>
                  <p className="text-gray-700 text-l leading-relaxed">
                    An elevator and a dinette bed system with double swivel seats to accommodate the family of 4-5
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 * 0.1 }}
                  className="bg-white p-4 md:p-5 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 group hover:border-gray-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gray-900 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-serif text-base md:text-lg font-bold text-gray-900">
                      Off-Grid Ready
                    </h4>
                  </div>
                  <p className="text-gray-700 text-l leading-relaxed">
                    Off-grid-ready vans with lithium batteries, inverters, a DC-DC charger, solar panels, and a heater.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3 * 0.1 }}
                  className="bg-white p-4 md:p-5 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 group hover:border-gray-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gray-900 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-serif text-base md:text-lg font-bold text-gray-900">
                      Family Focused
                    </h4>
                  </div>
                  <p className="text-gray-700 text-l leading-relaxed">
                    Designs that prioritize safety, comfort, and convenience for travelers of all ages
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Lake Tahoe Campervan */}
          <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-12 mb-8 md:mb-12 border border-gray-200 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center">
              <div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                  Lake Tahoe Campervan
                </h3>
                <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed">
                  We designed this 144 AWD Sprinter van for a family of four.
                  It's the perfect example of a family-first approach.
                </p>

                <div className="space-y-3 md:space-y-4">
                  <IconFeature
                    text="Seating and sleeping arrangements for 4 people"
                    index={0}
                    icon={Users}
                  />
                  <IconFeature
                    text="Comes with an elevator & dinette bed system, and a fully functional kitchen"
                    index={1}
                    icon={Home}
                  />
                  <IconFeature
                    text="Off-grid ready with dual 400Ah batteries and a Glycol diesel heater for all-season comfort"
                    index={2}
                    icon={Zap}
                  />
                </div>
              </div>

              <div>
                <TestimonialCard
                  quote="I think why we ended up going with Big Bear Vans was because these people had the design layout that we wanted for a family, and they're family-focused. They did a wonderful job bringing our ideas to fruition."
                  author="Family of Four"
                  van="Lake Tahoe Campervan"
                />
              </div>
            </div>
          </div>

          {/* Blue Whale Campervan */}
          <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-12 border border-gray-200 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-center">
              <div className="lg:col-span-3">
                <ClassicImageGrid
                  images={imageData.blueWhale}
                  layout="blueWhale"
                />
              </div>

              <div className="lg:col-span-2">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                  Blue Whale Campervan
                </h3>
                <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed">
                  Blue Whale is our one-of-a-kind short campervan that offers
                  seating and sleeping for six people. This short van:
                </p>

                <div className="space-y-3 md:space-y-4">
                  <IconFeature
                    text="Has an elevator bed, dinette benches, a kids' bunk bed, and 4 seats with belts"
                    index={0}
                    icon={Home}
                  />
                  <IconFeature
                    text="Complete kitchen and bathroom facilities"
                    index={2}
                    icon={Coffee}
                  />
                  <IconFeature
                    text="Retractable balcony and rooftop hammock"
                    index={3}
                    icon={Mountain}
                  />
                  <IconFeature
                    text="Solar panels and 12V AC for off-grid capability"
                    index={4}
                    icon={Zap}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Pet Owners */}
      <section className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Pet Owners"
            subtitle="Mobile sanctuaries for your furry companions"
            icon={PawPrint}
          />

          {/* Enhanced Pet Owners Content */}
          <div className="mb-12 md:mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="lg:col-span-2 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 md:p-8 border border-amber-200"
              >
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                  Travel With Your Pets
                </h3>
                <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                  Traveling with pets means expensive boarding, stressful
                  logistics, and unwelcoming hotels. Moreover, pets often
                  struggle in different hotel rooms when being left behind by
                  their owners. That's why, at Big Bear Vans, we've built
                  various mobile sanctuaries for pet owners to give their pets a
                  home-like comfort on the road.
                </p>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  With our pet-specific campervans, you can comfortably go
                  shopping or hiking on a trail where pets are not allowed by
                  leaving them in the van with the A/C or heater on and the
                  engine off. Cusco, Sasha, Santa Barbara, Ventura, etc, are
                  our exclusive pet-friendly campervans.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 0.9 }}
                whileHover={{ scale: 1.0 }} // Added hover animation
                className="bg-white rounded-3xl p-6 md:p-10 border-2 border-amber-300 shadow-2xl flex flex-col justify-center transition-all duration-300" // Enhanced border, padding, and shadow
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <PawPrint className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="font-serif text-xl md:text-2xl font-bold text-gray-900 mb-4">
                    Pet-First Design
                  </h4>
                  <p className="text-gray-700">
                    Every detail considered for your pet's comfort and safety
                    during travel
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <FeatureCard
                icon={Shield}
                title="Safety First"
                description="Dog crates that protect pets from slipping in case of a sudden stop and L-tracks for maximum safety to tie the crate to the van to prevent sliding"
                index={0}
              />
              <FeatureCard
                icon={Home}
                title="Climate Control"
                description="Multiple ventilation points, including roof fans, skylight, awning-style windows and  an advanced glycol air-water heater to regulate the inner temperature of the van  so the pets don't feel suffocated"
                index={1}
              />
              <FeatureCard
                icon={PawPrint}
                title="Pet Amenities"
                description="A pet-specific bench with a built-in fridge for food, built-in water bowls and a scratch-resistant flooring that stands up to claws"
                index={2}
              />
              <FeatureCard
                icon={Car}
                title="Outdoor Safety"
                description="External L-tracks on the doors allow for safe tethering outside at your campsite."
                index={3}
              />
            </div>
          </div>

          {/* Cusco Campervan */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 md:p-8 lg:p-12 border border-amber-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                  Cusco Campervan
                </h3>
                <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed">
                  Cusco is our pet-friendly campervan designed for clients
                  with two dogs, featuring dedicated pet areas and enhanced
                  ventilation systems.
                </p>

                <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  <IconFeature
                    text="Seating and sleeping for 4 people with pet accommodations"
                    index={0}
                    icon={Users}
                  />
                  <IconFeature
                    text="Dedicated pet bench with built-in fridge and water bowls"
                    index={1}
                    icon={PawPrint}
                  />
                  <IconFeature
                    text="Large awning-style windows for view and ventilation"
                    index={2}
                    icon={Home}
                  />
                </div>

                <TestimonialCard
                  quote="We love our camper van. We probably looked at 10 or 12 different kinds of Sprinter layouts and couldn't find exactly what we wanted till we found Big Bear Vans. One of the big reasons why we decided to go with a van was that we have four dogs, and it's a challenge to find something for your dog to sit on when you want to go on a trip. But these people make it possible for us to go on vacation with our dogs."
                  author="Cathy and Ben"
                  van="Cusco Campervan"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:gap-6">
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <ImageWithSkeleton
                    src={imageData.cusco[0]}
                    alt="Cusco interior"
                    className="w-full h-48 sm:h-56 object-cover "
                  />
                  <ImageWithSkeleton
                    src={imageData.cusco[1]}
                    alt="Cusco kitchen"
                    className="w-full h-48 sm:h-56 object-cover "
                  />
                </div>
                <ImageWithSkeleton
                  src={imageData.cusco[2]}
                  alt="Cusco exterior"
                  className="w-full h-48 sm:h-56 object-cover "
                />
              </div>
            </div>
          </div>
        </div>
      </section>

 {/* Adventure Lovers */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Adventure Lovers"
            subtitle="Your mobile basecamp for outdoor pursuits"
            icon={Mountain}
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-center mb-8 md:mb-12">
            <div className="lg:col-span-2">
              <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                At Big Bear Vans, we also build for those who live for the
                outdoors. Whether you love skiing, surfing, biking, fishing,
                dance competitions, or triathlons, our customized vans become
                your mobile basecamp.
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Our campervans serve as a changing room, a base for gear, and a
                comfortable place to rest before and after a competition for
                you. Our customized vehicles get you to remote locations, serve
                as a space for all their gear, including dirt bikes, skis,
                wetsuits, etc, and provide a comfortable place to rest and
                recharge after a long day.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8 mt-6">
                <GraphicFeature
                  text="Powerful lithium battery system that lets you run the A/C with the engine off. You can go to the desert, the forest, or any remote location without a hookup."
                  index={0}
                  graphic={Zap}
                />
                <GraphicFeature
                  text="Separate garage for motorcycles or an under-the-bed garage for the gear."
                  index={1}
                  graphic={Car}
                />
                <GraphicFeature
                  text="A spacious roof deck for mounting gear and L-tracks at various places in the van to secure helmets, ramps, etc."
                  index={2}
                  graphic={Shield}
                />
                <GraphicFeature
                  text="More than a dozen options for the rear door storage, where you can install storage boxes, bike tubes, gear carriers, and uplift for bicycles."
                  index={3}
                  graphic={MapPin}
                />
              </div>
            </div>

            <div className="lg:col-span-3">
              <ClassicImageGrid images={imageData.motovan} layout="motovan" />
            </div>
          </div>

          {/* MotoVan */}
          <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-12 border border-gray-200 shadow-lg">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
              MotoVan
            </h3>
            <p className="text-base md:text-lg text-gray-700 text-center mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
              Motovan is one of our exclusive campervans that is built for
              riders. The campervan has a living space and a garage for you and
              your crew.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              <div>
                <h4 className="font-serif text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 text-center">
                  The Garage
                </h4>
                <div className="space-y-3 md:space-y-4">
                  <IconFeature
                    text="Secure, separated garage for up to three motorcycles"
                    index={0}
                    icon={Car}
                  />
                  <IconFeature
                    text="Integrated clothes dryer and shower for post-ride cleanup"
                    index={1}
                    icon={Home}
                  />
                  <IconFeature
                    text="Car wash system and smart storage for riding equipment"
                    index={2}
                    icon={Shield}
                  />
                </div>
              </div>

              <div>
                <h4 className="font-serif text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 text-center">
                  The Living Space
                </h4>
                <div className="space-y-3 md:space-y-4">
                  <IconFeature
                    text="Comfortable sleeping for five with loft bed system"
                    index={0}
                    icon={Home}
                  />
                  <IconFeature
                    text="Convertible seating arrangements for flexible space"
                    index={1}
                    icon={Users}
                  />
                  <IconFeature
                    text="Fully functional kitchen with fridge and oven"
                    index={2}
                    icon={Coffee}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Retirees Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Retirees"
            subtitle="Creating lasting memories with comfort and freedom"
            icon={Users}
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-center mb-8 md:mb-12">
            <div className="lg:col-span-2">
              <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed">
                At Big Bear Vans, we've built multiple campervans for retirees
                who want to visit family across the country, create lasting
                memories with their grandchildren, and travel in complete
                comfort, entirely off the grid.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                <GraphicFeature
                  text="Extended off-grid capability with robust power and water systems"
                  index={0}
                  graphic={Zap}
                />
                <GraphicFeature
                  text="All-Wheel Drive for any road condition"
                  index={1}
                  graphic={Car}
                />
                <GraphicFeature
                  text="Spacious, premium interiors designed for multi-generational travel"
                  index={2}
                  graphic={Home}
                />
                <GraphicFeature
                  text="Advanced safety and navigation systems"
                  index={3}
                  graphic={Shield}
                />
              </div>
            </div>

            <div className="lg:col-span-3">
              <ClassicImageGrid images={imageData.vermont} layout="vermont" />
            </div>
          </div>

          {/* Vermont Campervan */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-6 md:p-8 lg:p-12 border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-start">
              <div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                  Vermont Campervan
                </h3>
                <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed">
                  Vermont is a 170 AWD Sprinter campervan that we designed for a
                  couple who wanted to travel with their grandchildren.
                </p>

                <div className="mb-6 md:mb-8">
                  <h4 className="font-serif text-lg md:text-xl font-bold text-gray-900 mb-4">
                    Client Vision
                  </h4>
                  <div className="space-y-3 md:space-y-4">
                    <IconFeature
                      text="Off-grid ready campervan"
                      index={0}
                      icon={MapPin}
                    />
                    <IconFeature
                      text="A van that accommodates more than 2 people."
                      index={1}
                      icon={Users}
                    />
                    <IconFeature
                      text="A spacious kitchen to prepare family meals"
                      index={2}
                      icon={Coffee}
                    />
                    <IconFeature
                      text="Upgraded exterior for bicycles and other gear"
                      index={3}
                      icon={Car}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-serif text-lg md:text-xl font-bold text-gray-900 mb-4">
                  Our Delivery
                </h4>
                <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  <IconFeature
                    text="Fully off-grid ready van with a 400Ah Lithium battery, a 3000W inverter, a DC-DC charger, a 12V AC, 30-gal grey, and 20-gal freshwater tanks"
                    index={0}
                    icon={Zap}
                  />
                  <IconFeature
                    text="Double swivel seats, elevator, and dinette bed system for  4-5 people"
                    index={1}
                    icon={Home}
                  />
                  <IconFeature
                    text="Fully functional kitchen with double induction cooktop, deep sink, a microwave, a fridge, and a hidden storage pantry"
                    index={2}
                    icon={Coffee}
                  />
                  <IconFeature
                    text="Two exterior storage boxes, a spacious roof deck,  and a powerlift bike rack"
                    index={3}
                    icon={Car}
                  />
                </div>

                <TestimonialCard
                  quote="We love it. It works great. We love the storage and how open everything is. And it just feels so homey. We did do a lot of looking around and searching, and Big Bear Vans just seemed to be the ones that really adapted to more than two travelers."
                  author="Client from Vermont"
                  van="Vermont Campervan"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-Time Van Lifers */}
      <section className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Full-Time Van Lifers"
            subtitle="Home on wheels for those who live the journey"
            icon={Home}
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-center mb-8 md:mb-12">
            <div className="lg:col-span-3 lg:order-first">
              <ClassicImageGrid
                images={imageData.sanDiego}
                layout="standard"
              />
            </div>

            <div className="lg:col-span-2">
              <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                Sometimes, we also build campervans for full-time van lifers who
                actually plan to live on the road for a year or more. These
                clients are remote workers, interior designers, and people who
                decided to visit different places and create travel content for
                social media.
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                For full-time living, you need a ton of storage and home-like
                power and water facilities. At Big Bear Vans, we go beyond the
                standard conversion to fulfill the demanding requirements of
                full-time living.
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mt-4">
                Our <b>Calabasas</b> and <b>San Diego</b> campervans were
                customized for full-time living.
              </p>

              <TestimonialCard
                quote="Big Bear Vans did a full conversion for my MB Sprinter, and I could not be happier! I had very specific requests, and they met all of my requests and are truly a completely customizable conversion company. I went to about three different conversion companies, and I was only given certain planned layouts and certain colors. Not at Big Bear Vans, they accommodated my every wish. They are also extremely knowledgeable. I came back for a couple of upgrades, and they gladly accommodated me. I highly suggest Big Bear Vans for your conversion!"
                author="Laura"
                van="Calabasas Campervan"
              />
            </div>
          </div>

          {/* San Diego Campervan */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-6 md:p-8 lg:p-12 border border-purple-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                  San Diego Campervan
                </h3>
                <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed">
                  We built the San Diego campervan for an architect who worked
                  on two computers from his van and traveled. The van was
                  designed to be used both as a residence and a workspace.
                </p>

                <div className="space-y-3 md:space-y-4">
                  <IconFeature
                    text="Robust electrical and water systems for extended off-grid living"
                    index={0}
                    icon={Zap}
                  />
                  <IconFeature
                    text="Stationary bed with garage storage underneath"
                    index={1}
                    icon={Home}
                  />
                  <IconFeature
                    text="Full shower and complete kitchen setup"
                    index={2}
                    icon={Coffee}
                  />
                  <IconFeature
                    text="Dedicated work desk with swivel seating"
                    index={3}
                    icon={Briefcase}
                  />
                </div>
              </div>

              <div>
                <TestimonialCard
                  quote="Big Bear Vans built an amazing custom campervan for me. They have a really nice team to work with, and I was able to really work closely with them on getting exactly what I wanted in my design. I am a remote worker, so I wanted to have an office space as well as a beefy electrical system, a full kitchen, a shower, and a bed area. I've gotten so many compliments on my buildout and couldn't be happier with how it turned out. Highly recommend Big Bear Vans if you're looking to buy a camper van."
                  author="Remote Worker"
                  van="San Diego Campervan"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Entrepreneurs */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Entrepreneurs"
            subtitle="Smart business investments that double as personal escapes"
            icon={Briefcase}
          />

          <div className="text-center max-w-4xl mx-auto">
            <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed">
              A campervan can be more than just a camper. It can be a smart
              business investment that doubles as a personal escape. At Big
              Bear Vans, we've designed campervans for those who want to
              optimize their tax benefits and allocate their profits to
              something that can serve as both a company asset and a personal
              item.
            </p>
            <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed">
              So we've built mobile units that double as:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
              {[
                { title: "Mobile Photography Studios", icon: Camera },
                { title: "Psychology Offices", icon: Heart },
                { title: "Massage Cabins", icon: Users },
                { title: "Video Production Studios", icon: Camera },
                { title: "Gaming Setups", icon: Zap },
                { title: "Mobile Libraries", icon: Home },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-gray-200 group hover:scale-105"
                >
                  <div className="w-16 h-16 bg-gray-900 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-semibold text-gray-900 text-base md:text-lg">
                    {item.title}
                  </p>
                </motion.div>
              ))}
            </div>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              A Big Bear Van serves as both a personal luxury and a business
              asset for you. You can use these campervans as offices,
              showrooms, and workshops during the week, and as adventure
              vehicles on the weekends. It's a smart way to enjoy a camper
              while also investing in a versatile business tool.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {" "}
          {/* reduced max width */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-3">
              <Star className="w-7 h-7 text-white" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
              Why Our Clients Choose Us?
            </h2>
            <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
              With a consistent five-star rating from owners across the USA,
              we've built more than 105 campervans. Here's why these people
              trust us:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 justify-items-center">
            {[
              {
                title: "True Customization",
                description:
                  "We're a truly customized company. At Big Bear Vans, we don't hand over general layouts and certain colors to our clients. We listen to your specific requirements and bring your dream vans to life just like you want.",
                icon: Home,
              },
              {
                title: "Advanced Technology",
                description:
                  "Equipped with state-of-the-art technology like CNC routers, 3D scanners, and integrated CAD/CAM systems, we excel at executing the most demanding custom projects.",
                icon: Zap,
              },
              {
                title: "Post-Build Support",
                description: (
                  <>
                    <p className="mb-2 text-white">
                      When you buy a customized van from us, we also offer
                      post-build support. You gain:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                      <li>
                        Ease of travel with no flights, luggage, or hotel
                        stress.
                      </li>
                      <li>
                        Freedom to go anywhere, anytime, without planning
                        months ahead.
                      </li>
                      <li>
                        Comfort to cook healthy meals and travel with pets &
                        family.
                      </li>
                      <li>
                        The ability to say "yes" to last-minute trip plans.
                      </li>
                    </ul>
                  </>
                ),
                icon: Shield,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 w-full p-6 rounded-xl hover:bg-gray-750 transition-colors group border border-gray-700 hover:border-gray-600"
              >
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-serif text-base md:text-lg font-bold text-white mb-3">
                  {feature.title}
                </h3>
                {typeof feature.description === "string" ? (
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                ) : (
                  feature.description
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-24 lg:py-28 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Ready to customize your campervan? Let's talk about the van that
            fits your lifestyle
          </p>
          <Link to={"https://configurator.bigbearvans.com"} target="_blank"
            rel="noopener noreferrer">
            <button className="bg-gray-900 text-white font-bold text-base md:text-lg py-4 px-8 md:py-5 md:px-12 rounded-xl hover:bg-gray-800 transition-colors duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl">
              Start Your Custom Build
            </button>
          </Link>
        </div>
      </section>

      {/* --- YOUTUBE SECTION --- */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              See Our Vans in Action
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              "_O6VyFcGD0A",
              "Qz4oqmWolC8",
              "LVlpGPNm8xo",
              "C7oKRJ_AhFY",
            ].map((videoId, index) => (
              <motion.div
                key={videoId}
                // Mobile (default): 'aspect-video' (wide 16:9)
                // Desktop ('lg'): 'aspect-[9/16]' (tall 9:16)
                // Also add 'relative' and 'overflow-hidden' for the desktop view to work
                className="rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300 overflow-hidden aspect-video lg:aspect-[9/16] lg:relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <iframe
                  // Mobile (default): 'w-full h-full' (fills the 'aspect-video' card)
                  // Desktop ('lg'): Becomes 'absolute' and centered to "cover" the tall card
                  className="w-full h-full lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:h-full lg:aspect-video"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* --- END YOUTUBE SECTION --- */}
    </div>
  );
}