"use client";
import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../../../../api/blog/getAllBlogs";
import { Link } from "react-router-dom";
import Loader from "../../Loader/Loader";
import ImageWithSkeleton from "../../Common/ImageWithSkeleton/ImageWithSkeleton";
import BlackButton from "../../Common/Button/BlackButton";
import Heading2 from "../../Common/Headings/Heading2";
import Heading3 from "../../Common/Headings/Heading3";
import RichParagraph from "../../Common/Paragraph/RichParagraph";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const result = await getAllBlogs();
        setBlogs(result.data || []);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="w-full mt-10 md:mt-24 py-12 bg-gray-100">
      <div className="container mx-auto px-4">

        {/* Header Section */}
        <div className="text-center mb-10 lg:mb-14">
          <Heading2 text="Explore Our Van Life Blog" />
          <RichParagraph className="max-w-2xl mx-auto">Check our blog to learn everything about vanlife, custom Sprinter vans, and campervans.</RichParagraph>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {blogs.slice(0, 4).map((post) => (
            <Link
              key={post._id}
              to={`/blog-detail/${post.slug}`}
              className="group relative h-[400px] w-full rounded-[24px] border-2 border-gray-800 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 ease-in-out hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="absolute inset-0 z-0">
                <ImageWithSkeleton
                  src={post.gallery?.[0]}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  click={true}
                />
                {/* Darker Overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-90"></div>
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 h-full flex flex-col justify-between p-6">

                {/* Arrow Icon (Top Right) */}
                <div className="self-end translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <div className="p-2 bg-white rounded-full shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="black"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                </div>

                {/* Text Bottom */}
                <div>
                  {/* Category or Date could go here */}
                  <span className="text-[10px] uppercase tracking-[2px] text-white/60 font-bold mb-2 block">
                    {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) || 'Van Life'}
                  </span>
                  <Heading3 text={post.title.length > 50 ? post.title.slice(0, 50) + "..." : post.title} className="text-white" />
                </div>
              </div>

              {/* Hover Inner Border */}
              <div className="absolute inset-0 border-[1px] border-white/0 group-hover:border-white/20 rounded-[24px] pointer-events-none transition-all duration-500 m-2"></div>
            </Link>
          ))}
        </div>

        {/* View All Blogs Button (Optional) */}
        <div className="mt-12 text-center">
          <BlackButton label="View All Posts" link="/blog" />

        </div>

      </div>
    </section>
  );
}