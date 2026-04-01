import React from "react";
import { X, Mail, Phone, Package, ChevronRight, User } from "lucide-react";
import Image from "next/image";

export default function Detail({ user, isOpen, onClose, onStatusChange }) {
  if (!isOpen || !user) return null;

  const statusConfig = {
    "New": "bg-blue-100 text-blue-700 border-blue-200",
    "Contacted": "bg-amber-100 text-amber-700 border-amber-200",
    "In Progress": "bg-purple-100 text-purple-700 border-purple-200",
    "Closed Won": "bg-green-100 text-green-700 border-green-200",
    "Closed Lost": "bg-red-100 text-red-700 border-red-200"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-[#f8fafc] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="px-8 py-5 border-b border-slate-200 flex justify-between items-center bg-white">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <User size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight leading-none mb-1">{user.name}</h2>
              <span className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase border ${statusConfig[user.status] || 'bg-slate-100'}`}>
                {user.status}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">

          {/* Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 flex items-center gap-2">
                <Mail size={12} /> Email Address
              </p>
              <a href={`mailto:${user.email}`} className="text-sm font-bold text-blue-600 hover:underline">{user.email}</a>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 flex items-center gap-2">
                <Phone size={12} /> Phone Number
              </p>
              <p className="text-sm font-bold text-slate-700">{user.phone || "Not provided"}</p>
            </div>
          </div>

          {/* Van Parts Selection */}
          {user.parts && user.parts.length > 0 && (
            <div>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <Package size={14} /> Selected Configuration
              </h3>
              <div className="space-y-3">
                {user.parts.map((part) => (
                  <div key={part._id} className="group flex items-center gap-4 p-3 bg-white rounded-2xl border border-slate-100 hover:border-blue-200 transition-all shadow-sm">
                    <Image src={part.imageUrl} alt={part.label} className="w-16 h-16 rounded-xl object-cover bg-slate-50" width={64} height={64} />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-black text-slate-800">{part.label}</p>
                        <p className="text-sm font-black text-green-600">${part.price}</p>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 capitalize">{part.category} • {part.type}</p>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* System Info & Status Update */}
          <div className="pt-6 border-t border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Update Status</label>
                <select
                  value={user.status}
                  onChange={(e) => onStatusChange(user._id, e.target.value)}
                  className="bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed Won">Closed Won</option>
                  <option value="Closed Lost">Closed Lost</option>
                </select>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-medium">Created: {new Date(user.createdAt).toLocaleDateString()}</p>
                <p className="text-[10px] text-slate-300">ID: {user._id}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-200 bg-white flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
            Dismiss
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl text-sm font-bold transition-all shadow-lg active:scale-95"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}