import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Save,
  Type,
  FileText,
  Clock,
  Info
} from "lucide-react";

const JobForm = ({setSelected}) => {
  const editData = useSelector((state) => state.editData.editData);

  const [form, setForm] = useState({
    title: "",
    department: "",
    location: "",
    type: "",
    experienceLevel: "",
    vacancies: "",
    description: "",
    responsibilities: "",
    requirements: "",
    niceToHave: "",
    salaryMin: "",
    salaryMax: "",
    workMode: "",
    benefits: "",
    status: "active",
    deadline: ""
  });

  useEffect(() => {
    if (editData && editData._id) {
      setForm({
        title: editData.title || "",
        department: editData.department || "",
        location: editData.location || "",
        type: editData.type || "",
        experienceLevel: editData.experienceLevel || "",
        vacancies: editData.vacancies || "",
        description: editData.description || "",
        responsibilities: editData.responsibilities?.join(", ") || "",
        requirements: editData.requirements?.join(", ") || "",
        niceToHave: editData.niceToHave?.join(", ") || "",
        salaryMin: editData.salaryMin || "",
        salaryMax: editData.salaryMax || "",
        workMode: editData.workMode || "",
        benefits: editData.benefits?.join(", ") || "",
        status: editData.status || "active",
        deadline: editData.deadline ? editData.deadline.split("T")[0] : ""
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      requirements: form.requirements ? form.requirements.split(",").map(i => i.trim()) : [],
      responsibilities: form.responsibilities ? form.responsibilities.split(",").map(i => i.trim()) : [],
      niceToHave: form.niceToHave ? form.niceToHave.split(",").map(i => i.trim()) : [],
      benefits: form.benefits ? form.benefits.split(",").map(i => i.trim()) : [],
      vacancies: form.vacancies ? Number(form.vacancies) : null,
      salaryMin: form.salaryMin ? Number(form.salaryMin) : null,
      salaryMax: form.salaryMax ? Number(form.salaryMax) : null,
    };

    try {
      if (editData && editData._id) {
        await axios.put(`${process.env.NEXT_PUBLIC_URL}/jobs/${editData._id}`, payload, { withCredentials: true });
        alert("Job Updated Successfully ✅");
        setSelected("career");

      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_URL}/jobs`, payload, { withCredentials: true });
        alert("Job Posted Successfully 🎉");
        setSelected("career");

      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4 sm:px-6 mb-20">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
            {editData ? "Edit Position" : "Add New Opening"}
          </h1>
          <p className="text-gray-500 mt-1 font-medium">Please provide accurate details for the job listing.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-3xl shadow-2xl shadow-gray-200/40 overflow-hidden">
        <div className="p-8 space-y-10">

          {/* Section 1: Header Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1">Job Title</label>
              <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Senior Frontend Engineer" className="form-input" required />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1">Department</label>
              <input name="department" value={form.department} onChange={handleChange} placeholder="e.g. Product Development" className="form-input" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1">Location</label>
              <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Karachi, Pakistan" className="form-input" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-gray-700 ml-1">Job Type</label>
                <select name="type" value={form.type} onChange={handleChange} className="form-input">
                  <option value="">Select Type</option>
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Contract</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-gray-700 ml-1">Experience</label>
                <select name="experienceLevel" value={form.experienceLevel} onChange={handleChange} className="form-input">
                  <option value="">Select Level</option>
                  <option>Intern</option>
                  <option>Junior</option>
                  <option>Mid</option>
                  <option>Senior</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Compensation */}
          <div className="pt-6 border-t border-gray-50 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1 text-green-700">Minimum Salary ($)</label>
              <input name="salaryMin" value={form.salaryMin} onChange={handleChange} placeholder="50000" className="form-input" type="number" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1 text-green-700">Maximum Salary ($)</label>
              <input name="salaryMax" value={form.salaryMax} onChange={handleChange} placeholder="80000" className="form-input" type="number" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1">Work Mode</label>
              <select name="workMode" value={form.workMode} onChange={handleChange} className="form-input">
                <option value="">Select Mode</option>
                <option>Remote</option>
                <option>Hybrid</option>
                <option>Onsite</option>
              </select>
            </div>
          </div>

          {/* Section 3: Text Areas */}
          <div className="pt-6 border-t border-gray-50 space-y-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1">Job Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe the overall mission of the role..." className="form-input min-h-[120px]" rows="4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1">
                  Responsibilities <span className="text-[10px] text-gray-400 font-normal">(Comma separated)</span>
                </label>
                <textarea name="responsibilities" value={form.responsibilities} onChange={handleChange} placeholder="e.g. Managing team, Code review, Architecture" className="form-input" rows="3" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1">
                  Requirements <span className="text-[10px] text-gray-400 font-normal">(Comma separated)</span>
                </label>
                <textarea name="requirements" value={form.requirements} onChange={handleChange} placeholder="e.g. 3 years React, Node JS, AWS" className="form-input" rows="3" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-gray-700 ml-1">Nice to Have</label>
                <textarea name="niceToHave" value={form.niceToHave} onChange={handleChange} placeholder="Optional skills or certifications..." className="form-input" rows="2" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-gray-700 ml-1">Benefits</label>
                <textarea name="benefits" value={form.benefits} onChange={handleChange} placeholder="Health insurance, Remote work, Annual bonus..." className="form-input" rows="2" />
              </div>
            </div>
          </div>

          {/* Section 4: Final Config */}
          <div className="pt-6 border-t border-gray-50 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1">Total Vacancies</label>
              <input name="vacancies" value={form.vacancies} onChange={handleChange} placeholder="e.g. 2" className="form-input" type="number" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1">Listing Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="form-input">
                <option value="active">Active (Visible)</option>
                <option value="closed">Closed</option>
                <option value="draft">Draft (Hidden)</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1">Application Deadline</label>
              <input type="date" name="deadline" value={form.deadline} onChange={handleChange} className="form-input" />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="bg-gray-50 p-8 flex justify-end">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-12 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95">
            <Save className="w-5 h-5" />
            {editData ? "Save Changes" : "Post Vacancy"}
          </button>
        </div>
      </form>

      <style>{`
        .form-input {
          width: 100%;
          padding: 0.875rem 1.25rem;
          background-color: #ffffff;
          border: 2px solid #f1f5f9;
          border-radius: 1rem;
          outline: none;
          transition: all 0.2s;
          font-size: 0.95rem;
          color: #1e293b;
        }
        .form-input:focus {
          border-color: #3b82f6;
          background-color: #ffffff;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.08);
        }
        .form-input::placeholder {
          color: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default JobForm;