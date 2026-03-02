import React from "react";
import { X, Mail, Phone, Package, ChevronRight, User, Truck } from "lucide-react";

export default function Detail({ user, isOpen, onClose, onStatusChange }) {
  if (!isOpen || !user) return null;

  // Status Colors based on your theme or standard semantic colors
  const statusConfig = {
    "New": "bg-[#E1D9BC] text-[#30364F] border-[#ACBAC4]",
    "Contacted": "bg-amber-100 text-amber-700 border-amber-200",
    "In Progress": "bg-purple-100 text-purple-700 border-purple-200",
    "Closed Won": "bg-green-100 text-green-700 border-green-200",
    "Closed Lost": "bg-red-100 text-red-700 border-red-200"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#30364F]/60 backdrop-blur-sm">
      {/* Container with Rounded Borders per your preference */}
      <div className="bg-[#F0F0DB] w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden border border-[#ACBAC4] flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="px-8 py-5 border-b border-[#ACBAC4] flex justify-between items-center bg-white">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-[#30364F] rounded-2xl flex items-center justify-center text-white shadow-lg">
              <User size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#30364F] tracking-tight leading-none mb-1 capitalize">
                {user.name}
              </h2>
              <span className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase border ${statusConfig[user.status] || 'bg-slate-100'}`}>
                {user.status}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#E1D9BC] rounded-xl text-[#30364F] transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar space-y-6">

          {/* Model/Layout Info */}
          <div className="flex items-center gap-3 p-4 bg-[#E1D9BC]/30 rounded-2xl border border-[#ACBAC4]/50">
            <Truck className="text-[#30364F]" size={20} />
            <div>
              <p className="text-[10px] font-black uppercase text-[#30364F]/60 tracking-widest">Selected Vehicle</p>
              <p className="text-sm font-bold text-[#30364F]">{user.model?.layout || "Not specified"}</p>
            </div>
          </div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-[#ACBAC4]/30 shadow-sm">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 flex items-center gap-2">
                <Mail size={12} /> Email Address
              </p>
              <a href={`mailto:${user.email}`} className="text-sm font-bold text-[#30364F] hover:underline break-all">{user.email}</a>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#ACBAC4]/30 shadow-sm">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 flex items-center gap-2">
                <Phone size={12} /> Phone Number
              </p>
              <p className="text-sm font-bold text-slate-700">{user.phone || "Not provided"}</p>
            </div>
          </div>

          {/* Van Parts Selection */}
          {user.parts && user.parts.length > 0 && (
            <div>
              <h3 className="text-xs font-black text-[#30364F] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <Package size={14} /> Configuration Details ({user.parts.length})
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {user.parts.map((part) => (
                  <div key={part.id} className="group flex items-center justify-between p-3 bg-white rounded-xl border border-[#ACBAC4]/20 hover:border-[#30364F] transition-all shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#ACBAC4]" />
                      <div>
                        <p className="text-sm font-bold text-[#30364F]">{part.label}</p>
                        <p className="text-[10px] text-slate-400 uppercase font-medium">{part.type}</p>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-[#30364F]" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* System Info & Status Update */}
          <div className="pt-6 border-t border-[#ACBAC4]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="w-full md:w-1/2">
                <label className="text-[10px] font-black uppercase text-[#30364F]/60 tracking-widest block mb-2">Update Lead Status</label>
                <select
                  value={user.status}
                  onChange={(e) => onStatusChange(user._id, e.target.value)}
                  className="bg-white border border-[#ACBAC4] text-[#30364F] text-sm font-bold rounded-xl focus:ring-[#30364F] focus:border-[#30364F] block w-full p-2.5 outline-none"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed Won">Closed Won</option>
                  <option value="Closed Lost">Closed Lost</option>
                </select>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-[#30364F]/50 font-medium">Received: {new Date(user.createdAt).toLocaleString()}</p>
                <p className="text-[10px] text-slate-300">Ref: {user._id}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-[#ACBAC4] bg-white flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-slate-400 hover:text-[#30364F] transition-colors">
            Dismiss
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#30364F] hover:bg-[#30364F]/90 text-white rounded-xl text-sm font-bold transition-all shadow-lg active:scale-95"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}