"use client";
import React, { useEffect } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";

export default function StatusDialog({
  open,
  type = "success",
  title,
  message,
  buttonLabel = "OK",
  autoCloseMs,
  onClose,
}) {
  const isSuccess = type === "success";

  useEffect(() => {
    if (!open || !autoCloseMs) return;
    const timer = setTimeout(onClose, autoCloseMs);
    return () => clearTimeout(timer);
  }, [open, autoCloseMs, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in duration-150">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${isSuccess ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
              {isSuccess ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
            </div>
            <button onClick={onClose} className="p-1.5 text-slate-300 hover:text-slate-500 rounded-lg transition-colors">
              <X size={18} />
            </button>
          </div>
          <h3 className="text-lg font-black text-slate-800 tracking-tight">
            {title || (isSuccess ? "Success" : "Something went wrong")}
          </h3>
          {message && <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{message}</p>}
        </div>
        <div className="px-6 pb-6 flex justify-end">
          <button
            onClick={onClose}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg transition-all active:scale-95 ${
              isSuccess ? "bg-green-600 hover:bg-green-700 shadow-green-200" : "bg-red-600 hover:bg-red-700 shadow-red-200"
            }`}
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
