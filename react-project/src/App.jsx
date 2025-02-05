import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Articles from "./components/Articles";
import Login from "./usersAccess/Login";
import Register from "./usersAccess/Register";
import Footer from "./components/Footer";
import Dashboard from "./usersAccess/Dashboard";
import { useEffect, useState } from "react";
import "./styles/Navbar.css";
function App() {

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const admin = localStorage.getItem("isAdmin");
    if (admin === "true") {
      setIsAdmin(true);
    }
  }, []);

  return (
    <BrowserRouter>

      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {isAdmin && <Route path="/dashboard" element={<Dashboard />} />}

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
