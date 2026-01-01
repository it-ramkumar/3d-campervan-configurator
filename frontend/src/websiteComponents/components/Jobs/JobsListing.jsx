import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {
  Briefcase,
  MapPin,
  ArrowRight,
  Sparkles,
  Users,
  Heart,
  Lightbulb,
  Globe,
  Award,
  TrendingUp,
  Calendar,
  DollarSign,
  Loader2,
  ChevronRight
} from "lucide-react";

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/jobs`)
      .then(res => {
        setJobs(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      });
  }, []);

  // Utility to remove hashtags from the text data you provided
  const cleanText = (text) => text?.replace(/hashtag#/g, '').replace(/#/g, '');

  const companyThoughts = [
    {
      id: 1,
      icon: <Heart className="w-6 h-6" />,
      title: "Our Culture",
      content: "We believe in creating an environment where creativity meets purpose.",
      color: "bg-red-50 text-red-600"
    },
    {
      id: 2,
      icon: <Users className="w-6 h-6" />,
      title: "Growth Mindset",
      content: "Dedicated development budgets and mentorship for every team member.",
      color: "bg-blue-50 text-blue-600"
    }
  ];

  const jobTypes = ["all", "Full Time", "Part Time", "Remote", "Internship"];

  const filteredJobs = filter === "all"
    ? jobs
    : jobs.filter(job =>
        job.type?.toLowerCase() === filter.toLowerCase() ||
        job.workMode?.toLowerCase() === filter.toLowerCase()
      );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z%22 fill=%22%23ffffff%22/%3E%3C/svg%3E')]"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter">
            Build the <span className="text-blue-500">Future</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Join BigBearVans and help us redefine mobile living through precision engineering and design.
          </p>
          <a href="#opportunities" className="inline-flex items-center gap-2 bg-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-all">
            Open Roles <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 uppercase">
                <Sparkles className="w-5 h-5 text-blue-600" /> Why Join Us?
              </h2>
              <div className="space-y-6">
                {companyThoughts.map((thought) => (
                  <div key={thought.id} className="flex gap-4">
                    <div className={`${thought.color} p-3 rounded-2xl h-fit`}>{thought.icon}</div>
                    <div>
                      <h3 className="font-bold text-gray-900">{thought.title}</h3>
                      <p className="text-gray-500 text-sm">{thought.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-xl shadow-blue-100">
              <h3 className="font-bold mb-4 flex items-center gap-2 tracking-widest uppercase text-sm">
                <Award className="w-5 h-5" /> Benefits
              </h3>
              <ul className="space-y-3 text-sm font-medium opacity-90">
                <li className="flex items-center gap-2">✅ 100% Remote Workflow</li>
                <li className="flex items-center gap-2">✅ Competitive Salary (USD)</li>
                <li className="flex items-center gap-2">✅ Global Impact</li>
              </ul>
            </div>
          </aside>

          {/* Jobs List */}
          <main className="lg:w-2/3">
            <div id="opportunities" className="scroll-mt-24">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
                  Open Positions ({filteredJobs.length})
                </h2>
                <div className="flex flex-wrap gap-2">
                  {jobTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilter(type)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                        filter === type ? "bg-blue-600 text-white" : "bg-white text-gray-400 border border-gray-200"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {loading ? (
                <div className="py-20 text-center">
                  <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-4" />
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Syncing Database...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredJobs.map((job) => (
                    <div key={job._id} className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 transition-all shadow-sm">
                      <div className="flex flex-col md:flex-row justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-2 py-0.5 rounded uppercase tracking-widest">
                              {job.department}
                            </span>
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                              {job.experienceLevel}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {cleanText(job.title)}
                          </h3>

                          <div className="flex flex-wrap gap-4 mb-4">
                            <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                              <MapPin className="w-3.5 h-3.5" /> {job.location}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                              <Briefcase className="w-3.5 h-3.5" /> {job.type}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                              <DollarSign className="w-3.5 h-3.5" /> ${job.salaryMin} - ${job.salaryMax}
                            </span>
                          </div>

                          <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                            {cleanText(job.description)}
                          </p>
                        </div>

                        <div className="flex flex-col gap-2 justify-center">
                          <Link to={`/apply/${job._id}`} className="bg-blue-600 text-white text-center py-2.5 px-6 rounded-xl font-bold hover:bg-blue-700 transition-all text-sm uppercase tracking-widest">
                            Apply
                          </Link>
                          <Link to={`/jobs/${job._id}`} className="text-center text-gray-400 text-xs font-bold hover:text-blue-600 flex items-center justify-center gap-1 group/btn">
                            DETAILS <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Careers;