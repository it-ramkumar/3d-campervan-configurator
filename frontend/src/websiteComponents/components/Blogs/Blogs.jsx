import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";
import BlackButton from "../Common/Button/BlackButton";
import { getAllBlogs } from "../../../api/blog/getAllBlogs";
import { Search, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import HeroSection from "../HeroSection/HeroSection";
import ImageWithSkeleton from "../Common/ImageWithSkeleton/ImageWithSkeleton";

export default function BlogsListing() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const heroImage = "/heroSlider/bloghero.webp";

  // ✅ Fetch Blogs (Fixed for Strict Mode)
  useEffect(() => {
    let isMounted = true; // flag to prevent double fetch
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const data = await getAllBlogs(page, searchTerm);
        if (isMounted && data?.data) {
          setBlogs(data.data);
          setTotalPages(data.pagination?.totalPages || 1);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchBlogs();

    return () => {
      isMounted = false; // cleanup on unmount
    };
  }, [page, searchTerm]);

  // ✅ Handle Search
  const handleSearch = () => {
    setPage(1);
    setSearchTerm(searchInput);
  };

  // ✅ Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };
  if(loading){
    return (
<Loader/>
  );
  }

  return (
    <>
      <Navbar />
      <HeroSection
        title="Blogs"
        description="Read our latest articles, tips, and insights"
        image={heroImage}
        showButton={false}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-[95%] mx-auto px-4 lg:px-8 py-16">
          {/* 🔍 Search */}
          <div className="mb-12">
            <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase">
              Search Articles
            </label>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-800 text-lg shadow-md"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              <BlackButton
                label="Search"
                onClick={handleSearch}
             
              />

            </div>
          </div>

          {/* ✅ Latest Articles */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Latest Articles
              </h2>
            </div>

            {/* Blog Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-8 w-full">
              {blogs.map((blog) => (
                <article
                  key={blog._id}
                  className="group bg-white rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <ImageWithSkeleton
                    src={blog.gallery?.[0]}
                    alt={blog.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-gray-700">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {blog.description}
                    </p>
                    <BlackButton label="Read More" link={`/blog-detail/${blog._id}`}/>

                  </div>
                </article>
              ))}
            </div>

            {/* No Data Message */}
            {blogs.length === 0 && !loading && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No articles found.</p>
              </div>
            )}

            {/* ✅ Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-16">
                <BlackButton
                  label={"Previous"}
                  onClick={handlePrev}
                  disabled={page === 1}

               />


                <span className="text-lg font-semibold text-gray-700">
                  Page {page} of {totalPages}
                </span>

                <BlackButton
                  label={"Next"}
                  onClick={handleNext}
                  disabled={page === totalPages}

                />

              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
