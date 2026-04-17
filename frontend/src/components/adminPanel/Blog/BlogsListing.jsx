"use client";

import React, { useEffect, useState } from "react";
import { getAllBlogs } from "@/api/blog/getAllBlogs";
import { useDispatch } from "react-redux";
import { setEditData,clearEditData } from "@/redux/slices/editData";
import { deleteBlog } from "@/api/blog/deleteBlog";
import Detail from "./Detail";
import Swal from "sweetalert2";
import { ImageWithSkeleton } from "@/components/Common/Common";
import { Search } from "lucide-react";

export default function BlogsListing({ setSelected }) {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detail, setDetail] = useState(null);
  const [isOpen, setIsopen] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, [page, searchQuery]);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getAllBlogs(page, searchQuery);
      if (result.success && Array.isArray(result.data)) {
        if (page === 1) setBlogs(result.data);
        else setBlogs((prev) => [...prev, ...result.data]);
        setTotalPages(result.pagination?.totalPages || 1);
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

  const handleSearch = () => {
    setPage(1);
    setSearchQuery(searchTerm);
  };

  const handleDelete = (blogId) => {
    Swal.fire({
      title: "Delete Blog Post?",
      text: "This article will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete",
      customClass: { popup: 'rounded-[2rem]' }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteBlog(blogId);
          setBlogs((prev) => prev.filter((b) => b._id !== blogId));
        } catch (err) {
          Swal.fire("error!", err.message || "Failed to delete", "error");
        }
      }
    });
  };

  const handleEdit = (blog) => {
    dispatch(setEditData(blog));
    setSelected("Blog-form");
  };

  const handleView = (blog) => {
    setDetail(blog);
    setIsopen(true);
  };

  if (loading && page === 1) return (
    <div className="flex items-center justify-center h-64 text-slate-400 font-medium italic">
      <div className="animate-pulse">Loading blog articles...</div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Editorial Blogs</h2>
          <p className="text-sm text-slate-500">Share stories and updates with your audience</p>
        </div>

        <button
          onClick={() => {
            setSelected("Blog-form");
            dispatch(clearEditData());
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <span className="text-lg">+</span> Create Post
        </button>
      </div>

      {/* --- Minimalist Search Bar --- */}
      <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
        <div className="relative flex-1 min-w-[280px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search articles by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border-none rounded-xl pl-11 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400 outline-none"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-white border border-slate-200 text-slate-700 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm disabled:opacity-50"
        >
          {loading && page === 1 ? "Searching..." : "Search"}
        </button>
      </div>

      {/* --- Blog Grid --- */}
      {blogs.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 font-medium text-slate-400">
          No blog posts found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 flex flex-col"
            >
              {/* Image Section */}
              <div className="relative h-52 overflow-hidden">
                {blog.gallery?.length > 0 ? (
                  <ImageWithSkeleton
                    src={typeof blog.gallery[0] === "string" ? blog.gallery[0] : blog.gallery[0]?.url}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300 text-xs font-bold uppercase tracking-widest">
                    No Image
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg shadow-sm">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Article</span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-6">
                  <h3 className="font-bold text-slate-800 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {blog.title || "Untitled Post"}
                  </h3>
                  <div className="flex items-center text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }) : "No Date"}
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-auto flex items-center gap-2">
                  <button
                    onClick={() => handleView(blog)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-50 text-slate-600 font-bold text-xs hover:bg-slate-100 transition-all active:scale-95"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(blog)}
                    className="flex-1 py-2.5 rounded-xl bg-blue-50 text-blue-600 font-bold text-xs hover:bg-blue-100 transition-all active:scale-95"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="p-2.5 rounded-xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- BigBear Pagination (Load More Style) --- */}
      {blogs.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 py-10 border-t border-slate-100">
          {page < totalPages && (
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={loading}
              className="px-8 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm disabled:opacity-50"
            >
              {loading ? "Loading..." : "Load More Posts"}
            </button>
          )}

          {page > 1 && (
            <button
              onClick={() => {
                setPage(1);
              }}
              className="px-8 py-3 bg-slate-50 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all"
            >
              Back to Start
            </button>
          )}
        </div>
      )}

      {/* Modal */}
      {isOpen && <Detail setIsopen={setIsopen} detail={detail} />}
    </div>
  );
}