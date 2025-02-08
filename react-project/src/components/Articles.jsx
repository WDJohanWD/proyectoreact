import "../styles/Articles.css"
import { useEffect, useState } from "react"
const Articles = () => {
    const [articles, setArticles] = useState([])

    async function fetchArticles() {
        const response = await fetch("http://localhost:5000/articles")
        const data = await response.json()
        setArticles(data)
    }

    useEffect(() => {
        fetchArticles()
    })

    return (
        <>
            <section className="featured-products container">
                <h2>Mobile phones</h2>
                <div className="product-grid"> 
                    {articles
                        .filter(article => article.category === "mobile")
                        .map((article, key) => (
                            <div key={key} className="product-card">
                                <img src={article.path} alt={article.name} />
                                <h3>{article.name}</h3>
                                <p>{article.price}</p>
                                <button>Add to Cart</button>
                            </div>
                        ))
                    }
                </div> <br />
                <h2>Laptops</h2>
                <div className="product-grid" id="laptops">
                    {articles
                        .filter(article => article.category === "laptop")
                        .map((article, key) => (
                            <div key={key} className="product-card">
                                <img src={article.path} alt={article.name} />
                                <h3>{article.name}</h3>
                                <p>{article.price}</p>
                                <button>Add to Cart</button>
                            </div>
                        ))
                    }
                </div>
                <h2>SmartWatch</h2>
                <div className="product-grid" id="laptops">
                    {articles
                        .filter(article => article.category === "smartwatch")
                        .map((article, key) => (
                            <div key={key} className="product-card">
                                <img src={article.path} alt={article.name} />
                                <h3>{article.name}</h3>
                                <p>{article.price}</p>
                                <button>Add to Cart</button>
                            </div>
                        ))
                    }
                </div>
                <h2>Headphones</h2>
                <div className="product-grid" id="laptops">
                    {articles
                        .filter(article => article.category === "headphones")
                        .map((article, key) => (
                            <div key={key} className="product-card">
                                <img src={article.path} alt={article.name} />
                                <h3>{article.name}</h3>
                                <p>{article.price}</p>
                                <button>Add to Cart</button>
                            </div>
                        ))
                    }
                </div>
            </section>
        </>
    );

}

export default Articles;