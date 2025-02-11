import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./layout/NavBar";
import Articles from "./components/Articles";
import Login from "./admin/Login";
import Register from "./admin/Register";
import Footer from "./layout/Footer";
import Dashboard from "./admin/Dashboard";
import EditArticle from "./admin/EditArticle";
import EditUser from "./admin/EditUser";
import Comments from "./components/Comments";
import { useEffect, useState } from "react";
import Profile from "./components/Profile";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const admin = localStorage.getItem("isAdmin");
    if (admin === "true") {
      setIsAdmin(true);
    }
  }, []);

  // Ocultar NavBar y Footer en login y register
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className={isAuthPage ? "auth-background" : ""}>
      {!isAuthPage && <NavBar />}
      <Routes>  
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {isAdmin && <Route path="/dashboard" element={<Dashboard />} />}
        {isAdmin && <Route path="/edit-article" element={<EditArticle />} />}
        {isAdmin && <Route path="/edit-user" element={<EditUser />} />}
        <Route path="/comments" element={<Comments />} />
        <Route path="/profile" element={<Profile/>}></Route>
      </Routes>
      {!isAuthPage && <Footer />}
    </div>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
