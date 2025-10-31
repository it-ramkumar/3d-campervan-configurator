import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { getAllBlogs } from "../../../api/blog/getAllBlogs";
import { Search, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import HeroSection from "../HeroSection/HeroSection";

export default function BlogsListing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs] = useState([]);
  const containerRef = useRef(null);
  const heroImage = "/heroSlider/bloghero.webp";

  // ✅ Fetch blogs from backend
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getAllBlogs();
        setBlogs(data.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetch();
  }, []);

  // ✅ GSAP animation
  // useEffect(() => {
  //   const ctx = gsap.context(() => {
  //     gsap.fromTo(
  //       ".bg-image",
  //       { scale: 1 },
  //       {
  //         scale: 1.1,
  //         x: "random(-3%, 3%)",
  //         y: "random(-3%, 3%)",
  //         duration: 15,
  //         ease: "none",
  //         repeat: -1,
  //         yoyo: true,
  //       }
  //     );

  //     gsap.from(".anim-content", {
  //       y: 80,
  //       opacity: 0,
  //       stagger: 0.2,
  //       duration: 1.2,
  //       ease: "power3.out",
  //     });
  //   }, containerRef);

  //   return () => ctx.revert();
  // }, []);

  // ✅ Filter blogs by search term
  const filteredBlogs = blogs.filter((blog) => {
    const title = blog.title?.toLowerCase() || "";
    const desc = blog.description?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();
    return title.includes(term) || desc.includes(term);
  });

  return (
    <>
      <Navbar />
      <HeroSection title="Blogs" description="Read our latest articles, tips, and insights" image={heroImage} showButton={false} />
      {/* ✅ Main Content */}
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-[95%] mx-auto px-4 lg:px-8 py-16">

          {/* Search */}
          <div className="mb-12">
            <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase">
              Search Articles
            </label>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-800 text-lg shadow-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* ✅ Latest Articles */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
              <span className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full border">
                {filteredBlogs?.length || 0} articles
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-8 w-full">
              {filteredBlogs.map((blog) => (
                <article
                  key={blog._id}
                  className="group bg-white rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <img loading="lazy"
                    src={blog.gallery?.[0]}
                    alt={blog.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-gray-700">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {blog.description}
                    </p>
                    <Link
                      to={`/blog-detail/${blog._id}`}
                      className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-all"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {filteredBlogs.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No articles found.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
