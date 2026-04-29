"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../../CustomHooks/useAuth";
import Loader from "../Loader/Loader";
import Swal from "sweetalert2";

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  if (loading) return <Loader />;

  if (!isAuthenticated) {
    // ✅ Swal message
    Swal.fire({
      icon: "warning",
      title: "Access Denied",
      text: "You must login to access this page",
      timer: 2000,
      showConfirmButton: false,
    });

    router.push("/login"); // redirect to login
    return null;
  }

  return children;
};
