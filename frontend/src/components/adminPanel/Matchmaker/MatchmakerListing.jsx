"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, RefreshCcw, Eye } from "lucide-react";
import toast from "react-hot-toast";
import AdminDataTable from "../shared/AdminDataTable";
import Detail from "./Detail";

const STATUS_OPTIONS = ["New", "In Progress", "Resolved"];

const CSV_COLUMNS = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "van_length", label: "Van Length" },
  { key: "passengers", label: "Passengers" },
  { key: "bathroom_required", label: "Bathroom Required" },
  { key: "battery_ac_required", label: "Battery/AC Required" },
  { key: "no_match_found", label: "No Match Found", accessor: (r) => (r.no_match_found ? "Yes" : "No") },
  { key: "primary_match", label: "Matched Build", accessor: (r) => r.primary_match?.title || "" },
  { key: "alternatives", label: "Alternative Builds", accessor: (r) => (r.alternatives || []).map((a) => a?.title || "").filter(Boolean).join(", ") },
  { key: "status", label: "Status" },
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
      toast.error("Failed to load matchmaker leads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDelete = async (lead) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_URL}/recommend/${lead._id}`, { withCredentials: true });
    setLeads((prev) => prev.filter((l) => l._id !== lead._id));
    if (selectedLead?._id === lead._id) setSelectedLead(null);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_URL}/recommend/${id}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      setLeads((prev) => prev.map((l) => (l._id === id ? { ...l, status: newStatus } : l)));
      if (selectedLead?._id === id) setSelectedLead((prev) => ({ ...prev, status: newStatus }));
      toast.success("Status updated.");
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  const filteredLeads = leads
    .filter((l) => {
      const match = l.name.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase());
      return match && (statusFilter === "All" || l.status === statusFilter);
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const columns = [
    {
      key: "contact",
      label: "Contact",
      render: (l) => (
        <>
          <div className="text-sm font-bold text-slate-800">{l.name}</div>
          <div className="text-[11px] text-slate-400 font-medium">{l.email}</div>
        </>
      ),
    },
    {
      key: "preferences",
      label: "Preferences",
      hideOnMobile: true,
      render: (l) => (
        <p className="text-sm text-slate-600 max-w-xs">
          {l.passengers}+ pax · {l.van_length.replace(/_/g, " ")}
        </p>
      ),
    },
    {
      key: "match",
      label: "Matched Build",
      hideOnMobile: true,
      render: (l) => (
        <p className="text-sm text-slate-600 line-clamp-1 italic max-w-xs">
          {l.no_match_found ? "No match — custom build" : l.primary_match?.title || "—"}
        </p>
      ),
    },
    {
      key: "leadSource",
      label: "Lead Source",
      hideOnMobile: true,
      render: (l) => <span className="text-xs font-bold text-slate-500">{l.leadSource}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (l) => (
        <select
          value={l.status}
          onChange={(e) => handleStatusChange(l._id, e.target.value)}
          className="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer"
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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Matchmaker Leads</h1>
          <p className="text-sm text-slate-500 font-medium">View quiz submissions and their matched builds</p>
        </div>
        <button
          onClick={fetchLeads}
          className="self-start sm:self-auto p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-sm"
        >
          <RefreshCcw size={20} className="text-slate-600" />
        </button>
      </div>

      {/* Filters Area */}
      <div className="flex flex-wrap gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full bg-white border-none rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white border-none rounded-xl px-4 py-2 text-sm font-bold text-slate-600 outline-none shadow-sm"
        >
          <option value="All">All Status</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <AdminDataTable
        columns={columns}
        rows={filteredLeads}
        rowKey={(l) => l._id}
        loading={loading}
        emptyMessage="No matchmaker leads found."
        renderActions={(l) => (
          <button
            onClick={() => setSelectedLead(l)}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
            title="View"
          >
            <Eye size={16} />
          </button>
        )}
        onDelete={handleDelete}
        deleteMessage={(l) => `Delete the matchmaker lead from "${l.name}"? This cannot be undone.`}
        exportColumns={CSV_COLUMNS}
        exportFilename="matchmaker-leads"
      />

      <Detail lead={selectedLead} onClose={() => setSelectedLead(null)} onStatusChange={handleStatusChange} />
    </div>
  );
}
