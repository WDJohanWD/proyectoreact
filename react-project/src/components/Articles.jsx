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

    const [filter, setFilter] = useState("all");

    const handleFilterChange = (category) => {
        setFilter(category);
    };

    return (
        <>
            <section className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-md p-4 text-center mb-6">
                    <p className="text-lg font-semibold text-gray-800 mb-3">Filter by kind of element:</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <button
                            onClick={() => handleFilterChange("all")}
                            className="bg-teal-600 hover:bg-white hover:border border-teal-600 hover:text-teal-600 text-white font-semibold py-2 px-4 rounded-md transition shadow-md"
                        >
                            All
                        </button>
                        <button
                            onClick={() => handleFilterChange("mobile")}
                            className="bg-teal-600 hover:bg-white hover:border border-teal-600 hover:text-teal-600 text-white font-semibold py-2 px-4 rounded-md transition shadow-md"
                        >
                            Mobile
                        </button>
                        <button
                            onClick={() => handleFilterChange("laptop")}
                            className="bg-teal-600 hover:bg-white hover:border border-teal-600 hover:text-teal-600 text-white font-semibold py-2 px-4 rounded-md transition shadow-md"
                        >
                            Laptops
                        </button>
                        <button
                            onClick={() => handleFilterChange("smartwatch")}
                            className="bg-teal-600 hover:bg-white hover:border border-teal-600 hover:text-teal-600 text-white font-semibold py-2 px-4 rounded-md transition shadow-md"
                        >
                            Smartwatches
                        </button>
                        <button
                            onClick={() => handleFilterChange("headphones")}
                            className="bg-teal-600 hover:bg-white hover:border border-teal-600 hover:text-teal-600 text-white font-semibold py-2 px-4 rounded-md transition shadow-md"
                        >
                            Headphones
                        </button>
                    </div>
                </div>


                {filter === "all" || filter === "mobile" ? (
                    <>
                        <h2 className="text-3xl font-bold text-gray-800 mb-6" id="mobile">Mobile Phones</h2>
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
                    </>
                ) : null}
                {filter === "all" || filter === "laptop" ? (
                    <>
                        <h2 className="text-3xl font-bold text-gray-800 mb-6" id="laptop">Laptops</h2>
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
                    </>
                ) : null}
                {filter === "all" || filter === "smartwatch" ? (
                    <>
                        <h2 className="text-3xl font-bold text-gray-800 mb-6" id="smartwatch">SmartWatch</h2>
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
                    </>
                ) : null}
                {filter === "all" || filter === "headphones" ? (
                    <>
                        <h2 className="text-3xl font-bold text-gray-800 mb-6" id="headphones">Headphones</h2>
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
                    </>
                ) : null}
            </section>
        </>
    );

}

export default Articles;