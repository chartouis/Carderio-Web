
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AppNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/login")
  };

  return (
    <div className="absolute top-0 left-0 w-full mnavbar border-b border-cyan-400">
      <nav className="flex flex-wrap items-center justify-between px-4 py-3">
        <div className="flex items-center gap-5">
          <Link className="border border-cyan-400 p-1 md:p-2 m-1 md:m-3 rounded" to="/">
            <div className="text-cyan-400">
              <h4 className="m-0 text-lg md:text-xl">Carderio</h4>
            </div>
          </Link>
          <button 
            className="lg:hidden border border-cyan-400 p-1 rounded" 
            type="button" 
            id="navbarToggle"
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="block w-6 h-px bg-cyan-400 mb-1"></span>
            <span className="block w-6 h-px bg-cyan-400 mb-1"></span>
            <span className="block w-6 h-px bg-cyan-400"></span>
          </button>
        </div>

        <div className="hidden lg:flex flex-col lg:flex-row justify-between w-full lg:w-auto" id="navbarNav">
          <div className="flex flex-col lg:flex-row items-center mx-auto">
            <Link className="nav-link border border-cyan-400 p-1 md:p-2 m-1 md:m-3 rounded text-cyan-400" to="/create">
              <h4 className="m-0 text-base md:text-lg">Create</h4>
            </Link>
            <Link className="nav-link border border-cyan-400 p-1 md:p-2 m-1 md:m-3 rounded text-cyan-400" to="/learn">
              <h4 className="m-0 text-base md:text-lg">Begin</h4>
            </Link>
            <Link className="nav-link border border-cyan-400 p-1 md:p-2 m-1 md:m-3 rounded text-cyan-400" to="/about">
              <h4 className="m-0 text-base md:text-lg">About</h4>
            </Link>
          </div>

          <div className="flex">
            <div className="border border-cyan-400 p-1 md:p-2 m-1 md:m-3 rounded" onClick={handleLogout}>
              <button className="text-cyan-400">
                <h4 className="m-0 text-base md:text-lg">Logout</h4>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
