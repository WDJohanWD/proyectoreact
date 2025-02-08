import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import "../styles/Home.css"

const Home = () => {
  const [articles, setArticles] = useState([])
  const [article1, setArticle1] = useState(null)
  const [article2, setArticle2] = useState(null)
  const [article3, setArticle3] = useState(null)

  async function fetchArticles() {
    try {
      const response = await fetch("http://localhost:5000/articles")
      if (!response.ok) {
        throw new Error("Error fetching articles")
      }
      const data = await response.json()
      setArticles(data)
    } catch (error) {
      console.error("Error fetching articles:", error)
    }
  }

  function categoryArticle(category) {
    return articles.find(article => article.category === category) || null
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  useEffect(() => {
    if (articles.length > 0) {
      setArticle1(categoryArticle("mobile"))
      setArticle2(categoryArticle("laptop"))
      setArticle3(categoryArticle("smartwatch"))
    }
  }, [articles])

  return (
    <div className="tech-shop">
      <main>
        <section className="hero">
          <div className="container">
            <h1>Welcome to SmartSphere</h1>
            <p>Discover the latest in technology and gadgets</p>
            <Link to="/articles" className="cta-button">
              Shop Now
            </Link>
          </div>
        </section>

        <section className="featured-products container">
          <h2 id="featured">Featured Products</h2>
          <div className="product-grid">
            <div className="product-card">
              <img src={article1?.path || ""} alt="Smartphone" />
              <h3>{article1?.name || "Smartphone"}</h3>
              <p>{article1?.price ? `${article1.price}€` : "N/A"}</p>
              <button>Add to Cart</button>
            </div>
            <div className="product-card">
              <img src={article2?.path || ""} alt="Laptop" />
              <h3>{article2?.name || "Laptop"}</h3>
              <p>{article2?.price ? `${article2.price}€` : "N/A"}</p>
              <button>Add to Cart</button>
            </div>
            <div className="product-card">
              <img src={article3?.path || ""} alt="Smartwatch" />
              <h3>{article3?.name || "Smartwatch"}</h3>
              <p>{article3?.price ? `${article3.price}€` : "N/A"}</p>
              <button>Add to Cart</button>
            </div>
            <div className="product-card">
              <img src="" alt="Wireless Earbuds" />
              <h3>Wireless Earbuds</h3>
              <p>59,99€</p>
              <button>Add to Cart</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home
