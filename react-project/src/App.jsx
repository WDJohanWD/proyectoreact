import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./layout/NavBar";
import Articles from "./components/Articles";
import Login from "./admin/Login";
import Register from "./admin/Register";
import Footer from "./layout/Footer";
import Dashboard from "./admin/Dashboard";
import EditArticle from "./admin/EditArticle";
import EditUser from "./admin/EditUser";
import { useEffect, useState } from "react";
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
        {isAdmin && <Route path="/edit-article" element={<EditArticle />} />}
        {isAdmin && <Route path="/edit-user" element={<EditUser />} />}


      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
