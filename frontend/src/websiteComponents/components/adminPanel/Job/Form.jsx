import { useState } from "react";
import axios from "axios";

const JobForm = () => {
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      requirements: form.requirements
        ? form.requirements.split(",").map(i => i.trim())
        : [],
      responsibilities: form.responsibilities
        ? form.responsibilities.split(",").map(i => i.trim())
        : [],
      benefits: form.benefits
        ? form.benefits.split(",").map(i => i.trim())
        : [],
      vacancies: form.vacancies ? Number(form.vacancies) : null,
      salaryMin: form.salaryMin ? Number(form.salaryMin) : null,
      salaryMax: form.salaryMax ? Number(form.salaryMax) : null,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/jobs`,
        payload,
        { credentials: "include" }
      );
      alert("Job Posted Successfully 🎉");
      setForm({
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
    } catch (err) {
      alert("Error posting job");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Post a Job</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* BASIC INFO */}
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full border p-3 rounded"
        />

        <input
          name="department"
          value={form.department}
          onChange={handleChange}
          placeholder="Department (e.g. Engineering)"
          className="w-full border p-3 rounded"
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border p-3 rounded"
        />

        <div className="grid grid-cols-2 gap-4">
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="">Job Type</option>
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Contract</option>
          </select>

          <select
            name="experienceLevel"
            value={form.experienceLevel}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="">Experience Level</option>
            <option>Intern</option>
            <option>Junior</option>
            <option>Mid</option>
            <option>Senior</option>
          </select>
        </div>

        <input
          name="vacancies"
          value={form.vacancies}
          onChange={handleChange}
          placeholder="Vacancies"
          className="w-full border p-3 rounded"
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Job Description"
          className="w-full border p-3 rounded"
          rows="4"
        />

        <textarea
          name="responsibilities"
          value={form.responsibilities}
          onChange={handleChange}
          placeholder="Responsibilities (comma separated)"
          className="w-full border p-3 rounded"
        />

        <textarea
          name="requirements"
          value={form.requirements}
          onChange={handleChange}
          placeholder="Requirements (comma separated)"
          className="w-full border p-3 rounded"
        />

        <textarea
          name="niceToHave"
          value={form.niceToHave}
          onChange={handleChange}
          placeholder="Nice to Have Skills"
          className="w-full border p-3 rounded"
        />

        {/* SALARY */}
        <div className="grid grid-cols-2 gap-4">
          <input
            name="salaryMin"
            value={form.salaryMin}
            onChange={handleChange}
            placeholder="Salary Min"
            className="w-full border p-3 rounded"
          />
          <input
            name="salaryMax"
            value={form.salaryMax}
            onChange={handleChange}
            placeholder="Salary Max"
            className="w-full border p-3 rounded"
          />
        </div>

        {/* WORK */}
        <select
          name="workMode"
          value={form.workMode}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="">Work Mode</option>
          <option>Remote</option>
          <option>Hybrid</option>
          <option>Onsite</option>
        </select>

        <textarea
          name="benefits"
          value={form.benefits}
          onChange={handleChange}
          placeholder="Benefits (comma separated)"
          className="w-full border p-3 rounded"
        />

        {/* META */}
        <div className="grid grid-cols-2 gap-4">
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="active">Active</option>
            <option value="closed">Closed</option>
            <option value="draft">Draft</option>
          </select>

          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
        </div>

        <button className="w-full bg-black text-white py-3 rounded hover:bg-gray-800">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default JobForm;
