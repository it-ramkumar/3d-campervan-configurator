"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setEditData, clearEditData } from "@/redux/slices/editData";
import { getAllPortfolio } from "@/api/portfolio/getAllPortfolio";
import { deletePortfolio } from "@/api/portfolio/deletePortfolio";
import Detail from "./Detail";
import toast from "react-hot-toast";
import { Search, Plus, Eye, Pencil } from "lucide-react";
import AdminDataTable from "../shared/AdminDataTable";
import { useUrlPage } from "@/hooks/useUrlPage";

const getPortfolioImage = (portfolio) => {
  const img = portfolio.gallery?.[0];
  if (!img) return null;
  return typeof img === "string" ? img : img?.url;
};

const PORTFOLIO_CSV_COLUMNS = [
  { key: "title", label: "Title", accessor: (p) => p.van_listing?.title || "" },
  { key: "subtitle", label: "Subtitle", accessor: (p) => p.van_listing?.subtitle || "" },
  { key: "description", label: "Description", accessor: (p) => p.van_listing?.description || "" },
  { key: "bathroomType", label: "Bathroom Type", accessor: (p) => p.van_listing?.bathroomType || "" },
  { key: "bedType", label: "Bed Type", accessor: (p) => p.van_listing?.bedType || "" },
  { key: "size", label: "Size", accessor: (p) => p.van_listing?.size || "" },
  { key: "roof", label: "Roof", accessor: (p) => p.van_listing?.roof || "" },
  { key: "price", label: "Price", accessor: (p) => p.van_listing?.price || "" },
  { key: "make_model", label: "Make/Model", accessor: (p) => p.van_listing?.specifications?.make_model || "" },
  { key: "wheelbase", label: "Wheelbase", accessor: (p) => p.van_listing?.specifications?.wheelbase || "" },
  { key: "drivetrain", label: "Drivetrain", accessor: (p) => p.van_listing?.specifications?.drivetrain || "" },
  { key: "sits", label: "Sits", accessor: (p) => p.van_listing?.specifications?.capacity?.sits || "" },
  { key: "sleeps", label: "Sleeps", accessor: (p) => p.van_listing?.specifications?.capacity?.sleeps || "" },
  { key: "category", label: "Category", accessor: (p) => (Array.isArray(p.category) ? p.category.join(", ") : "") },
  { key: "sold", label: "Sold", accessor: (p) => (p.sold ? "Yes" : "No") },
  { key: "is_published", label: "Published", accessor: (p) => (p.is_published ? "Yes" : "No") },
  { key: "slug", label: "Slug" },
  { key: "gallery", label: "Gallery", accessor: (p) => (p.gallery || []).join("; ") },
  { key: "rendering", label: "Renderings", accessor: (p) => (p.rendering || []).join("; ") },
  { key: "media", label: "Media", accessor: (p) => (p.media || []).join("; ") },
  {
    key: "detailed_features",
    label: "Detailed Features",
    accessor: (p) => (p.detailed_features || []).map((f) => `${f.category}: ${(f.items || []).join(", ")}`).join(" | "),
  },
  { key: "createdAt", label: "Created At", accessor: (p) => (p.createdAt ? new Date(p.createdAt).toLocaleString() : "") },
  { key: "updatedAt", label: "Updated At", accessor: (p) => (p.updatedAt ? new Date(p.updatedAt).toLocaleString() : "") },
];

export default function PortfolioListing({ setSelected }) {
  const dispatch = useDispatch();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const [isOpen, setIsopen] = useState(false);
  const [page, setPage] = useUrlPage();
  const [pages, setPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const limit = 9;

  useEffect(() => {
    fetchData(page, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchData = async (pageNum = 1, searchQuery = "") => {
    setLoading(true);
    try {
      const res = await getAllPortfolio({
        page: pageNum,
        limit,
        search: searchQuery,
      });

      if (res.success && Array.isArray(res.data?.data)) {
        setPortfolios(res.data.data);
        setPages(res.data.pages || 1);
      } else {
        setPortfolios([]);
        setPages(1);
      }
    } catch (err) {
      console.error("Error fetching portfolios:", err);
      setPortfolios([]);
      setPages(1);
      toast.error("Failed to load portfolio items.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setSearch(searchTerm);
    setPage(1);
    fetchData(1, searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSearch("");
    setPage(1);
    fetchData(1, "");
  };

  const handleDelete = async (portfolio) => {
    await deletePortfolio(portfolio.slug);
    setPortfolios((prev) => prev.filter((p) => p._id !== portfolio._id));
  };

  const handleEdit = (portfolio) => {
    dispatch(setEditData(portfolio));
    setSelected("portfolio-form");
  };

  const handleView = (portfolio) => {
    setDetail(portfolio);
    setIsopen(true);
  };

  // Portfolio list endpoint DOES honor a `limit` override server-side, so we can
  // fetch the entire dataset in one call (same technique as VansListing.jsx).
  const handleExportAll = async () => {
    const res = await getAllPortfolio({ page: 1, limit: 10000, search });
    if (!res.success || !Array.isArray(res.data?.data)) return [];
    return res.data.data;
  };

  const columns = [
    {
      key: "title",
      label: "Title",
      render: (p) => (
        <span className="font-bold text-slate-800 text-sm line-clamp-1 group-hover:text-blue-600">
          {p.van_listing?.title || "Untitled Project"}
        </span>
      ),
    },
    {
      key: "category",
      label: "Category",
      hideOnMobile: true,
      render: (p) =>
        p.category && p.category.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {p.category.map((cat, index) => (
              <span
                key={index}
                className="text-[11px] font-semibold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md"
              >
                {cat}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-sm text-slate-400 italic">Uncategorized</span>
        ),
    },
    {
      key: "subtitle",
      label: "Subtitle",
      hideOnMobile: true,
      render: (p) => (
        <p className="text-slate-500 text-sm line-clamp-1 max-w-xs italic">
          {p.van_listing?.subtitle || "No subtitle provided."}
        </p>
      ),
    },
    {
      key: "is_published",
      label: "Status",
      render: (p) => (
        <span
          className={`text-[11px] font-black uppercase tracking-wide px-2.5 py-1 rounded-full ${
            p.is_published ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
          }`}
        >
          {p.is_published ? "Published" : "Unpublished"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Portfolio Gallery</h2>
          <p className="text-sm text-slate-500">Showcase your best van conversion projects</p>
        </div>

        <button
          onClick={() => {
            setSelected("portfolio-form");
            dispatch(clearEditData());
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2 self-start md:self-auto"
        >
          <Plus size={18} /> Add Project
        </button>
      </div>

      {/* --- Search Bar --- */}
      <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search by title or description..."
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
        rows={portfolios}
        rowKey={(p) => p._id}
        loading={loading}
        emptyMessage="No portfolio items found."
        imageColumn={{
          accessor: getPortfolioImage,
          alt: (p) => p.van_listing?.title,
          filename: (p) => p.slug || p.van_listing?.title || p._id,
        }}
        renderActions={(p) => (
          <>
            <button
              onClick={() => handleView(p)}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
              title="View"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => handleEdit(p)}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
              title="Edit"
            >
              <Pencil size={16} />
            </button>
          </>
        )}
        onDelete={handleDelete}
        deleteMessage={(p) => `Delete "${p.van_listing?.title || "this project"}"? This action cannot be undone.`}
        exportColumns={PORTFOLIO_CSV_COLUMNS}
        exportFilename="portfolio-projects"
        onExportAll={handleExportAll}
        page={page}
        totalPages={pages}
        onPageChange={setPage}
      />

      {/* Detail Modal */}
      {isOpen && <Detail setIsopen={setIsopen} detail={detail} />}
    </div>
  );
}
