"use client";
import React from "react";

const ShowroomAndTours = () => {
  return (
    <div className="bg-white text-blackish font-sans">
      {/* Big Bear Destination Section */}
      <section className="relative w-full h-[220px] overflow-hidden"> 
        {/* Background Image */}
        <img
          src="/images/virtuaal1.png"
          alt="Big Bear Lake and mountains"
          className="absolute inset-0 w-full h-full object-cover origin-center
                     transition-all duration-700 ease-in-out
                     scale-[1.1]           
                     hover:scale-[1.2]        
                     hover:brightness-75"           
        />
        {/* Black Overlay with 70% opacity */}
        <div className="absolute inset-0 bg-black opacity-70"></div>
        
        {/* Text Content */}
        <div className="relative z-10 flex items-center justify-center h-full p-4">
          <p className="text-white text-xl md:text-2xl font-serif font-medium text-center max-w-4xl leading-snug">
            Visiting our showroom isn’t just about vans. Big Bear itself is a
            destination worth the trip. Surrounded by mountains, a beautiful
            lake, and two ski resorts, you’ll enjoy your time here as much as
            your visit with us.
          </p>
        </div>
      </section>

      {/* Virtual Tours Section */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold font-serif text-center mb-12 md:mb-16 text-black">
          Virtual Tours For Distant Clients
        </h2>

        {/* Content - Image on Left, Text on Right */}
        <div className="flex flex-col md:flex-row items-start gap-10 md:gap-20">
          {/* Left Side: Image (Image 2) */}
          <div className="w-full md:w-7/12 lg:w-1/2 mt-12 group"> 
            <div 
              className="aspect-[700/500] bg-gray-200 overflow-hidden rounded-2xl border-[3px] border-[#000000BF]
                shadow-xl transition-all duration-500 ease-in-out 
                group-hover:shadow-2xl group-hover:scale-[1.03] group-hover:brightness-90
                group-hover:grayscale-[20%] group-hover:contrast-125 group-hover:saturate-150" // Added new effects
            > 
              <img
                src="/images/virtuaal2.png" // Placeholder image path
                alt="Laptop screen showing a virtual tour of a campervan"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side: Text Content */}
          <div className="w-full md:w-5/12 lg:w-1/2 text-lg md:text-xl font-serif text-black space-y-6">
            <p>
              If you’re out of State, no problem. We’ll bring the showroom to
              you. Jump on a video call with us via FaceTime or Zoom. We’ll give
              you a full virtual tour of our workshop, just like you’re here
              in person.
            </p>

            <p>
              Via Zoom calls, you’ll be able to:
            </p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li>Walk through our finished builds and ongoing projects.</li>
              <li>See materials, layouts, and design options up close.</li>
              <li>Meet with our project manager, engineering, and design teams.</li>
            </ul>

            <p>
              Many of our clients complete the entire design process virtually and
              only visit once to pick up their finished van.
            </p>

            <p>
              Whether you meet us in person or online, you’ll get the same
              hands-on design experience and access to our team.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShowroomAndTours;