"use client";

import { Link } from "react-router-dom";
import BlackButton from "../../Common/Button/BlackButton";

// Placeholder images for the grid
const image1 = "/images/image5l.webp";
const image2 = "/images/image6l.webp";
const image3 = "/images/image7l.webp";
const image4 = "/images/image8l.webp";

export default function Couples() {
  return (
    <section className="bg-white text-black font-serif pt-8 md:pt-12 pb-12 md:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-center font-bold text-4xl md:text-5xl lg:text-[3rem] mt-0 mb-8 md:mb-12 opacity-0 translate-y-10 animate-fadeInUp">
          Campervans Layouts for Couples (For 2)
        </h2>

        {/* Image Grid */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
          {/* Image 1 */}
          <div className="col-span-1 h-48 md:h-96 opacity-0 translate-y-10 animate-fadeInUp delay-[0.1s]">
            <img
              src={image1}
              alt="Campervan interior for couples"
              className="w-full h-full object-cover rounded-3xl shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
            />
          </div>

          {/* Image 2 */}
          <div className="col-span-1 h-48 md:h-96 opacity-0 translate-y-10 animate-fadeInUp delay-[0.2s]">
            <img
              src={image2}
              alt="Campervan kitchen and seating area for couples"
              className="w-full h-full object-cover rounded-3xl shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
            />
          </div>

          {/* Image 4 (Tall one) */}
          <div className="col-span-1 row-span-2 opacity-0 translate-y-10 animate-fadeInUp delay-[0.3s]">
            <img
              src={image4}
              alt="Detailed view of campervan bedroom for couples"
              className="w-full h-full object-cover rounded-3xl shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
            />
          </div>

          {/* Image 3 (Wide one) */}
          <div className="col-span-2 opacity-0 translate-y-10 animate-fadeInUp delay-[0.4s]">
            <img
              src={image3}
              alt="Spacious interior view of a couple's campervan"
              className="w-full h-48 md:h-full object-cover rounded-3xl shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
            />
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center opacity-0 translate-y-10 animate-fadeInUp delay-[0.5s]">
          <BlackButton label="Click To Explore" link="/couples-layout" />
        </div>
      </div>
    </section>
  );
}
