import "../styles/Home.css"
import apple from "../assets/articles/apple.webp"
import jbl from "../assets/articles/jbl.webp"
import smartwatch from "../assets/articles/smartwatch.webp"
import lenovo from "../assets/articles/lenovo.webp"

const Home = () => {
  return (
    <div className="tech-shop">
     

      <main>
        <section className="hero">
          <div className="container">
            <h1>Welcome to TechShop</h1>
            <p>Discover the latest in technology and gadgets</p>
            <a href="#products" className="cta-button">
              Shop Now
            </a>
          </div>
        </section>

        <section className="featured-products container">
          <h2>Featured Products</h2>
          <div className="product-grid">
            <div className="product-card">
              <img src={apple} alt="Smartphone" />
              <h3>Iphone 16 Pro Max</h3>
              <p>133,99€</p>
              <button>Add to Cart</button>
            </div>
            <div className="product-card">
              <img src={lenovo} alt="Laptop" />
              <h3>Powerful Laptop</h3>
              <p>599,99€</p>
              <button>Add to Cart</button>
            </div>
            <div className="product-card">
              <img src={smartwatch} alt="Smartwatch" />
              <h3>Smartwatch</h3>
              <p>32.99€</p>
              <button>Add to Cart</button>
            </div>
            <div className="product-card">
              <img src={jbl} alt="Wireless Earbuds" />
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

