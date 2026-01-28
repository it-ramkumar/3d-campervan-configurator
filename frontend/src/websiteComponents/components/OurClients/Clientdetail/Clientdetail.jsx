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
  Zap,
  Shield,
  MapPin,
  Coffee,
  Camera,
  Heart,
  Quote,
  Plane, Compass, BatteryCharging, DollarSign
} from "lucide-react";

import { Link } from "react-router-dom";
import { Heading2, RichParagraph, Heading3, Heading4, ImageWithSkeleton, BlackButton } from '../../Common/Common'


// Reusable Components
function SectionHeader({ title, subtitle, icon: Icon }) {
  return (
    <div className="text-center mb-8 md:mb-12">
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-gray-900 rounded-2xl">
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
      <Heading2 text={title} />

      {subtitle && (
        <RichParagraph>
          {subtitle}
        </RichParagraph>

      )}
    </div>
  );
}

function ListItem({ text, className }) {
  return (
    <li className="flex gap-3 items-start group">
      {/* Dashboard-style custom bullet */}
      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 group-hover:scale-150 transition-transform duration-300" />

      <RichParagraph white={className}>
        {text}
      </RichParagraph>
    </li>
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



function TestimonialCard({ quote, author, van }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="relative bg-gray-900 text-white p-6 md:p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 group"
    >
      {/* Testimonial Badge Tag */}
      <div className="absolute -top-4 left-8 inline-flex items-center gap-2 px-4 py-1.5 bg-white text-gray-900 rounded-full shadow-lg border border-gray-100">
        <Quote className="w-3.5 h-3.5 fill-current" />
        <span className="text-[10px] font-black uppercase tracking-widest">Testimonial</span>
      </div>

      {/* Decorative Quote Mark */}
      <div className="absolute top-8 right-8 text-7xl font-serif text-white opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
        ”
      </div>

      <div className="relative z-10 space-y-6">
        <RichParagraph white={true} className="text-lg md:text-xl italic font-medium leading-relaxed">
          "{quote}"
        </RichParagraph>

        <div className="border-t border-gray-700/50 pt-6 flex items-center gap-4">
          {/* Circular Initials Avatar (Optional visual tag) */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-sm font-bold border border-gray-600">
            {author.charAt(0)}
          </div>

          <div>
            <RichParagraph white={true} className="font-bold text-white leading-none mb-1">
              {author}
            </RichParagraph>
            <RichParagraph white={true} className="text-sm text-gray-400 leading-none">
              Owner of {van}
            </RichParagraph>
          </div>
        </div>
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
      <RichParagraph>
        {text}
      </RichParagraph>

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
      <RichParagraph>
        {text}
      </RichParagraph>

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

          <Heading2 text="Our Client Stories" className="my-4"/>
          <RichParagraph className="max-w-3xl mx-auto my-4">
            At Big Bear Vans, we build premium custom campervans. These luxurious
            vans enable our clients to hit the road, explore, and live off the
            grid for as long as they want.
          </RichParagraph>
          <RichParagraph className="max-w-3xl mx-auto my-4">
            Our clients come from different backgrounds. That's why every Big
            Bear Van is a custom reflection of its owner's specific style and
            adventure goals.
          </RichParagraph>

        </div>
      </section>

      {/* Families With Kids */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Family-friendly Campervans"
            subtitle="Turn family trips into unforgettable adventures"
            icon={Users}
          />

          <div className="mb-16 md:mb-24">
            {/* Intro Section */}
            <div className="max-w-4xl mx-auto text-center mb-12">
              <RichParagraph className="text-lg md:text-xl leading-relaxed text-gray-700">
                Packing for a family, navigating flight timings, booking rooms, and renting cars with kids can turn any trip into a hassle. Therefore, parents like you choose Big Bear Vans. Our family-friendly campervans eliminate all your concerns and enable you to fully enjoy the family trips. Here's what our family-friendly vans feature:
              </RichParagraph>
            </div>

            {/* Top Feature Grid - 4 Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                { icon: Home, title: "Customized", desc: "A fully customized campervan from scratch according to your choices", delay: 0 },
                { icon: Users, title: "Smart Space", desc: "An elevator and a dinette bed system with double swivel seats to accommodate the family of 4-5", delay: 1 },
                { icon: Zap, title: "Off-Grid", desc: "Off-grid-ready vans with lithium batteries, inverters, a DC-DC charger, solar panels, and a heater.", delay: 2 },
                { icon: Shield, title: "Safe", desc: "Designs that prioritize safety, comfort, and convenience for travelers of all ages", delay: 3 },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative overflow-hidden bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-900 rounded-2xl mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Transition Text */}
            <div className="bg-blue-50/50 rounded-[2.5rem] p-8 md:p-12 border border-blue-100">
              <RichParagraph className="text-blue-800 font-bold text-center mb-10">
                Forget complicated travel planning. With our custom vans:
              </RichParagraph>

              {/* Bottom Benefit Grid - Balanced 3 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: Home, title: "Customized", desc: "You can visit all the hidden gems and National parks with kids on your own schedule", delay: 0 },
                  { icon: Users, title: "Smart Space", desc: "You only have to pack some snacks, diapers, toys, clothes, and you’re good to go for a family adventure.", delay: 1 },
                  { icon: Zap, title: "Off-Grid", desc: "You can boondock for days in the desert or deep forest with your family, entirely self-sufficient.", delay: 2 },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center text-center space-y-4"
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer Tagline */}
              <div className="mt-12 pt-8 border-t border-blue-100">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <span className="text-blue-800 font-medium text-sm">Proven builds:</span>
                  <div className="flex flex-wrap justify-center gap-2">
                    {[{ title: 'Montreal', link: "https://bigbearvans.com/layout-detail/montreal" }, { title: 'Blue Whale', link: "https://bigbearvans.com/layout-detail/blue-whale-van" }, { title: 'Santa Monica Black,', link: "https://bigbearvans.com/layout-detail/santa-monica-black" },].map((name) => (
                      <Link key={name.link}
                        to={name.link} target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-1 bg-white border border-blue-200 rounded-full text-xs font-bold text-blue-700 shadow-sm"
                      >
                        {name.title}
                      </Link>
                    ))}

                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Lake Tahoe Campervan */}
          <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-12 mb-8 md:mb-12 border border-gray-200 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-center">
              <div className="lg:col-span-3 lg:order-first">
                <ClassicImageGrid
                  images={imageData.lakeTahoe}
                  layout="standard"
                />
              </div>

              <div className="lg:col-span-2">
                <Heading3 text="Lake Tahoe Campervan" textColor="text-black" className="my-4"/>
                <RichParagraph className="mb-6">

                  We designed this  <Link to="https://bigbearvans.com/layout-detail/lake-tahoe" target="_blank" rel="noopener noreferrer" className="px-4 py-1 bg-white border border-blue-200 rounded-full text-xs font-bold text-blue-700 shadow-sm">
                    144 AWD Sprinter
                  </Link>  van for a family of four.
                  It's the perfect example of a family-first approach.
                </RichParagraph>

                <div className="space-y-3 md:space-y-4 mb-8">
                  <IconFeature text="Seating and sleeping arrangements for 4 people" index={0} icon={Users} />
                  <IconFeature text="Comes with an elevator & dinette bed system, and a fully functional kitchen" index={1} icon={Home} />
                  <IconFeature text="Off-grid ready with dual 400Ah batteries and a Glycol diesel heater for all-season comfort" index={2} icon={Zap} />
                </div>

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
                <Heading3 text="Blue Whale Campervan" textColor="text-black" className="my-4" />
                <RichParagraph className="mb-6">

                  <Link to="https://bigbearvans.com/layout-detail/blue-whale-van" target="_blank" rel="noopener noreferrer" className="px-4 py-1 bg-white border border-blue-200 rounded-full text-xs font-bold text-blue-700 shadow-sm">
                    Blue
                  </Link>  Whale is our one-of-a-kind short campervan that offers
                  seating and sleeping for six people. This short van features:
                </RichParagraph>

                <div className="space-y-3 md:space-y-4">
                  <IconFeature text="Elevator bed, kids' bunk bed, and 4 belted seats" index={0} icon={Home} />
                  <IconFeature text="Complete kitchen and bathroom facilities" index={2} icon={Coffee} />
                  <IconFeature text="Retractable balcony and rooftop hammock" index={3} icon={Mountain} />
                  <IconFeature text="Solar panels and 12V AC for off-grid capability" index={4} icon={Zap} />
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
            title="Pet-friendly Campervans"
            subtitle="Mobile sanctuaries for your furry companions"
            icon={PawPrint}
          />

          {/* Narrative & Testimonial Split */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 mb-16 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 flex flex-col justify-center bg-amber-50/50 rounded-3xl p-8 md:p-10 border border-amber-100"
            >
              <Heading3 text="Travel Without Compromise" textColor="text-black" className="my-4" />
              <RichParagraph className="text-lg text-gray-800">
                Traveling with pets means expensive boarding, stressful logistics, and unwelcoming hotels. Moreover, pets often struggle in different hotel rooms when being left behind by their owners. That's why, at Big Bear Vans, we've built various mobile sanctuaries for pet owners to give their pets a home-like comfort on the road.
              </RichParagraph>
              <RichParagraph className="mt-4 text-gray-700">
                With our pet-specific campervans, you can comfortably go shopping or hiking on a trail where pets are not allowed by leaving them in the van with the A/C or heater on and the engine off.
                <Link to="https://bigbearvans.com/layout-detail/cusco-campervan" target="_blank" rel="noopener noreferrer" className="px-4 py-1 bg-white border border-blue-200 rounded-full text-xs font-bold text-blue-700 shadow-sm">
                  Cusco,
                </Link>

                Sasha,
                <Link to="https://bigbearvans.com/layout-detail/santa-barbara" target="_blank" rel="noopener noreferrer" className="px-4 py-1 bg-white border border-blue-200 rounded-full text-xs font-bold text-blue-700 shadow-sm">
                  Santa Barbara,
                </Link>
                <Link to="https://bigbearvans.com/layout-detail/ventura-campervan" target="_blank" rel="noopener noreferrer" className="px-4 py-1 bg-white border border-blue-200 rounded-full text-xs font-bold text-blue-700 shadow-sm">
                  Ventura,
                </Link>  etc, are our exclusive pet-friendly campervans.
              </RichParagraph>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 flex"
            >
              <div className="bg-gray-900 rounded-3xl text-white shadow-2xl relative overflow-hidden flex flex-col justify-center">

                <TestimonialCard
                  quote="We love our camper van. We probably looked at 10 or 12 different kinds of Sprinter layouts and couldn't find exactly what we wanted till we found Big Bear Vans. One of the big reasons why we decided to go with a van was that we have four dogs, and it's a challenge to find something for your dog to sit on when you want to go on a trip. But these people make it possible for us to go on vacation with our dogs."
                  author="Cathy and Ben"
                  van="Sasha Campervan"
                  variant="dark" // Assuming your component supports a dark mode
                />
              </div>
            </motion.div>
          </div>

          {/* Refined Feature Cards */}
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
                className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-amber-700" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Cusco Spotlight */}
          <div className="bg-gray-50 rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm">
            {/* Changed to a 12-column grid to allow finer control over width */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">

              {/* TEXT SECTION: Now smaller (Spans 5 columns) */}
              <div className="lg:col-span-5 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white lg:bg-transparent">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6 w-fit">
                  Featured Build
                </div>
                <Heading3 text="The Cusco Campervan" textColor="text-black" className="my-4"/>
                <RichParagraph className="my-6">
                  <Link to="https://bigbearvans.com/layout-detail/cusco-campervan/" target="_blank" rel="noopener noreferrer" className="px-4 py-1 bg-white border border-blue-200 rounded-full text-xs font-bold text-blue-700 shadow-sm">
                    Cusco
                  </Link>
                  is our pet-friendly campervan designed for clients with two dogs, featuring dedicated pet areas and enhanced ventilation systems.
                </RichParagraph>

                <div className="space-y-4">
                  <IconFeature text="Seating and sleeping for 4 people with pet accommodations" index={0} icon={Users} />
                  <IconFeature text="Dedicated pet bench with built-in fridge and water bowls" index={1} icon={PawPrint} />
                  <IconFeature text="Large awning-style windows for view and ventilation" index={2} icon={Home} />
                </div>
              </div>

              {/* IMAGE SECTION: Now larger (Spans 7 columns) */}
              <div className="lg:col-span-7 p-4 lg:p-10 bg-gray-50">
                {/* Increased height from 500px to 650px to emphasize the visuals */}
                <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[450px] md:h-[550px] lg:h-[650px]">
                  {/* Main Tall Image */}
                  <div className="col-span-1 row-span-2">
                    <ImageWithSkeleton
                      src={imageData.cusco[0]}
                      alt="Cusco interior"
                      className="w-full h-full object-cover rounded-[2rem] shadow-xl border-2 border-white"
                    />
                  </div>
                  {/* Top Small Image */}
                  <div className="col-span-1 row-span-1">
                    <ImageWithSkeleton
                      src={imageData.cusco[1]}
                      alt="Cusco kitchen"
                      className="w-full h-full object-cover rounded-[2rem] shadow-lg border-2 border-white"
                    />
                  </div>
                  {/* Bottom Small Image */}
                  <div className="col-span-1 row-span-1">
                    <ImageWithSkeleton
                      src={imageData.cusco[2]}
                      alt="Cusco exterior"
                      className="w-full h-full object-cover rounded-[2rem] shadow-lg border-2 border-white"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Adventure Lovers */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Adventure-ready Campervans"
            subtitle="Your mobile basecamp for outdoor pursuits"
            icon={Mountain}
          />

          {/* Intro Narrative */}
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
            <RichParagraph className="text-lg md:text-xl text-gray-800">
              At Big Bear Vans, we also build for those who live for the outdoors. Whether you love skiing, surfing, biking, fishing, dance competitions, or triathlons, our customized vans become your mobile basecamp
            </RichParagraph>
            <RichParagraph className="mt-4 text-gray-700">
              Our campervans serve as a changing room, a base for gear, and a comfortable place to rest before and after a competition for you. Our customized vehicles get you to remote locations, serve as a space for all their gear, including dirt bikes, skis, wetsuits, etc, and provide a comfortable place to rest and recharge after a long day.
            </RichParagraph>
          </div>

          {/* Graphic Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 md:mb-24">
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


          {/* MotoVan Featured Section */}
          <div className="bg-white rounded-[3rem] p-6 md:p-10 lg:p-16 border border-emerald-100 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

              {/* LEFT SIDE: Image Section (Spans 7 columns) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                  <ClassicImageGrid images={imageData.motovan} layout="motovan" />
                </div>

                {/* Optional: Add a small caption or secondary image row here if needed */}
                <div className="hidden lg:block p-6 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                  <RichParagraph className="text-sm">
                    *Custom 170" Extended Chassis shown with full adventure package and heavy-duty rear suspension.
                  </RichParagraph>

                </div>
              </div>

              {/* RIGHT SIDE: Content Section (Spans 5 columns) */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold uppercase tracking-wide mb-4">
                    The Ultimate Moto-Base
                  </div>
                  <Heading2 text="The MotoVan" className="text-4xl font-black text-gray-900 my-4" />
                  <RichParagraph>
                    <Link to="https://bigbearvans.com/layout-detail/moto-van" target="_blank" rel="noopener noreferrer" className="px-4 py-1 bg-white border border-blue-200 rounded-full text-xs font-bold text-blue-700 shadow-sm">
                      Motovan
                    </Link>

                    is one of our exclusive campervans that is built for riders. The campervan has a living space and a garage for you and your crew.
                  </RichParagraph>
                </div>

                <div className="space-y-6">
                  {/* The Garage Card */}
                  <div className="bg-gray-50 rounded-[2rem] p-6 border border-gray-100 group hover:border-emerald-200 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-2.5 bg-gray-900 rounded-xl text-white shadow-lg">
                        <Car className="w-5 h-5" />
                      </div>
                      <Heading4 text="The Garage" textColor="text-black" className="my-4"/>
                    </div>
                    <div className="space-y-3">
                      <IconFeature text="Secure, separated garage for up to three motorcycles" index={0} icon={Shield} />
                      <IconFeature text="Integrated clothes dryer and shower for post-ride cleanup" index={1} icon={Home} />
                      <IconFeature text="Car wash system and smart storage for riding equipment" index={2} icon={Zap} />
                    </div>
                  </div>

                  {/* The Living Space Card */}
                  <div className="bg-gray-50 rounded-[2rem] p-6 border border-gray-100 group hover:border-emerald-200 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-2.5 bg-emerald-600 rounded-xl text-white shadow-lg">
                        <Home className="w-5 h-5" />
                      </div>
                      <Heading4 text="The Living Space" textColor="text-black" className="my-4"/>
                    </div>
                    <div className="space-y-3">
                      <IconFeature text="Comfortable sleeping for five with loft bed system" index={0} icon={Users} />
                      <IconFeature text="Convertible seating arrangements for flexible space

" index={1} icon={Shield} />
                      <IconFeature text="Fully functional kitchen with fridge and oven" index={2} icon={Coffee} />
                    </div>
                  </div>
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
            title="Retiree-Friendly Campervans"
            subtitle="Creating lasting memories with comfort and freedom"
            icon={Users}
          />

          {/* Narrative Section - Full Width with optimized max-width for readability */}
          <div className="mx-auto max-w-3xl mb-10 md:mb-14">
            <RichParagraph className="text-lg md:text-xl text-gray-800 leading-relaxed text-center">
              At Big Bear Vans, we've built multiple campervans for retirees who want to visit family across the country,
              create lasting memories with their grandchildren, and travel in complete comfort, entirely off-grid.
            </RichParagraph>
          </div>

          {/* Full-width Features Grid */}
          <div className="w-full mb-16 md:mb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <GraphicFeature
                text="Extended off-grid capability with robust power and water systems"
                index={0}
                graphic={Zap}
                className="bg-slate-50 border-none shadow-sm"
              />
              <GraphicFeature
                text="All-Wheel Drive for any road condition"
                index={1}
                graphic={Car}
                className="bg-slate-50 border-none shadow-sm"
              />
              <GraphicFeature
                text="Spacious, premium interiors designed for multi-generational travel"
                index={2}
                graphic={Home}
                className="bg-slate-50 border-none shadow-sm"
              />
              <GraphicFeature
                text="Advanced safety and navigation systems"
                index={3}
                graphic={Shield}
                className="bg-slate-50 border-none shadow-sm"
              />
            </div>
          </div>

          {/* Vermont Campervan Detail Card */}
          <div className="bg-slate-50 rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-10 lg:p-14 border border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

              {/* LEFT COLUMN: Visuals (Span 7) */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="mb-6">
                  <Heading3 text="Vermont Campervan" textColor="text-black" className="text-3xl md:text-4xl my-4" />
                  <RichParagraph className="mt-4 text-gray-700">
                    <Link
                      to="https://bigbearvans.com/layout-detail/vermont" target="_blank"
                      rel="noopener noreferrer"

                      className="px-4 py-1 bg-white border border-blue-200 rounded-full text-xs font-bold text-blue-700 shadow-sm"
                    >
                      Vermont
                    </Link>
                    {" "}is a 170 AWD Sprinter campervan that we designed for a couple who wanted to travel with their grandchildren.
                  </RichParagraph>
                </div>

                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white mb-8">
                  <ClassicImageGrid images={imageData.vermont} layout="vermont" />
                </div>

                {/* Testimonial anchored to the visual side */}
                <div className="mt-auto">
                  <TestimonialCard
                    quote="We love it. It works great. We love the storage and how open everything is. And it just feels so homey. We did do a lot of looking around and searching, and Big Bear Vans just seemed to be the ones that really adapted to more than two travelers."
                    author="Client from Vermont"
                    van="Vermont Campervan"
                  />
                </div>
              </div>

              {/* RIGHT COLUMN: Specs & Vision (Span 5) */}
              <div className="lg:col-span-5 space-y-8">

                {/* Client Vision - Top Priority */}
                <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                    <Heading4 text="Client Vision" textColor="text-black" className="my-4"/>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <IconFeature text="Off-grid ready campervan

" index={0} icon={MapPin} />
                    <IconFeature text="A van that accommodates more than 2 people." index={1} icon={Users} />
                    <IconFeature text="A spacious kitchen to prepare family meals

" index={2} icon={Coffee} />
                    <IconFeature text="Upgraded exterior for bicycles and other gear

" index={3} icon={Car} />
                  </div>
                </div>

                {/* Our Delivery - The Result */}
                <div className="px-2">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-1.5 h-6 bg-slate-900 rounded-full"></div>
                    <Heading3 text="Our Delivery" textColor="text-black" className="my-4"/>
                  </div>
                  <div className="space-y-6">
                    <IconFeature
                      text="Fully off-grid ready van with a 400Ah Lithium battery, a 3000W inverter, a DC-DC charger, a 12V AC, 30-gal grey, and 20-gal freshwater tanks"
                      index={0}
                      icon={Zap}
                    />
                    <IconFeature
                      text="Double swivel seats, elevator, and dinette bed system for 4-5 people"
                      index={1}
                      icon={Home}
                    />
                    <IconFeature
                      text="Fully functional kitchen with double induction cooktop, deep sink, a microwave, a fridge, and a hidden storage pantry"
                      index={2}
                      icon={Coffee}
                    />
                    <IconFeature
                      text="Two exterior storage boxes, a spacious roof deck, and a powerlift bike rack"
                      index={3}
                      icon={Car}
                    />
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Full-Time Van Lifers Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="4-Season Ready Campervans"
            subtitle="Home on wheels for those who live the journey"
            icon={Home}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start mb-12">
            {/* LEFT SIDE: Narrative Section (Spans 6 columns to fill more space) */}
            <div className="lg:col-span-6 space-y-6">
              <RichParagraph className="my-2">
                Sometimes, we also build campervans for full-time van lifers who
                actually plan to live on the road for a year or more. These
                clients are remote workers, interior designers, and people who
                decided to visit different places and create travel content for
                social media.
              </RichParagraph>
              <RichParagraph className="my-2">
                For full-time living, you need a ton of storage and home-like
                power and water facilities. At Big Bear Vans, we go beyond the
                standard conversion to fulfill the demanding requirements of
                full-time living.
              </RichParagraph>
              <RichParagraph className="my-2">
                Our
                <Link to="https://bigbearvans.com/layout-detail/calabasas" target="_blank" rel="noopener noreferrer" className="px-4 py-1 bg-white border border-blue-200 rounded-full text-xs font-bold text-blue-700 shadow-sm">
                  Calabasas
                </Link>
                and
                <Link to="https://bigbearvans.com/layout-detail/san-diego-campervan" target="_blank" rel="noopener noreferrer" className="px-4 py-1 bg-white border border-blue-200 rounded-full text-xs font-bold text-blue-700 shadow-sm">
                  San Diego
                </Link>
                campervans were
                customized for full-time living.
              </RichParagraph>
            </div>

            {/* RIGHT SIDE: First Testimonial (Spans 6 columns to balance the grid) */}
            <div className="lg:col-span-6">
              <TestimonialCard
                quote="Big Bear Vans did a full conversion for my MB Sprinter, and I could not be happier! I had very specific requests, and they met all of my requests and are truly a completely customizable conversion company. I went to about three different conversion companies, and I was only given certain planned layouts and certain colors. Not at Big Bear Vans, they accommodated my every wish. They are also extremely knowledgeable. I came back for a couple of upgrades, and they gladly accommodated me. I highly suggest Big Bear Vans for your conversion!"
                author="Laura"
                van="Calabasas Campervan"
              />
            </div>
          </div>

          {/* San Diego Campervan Case Study - Visual Emphasis Layout */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-[2.5rem] p-8 md:p-10 lg:p-14 border border-purple-200 shadow-sm">
            {/* Using 12 columns for finer control over the "Side-by-Side" ratio */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-stretch">

              {/* LEFT SIDE: Visuals and Features (Increased Width: Spans 7 columns) */}
              <div className="lg:col-span-7 flex flex-col space-y-8">
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white flex-grow bg-white">
                  <ClassicImageGrid
                    images={imageData.sanDiego}
                    layout="standard"
                  />
                </div>

                {/* Features list in a wide grid to fill the increased space */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 pt-4">
                  <IconFeature
                    text="Robust electrical and water systems"
                    index={0}
                    icon={Zap}
                  />
                  <IconFeature
                    text="Stationary bed & garage storage"
                    index={1}
                    icon={Home}
                  />
                  <IconFeature
                    text="Full shower & kitchen setup"
                    index={2}
                    icon={Coffee}
                  />
                  <IconFeature
                    text="Work desk with swivel seating"
                    index={3}
                    icon={Briefcase}
                  />
                </div>
              </div>

              {/* RIGHT SIDE: Narrative and Testimonial (Spans 5 columns) */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
                <div>
                  <Heading3 text="San Diego Campervan" textColor="text-black" className="my-4"/>
                  <RichParagraph className="my-4">
                    We built the
                    <Link to="https://bigbearvans.com/layout-detail/san-diego-campervan" target="_blank" rel="noopener noreferrer" className="px-4 py-1 bg-white border border-blue-200 rounded-full text-xs font-bold text-blue-700 shadow-sm">
                      San Diego campervan
                    </Link>
                    for an architect who worked
                    on two computers from his van and traveled. The van was
                    designed to be used both as a residence and a workspace.
                  </RichParagraph>
                </div>

                <div className="bg-white rounded-[2rem] p-2 shadow-xl border border-indigo-100">
                  <TestimonialCard
                    quote="Big Bear Vans built an amazing custom campervan for me. They have a really nice team to work with, and I was able to really work closely with them on getting exactly what I wanted in my design. I am a remote worker, so I wanted to have an office space as well as a beefy electrical system, a full kitchen, a shower, and a bed area. I've gotten so many compliments on my buildout and couldn't be happier with how it turned out. Highly recommend Big Bear Vans if you're looking to buy a camper van."
                    author="Remote Worker"
                    van="San Diego Campervan"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Entrepreneurs */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Mobile Office Campervans"
            subtitle="Smart business investments that double as personal escapes"
            icon={Briefcase}
          />

          <div className="text-center max-w-4xl mx-auto">
            <RichParagraph >
              A campervan can be more than just a camper. It can be a smart
              business investment that doubles as a personal escape. At Big
              Bear Vans, we've designed campervans for those who want to
              optimize their tax benefits and allocate their profits to
              something that can serve as both a company asset and a personal
              item.
            </RichParagraph>
            <RichParagraph className="my-4">
              So we've built mobile units that double as:
            </RichParagraph>


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
                  <RichParagraph>
                    {item.title}
                  </RichParagraph>
                </motion.div>
              ))}
            </div>
            <RichParagraph>
              A Big Bear Van serves as both a personal luxury and a business
              asset for you. You can use these campervans as offices,
              showrooms, and workshops during the week, and as adventure
              vehicles on the weekends. It's a smart way to enjoy a camper
              while also investing in a versatile business tool.
            </RichParagraph>
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
            <Heading2 text="Why Our Clients Choose Us?" textColor="text-white" className="my-4"/>
            <RichParagraph white={true} className="my-4 max-w-3xl mx-auto text-center">
              With a consistent five-star rating from owners across the USA,
              we've built more than 105 campervans. Here's why these people
              trust us:
            </RichParagraph>

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
                description: "When you buy a customized van from us, we also offer post-build support. The vans have a 1-year or 3-year extended warranty on our craftsmanship. We also provide remote assistance to our clients.",
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
                <Heading4 text={feature.title} className="my-4"/>

                {typeof feature.description === "string" ? (
                  <RichParagraph white={true}>
                    {feature.description}
                  </RichParagraph>

                ) : (
                  feature.description
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/*Why Should You Buy a Custom Campervan from Us? */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Heading2 text="Why Should You Buy a Custom Campervan from Us?" className="my-4"/>
            <RichParagraph className="text-gray-600">
              When you buy a self-contained campervan from us, you actually get plenty of advantages over others. Here’s why you should buy a custom campervan:
            </RichParagraph>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

            {/* 1. Ease of Travel */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 shadow-sm"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
                <Plane className="text-white w-6 h-6" />
              </div>
              <Heading4 text="Ease of Travel" textColor="text-black" className="my-4"/>
              <ul className="space-y-3 text-sm text-gray-600">
                <ListItem text={"You gain a stress-free traveling experience without worrying about advance bookings, hotel check-ins, flight delays, rental car counters, etc."} />
                <ListItem text={" Your van is your private, clean room, so there will be zero worries about hygiene."} />
                <ListItem text={" You can pack whatever you want. Bring your sports gear, your favorite pillow, or your tools without thinking much about luggage fees or weight limits."} />
              </ul>
            </motion.div>

            {/* 2. Complete Freedom */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 shadow-sm"
            >
              <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-200">
                <Compass className="text-white w-6 h-6" />
              </div>
              <Heading4 text="Complete Freedom" textColor="text-black" className="my-4"/>

              <ul className="space-y-3 text-sm text-gray-600">
                <ListItem text={" With a campervan, you are free to stop anywhere, anytime. See a perfect view? Just pull over and make it your home for the night."} />
                <ListItem text={"You can change your plans on a whim without giving a second thought about non-refundable bookings or fixed itineraries."} />
                <ListItem text={"You get the freedom to go anywhere, anytime, without any need to book stays months in advance or depend on anyone’s schedule. Leave when you want, stop when you want."} />
              </ul>
            </motion.div>

            {/* 3. Personal Comfort */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 shadow-sm"
            >
              <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-200">
                <Heart className="text-white w-6 h-6" />
              </div>
              <Heading4 text="Personal Comfort" textColor="text-black" className="my-4"/>
              <ul className="space-y-3 text-sm text-gray-600">
                <ListItem text={"With our custom van, you can stop relying on unhealthy road food. A full kitchen with all the accessories gives you control over your diet."} />
                <ListItem text={"Your pets will travel safely with you in a campervan, not in cargo or a kennel."} />
                <ListItem text={" You can take your kids or a group of friends together on a fun road trip in one comfortable, private space."} />
              </ul>
            </motion.div>

            {/* 4. Spontaneity (Full Width on Mobile, 1/3 on Desktop) */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 rounded-[2.5rem] bg-indigo-900 text-white shadow-xl"
            >
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                <Zap className="text-white w-6 h-6" />
              </div>
              <Heading4 text="Spontaneity" className="my-4"/>
              <ul className="space-y-3 text-sm text-white">
                <ListItem text={" Your van is always 90% packed. Just add food and fuel, and you’re good to go."} className={true} />
                <ListItem text={"With our campervans, you’ll have the ability to say yes to last-minute trip pan"} className={true} />
              </ul>


            </motion.div>

            {/* 5. Complete Self-Sufficiency (Spans 2 columns on Large screens) */}
            <motion.div
              whileHover={{ y: -5 }}
              className="lg:col-span-2 p-8 md:p-10 rounded-[2.5rem] bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-2xl relative overflow-hidden"
            >
              <div className="relative z-10 gap-8">
                <div>
                  <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6">
                    <BatteryCharging className="text-white w-6 h-6" />
                  </div>
                  <Heading4 text="Complete Self-Sufficiency" className="my-4"/>
                  <ul className="space-y-3 text-sm text-white">
                    <ListItem text={"  Our campervans are completely self-sufficient. Our solar and battery systems run your fridge, lights, and devices without ever plugging in."} className={true} />
                    <ListItem text={" You carry your own water, have hot showers, wash dishes in remote locations, have a private, sanitary bathroom 24/7, and basically can do anything you want."} className={true} />
                  </ul>

                </div>

              </div>
              {/* Decorative background element */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
            </motion.div>

            {/* 6. Financial Efficiency (Full Width Bottom Bar) */}
            <div className="lg:col-span-3 p-8 md:p-12 rounded-[2.5rem] bg-emerald-50 border border-emerald-100 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                <DollarSign className="text-emerald-600 w-8 h-8" />
              </div>
              <div className="flex-grow">
                <Heading4 text="Financial Efficiency After Purchase" textColor="text-black" className="my-4"/>
                <RichParagraph>
                  Unlike money spent on flights and hotels, a campervan is a physical asset you retain. The major investment is upfront. After that, you eliminate recurring costs for flights, hotels, and restaurant-heavy trips. You control your daily travel budget, often drastically reducing it.
                </RichParagraph>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-24 lg:py-28 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heading2 text="Ready to Begin Your Journey?" className="my-4"/>
          <RichParagraph className="my-4">
            Ready to customize your campervan? Let's talk about the van that
            fits your lifestyle
          </RichParagraph>

          <Link to={"https://configurator.bigbearvans.com"} target="_blank"
            rel="noopener noreferrer">
            <BlackButton label="Start Your Custom Build" className="bg-gray-900 text-white font-bold text-base md:text-lg py-4 px-8 md:py-5 md:px-12 rounded-xl hover:bg-gray-800 transition-colors duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl" />

          </Link>
        </div>
      </section>

      {/* --- YOUTUBE SECTION --- */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Heading2 text="See Our Vans in Action" className="my-4"/>

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