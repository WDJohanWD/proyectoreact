
import { Link } from "react-router-dom"
import logo from "../assets/upscalemedia.png"

const NavBar = () => {
  const username = localStorage.getItem("username")
  const isLogged = localStorage.getItem("username") ? true : false
  const isAdmin = localStorage.getItem("isAdmin") === "true" ? true : false

  function closeSession() {
    localStorage.removeItem("username")
    window.location.href = "/login"
    localStorage.setItem("isAdmin", false)
  }

  return ( <nav className="bg-gradient-to-r from-gray-600 to-gray-900 shadow-md border-b-4 border-teal-500 p-4">
    <div className="container mx-auto flex items-center justify-between">
      {/* Logo */}
      <div className="absolute inset-x-1/2 transform -translate-x-1/2">
        <img
          width={100}
          src={logo || "/placeholder.svg"}
          alt="Logo"
          className="h-16"
        />
      </div>

      {/* Left Links */}
      <ul className="flex space-x-6 text-lg text-white">
        <li>
          <Link to="/" className="hover:text-teal-400">Home</Link>
        </li>
        <li>
          <Link to="/articles" className="hover:text-teal-400">Articles</Link>
        </li>
        <li>
          <Link to="/comments" className="hover:text-teal-400">Comments</Link>
        </li>
      </ul>

      {/* Right Links */}
      <ul className="flex items-center space-x-4 text-white text-lg">
        {isAdmin && (
          <li>
            <Link to="/dashboard" className="hover:text-teal-400">
              <i className="bi bi-speedometer2 text-xl"></i>
            </Link>
          </li>
        )}
        <li>
          <Link to="/cart" className="hover:text-teal-400 relative">
            <i className="bi bi-cart4 text-xl"></i>
          </Link>
        </li>
        {username && (
          <li className="flex items-center">
            <i className="bi bi-person-circle text-xl mr-2"></i>
            <span>{username}</span>
          </li>
        )}
        {isLogged ? (
          <li>
            <button
              onClick={closeSession}
              className="hover:text-red-500 flex items-center"
            >
              <i className="bi bi-box-arrow-right text-xl mr-2"></i>
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login" className="hover:text-teal-400">
              <i className="bi bi-box-arrow-right text-xl"></i>
            </Link>
          </li>
        )}
      </ul>
    </div>
  </nav>
  )
}

export default NavBar

//bi bi-box-arrow-right