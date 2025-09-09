
import {  useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext"
import Navbar from "../navbar/Navbar"
import Swal from 'sweetalert2'; // 🧡 Import SweetAlert2

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // 🧡 Create reusable Toast
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  const handleLogout = async () => {
    logout();            // Clear user & localStorage
    navigate('/login');  // Redirect to login

    // ✅ Show logout toast
    await Toast.fire({
      icon: 'info',
      title: 'Logged out successfully!'
    });
  };

  return (
    <>
      <Navbar user={user} />
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1>Welcome, {user?.name || 'Guest'}</h1>
        <p>Email: {user?.email || 'Not available'}</p>

        <div style={{ margin: '20px 0' }}>
          {/* <Link to="/account" style={{ marginRight: '10px' }}>
            View Account
          </Link> */}

          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
