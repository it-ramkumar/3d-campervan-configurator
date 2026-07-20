"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import {
  Plus,
  MapPin,
  Briefcase,
  Search,
  Edit3
} from "lucide-react";
import toast from "react-hot-toast";
import { setEditData, clearEditData } from "@/redux/slices/editData";
import { useDispatch } from "react-redux";
import AdminDataTable from "../shared/AdminDataTable";

const STATUS_STYLES = {
  active: "bg-green-50 text-green-700 border-green-100",
  closed: "bg-slate-100 text-slate-500 border-slate-200",
  draft: "bg-amber-50 text-amber-700 border-amber-100",
};

const CSV_COLUMNS = [
  { key: "title", label: "Title" },
  { key: "department", label: "Department" },
  { key: "location", label: "Location" },
  { key: "type", label: "Type" },
  { key: "experienceLevel", label: "Experience Level" },
  { key: "workMode", label: "Work Mode" },
  { key: "salaryMin", label: "Salary Min" },
  { key: "salaryMax", label: "Salary Max" },
  { key: "vacancies", label: "Vacancies" },
  { key: "status", label: "Status" },
  { key: "createdAt", label: "Posted At", accessor: (r) => (r.createdAt ? new Date(r.createdAt).toLocaleString() : "") },
];

const Jobs = ({ setSelected }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    setLoading(true);
    axios.get(`${process.env.NEXT_PUBLIC_URL}/jobs`)
      .then(res => {
        setJobs(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        toast.error("Failed to load jobs.");
        setLoading(false);
      });
  };

  const handleDelete = async (job) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_URL}/jobs/${job._id}`, { withCredentials: true });
    setJobs(prev => prev.filter(j => j._id !== job._id));
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (job) => {
    const toastId = toast.loading("Preparing editor...");
    dispatch(setEditData(job));
    setSelected("career-form");
    setTimeout(() => toast.dismiss(toastId), 500);
  };

  const columns = [
    {
      key: "title",
      label: "Position",
      render: (job) => (
        <div>
          <Link
            href={`/careers/${job._id}`}
            className="text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors inline-block"
          >
            {job.title}
          </Link>
          <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
            {job.department || "General"}
          </div>
        </div>
      ),
    },
    {
      key: "location",
      label: "Location",
      hideOnMobile: true,
      render: (job) => (
        <span className="flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin size={14} /> {job.location || "—"}
        </span>
      ),
    },
    {
      key: "type",
      label: "Type",
      hideOnMobile: true,
      render: (job) => (
        <span className="flex items-center gap-1.5 text-sm text-slate-500">
          <Briefcase size={14} /> {job.type || "—"}
        </span>
      ),
    },
    {
      key: "salary",
      label: "Salary",
      hideOnMobile: true,
      render: (job) =>
        job.salaryMin ? (
          <span className="text-sm text-green-600 font-semibold">
            ${job.salaryMin} - ${job.salaryMax}
          </span>
        ) : (
          <span className="text-sm text-slate-400">—</span>
        ),
    },
    {
      key: "status",
      label: "Status",
      render: (job) => (
        <span className={`text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-widest border ${STATUS_STYLES[job.status] || STATUS_STYLES.draft}`}>
          {job.status || "draft"}
        </span>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4 sm:px-6 mb-20 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
            Job Management
          </h1>
          <p className="text-gray-500 mt-1">Manage and monitor all active career openings.</p>
        </div>

        <button
          onClick={() => {
            setSelected("career-form")
            dispatch(clearEditData());
          }}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-100"
        >
          <Plus className="w-5 h-5" />
          Add New Job
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex flex-wrap gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search by job title or department..."
            className="w-full bg-white border-none rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <AdminDataTable
        columns={columns}
        rows={filteredJobs}
        rowKey={(job) => job._id}
        loading={loading}
        emptyMessage="No jobs found."
        renderActions={(job) => (
          <button
            onClick={() => handleEdit(job)}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
            title="Edit"
          >
            <Edit3 size={16} />
          </button>
        )}
        onDelete={handleDelete}
        deleteMessage={(job) => `Delete the "${job.title}" position? This cannot be undone.`}
        exportColumns={CSV_COLUMNS}
        exportFilename="job-postings"
      />
    </div>
  );
};

export default Jobs;
