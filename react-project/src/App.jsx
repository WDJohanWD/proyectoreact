import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Articles from "./components/Articles";
import Login from "./usersAccess/Login";
import Register from "./usersAccess/Register";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter> 
      
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
    
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
