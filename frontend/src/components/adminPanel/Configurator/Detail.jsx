"use client";
import React from "react";
import { X, Box, Tag, DollarSign, Package, Layers } from "lucide-react";
import Image from "next/image";

export default function DetailModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
      {/* Modal Container - Fixed Height constraints */}
      <div className="bg-[#f8fafc] w-full max-w-2xl h-full max-h-[90vh] rounded-[2.5rem] shadow-2xl flex flex-col border border-white/20 relative">

        {/* 1. Header - Fixed (Non-scrollable) */}
        <div className="flex-none px-8 py-6 bg-white border-b border-slate-100 flex justify-between items-center rounded-t-[2.5rem]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-tighter rounded-md border border-blue-100">
                {item.category}
              </span>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                ID: {item.shortId}
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase">
              {item.label}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="h-10 w-10 flex items-center justify-center bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-2xl transition-all active:scale-90"
          >
            <X size={20} />
          </button>
        </div>

        {/* 2. Content Area - SCROLLABLE */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#f8fafc]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Left Column: Image Preview */}
            <div className="space-y-4">
              <div className="aspect-square bg-white rounded-[2rem] border border-slate-200 p-2 shadow-sm overflow-hidden group">
                <Image
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-cover rounded-[1.8rem] group-hover:scale-105 transition-transform duration-700"
                  width={400}
                  height={400}
                />
              </div>
              <a
                href={item.glbFile}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-slate-200"
              >
                <Package size={16} /> View 3D Asset (.GLB)
              </a>
            </div>

            {/* Right Column: Specifications */}
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Description</span>
                <p className="text-sm text-slate-600 leading-relaxed font-medium bg-white p-4 rounded-2xl border border-slate-100 shadow-sm italic">
                  "{item.description}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                  <DollarSign size={14} className="text-blue-600 mb-1" />
                  <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest">Price Point</span>
                  <span className="text-lg font-black text-slate-800">${item.price}</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                  <Tag size={14} className="text-blue-600 mb-1" />
                  <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest">Type</span>
                  <span className="text-sm font-black text-slate-800 uppercase tracking-tight">{item.type}</span>
                </div>
              </div>

              {/* Info Table Style */}
              <div className="bg-slate-100/50 p-5 rounded-[2rem] space-y-4">
                {[
                  { label: "Group", val: item.group },
                  { label: "Slug", val: item.slug },
                  { label: "Has Sink", val: item.hasSink ? "YES" : "NO" },
                  { label: "Updated", val: new Date(item.updatedAt).toLocaleDateString() }
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-slate-200/50 pb-2 last:border-0 last:pb-0">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{row.label}</span>
                    <span className="text-[10px] font-bold text-slate-700">{row.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Footer - Fixed (Non-scrollable) */}
        <div className="flex-none p-6 bg-white border-t border-slate-100 flex justify-end rounded-b-[2.5rem]">
          <button
            onClick={onClose}
            className="px-10 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-lg shadow-slate-200"
          >
            Close Detail
          </button>
        </div>
      </div>
    </div>
  );
}