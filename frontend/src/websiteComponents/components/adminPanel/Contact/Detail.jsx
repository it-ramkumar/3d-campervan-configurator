"use client";
import React from "react";
import { X, User, Mail, Phone, Clock, CheckCircle, RotateCcw } from "lucide-react";

export default function Detail({ contact, onClose, onStatusChange }) {
  if (!contact) return null;

  const statusConfig = {
    "New": "bg-blue-100 text-blue-800 border-blue-200",
    "In Progress": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "Resolved": "bg-green-100 text-green-800 border-green-200"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-[#f8fafc] w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200 flex flex-col animate-in zoom-in duration-200">

        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-200 flex justify-between items-center bg-white">
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Message Details</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">ID: {contact._id.slice(-8)}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6 overflow-y-auto max-h-[70vh]">
          {/* Top Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-1">Sender Name</label>
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <User size={14} className="text-slate-400" /> {contact.name}
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-1">Current Status</label>
              <span className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase border ${statusConfig[contact.status]}`}>
                {contact.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-1">Email Address</label>
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <a
                  href={`mailto:${contact.email}`}
                  className="group flex items-center gap-2 text-sm text-slate-500 font-medium hover:text-blue-600 transition-colors"
                  title="Click to send email"
                >
                  <Mail size={14} className="group-hover:animate-bounce" />
                  {contact.email}
                </a>              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-1">Phone Number</label>
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <Phone size={14} className="text-slate-400" /> {contact.phone}
              </div>
            </div>
          </div>

          {/* Message Box */}
          <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-3">Inquiry Message</label>
            <p className="text-sm text-slate-600 leading-relaxed italic whitespace-pre-wrap">
              "{contact.message}"
            </p>
          </div>

          {/* Footer Metadata */}
          {contact.createdAt && (
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
              <Clock size={12} /> Received on {new Date(contact.createdAt).toLocaleString()}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-slate-200 bg-white flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
            Dismiss
          </button>
          <button
            onClick={() => {
              const nextStatus = contact.status === "Resolved" ? "New" : "Resolved";
              onStatusChange(contact._id, nextStatus);
            }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all shadow-lg active:scale-95 ${contact.status === "Resolved"
                ? "bg-slate-800 hover:bg-black"
                : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {contact.status === "Resolved" ? (
              <><RotateCcw size={16} /> Reopen Lead</>
            ) : (
              <><CheckCircle size={16} /> Mark Resolved</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}