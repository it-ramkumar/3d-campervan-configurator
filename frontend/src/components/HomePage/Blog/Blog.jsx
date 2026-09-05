import React from "react";
import { blogCard } from "../../../api/blog/blogCard";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { Heading2, Heading3, RichParagraph, SecondaryButton, ImageWithSkeleton } from '../../Common/Common'

export default async function Blog() {
  let blogs = [];
  try {
    const result = await blogCard();
    blogs = result?.data || [];
  } catch (error) {
    console.error("Failed to fetch blog details on server:", error);
  }

  if (blogs.length === 0) return null;

  return (
    <section className="bg-white w-full py-20 overflow-hidden antialiased relative">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">

        {/* --- Header Section --- */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <p className="text-hover text-xs uppercase tracking-widest font-bold mb-3">
            Insights &amp; Stories
          </p>
          <Heading2 text="Explore Our Van Life Blog" />
          <div className="bbv-divider mb-6 mx-auto" />
          <RichParagraph className="!text-primary/60">
            Expert advice on custom Sprinter conversions, off-grid living, and the freedom of the open road.
          </RichParagraph>
        </div>

        {/* --- Blog Post Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {blogs.map((post) => (
            <Link
              key={post?.slug}
              href={`/blog/${post?.slug}`}
              className="group flex flex-col h-full bg-white border border-primary/10 shadow-sm rounded-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden">
                <ImageWithSkeleton
                  src={post?.gallery[0] || "/images/blackLogo.webp"}
                  alt={post?.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020C18]/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(2,12,24,0.80)', backdropFilter: 'blur(12px)', border: '1px solid rgba(237,152,95,0.25)' }}>
                  <Calendar size={12} className="text-hover" />
                  <span className="text-[10px] font-bold text-hover uppercase tracking-wider">
                    Latest Post
                  </span>
                </div>
                <div className="bbv-amber-line" />
              </div>

              {/* Content Section */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs uppercase text-hover bg-hover/10 border border-hover/20 px-2 py-1 rounded-lg font-bold tracking-wider">
                    Resources
                  </span>
                  <div className="flex items-center gap-2 text-primary/40">
                    <Clock size={12} />
                    <span className="text-[10px]">5 min read</span>
                  </div>
                </div>

                <Heading3
                  text={post.title}
                  className="mb-4 group-hover:!text-hover transition-colors line-clamp-2"
                />
                <RichParagraph className="line-clamp-3 mb-6 !text-primary/60">
                  {post.description}
                </RichParagraph>

                <div className="flex items-center gap-2 group-hover:gap-4 transition-all mt-auto">
                  <span className="text-hover text-sm font-bold uppercase tracking-wider">
                    Read Article
                  </span>
                  <ArrowUpRight size={16} className="text-hover" />
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
