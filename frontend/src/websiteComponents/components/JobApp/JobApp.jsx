import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import {
  ArrowLeft,
  Upload,
  Send,
  CheckCircle2,
  User,
  Mail,
  FileText,
  Loader2
} from "lucide-react";

const ApplyJob = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", email: "" });
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    const formData = new FormData();
    formData.append("jobId", id);
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("resume", resume);

    try {
      await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/applications/apply`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setSuccess("Application submitted successfully 🎉");
      setForm({ name: "", email: "" });
      setResume(null);
    } catch (err) {
      alert("Error submitting application. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">

        {/* Navigation */}
        <Link
          to={`/jobs/${id}`}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Job Details
        </Link>

        {/* Success State */}
        {success ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-xl border border-green-100 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Submission Received!</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Thank you for applying. Our recruiting team will review your application and get back to you soon.
            </p>
            <Link
              to="/jobs"
              className="inline-flex items-center justify-center bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-black transition-all"
            >
              Explore More Roles
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white">
              <h1 className="text-3xl font-bold">Join the Team</h1>
              <p className="text-blue-50 mt-2 opacity-90">
                Complete the form below to start your journey with us.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" /> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl p-3.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" /> Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl p-3.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="name@example.com"
                  required
                />
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-400" /> Resume / CV
                </label>
                <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-8 hover:bg-gray-50 transition-colors group text-center">
                  <input
                    type="file"
                    onChange={(e) => setResume(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept=".pdf,.doc,.docx"
                    required
                  />
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-gray-600 font-medium">
                      {resume ? resume.name : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">PDF, DOC, DOCX up to 10MB</p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 hover:shadow-lg transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing Application...
                  </>
                ) : (
                  <>
                    Submit Application
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-400 mt-4">
                By submitting, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
      <Footer />
      </>
  );
};

export default ApplyJob;