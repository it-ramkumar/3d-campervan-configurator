"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setEditData,clearEditData } from "@/redux/slices/editData";
import { getAllVans } from "@/api/van/getAllVans";
import { deleteVan } from "@/api/van/deleteVan";
import Detail from "./Detail";
import Swal from "sweetalert2";
import { ImageWithSkeleton } from "@/components/Common/Common";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function VanListing({ setSelected }) {
  const dispatch = useDispatch();
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const [isOpen, setIsopen] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("list"); // 'grid' or 'list'
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
          Swal.fire({
            icon: "success",
            title: "Delete successfully!",
            text: "Your data has been deleted successfully.",
            showConfirmButton: false
          });

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


const onDragEnd = async (result) => {
  if (!result.destination) return;

  const items = Array.from(vans);
  const [reorderedItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, reorderedItem);

  // 1. UI update karein for smooth feel
  setVans(items);

  // 2. Backend ko data bhejein
  const updatedOrder = items.map((van, index) => ({
    _id: van._id,
    order: index,
  }));

  try {
    await axios.put(`${process.env.NEXT_PUBLIC_URL}/van/reorder`, { newOrder: updatedOrder });
  } catch (err) {
    console.error("Failed to save order");
    // Optionally: fetchVans() wapis call karein agar error aaye
  }
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

   {/* --- Fleet Grid with DND --- */}
    {vans.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-medium">No vans found in your fleet.</p>
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="vans-grid"
            direction={viewMode === "grid" ? "horizontal" : "vertical"}
          >
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={
                  viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                  : "flex flex-col gap-4"
                }
              >
                {vans.map((van, index) => (
                  <Draggable key={van._id} draggableId={van._id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          opacity: snapshot.isDragging ? 0.8 : 1,
                        }}
                        className={`group bg-white rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-xl transition-all duration-300 flex ${viewMode === 'list' ? 'flex-row items-center p-4 gap-6' : 'flex-col overflow-hidden'}`}
                      >
                        {/* Image Section */}
                        <div className={`relative overflow-hidden shrink-0 ${viewMode === 'list' ? 'h-20 w-32 rounded-xl' : 'h-56'}`}>
                          {van.gallery?.length > 0 ? (
                            <ImageWithSkeleton
                              src={van.gallery[0]?.url || van.gallery[0]}
                              alt={van.van_listing?.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-300 font-bold uppercase">No Preview</div>
                          )}
                        </div>

                        {/* Content Body */}
                        <div className={`flex flex-1 items-center justify-between ${viewMode === 'grid' ? 'p-6 flex-col' : 'flex-row'}`}>
                          <div className={viewMode === 'grid' ? 'w-full mb-4' : 'flex-1'}>
                            <h3 className="font-bold text-slate-800 text-base line-clamp-1 group-hover:text-blue-600">
                              {van.van_listing?.title || "Untitled Unit"}
                            </h3>
                            {viewMode === 'grid' && (
                              <p className="text-slate-500 text-sm mt-2 line-clamp-2">{van.van_listing?.description}</p>
                            )}
                          </div>

                          <div className={`flex items-center gap-3 ${viewMode === 'grid' ? 'w-full pt-4 border-t' : ''}`}>
                            <span className="text-blue-700 font-black text-sm mr-2">${van.van_listing?.price}</span>
                            <button onClick={() => handleView(van)} className="px-4 py-2 rounded-lg bg-slate-50 text-slate-600 font-bold text-xs hover:bg-slate-100">Details</button>
                            <button onClick={() => handleEdit(van)} className="px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-bold text-xs hover:bg-blue-100">Edit</button>
                            <button onClick={() => handleDelete(van.slug)} className="p-2 rounded-lg bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                            {/* Drag Handle Icon for List View */}
                            {viewMode === 'list' && (
                               <div className="ml-2 text-slate-300">
                                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M7 7h2v2H7V7zm0 4h2v2H7v-2zm4-4h2v2h-2V7zm0 4h2v2h-2v-2zM7 15h2v2H7v-2zm4 0h2v2h-2v-2z" /></svg>
                               </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
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