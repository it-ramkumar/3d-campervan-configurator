"use client";

import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../../../../api/blog/getAllBlogs";
import { useDispatch } from "react-redux";
import { setEditData, clearEditData } from "../../../../redux/slices/editData";
import { deleteBlog } from "../../../../api/blog/deleteBlog";
import Detail from "./Detail";
import Swal from "sweetalert2";

export default function BlogsListing({ setSelected }) {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detail, setDetail] = useState(null);
  const [isOpen, setIsopen] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getAllBlogs();
      if (result.success && Array.isArray(result.data)) {
        setBlogs(result.data);
      } else {
        setBlogs([]);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setBlogs([]);
      setError(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (blogId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteBlog(blogId);
          Swal.fire("Deleted!", "The blog has been deleted.", "success");
          setBlogs((prev) => prev.filter((b) => b._id !== blogId));
        } catch (err) {
          Swal.fire(
            "Error!",
            err.response?.data?.message || err.message || "Failed to delete",
            "error"
          );
        }
      }
    });
  };

  const handleEdit = (blog) => {
    Swal.fire({
      title: "Preparing Editor...",
      didOpen: () => Swal.showLoading(),
      allowOutsideClick: false,
    });

    dispatch(setEditData(blog));
    setSelected("Blog-form");

    setTimeout(() => Swal.close(), 500);
  };

  const handleView = (blog) => {
    setDetail(blog);
    setIsopen(true);
  };

  if (loading) {
    return <div className="p-10 text-center text-lg font-medium text-gray-600">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 relative">
      {/* Add Blog Button */}
      <button
        onClick={() => {
          setSelected("Blog-form");
          dispatch(clearEditData());
        }}
        className="absolute top-6 right-6 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
      >
        + Add Blog
      </button>

      <h1 className="text-3xl font-bold mb-10 text-gray-800">Blogs</h1>

      {blogs.length === 0 ? (
        <p className="text-gray-500 text-center">No blogs found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Blog Image */}
              {blog.gallery?.length > 0 ? (
                <img
                  src={typeof blog.gallery[0] === "string" ? blog.gallery[0] : blog.gallery[0]?.url}
                  alt={blog.title || "Blog Image"}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {blog.title || "Untitled"}
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">
                    {blog.createdAt
                      ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "-"}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center gap-2 mt-auto">
                  <button
                    onClick={() => handleView(blog)}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleEdit(blog)}
                    className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition"
                  >
                    Edit
                  </button>

                  {blog._id && (
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isOpen && <Detail setIsopen={setIsopen} detail={detail} />}
    </div>
  );
}
