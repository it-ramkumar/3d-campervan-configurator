"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminDataTable from "../shared/AdminDataTable";

const CSV_COLUMNS = [
  { key: "email", label: "Email" },
  { key: "ipAddress", label: "IP Address" },
  { key: "userAgent", label: "User Agent" },
  { key: "createdAt", label: "Captured At", accessor: (r) => (r.createdAt ? new Date(r.createdAt).toLocaleString() : "") },
];

const EmailManager = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all emails
  const fetchEmails = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/emails`, {
        withCredentials: true,
      });
      if (res.data.success) setEmails(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load emails.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  // Submit email
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/emails`,
        { email },
        { withCredentials: true }
      );
      if (res.data.success) {
        setStatus("Email saved successfully!");
        toast.success("Email saved successfully!");
        setEmail("");
        fetchEmails(); // refresh list
      }
    } catch (err) {
      const message = err.response?.data?.message || "Server error, try again later";
      setStatus(message);
      toast.error(message);
    }
  };

  // Delete email (confirmation handled by AdminDataTable's built-in ConfirmDialog)
  const deleteEmail = async (row) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_URL}/emails/${row._id}`, {
      withCredentials: true,
    });
    setEmails((prev) => prev.filter((e) => e._id !== row._id));
  };

  const columns = [
    {
      key: "email",
      label: "Email",
      render: (row) => <span className="text-sm font-bold text-slate-800">{row.email}</span>,
    },
    {
      key: "createdAt",
      label: "Captured At",
      hideOnMobile: true,
      render: (row) => (
        <span className="text-xs font-medium text-slate-500">
          {row.createdAt ? new Date(row.createdAt).toLocaleString() : "—"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Lead Emails</h1>
        <p className="text-sm text-slate-500 font-medium">Manually add emails or manage captured leads</p>
      </div>

      {/* Add Email Form */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6 space-y-4">
        <h2 className="text-sm font-black uppercase text-slate-400 tracking-widest">Add Email</h2>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all"
          >
            Submit
          </button>
        </form>
        {status && <p className="text-sm text-slate-500 font-medium">{status}</p>}
      </div>

      {/* Email List */}
      <AdminDataTable
        columns={columns}
        rows={emails}
        rowKey={(row) => row._id}
        loading={loading}
        emptyMessage="No emails found."
        onDelete={deleteEmail}
        deleteMessage={(row) => `Delete the email "${row.email}"? This cannot be undone.`}
        exportColumns={CSV_COLUMNS}
        exportFilename="lead-emails"
      />
    </div>
  );
};

export default EmailManager;
