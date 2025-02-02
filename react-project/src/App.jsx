import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Articles from "./components/Articles";


function App() {
  return (
    <BrowserRouter>
      
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
