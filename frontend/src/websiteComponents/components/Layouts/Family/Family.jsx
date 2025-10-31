"use client";

import { MdFamilyRestroom } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";
import BlackButton from "../../Common/Button/BlackButton";

// Placeholder images
const image1 = "/images/limage1.webp";
const image2 = "/images/limage2.webp";
const image3 = "/images/limage3.webp";
const image4 = "/images/limage4.webp";

// Category Item (Tailwind version)
const CategoryItem = ({ icon, title, description, delay = 0 }) => (
  <div
    className={`group flex items-center w-full p-4 space-x-4 rounded-xl bg-white border border-gray-200 shadow-sm
    hover:shadow-md transition-all duration-300 cursor-pointer min-h-[80px]
    opacity-0 translate-y-6 animate-fadeInUp`}
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="flex-shrink-0 p-2 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105 border border-gray-100">
      {icon}
    </div>

    <div className="flex-1 min-w-0">
      <h4 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-gray-800 transition-colors duration-300 truncate">
        {title}
      </h4>
      <p className="text-gray-600 leading-tight text-sm line-clamp-2">
        {description}
      </p>
    </div>

    <div className="flex-shrink-0 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </div>
  </div>
);

export default function Family() {
  return (
    <section className="bg-white text-black font-serif pt-12 md:pt-20 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Top Text */}
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12 animate-fadeInUp">
          <p className="text-[1.25rem] leading-relaxed text-gray-700 mb-8">
            Have a look at our completed projects. We're honoured to serve clients
            from different states in the USA. We've built custom vans for families,
            couples, pet-owners, remote workers, surfers, bikers, etc, all while
            considering their specific needs. You can check them all here.
          </p>

          {/* Categories */}
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 max-w-2xl mx-auto">
            <CategoryItem
              icon={<MdFamilyRestroom className="h-8 w-8 text-green-600" />}
              title="For Families (2+)"
              description="The first section has vans for larger groups."
              delay={0.1}
            />
            <CategoryItem
              icon={<FaUserFriends className="h-8 w-8 text-blue-600" />}
              title="For Two People"
              description="The second section consists of these campervans."
              delay={0.3}
            />
          </div>

          <p className="mt-12 text-[1.25rem] leading-relaxed text-gray-700 animate-fadeInUp delay-[0.3s]">
            Browse to find inspiration for your dream campervan and to see our
            craftsmanship in every detail.
          </p>
        </div>

        {/* Heading */}
        <h2 className="text-center font-bold text-4xl md:text-5xl lg:text-[3rem] mb-8 md:mb-12 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent animate-fadeInUp">
          Campervans Layouts for Family (For 2+)
        </h2>

        {/* Image Grid */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
          <div className="col-span-1 h-48 md:h-96 animate-fadeInUp delay-[0.1s]">
            <img loading="lazy"
              src={image1}
              alt="Campervan interior with bunk beds"
              className="w-full h-full object-cover rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03]"
            />
          </div>

          <div className="col-span-1 h-48 md:h-96 animate-fadeInUp delay-[0.2s]">
            <img loading="lazy"
              src={image2}
              alt="Campervan kitchen and seating area"
              className="w-full h-full object-cover rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03]"
            />
          </div>

          <div className="col-span-1 row-span-2 animate-fadeInUp delay-[0.3s]">
            <img loading="lazy"
              src={image4}
              alt="Detailed view of campervan kitchen amenities"
              className="w-full h-full object-cover rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03]"
            />
          </div>

          <div className="col-span-2 animate-fadeInUp delay-[0.4s]">
            <img loading="lazy"
              src={image3}
              alt="Spacious interior view of a family campervan"
              className="w-full h-48 md:h-full object-cover rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03]"
            />
          </div>
        </div>

        <div className="flex justify-center animate-fadeInUp delay-[0.5s]">
          <BlackButton label="Click To Explore" link="/family-layout" />
        </div>
      </div>
    </section>
  );
}
