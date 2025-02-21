import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/upscalemedia.png";

const NavBar = () => {
  const userID = localStorage.getItem("userId");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const isLogged = !!username;
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const [cartSummaryVisible, setCartSummaryVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]); // Lista de IDs de artículos en el carrito
  const [articles, setArticles] = useState([]); // Lista de todos los artículos
  const [cartDetails, setCartDetails] = useState([]); // Lista de artículos con info detallada
  const [totalPrice, setTotalPrice] = useState(0); // Total del carrito

  async function getUsers() {
    const response = await fetch("http://localhost:5000/users");
    const data = await response.json();
    data.forEach(user => {
      if (user.id === userID) {
        setUsername(user.username);
      }
    });
  }

  async function fetchCartAndArticles() {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      // Obtener carrito
      const cartResponse = await fetch(`http://localhost:5000/users/${userId}`);
      const user = await cartResponse.json();
      setCartItems(user.cart_ids || []);

      // Obtener artículos
      const articlesResponse = await fetch(`http://localhost:5000/articles`);
      const articlesData = await articlesResponse.json();
      setArticles(articlesData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  useEffect(() => {
    fetchCartAndArticles();
    getUsers();
  }, []);

  useEffect(() => {
    function handleCartUpdate() {
      fetchCartAndArticles(); // Vuelve a cargar el carrito
    }

    // Detecta cambios en localStorage dentro de la misma pestaña
    const interval = setInterval(() => {
      if (localStorage.getItem("cartUpdate")) {
        handleCartUpdate();
        localStorage.removeItem("cartUpdate"); // Limpia para evitar llamadas innecesarias
      }
    }, 500); // Revisar cada 500ms

    return () => clearInterval(interval); // Limpiar cuando se desmonte el componente
  }, []);


  // Filtrar artículos que están en el carrito
  useEffect(() => {
    const filteredCartDetails = articles.filter(article =>
      cartItems.includes(article.id)
    );
    setCartDetails(filteredCartDetails);

    const total = filteredCartDetails.reduce((sum, item) => sum + (item.price || 0), 0);
    setTotalPrice(total);
  }, [cartItems, articles]);

  function closeSession() {
    localStorage.removeItem("userId");
    localStorage.removeItem("articleId")
    localStorage.setItem("isAdmin", "false");
    window.location.href = "/login";
  }

  return (
    <nav className="fixed top-0 bg-gradient-to-r from-gray-600 to-gray-900 shadow-md border-b-2 border-gray-300 px-4 py-0 z-50 w-full">
      <div className="flex items-center justify-between w-full">

        {/* IZQUIERDA: Logo y Menú */}
        <div className="flex items-center space-x-6">
          <Link to={"/"} className="m-0"> <img width={100} src={logo || "/placeholder.svg"} alt="Logo" className="w-20 m-0" /></Link>

          {/* Links en desktop */}
          <div className="hidden lg:flex items-center space-x-6 text-lg text-gray-400">
            <Link to="/" className="hover:text-teal-400">Home</Link>
            <Link to="/articles" className="hover:text-teal-400">Shop</Link>
            <Link to="/comments" className="hover:text-teal-400">Comments</Link>
          </div>

          {/* Botón de menú hamburguesa en mobile */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden focus:outline-none">
            <svg className="w-8 h-8 text-gray-500 hover:text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>

        {/* DERECHA: Carrito, Login/Logout */}
        <div className="flex items-center space-x-4 text-white text-lg" >
          {isAdmin && (
            <Link to="/dashboard" className="hover:text-teal-400">
              <svg className="h-8 w-8 text-gray-500 hover:text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">  <circle cx="12" cy="12" r="3" />  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
            </Link>
          )}
          <div onMouseEnter={() => setCartSummaryVisible(true)}
            onMouseLeave={() => setCartSummaryVisible(false)}>
            <Link to="/cart" className="hover:text-teal-400 relative">
              <svg className="h-8 w-8 text-gray-500 hover:text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </Link>
            {cartSummaryVisible && cartDetails.length > 0 && (
              <div className="absolute right-0 bg-white text-black shadow-lg rounded-md p-4 w-64 mt-2">
                <h3 className="font-semibold border-b pb-2">Cart Summary</h3>
                {cartDetails.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm my-2">
                    <span>{item.name}</span>
                    <span className="font-bold">${item.price.toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 font-bold text-right">Total: ${totalPrice.toFixed(2)}</div>
                <Link to="/cart" className="text-teal-500 hover:underline text-sm block text-right">
                  View Cart
                </Link>
              </div>
            )}
          </div>
          {username && (
            <div className="flex items-center">
              <Link to={"/profile"}>
                <svg className="h-8 w-8 text-gray-500 hover:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Link>
              <Link to="/profile">
                <p className="hover:text-teal-400 ml-2 text-gray-500">{username.toUpperCase()}</p>
              </Link>
            </div>
          )}
          {isLogged ? (
            <button onClick={closeSession} className="hover:text-red-500 flex items-center">
              <svg className="h-8 w-8 text-gray-500 hover:text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          ) : (
            <Link to="/login" className="hover:text-teal-400">
              <svg className="h-8 w-8 text-gray-500 hover:text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      {/* Menú desplegable en mobile */}
      {isMenuOpen && (
        <div className="lg:hidden flex flex-col mt-2 space-y-2 text-gray-400 text-lg">
          <Link to="/" className="hover:text-teal-400">Home</Link>
          <Link to="/articles" className="hover:text-teal-400">Shop</Link>
          <Link to="/comments" className="hover:text-teal-400">Comments</Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
