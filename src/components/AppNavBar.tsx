import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AppNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  return (
    <div className="absolute top-0 left-0 w-full mnavbar border-b border-white">
      <nav className="flex flex-nowrap items-center justify-evenly px-4 py-3">
        <div className="flex items-center gap-5">
          <Link className="border border-white p-1 m-1 rounded text-white hover:bg-white hover:text-gray-800" to="/">
            <div className="">
              <h4 className="m-0 text-lg">Carderio</h4>
            </div>
          </Link>
        </div>

        <div className="flex flex-row items-center mx-auto ">
          <Link
            className="nav-link border border-white p-1 m-1 rounded text-white hover:bg-white hover:text-gray-800" 
            to="/create"
          >
            <h4 className="m-0 text-base md:text-lg">Create</h4>
          </Link>
          <Link
            className="nav-link border border-white p-1 m-1 rounded text-white hover:bg-white hover:text-gray-800"
            to="/learn"
          >
            <h4 className="m-0 text-base md:text-lg">Begin</h4>
          </Link>
          <Link
            className="nav-link border border-white p-1 m-1 rounded text-white hover:bg-white hover:text-gray-800"
            to="https://github.com/chartouis"
          >
            <h4 className="m-0 text-base md:text-lg">About</h4>
          </Link>
        </div>
        <div
          className="border border-white p-1 rounded text-white hover:bg-white hover:text-gray-800"
          onClick={handleLogout}
        >
          <button className="">
            <h4 className="m-0 text-base md:text-lg">Logout</h4>
          </button>
        </div>
      </nav>
    </div>
  );
}
