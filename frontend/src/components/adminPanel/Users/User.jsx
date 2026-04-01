import React, { useState, useEffect, useMemo } from "react";
import { deleteUser } from "@/api/user/deleteUser.js";
import Swal from "sweetalert2";
import { updateUser } from "@/api/user/updateUser.js";
import { getUser } from "@/api/user/getUser.js";
import Detail from "./Detail.jsx";
import { Search, Filter, Eye } from "lucide-react"; // Icons ke liye

export default function UsersData() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);

  // New States for Search and Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getUser();
        setUsers(response.data);
      } catch (error) {
        console.warn(error.message);
      }
    };
    fetch();
  }, []);

  // Filter Logic: Search name/email aur Status ke base par
  const filteredUsers = useMemo(() => {
    return users?.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [users, searchQuery, statusFilter]);

  // Rest of your functions (handleStatusChange, deleteById, etc.) remain same...
  const handleStatusChange = async (id, newStatus) => {
    try {
      const data = await updateUser(id, newStatus);
      if (data.status === 200) {
        setUsers((prev) => prev.map((u) => u._id === id ? { ...u, status: newStatus } : u));
        setSelectedUser((prev) => prev ? { ...prev, status: newStatus } : null);
        Swal.fire({ title: "Updated!", icon: "success", timer: 1500, showConfirmButton: false });
      }
    } catch (err) {
      Swal.fire("Error!", "Failed to update status.", "error");
    }
  };

  const deleteById = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      setUsers(users.filter((u) => u._id !== id));
      try { await deleteUser(id); } catch (error) { console.error(error); }
    }
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

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase">
              User Management
            </h2>
            <p className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase mt-1">
              Administration Console • {filteredUsers?.length || 0} Showing
            </p>
          </div>

          {/* Search and Filter UI */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
              />
            </div>

            {/* Status Filter Dropdown */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-9 pr-8 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-wider text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer shadow-sm"
              >
                <option value="All">All Status</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed Won">Closed Won</option>
                <option value="Closed Lost">Closed Lost</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table Container - Map filteredUsers instead of users */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-left">
                  <th className="py-6 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">User Profile</th>
                  <th className="py-6 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Info</th>
                  <th className="py-6 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lead Status</th>
                  <th className="py-6 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredUsers?.length > 0 ? (
                  filteredUsers.map((user) => {
                    const statusColors = getStatusColor(user.status);
                    return (
                      <tr key={user._id} className="hover:bg-slate-50/50 transition-all group">
                        <td className="py-5 px-8">
                          <div className="flex items-center gap-4">
                            <div className="h-11 w-11 shrink-0 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-slate-200 group-hover:scale-105 transition-transform">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-bold text-slate-800 text-sm">{user.name}</div>
                              <div className="text-[10px] text-slate-400 font-medium tracking-tight">ID: {user._id.slice(-6)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-8">
                          <div className="flex flex-col">
                            <a href={`mailto:${user.email}`} className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">
                              {user.email}
                            </a>
                            <span className="text-xs text-slate-500 font-medium mt-0.5">{user.phone || "—"}</span>
                          </div>
                        </td>
                        <td className="py-5 px-8">
                          <div className={`inline-flex items-center px-3 py-1 rounded-xl border text-[10px] font-black uppercase tracking-wider ${statusColors.bg} ${statusColors.text} border-current/10`}>
                            <span className={`h-1.5 w-1.5 rounded-full mr-2 ${statusColors.dot} animate-pulse`}></span>
                            {user.status}
                          </div>
                        </td>
                        <td className="py-5 px-8 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => openModal(user)} className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-100 hover:bg-blue-50 transition-all active:scale-90 shadow-sm">  <Eye size={16} /></button>
                            <button onClick={() => deleteById(user._id)} className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-red-600 hover:border-red-100 hover:bg-red-50 transition-all active:scale-90 shadow-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4" className="py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
                      No users match your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <Detail user={selectedUser} isOpen={isModalOpen} onClose={closeModal} onStatusChange={handleStatusChange} />
      </div>
    </div>
  );
}