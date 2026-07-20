"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Trash2, Download, FileDown, ChevronLeft, ChevronRight } from "lucide-react";
import ConfirmDialog from "./ConfirmDialog";
import { exportToCSV } from "@/utils/csvExport";
import { downloadImage } from "@/utils/downloadImage";

/**
 * Shared admin listing table: bulk-select + bulk delete, per-row delete,
 * CSV export, optional image column with download, URL-driven pagination.
 * No card layouts — this is the single table primitive every admin page should use.
 *
 * @param {Array<{key, label, render?, hideOnMobile?, className?}>} columns
 * @param {Array<object>} rows
 * @param {(row) => string} rowKey
 */
export default function AdminDataTable({
  columns,
  rows,
  rowKey,
  loading = false,
  emptyMessage = "No records found.",
  imageColumn,
  renderActions,
  onDelete,
  deleteMessage = () => "This action cannot be undone.",
  onBulkDelete,
  bulkDeleteMessage = (count) => `Delete ${count} selected record${count > 1 ? "s" : ""}? This action cannot be undone.`,
  exportColumns,
  exportFilename = "export",
  onExportAll,
  page,
  totalPages,
  onPageChange,
}) {
  const [selected, setSelected] = useState(new Set());
  const [confirmTarget, setConfirmTarget] = useState(null); // { type: 'single'|'bulk', row? }
  const [working, setWorking] = useState(false);
  const [exporting, setExporting] = useState(false);

  const allSelected = rows.length > 0 && selected.size === rows.length;

  const toggleAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(rows.map(rowKey)));
  };

  const toggleRow = (id) => {
    setSelected((prev) => {
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
        await onDelete(confirmTarget.row);
        toast.success("Deleted successfully.");
      } else {
        const targetRows = rows.filter((r) => selected.has(rowKey(r)));
        const results = await Promise.allSettled(targetRows.map((r) => onDelete(r)));
        const failed = results.filter((r) => r.status === "rejected").length;
        const succeeded = results.length - failed;
        if (onBulkDelete) await onBulkDelete(targetRows);
        if (failed === 0) toast.success(`${succeeded} record${succeeded > 1 ? "s" : ""} deleted.`);
        else toast.error(`${succeeded} deleted, ${failed} failed.`);
        setSelected(new Set());
      }
      setConfirmTarget(null);
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || "Delete failed.");
    } finally {
      setWorking(false);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      let data = onExportAll ? await onExportAll() : rows;
      if (selected.size > 0) {
        data = (data || []).filter((r) => selected.has(rowKey(r)));
      }
      if (!data || data.length === 0) {
        toast.error("Nothing to export.");
        return;
      }
      exportToCSV(data, exportColumns || columns, exportFilename);
      toast.success("CSV downloaded.");
    } catch (err) {
      toast.error("Export failed.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Bulk action / export toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 min-h-[40px]">
        <div>
          {selected.size > 0 && onDelete && (
            <button
              onClick={() => setConfirmTarget({ type: "bulk" })}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-bold text-sm transition-all"
            >
              <Trash2 size={15} /> Delete Selected ({selected.size})
            </button>
          )}
        </div>
        {(exportColumns || columns) && rows.length > 0 && (
          <button
            onClick={handleExport}
            disabled={exporting}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl font-bold text-sm transition-all disabled:opacity-50 ml-auto"
          >
            <FileDown size={15} />{" "}
            {exporting ? "Exporting..." : selected.size > 0 ? `Export Selected (${selected.size})` : "Export CSV"}
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f8fafc] border-b border-slate-100">
              <tr>
                {onDelete && (
                  <th className="px-4 py-4 w-10">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
                    />
                  </th>
                )}
                {imageColumn && (
                  <th className="px-4 py-4 text-[10px] font-black uppercase text-slate-400">Image</th>
                )}
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-6 py-4 text-[10px] font-black uppercase text-slate-400 ${col.hideOnMobile ? "hidden md:table-cell" : ""} ${col.className || ""}`}
                  >
                    {col.label}
                  </th>
                ))}
                {(renderActions || onDelete) && (
                  <th className="px-6 py-4 text-right text-[10px] font-black uppercase text-slate-400">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={100} className="p-16 text-center text-slate-300 font-bold uppercase text-xs italic animate-pulse">
                    Loading...
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={100} className="p-16 text-center text-slate-400 font-medium">
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                rows.map((row) => {
                  const id = rowKey(row);
                  return (
                    <tr key={id} className="group hover:bg-blue-50/30 transition-colors">
                      {onDelete && (
                        <td className="px-4 py-4">
                          <input
                            type="checkbox"
                            checked={selected.has(id)}
                            onChange={() => toggleRow(id)}
                            className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
                          />
                        </td>
                      )}
                      {imageColumn && (
                        <td className="px-4 py-4">
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 group/img">
                            {imageColumn.accessor(row) ? (
                              <>
                                <img
                                  src={imageColumn.accessor(row)}
                                  alt={imageColumn.alt ? imageColumn.alt(row) : ""}
                                  className="w-full h-full object-cover"
                                />
                                <button
                                  onClick={() =>
                                    downloadImage(
                                      imageColumn.accessor(row),
                                      imageColumn.filename ? imageColumn.filename(row) : id
                                    )
                                  }
                                  title="Download image"
                                  className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white"
                                >
                                  <Download size={16} />
                                </button>
                              </>
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[8px] text-slate-300 font-bold uppercase">
                                None
                              </div>
                            )}
                          </div>
                        </td>
                      )}
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className={`px-6 py-4 ${col.hideOnMobile ? "hidden md:table-cell" : ""} ${col.className || ""}`}
                        >
                          {col.render ? col.render(row) : row[col.key]}
                        </td>
                      ))}
                      {(renderActions || onDelete) && (
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end items-center gap-2">
                            {renderActions && renderActions(row)}
                            {onDelete && (
                              <button
                                onClick={() => setConfirmTarget({ type: "single", row })}
                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-all"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {onPageChange && totalPages > 1 && (
        <div className="flex justify-center items-center py-4">
          <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
            <button
              onClick={() => onPageChange(Math.max(page - 1, 1))}
              disabled={page === 1}
              className="p-2 rounded-xl hover:bg-slate-50 disabled:opacity-30 transition-all text-slate-600"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="px-4 text-sm font-bold text-slate-700">
              {page} <span className="text-slate-300 mx-1">/</span> {totalPages}
            </span>
            <button
              onClick={() => onPageChange(Math.min(page + 1, totalPages))}
              disabled={page === totalPages}
              className="p-2 rounded-xl hover:bg-slate-50 disabled:opacity-30 transition-all text-slate-600"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!confirmTarget}
        title={confirmTarget?.type === "bulk" ? "Delete selected records?" : "Delete this record?"}
        message={
          confirmTarget?.type === "bulk"
            ? bulkDeleteMessage(selected.size)
            : confirmTarget?.row
            ? deleteMessage(confirmTarget.row)
            : ""
        }
        loading={working}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmTarget(null)}
      />
    </div>
  );
}
