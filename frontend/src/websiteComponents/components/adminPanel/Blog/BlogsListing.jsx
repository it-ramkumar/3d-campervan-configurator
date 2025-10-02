import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../../../../api/blog/getAllBlogs";
import { useDispatch } from "react-redux";
import { setEditData } from "../../../../redux/slices/editData";
export default function BlogsListing({setSelected}) {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchBlogs = async () => {
      const result = await getAllBlogs();
      if (result.success) {
        setBlogs(result.data);
      } else {
        setError(result.error || "Failed to fetch blogs");
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Blogs</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog._id}
                className="group block"
          >
            {/* Blog Image */}
            {blog.gallery.length > 0 && (
              <img
                src={blog.gallery[0]}
                alt={blog.title}
                className="w-full h-48 object-cover  mb-4 transition-transform duration-300 group-hover:scale-105"
              />
            )}

            {/* Blog Title */}
            <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-black">
              {blog.title}
            </h2>

            {/* Date */}
            <p className="text-sm text-gray-500">
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <button onClick={() => {dispatch(setEditData(blog))
              setSelected("Blog-form");
            }}>Edit</button>
            </div>
        ))}
      </div>
    </div>
  );
}
