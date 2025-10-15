import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../../../api/blog/getAllBlogs";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

import { CalendarDays } from "lucide-react";

export default function BlogsListing() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
const data = [
  {
    title: "Modern Website Design",
    desc: "A sleek and responsive web design for a digital agency.",
    block: {
      title: "Main Project Overview",
      desc: "This project focused on creating a strong brand presence online.",
      image: "/images/w3.jpg",
    },
    gallery: [
     "/images/w3.jpg",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
  {
    title: "E-commerce Platform",
    desc: "A full-featured online store with admin panel and analytics.",
    block: {
      title: "Shop Smart",
      desc: "We built an easy-to-navigate platform for users and admins.",
      image: "https://via.placeholder.com/400x250",
    },
    gallery: [
     "/images/w3.jpg",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
  },
];

  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     const result = await getAllBlogs();
  //     if (result.success) {
  //       setBlogs(result.data);
  //     } else {
  //       setError(result.error || "Failed to fetch blogs");
  //     }
  //     setLoading(false);
  //   };

  //   fetchBlogs();
  // }, []);

  // if (loading) return <div className="p-4">Loading...</div>;
  // if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  // ✅ Pagination logic
  // const indexOfLastBlog = currentPage * blogsPerPage;
  // const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  // const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  // const totalPages = Math.ceil(blogs.length / blogsPerPage);

  return (
<>
  <Navbar />

  {/* ✅ Hero Section */}
  <div className="relative h-screen flex flex-col items-center justify-center text-center text-white overflow-hidden rounded-md">
    <img
      src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
      alt="Blogs Hero"
      className="absolute inset-0 w-full h-full object-cover opacity-60"
    />
    <div className="relative z-10 px-6">
      <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Blogs</h1>
      <p className="text-lg md:text-xl max-w-2xl mx-auto">
        Latest updates, stories, and insights from our creative projects.
      </p>
    </div>
  </div>

  {/* ✅ Search Bar Section */}
  <div className="flex flex-col items-center justify-center py-12 bg-white rounded-md">
    <div className="w-full md:w-1/2 flex items-center border border-gray-300 rounded-full shadow-sm overflow-hidden">
      {/* Search Icon */}
      <div className="px-4 text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
          />
        </svg>
      </div>

      {/* Input */}
      <input
        type="text"
        placeholder="Search blogs..."
        className="flex-1 py-3 px-2 text-gray-700 focus:outline-none"
      />

      {/* Category Dropdown */}
      <div className="flex items-center bg-gray-100 px-4 py-3 border-l border-gray-300 rounded-r-full">
        <select
          className="bg-gray-100 text-gray-700 focus:outline-none text-sm"
          defaultValue=""
        >
          <option value="" disabled>
            Category
          </option>
          <option>Design</option>
          <option>Development</option>
          <option>Marketing</option>
          <option>Business</option>
        </select>

        {/* Dropdown Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 ml-2 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 9.75L12 13.5l3.75-3.75"
          />
        </svg>
      </div>
    </div>
  </div>

  {/* ✅ Recent Post Heading */}
  <div className="px-6 md:px-12 lg:px-24 mt-8">
    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-left">
      Recent Posts
    </h2>
  </div>

  {/* ✅ Simple Blog List Section */}
  <div className="py-16 px-6 md:px-12 lg:px-24 bg-gray-50 rounded-md">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {data.slice(0, 4).map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-md shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-200 flex flex-col justify-between"
        >
          <div className="bg-black/70 text-white text-xs px-3 py-1 rounded-full w-fit mb-2">
            {item.date || "Oct 15, 2025"}
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
            {item.title}
          </h2>
          <p className="text-gray-600 text-sm line-clamp-3">
            {item.desc ||
              "A short overview of this project. We focused on modern design and innovative solutions to achieve the client’s goals."}
          </p>
        </div>
      ))}
    </div>
  </div>

  {/* ✅ Main Projects Section (Original Cards) */}
  <div className="py-20 px-6 md:px-12 lg:px-20 bg-gray-50 rounded-md">
    <div className="text-center mb-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
        Our Projects
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Explore our latest creative works — designed with passion and precision.
      </p>
    </div>

    {/* ✅ Cards Container */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {data.map((item, index) => (
        <div
          key={index}
          className="relative bg-white p-4 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group rounded-md"
        >
          {/* ✅ Background Image */}
          <div className="relative h-56 w-full overflow-hidden rounded-md">
            <img
              src={item.gallery[0]}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* ✅ Date (Top-left corner) */}
            <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
              {item.date || "Oct 15, 2025"}
            </div>
          </div>

          {/* ✅ Content Section */}
          <div className="pt-5">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {item.title}
            </h2>
            <p className="text-gray-600 text-sm line-clamp-3 mb-3">
              {item.desc ||
                "A short overview of this project. We focused on modern design and innovative solutions to achieve the client’s goals."}
            </p>
            <a
              href="#"
              className="text-blue-600 font-medium text-sm hover:underline"
            >
              See more →
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>

  <Footer />
</>


  );
}
