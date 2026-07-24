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
  { key: "message", label: "Message" },
  { key: "vanTitle", label: "Van Title" },
  { key: "vanSlug", label: "Van Slug" },
  { key: "vanPrice", label: "Van Price", accessor: (r) => (r.vanPrice && Number(r.vanPrice) > 0 ? r.vanPrice : "Pricing Not Mentioned") },
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

export default function ContactListing() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/contact`, { withCredentials: true });
      setContacts(res.data.data);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to load contacts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (contact) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_URL}/contact/${contact._id}`, { withCredentials: true });
    setContacts((prev) => prev.filter((c) => c._id !== contact._id));
    if (selectedContact?._id === contact._id) setSelectedContact(null);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_URL}/contact/${id}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      setContacts((prev) => prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c)));
      if (selectedContact?._id === id) setSelectedContact((prev) => ({ ...prev, status: newStatus }));
      toast.success("Status updated.");
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  const filteredContacts = contacts
    .filter((c) => {
      const match =
        c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
      return match && (statusFilter === "All" || c.status === statusFilter);
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const columns = [
    {
      key: "contact",
      label: "Sender",
      render: (c) => (
        <>
          <div className="text-sm font-bold text-slate-800">{c.name}</div>
          <div className="text-[11px] text-slate-400 font-medium">{c.email}</div>
        </>
      ),
    },
    {
      key: "message",
      label: "Preview",
      hideOnMobile: true,
      render: (c) => <p className="text-sm text-slate-600 line-clamp-1 italic max-w-xs">{c.message}</p>,
    },
    {
      key: "leadSource",
      label: "Lead Source",
      hideOnMobile: true,
      render: (c) => <span className="text-xs font-bold text-slate-500">{c.leadSource}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (c) => (
        <select
          value={c.status}
          onChange={(e) => handleStatusChange(c._id, e.target.value)}
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
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Contact Messages</h1>
          <p className="text-sm text-slate-500 font-medium">Manage generic website inquiries</p>
        </div>
        <button
          onClick={fetchContacts}
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
        rows={filteredContacts}
        rowKey={(c) => c._id}
        loading={loading}
        emptyMessage="No contact messages found."
        renderActions={(c) => (
          <button
            onClick={() => setSelectedContact(c)}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
            title="View"
          >
            <Eye size={16} />
          </button>
        )}
        onDelete={handleDelete}
        deleteMessage={(c) => `Delete the message from "${c.name}"? This cannot be undone.`}
        exportColumns={CSV_COLUMNS}
        exportFilename="contact-messages"
      />

      <Detail contact={selectedContact} onClose={() => setSelectedContact(null)} onStatusChange={handleStatusChange} />
    </div>
  );
}
