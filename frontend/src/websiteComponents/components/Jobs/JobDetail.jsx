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
import { Heading2,ImageWithSkeleton,Heading3,Heading4,RichParagraph } from "../Common/Common";

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
  <div className="min-h-screen bg-secondary">
    <Navbar />

    {/* Header */}
    <div className="bg-white border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 py-10">

        <Link
          to="/careers"
          className="inline-flex items-center gap-2 text-primary/40 hover:text-hover mb-6 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          BACK TO CAREERS
        </Link>

        <div className="flex flex-col lg:flex-row justify-between gap-6">

          <div className="space-y-4">

            <div className="flex items-center gap-2">
              <span className="bg-primary text-secondary text-[10px] px-2 py-1 rounded uppercase">
                {job.department}
              </span>

              <span className="text-primary/40 text-sm flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {new Date(job.createdAt).toLocaleDateString()}
              </span>
            </div>

            <Heading2
              text={cleanText(job.title)}
              textColor="text-primary"
              className="uppercase"
            />

            <div className="flex flex-wrap gap-5 pt-2 text-primary/70">

              <div className="flex items-center gap-1.5">
                <MapPin className="w-5 h-5 text-hover" />
                {job.location}
              </div>

              <div className="flex items-center gap-1.5">
                <Briefcase className="w-5 h-5 text-hover" />
                {job.type}
              </div>

              <div className="flex items-center gap-1.5 bg-secondary px-3 py-1 rounded-lg">
                <DollarSign className="w-5 h-5 text-hover" />
                ${job.salaryMin} - ${job.salaryMax}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="p-4 rounded-lg bg-secondary hover:bg-hover hover:text-white transition-all"
            >
              <Share2 className="w-5 h-5" />
            </button>

            <Link
              to={`/apply/${job._id}`}
              className="bg-primary text-secondary px-8 py-4 rounded-lg font-bold hover:bg-hover hover:text-primary transition-all"
            >
              APPLY NOW
            </Link>
          </div>

        </div>
      </div>
    </div>

    {/* Content */}
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">

        {/* Main */}
        <div className="lg:w-2/3 space-y-10">

          {/* Overview */}
          <section>
            <Heading3 text="Overview" textColor="text-primary" />
            <RichParagraph className="mt-4 text-primary/70 whitespace-pre-line">
              {cleanText(job.description)}
            </RichParagraph>
          </section>

          {/* Responsibilities */}
          <section className="bg-white rounded-lg p-8 border border-primary/10">
            <Heading3 text="Responsibilities" textColor="text-primary" />

            <ul className="space-y-4 mt-6">
              {job.responsibilities?.map((item, index) => (
                <li key={index} className="flex gap-3 text-primary/70">
                  <div className="mt-2 w-2 h-2 bg-hover rounded-full"></div>
                  <RichParagraph>{cleanText(item)}</RichParagraph>
                </li>
              ))}
            </ul>
          </section>

          {/* Requirements */}
          <section>
            <Heading3 text="Requirements" textColor="text-primary" />

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              {job.requirements?.map((req, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white p-4 rounded-lg border border-primary/10"
                >
                  <CheckCircle className="w-5 h-5 text-hover" />
                  <RichParagraph className="text-sm">
                    {cleanText(req)}
                  </RichParagraph>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Sidebar */}
        <aside className="lg:w-1/3 space-y-6">

          {/* Benefits */}
          <div className="bg-primary text-secondary rounded-lg p-8">
            <Heading4 text="Perks & Benefits" textColor="text-secondary" />

            <ul className="space-y-4 mt-6">
              {job.benefits?.map((benefit, index) => (
                <li key={index}>
                  <RichParagraph className="text-secondary/80 text-sm">
                    {benefit}
                  </RichParagraph>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-secondary/20">
              <RichParagraph className="text-xs uppercase text-secondary/50 mb-2">
                Experience Level
              </RichParagraph>

              <span className="bg-secondary/20 px-3 py-1 rounded text-sm">
                {job.experienceLevel}
              </span>
            </div>
          </div>

          {/* Apply Card */}
          <div className="bg-secondary rounded-lg p-8 border border-primary/10">
            <Heading4 text="Ready to apply?" textColor="text-primary" />

            <RichParagraph className="text-primary/60 text-sm mt-2">
              Applications close on {new Date(job.deadline).toLocaleDateString()}.
            </RichParagraph>

            <Link
              to={`/apply/${job._id}`}
              className="block w-full bg-primary text-secondary text-center py-4 rounded-lg font-bold mt-6 hover:bg-hover hover:text-primary transition-all"
            >
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