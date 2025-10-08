"use client";

import React from "react";

import { Link } from "react-router-dom";

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Van Kitchen Appliances",
      image: "/images/b1.jpg",
      link: "/blog/van-kitchen-appliances",
    },
    {
      id: 2,
      title: "Camper Mattress Sizes",
      image: "/images/b2.jpg",
      link: "/blog/camper-mattress-sizes",
    },
    {
      id: 3,
      title: "Camper Van Bathroom",
      image: "/images/b3.jpg",
      link: "/blog/camper-van-bathroom",
    },
    {
      id: 4,
      title: "Campervan Electrical Systems",
      image: "/images/b4.jpg",
      link: "/blog/campervan-electrical-systems",
    },
  ];

  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading and Subheading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold leading-tight tracking-tight font-serif">
            Explore Our Van Life Blog
          </h2>
          <p className="font-serif text-sm sm:text-base text-black/70 max-w-3xl mx-auto">
            Check our blog to learn everything about the vanlife, custom Sprinter vans, and other campervans.
          </p>
        </div>

        {/* Blog Post Cards */}
        <div className="flex flex-col items-center md:flex-row md:justify-center gap-6 md:gap-8 lg:gap-10">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={post.link}
              className="group relative w-[300px] h-[350px] rounded-[31px] border-4 border-gray-800 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-gray-700 transform transition-all duration-300 hover:-translate-y-2"
            >
              {/* Background Image with improved quality and smooth zoom */}
              <div className="relative w-full h-full">
                <img
                  src={post.image}
                  alt={post.title}
                  style={{ objectFit: 'cover' }}
                  quality={85}
                  className="transition-transform duration-500 ease-in-out group-hover:scale-115"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

              {/* Card Content and Icon */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                {/* Arrow Icon */}
                <div className="self-end p-2 bg-white rounded-full transition-transform duration-300 group-hover:translate-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-3xl font-semibold text-white leading-tight">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center">


        </div>
      </div>
    </section>
  );
}
