import { Link } from "react-router-dom"
import "../styles/Home.css"
import arrow from "../assets/arrow.png"


const Home = () => {
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
            <img className="arrow" src={arrow} alt="" />
          </div>
        </section>

        <section className="featured-products container">
          <h2>Featured Products</h2>
          <div className="product-grid">
            <div className="product-card">
              <img src="" alt="Smartphone" />
              <h3>Iphone 16 Pro Max</h3>
              <p>133,99€</p>
              <button>Add to Cart</button>
            </div>
            <div className="product-card">
              <img src="" alt="Laptop" />
              <h3>Powerful Laptop</h3>
              <p>599,99€</p>
              <button>Add to Cart</button>
            </div>
            <div className="product-card">
              <img src="" alt="Smartwatch" />
              <h3>Smartwatch</h3>
              <p>32.99€</p>
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

