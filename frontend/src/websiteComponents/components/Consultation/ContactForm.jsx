"use client";
export default function ContactForm({
  formData,
  handleChange,
  handleSubmit,
  loading,
  selectedDate,
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 w-full">
      {["name", "email", "phone", "message"].map((field) => (
        <div key={field}>
          {field === "message" ? (
            <textarea
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder="Your Message"
              rows="4"
              className="w-full p-4 md:p-6 rounded-xl bg-[#D9D9D9] placeholder:text-black font-serif focus:ring-2 focus:ring-[#2761FD]"
            />
          ) : (
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
              className="w-full p-4 md:p-6 rounded-xl bg-[#D9D9D9] placeholder:text-black font-serif focus:ring-2 focus:ring-[#2761FD]"
            />
          )}
        </div>
      ))}

      <p className="text-sm text-gray-600">
        Selected Date: <b>{selectedDate.toDateString()}</b>
      </p>

      <button
        type="submit"
        disabled={loading}
        className={`px-6 py-3 rounded-lg text-white flex items-center justify-center gap-2
          ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

