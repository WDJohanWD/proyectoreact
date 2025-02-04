import "bootstrap-icons/font/bootstrap-icons.css"
import { Link } from "react-router-dom"
import logo from "../assets/logo.png"
import "../styles/NavBar.css"
const NavBar = () => {
  const username = localStorage.getItem("username")
  const isLogged = localStorage.getItem("username") ? true : false

  function closeSession() {
    localStorage.removeItem("username")
    window.location.href = "/login"
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark w-100 position-relative p-3" 
     style={{ backgroundColor: "#3498db"}}>
        
      <div className="container-fluid">
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
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/articles" className="nav-link text-white">
                Articles
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link text-white">
                Contact
              </Link>
            </li>
          </ul>

          <div className="position-absolute top-50 start-50 translate-middle">
            <p className="mt-4 text-white">Smart <img width={90} src={logo || "/placeholder.svg"} alt="Logo" /> Sphere</p>
            
          </div>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/cart" className="nav-link text-white">
                <i className="bi bi-cart4 h4"></i>
              </Link>
            </li>
            {isLogged ? (
              <li className="nav-item">
                <button className="nav-link text-white bg-transparent border-0" onClick={closeSession}>
                  <i className="bi bi-box-arrow-right h4"></i>
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link text-white">
                  <i className="bi bi-box-arrow-in-right h4"></i>
                </Link>
              </li>
            )}
            <li className="nav-item">
              <span className="nav-link text-white">{username}</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar

