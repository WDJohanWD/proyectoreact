import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, useState, useEffect } from "react";

// Páginas que cargan de forma perezosa
const Home = React.lazy(() => import("./components/Home"));
const Articles = React.lazy(() => import("./components/Articles"));
const Login = React.lazy(() => import("./admin/Login"));
const Register = React.lazy(() => import("./admin/Register"));
const Dashboard = React.lazy(() => import("./admin/Dashboard"));
const EditArticle = React.lazy(() => import("./admin/EditArticle"));
const EditUser = React.lazy(() => import("./admin/EditUser"));
const Comments = React.lazy(() => import("./components/Comments"));
const Profile = React.lazy(() => import("./components/Profile"));
const Error404 = React.lazy(() => import("./components/Error404"));
const Cart = React.lazy(() => import("./components/Cart"));
const PaymentPage = React.lazy(() => import("./components/PaymentGateway"));

import NavBar from "./layout/NavBar";
import Footer from "./layout/Footer";
import Loader from "./components/Loader"; // Importar el loader (indicador de carga)

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
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/pay";

  return (
    <div className={isAuthPage ? "auth-background app-container" : "app-container"}>
      {!isAuthPage && <NavBar />}
      <div className="content">
        <Suspense fallback={<Loader />}> {/* Mostrar el Loader mientras cargan las páginas */}
          <Routes>
            <Route path="*" element={<Error404 />} />
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {isAdmin && <Route path="/dashboard" element={<Dashboard />} />}
            {isAdmin && <Route path="/edit-article" element={<EditArticle />} />}
            {isAdmin && <Route path="/edit-user" element={<EditUser />} />}
            <Route path="/comments" element={<Comments />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pay" element={<PaymentPage />} />
          </Routes>
        </Suspense>
      </div>
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
