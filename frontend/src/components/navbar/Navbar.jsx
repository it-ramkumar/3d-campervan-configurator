import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light border-bottom bg-light fixed-top">
      <div className="container-fluid">
        {/* Toggler for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Logo / Brand */}
        <Link className="navbar-brand" to="/">
          BigBearVans
        </Link>

        {/* Links and user info */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li> */}

            {/* You can add more links here if needed */}
          </ul>

          {/* Right side: User login status */}
          <div className="d-flex align-items-center">
            {user ? (
              <>
                <span className="me-3 text-dark fw-bold">
                  Hello, {user.name}
                </span>
                <Link to="/profile" className="btn btn-outline-primary me-2">
                  Profile
                </Link>
              </>
            ) : (
              <Link to="/login" className="btn btn-primary">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
