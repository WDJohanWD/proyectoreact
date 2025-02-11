import { Link } from "react-router-dom";
import logo from "../assets/upscalemedia.png";

const NavBar = () => {
  const username = localStorage.getItem("username");
  const isLogged = !!username;
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  function closeSession() {
    localStorage.removeItem("username");
    localStorage.setItem("isAdmin", "false");
    window.location.href = "/login";
  }

  return (
    <nav className="sticky top-0 bg-gradient-to-r from-gray-600 to-gray-900 shadow-md border-b-4 border-gray-300 px-4 py-2 z-50 w-full">
      <div className="flex items-center justify-between w-full">
        
        {/* Izquierda (Logo y Links) */}
        <div className="flex items-center space-x-6 text-lg text-gray-400 flex-grow">
          <img width={100} src={logo || "/placeholder.svg"} alt="Logo" className="w-15" />
          <Link to="/" className="hover:text-teal-400">Home</Link>
          <Link to="/articles" className="hover:text-teal-400">Shop</Link>
          <Link to="/comments" className="hover:text-teal-400">Comments</Link>
        </div>

        {/* Derecha (Admin, Carrito, Usuario, Logout/Login) */}
        <div className="flex items-center space-x-4 text-white text-lg">
          {isAdmin && (
            <Link to="/dashboard" className="hover:text-teal-400">
              <svg className="h-8 w-8 text-gray-500 hover:text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </Link>
          )}
          <Link to="/cart" className="hover:text-teal-400 relative">
            <svg className="h-8 w-8 text-gray-500 hover:text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </Link>
          {username && (
            <div className="flex items-center">
              <svg className="h-8 w-8 text-gray-500 hover:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="hover:text-teal-400" style={{ color: "#697181" }}>{username}</p>
            </div>
          )}
          {isLogged ? (
            <button onClick={closeSession} className="hover:text-red-500 flex items-center">
              <svg className="h-8 w-8 text-gray-500 hover:text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          ) : (
            <Link to="/login" className="hover:text-teal-400">
              <svg className="h-8 w-8 text-gray-500 hover:text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
            </Link>
          )}
        </div>
        </div>
    </nav>
  );
};

export default NavBar;
