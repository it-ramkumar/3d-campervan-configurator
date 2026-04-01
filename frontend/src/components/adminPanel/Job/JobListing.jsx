import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import {
  Plus,
  MapPin,
  Briefcase,
  Search,
  Filter,
  ChevronRight,
  DollarSign,
  Loader2,
  Trash2,
  Edit3
} from "lucide-react";
import { setEditData,clearEditData } from "@/redux/slices/editData";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

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
        setLoading(false);
      });
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete the "${title}" position?`)) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_URL}/jobs/${id}`);
        // Update local state to remove the deleted job
        setJobs(prev => prev.filter(job => job._id !== id));
      } catch (err) {
        console.error("Delete error:", err);
        alert("Failed to delete the job. Please try again.");
      }
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleEdit = (job) => {
    Swal.fire({
      title: "Preparing Editor...",
      didOpen: () => Swal.showLoading(),
      allowOutsideClick: false,
    });
    dispatch(setEditData(job));
    setSelected("career-form");
    setTimeout(() => Swal.close(), 500);
  };
  return (
    <div className="max-w-6xl mx-auto mt-8 px-4 sm:px-6 mb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
            Job Management
          </h1>
          <p className="text-gray-500 mt-1">Manage and monitor all active career openings.</p>
        </div>

        <button
          onClick={() => {setSelected("career-form")
            dispatch(clearEditData());
          }}
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-100"
        >
        <Plus className="w-5 h-5" />
        Add New Job
      </button>
    </div>

      {/* Search Bar */ }
  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-8">
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search by job title or department..."
        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  </div>

  {
    loading ? (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-500 animate-pulse">Syncing jobs database...</p>
      </div>
    ) : filteredJobs.length === 0 ? (
      <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
        <Briefcase className="w-8 h-8 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-gray-900">No jobs found</h3>
      </div>
    ) : (
      <div className="grid gap-4">
        {filteredJobs.map(job => (
          <div
            key={job._id}
            className="group bg-white border border-gray-100 rounded-2xl p-5 hover:border-blue-300 hover:shadow-md transition-all relative overflow-hidden"
          >
            <div className={`absolute top-0 left-0 w-1.5 h-full ${job.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`} />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded uppercase tracking-wider">
                    {job.department || "General"}
                  </span>
                </div>

                {/* Title linked to Preview */}
                <Link
                  href={`/careers/${job._id}`}
                  className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors inline-block"
                >
                  {job.title}
                </Link>

                <div className="flex flex-wrap gap-4 mt-3">
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" /> {job.location}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <Briefcase className="w-4 h-4" /> {job.type}
                  </div>
                  {job.salaryMin && (
                    <div className="flex items-center gap-1.5 text-sm text-green-600 font-semibold">
                      <DollarSign className="w-4 h-4" />
                      ${job.salaryMin} - ${job.salaryMax}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 border-t lg:border-t-0 pt-4 lg:pt-0">
                {/* Delete Button (Replaces Preview) */}
                <button
                  onClick={() => handleDelete(job._id, job.title)}
                  className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg font-bold text-sm transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>

                {/* Edit Button */}
                <button onClick={() => handleEdit(job)} className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-black transition-all flex items-center gap-2">
                  <Edit3 className="w-4 h-4" /> Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
    </div >
  );
};

export default Jobs;