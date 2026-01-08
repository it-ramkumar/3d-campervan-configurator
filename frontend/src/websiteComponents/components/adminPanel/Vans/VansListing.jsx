"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setEditData, clearEditData } from "../../../../redux/slices/editData";
import { getAllVans } from "../../../../api/van/getAllVans";
import { deleteVan } from "../../../../api/van/deleteVan";
import Detail from "./Detail";
import Swal from "sweetalert2";
import ImageWithSkeleton from "../../Common/ImageWithSkeleton/ImageWithSkeleton";

export default function VanListing({ setSelected }) {
  const dispatch = useDispatch();
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const [isOpen, setIsopen] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 8;

  useEffect(() => {
    fetchVans(page, search);
  }, [page]);

  const fetchVans = async (currentPage = 1, query = "") => {
    setLoading(true);
    try {
      const result = await getAllVans(currentPage, limit, query);
      if (result.success && Array.isArray(result.data)) {
        setVans(result.data);
        setPages(result.pages || 1);
      } else {
        setVans([]);
        setPages(1);
      }
    } catch (err) {
      console.error("Error fetching vans:", err);
      setVans([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchVans(1, search);
  };

  const handleDelete = (slug) => {
    Swal.fire({
      title: "Delete Van?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete",
      customClass: { popup: 'rounded-3xl' }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteVan(slug);
          Swal.fire("Deleted!", "Van removed successfully.", "success");
          fetchVans(page, search);
        } catch (err) {
          Swal.fire("Error!", err.message, "error");
        }
      }
    });
  };

  const handleEdit = (van) => {
    dispatch(setEditData(van));
    setSelected("vans-form");
  };

  const handleView = (van) => {
    setDetail(van);
    setIsopen(true);
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64 text-slate-400 font-medium italic">
      <div className="animate-pulse">Loading fleet data...</div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* --- Top Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Fleet Management</h2>
          <p className="text-sm text-slate-500">Manage and monitor your van listings</p>
        </div>

        <button
          onClick={() => {
            setSelected("vans-form");
            dispatch(clearEditData());
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <span className="text-lg">+</span> Add New Van
        </button>
      </div>

      {/* --- Search Bar Section (Minimalist) --- */}
      <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
        <div className="relative flex-1 min-w-[280px]">
          <input
            type="text"
            placeholder="Search vans by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-white border border-slate-200 text-slate-700 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
        >
          Search
        </button>
        {search && (
          <button
            onClick={() => { setSearch(""); fetchVans(1, ""); }}
            className="text-slate-400 hover:text-slate-600 text-sm font-semibold px-2"
          >
            Clear
          </button>
        )}
      </div>

      {/* --- Fleet Grid --- */}
      {vans.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-medium">No vans found in your fleet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {vans.map((van) => (
            <div
              key={van._id}
              className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 flex flex-col"
            >
              {/* Image Header */}
              <div className="relative h-56 overflow-hidden">
                {van.gallery?.length > 0 ? (
                  <ImageWithSkeleton
                    src={van.gallery[0]?.url || van.gallery[0]}
                    alt={van.van_listing?.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                    <span className="text-slate-300 text-xs font-bold uppercase tracking-widest">No Preview</span>
                  </div>
                )}
                {/* Price Badge */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm">
                  <span className="text-blue-700 font-black text-sm">${van.van_listing?.price || "0"}</span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                  <h3 className="font-bold text-slate-800 text-lg mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {van.van_listing?.title || "Untitled Unit"}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                    {van.van_listing?.description || "No description provided for this van listing."}
                  </p>
                </div>

                {/* Buttons (Lite Styling) */}
                <div className="mt-auto pt-4 flex items-center gap-2">
                  <button
                    onClick={() => handleView(van)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-50 text-slate-600 font-bold text-xs hover:bg-slate-100 transition-all active:scale-95"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleEdit(van)}
                    className="flex-1 py-2.5 rounded-xl bg-blue-50 text-blue-600 font-bold text-xs hover:bg-blue-100 transition-all active:scale-95"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(van.slug)}
                    className="p-2.5 rounded-xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all active:scale-95"
                    title="Delete"
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

      {/* --- Pagination (BigBear Style) --- */}
      {pages > 1 && (
        <div className="flex justify-center items-center py-10">
          <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="p-2 rounded-xl hover:bg-slate-50 disabled:opacity-30 transition-all text-slate-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <span className="px-4 text-sm font-bold text-slate-700">
              {page} <span className="text-slate-300 mx-1">/</span> {pages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, pages))}
              disabled={page === pages}
              className="p-2 rounded-xl hover:bg-slate-50 disabled:opacity-30 transition-all text-slate-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {isOpen && <Detail setIsopen={setIsopen} detail={detail} />}
    </div>
  );
}