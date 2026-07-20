"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, RefreshCcw, Eye } from "lucide-react";
import toast from "react-hot-toast";
import AdminDataTable from "../shared/AdminDataTable";
import Detail from "./Detail"; // Make sure the path is correct

const STATUS_OPTIONS = ["New", "In Progress", "Closed"];

const CSV_COLUMNS = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "status", label: "Status" },
  { key: "people", label: "People" },
  { key: "budget", label: "Budget" },
  { key: "haveVan", label: "Have Van" },
  { key: "vanSize", label: "Van Size", accessor: (r) => (r.vanSize || []).join(", ") },
  { key: "plans", label: "Plans", accessor: (r) => (r.plans || []).join(", ") },
  { key: "sleeping", label: "Sleeping", accessor: (r) => (r.sleeping || []).join(", ") },
  { key: "payment", label: "Payment", accessor: (r) => (r.payment || []).join(", ") },
  { key: "ac", label: "A/C" },
  { key: "shower", label: "Shower" },
  { key: "electrical", label: "Electrical" },
  { key: "heating", label: "Heating" },
  { key: "roads", label: "Roads" },
  { key: "leadSource", label: "Lead Source" },
  { key: "gclid", label: "GCLID" },
  { key: "utm_source", label: "UTM Source" },
  { key: "utm_medium", label: "UTM Medium" },
  { key: "utm_campaign", label: "UTM Campaign" },
  { key: "utm_term", label: "UTM Term" },
  { key: "utm_content", label: "UTM Content" },
  { key: "referrer", label: "Referrer" },
  { key: "landing_page", label: "Landing Page" },
  { key: "createdAt", label: "Submitted At", accessor: (r) => (r.createdAt ? new Date(r.createdAt).toLocaleString() : "") },
];

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
      toast.error("Failed to fetch inquiries.");
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

      toast.success("Status updated.");
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  const handleDelete = async (inquiry) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_URL}/inquery/${inquiry._id}`, { withCredentials: true });
    setInquiries((prev) => prev.filter((item) => item._id !== inquiry._id));
    if (selectedInquiry?._id === inquiry._id) setSelectedInquiry(null);
  };

  useEffect(() => {
    let data = [...inquiries];
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      data = data.filter(inq =>
        inq.name?.toLowerCase().includes(lower) ||
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

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (inq) => <div className="text-sm font-bold text-slate-800">{inq.name || "—"}</div>,
    },
    {
      key: "contact",
      label: "Contact Info",
      render: (inq) => (
        <>
          <div className="text-sm font-bold text-slate-800">{inq.email || "—"}</div>
          <div className="text-[11px] text-slate-400 font-medium">{inq.phone || "No Phone"}</div>
        </>
      ),
    },
    {
      key: "message",
      label: "Message Preview",
      hideOnMobile: true,
      render: (inq) => (
        <p className="text-sm text-slate-600 line-clamp-1 max-w-[300px] italic">
          {inq.message || "No message provided..."}
        </p>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (inq) => (
        <select
          value={inq.status}
          onChange={(e) => updateStatus(inq._id, e.target.value)}
          className="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer hover:text-blue-600"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      ),
    },
  ];

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
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-white border-none rounded-xl px-4 py-2.5 text-sm font-bold text-slate-600 outline-none shadow-sm">
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <AdminDataTable
        columns={columns}
        rows={filtered}
        rowKey={(inq) => inq._id}
        loading={loading}
        emptyMessage="No inquiries match your filters."
        renderActions={(inq) => (
          <button
            onClick={() => setSelectedInquiry(inq)}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
            title="View"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}
        onDelete={handleDelete}
        deleteMessage={(inq) => `Removing inquiry from ${inq.email || inq.name}. This cannot be undone.`}
        exportColumns={CSV_COLUMNS}
        exportFilename="client-inquiries"
      />

      {/* Modal Integration */}
      <Detail
        inquiry={selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
        onUpdateStatus={updateStatus}
      />
    </div>
  );
}
