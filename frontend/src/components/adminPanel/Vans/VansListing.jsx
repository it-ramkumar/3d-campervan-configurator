"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setEditData, clearEditData } from "@/redux/slices/editData";
import { getAllVans } from "@/api/van/getAllVans";
import { deleteVan } from "@/api/van/deleteVan";
import Detail from "./Detail";
import toast from "react-hot-toast";
import { ImageWithSkeleton } from "@/components/Common/Common";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Search, Plus, Trash2, Eye, Pencil, GripVertical, FileDown, Download, ChevronLeft, ChevronRight } from "lucide-react";
import ConfirmDialog from "../shared/ConfirmDialog";
import { exportToCSV } from "@/utils/csvExport";
import { downloadImage } from "@/utils/downloadImage";
import { useUrlPage } from "@/hooks/useUrlPage";

const VAN_CSV_COLUMNS = [
  { key: "title", label: "Title", accessor: (v) => v.van_listing?.title || "" },
  { key: "subtitle", label: "Subtitle", accessor: (v) => v.van_listing?.subtitle || "" },
  { key: "tagline", label: "Tagline", accessor: (v) => v.van_listing?.tagline || "" },
  { key: "roof", label: "Roof", accessor: (v) => v.van_listing?.roof || "" },
  { key: "description", label: "Description", accessor: (v) => v.van_listing?.description || "" },
  { key: "price", label: "Price", accessor: (v) => v.van_listing?.price || "" },
  { key: "sale_price", label: "Sale Price", accessor: (v) => v.van_listing?.sale_price || "" },
  { key: "make_model", label: "Make/Model", accessor: (v) => v.van_listing?.specifications?.make_model || "" },
  { key: "wheelbase", label: "Wheelbase", accessor: (v) => v.van_listing?.specifications?.wheelbase || "" },
  { key: "drivetrain", label: "Drivetrain", accessor: (v) => v.van_listing?.specifications?.drivetrain || "" },
  { key: "engine", label: "Engine", accessor: (v) => v.van_listing?.specifications?.engine || "" },
  { key: "transmission", label: "Transmission", accessor: (v) => v.van_listing?.specifications?.transmission || "" },
  { key: "exterior_color", label: "Exterior Color", accessor: (v) => v.van_listing?.specifications?.exterior_color || "" },
  { key: "interior_color", label: "Interior Color", accessor: (v) => v.van_listing?.specifications?.interior_color || "" },
  { key: "sits", label: "Sits", accessor: (v) => v.van_listing?.specifications?.capacity?.sits || "" },
  { key: "sleeps", label: "Sleeps", accessor: (v) => v.van_listing?.specifications?.capacity?.sleeps || "" },
  { key: "status", label: "Status", accessor: (v) => v.status || "" },
  { key: "is_published", label: "Published", accessor: (v) => (v.is_published ? "Yes" : "No") },
  { key: "delivery_date", label: "Delivery Date", accessor: (v) => (v.delivery_date ? new Date(v.delivery_date).toLocaleDateString() : "") },
  { key: "slug", label: "Slug" },
  { key: "gallery", label: "Gallery", accessor: (v) => (v.gallery || []).join("; ") },
  { key: "textures", label: "Textures", accessor: (v) => (v.textures || []).join("; ") },
  { key: "media", label: "Media", accessor: (v) => (v.media || []).join("; ") },
  {
    key: "detailed_features",
    label: "Detailed Features",
    accessor: (v) => (v.detailed_features || []).map((f) => `${f.category}: ${(f.items || []).join(", ")}`).join(" | "),
  },
  { key: "order", label: "Order", accessor: (v) => v.order ?? "" },
  { key: "createdAt", label: "Created At", accessor: (v) => (v.createdAt ? new Date(v.createdAt).toLocaleString() : "") },
  { key: "updatedAt", label: "Updated At", accessor: (v) => (v.updatedAt ? new Date(v.updatedAt).toLocaleString() : "") },
];

export default function VanListing({ setSelected }) {
  const dispatch = useDispatch();
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const [isOpen, setIsopen] = useState(false);
  const [page, setPage] = useUrlPage();
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [selected, setSelectedRows] = useState(new Set());
  const [confirmTarget, setConfirmTarget] = useState(null); // { type: 'single'|'bulk', van? }
  const [working, setWorking] = useState(false);
  const [exporting, setExporting] = useState(false);
  const limit = 8;

  useEffect(() => {
    fetchVans(page, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setSelectedRows(new Set());
    } catch (err) {
      console.error("Error fetching vans:", err);
      setVans([]);
      toast.error("Failed to load vans.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchVans(1, search);
  };

  const handleEdit = (van) => {
    dispatch(setEditData(van));
    setSelected("vans-form");
  };

  const handleView = (van) => {
    setDetail(van);
    setIsopen(true);
  };

  const toggleAll = () => {
    if (selected.size === vans.length) setSelectedRows(new Set());
    else setSelectedRows(new Set(vans.map((v) => v._id)));
  };

  const toggleRow = (id) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleConfirmDelete = async () => {
    if (!confirmTarget) return;
    setWorking(true);
    try {
      if (confirmTarget.type === "single") {
        await deleteVan(confirmTarget.van.slug);
        toast.success("Van deleted.");
      } else {
        const targets = vans.filter((v) => selected.has(v._id));
        const results = await Promise.allSettled(targets.map((v) => deleteVan(v.slug)));
        const failed = results.filter((r) => r.status === "rejected").length;
        const succeeded = results.length - failed;
        if (failed === 0) toast.success(`${succeeded} van${succeeded > 1 ? "s" : ""} deleted.`);
        else toast.error(`${succeeded} deleted, ${failed} failed.`);
      }
      setConfirmTarget(null);
      fetchVans(page, search);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed.");
    } finally {
      setWorking(false);
    }
  };

  const handleExportCSV = async () => {
    setExporting(true);
    try {
      const result = await getAllVans(1, 10000, search);
      if (!result.success || !result.data.length) {
        toast.error("Nothing to export.");
        return;
      }
      const data = selected.size > 0 ? result.data.filter((v) => selected.has(v._id)) : result.data;
      if (!data.length) {
        toast.error("Nothing to export.");
        return;
      }
      exportToCSV(data, VAN_CSV_COLUMNS, "vans-inventory");
      toast.success("CSV downloaded.");
    } catch (err) {
      toast.error("Export failed.");
    } finally {
      setExporting(false);
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(vans);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setVans(items);

    const updatedOrder = items.map((van, index) => ({
      _id: van._id,
      order: index,
    }));

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_URL}/van/reorder`, { newOrder: updatedOrder }, { withCredentials: true });
    } catch (err) {
      console.error("Failed to save order");
      toast.error("Failed to save new order.");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64 text-slate-400 font-medium italic">
      <div className="animate-pulse">Loading fleet data...</div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">

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
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2 self-start md:self-auto"
        >
          <Plus size={18} /> Add New Van
        </button>
      </div>

      {/* --- Search Bar Section --- */}
      <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search vans by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full bg-white border-none rounded-xl pl-11 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400"
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
            onClick={() => { setSearch(""); handleSearch(); }}
            className="text-slate-400 hover:text-slate-600 text-sm font-semibold px-2"
          >
            Clear
          </button>
        )}
      </div>

      {/* --- Bulk action / export toolbar --- */}
      <div className="flex flex-wrap items-center justify-between gap-3 min-h-[40px]">
        <div>
          {selected.size > 0 && (
            <button
              onClick={() => setConfirmTarget({ type: "bulk" })}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-bold text-sm transition-all"
            >
              <Trash2 size={15} /> Delete Selected ({selected.size})
            </button>
          )}
        </div>
        <button
          onClick={handleExportCSV}
          disabled={exporting}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl font-bold text-sm transition-all disabled:opacity-50 ml-auto"
        >
          <FileDown size={15} />{" "}
          {exporting ? "Exporting..." : selected.size > 0 ? `Export Selected (${selected.size})` : "Export CSV"}
        </button>
      </div>

      {/* --- Fleet Table with DND --- */}
      {vans.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-medium">No vans found in your fleet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#f8fafc] border-b border-slate-100">
                <tr>
                  <th className="px-4 py-4 w-10">
                    <input
                      type="checkbox"
                      checked={vans.length > 0 && selected.size === vans.length}
                      onChange={toggleAll}
                      className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
                    />
                  </th>
                  <th className="px-4 py-4 text-[10px] font-black uppercase text-slate-400">Image</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400">Title</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 hidden md:table-cell">Description</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400">Price</th>
                  <th className="px-6 py-4 text-right text-[10px] font-black uppercase text-slate-400">Actions</th>
                  <th className="px-4 py-4 w-10" />
                </tr>
              </thead>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="vans-table">
                  {(provided) => (
                    <tbody {...provided.droppableProps} ref={provided.innerRef} className="divide-y divide-slate-50">
                      {vans.map((van, index) => (
                        <Draggable key={van._id} draggableId={van._id} index={index}>
                          {(dragProvided, snapshot) => (
                            <tr
                              ref={dragProvided.innerRef}
                              {...dragProvided.draggableProps}
                              className={`group hover:bg-blue-50/30 transition-colors ${snapshot.isDragging ? "bg-blue-50 shadow-lg" : ""}`}
                            >
                              <td className="px-4 py-4">
                                <input
                                  type="checkbox"
                                  checked={selected.has(van._id)}
                                  onChange={() => toggleRow(van._id)}
                                  className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
                                />
                              </td>
                              <td className="px-4 py-4">
                                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 group/img">
                                  {van.gallery?.length > 0 ? (
                                    <>
                                      <ImageWithSkeleton
                                        src={van.gallery[0]?.url || van.gallery[0]}
                                        alt={van.van_listing?.title}
                                        className="w-full h-full object-cover"
                                      />
                                      <button
                                        onClick={() => downloadImage(van.gallery[0]?.url || van.gallery[0], van.van_listing?.title || van.slug)}
                                        title="Download image"
                                        className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white"
                                      >
                                        <Download size={16} />
                                      </button>
                                    </>
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[8px] text-slate-300 font-bold uppercase">None</div>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="font-bold text-slate-800 text-sm line-clamp-1 group-hover:text-blue-600">
                                  {van.van_listing?.title || "Untitled Unit"}
                                </span>
                              </td>
                              <td className="px-6 py-4 hidden md:table-cell">
                                <p className="text-slate-500 text-sm line-clamp-1 max-w-xs">{van.van_listing?.description}</p>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-blue-700 font-black text-sm">${van.van_listing?.price}</span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex justify-end items-center gap-2">
                                  <button onClick={() => handleView(van)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all" title="View">
                                    <Eye size={16} />
                                  </button>
                                  <button onClick={() => handleEdit(van)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all" title="Edit">
                                    <Pencil size={16} />
                                  </button>
                                  <button onClick={() => setConfirmTarget({ type: "single", van })} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-all" title="Delete">
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-slate-300 cursor-grab active:cursor-grabbing" {...dragProvided.dragHandleProps} title="Drag to reorder">
                                <GripVertical size={18} />
                              </td>
                            </tr>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </tbody>
                  )}
                </Droppable>
              </DragDropContext>
            </table>
          </div>
        </div>
      )}

      {/* --- Pagination --- */}
      {pages > 1 && (
        <div className="flex justify-center items-center py-4">
          <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
            <button
              onClick={() => setPage(Math.max(page - 1, 1))}
              disabled={page === 1}
              className="p-2 rounded-xl hover:bg-slate-50 disabled:opacity-30 transition-all text-slate-600"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="px-4 text-sm font-bold text-slate-700">
              {page} <span className="text-slate-300 mx-1">/</span> {pages}
            </span>
            <button
              onClick={() => setPage(Math.min(page + 1, pages))}
              disabled={page === pages}
              className="p-2 rounded-xl hover:bg-slate-50 disabled:opacity-30 transition-all text-slate-600"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {isOpen && <Detail setIsopen={setIsopen} detail={detail} />}

      <ConfirmDialog
        open={!!confirmTarget}
        title={confirmTarget?.type === "bulk" ? "Delete selected vans?" : "Delete this van?"}
        message={
          confirmTarget?.type === "bulk"
            ? `Delete ${selected.size} selected van${selected.size > 1 ? "s" : ""}? This action cannot be undone.`
            : `Delete "${confirmTarget?.van?.van_listing?.title || "this van"}"? This action cannot be undone.`
        }
        loading={working}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmTarget(null)}
      />
    </div>
  );
}
