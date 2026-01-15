import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  CalendarDays, Clock, Image as ImageIcon, FileText,
  Share2, BookOpen, ThumbsUp, ThumbsDown
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
import ImageWithSkeleton from "../Common/ImageWithSkeleton/ImageWithSkeleton";
import Loader from "../Loader/Loader";
import Heading1 from "../Common/Headings/Heading1";
import Heading3 from "../Common/Headings/Heading3";
import RichParagraph from "../Common/Paragraph/RichParagraph";

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
    }
  };

  if (loading) return <Loader />;

  if (!blog) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
        <div className="text-6xl mb-4">📄</div>
        <p className="text-2xl font-semibold text-gray-900">Blog not found</p>
      </motion.div>
    </div>
  );

  const heroImage = blog.gallery?.[0] || "https://via.placeholder.com/1200x600?text=Blog+Image";

  const renderContent = () => {
    const content = blog.content || [];
    const elements = [];

    for (let i = 0; i < content.length; i++) {
      const block = content[i];

      // --- LOGIC: CONSECUTIVE IMAGES -> SLIDER ---
      if (block.type === "image") {
        const sliderImages = [];
        let j = i;
        while (j < content.length && content[j].type === "image") {
          sliderImages.push(content[j]);
          j++;
        }

        if (sliderImages.length > 1) {
          elements.push(
            <div key={`slider-${i}`} className="my-10 w-full group">
              <Swiper
                spaceBetween={20}
                centeredSlides={true}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                pagination={{ clickable: true, dynamicBullets: true }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                style={{ height: '500px', backgroundColor: '#f8fafc' }}
              >
                {sliderImages.map((imgBlock, idx) => (
                  <SwiperSlide key={idx} className="flex items-center justify-center bg-[#f8fafc]">
                    <img
                      src={imgBlock.image}
                      alt={`Slide ${idx}`}
                      className="max-w-full max-h-full w-auto h-auto object-contain mx-auto transition-transform duration-500 hover:scale-[1.02]"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          );
          i = j - 1;
          continue;
        }
      }

      // --- LOGIC: HEADING + IMAGE SIDE BY SIDE ---
      if (block.type === "heading" && content[i + 1]?.type === "image") {
        const nextBlock = content[i + 1];
        elements.push(
          <motion.section key={i} className="mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="order-2 lg:order-1">
                <Heading3 text={block.text} textColor="text-black" />
              </div>
              <div className="order-1 lg:order-2 w-full bg-[#f8fafc] rounded-xl overflow-hidden flex items-center justify-center border border-gray-200" style={{ height: '350px' }}>
                <img
                  src={nextBlock.image}
                  alt={block.text}
                  className="max-w-full max-h-full w-auto h-auto object-contain p-2"
                />
              </div>
            </div>
          </motion.section>
        );
        i++;
        continue;
      }

      // --- LOGIC: INDIVIDUAL BLOCKS ---
      elements.push(renderSingleBlock(block, i));
    }
    return elements;
  };

  const renderSingleBlock = (block, index) => {
    switch (block.type) {
      case "heading":
        return (
          <div key={index} className="mb-8 mt-12 flex items-center gap-4">
            <div className="w-1.5 h-12 bg-black rounded-full" />
            <Heading3 text={block.text} textColor="text-black" />
          </div>
        );
      case "paragraph":
        return (
          <div key={index} className="mb-6 p-6 lg:p-8 bg-[#f8fafc] rounded-2xl border border-gray-100 shadow-sm">
            <RichParagraph>{block.text}</RichParagraph>
          </div>
        );
      case "image":
        return (
          <div key={index} className="my-10 w-full flex flex-col items-center">
            <div className="w-full bg-[#f8fafc] rounded-2xl border border-gray-200 overflow-hidden flex items-center justify-center p-4 shadow-sm"
                 style={{ minHeight: '300px', maxHeight: '600px' }}>
              <img
                src={block.image}
                alt="Blog visual"
                className="max-w-full max-h-[550px] w-auto h-auto object-contain"
              />
            </div>
          </div>
        );
      case "proscons":
        return (
          <div key={index} className="my-12 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-900 p-8 rounded-3xl shadow-2xl text-white">
             <div className="space-y-4 border-b md:border-b-0 md:border-r border-gray-700 pb-6 md:pb-0 md:pr-6">
                <div className="flex items-center gap-3"><ThumbsUp className="text-green-500" /><Heading3 text="Pros"/></div>
                {block.pros?.map((p, idx) => <p key={idx} className="text-gray-300 text-sm leading-relaxed flex gap-2"><span className="text-green-500">•</span> {p}</p>)}
             </div>
             <div className="space-y-4 md:pl-6">
                <div className="flex items-center gap-3"><ThumbsDown className="text-red-500" /><Heading3 text="Cons"/></div>
                {block.cons?.map((c, idx) => <p key={idx} className="text-gray-300 text-sm leading-relaxed flex gap-2"><span className="text-red-500">•</span> {c}</p>)}
             </div>
          </div>
        );
      case "table":
        return (
          <div key={index} className="my-10 overflow-x-auto rounded-xl border border-gray-200 shadow-md">
            <table className="w-full text-left text-sm lg:text-base">
              <thead className="bg-black text-white">
                <tr>{block.rows?.[0]?.map((h, idx) => <th key={idx} className="p-4 uppercase tracking-wider">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {block.rows?.slice(1).map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-gray-50 transition-colors">
                    {row.map((cell, cIdx) => <td key={cIdx} className="p-4 text-gray-700">{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default: return null;
    }
  };
// SEO Data
  const schemaData = generateBlogSchema(blog);
  const pageTitle = `${blog.title} | Big Bear Vans Blog`;
  const pageDescription = blog.description || `Read about ${blog.title} on Big Bear Vans. Insights and tips for your campervan journey.`;
  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* Standard Meta Tags */}
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
          <link rel="canonical" href={window.location.href} />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="article" />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={pageDescription} />
          <meta property="og:image" content={blog.gallery?.[0]} />
          <meta property="og:url" content={window.location.href} />
          <meta property="og:site_name" content="Big Bear Vans" />

          {/* Twitter Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={pageTitle} />
          <meta name="twitter:description" content={pageDescription} />
          <meta name="twitter:image" content={blog.gallery?.[0]} />

          {/* JSON-LD Structured Data */}
          <script type="application/ld+json">
            {JSON.stringify(schemaData)}
          </script>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[65vh] lg:h-[85vh] bg-black overflow-hidden">
        <ImageWithSkeleton src={heroImage} alt={blog.title} className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
              <Heading1 text={blog.title} />
              <div className="mt-6 flex flex-wrap justify-center gap-6 text-white/80 text-sm">
                <span className="flex items-center gap-2"><CalendarDays size={16} /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                <span className="flex items-center gap-2"><Clock size={16} /> {Math.ceil((blog.content?.length || 0) * 1.5)} min read</span>
                <span className="flex items-center gap-2"><BookOpen size={16} /> {blog.content?.length} Sections</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-4 gap-12">

        {/* Main Content Area */}
        <main className="lg:col-span-3 bg-white p-6 lg:p-10 rounded-3xl shadow-sm border border-gray-100">
          {renderContent()}

          <div className="mt-16 border-t border-gray-100 pt-10 flex flex-col items-center">
            <p className="text-gray-500 mb-4 font-medium">Enjoyed the article? Share it with others!</p>
            <button
              onClick={handleShare}
              className="flex items-center gap-3 bg-black text-white px-10 py-4 rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              <Share2 size={20} /> <span className="font-bold">Share This Article</span>
            </button>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-8">
          <div className="sticky top-24 space-y-8">
            {/* Gallery Mini-Widget */}
            {blog.gallery?.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><ImageIcon size={18} className="text-blue-500"/> Media Gallery</h3>
                <div className="rounded-xl overflow-hidden mb-4 bg-gray-100 border border-gray-200" style={{ height: '200px' }}>
                  <img
                    src={blog.gallery[currentGalleryImage]}
                    className="w-full h-full object-contain p-1"
                    alt="Gallery Preview"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {blog.gallery.slice(0, 6).map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentGalleryImage(idx)}
                      className={`h-16 rounded-lg overflow-hidden border-2 transition-all ${currentGalleryImage === idx ? 'border-black scale-95' : 'border-transparent opacity-70 hover:opacity-100'}`}
                    >
                      <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Stats Sidebar */}
            <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl">
              <h3 className="font-bold mb-4 flex items-center gap-2 border-b border-gray-700 pb-2"><FileText size={18}/> Quick Info</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm"><span className="text-gray-400">Total Sections</span><span className="font-bold">{blog.content?.length}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-400">Images Included</span><span className="font-bold">{blog.content?.filter(b => b.type === 'image').length}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-400">Published</span><span className="font-bold">{new Date(blog.createdAt).toLocaleDateString()}</span></div>
              </div>
            </div>
          </div>
        </aside>
      </div>
      <Footer />
    </div>
  );
}