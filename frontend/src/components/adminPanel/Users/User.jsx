"use client";
import React, { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { deleteUser } from "@/api/user/deleteUser.js";
import { updateUser } from "@/api/user/updateUser.js";
import { getUser } from "@/api/user/getUser.js";
import AdminDataTable from "../shared/AdminDataTable";
import Detail from "./Detail.jsx";
import { Search, Filter, Eye } from "lucide-react"; // Icons ke liye

const STATUS_OPTIONS = ["New", "Contacted", "In Progress", "Closed Won", "Closed Lost"];

const CSV_COLUMNS = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "status", label: "Status" },
  { key: "model", label: "Model", accessor: (r) => r.model?.id || "" },
  { key: "layout", label: "Layout", accessor: (r) => r.model?.layout || "" },
  { key: "parts", label: "Selected Parts", accessor: (r) => (r.parts || []).map((p) => p.label).join(", ") },
  { key: "notes", label: "Notes" },
  { key: "followUpDate", label: "Follow Up Date", accessor: (r) => (r.followUpDate ? new Date(r.followUpDate).toLocaleDateString() : "") },
  { key: "createdAt", label: "Submitted At", accessor: (r) => (r.createdAt ? new Date(r.createdAt).toLocaleString() : "") },
];

export default function UsersData() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // New States for Search and Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUser();
      setUsers(response.data);
    } catch (error) {
      console.warn(error.message);
      toast.error("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter Logic: Search name/email aur Status ke base par
  const filteredUsers = useMemo(() => {
    return (users || []).filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [users, searchQuery, statusFilter]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const data = await updateUser(id, newStatus);
      if (data.status === 200) {
        setUsers((prev) => prev.map((u) => u._id === id ? { ...u, status: newStatus } : u));
        setSelectedUser((prev) => prev ? { ...prev, status: newStatus } : null);
        toast.success("Status updated.");
      }
    } catch (err) {
      toast.error("Failed to update status.");
    }
  };

  const handleDelete = async (user) => {
    await deleteUser(user._id);
    setUsers((prev) => prev.filter((u) => u._id !== user._id));
    if (selectedUser?._id === user._id) closeModal();
  };

  const openModal = (user) => { setSelectedUser(user); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setSelectedUser(null); };

  const getStatusColor = (status) => {
    switch (status) {
      case "New": return { bg: "bg-blue-100", text: "text-blue-800", dot: "bg-blue-500" };
      case "Contacted": return { bg: "bg-amber-100", text: "text-amber-800", dot: "bg-amber-500" };
      case "In Progress": return { bg: "bg-purple-100", text: "text-purple-800", dot: "bg-purple-500" };
      case "Closed Won": return { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-500" };
      case "Closed Lost": return { bg: "bg-red-100", text: "text-red-800", dot: "bg-red-500" };
      default: return { bg: "bg-gray-100", text: "text-gray-800", dot: "bg-gray-500" };
    }
  };

  const columns = [
    {
      key: "profile",
      label: "User Profile",
      render: (user) => (
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 shrink-0 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-slate-200 group-hover:scale-105 transition-transform">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-bold text-slate-800 text-sm">{user.name}</div>
            <div className="text-[10px] text-slate-400 font-medium tracking-tight">ID: {user._id.slice(-6)}</div>
          </div>
        </div>
      ),
    },
    {
      key: "contact",
      label: "Contact Info",
      render: (user) => (
        <div className="flex flex-col">
          <a href={`mailto:${user.email}`} className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">
            {user.email}
          </a>
          <span className="text-xs text-slate-500 font-medium mt-0.5">{user.phone || "—"}</span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Lead Status",
      hideOnMobile: true,
      render: (user) => {
        const statusColors = getStatusColor(user.status);
        return (
          <div className={`inline-flex items-center px-3 py-1 rounded-xl border text-[10px] font-black uppercase tracking-wider ${statusColors.bg} ${statusColors.text} border-current/10`}>
            <span className={`h-1.5 w-1.5 rounded-full mr-2 ${statusColors.dot} animate-pulse`}></span>
            {user.status}
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">User Management</h1>
          <p className="text-sm text-slate-500 font-medium">
            Administration Console &bull; {filteredUsers?.length || 0} Showing
          </p>
        </div>
      </div>

      {/* Search and Filter Area */}
      <div className="flex flex-wrap gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-none rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border-none rounded-xl pl-9 pr-4 py-2.5 text-sm font-bold text-slate-600 outline-none shadow-sm appearance-none cursor-pointer"
          >
            <option value="All">All Status</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <AdminDataTable
        columns={columns}
        rows={filteredUsers}
        rowKey={(user) => user._id}
        loading={loading}
        emptyMessage="No users match your criteria."
        renderActions={(user) => (
          <button
            onClick={() => openModal(user)}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
            title="View"
          >
            <Eye size={16} />
          </button>
        )}
        onDelete={handleDelete}
        deleteMessage={(user) => `Delete the user record for "${user.name}"? This cannot be undone.`}
        exportColumns={CSV_COLUMNS}
        exportFilename="users"
      />

      <Detail user={selectedUser} isOpen={isModalOpen} onClose={closeModal} onStatusChange={handleStatusChange} />
    </div>
  );
}
