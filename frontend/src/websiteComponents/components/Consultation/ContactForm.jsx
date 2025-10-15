"use client";

import BlackButton from "../Common/Button/BlackButton";

export default function ContactForm({
  formData,
  handleChange,
  handleSubmit,
  loading,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12">
      {/* Heading Section */}
      <div className="max-w-2xl mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          Let’s Connect
        </h1>
        <p className="text-gray-700 text-base md:text-lg">
          Tell us what’s on your mind! Whether it’s a project idea or a quick question,
          we’re here to help.
        </p>
      </div>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 md:space-y-6 w-full"
      >
        {["name", "email", "phone", "message"].map((field) => (
          <div key={field}>
            {field === "message" ? (
              <textarea
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder="Your Message"
                rows="4"
                className="w-full p-4 md:p-6 rounded-xl bg-[#D9D9D9] placeholder:text-black font-serif focus:ring-2 focus:ring-[#2761FD] focus:outline-none"
              />
            ) : (
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                className="w-full p-4 md:p-6 rounded-xl bg-[#D9D9D9] placeholder:text-black font-serif focus:ring-2 focus:ring-[#2761FD] focus:outline-none"
              />
            )}
          </div>
        ))}

        <div className="pt-4">
          <BlackButton
            type="submit"
            disabled={loading}
            label={loading ? "Submitting..." : "Submit"}
          />
        </div>
      </form>
    </div>
  );
}
