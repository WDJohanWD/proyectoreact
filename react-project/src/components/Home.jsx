import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import "../styles/Home.css";


const Home = () => {
  const [articles, setArticles] = useState([]);
  const [article1, setArticle1] = useState(null);
  const [article2, setArticle2] = useState(null);
  const [article3, setArticle3] = useState(null);
  const [article4, setArticle4] = useState(null);
  const [brands, setBrands] = useState([]);

  async function fetchBrands() {
    try {
      const response = await fetch("http://localhost:5000/brands");
      if (!response.ok) {
        throw new Error("Error fetching brands");
      }
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  }

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
    fetchBrands()
  }, []);

  useEffect(() => {
    if (articles.length > 0) {
      setArticle1(categoryArticle("mobile"));
      setArticle2(categoryArticle("laptop"));
      setArticle3(categoryArticle("smartwatch"));
      setArticle4(categoryArticle("headphones"));
    }
  }, [articles]);

  const scrollToFeatured = () => {
    const featuredSection = document.getElementById("featured");
    if (featuredSection) {
      window.scrollTo({ top: featuredSection.offsetTop - 50, behavior: "smooth" });
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
              className="mt-6 mb-12 inline-block bg-teal-600 hover:bg-teal-500 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Shop Now
            </Link>

            {/* FLECHA DE SCROLL */}
            <div
              className="mt-12 cursor-pointer flex flex-col items-center transition-all duration-300 ease-in-out transform hover:scale-110"
              onClick={scrollToFeatured}
            >
              <FaArrowDown className="text-4xl mt-2 text-teal-600 hover:text-teal-500 transition duration-300 animate-bounce" />
            </div>
          </div>
        </section>

        {/* FEATURED PRODUCTS SECTION */}
        <section id="featured" className="container mx-auto px-4 py-10">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
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

        {/* BRANDS WE WORK WITH */}
        <section className="   w-full  py-16"> {/* Ocupa TODO el ancho */}
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
            Brands We Work With
          </h2>
          <div className="overflow-hidden relative w-full h-[250px] flex items-center">
            <div className="flex animate-marquee whitespace-nowrap gap-16 min-w-full"> {/* Asegura que ocupe toda la anchura */}
              {brands.concat(brands).map((brand, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-[300px] h-[200px] max-w-none object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>




      </main>
    </div>
  );
};

export default Home;
