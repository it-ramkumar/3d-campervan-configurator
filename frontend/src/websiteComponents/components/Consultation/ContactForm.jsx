"use client";

import BlackButton from "../Common/Button/BlackButton";

export default function ContactForm({
  formData,
  handleChange,
  handleSubmit,
  loading,
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


      <BlackButton
        type="submit"
        disabled={loading}
        label={loading ? "Submitting..." : "Submit"}

      />


    </form>
  );
}

