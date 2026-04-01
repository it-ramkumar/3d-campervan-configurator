"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Search, RefreshCcw, Trash2, Eye } from "lucide-react";
import Detail from "./Detail"; // Make sure the path is correct

export default function InqueryListing() {
  const [inquiries, setInquiries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/inquery`,
        { withCredentials: true }
      );
      const data = res.data.data || res.data;
      setInquiries(data);
      setFiltered(data);
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "Failed to fetch inquiries", "error");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_URL}/inquery/${id}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      // Update local state immediately for better UX
      setInquiries(prev => prev.map(i => i._id === id ? { ...i, status: newStatus } : i));
      if (selectedInquiry?._id === id) setSelectedInquiry(prev => ({ ...prev, status: newStatus }));

      Swal.fire({ icon: 'success', title: 'Updated', timer: 1000, showConfirmButton: false });
    } catch (error) {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  const deleteInquiry = async (id, email) => {
    const result = await Swal.fire({
      title: 'Delete Inquiry?',
      text: `Removing inquiry from ${email}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_URL}/inquery/${id}`, { withCredentials: true });
        setInquiries(inquiries.filter((item) => item._id !== id));
        if (selectedInquiry?._id === id) setSelectedInquiry(null);
        Swal.fire("Deleted", "Success", "success");
      } catch (error) {
        Swal.fire("Error", "Delete failed", "error");
      }
    }
  };

  useEffect(() => {
    let data = [...inquiries];
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      data = data.filter(inq =>
        inq.email?.toLowerCase().includes(lower) ||
        inq.phone?.includes(lower) ||
        inq.message?.toLowerCase().includes(lower)
      );
    }
    if (statusFilter !== "All") {
      data = data.filter(inq => inq.status === statusFilter);
    }
    data.sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });
    setFiltered(data);
  }, [searchTerm, statusFilter, sortBy, inquiries]);

  useEffect(() => { fetchInquiries(); }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px] text-slate-400 font-medium italic animate-pulse">
      Loading inquiries...
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Client Inquiries</h2>
          <p className="text-sm text-slate-500 font-medium">Review and manage incoming leads</p>
        </div>
        <button onClick={fetchInquiries} className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm">
          <RefreshCcw className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      {/* Stats - Compact style */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', val: inquiries.length, color: 'border-slate-200' },
          { label: 'New', val: inquiries.filter(i => i.status === "New").length, color: 'border-blue-400' },
          { label: 'Pending', val: inquiries.filter(i => i.status === "In Progress").length, color: 'border-yellow-400' },
          { label: 'Closed', val: inquiries.filter(i => i.status === "Closed").length, color: 'border-green-400' },
        ].map((stat, i) => (
          <div key={i} className={`bg-white p-4 rounded-2xl border-l-4 ${stat.color} shadow-sm`}>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{stat.label}</p>
            <p className="text-xl font-bold text-slate-800">{stat.val}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search inquiries..."
            className="w-full bg-white border-none rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-white border-none rounded-xl px-4 py-2.5 text-sm font-bold text-slate-600 outline-none shadow-sm">
          <option value="All">All Status</option>
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f8fafc] border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400">Contact Info</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400">Message Preview</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400">Status</th>
                <th className="px-6 py-4 text-right text-[10px] font-black uppercase text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((inq) => (
                <tr key={inq._id} className="group hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-slate-800">{inq.email || "—"}</div>
                    <div className="text-[11px] text-slate-400 font-medium">{inq.phone || "No Phone"}</div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600 line-clamp-1 max-w-[300px] italic">
                      {inq.message || "No message provided..."}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={inq.status}
                      onChange={(e) => updateStatus(inq._id, e.target.value)}
                      className="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer hover:text-blue-600"
                    >
                      <option value="New">New</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setSelectedInquiry(inq)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteInquiry(inq._id, inq.email)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-20 text-center text-slate-400 font-medium italic">No inquiries match your filters.</div>
          )}
        </div>
      </div>

      {/* Modal Integration */}
      <Detail
        inquiry={selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
        onUpdateStatus={updateStatus}
      />
    </div>
  );
}