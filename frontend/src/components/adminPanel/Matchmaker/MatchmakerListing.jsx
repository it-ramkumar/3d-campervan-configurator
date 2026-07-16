"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, RefreshCcw, Trash2, Eye } from "lucide-react";
import Swal from "sweetalert2";
import Detail from "./Detail";

export default function MatchmakerListing() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/recommend`, { withCredentials: true });
      setLeads(res.data.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this lead?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      confirmButtonColor: "#ef4444"
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_URL}/recommend/${id}`, { withCredentials: true });
        setLeads(leads.filter((l) => l._id !== id));
        if (selectedLead?._id === id) setSelectedLead(null);
      } catch (error) { console.error(error); }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_URL}/recommend/${id}/status`,
        { status: newStatus }, { withCredentials: true });

      setLeads(prev => prev.map(l => l._id === id ? { ...l, status: newStatus } : l));
      if (selectedLead?._id === id) setSelectedLead({ ...selectedLead, status: newStatus });
    } catch (error) { console.error(error); }
  };

  useEffect(() => { fetchLeads(); }, []);

  const filteredLeads = leads
    .filter((l) => {
      const match = l.name.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase());
      return match && (statusFilter === "All" || l.status === statusFilter);
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (loading) return <div className="p-20 text-center animate-pulse font-black text-slate-300 italic uppercase">Syncing Matchmaker Leads...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Matchmaker Leads</h1>
          <p className="text-sm text-slate-500 font-medium">View quiz submissions and their matched builds</p>
        </div>
        <button onClick={fetchLeads} className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-sm">
          <RefreshCcw size={20} className="text-slate-600" />
        </button>
      </div>

      {/* Filters Area */}
      <div className="flex flex-wrap gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full bg-white border-none rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-white border-none rounded-xl px-4 py-2 text-sm font-bold text-slate-600 outline-none shadow-sm">
          <option value="All">All Status</option>
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-[#f8fafc] border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400">Contact</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400">Preferences</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400">Matched Build</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400">Lead Source</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400">Status</th>
              <th className="px-6 py-4 text-right text-[10px] font-black uppercase text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredLeads.map((l) => (
              <tr key={l._id} className="group hover:bg-blue-50/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-slate-800">{l.name}</div>
                  <div className="text-[11px] text-slate-400 font-medium">{l.email}</div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-600 max-w-xs">
                    {l.passengers}+ pax · {l.van_length.replace(/_/g, " ")}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-600 line-clamp-1 italic max-w-xs">
                    {l.no_match_found ? "No match — custom build" : (l.primary_match?.title || "—")}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-bold text-slate-500">{l.leadSource}</span>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={l.status}
                    onChange={(e) => handleStatusChange(l._id, e.target.value)}
                    className="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer"
                  >
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setSelectedLead(l)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all">
                      <Eye size={16} />
                    </button>
                    <button onClick={() => handleDelete(l._id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Detail
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
