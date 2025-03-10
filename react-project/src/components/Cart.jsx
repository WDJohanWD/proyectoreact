import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
    const [articlesId, setArticlesId] = useState([]); // Lista de IDs de artículos en el carrito
    const [articles, setArticles] = useState([]); // Detalles de los artículos
    const [quantities, setQuantities] = useState({}); // Cantidades de los artículos

    async function fetchArticles() {
        const response = await fetch("http://localhost:5000/articles");
        const data = await response.json();
        setArticles(data);
    }

    async function fetchList() {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            console.error("No userId found in localStorage");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/users/${userId}`);
            const user = await response.json();

            const cartItems = user.cart_ids || [];
            console.log("Carrito:", cartItems);

            setArticlesId(cartItems);
        } catch (error) {
            console.error("Error al obtener el carrito:", error);
        }
    }

    async function cleanCart() {
        const userId = localStorage.getItem("userId");
    
        if (!userId) {
            console.error("No userId found in localStorage");
            return;
        }
    
        try {
            await fetch(`http://localhost:5000/users/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cart_ids: [] }),
            });
    
            setArticlesId([]); // Limpiar el carrito en la interfaz
            localStorage.setItem("cartUpdate", Date.now()); // Notificar el cambio
        } catch (error) {
            console.error("Error al limpiar el carrito:", error);
        }
    }
    

    async function removeFromCart(id) {
        const userId = localStorage.getItem("userId");
    
        if (!userId) {
            console.error("No userId found in localStorage");
            return;
        }
    
        // Filtrar el carrito y eliminar el artículo con el ID seleccionado
        const updatedCart = articlesId.filter(cartId => cartId !== id);
        setArticlesId(updatedCart);
    
        try {
            await fetch(`http://localhost:5000/users/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cart_ids: updatedCart }),
            });
    
            localStorage.setItem("cartUpdate", Date.now()); // Notificar el cambio
        } catch (error) {
            console.error("Error al eliminar el artículo del carrito:", error);
        }
    }
    

    const handleQuantityChange = (id, quantity) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: quantity,
        }));
    };

    const calculateTotal = () => {
        return articlesId.reduce((total, cartId) => {
            const article = articles.find(article => article.id === cartId);
            if (article) {
                const quantity = quantities[article.id] || 1;
                total += article.price * quantity;
            }
            return total;
        }, 0);
    };

    useEffect(() => {
        fetchList();
        fetchArticles();
    }, []);

    return (
        <div className="bg-white rounded-lg shadow-md p-4 text-center my-6 container mx-auto px-4 mt-25">
            <h2 className="text-3xl font-semibold text-center text-gray-800">Your Shopping Cart</h2>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
                {articlesId
                    .map(cartId => articles.find(article => article.id === cartId))
                    .filter(Boolean)
                    .map((article, index) => (
                        <div key={index} className="flex items-center justify-between w-full max-w-md p-4 border rounded-md shadow-md bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200" >
                            {/* Imagen del producto */}
                            <img
                                src={article.path}
                                alt={article.name}
                                className="w-16 h-16 object-cover mr-4"
                            />
                            {/* Información del producto */}
                            <div className="flex flex-col flex-grow">
                                <p className="font-semibold">{article.name}</p>
                                <p className="text-teal-600 font-bold my-2">{article.price}€</p>

                                {/* Selector de cantidad */}
                                <div className="flex items-center">
                                    <label htmlFor={`quantity-${article.id}`} className="mr-2">Quantity:</label>
                                    <select
                                        id={`quantity-${article.id}`}
                                        value={quantities[article.id] || 1}
                                        onChange={(e) => handleQuantityChange(article.id, parseInt(e.target.value))}
                                        className="border rounded-md p-1"
                                    >
                                        {[...Array(article.stock).keys()].map(n => (
                                            <option key={n} value={n + 1}>{n + 1}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Botón de eliminar */}
                            <button
                                onClick={() => removeFromCart(article.id)}
                               className="bg-red-700 hover:bg-red-500 text-white px-4 py-1 rounded-md transition"
                            >
                                Remove
                            </button>
                        </div>
                    ))
                }
            </div>

            {/* Mostrar el total */}
            <div className="text-xl font-semibold mt-4 mb-4">
                {calculateTotal() === 0 ? (
                    <p className="text-md font-light">Your cart is empty</p>
                ) : (

                    <p >Total: {calculateTotal().toFixed(2)}€</p>
                )}

            </div>
            <button onClick={cleanCart} className="bg-white border border-teal-600 text-teal-600 font-semibold py-2 px-4 rounded-md transition shadow-md me-4 hover:text-teal-500 hover:border-teal-500">
                Empty cart
            </button>
            <Link to={"/pay"} className="bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded-md transition shadow-md">
                Pay out
            </Link>
        </div>
    );
};

export default Cart;
