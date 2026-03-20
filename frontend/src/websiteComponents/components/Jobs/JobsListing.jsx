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
import { RichParagraph,Heading2,Heading3,Heading4,ImageWithSkeleton } from "../Common/Common";

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
  <div className="min-h-screen bg-secondary">
    <Navbar />

    {/* Hero Section */}
    <section className="relative bg-primary text-secondary py-24 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 text-center">

        <Heading2
          className="text-5xl md:text-7xl uppercase tracking-tight"
          text="Build the Future"
          textColor="text-secondary"
        />

        <RichParagraph className="mt-6 max-w-2xl mx-auto text-secondary/70">
          Join Big Bear Vans and help us redefine mobile living through precision engineering and design.
        </RichParagraph>

        <a
          href="#opportunities"
          className="inline-flex items-center gap-2 bg-hover text-primary px-8 py-4 rounded-lg font-bold mt-8 hover:opacity-90 transition-all"
        >
          Open Roles <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </section>

    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col lg:flex-row gap-12">

        {/* Sidebar */}
        <aside className="lg:w-1/3 space-y-8">

          {/* Why Join */}
          <div className="bg-white p-8 rounded-lg border border-primary/10 shadow-sm">
            <Heading3 text="Why Join Us?" textColor="text-primary" />

            <div className="space-y-6 mt-6">
              {companyThoughts.map((thought) => (
                <div key={thought.id} className="flex gap-4">
                  <div className="bg-secondary p-3 rounded-lg text-primary">
                    {thought.icon}
                  </div>
                  <div>
                    <Heading4 text={thought.title} textColor="text-primary" />
                    <RichParagraph className="text-primary/60 text-sm">
                      {thought.content}
                    </RichParagraph>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-primary text-secondary p-8 rounded-lg shadow-lg">
            <Heading4 text="Benefits" textColor="text-secondary" />

            <ul className="space-y-3 text-sm mt-4">
              <li className="flex items-center gap-2">✔ 100% Remote Workflow</li>
              <li className="flex items-center gap-2">✔ Competitive Salary (USD)</li>
              <li className="flex items-center gap-2">✔ Global Impact</li>
            </ul>
          </div>
        </aside>

        {/* Jobs */}
        <main className="lg:w-2/3">
          <div id="opportunities">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
              <Heading2
                text={`Open Positions (${filteredJobs.length})`}
                textColor="text-primary"
              />

              <div className="flex flex-wrap gap-2">
                {jobTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                      filter === type
                        ? "bg-primary text-secondary"
                        : "bg-white text-primary/50 border border-primary/10 hover:border-hover"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Loader */}
            {loading ? (
              <div className="py-20 text-center">
                <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
                <RichParagraph className="text-primary/40 uppercase text-xs">
                  Syncing Database...
                </RichParagraph>
              </div>
            ) : (
              <div className="space-y-4">

                {filteredJobs.map((job) => (
                  <div
                    key={job._id}
                    className="group bg-white rounded-lg p-6 border border-primary/10 hover:border-hover transition-all shadow-sm"
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-6">

                      {/* Left */}
                      <div className="flex-1">

                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[10px] font-bold bg-secondary text-primary px-2 py-1 rounded uppercase">
                            {job.department}
                          </span>
                          <span className="text-xs text-primary/40 uppercase">
                            {job.experienceLevel}
                          </span>
                        </div>

                        <Heading3
                          text={cleanText(job.title)}
                          textColor="text-primary"
                          className="group-hover:text-hover transition-colors"
                        />

                        <div className="flex flex-wrap gap-4 mt-3 mb-4">
                          <span className="flex items-center gap-1 text-xs text-primary/60">
                            <MapPin className="w-3.5 h-3.5" /> {job.location}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-primary/60">
                            <Briefcase className="w-3.5 h-3.5" /> {job.type}
                          </span>
                          <span className="flex items-center gap-1 text-xs bg-secondary px-2 py-1 rounded text-primary">
                            <DollarSign className="w-3.5 h-3.5" />
                            ${job.salaryMin} - ${job.salaryMax}
                          </span>
                        </div>

                        <RichParagraph className="text-primary/60 text-sm line-clamp-2">
                          {cleanText(job.description)}
                        </RichParagraph>
                      </div>

                      {/* Right */}
                      <div className="flex flex-col gap-2 justify-center">

                        <Link
                          to={`/apply/${job._id}`}
                          className="bg-primary text-secondary text-center py-2.5 px-6 rounded-lg font-bold hover:bg-hover hover:text-primary transition-all text-sm uppercase"
                        >
                          Apply
                        </Link>

                        <Link
                          to={`/careers/${job._id}`}
                          className="text-center text-primary/40 text-xs font-bold hover:text-hover flex items-center justify-center gap-1"
                        >
                          Details <ChevronRight className="w-3 h-3" />
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