"use client";
import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Example: check cookie/session
    fetch(`${process.env.NEXT_PUBLIC_URL}/check-auth`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        setIsAuthenticated(data.loggedIn); // true/false from backend
        setLoading(false);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);
  // console.log(isAuthenticated)

  return { isAuthenticated, loading };
};
