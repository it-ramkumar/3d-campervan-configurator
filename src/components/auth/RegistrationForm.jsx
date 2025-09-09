import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

import Swal from "sweetalert2"; // 🧡 import SweetAlert2
import "./RegistrationForm.css";

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (/[A-Z]/.test(password) && /\d/.test(password)) return "Strong";
    return "Medium";
  };

  const passwordsMatch =
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 🧡 Password mismatch check
    if (!passwordsMatch) {
      await Swal.fire({
        icon: "warning",
        title: "Passwords do not match!",
        text: "Please enter the same password in both fields.",
        confirmButtonColor: "#d33",
      });
      return; // stop submission
    }

    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/api/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      await Swal.fire({
        icon: "success",
        title: "Registered Successfully!",
        text: "Please login to continue.",
        confirmButtonColor: "#3085d6",
      });

      navigate("/login");
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Registration failed";
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: msg,
        confirmButtonColor: "#d33",
      });
    }
    setLoading(false);
  };

  return (
    <div className="form-section">
      <div className="container">
        <div className="form-block w-100 pb-4 px-3">
          <div className="d-flex justify-content-center py-3">
            <img
              src="https://bigbearvans.com/wp-content/uploads/2025/01/cropped-site-logo.webp"
              alt="Logo"
              className="form-img w-100"
            />
          </div>

          <h2 className="text-center text-light">Register</h2>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-12 py-2">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter Name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-12 py-2">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter Email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-12 py-2">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter Password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {/* Password Strength Meter */}
                {formData.password && (
                  <small className="text-light">
                    Password Strength:{" "}
                    {checkPasswordStrength(formData.password)}
                  </small>
                )}
              </div>
              <div className="col-md-12 py-2">
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Confirm Password"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />

                {/* ✅ Show Real-time match/mismatch message */}
                {formData.confirmPassword && (
                  <small
                    className=  {passwordsMatch ? "bg-white text-success p-2" : "bg-white text-danger p-2"}
                  >
                    {passwordsMatch
                      ? "Password matched ✅"
                      : "Please enter same password ❌"}
                  </small>
                )}
              </div>

              {error && (
                <div className="col-md-12 py-2">
                  <div className="alert alert-danger text-center" role="alert">
                    {error}
                  </div>
                </div>
              )}

              <div className="col-md-12 py-4">
                <div className="btn-group d-flex align-items-center justify-content-around">
                  <Link
                    to="/login"
                    className="iocn_btn text-light py-2 w-100 back-btn text-decoration-none text-center"
                  >
                    Back
                  </Link>

                  <button
                    type="submit"
                    className="iocn_btn text-light py-2 w-100 login-btn"
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Register"}
                  </button>
                </div>
              </div>
            </div>
          </form>

          <div className="signup d-flex justify-content-between align-items-center pt-4">
            <b className="text-light">Already have an account?</b>
            <Link to="/login" className="text-light text-decoration-none">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
