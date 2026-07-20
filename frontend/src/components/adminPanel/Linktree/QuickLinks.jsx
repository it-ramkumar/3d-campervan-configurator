import React, { useEffect, useState } from "react";
import axios from "axios";
import { setEditData, clearEditData } from "@/redux/slices/editData";
import { useDispatch } from "react-redux";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import Image from "next/image";
import toast from "react-hot-toast";
import { Plus, Trash2, Pencil, GripVertical, FileDown, Download } from "lucide-react";
import ConfirmDialog from "../shared/ConfirmDialog";
import { exportToCSV } from "@/utils/csvExport";
import { downloadImage } from "@/utils/downloadImage";

const QUICK_LINK_CSV_COLUMNS = [
  { key: "title", label: "Title" },
  { key: "url", label: "URL" },
  { key: "order", label: "Order" },
];

const QuickLinks = ({ setSelected }) => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelectedRows] = useState(new Set());
  const [confirmTarget, setConfirmTarget] = useState(null); // { type: 'single'|'bulk', link? }
  const [working, setWorking] = useState(false);
  const [exporting, setExporting] = useState(false);
  const dispatch = useDispatch();

  // Fetch quick links
  const fetchLinks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/quick-links`
      );
      setLinks(res.data.links || []);
      setSelectedRows(new Set());
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load links.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  // Edit handler
  const handleEdit = (link) => {
    dispatch(setEditData(link));
    setSelected("addQuickLink");
  };

  const toggleAll = () => {
    if (selected.size === links.length) setSelectedRows(new Set());
    else setSelectedRows(new Set(links.map((l) => l._id)));
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
        await axios.delete(
          `${process.env.NEXT_PUBLIC_URL}/quick-links/${confirmTarget.link._id}`,
          { withCredentials: true }
        );
        toast.success("Link deleted.");
      } else {
        const targets = links.filter((l) => selected.has(l._id));
        const results = await Promise.allSettled(
          targets.map((l) =>
            axios.delete(`${process.env.NEXT_PUBLIC_URL}/quick-links/${l._id}`, { withCredentials: true })
          )
        );
        const failed = results.filter((r) => r.status === "rejected").length;
        const succeeded = results.length - failed;
        if (failed === 0) toast.success(`${succeeded} link${succeeded > 1 ? "s" : ""} deleted.`);
        else toast.error(`${succeeded} deleted, ${failed} failed.`);
      }
      setConfirmTarget(null);
      fetchLinks();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed.");
    } finally {
      setWorking(false);
    }
  };

  const handleExportCSV = () => {
    setExporting(true);
    try {
      if (!links.length) {
        toast.error("Nothing to export.");
        return;
      }
      exportToCSV(links, QUICK_LINK_CSV_COLUMNS, "quick-links");
      toast.success("CSV downloaded.");
    } catch (err) {
      toast.error("Export failed.");
    } finally {
      setExporting(false);
    }
  };

  // 🔥 REORDER HANDLER
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(links);
    const [movedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, movedItem);

    const reordered = items.map((item, index) => ({
      ...item,
      order: index + 1,
    }));

    // Update UI instantly
    setLinks(reordered);

    // Save order to backend
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_URL}/quick-links/reorder`,
        {
          links: reordered.map((l) => ({
            _id: l._id,
            order: l.order,
          })),
        },
        { withCredentials: true }
      );
    } catch (err) {
      toast.error("Failed to save order");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64 text-slate-400 font-medium italic">
      <div className="animate-pulse">Loading quick links...</div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* --- Top Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Quick Links</h2>
          <p className="text-sm text-slate-500">Manage and reorder your Linktree quick links</p>
        </div>
        <button
          onClick={() => {
            dispatch(clearEditData());
            setSelected("addQuickLink");
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2 self-start md:self-auto"
        >
          <Plus size={18} /> Add Link
        </button>
      </div>

      {error && <p className="text-center text-red-500">{error}</p>}

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
          <FileDown size={15} /> {exporting ? "Exporting..." : "Export CSV"}
        </button>
      </div>

      {/* --- Quick Links Table with DND --- */}
      {links.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-medium">No quick links found.</p>
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
                      checked={links.length > 0 && selected.size === links.length}
                      onChange={toggleAll}
                      className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
                    />
                  </th>
                  <th className="px-4 py-4 text-[10px] font-black uppercase text-slate-400">Image</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400">Title</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 hidden md:table-cell">URL</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 hidden md:table-cell">Order</th>
                  <th className="px-6 py-4 text-right text-[10px] font-black uppercase text-slate-400">Actions</th>
                  <th className="px-4 py-4 w-10" />
                </tr>
              </thead>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="quickLinks">
                  {(provided) => (
                    <tbody {...provided.droppableProps} ref={provided.innerRef} className="divide-y divide-slate-50">
                      {links.map((link, index) => (
                        <Draggable key={link._id} draggableId={link._id} index={index}>
                          {(dragProvided, snapshot) => (
                            <tr
                              ref={dragProvided.innerRef}
                              {...dragProvided.draggableProps}
                              className={`group hover:bg-blue-50/30 transition-colors ${snapshot.isDragging ? "bg-blue-50 shadow-lg" : ""}`}
                            >
                              <td className="px-4 py-4">
                                <input
                                  type="checkbox"
                                  checked={selected.has(link._id)}
                                  onChange={() => toggleRow(link._id)}
                                  className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
                                />
                              </td>
                              <td className="px-4 py-4">
                                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 group/img">
                                  {link.icon ? (
                                    <>
                                      <Image
                                        src={link.icon}
                                        alt={link.title}
                                        className="w-full h-full object-cover"
                                        width={56}
                                        height={56}
                                      />
                                      <button
                                        onClick={() => downloadImage(link.icon, link.title || link._id)}
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
                                <a
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-bold text-slate-800 text-sm line-clamp-1 group-hover:text-blue-600"
                                >
                                  {link.title}
                                </a>
                              </td>
                              <td className="px-6 py-4 hidden md:table-cell">
                                <p className="text-slate-500 text-sm line-clamp-1 max-w-xs">{link.url}</p>
                              </td>
                              <td className="px-6 py-4 hidden md:table-cell">
                                <span className="text-blue-700 font-black text-sm">{link.order ?? index + 1}</span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex justify-end items-center gap-2">
                                  <button onClick={() => handleEdit(link)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all" title="Edit">
                                    <Pencil size={16} />
                                  </button>
                                  <button onClick={() => setConfirmTarget({ type: "single", link })} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-all" title="Delete">
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

      <ConfirmDialog
        open={!!confirmTarget}
        title={confirmTarget?.type === "bulk" ? "Delete selected links?" : "Delete this link?"}
        message={
          confirmTarget?.type === "bulk"
            ? `Delete ${selected.size} selected link${selected.size > 1 ? "s" : ""}? This action cannot be undone.`
            : `Delete "${confirmTarget?.link?.title || "this link"}"? This action cannot be undone.`
        }
        loading={working}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmTarget(null)}
      />
    </div>
  );
};

export default QuickLinks;
