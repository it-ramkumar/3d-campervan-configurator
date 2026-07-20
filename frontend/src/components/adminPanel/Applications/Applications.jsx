"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
    User,
    Mail,
    Briefcase,
    Search,
    Download,
} from "lucide-react";
import toast from "react-hot-toast";
import AdminDataTable from "../shared/AdminDataTable";

const CSV_COLUMNS = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "position", label: "Position", accessor: (r) => r.jobId?.title || "" },
    { key: "status", label: "Status", accessor: (r) => r.status || "Pending" },
    { key: "resume", label: "Resume URL" },
    { key: "appliedAt", label: "Applied At", accessor: (r) => (r.appliedAt ? new Date(r.appliedAt).toLocaleString() : "") },
];

const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
        case "approved":
            return "bg-green-50 text-green-700 border-green-100";
        case "rejected":
            return "bg-red-50 text-red-700 border-red-100";
        default:
            return "bg-amber-50 text-amber-700 border-amber-100";
    }
};

const Applications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = () => {
        setLoading(true);
        axios
            .get(`${process.env.NEXT_PUBLIC_URL}/applications`)
            .then((res) => setApplications(Array.isArray(res.data) ? res.data : []))
            .catch((err) => {
                console.error(err);
                toast.error("Failed to load applications.");
            })
            .finally(() => setLoading(false));
    };

    const handleDelete = async (app) => {
        await axios.delete(`${process.env.NEXT_PUBLIC_URL}/applications/${app._id}`, { withCredentials: true });
        setApplications((prev) => prev.filter((a) => a._id !== app._id));
    };

    const filteredApplications = applications.filter((app) =>
        app.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.jobId?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        {
            key: "applicant",
            label: "Applicant",
            render: (app) => (
                <>
                    <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                        <User size={14} className="text-blue-600" /> {app.name}
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5 mt-0.5">
                        <Mail size={12} /> {app.email}
                    </div>
                </>
            ),
        },
        {
            key: "position",
            label: "Position",
            render: (app) => (
                <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-600">
                    <Briefcase size={14} className="text-blue-600" />
                    {app.jobId?.title || "Position Unavailable"}
                </span>
            ),
        },
        {
            key: "appliedAt",
            label: "Applied",
            hideOnMobile: true,
            render: (app) => (
                <span className="text-xs text-slate-400 font-medium">
                    {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "—"}
                </span>
            ),
        },
        {
            key: "status",
            label: "Status",
            render: (app) => (
                <span className={`text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-widest border ${getStatusStyle(app.status)}`}>
                    {app.status || "Pending"}
                </span>
            ),
        },
    ];

    return (
        <div className="max-w-6xl mx-auto mt-8 px-4 sm:px-6 mb-20 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
                    Received Applications
                </h1>
                <p className="text-gray-500 mt-1">Review candidate profiles and download CVs.</p>
            </div>

            {/* Search Bar */}
            <div className="flex flex-wrap gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                <div className="relative flex-1 min-w-[220px]">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search by name, email, or position..."
                        className="w-full bg-white border-none rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <AdminDataTable
                columns={columns}
                rows={filteredApplications}
                rowKey={(app) => app._id}
                loading={loading}
                emptyMessage="No applications yet. New applications will appear here once submitted."
                renderActions={(app) =>
                    app.resume && (
                        <a
                            // encodeURIComponent handles the spaces in the filename
                            href={app.resume.includes(' ') ? encodeURI(app.resume) : app.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            // Adding the 'download' attribute helps some browsers trigger a save dialog
                            download={`CV_${app.name.replace(/\s+/g, '_')}.pdf`}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
                            title="Download CV"
                        >
                            <Download size={16} />
                        </a>
                    )
                }
                onDelete={handleDelete}
                deleteMessage={(app) => `Remove the application from "${app.name}"? This cannot be undone.`}
                exportColumns={CSV_COLUMNS}
                exportFilename="job-applications"
            />
        </div>
    );
};

export default Applications;
