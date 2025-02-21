import "../styles/Articles.css";
import { useEffect, useState } from "react";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [msg, setMsg] = useState("");
  const [filter, setFilter] = useState("all");

  async function fetchArticles() {
    const response = await fetch("http://localhost:5000/articles");
    const data = await response.json();
    setArticles(data);
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  async function addCart(productId) {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setMsg("You need to be logged in.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`);
      const user = await response.json();

      let updatedCart = user.cart_ids ? [...user.cart_ids] : [];

      if (!updatedCart.includes(productId)) {
        updatedCart.push(productId);

        await fetch(`http://localhost:5000/users/${userId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart_ids: updatedCart }),
        });

        localStorage.setItem("cartUpdate", Date.now());
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  const handleFilterChange = (category) => {
    setFilter(category);
  };

  const buttonStyle = (category) => {
    // Change button style when the filter is active
    return `font-semibold py-2 px-4 rounded-md transition shadow-md ${filter === category ? 'bg-white text-teal-600 border border-teal-600' : 'bg-teal-600 hover:bg-white hover:border border-teal-600 hover:text-teal-600 text-white'}`;
  };

  return (
    <>
      <section className="container mx-auto px-4 mt-12 py-8">
        <div className="bg-white rounded-lg shadow-md p-4 text-center mb-6">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => handleFilterChange("all")}
              className={buttonStyle("all")}
            >
              All
            </button>
            <button
              onClick={() => handleFilterChange("mobile")}
              className={buttonStyle("mobile")}
            >
              Mobiles
            </button>
            <button
              onClick={() => handleFilterChange("laptop")}
              className={buttonStyle("laptop")}
            >
              Laptops
            </button>
            <button
              onClick={() => handleFilterChange("smartwatch")}
              className={buttonStyle("smartwatch")}
            >
              Smartwatches
            </button>
            <button
              onClick={() => handleFilterChange("headphones")}
              className={buttonStyle("headphones")}
            >
              Headphones
            </button>
          </div>
        </div>

        {msg && (
          <div className="p-3 text-center rounded-lg font-medium bg-red-100 text-red-700 border-l-4 border-red-700">
            ⚠️ {msg}
          </div>
        )}

        {/* Render articles based on the selected filter */}
        {filter === "all" || filter === "mobile" ? (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-teal-500 pb-2">
              Mobiles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {articles
                .filter((article) => article.category === "mobile")
                .map((article, key) => (
                  <div
                    key={key}
                    className="bg-white shadow-md rounded-lg p-4 text-center transition-transform transform hover:-translate-y-1"
                  >
                    <img
                      src={article.path}
                      alt={article.name}
                      className="w-full h-auto object-cover mb-4 rounded-md"
                    />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {article.name}
                    </h3>
                    <p className="text-teal-600 font-bold my-2">{article.price}€</p>
                    <button
                      onClick={() => addCart(article.id)}
                      className="bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded-md transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
            </div>
          </>
        ) : null}
        
        {filter === "all" || filter === "laptop" ? (
          <>
            <h2 className="text-xl font-semibold text-gray-800 my-6 border-b-2 border-teal-500 pb-2">
              Laptops
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="laptops">
              {articles
                .filter((article) => article.category === "laptop")
                .map((article, key) => (
                  <div
                    key={key}
                    className="bg-white shadow-md rounded-lg p-4 text-center transition-transform transform hover:-translate-y-1"
                  >
                    <img
                      src={article.path}
                      alt={article.name}
                      className="w-full h-auto object-cover mb-4 rounded-md"
                    />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {article.name}
                    </h3>
                    <p className="text-teal-600 font-bold my-2">{article.price}€</p>
                    <button
                      onClick={() => addCart(article.id)}
                      className="bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded-md transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
            </div>
          </>
        ) : null}

        {filter === "all" || filter === "smartwatch" ? (
          <>
            <h2 className="text-xl font-semibold text-gray-800 my-6 border-b-2 border-teal-500 pb-2">
              Smartwatches
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="smartwatch">
              {articles
                .filter((article) => article.category === "smartwatch")
                .map((article, key) => (
                  <div
                    key={key}
                    className="bg-white shadow-md rounded-lg p-4 text-center transition-transform transform hover:-translate-y-1"
                  >
                    <img
                      src={article.path}
                      alt={article.name}
                      className="w-full h-auto object-cover mb-4 rounded-md"
                    />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {article.name}
                    </h3>
                    <p className="text-teal-600 font-bold my-2">{article.price}€</p>
                    <button
                      onClick={() => addCart(article.id)}
                      className="bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded-md transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
            </div>
          </>
        ) : null}

        {filter === "all" || filter === "headphones" ? (
          <>
            <h2 className="text-xl font-semibold text-gray-800 my-6 border-b-2 border-teal-500 pb-2">
              Headphones
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="headphones">
              {articles
                .filter((article) => article.category === "headphones")
                .map((article, key) => (
                  <div
                    key={key}
                    className="bg-white shadow-md rounded-lg p-4 text-center transition hover:-translate-y-1"
                  >
                    <img
                      src={article.path}
                      alt={article.name}
                      className="w-full h-auto object-cover mb-4"
                    />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {article.name}
                    </h3>
                    <p className="text-teal-600 font-bold my-2">{article.price}€</p>
                    <button
                      onClick={() => addCart(article.id)}
                      className="bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded-md transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
            </div>
          </>
        ) : null}
      </section>
    </>
  );
};

export default Articles;
