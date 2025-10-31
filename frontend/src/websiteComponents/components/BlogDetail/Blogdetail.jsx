import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (!blog) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500 text-xl">Blog not found.</p>
    </div>
  );

  // Hero image - gallery ki first image ya fallback
  const heroImage = blog.gallery?.[0] || "https://via.placeholder.com/1200x600?text=Blog+Image";

  return (
    <>
      <Navbar />

      {/* 🔥 HERO SECTION */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <img loading="lazy"
          src={heroImage}
          alt={blog.title}
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              {blog.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto drop-shadow">
              {blog.description}
            </p>
          </div>
        </div>
      </section>

      {/* 📱 MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* 📖 CONTENT AREA - 3/4 width */}
          <div className="lg:col-span-3 space-y-12">
            {blog.content?.map((block, index) => {

              // 🎯 HEADING + PARAGRAPH COMBINATION
              if (block.type === "heading" && blog.content[index + 1]?.type === "paragraph") {
                const nextBlock = blog.content[index + 1];
                return (
                  <section key={index} className="grid md:grid-cols-2 gap-8 items-start">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        {block.text}
                      </h2>
                    </div>
                    <div>
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {nextBlock.text}
                      </p>
                    </div>
                  </section>
                );
              }

              // 🎯 HEADING + IMAGE COMBINATION
              if (block.type === "heading" && blog.content[index + 1]?.type === "image") {
                const nextBlock = blog.content[index + 1];
                return (
                  <section key={index} className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="order-2 md:order-1">
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        {block.text}
                      </h2>
                    </div>
                    <div className="order-1 md:order-2">
                      {nextBlock.image ? (
                        <img loading="lazy"
                          src={nextBlock.image}
                          alt={block.text}
                          className="rounded-2xl shadow-xl w-full h-64 object-cover"
                        />
                      ) : (
                        <div className="bg-gray-200 rounded-2xl w-full h-64 flex items-center justify-center text-gray-500">
                          Image not available
                        </div>
                      )}
                    </div>
                  </section>
                );
              }

              // 🎯 SKIP IF ALREADY RENDERED IN COMBINATION
              if (index > 0 && (
                (block.type === "paragraph" && blog.content[index - 1]?.type === "heading") ||
                (block.type === "image" && blog.content[index - 1]?.type === "heading")
              )) {
                return null;
              }

              // 🎯 INDIVIDUAL BLOCKS
              switch (block.type) {
                case "paragraph":
                  return (
                    <p key={index} className="text-gray-700 leading-relaxed text-lg">
                      {block.text}
                    </p>
                  );

                case "heading":
                  return (
                    <h2 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-4">
                      {block.text}
                    </h2>
                  );

                case "image":
                  return (
                    <div key={index} className="my-8">
                      {block.image ? (
                        <img loading="lazy"
                          src={block.image}
                          alt="Blog visual"
                          className="rounded-2xl shadow-xl w-full max-w-2xl mx-auto object-cover"
                        />
                      ) : (
                        <div className="text-gray-500 italic text-center py-8 bg-gray-100 rounded-xl">
                          [Image not available]
                        </div>
                      )}
                    </div>
                  );

                case "proscons":
                  return (
                    <div key={index} className="my-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-sm">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* PROS */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
                          <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white font-bold">✓</span>
                            </div>
                            <h3 className="font-bold text-green-700 text-xl">Pros</h3>
                          </div>
                          <ul className="space-y-3">
                            {block.pros.length > 0 ? (
                              block.pros.map((p, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-green-500 mr-2 mt-1">•</span>
                                  <span className="text-gray-700">{p}</span>
                                </li>
                              ))
                            ) : (
                              <li className="italic text-gray-500">No pros available</li>
                            )}
                          </ul>
                        </div>

                        {/* CONS */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
                          <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white font-bold">✕</span>
                            </div>
                            <h3 className="font-bold text-red-700 text-xl">Cons</h3>
                          </div>
                          <ul className="space-y-3">
                            {block.cons.length > 0 ? (
                              block.cons.map((c, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-red-500 mr-2 mt-1">•</span>
                                  <span className="text-gray-700">{c}</span>
                                </li>
                              ))
                            ) : (
                              <li className="italic text-gray-500">No cons available</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );

                case "table":
                  return (
                    <div key={index} className="my-8 bg-white rounded-2xl shadow-sm overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <tbody className="divide-y divide-gray-200">
                            {block.rows?.map((row, rIndex) => (
                              <tr
                                key={rIndex}
                                className={rIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}
                              >
                                {row.map((cell, cIndex) => (
                                  <td
                                    key={cIndex}
                                    className="px-6 py-4 text-gray-700 whitespace-normal"
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
                  );

                default:
                  return (
                    <div key={index} className="bg-yellow-50 p-6 rounded-xl my-6 border border-yellow-200">
                      <div className="flex items-center">
                        <span className="text-yellow-600 mr-2">⚠️</span>
                        <span className="text-gray-600">
                          Unknown block type: <code className="bg-yellow-100 px-2 py-1 rounded">{block.type}</code>
                        </span>
                      </div>
                    </div>
                  );
              }
            })}
          </div>

          {/* 📸 SIDEBAR - GALLERY - 1/4 width */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Gallery</h3>

              {/* MAIN GALLERY IMAGE */}
              {blog.gallery && blog.gallery.length > 0 && (
                <div className="mb-4">
                  <img loading="lazy"
                    src={blog.gallery[currentGalleryImage]}
                    alt={`Gallery ${currentGalleryImage + 1}`}
                    className="w-full h-48 object-cover rounded-xl shadow-md mb-3"
                  />

                  {/* GALLERY THUMBNAILS */}
                  <div className="grid grid-cols-3 gap-2">
                    {blog.gallery.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentGalleryImage(index)}
                        className={`rounded-lg overflow-hidden border-2 ${
                          currentGalleryImage === index
                            ? "border-blue-500"
                            : "border-transparent"
                        }`}
                      >
                        <img loading="lazy"
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-16 object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* BLOG META INFO */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center text-gray-600 mb-2">
                  <span className="font-medium mr-2">Published:</span>
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="text-gray-600">
                  <span className="font-medium mr-2">Content Blocks:</span>
                  <span>{blog.content?.length || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}