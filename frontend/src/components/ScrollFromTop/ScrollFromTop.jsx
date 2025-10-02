import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollFromTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);  // always scroll to top
  }, [pathname]);

  return null;
}
