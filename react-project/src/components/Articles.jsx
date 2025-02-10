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
            <section className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Mobile Phones</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {articles
                        .filter(article => article.category === "mobile")
                        .map((article, key) => (
                            <div key={key} className="bg-white shadow-md rounded-lg p-4 text-center transition-transform transform hover:-translate-y-1">
                                <img src={article.path} alt={article.name} className="w-full h-auto object-cover mb-4 rounded-md" />
                                <h3 className="text-lg font-semibold text-gray-900">{article.name}</h3>
                                <p className="text-teal-600 font-bold my-2">{article.price}</p>
                                <button className="bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded-md transition">Add to Cart</button>
                            </div>
                        ))}
                </div>
                <br />
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Laptops</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="laptops">
                    {articles
                        .filter(article => article.category === "laptop")
                        .map((article, key) => (
                            <div key={key} className="bg-white shadow-md rounded-lg p-4 text-center transition-transform transform hover:-translate-y-1">
                                <img src={article.path} alt={article.name} className="w-full h-auto object-cover mb-4 rounded-md" />
                                <h3 className="text-lg font-semibold text-gray-900">{article.name}</h3>
                                <p className="text-teal-600 font-bold my-2">{article.price}</p>
                                <button className="bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded-md transition">Add to Cart</button>
                            </div>
                        ))}
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">SmartWatch</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="smartwatch">
                    {articles
                        .filter(article => article.category === "smartwatch")
                        .map((article, key) => (
                            <div key={key} className="bg-white shadow-md rounded-lg p-4 text-center transition-transform transform hover:-translate-y-1">
                                <img src={article.path} alt={article.name} className="w-full h-auto object-cover mb-4 rounded-md" />
                                <h3 className="text-lg font-semibold text-gray-900">{article.name}</h3>
                                <p className="text-teal-600 font-bold my-2">{article.price}</p>
                                <button className="bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded-md transition">Add to Cart</button>
                            </div>
                        ))}
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Headphones</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="headphones">
                    {articles
                        .filter(article => article.category === "headphones")
                        .map((article, key) => (
                            <div key={key} className="bg-white shadow-md rounded-lg p-4 text-center transition hover:-translate-y-1">
                                <img src={article.path} alt={article.name} className="w-full h-auto object-cover mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900">{article.name}</h3>
                                <p className="text-teal-600 font-bold my-2">{article.price}</p>
                                <button className="bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded-md transition">Add to Cart</button>
                            </div>
                        ))}
                </div>
            </section>
        </>
    );

}

export default Articles;