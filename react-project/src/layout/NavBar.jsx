import "bootstrap-icons/font/bootstrap-icons.css"
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

  return (
<nav id="navbar"
  className="navbar navbar-expand-lg navbar-dark w-100 position-relative custom-navbar"
  style={{
    background: "linear-gradient(135deg, #7F8C8D ,  #2C3E50)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    borderBottom: "3px solid rgba(255, 255, 255, 0.3)",
    padding: "10px 15px"
  }}
> 
  <div className="container-fluid">
    <button
      className="navbar-toggler custom-toggler"
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
      <ul className="navbar-nav me-auto" style={{ fontSize: "1.2rem" }}>
        <li className="nav-item">
          <Link to="/" className="nav-link" style={{ padding: "10px 15px" }}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/articles" className="nav-link" style={{ padding: "10px 15px" }}>
            Articles
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className="nav-link" style={{ padding: "10px 15px" }}>
            Contact
          </Link>
        </li>
      </ul>

      <div className="brand-container position-absolute top-50 start-50 translate-middle">
        <p className="brand-text mb-0">
          <img
            width={100}
            src={logo || "/placeholder.svg"}
            alt="Logo"
            className="brand-logo"
          />
        </p>
      </div>

      <ul className="navbar-nav ms-auto" style={{ fontSize: "1.2rem" }}>
        {isAdmin && (
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">
              <i className="bi bi-speedometer2" style={{ fontSize: "1.5rem" }}></i>
            </Link>
          </li>
        )}
        <li className="nav-item">
          <Link to="/cart" className="nav-link">
            <i className="bi bi-cart4" style={{ fontSize: "1.5rem" }}></i>
            <span className="nav-tooltip"></span>
          </Link>
        </li>
        {username && (
          <li className="nav-item">
            <span
              className="nav-link username-text"
              style={{ fontSize: "1.2rem", display: "flex", alignItems: "center" }}
            >
              <i className="bi bi-person-circle me-2" style={{ fontSize: "1.5rem"}}></i>
              {username}
            </span>
          </li>
        )}
        
        {isLogged ? (
          <li className="nav-item">
            <button
              className="nav-link custom-btn"
              onClick={closeSession}
              style={{ fontSize: "1.2rem", display: "flex", alignItems: "center" }}
            >
              <i className="bi bi-box-arrow-right" style={{ fontSize: "1.5rem", marginRight: "5px" }}></i>
              <span className="nav-tooltip"></span>
            </button>
          </li>
        ) : (
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              <i className="bi bi-box-arrow-in-right" style={{ fontSize: "1.5rem" }}></i>
              <span className="nav-tooltip"></span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  </div>
</nav>

  )
}

export default NavBar

