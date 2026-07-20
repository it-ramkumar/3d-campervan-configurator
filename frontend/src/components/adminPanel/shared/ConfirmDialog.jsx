"use client";
import React from "react";
import { AlertTriangle, X } from "lucide-react";

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmLabel = "Yes, delete",
  cancelLabel = "Cancel",
  danger = true,
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in duration-150">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${danger ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}>
              <AlertTriangle size={20} />
            </div>
            <button onClick={onCancel} className="p-1.5 text-slate-300 hover:text-slate-500 rounded-lg transition-colors">
              <X size={18} />
            </button>
          </div>
          <h3 className="text-lg font-black text-slate-800 tracking-tight">{title}</h3>
          <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{message}</p>
        </div>
        <div className="px-6 pb-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-5 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg transition-all active:scale-95 disabled:opacity-60 ${
              danger ? "bg-red-600 hover:bg-red-700 shadow-red-200" : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
            }`}
          >
            {loading ? "Working..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
