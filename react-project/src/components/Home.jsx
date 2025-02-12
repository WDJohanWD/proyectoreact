import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa"; // Importar ícono de flecha
import "../styles/Home.css";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [article1, setArticle1] = useState(null);
  const [article2, setArticle2] = useState(null);
  const [article3, setArticle3] = useState(null);
  const [article4, setArticle4] = useState(null);

  async function fetchArticles() {
    try {
      const response = await fetch("http://localhost:5000/articles");
      if (!response.ok) {
        throw new Error("Error fetching articles");
      }
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  }

  function categoryArticle(category) {
    return articles.find((article) => article.category === category) || null;
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    if (articles.length > 0) {
      setArticle1(categoryArticle("mobile"));
      setArticle2(categoryArticle("laptop"));
      setArticle3(categoryArticle("smartwatch"));
      setArticle4(categoryArticle("headphones"));
    }
  }, [articles]);

  // Función para hacer scroll hacia "Featured Products"
  const scrollToFeatured = () => {
    const featuredSection = document.getElementById("featured");
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="tech-shop">
      <main>
        {/* HERO SECTION */}
        <section className="hero relative text-white py-20 flex flex-col items-center justify-center text-center">
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl font-bold">Welcome to SmartSphere</h1>
            <p className="mt-4 text-lg">Discover the latest in technology and gadgets</p>
            <Link
              to="/articles"
              className="mt-6 inline-block bg-teal-600 hover:bg-teal-500 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Shop Now
            </Link>

            {/* FLECHA DE SCROLL */}
            <div
              className="flecha animate-bounce cursor-pointer flex flex-col items-center"
              onClick={scrollToFeatured}
            >
              <p className="text-lg font-semibold"></p>
              <FaArrowDown className="text-4xl mt-2 text-teal-300 hover:text-teal-500 transition duration-300" />
            </div>
          </div>
        </section>

        {/* FEATURED PRODUCTS SECTION */}
        <section className="container mx-auto px-4 py-16">
          <h2 id="featured" className="text-3xl font-semibold text-center text-gray-800 mb-10">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[article1, article2, article3, article4].map((article, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 text-center transition-transform transform hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={article?.path || ""}
                  alt={article?.name || "Product"}
                  className="w-full h-auto object-cover mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900">{article?.name || "Product"}</h3>
                <p className="text-teal-600 font-bold my-2">{article?.price ? `${article.price}€` : "N/A"}</p>
                <button className="bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg transition">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
