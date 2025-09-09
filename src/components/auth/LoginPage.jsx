// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext"
import GoogleSignIn from '../google-auth/GoogleSignIn'
import './LoginPage.css';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL; // 🧡 Use environment variable for API URL
import Swal from 'sweetalert2'; // 🧡 Import SweetAlert2

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 🧡 Create reusable SweetAlert2 Toast
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  const handleManualLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/login`, {
        email,
        password
      });

      localStorage.setItem('authToken', data.token); // store JWT
      login(data.user); // save user in context

      // ✅ Show success Toast after login
      await Toast.fire({
        icon: 'success',
        title: `Welcome, ${data.user.name}!`
      });

      // Navigate back to original page (or default)
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || 'Login failed';

      // ❌ Show error popup
      await Swal.fire({
        icon: 'error',
        title: 'Login Failed!',
        text: msg,
        confirmButtonColor: '#d33'
      });
      setError(msg);
    }
  };

  const handleGoogleSignIn = async (user) => {
    login(user);

    // ✅ Show success Toast after Google login
    await Toast.fire({
      icon: 'success',
      title: `Welcome, ${user.name}!`
    });

    // Navigate back to original page (or default)
    navigate(from, { replace: true });
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

          <h2 className="text-center text-light">Login</h2>

          {/* Manual login form */}
          <form onSubmit={handleManualLogin}>
            <div className="row">
              <div className="col-md-12 py-2">
                <label htmlFor="email" className="form-label text-light">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter Email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-12 py-2">
                <label htmlFor="password" className="form-label text-light">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <div className="col-md-12 py-2">
                  <div className="text-danger text-center">{error}</div>
                </div>
              )}

              <div className="col-md-12 py-4">
                <div className="btn-group d-flex align-items-center justify-content-around">
                  <Link to="/" className="iocn_btn text-light py-2 w-100 back-btn text-decoration-none text-center">
                    Home
                  </Link>

                  <button type="submit" className="iocn_btn text-light py-2 w-100 login-btn">
                    Login
                  </button>
                </div>
              </div>
            </div>
          </form>

          <div className="signup d-flex justify-content-between align-items-center pt-3">
            <b className="text-light">Don't have an account?</b>
            <Link to="/register" className="text-light text-decoration-none">
              Sign Up
            </Link>
          </div>

          <div className="or or--x text-center text-light py-4" role="presentation">
            Or
          </div>

          {/* Google login */}
          <GoogleSignIn onSignIn={handleGoogleSignIn} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
