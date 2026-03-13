"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // Add kiya
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";
import { getAllBlogs } from "../../../api/blog/getAllBlogs";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Search, BookOpen } from "lucide-react";
import HeroSection from "../HeroSection/HeroSection";
import {
  Heading2,
  Heading4,
  RichParagraph,
  ImageWithSkeleton,
  SecondaryButton,
  Heading3
} from '../Common/Common';

import { generateBlogListingSchema } from "../../schema/blogPage";

export default function BlogsListing() {
  const [searchParams, setSearchParams] = useSearchParams(); // URL params ke liye
const location = useLocation();
  const [blogs, setBlogs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // URL se values get karo
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const searchTerm = searchParams.get('search') || "";
  const [searchInput, setSearchInput] = useState(searchTerm);

  const heroImage = "/heroSlider/bloghero.webp";

  useEffect(() => {
    let isMounted = true;
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const data = await getAllBlogs(currentPage, searchTerm);
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
    return () => { isMounted = false; };
  }, [currentPage, searchTerm]);

  // URL update karne ka function
  const updateURL = (search = "", page = 1) => {
    const params = new URLSearchParams();

    // Page add karo (agar 1 nahi hai toh)
    if (page > 1) {
      params.set('page', page.toString());
    }

    // Search add karo (agar empty nahi hai toh)
    if (search && search.trim() !== '') {
      params.set('search', search.trim());
    }

    setSearchParams(params);
  };

  const handleSearch = () => {
    updateURL(searchInput, 1); // Page 1 pe reset karo
  };

  // Pagination handlers
  const handleNext = () => {
    if (currentPage < totalPages) {
      updateURL(searchTerm, currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      updateURL(searchTerm, currentPage - 1);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);



  const pageSuffix = currentPage > 1 ? ` - Page ${currentPage}` : "";
  const searchSuffix = searchTerm ? ` for "${searchTerm}"` : "";

 const finalTitle = `${searchTerm ? `Search Results: ${searchTerm}` : "Van Conversion Blog"}${pageSuffix} | Big Bear Vans`;
  const finalDesc = `Explore expert van conversion guides and stories${searchSuffix}. Tips on layouts, bathrooms, and solar setups.${pageSuffix}`;
  const canonicalUrl = `https://bigbearvans.com${location.pathname}${currentPage > 1 ? `?page=${currentPage}` : ""}`;

 const blogSchema = generateBlogListingSchema(blogs, currentPage);

  return (
    <>
    <Helmet>
  {/* ✅ 1. Standard SEO Meta Tags */}
  <title>{finalTitle}</title>
  <meta name="description" content={finalDesc} />
  <link rel="canonical" href={canonicalUrl} />

  {/* Robots Logic (Keep as is, it's great!) */}
  {searchTerm ? (
    <meta name="robots" content="noindex, follow" />
  ) : (
    <meta name="robots" content="index, follow" />
  )}

  {/* ✅ 2. Open Graph (Facebook/WhatsApp/LinkedIn) */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content={finalTitle} />
  <meta property="og:description" content={finalDesc} />
  <meta property="og:url" content={canonicalUrl} />
  {/* Yahan Journal ki ek general achi image (e.g. hero slider image) ka link dein */}
  <meta property="og:image" content="https://bigbearvans.com/heroSlider/custom_build.webp" />

  {/* ✅ 3. Twitter Card Tags (Added specific Title/Description) */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={finalTitle} />
  <meta name="twitter:description" content={finalDesc} />
  <meta name="twitter:image" content="https://bigbearvans.com/heroSlider/custom_build.webp" />

  {/* ✅ 4. JSON-LD Schema */}
  <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
</Helmet>

      <Navbar />

      <main className="bg-secondary min-h-screen">
        <HeroSection
          title="Journal & Guides"
          description="Insights, tips, and inspiration for your life on the road."
          image={heroImage}
          showButton={false}
        />
{loading ? (
          <div className="py-20"><Loader /></div>
        ) : (
           <div className="max-w-[1300px] mx-auto px-4 lg:px-8 py-16 lg:py-24">

          {/* --- SEARCH BAR --- */}
          <div className="bg-white p-6 rounded-[var(--radius-md)] shadow-sm border border-primary/5 mb-16 max-w-3xl mx-auto">
             <p className="text-[10px] font-black text-primary/40 uppercase tracking-widest mb-3 text-center lg:text-left">Search the Archives</p>
             <div className="flex flex-col sm:flex-row items-center gap-4">
               <div className="relative flex-1 w-full">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 h-5 w-5" />
                 <input
                   type="text"
                   placeholder="Keywords (e.g. Solar, Bathroom...)"
                   className="w-full pl-12 pr-4 py-3 bg-secondary border-none rounded-[var(--radius-md)] focus:ring-2 focus:ring-hover text-primary shadow-inner"
                   value={searchInput}
                   onChange={(e) => setSearchInput(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                 />
               </div>
               <SecondaryButton label="Search" onClick={handleSearch} className="w-full sm:w-auto !py-3 !px-10" />
             </div>
          </div>

          {/* --- BLOG GRID --- */}
          <div className="space-y-12">
            <div className="flex items-center gap-3 border-b border-primary/10 pb-4">
              <BookOpen size={24} className="text-hover" />
              <Heading2 text={searchTerm ? `Results for "${searchTerm}"` : "Latest Articles"} className="!mb-0" />
            </div>

            {blogs.length === 0 ? (
              <div className="text-center py-32 bg-white rounded-[var(--radius-md)] border border-dashed border-primary/10">
                <Search size={48} className="mx-auto text-primary/10 mb-4" />
                <p className="text-primary/40 font-medium">No articles found matching your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--gap-lg)]">
                {blogs.map((blog) => (
                  <article
                    key={blog._id}
                    className="group bg-white rounded-[var(--radius-lg)] border border-primary/5 hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <ImageWithSkeleton
                        src={blog.gallery?.[0]}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex-grow space-y-4">
                        <p className="text-hover font-bold text-[10px] tracking-widest uppercase">Article</p>
                        <Heading3 text={blog.title} className="group-hover:text-hover transition-colors line-clamp-2 !leading-tight" />
                        <RichParagraph className="line-clamp-3 !text-primary/70 !text-sm">
                          {blog.description}
                        </RichParagraph>
                      </div>

                      <div className="mt-8 pt-6 border-t border-secondary">
                        <SecondaryButton
                          label="Read Full Story"
                          link={`/blog-detail/${blog.slug}`}
                          className="w-full text-center"
                        />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* --- PAGINATION --- */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-[var(--gap-xl)] mt-20 pt-12 border-t border-primary/10">
                <SecondaryButton
                  label="Prev"
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="!py-2 !px-8"
                />

                <div className="text-center">
                  <p className="text-[10px] font-black text-primary/30 uppercase tracking-[0.3em] mb-1">Page</p>
                  <p className="text-lg font-bold text-primary font-serif">{currentPage} <span className="text-primary/30 mx-1">/</span> {totalPages}</p>
                </div>

                <SecondaryButton
                  label="Next"
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="!py-2 !px-8"
                />
              </div>
            )}
          </div>
        </div>
        )}

      </main>

      <Footer />
    </>
  );
}