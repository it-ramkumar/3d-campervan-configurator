import React from "react";
import { getAllBlogs } from "../../../api/blog/getAllBlogs";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { Heading2, Heading3, RichParagraph, SecondaryButton, ImageWithSkeleton } from '../../Common/Common'

// Note: "use client" hata diya hai
export default async function Blog() {
  // Direct fetch call (no useEffect/useState needed)
  let blogs = [];
  try {
    const result = await getAllBlogs();
    blogs = result?.data || [];
  } catch (error) {
    console.error("Failed to fetch blogs on server:", error);
  }

  // Agar loading state dikhani ho toh parent page par Suspense use karein
  if (blogs.length === 0) return null;

  return (
    <section className="w-full py-20 bg-secondary overflow-hidden antialiased">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* --- Header Section --- */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <RichParagraph className="!text-hover font-bold !text-sm tracking-wider uppercase mb-4 block">Insights & Stories</RichParagraph>
          <Heading2 text="Explore Our Van Life Blog" />
          <div className="w-16 h-1 bg-hover mx-auto rounded-lg my-6"></div>
          <RichParagraph>
            Expert advice on custom Sprinter conversions, off-grid living, and the freedom of the open road.
          </RichParagraph>
        </div>

        {/* --- Blog Post Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[var(--gap-sm)]">
          {blogs.slice(0, 4).map((post) => (
            <Link
              key={post?._id}
              href={`/blog-detail/${post?.slug}`}
              className="group flex flex-col h-full bg-white rounded-lg overflow-hidden border border-primary/5 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <ImageWithSkeleton
                  src={post?.gallery?.[0]}
                  alt={post?.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-[var(--gap-sm)] border border-primary/5">
                  <Calendar size={12} className="!text-hover" />
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                    {new Date(post?.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-sm mb-4">
                  <RichParagraph className="!text-xs uppercase !text-hover bg-hover/10 px-2 py-1 rounded-lg">
                    Resources
                  </RichParagraph>
                  <div className="flex items-center gap-sm text-primary/40">
                    <Clock size={12} />
                    <span className="text-[10px]">5 min read</span>
                  </div>
                </div>

                <Heading3 text={post.title} className="mb-4 group-hover:!text-hover transition-colors line-clamp-2" />
                <RichParagraph className="line-clamp-3 mb-6">
                  {post.description}
                </RichParagraph>

                <div className="flex items-center gap-sm group-hover:gap-4 transition-all">
                  <RichParagraph className="!text-hover !text-sm">
                    Read Article
                  </RichParagraph>
                  <ArrowUpRight size={16} className="!text-hover" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-20 text-center">
          <SecondaryButton
            label="Browse All Articles"
            link="/blog"
            className="!px-10 !py-4 shadow-lg !rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}