"use client"
import React, { useState } from "react";

const SignupForm = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Loading...");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include", // ✅ cookie enable
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Signup successful 🎉");
      } else {
        setMessage(data.message || "Signup failed ❌");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded-lg w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Signup</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 w-full rounded hover:bg-blue-700"
        >
          Signup
        </button>

        {message && (
          <p className="text-center text-sm text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
};

export default SignupForm;
