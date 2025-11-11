import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { motion } from "framer-motion";
import { CalendarDays, Clock, Image as ImageIcon, FileText, Heading, Table, ThumbsUp, ThumbsDown, Share2, Eye, BookOpen } from "lucide-react";
import ImageWithSkeleton from "../Common/ImageWithSkeleton/ImageWithSkeleton";


export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/test-blog/${id}`);
        setBlog(res.data.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Add toast notification here if needed
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900 mx-auto mb-4"
        ></motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-600"
        >
          Loading blog post...
        </motion.p>
      </div>
    </div>
  );

  if (!blog) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-6xl mb-4">📄</div>
        <p className="text-2xl font-semibold text-gray-900 mb-2">Blog not found</p>
        <p className="text-gray-600">The blog you're looking for doesn't exist or has been moved.</p>
      </motion.div>
    </div>
  );

  const heroImage = blog.gallery?.[0] || "https://via.placeholder.com/1200x600?text=Blog+Image";

  // Calculate content statistics
  const contentStats = {
    paragraphs: blog.content?.filter(block => block.type === "paragraph").length || 0,
    headings: blog.content?.filter(block => block.type === "heading").length || 0,
    images: blog.content?.filter(block => block.type === "image").length || 0,
    tables: blog.content?.filter(block => block.type === "table").length || 0,
    proscons: blog.content?.filter(block => block.type === "proscons").length || 0,
  };

  const renderContentBlock = (block, index) => {
    // Skip blocks that are already handled in combined layouts
    if (index > 0 && (
      (block.type === "paragraph" && blog.content[index - 1]?.type === "heading") ||
      (block.type === "image" && blog.content[index - 1]?.type === "heading")
    )) {
      return null;
    }

    // Combined heading + paragraph layout
    if (block.type === "heading" && blog.content[index + 1]?.type === "paragraph") {
      const nextBlock = blog.content[index + 1];
      return (
        <motion.section
          key={index}
          className="mb-8 lg:mb-16 last:mb-0 group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <div className="flex items-start gap-3 lg:gap-4 group-hover:translate-x-2 transition-transform duration-300">
                  <div className="flex-shrink-0 w-1 bg-gradient-to-b from-black to-gray-800 h-16 lg:h-20 rounded-full"></div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {block.text}
                  </h2>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl lg:rounded-2xl p-6 lg:p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                <p className="text-gray-700 leading-relaxed text-base lg:text-lg font-light">
                  {nextBlock.text}
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      );
    }

    // Combined heading + image layout
    if (block.type === "heading" && blog.content[index + 1]?.type === "image") {
      const nextBlock = blog.content[index + 1];
      return (
        <motion.section
          key={index}
          className="mb-8 lg:mb-16 last:mb-0 group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="bg-white rounded-xl lg:rounded-2xl p-6 lg:p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex flex-col xl:grid xl:grid-cols-2 gap-6 lg:gap-8 items-center">
              <div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {block.text}
                </h2>
              </div>
              <div className="relative w-full group">
                <div className="bg-white rounded-lg lg:rounded-xl p-3 lg:p-4 shadow-lg border border-gray-300 transform group-hover:scale-[1.02] transition-transform duration-300">
                  {nextBlock.image ? (
                    <ImageWithSkeleton

                      src={nextBlock.image}
                      alt={block.text}
                      className=" w-full h-48 lg:h-64 object-cover"
                    />
                  ) : (
                    <div className="bg-gray-200 rounded-lg w-full h-48 lg:h-64 flex items-center justify-center text-gray-500">
                      <ImageIcon className="w-6 h-6 lg:w-8 lg:h-8 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      );
    }

    // Individual content blocks
    switch (block.type) {
      case "paragraph":
        return (
          <motion.div
            key={index}
            className="mb-6 lg:mb-8 last:mb-0 group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl lg:rounded-2xl p-6 lg:p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
              <p className="text-gray-700 leading-relaxed text-base lg:text-lg font-light">
                {block.text}
              </p>
            </div>
          </motion.div>
        );

      case "heading":
        return (
          <motion.div
            key={index}
            className="mb-8 lg:mb-12 mt-12 lg:mt-16 first:mt-0 group"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 lg:gap-4 group-hover:translate-x-2 transition-transform duration-300">
              <div className="flex-shrink-0 w-1.5 lg:w-2 h-12 lg:h-16 bg-gradient-to-b from-black to-gray-800 rounded-full"></div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {block.text}
              </h2>
            </div>
          </motion.div>
        );

      case "image":
        return (
          <motion.div
            key={index}
            className="my-8 lg:my-12 group"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
              {block.image ? (
                <ImageWithSkeleton

                  src={block.image}
                  alt="Blog visual"
                  className=" w-full max-w-4xl mx-auto object-cover "
                />
              ) : (
                <div className="text-gray-500 text-center py-12 lg:py-20 bg-gray-100 rounded-lg lg:rounded-xl">
                  <ImageIcon className="w-8 h-8 lg:w-12 lg:h-12 text-gray-400 mx-auto mb-4" />
                  <p>Image not available</p>
                </div>
              )}
            </div>
          </motion.div>
        );

      case "proscons":
        return (
          <motion.div
            key={index}
            className="my-8 lg:my-16 group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl lg:rounded-2xl p-6 lg:p-8 text-white shadow-xl">
              <div className="text-center mb-6 lg:mb-10">
                <h3 className="text-xl lg:text-2xl font-bold mb-4">Advantages & Disadvantages</h3>
                <div className="w-20 lg:w-24 h-1 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full mx-auto"></div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
                <div className="bg-gray-800 rounded-lg lg:rounded-xl p-4 lg:p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300">
                  <div className="flex items-center mb-4 lg:mb-6">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-3 lg:mr-4 shadow-lg">
                      <ThumbsUp className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-white text-lg lg:text-xl">Pros</h4>
                  </div>
                  <ul className="space-y-3 lg:space-y-4">
                    {block.pros?.length > 0 ? (
                      block.pros.map((p, i) => (
                        <li key={i} className="flex items-start text-sm lg:text-base leading-relaxed group/item">
                          <span className="text-green-400 mr-2 lg:mr-3 mt-1 group-hover/item:scale-110 transition-transform">•</span>
                          <span className="text-gray-200 flex-1 group-hover/item:text-white transition-colors">{p}</span>
                        </li>
                      ))
                    ) : (
                      <li className="italic text-gray-400 text-center py-3 lg:py-4">No pros available</li>
                    )}
                  </ul>
                </div>

                <div className="bg-gray-800 rounded-lg lg:rounded-xl p-4 lg:p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300">
                  <div className="flex items-center mb-4 lg:mb-6">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mr-3 lg:mr-4 shadow-lg">
                      <ThumbsDown className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-white text-lg lg:text-xl">Cons</h4>
                  </div>
                  <ul className="space-y-3 lg:space-y-4">
                    {block.cons?.length > 0 ? (
                      block.cons.map((c, i) => (
                        <li key={i} className="flex items-start text-sm lg:text-base leading-relaxed group/item">
                          <span className="text-red-400 mr-2 lg:mr-3 mt-1 group-hover/item:scale-110 transition-transform">•</span>
                          <span className="text-gray-200 flex-1 group-hover/item:text-white transition-colors">{c}</span>
                        </li>
                      ))
                    ) : (
                      <li className="italic text-gray-400 text-center py-3 lg:py-4">No cons available</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case "table":
        return (
          <motion.div
            key={index}
            className="my-8 lg:my-16 group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="overflow-x-auto rounded-lg lg:rounded-xl">
                <table className="min-w-full divide-y divide-gray-300 rounded-lg lg:rounded-xl overflow-hidden text-sm lg:text-base">
                  <thead>
                    {block.rows?.[0] && (
                      <tr className="bg-gradient-to-r from-gray-900 to-black">
                        {block.rows[0].map((header, hIndex) => (
                          <th
                            key={hIndex}
                            className="px-3 lg:px-6 py-3 lg:py-4 text-white font-bold text-sm lg:text-base text-left uppercase tracking-wider border-r border-gray-700 last:border-r-0"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    )}
                  </thead>
                  <tbody className="divide-y divide-gray-300 bg-white">
                    {block.rows?.slice(1).map((row, rIndex) => (
                      <tr
                        key={rIndex}
                        className={rIndex % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50 hover:bg-gray-100"}
                      >
                        {row.map((cell, cIndex) => (
                          <td
                            key={cIndex}
                            className="px-3 lg:px-6 py-3 lg:py-4 text-gray-700 whitespace-normal text-sm lg:text-base leading-relaxed border-l border-gray-200 first:border-l-0"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        );

      default:
        if (block.text && block.text.trim()) {
          return (
            <motion.div
              key={index}
              className="my-6 lg:my-8 bg-gradient-to-br from-white to-gray-50 p-6 lg:p-8 rounded-xl lg:rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-700 leading-relaxed text-base lg:text-lg font-light">
                {block.text}
              </p>
            </motion.div>
          );
        }
        return null;
    }
  };

  return (
    <>
      <Navbar />

      {/* HERO SECTION - MOBILE OPTIMIZED */}
      <section className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithSkeleton

            src={heroImage}
            alt={blog.title}
            className="w-full h-full object-cover"
            click={true}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/60 lg:from-black/40 lg:via-black/20 lg:to-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 lg:from-black/30 lg:via-transparent lg:to-black/20"></div>
        </div>

        <div className="relative z-20 min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-20">
            <motion.div
              className="max-w-4xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6 lg:mb-8 group hover:bg-white/30 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                <span className="text-white text-xs lg:text-sm font-semibold uppercase tracking-wider">
                  Featured Article
                </span>
              </motion.div>

              <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 lg:mb-6 leading-tight bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                {blog.title}
              </motion.h1>

              <motion.p
                className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed mb-6 lg:mb-8 max-w-3xl font-light backdrop-blur-sm bg-white/10 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {blog.description}
              </motion.p>

              {/* METADATA - MOBILE OPTIMIZED */}
              <motion.div
                className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6 mb-6 lg:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <div className="flex items-center gap-3 text-gray-200">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white/10 rounded-lg lg:rounded-xl flex items-center justify-center border border-white/20 backdrop-blur-sm">
                    <CalendarDays className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm lg:text-base">
                      {new Date(blog.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:block h-6 lg:h-8 w-px bg-white/30"></div>
                <div className="sm:hidden w-full h-px bg-white/20 my-2"></div>

                <div className="flex items-center gap-3 text-gray-200">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white/10 rounded-lg lg:rounded-xl flex items-center justify-center border border-white/20 backdrop-blur-sm">
                    <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm lg:text-base">
                      {Math.ceil((blog.content?.reduce((total, block) => total + (block.text?.length || 0), 0) || 0) / 200)} min read
                    </p>
                  </div>
                </div>

                <div className="hidden sm:block h-6 lg:h-8 w-px bg-white/30"></div>
                <div className="sm:hidden w-full h-px bg-white/20 my-2"></div>

                <div className="flex items-center gap-3 text-gray-200">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white/10 rounded-lg lg:rounded-xl flex items-center justify-center border border-white/20 backdrop-blur-sm">
                    <BookOpen className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm lg:text-base">
                      {blog.content?.length || 0} sections
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="flex flex-col items-center text-white">
            <span className="text-xs lg:text-sm font-medium mb-2 tracking-wide backdrop-blur-sm bg-black/20 px-3 lg:px-4 py-1 lg:py-2 rounded-full">SCROLL TO EXPLORE</span>
            <div className="w-px h-12 lg:h-16 bg-gradient-to-b from-white/80 to-transparent rounded-full">
              <motion.div
                className="w-px h-6 lg:h-8 bg-white rounded-full"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* MAIN CONTENT - MOBILE OPTIMIZED */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* CONTENT AREA */}
          <div className="lg:col-span-3">
            <div className="max-w-4xl mx-auto">
              {/* Content Stats */}
              <motion.div
                className="flex items-center justify-center py-6 lg:py-8 mb-12 lg:mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl lg:rounded-2xl p-6 lg:p-8 border border-gray-200 shadow-sm w-full">
                  <div className="flex items-center justify-around text-sm text-gray-600">
                    <div className="text-center">
                      <div className="text-2xl lg:text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{blog.content?.length || 0}</div>
                      <div className="text-gray-500 uppercase tracking-wide text-xs mt-1 lg:mt-2">Sections</div>
                    </div>
                    <div className="w-px h-8 lg:h-12 bg-gray-300"></div>
                    <div className="text-center">
                      <div className="text-2xl lg:text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{contentStats.images}</div>
                      <div className="text-gray-500 uppercase tracking-wide text-xs mt-1 lg:mt-2">Visuals</div>
                    </div>
                    <div className="w-px h-8 lg:h-12 bg-gray-300"></div>
                    <div className="text-center">
                      <div className="text-2xl lg:text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{Math.ceil((blog.content?.reduce((total, block) => total + (block.text?.length || 0), 0) || 0) / 200)}</div>
                      <div className="text-gray-500 uppercase tracking-wide text-xs mt-1 lg:mt-2">Min Read</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Content Blocks */}
              {blog.content?.map((block, index) => renderContentBlock(block, index))}

              {/* Article Footer */}
              <motion.div
                className="mt-12 lg:mt-16 pt-6 lg:pt-8 border-t border-gray-200"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-3 bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group w-full sm:w-auto justify-center"
                  >
                    <Share2 className="w-4 h-4 lg:w-5 lg:h-5 group-hover:rotate-12 transition-transform" />
                    <span className="font-semibold text-sm lg:text-base">Share This Article</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* SIDEBAR - MOBILE OPTIMIZED */}
          <div className="lg:col-span-1">
            <div className="space-y-6 lg:space-y-8 lg:sticky lg:top-8">

              {/* GALLERY */}
              {blog.gallery && blog.gallery.length > 0 && (
                <motion.div
                  className="bg-gradient-to-br from-white to-gray-50 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-4 lg:mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-gray-900 to-black rounded-lg lg:rounded-xl flex items-center justify-center shadow-lg">
                      <ImageIcon className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Image Gallery</span>
                  </h3>

                  <div className="mb-4">
                    <div className="bg-white rounded-lg lg:rounded-xl shadow-sm overflow-hidden mb-3 lg:mb-4 border border-gray-300 transform hover:scale-[1.02] transition-transform duration-300">
                      <ImageWithSkeleton

                        src={blog.gallery[currentGalleryImage]}
                        alt={`Gallery ${currentGalleryImage + 1}`}
                        className="w-full h-32 lg:h-48 object-cover"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {blog.gallery.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentGalleryImage(index)}
                          className={`rounded-lg overflow-hidden border-2 transition-all duration-300 transform hover:scale-105 ${
                            currentGalleryImage === index
                              ? "border-gray-900 shadow-md bg-gray-100 scale-105"
                              : "border-gray-300 hover:border-gray-600"
                          }`}
                        >
                          <ImageWithSkeleton

                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-12 lg:h-16 object-cover"
                        click={true}

                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ARTICLE DETAILS */}
              <motion.div
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-4 lg:mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-gray-900 to-black rounded-lg lg:rounded-xl flex items-center justify-center shadow-lg">
                    <FileText className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Article Details</span>
                </h3>
                <div className="space-y-3 lg:space-y-4">
                  {[
                    { label: "Published Date", value: new Date(blog.createdAt).toLocaleDateString() },
                    { label: "Content Sections", value: blog.content?.length || 0 },
                    { label: "Gallery Images", value: blog.gallery?.length || 0 },
                    { label: "Reading Time", value: `${Math.ceil((blog.content?.reduce((total, block) => total + (block.text?.length || 0), 0) || 0) / 200)} min` },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 lg:py-3 border-b border-gray-300 last:border-b-0 group hover:bg-white rounded-lg px-2 transition-colors">
                      <span className="font-semibold text-gray-700 text-xs lg:text-sm group-hover:text-gray-900">{item.label}</span>
                      <span className="text-gray-900 text-xs lg:text-sm font-bold bg-gray-100 px-2 lg:px-3 py-1 rounded-lg group-hover:bg-gray-200 transition-colors">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* CONTENT ANALYTICS */}
              <motion.div
                className="bg-gradient-to-br from-gray-900 to-black rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h3 className="text-base lg:text-lg font-bold mb-4 lg:mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-white to-gray-200 rounded-lg lg:rounded-xl flex items-center justify-center shadow-lg">
                    <Eye className="w-4 h-4 lg:w-5 lg:h-5 text-gray-900" />
                  </div>
                  <span>Content Analytics</span>
                </h3>
                <div className="space-y-3 lg:space-y-4">
                  {[
                    { icon: FileText, label: "Paragraphs", value: contentStats.paragraphs },
                    { icon: Heading, label: "Headings", value: contentStats.headings },
                    { icon: ImageIcon, label: "Images", value: contentStats.images },
                    { icon: Table, label: "Tables", value: contentStats.tables },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-1 lg:py-2 group hover:bg-gray-800 rounded-lg px-2 transition-colors">
                      <div className="flex items-center gap-2 lg:gap-3">
                        <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                          <item.icon className="w-3 h-3 lg:w-4 lg:h-4 text-gray-400" />
                        </div>
                        <span className="text-gray-300 text-xs lg:text-sm group-hover:text-white">{item.label}</span>
                      </div>
                      <span className="font-bold text-white bg-gray-800 px-1 lg:px-2 py-1 rounded-md group-hover:bg-gray-700 text-xs lg:text-sm">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}