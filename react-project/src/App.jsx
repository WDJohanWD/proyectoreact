import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Articles from "./components/Articles";
import Login from "./admin/Login";
import Register from "./admin/Register";
import Footer from "./components/Footer";
import Dashboard from "./admin/Dashboard";
import EditArticle from "./components/EditArticle";
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


      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
