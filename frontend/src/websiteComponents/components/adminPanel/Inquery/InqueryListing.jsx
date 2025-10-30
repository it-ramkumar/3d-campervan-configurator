"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function InqueryListing() {
  const [inquiries, setInquiries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // ✅ Fetch all inquiries
  const fetchInquiries = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/inquery`);
      const data = res.data.data || res.data; // handle both formats
      setInquiries(data);
      setFiltered(data);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update status
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/inquery/${id}/status`, {
        status: newStatus,
      });
      fetchInquiries(); // Refresh list
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // ✅ Filter logic
  useEffect(() => {
    let data = inquiries;

    // Apply search filter
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      data = data.filter(
        (inq) =>
          (inq.email && inq.email.toLowerCase().includes(lower)) ||
          (inq.phone && inq.phone.toLowerCase().includes(lower)) ||
          (inq.budget && inq.budget.toLowerCase().includes(lower))
      );
    }

    // Apply status filter
    if (statusFilter !== "All") {
      data = data.filter(
        (inq) => inq.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    setFiltered(data);
  }, [searchTerm, statusFilter, inquiries]);

  useEffect(() => {
    fetchInquiries();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading inquiries...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Client Inquiries</h1>

      {/* 🔍 Search + Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by email, phone, or budget..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full md:w-1/2"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full md:w-1/4"
        >
          <option value="All">All Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {/* 📋 Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 border-b text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Budget</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No inquiries found.
                </td>
              </tr>
            ) : (
              filtered.map((inq) => (
                <tr
                  key={inq._id}
                  className="border-b hover:bg-gray-50 transition-all"
                >
                  <td className="px-4 py-3">{inq.email || "—"}</td>
                  <td className="px-4 py-3">{inq.phone || "—"}</td>
                  <td className="px-4 py-3">{inq.budget || "—"}</td>
                  <td className="px-4 py-3 font-semibold capitalize text-blue-600">
                    {inq.status}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <select
                      className="border rounded-lg px-2 py-1"
                      value={inq.status}
                      onChange={(e) =>
                        updateStatus(inq._id, e.target.value)
                      }
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
