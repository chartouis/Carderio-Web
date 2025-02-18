import "../styles/NavBar.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AppNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/login")
  };

  return (
<div className="position-absolute top-0 start-0 w-100 mnavbar border-bottom border-info">
  <nav className="navbar navbar-expand-lg">
    <div className="container-fluid">
      {/* Brand Logo & Mobile Toggler */}
      <div className="d-flex align-items-center gap-5">
        <Link className="btn btn-outline-info border-info p-1 p-md-2 m-1 m-md-3" to="/">
          <div className="nav-link text-info">
            <h4 className="m-0 fs-4 fs-md-3">Carderio</h4>
          </div>
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      {/* Collapsible Content */}
      <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
        {/* Navigation Links */}
        <div className="d-flex flex-column flex-lg-row align-items-center mx-auto">
          <Link className="nav-link btn btn-outline-info border border-info p-1 p-md-2 m-1 m-md-3 text-info" to="/create">
            <h4 className="m-0 fs-5 fs-md-4">Create</h4>
          </Link>
          <Link className="nav-link btn btn-outline-info border border-info p-1 p-md-2 m-1 m-md-3 text-info" to="/learn">
            <h4 className="m-0 fs-5 fs-md-4">Begin</h4>
          </Link>
          <Link className="nav-link btn btn-outline-info border border-info p-1 p-md-2 m-1 m-md-3 text-info" to="/about">
            <h4 className="m-0 fs-5 fs-md-4">About</h4>
          </Link>
        </div>

        {/* Logout Button */}
        <div className="d-flex">
          <div className="btn btn-outline-info border-info p-1 p-md-2 m-1 m-md-3" onClick={handleLogout}>
            <button className="nav-link text-info">
              <h4 className="m-0 fs-5 fs-md-4">Logout</h4>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</div>
  );
}
