"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function InqueryListing() {
  const [inquiries, setInquiries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedInquiry, setSelectedInquiry] = useState(null);

// ✅ Fetch all inquiries
const fetchInquiries = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}/inquery`,
      { withCredentials: true } // 👈 send cookies
    );

    const data = res.data.data || res.data;
    setInquiries(data);
    setFiltered(data);
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to fetch inquiries',
      timer: 3000,
      showConfirmButton: false
    });
  } finally {
    setLoading(false);
  }
};

// ✅ Update status
const updateStatus = async (id, newStatus) => {
  try {
    await axios.put(
      `${import.meta.env.VITE_REACT_APP_API_URL}/inquery/${id}/status`,
      { status: newStatus },
      { withCredentials: true } // 👈 send cookies
    );

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: 'Status updated successfully',
      timer: 2000,
      showConfirmButton: false
    });

    fetchInquiries();
  } catch (error) {
    console.error("Error updating status:", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to update status',
      timer: 3000,
      showConfirmButton: false
    });
  }
};

// ✅ Delete inquiry
const deleteInquiry = async (id, email) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: `You are about to delete inquiry from ${email}. This action cannot be undone!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
    reverseButtons: true
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(
        `${import.meta.env.VITE_REACT_APP_API_URL}/inquery/${id}`,
        { withCredentials: true } // 👈 send cookies
      );

      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Inquiry has been deleted successfully',
        timer: 2000,
        showConfirmButton: false
      });

      fetchInquiries();
      if (selectedInquiry && selectedInquiry._id === id) {
        setSelectedInquiry(null);
      }
    } catch (error) {
      console.error("Error deleting inquiry:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete inquiry',
        timer: 3000,
        showConfirmButton: false
      });
    }
  }
};

  // ✅ Filter and sort logic
  useEffect(() => {
    let data = inquiries;

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      data = data.filter(
        (inq) =>
          (inq.email && inq.email.toLowerCase().includes(lower)) ||
          (inq.phone && inq.phone.toLowerCase().includes(lower)) ||
          (inq.budget && inq.budget.toLowerCase().includes(lower)) ||
          (inq.message && inq.message.toLowerCase().includes(lower))
      );
    }

    if (statusFilter !== "All") {
      data = data.filter(
        (inq) => inq.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Sort the data
    data = data.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case "oldest":
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        case "email":
          return (a.email || '').localeCompare(b.email || '');
        case "status":
          return (a.status || '').localeCompare(b.status || '');
        default:
          return 0;
      }
    });

    setFiltered(data);
  }, [searchTerm, statusFilter, sortBy, inquiries]);

  useEffect(() => {
    fetchInquiries();
  }, []);

  // ✅ Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      "New": { color: "bg-blue-100 text-blue-800 border-blue-200", dot: "bg-blue-500" },
      "Contacted": { color: "bg-purple-100 text-purple-800 border-purple-200", dot: "bg-purple-500" },
      "In Progress": { color: "bg-yellow-100 text-yellow-800 border-yellow-200", dot: "bg-yellow-500" },
      "Closed": { color: "bg-green-100 text-green-800 border-green-200", dot: "bg-green-500" }
    };

    const config = statusConfig[status] || statusConfig["New"];

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${config.color}`}>
        <span className={`w-2 h-2 rounded-full mr-2 ${config.dot}`}></span>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg font-medium">Loading inquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Client Inquiries
          </h1>
          <p className="text-gray-600">
            Manage and respond to client inquiries efficiently
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <span className="text-blue-600 text-xl">📩</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
                <p className="text-2xl font-bold text-gray-900">{inquiries.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <span className="text-blue-600 text-xl">🆕</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">New</p>
                <p className="text-2xl font-bold text-gray-900">
                  {inquiries.filter(inq => inq.status === "New").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
            <div className="flex items-center">
              <div className="rounded-full bg-yellow-100 p-3 mr-4">
                <span className="text-yellow-600 text-xl">🔄</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {inquiries.filter(inq => inq.status === "In Progress").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <span className="text-green-600 text-xl">✅</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Closed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {inquiries.filter(inq => inq.status === "Closed").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm border mb-6 p-6">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:flex-none">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by email, phone, budget, or message..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-48"
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-48"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="email">By Email</option>
                <option value="status">By Status</option>
              </select>
            </div>

            <button
              onClick={fetchInquiries}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {/* Inquiries Table */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== "All"
                ? "Try adjusting your search or filter criteria"
                : "No inquiries have been received yet"}
            </p>
            {(searchTerm || statusFilter !== "All") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("All");
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Budget
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filtered.map((inq) => (
                    <tr
                      key={inq._id}
                      className="hover:bg-gray-50 transition duration-150 cursor-pointer group"
                      onClick={() => setSelectedInquiry(inq)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                            {inq.email || "—"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {inq.phone || "No phone"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 truncate max-w-xs">
                          {inq.message || "No message provided"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          {inq.budget || "—"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div onClick={(e) => e.stopPropagation()}>
                          <select
                            value={inq.status}
                            onChange={(e) => updateStatus(inq._id, e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => setSelectedInquiry(inq)}
                            className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-lg transition duration-200"
                          >
                            View
                          </button>
                          <button
                            onClick={() => deleteInquiry(inq._id, inq.email)}
                            className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-lg transition duration-200"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Showing {filtered.length} of {inquiries.length} inquiries</p>
        </div>

        {/* Modal for Full Details */}
        {selectedInquiry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-2xl shadow-2xl transform transition-all">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Inquiry Details</h2>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="text-gray-400 hover:text-gray-600 transition duration-200 p-2 hover:bg-gray-100 rounded-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500 block mb-1">Email</label>
                    <p className="text-lg text-gray-900 font-medium">{selectedInquiry.email || "—"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 block mb-1">Phone</label>
                    <p className="text-lg text-gray-900 font-medium">{selectedInquiry.phone || "—"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 block mb-1">Budget</label>
                    <p className="text-lg text-gray-900 font-medium">{selectedInquiry.budget || "—"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 block mb-1">Status</label>
                    <div className="mt-1">
                      <StatusBadge status={selectedInquiry.status} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-3">Message</label>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {selectedInquiry.message || "No message provided"}
                    </p>
                  </div>
                </div>

                {selectedInquiry.createdAt && (
                  <div className="text-sm text-gray-500 border-t border-gray-200 pt-4">
                    Received on {new Date(selectedInquiry.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition duration-200"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const newStatus = selectedInquiry.status === "Closed" ? "New" : "Closed";
                    updateStatus(selectedInquiry._id, newStatus);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                    selectedInquiry.status === "Closed"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  {selectedInquiry.status === "Closed" ? "Reopen" : "Mark Closed"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}