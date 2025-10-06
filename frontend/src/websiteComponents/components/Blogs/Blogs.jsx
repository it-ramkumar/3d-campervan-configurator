import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../../../api/blog/getAllBlogs";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function BlogsListing() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      const result = await getAllBlogs();
      if (result.success) {
        setBlogs(result.data);
      } else {
        setError(result.error || "Failed to fetch blogs");
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  // ✅ Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  return (
    <>
      <Navbar />
<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 text-center px-4">
  <div className="max-w-md bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">
      🚧 Coming Soon
    </h1>
    <p className="text-gray-600 mb-6">
      Our website is currently in <span className="font-medium text-indigo-600">development phase</span>.
      We're working hard to bring you something amazing. Stay tuned!
    </p>

    <div className="flex justify-center space-x-3">
      <input
        type="email"
        placeholder="Enter your email"
        className="px-4 py-2 border border-gray-300 rounded-lg w-2/3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
        Notify Me
      </button>
    </div>

    <p className="text-sm text-gray-400 mt-6">
      © {new Date().getFullYear()} YourCompany. All rights reserved.
    </p>
  </div>
</div>

      {/* ✅ Hero Section */}
      {/* <div className="relative bg-gray-900 text-white h-64 flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
          alt="Blogs Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold">Our Blogs</h1>
          <p className="mt-2 text-lg">Latest updates, stories, and insights</p>
        </div>
      </div> */}

      {/* ✅ Blog Listing */}
      {/* <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-8">Latest Blogs</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-16">
          {currentBlogs.map((blog) => (
            <div
              key={blog._id}
              className="group block hover:shadow-lg transition p-2"
            >

              {blog.gallery.length > 0 && (
                <img
                  src={blog.gallery[0]}
                  alt={blog.title}
                  className="w-full h-48 object-cover  mb-4 transition-transform duration-300 group-hover:scale-105"
                />
              )}

              <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-black">
                {blog.title}
              </h2>


              <p className="text-sm text-gray-500">
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>


        <div className="flex justify-center mt-10 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-md border ${
                currentPage === i + 1
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div> */}

      <Footer />
    </>
  );
}
