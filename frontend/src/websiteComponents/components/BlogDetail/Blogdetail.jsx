"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  CalendarDays, Clock, Image as ImageIcon, FileText,
  Share2, BookOpen, ThumbsUp, ThumbsDown, ChevronRight
} from "lucide-react";
import { generateBlogSchema } from "../../schema/blogDetail";

// Swiper JS Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Custom Components
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet-async";
import { Heading1,Heading2, Heading4, Heading3, RichParagraph, ImageWithSkeleton, SecondaryButton } from '../Common/Common'

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/test-blog/${slug}`);
        setBlog(res.data.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.description,
          url: window.location.href,
        });
      } catch (err) { console.log('Error sharing:', err); }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) return <Loader />;

  if (!blog) return (
    <div className="min-h-screen bg-secondary flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">📄</div>
        <Heading3 text="Blog post not found" />
        <SecondaryButton label="Back to Blogs" link="/blog" />
      </div>
    </div>
  );

  // Helper functions for formatting
  const formatBoldTags = (text) => {
    if (!text) return text;
    const parts = text.split(/(#[^\s#]+)/g);
    return parts.map((part, i) =>
      part.startsWith("#") ? (
        <strong key={i} className="font-bold text-primary">{part.substring(1)}</strong>
      ) : (
        part
      )
    );
  };

  const formatRichText = (text) => {
    if (!text) return null;
    if (text.includes(":") && (text.includes("\n") || text.split(":").length > 1)) {
      const parts = text.split(":");
      const introText = parts[0];
      const listItems = parts[1]
        .split(/[,\n•]/)
        .map(item => item.trim())
        .filter(item => item.length > 0);

      if (listItems.length > 1) {
        return (
          <>
            <p className="mb-4 text-primary/90 font-medium">{formatBoldTags(introText + ":")}</p>
            <ul className="space-y-3 ml-2">
              {listItems.map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start text-primary/80">
                  <span className="text-hover font-black mt-1.5 w-1.5 h-1.5 rounded-full bg-hover flex-shrink-0" />
                  <span className="leading-relaxed">{formatBoldTags(item)}</span>
                </li>
              ))}
            </ul>
          </>
        );
      }
    }
    return formatBoldTags(text);
  };

  const renderSingleBlock = (block, index) => {
    switch (block.type) {
      case "heading":
        return (
          <div key={index} className="mb-10 mt-16 group">
            <p className="text-hover font-black text-[10px] tracking-[0.4em] uppercase mb-2">Section {index + 1}</p>
            <Heading2 text={formatBoldTags(block.text)} className="!text-left !text-primary" />
            <div className="w-20 h-1 bg-hover mt-4 rounded-full transition-all group-hover:w-32" />
          </div>
        );

      case "subheading":
        return (
          <div key={index} className="mb-6 mt-12">
            <Heading4 text={formatBoldTags(block.text)} className="!text-left !text-primary/90" />
          </div>
        );

      case "paragraph":
        return (
          <div key={index} className="mb-8 p-0 lg:pr-12">
            <RichParagraph className="!text-primary/80 !leading-[1.8] !text-lg">
              {formatRichText(block.text)}
            </RichParagraph>
          </div>
        );

      case "image":
        return (
          <div key={index} className="my-12 w-full">
            <div className="rounded-[var(--radius-lg)] overflow-hidden shadow-2xl border border-primary/5">
              <img src={block.image} alt="Van Life Detail" className="w-full h-auto object-cover" />
            </div>
            {block.caption && <p className="text-center text-sm text-primary/40 mt-4 italic">{block.caption}</p>}
          </div>
        );

      case "proscons":
        return (
          <div key={index} className="my-16 grid grid-cols-1 md:grid-cols-2 gap-0 rounded-[var(--radius-lg)] overflow-hidden shadow-xl border border-primary/5">
            <div className="bg-white p-10 border-b md:border-b-0 md:border-r border-secondary">
              <div className="flex items-center gap-3 mb-6"><ThumbsUp className="text-green-600" size={24} /><Heading4 text="The Benefits" className="!mb-0" /></div>
              <ul className="space-y-4">
                {block.pros?.map((p, idx) => (
                  <li key={idx} className="text-primary/70 text-sm leading-relaxed flex gap-3 italic">
                    <span className="text-green-500 font-bold">+</span> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#FAF9F6] p-10">
              <div className="flex items-center gap-3 mb-6"><ThumbsDown className="text-red-600" size={24} /><Heading4 text="Considerations" className="!mb-0" /></div>
              <ul className="space-y-4">
                {block.cons?.map((c, idx) => (
                  <li key={idx} className="text-primary/70 text-sm leading-relaxed flex gap-3 italic">
                    <span className="text-red-400 font-bold">−</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case "table":
        if (block.rows?.length === 2) {
          const values = block.rows[1];
          return (
            <div key={index} className="my-12 bg-white p-8 rounded-[var(--radius-md)] border-l-4 border-hover shadow-sm">
              <h3 className="font-bold text-primary mb-6 text-lg uppercase tracking-widest">At a Glance</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {values?.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-secondary rounded-[var(--radius-sm)]">
                    <ChevronRight size={14} className="text-hover" />
                    <span className="text-sm font-medium text-primary/80">{formatBoldTags(item)}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        }
        return (
          <div key={index} className="my-12 overflow-x-auto rounded-[var(--radius-md)] border border-primary/10 shadow-lg">
            <table className="w-full text-left">
              <thead className="bg-primary text-white">
                <tr>{block.rows?.[0]?.map((h, idx) => <th key={idx} className="p-5 text-xs uppercase tracking-[0.2em] font-black">{formatBoldTags(h)}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-secondary bg-white">
                {block.rows?.slice(1).map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-secondary/50 transition-colors">
                    {row.map((cell, cIdx) => <td key={cIdx} className="p-5 text-sm text-primary/70 font-medium">{formatBoldTags(cell)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default: return null;
    }
  };

  const renderContent = () => {
    const content = blog.content || [];
    const elements = [];
    for (let i = 0; i < content.length; i++) {
      const block = content[i];

      // Slider Logic for consecutive images
      if (block.type === "image") {
        const sliderImages = [];
        let j = i;
        while (j < content.length && content[j].type === "image") {
          sliderImages.push(content[j]);
          j++;
        }
        if (sliderImages.length > 1) {
          elements.push(
            <div key={`slider-${i}`} className="my-16 group relative">
              <Swiper
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="rounded-[var(--radius-lg)] shadow-2xl overflow-hidden aspect-[16/9]"
              >
                {sliderImages.map((imgBlock, idx) => (
                  <SwiperSlide key={idx}>
                    <img src={imgBlock.image} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          );
          i = j - 1;
          continue;
        }
      }

      // Heading + Image Side by Side
      if (block.type === "heading" && content[i + 1]?.type === "image") {
        const nextBlock = content[i + 1];
        elements.push(
          <div key={i} className="my-20 flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
               <p className="text-hover font-black text-[10px] tracking-[0.4em] uppercase mb-2">Deep Dive</p>
               <Heading2 text={block.text} className="!text-left !text-primary !mb-0" />
            </div>
            <div className="w-full lg:w-1/2 rounded-[var(--radius-lg)] overflow-hidden shadow-xl border border-primary/5">
               <img src={nextBlock.image} alt={block.text} className="w-full h-full object-cover aspect-video" />
            </div>
          </div>
        );
        i++;
        continue;
      }

      elements.push(renderSingleBlock(block, i));
    }
    return elements;
  };
// Component ke andar:
const currentUrl = `https://bigbearvans.com/blog-detail/${slug}`;
// Blog detail ya listing mein ye use karein
const metaDescription = blog.description ||
  (blog.content?.find(b => b.type === 'paragraph')?.text?.substring(0, 160) + "...") ||
  `${blog.title} - Learn more about custom van builds at Big Bear Vans.`;
   const schemaData = generateBlogSchema(blog,currentUrl);
  const heroImage = blog.gallery?.[0] || "/heroSlider/bloghero.webp";

  return (
    <div className="bg-secondary min-h-screen font-serif">
  <Helmet>
  {/* ✅ 1. Standard SEO Meta Tags */}
  <title>{`${blog.title} | Big Bear Vans Journal`}</title>
  <meta name="description" content={metaDescription} />
  <link rel="canonical" href={currentUrl} />

  {/* ✅ 2. Open Graph (Facebook/LinkedIn/WhatsApp) */}
  <meta property="og:title" content={blog.title} />
  <meta property="og:description" content={metaDescription} />
  <meta property="og:image" content={heroImage} />
  <meta property="og:url" content={currentUrl} />
  <meta property="og:type" content="article" />
  {/* Article specific OG tags (Optional but Great for Blogs) */}
  <meta property="article:author" content="Artur & Anna" />
  <meta property="article:publisher" content="https://bigbearvans.com" />

  {/* ✅ 3. Twitter Card Tags (Added specific Title/Description) */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@bigbearvans" />
  <meta name="twitter:title" content={blog.title} />
  <meta name="twitter:description" content={metaDescription} />
  <meta name="twitter:image" content={heroImage} />

  {/* ✅ 4. JSON-LD Schema */}
  <script type="application/ld+json">
    {JSON.stringify(schemaData)}
  </script>
</Helmet>
      <Navbar />

      {/* --- CINEMATIC HERO --- */}
      <section className="relative h-[70vh] lg:h-[90vh] bg-primary overflow-hidden">
        <ImageWithSkeleton src={heroImage} alt={blog.title} className="w-full h-full object-cover opacity-50 scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
        <div className="absolute inset-0 flex items-end pb-20 px-4">
          <div className="max-w-5xl mx-auto w-full text-center">
             <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
                <p className="text-hover font-black text-xs lg:text-sm tracking-[0.5em] uppercase mb-6">Expert Journal</p>
                <Heading1 text={blog.title} className="!text-white !leading-[1.1] !mb-8 drop-shadow-2xl" />
                <div className="flex flex-wrap justify-center gap-8 text-white/60 text-[10px] lg:text-xs uppercase tracking-widest font-sans">
                  <span className="flex items-center gap-2 border-r border-white/20 pr-8"><CalendarDays size={14} className="text-hover" /> {new Date(blog.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span className="flex items-center gap-2 border-r border-white/20 pr-8"><Clock size={14} className="text-hover" /> {Math.ceil((blog.content?.length || 0) * 1.5)} Min Read</span>
                  <span className="flex items-center gap-2"><BookOpen size={14} className="text-hover" /> {blog.content?.length} Insights</span>
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* --- CONTENT LAYOUT --- */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-10 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">

        {/* SIDEBAR LEFT (Quick Navigation/Sharing) */}
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-32 flex flex-col items-center gap-8">
            <div className="w-px h-20 bg-primary/10" />
            <button onClick={handleShare} className="p-4 bg-white rounded-full shadow-sm hover:shadow-xl hover:text-hover transition-all border border-primary/5">
               <Share2 size={20} />
            </button>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] rotate-90 mt-10 whitespace-nowrap text-primary/30">Share Article</p>
          </div>
        </aside>

        {/* MAIN ARTICLE BODY */}
        <main className="lg:col-span-8 bg-white p-8 lg:p-20 rounded-[var(--radius-lg)] shadow-sm border border-primary/5">
          <div className="prose prose-lg max-w-none">
            {renderContent()}
          </div>

          <div className="mt-24 pt-12 border-t border-secondary flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-6">
               <Share2 size={24} className="text-hover" />
            </div>
            <Heading3 text="Found this helpful?" className="!mb-2" />
            <p className="text-primary/50 text-sm mb-8 font-sans">Spread the knowledge with your fellow van-lifers.</p>
            <button
              onClick={handleShare}
              className="bg-primary text-white px-12 py-4 rounded-[var(--radius-md)] hover:bg-hover transition-all shadow-lg font-black uppercase text-[10px] tracking-widest"
            >
              Share This Article
            </button>
          </div>
        </main>

        {/* RIGHT SIDEBAR (Gallery & Stats) */}
        <aside className="lg:col-span-3 space-y-10">
          <div className="sticky top-32 space-y-10">
            {/* Media Box */}
            {blog.gallery?.length > 0 && (
              <div className="bg-white p-6 rounded-[var(--radius-md)] shadow-sm border border-primary/5">
                <div className="flex items-center gap-2 mb-6 border-b border-secondary pb-4">
                  <ImageIcon size={16} className="text-hover"/>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary">Visual Gallery</p>
                </div>
                <div className="rounded-[var(--radius-sm)] overflow-hidden aspect-square mb-4 border border-secondary">
                  <img src={blog.gallery[currentGalleryImage]} className="w-full h-full object-cover transition-all duration-500" alt="Active gallery" />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {blog.gallery.slice(0, 8).map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentGalleryImage(idx)}
                      className={`aspect-square rounded-[var(--radius-sm)] overflow-hidden border-2 transition-all ${currentGalleryImage === idx ? 'border-hover scale-90' : 'border-transparent opacity-40 hover:opacity-100'}`}
                    >
                      <img src={img} className="w-full h-full object-cover" alt="thumb" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stats Box */}
            <div className="bg-primary text-white p-8 rounded-[var(--radius-md)] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-10 -mr-4 -mt-4"><FileText size={100} /></div>
              <p className="text-hover font-black text-[10px] tracking-widest uppercase mb-6">Article Summary</p>
              <div className="space-y-5 relative z-10">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="text-white/50 text-[10px] uppercase tracking-wider">Depth</span>
                  <span className="font-bold text-sm">{blog.content?.length} Sections</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="text-white/50 text-[10px] uppercase tracking-wider">Media</span>
                  <span className="font-bold text-sm">{blog.content?.filter(b => b.type === 'image').length} Photos</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/50 text-[10px] uppercase tracking-wider">Topic</span>
                  <span className="font-bold text-sm truncate ml-4">Van Conversion</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}