import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  MapPin,
  Briefcase,
  ArrowLeft,
  Clock,
  Share2,
  CheckCircle,
  Loader2,
  DollarSign,
  Zap,
  Gift
} from "lucide-react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/jobs/${id}`)
      .then(res => {
        setJob(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // Helper to remove hashtags if they look messy in the UI
  const cleanText = (text) => text?.replace(/#/g, '');

  const handleShare = () => {
    navigator.share?.({
      title: job?.title,
      text: `Check out this ${job?.title} role at Big Bear Vans!`,
      url: window.location.href,
    }).catch(() => {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium tracking-wide">Initializing workspace...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center p-4">
        <h2 className="text-2xl font-bold text-gray-900">Position Not Found</h2>
        <Link to="/careers" className="mt-4 text-blue-600 hover:underline">Back to Careers</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link to="/jobs" className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-600 mb-6 transition-colors group text-sm font-medium">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            BACK TO CAREERS
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                  {job.department}
                </span>
                <span className="text-gray-400 text-sm flex items-center gap-1">
                   <Clock className="w-3.5 h-3.5" /> {new Date(job.createdAt).toLocaleDateString()}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tight">
                {cleanText(job.title)}
              </h1>

              <div className="flex flex-wrap gap-5 text-gray-600 pt-2">
                <div className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-5 h-5 text-blue-600" /> {job.location}
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <Briefcase className="w-5 h-5 text-blue-600" /> {job.type}
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  ${job.salaryMin} - ${job.salaryMax} / mo
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={handleShare} className="p-4 rounded-2xl bg-gray-100 hover:bg-gray-200 transition-all">
                <Share2 className="w-5 h-5 text-gray-700" />
              </button>
              <Link to={`/apply/${job._id}`} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all text-center flex-1 lg:flex-none">
                APPLY NOW
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Main Content */}
          <div className="lg:w-2/3 space-y-10">
            {/* Description */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" /> OVERVIEW
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                {cleanText(job.description)}
              </p>
            </section>

            {/* Responsibilities */}
            <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wider">Responsibilities</h2>
              <ul className="space-y-4">
                {job.responsibilities?.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                    <span className="text-md leading-relaxed">{cleanText(item)}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Requirements */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wider">Requirements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {job.requirements?.map((req, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm font-medium">{cleanText(req)}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-6">
            {/* Benefits Card */}
            <div className="bg-gray-900 text-white rounded-3xl p-8">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 uppercase tracking-widest">
                <Gift className="w-5 h-5 text-blue-400" /> Perks & Benefits
              </h3>
              <ul className="space-y-4">
                {job.benefits?.map((benefit, index) => (
                  <li key={index} className="text-gray-300 text-sm leading-relaxed flex items-start gap-2">
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-xs text-gray-400 uppercase mb-4 tracking-widest font-bold">Experience Level</p>
                <span className="bg-white/10 px-3 py-1.5 rounded-lg text-sm font-semibold">{job.experienceLevel}</span>
              </div>
            </div>

            {/* Application Card */}
            <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-2">Ready to apply?</h3>
              <p className="text-blue-700 text-sm mb-6">Applications for this position close on {new Date(job.deadline).toLocaleDateString()}.</p>
              <Link to={`/apply/${job._id}`} className="block w-full bg-blue-600 text-center text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all">
                Submit Application
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JobDetails;