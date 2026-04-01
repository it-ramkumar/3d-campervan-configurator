import { useEffect, useState } from "react";
import axios from "axios";
import {
    User,
    Mail,
    Briefcase,
    Calendar,
    Download,
    Trash2,
    Loader2,
    FileText,
    Clock,
    CheckCircle2,
    XCircle
} from "lucide-react";

const Applications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = () => {
        setLoading(true);
        axios
            .get(`${process.env.NEXT_PUBLIC_URL}/applications`)
            .then((res) => setApplications(Array.isArray(res.data) ? res.data : []))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    };

    const handleDelete = async (id, name) => {
        if (window.confirm(`Are you sure you want to remove the application from ${name}?`)) {
            try {
                await axios.delete(`${process.env.NEXT_PUBLIC_URL}/applications/${id}`);
                setApplications(prev => prev.filter(app => app._id !== id));
            } catch (err) {
                console.error("Delete error:", err);
                alert("Failed to delete application.");
            }
        }
    };

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

    return (
        <div className="max-w-6xl mx-auto mt-8 px-4 sm:px-6 mb-20">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
                    Received Applications
                </h1>
                <p className="text-gray-500 mt-1">Review candidate profiles and download CVs.</p>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
                    <p className="text-gray-500 font-medium animate-pulse text-sm uppercase tracking-widest">
                        Fetching Applicants...
                    </p>
                </div>
            ) : applications.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-900">No applications yet</h3>
                    <p className="text-gray-500">New applications will appear here once submitted.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {applications.map((app) => (
                        <div
                            key={app._id}
                            className="group bg-white border border-gray-100 rounded-2xl p-6 hover:border-blue-300 hover:shadow-md transition-all relative overflow-hidden"
                        >
                            {/* Vertical Status Line */}
                            <div className={`absolute top-0 left-0 w-1.5 h-full ${app.status === "approved" ? "bg-green-500" :
                                    app.status === "rejected" ? "bg-red-500" : "bg-amber-500"
                                }`} />

                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className={`text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-widest border ${getStatusStyle(app.status)}`}>
                                            {app.status || "Pending"}
                                        </span>
                                        <span className="text-xs text-gray-400 flex items-center gap-1 font-medium">
                                            <Clock className="w-3 h-3" /> {new Date(app.appliedAt).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                        <User className="w-5 h-5 text-blue-600" /> {app.name}
                                    </h2>

                                    <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
                                        <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                            <Mail className="w-4 h-4 text-gray-400" /> {app.email}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                                            <Briefcase className="w-4 h-4 text-blue-600" />
                                            {app.jobId?.title || "Position Unavailable"}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-3 border-t lg:border-t-0 pt-4 lg:pt-0">
                                    {app.resume && (
                                        <a
                                            // encodeURIComponent handles the spaces in the filename
                                            href={app.resume.includes(' ') ? encodeURI(app.resume) : app.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-all"
                                            // Adding the 'download' attribute helps some browsers trigger a save dialog
                                            download={`CV_${app.name.replace(/\s+/g, '_')}.pdf`}
                                        >
                                            <Download className="w-4 h-4" /> Download CV
                                        </a>
                                    )}
                                    <button
                                        onClick={() => handleDelete(app._id, app.name)}
                                        className="flex items-center gap-2 px-4 py-2.5 text-red-500 hover:bg-red-50 rounded-xl font-bold text-sm transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Applications;