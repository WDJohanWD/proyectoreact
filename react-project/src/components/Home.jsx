import "../styles/Home.css"

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
              <img src="/placeholder.svg?height=200&width=200" alt="Smartphone" />
              <h3>Latest Smartphone</h3>
              <p>$999</p>
              <button>Add to Cart</button>
            </div>
            <div className="product-card">
              <img src="/placeholder.svg?height=200&width=200" alt="Laptop" />
              <h3>Powerful Laptop</h3>
              <p>$1299</p>
              <button>Add to Cart</button>
            </div>
            <div className="product-card">
              <img src="/placeholder.svg?height=200&width=200" alt="Smartwatch" />
              <h3>Smartwatch</h3>
              <p>$299</p>
              <button>Add to Cart</button>
            </div>
            <div className="product-card">
              <img src="/placeholder.svg?height=200&width=200" alt="Wireless Earbuds" />
              <h3>Wireless Earbuds</h3>
              <p>$159</p>
              <button>Add to Cart</button>
            </div>
          </div>
        </section>
      </main>

      
    </div>
  )
}

export default Home

