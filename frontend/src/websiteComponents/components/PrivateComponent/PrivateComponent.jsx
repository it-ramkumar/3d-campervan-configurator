import { Navigate } from "react-router-dom";
import { useAuth } from "../../CustomHooks/useAuth";
import Loader from "../Loader/Loader";
import Swal from "sweetalert2";

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loader />; // ya spinner

  if (!isAuthenticated) {
    // ✅ Swal message
    Swal.fire({
      icon: "warning",
      title: "Access Denied",
      text: "You must login to access this page",
      timer: 2000,
      showConfirmButton: false,
    });

    return <Navigate to="/login" replace />; // redirect to login
  }

  return children;
};
