import React from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Swal from "sweetalert2"; // 🧡 Import SweetAlert2

const GoogleSignIn = ({ onSignIn }) => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (!clientId) {
    console.error("Missing VITE_GOOGLE_CLIENT_ID in environment variables");
    return <div>Google Sign-In is not configured.</div>;
  }

  return (
    <GoogleOAuthProvider
      clientId={clientId}
      onScriptLoadError={() => console.error("Google OAuth script load failed")}
    >
      <GoogleLoginButton onSignIn={onSignIn} />
    </GoogleOAuthProvider>
  );
};

const GoogleLoginButton = ({ onSignIn }) => {
  const login = useGoogleLogin({
    flow: "auth-code",
    scope: "openid profile email",
    onSuccess: async ({ code }) => {
      try {
        const { data } = await axios.post(
         `${import.meta.env.VITE_REACT_APP_API_URL}/api/google`,
          // await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/google`);

          { code },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        localStorage.setItem("authToken", data.token);
        onSignIn(data.user);
      } catch (error) {
        console.error("Authentication failed:", error.response?.data || error.message);

        const serverMessage = error.response?.data?.message || error.message;

        // 🧡 SweetAlert2 error popup
        await Swal.fire({
          icon: 'error',
          title: 'Google Authentication Failed!',
          text: serverMessage,
          confirmButtonColor: '#d33'
        });
      }
    },
  });

  return (
    <div
      className="w-100"
      onClick={login}
      style={{
        cursor: 'pointer',
        backgroundColor: '#4285f4',
        color: 'white',
        padding: '10px 20px',
        textAlign: 'center',
        borderRadius: '5px',
        fontWeight: 'bold'
      }}
    >
      Sign in with Google
    </div>
  );
};

export default GoogleSignIn;
