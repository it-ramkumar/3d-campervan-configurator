"use client";
import React from "react";
import { X, Mail, Phone, Zap, Wind, Bed, Map, DollarSign, Users } from "lucide-react";

export default function InquiryDetailModal({ inquiry, onClose, onUpdateStatus }) {
  if (!inquiry) return null;

  const statusConfig = {
    "New": "bg-blue-100 text-blue-800 border-blue-200",
    "Contacted": "bg-purple-100 text-purple-800 border-purple-200",
    "In Progress": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "Closed": "bg-green-100 text-green-800 border-green-200"
  };

  // Helper for rendering spec rows
  const SpecItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
      <div className="p-2 bg-slate-50 rounded-lg text-slate-500">
        <Icon size={16} />
      </div>
      <div>
        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">{label}</p>
        <p className="text-sm font-bold text-slate-700 leading-tight">{value || "Not specified"}</p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-[#f8fafc] w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">

        {/* Header */}
     {/* Header */}
<div className="px-8 py-5 border-b border-slate-200 flex justify-between items-center bg-white">
  <div>
    <div className="flex items-center gap-3 mb-1">
      <h2 className="text-xl font-black text-slate-800 tracking-tight">Van Build Inquiry</h2>
      <span className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase border ${statusConfig[inquiry.status]}`}>
        {inquiry.status}
      </span>
    </div>

    {/* Clickable Email Link */}
    <a
      href={`mailto:${inquiry.email}`}
      className="group flex items-center gap-2 text-sm text-slate-500 font-medium hover:text-blue-600 transition-colors"
      title="Click to send email"
    >
      <Mail size={14} className="group-hover:animate-bounce" />
      {inquiry.email}
    </a>
  </div>

  <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors">
    <X size={24} />
  </button>
</div>

        {/* Scrollable Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">

          {/* Section: Primary Contact & Budget */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SpecItem icon={Users} label="People" value={inquiry.people} />
            <SpecItem icon={DollarSign} label="Budget Range" value={inquiry.budget} />
            <SpecItem icon={Map} label="Usage Plans" value={inquiry.plans?.join(", ")} />
          </div>

          {/* Section: Technical Requirements */}
          <div>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-slate-200"></span> Technical Specs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SpecItem icon={Zap} label="Electrical Needs" value={inquiry.electrical} />
              <SpecItem icon={Wind} label="A/C Requirement" value={inquiry.ac} />
              <SpecItem icon={Bed} label="Sleeping Arrangement" value={inquiry.sleeping?.join(", ")} />
              <SpecItem icon={Map} label="Driving/Roads" value={inquiry.roads} />
              <SpecItem icon={Wind} label="Heating" value={inquiry.heating} />
              <SpecItem icon={Users} label="Shower/Bathroom" value={inquiry.shower} />
            </div>
          </div>

          {/* Section: Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Van Status</label>
              <p className="text-sm text-slate-600 bg-white p-3 rounded-xl border border-slate-100">{inquiry.haveVan}</p>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Van Size Preference</label>
              <p className="text-sm text-slate-600 bg-white p-3 rounded-xl border border-slate-100">{inquiry.vanSize?.join(", ")}</p>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 italic text-right">
            System ID: {inquiry._id} • Received: {new Date(inquiry.createdAt).toLocaleString()}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-200 bg-white flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800">
            Dismiss
          </button>
          <button
            onClick={() => {
              const nextStatus = inquiry.status === "Closed" ? "New" : "Closed";
              onUpdateStatus(inquiry._id, nextStatus);
            }}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all shadow-lg active:scale-95 ${
              inquiry.status === "Closed" ? "bg-blue-600 hover:bg-blue-700" : "bg-slate-900 hover:bg-black"
            }`}
          >
            {inquiry.status === "Closed" ? "Reopen Lead" : "Mark as Resolved"}
          </button>
        </div>
      </div>
    </div>
  );
}