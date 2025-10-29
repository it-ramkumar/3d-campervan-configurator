"use client";

import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../../../../api/blog/getAllBlogs";
import { Link } from "react-router-dom";


export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      const result = await getAllBlogs();
      setBlogs(result.data);
    };
    fetchBlogs();
  }, []);
  // console.log(blogs,"blogs");
  const blogPosts = [
    {
      _id: 1,
      title: "Van Kitchen Appliances",
      gallery: [{url: "/images/b1.jpg",id: 1}],
      link: "/blog/van-kitchen-appliances",
    },
    {
      _id: 2,
      title: "Camper Mattress Sizes",
      gallery: [{url: "/images/b2.jpg",id: 2}],
      link: "/blog/camper-mattress-sizes",
    },
    {
      _id: 3,
      title: "Camper Van Bathroom",
      gallery: [{url: "/images/b3.jpg",id: 3}],
      link: "/blog/camper-van-bathroom",
    },
    {
      _id: 4,
      title: "Campervan Electrical Systems",
      gallery: [{url: "/images/b4.jpg",id: 4}],
      link: "/blog/campervan-electrical-systems",
    },
  ];
const data = blogs.length > 0 ? blogs : blogPosts;
  return (
    // MINIMAL TOP PADDING: pt-4 (1rem / 16px)
    <section className="w-full pt-4 pb-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading and Subheading */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-5xl font-bold text-black mb-4">
            Explore Our Van Life Blog
          </h2>
          <p className="font-serif text-xl text-black/70 max-w-3xl mx-auto">
            Check our blog to learn everything about the vanlife, custom Sprinter vans, and other campervans.
          </p>
        </div>

      {/* Blog Post Cards */}
<div className="flex flex-col items-center md:flex-row md:justify-center flex-wrap gap-8 lg:gap-10 px-4">
  {data?.slice(0, 4).map((post) => (
    <Link
      key={post._id}
      to={`/blog-detail/${post._id}`}
      className="group relative w-[300px] h-[370px] rounded-[28px] border-[3px] border-gray-700 overflow-hidden shadow-md hover:shadow-2xl hover:shadow-gray-800 transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.02]"
    >
      {/* Background Image with smooth zoom */}
      <div className="relative w-full h-full overflow-hidden">
        <img
          src={post.gallery[0]}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.12]"
        />
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      {/* Card Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-6">
        {/* Arrow Button */}
        <Link to={`/blog-detail/${post._id}`}>
          <div className="self-end p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-black hover:shadow-lg hover:shadow-gray-600 transition-all duration-300 group-hover:translate-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:stroke-white transition-colors duration-300"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </Link>

        {/* Title Section */}
        <div>
          <h3 className="font-serif text-[26px] font-semibold text-white leading-tight drop-shadow-md">
            {post.title.length > 45 ? post.title.slice(0, 45) + '...' : post.title}
          </h3>

        </div>
      </div>

      {/* Decorative hover border glow */}
      <div className="absolute inset-0 border-[3px] border-transparent group-hover:border-white/40 rounded-[28px] transition-all duration-500"></div>
    </Link>
  ))}
</div>


      </div>
    </section>
  );
}