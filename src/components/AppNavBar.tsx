import "../styles/NavBar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AppNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/login")
  };

  return (
    <div className="position-absolute top-0 start-0 mnavbar border-bottom border-info">
      <nav className="navbar navbar-expand-lg ">
      <Link className="btn btn-outline-info nav-item border rounded p-2 m-3 border-info"  to="/">
              <div className="nav-link text-info">
                <h4>Carderio</h4>
              </div>
            </Link>
        <div className="d-flex container-fluid">
          <div
            className="position-absolute top-50 start-50 translate-middle"
            id="navbarNav"
          >
            <Link className="btn btn-outline-info nav-item border rounded p-2 m-3 border-info" to="/create">
              <div className="nav-link text-info" >
                <h4>Create</h4>
              </div>
            </Link>
            <Link className="btn btn-outline-info nav-item border rounded p-2 m-3 border-info" to="/learn">
              <div className="nav-link text-info" >
                <h4>Begin</h4>
              </div>
            </Link>
            <Link className="btn btn-outline-info nav-item border rounded p-2 m-3 border-info"  to="/about">
              <div className="nav-link text-info">
                <h4>About</h4>
              </div>
            </Link>
          </div>
        </div>
        <div className="btn btn-outline-info nav-item border rounded p-2 m-3 border-info"  onClick={handleLogout}>
          <button className="nav-link text-info">
            <h4>Logout</h4>
          </button>
        </div>
      </nav>
    </div>
  );
}
