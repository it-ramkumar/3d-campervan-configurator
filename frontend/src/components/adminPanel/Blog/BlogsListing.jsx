"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setEditData, clearEditData } from "@/redux/slices/editData";
import { getAllBlogs } from "@/api/blog/getAllBlogs";
import { deleteBlog } from "@/api/blog/deleteBlog";
import Detail from "./Detail";
import toast from "react-hot-toast";
import { Search, Plus, Eye, Pencil } from "lucide-react";
import AdminDataTable from "../shared/AdminDataTable";
import { useUrlPage } from "@/hooks/useUrlPage";

const getBlogImage = (blog) => {
  const img = blog.gallery?.[0];
  if (!img) return null;
  return typeof img === "string" ? img : img?.url;
};

const BLOG_CSV_COLUMNS = [
  { key: "title", label: "Title" },
  { key: "slug", label: "Slug" },
  { key: "description", label: "Description" },
  { key: "createdAt", label: "Created At", accessor: (b) => (b.createdAt ? new Date(b.createdAt).toLocaleString() : "") },
];

export default function BlogsListing({ setSelected }) {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const [isOpen, setIsopen] = useState(false);
  const [page, setPage] = useUrlPage();
  const [pages, setPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBlogs(page, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchBlogs = async (currentPage = 1, query = "") => {
    setLoading(true);
    try {
      const result = await getAllBlogs(currentPage, query);
      if (result.success && Array.isArray(result.data)) {
        setBlogs(result.data);
        setPages(result.pagination?.totalPages || 1);
      } else {
        setBlogs([]);
        setPages(1);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setBlogs([]);
      toast.error("Failed to load blog posts.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setSearch(searchTerm);
    setPage(1);
    fetchBlogs(1, searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSearch("");
    setPage(1);
    fetchBlogs(1, "");
  };

  const handleDelete = async (blog) => {
    await deleteBlog(blog._id);
    setBlogs((prev) => prev.filter((b) => b._id !== blog._id));
  };

  const handleEdit = (blog) => {
    dispatch(setEditData(blog));
    setSelected("Blog-form");
  };

  const handleView = (blog) => {
    setDetail(blog);
    setIsopen(true);
  };

  // Blog list endpoint ignores any `limit` override server-side, so to export the
  // FULL dataset (not just the current page) we walk every page and concatenate.
  const handleExportAll = async () => {
    const first = await getAllBlogs(1, search);
    if (!first.success) return [];
    const totalPagesToFetch = first.pagination?.totalPages || 1;
    let all = Array.isArray(first.data) ? [...first.data] : [];
    for (let p = 2; p <= totalPagesToFetch; p++) {
      const res = await getAllBlogs(p, search);
      if (res.success && Array.isArray(res.data)) all = all.concat(res.data);
    }
    return all;
  };

  const columns = [
    {
      key: "title",
      label: "Title",
      render: (b) => (
        <span className="font-bold text-slate-800 text-sm line-clamp-1 group-hover:text-blue-600">
          {b.title || "Untitled Post"}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      hideOnMobile: true,
      render: (b) => (
        <span className="text-slate-500 text-sm">
          {b.createdAt
            ? new Date(b.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
            : "No Date"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
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
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2 self-start md:self-auto"
        >
          <Plus size={18} /> Create Post
        </button>
      </div>

      {/* --- Search Bar --- */}
      <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search articles by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full bg-white border-none rounded-xl pl-11 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400 outline-none"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-white border border-slate-200 text-slate-700 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
        >
          Search
        </button>
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="text-slate-400 hover:text-slate-600 text-sm font-semibold px-2"
          >
            Clear
          </button>
        )}
      </div>

      <AdminDataTable
        columns={columns}
        rows={blogs}
        rowKey={(b) => b._id}
        loading={loading}
        emptyMessage="No blog posts found."
        imageColumn={{
          accessor: getBlogImage,
          alt: (b) => b.title,
          filename: (b) => b.slug || b.title || b._id,
        }}
        renderActions={(b) => (
          <>
            <button
              onClick={() => handleView(b)}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
              title="View"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => handleEdit(b)}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
              title="Edit"
            >
              <Pencil size={16} />
            </button>
          </>
        )}
        onDelete={handleDelete}
        deleteMessage={(b) => `Delete "${b.title || "this post"}"? This action cannot be undone.`}
        exportColumns={BLOG_CSV_COLUMNS}
        exportFilename="blog-posts"
        onExportAll={handleExportAll}
        page={page}
        totalPages={pages}
        onPageChange={setPage}
      />

      {/* Modal */}
      {isOpen && <Detail setIsopen={setIsopen} detail={detail} />}
    </div>
  );
}
