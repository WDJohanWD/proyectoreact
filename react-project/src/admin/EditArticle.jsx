import { useState, useEffect } from 'react';
import "../styles/Edit.css"

const EditArticle = () => {
    const id = Number(localStorage.getItem("articleId"));
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [path, setPath] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        const fetchArticle = async () => {
            const response = await fetch(`http://localhost:5000/articles/${Number(id)}`);
            if (response.ok) {
                const data = await response.json();
                setName(data.name);
                setPrice(data.price);
                setStock(data.stock);
                setCategory(data.category);
                setPath(data.path);
            } else {
                console.error("Failed to fetch article");
                alert("Article not found. Please check the article ID.");
            }
        };

        fetchArticle();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case "name":
                setName(value);
                break;
            case "price":
                setPrice(value);
                break;
            case "stock":
                setStock(value);
                break;
            case "category":
                setCategory(value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name,
            price,
            stock,
            category,
            path
        };

        const response = await fetch(`http://localhost:5000/articles/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });


        if (response.ok) {
            console.log("Article updated successfully");
            window.location.href = "/dashboard";
        } else {
            console.error("Failed to update article");
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-semibold text-center mb-4">Edit Article</h1>
            <p className="text-center text-gray-600 mb-6">This is an edit article component.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium">Name:</label>
                    <input
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Price:</label>
                    <input
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        type="text"
                        name="price"
                        value={price}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Stock:</label>
                    <input
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        type="text"
                        name="stock"
                        value={stock}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Category:</label>
                    <select
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        name="category"
                        value={category}
                        onChange={handleChange}
                    >
                        <option value="laptop">Laptop</option>
                        <option value="mobile">Mobile</option>
                        <option value="tablet">Tablets</option>
                        <option value="headphones">Headphones</option>
                        <option value="smartwatch">Smart Watch</option>
                    </select>
                </div>
                <button
                    className="w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 rounded-md transition"
                    type="submit"
                >
                    Update Article
                </button>
            </form>
        </div>

    );
};

export default EditArticle;