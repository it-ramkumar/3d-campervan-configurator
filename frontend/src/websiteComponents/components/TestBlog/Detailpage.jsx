import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Detailpage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/test-blog/${id}`);
        setBlog(res.data.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading blog...</p>;
  if (!blog) return <p className="text-center text-red-500">Blog not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">{blog.title}</h1>

      {blog.content?.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={index} className="text-gray-700 leading-relaxed mb-4">
                {block.text}
              </p>
            );

          case "heading":
            return (
              <h2 key={index} className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
                {block.text}
              </h2>
            );

          case "image":
            return (
              <div key={index} className="my-6 flex justify-center">
                {block.image ? (
                  <img
                    src={block.image}
                    alt="Blog visual"
                    className="rounded-xl shadow-md w-full max-w-2xl object-cover"
                  />
                ) : (
                  <div className="text-gray-500 italic">[Image not available]</div>
                )}
              </div>
            );

          case "proscons":
            return (
              <div key={index} className="my-6 grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 p-4 rounded-xl shadow-sm">
                  <h3 className="font-semibold text-green-700 mb-2">Pros</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {block.pros.length > 0 ? (
                      block.pros.map((p, i) => <li key={i}>{p}</li>)
                    ) : (
                      <li className="italic text-gray-500">No pros available</li>
                    )}
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 p-4 rounded-xl shadow-sm">
                  <h3 className="font-semibold text-red-700 mb-2">Cons</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {block.cons.length > 0 ? (
                      block.cons.map((c, i) => <li key={i}>{c}</li>)
                    ) : (
                      <li className="italic text-gray-500">No cons available</li>
                    )}
                  </ul>
                </div>
              </div>
            );

          // ✅ TABLE SUPPORT
          case "table":
            return (
              <div key={index} className="overflow-x-auto my-6">
                <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
                  <tbody>
                    {block.rows?.map((row, rIndex) => (
                      <tr
                        key={rIndex}
                        className={rIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        {row.map((cell, cIndex) => (
                          <td
                            key={cIndex}
                            className="border border-gray-200 px-4 py-2 text-gray-700"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          // ✅ QUOTE SUPPORT
          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-6"
              >
                “{block.text}”
              </blockquote>
            );

          // ✅ LIST SUPPORT
          case "list":
            return (
              <ul key={index} className="list-disc list-inside my-4 text-gray-700 space-y-1">
                {block.items?.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            );

          default:
            return (
              <div key={index} className="bg-yellow-50 p-4 my-4 rounded-lg text-sm text-gray-600">
                ⚠️ Unknown block type: <code>{block.type}</code>
              </div>
            );
        }
      })}
    </div>
  );
}
