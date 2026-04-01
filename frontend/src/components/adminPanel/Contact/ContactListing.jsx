"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, RefreshCcw, Trash2, Eye } from "lucide-react";
import Swal from "sweetalert2";
import Detail from "./Detail";

export default function ContactListing() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/contact`, { withCredentials: true });
      setContacts(res.data.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete message?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      confirmButtonColor: "#ef4444"
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_URL}/contact/${id}`, { withCredentials: true });
        setContacts(contacts.filter((c) => c._id !== id));
        if (selectedContact?._id === id) setSelectedContact(null);
      } catch (error) { console.error(error); }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_URL}/contact/${id}/status`,
        { status: newStatus }, { withCredentials: true });

      setContacts(prev => prev.map(c => c._id === id ? { ...c, status: newStatus } : c));
      if (selectedContact?._id === id) setSelectedContact({ ...selectedContact, status: newStatus });
    } catch (error) { console.error(error); }
  };

  useEffect(() => { fetchContacts(); }, []);

  const filteredContacts = contacts
    .filter((c) => {
      const match = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
      return match && (statusFilter === "All" || c.status === statusFilter);
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      return a.name.localeCompare(b.name);
    });

  if (loading) return <div className="p-20 text-center animate-pulse font-black text-slate-300 italic uppercase">Syncing Contacts...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Contact Messages</h1>
          <p className="text-sm text-slate-500 font-medium">Manage generic website inquiries</p>
        </div>
        <button onClick={fetchContacts} className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-sm">
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
              <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400">Sender</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400">Preview</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400">Status</th>
              <th className="px-6 py-4 text-right text-[10px] font-black uppercase text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredContacts.map((c) => (
              <tr key={c._id} className="group hover:bg-blue-50/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-slate-800">{c.name}</div>
                  <div className="text-[11px] text-slate-400 font-medium">{c.email}</div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-600 line-clamp-1 italic max-w-xs">{c.message}</p>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={c.status}
                    onChange={(e) => handleStatusChange(c._id, e.target.value)}
                    className="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer"
                  >
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setSelectedContact(c)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all">
                      <Eye size={16} />
                    </button>
                    <button onClick={() => handleDelete(c._id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-all">
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
        contact={selectedContact}
        onClose={() => setSelectedContact(null)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}