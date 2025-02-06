import { useState, useEffect } from 'react';

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
        <div>
            <h1>Edit Article</h1>
            <p>This is an edit article component.</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={name} onChange={handleChange} />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="text" name="price" value={price} onChange={handleChange} />
                </div>
                <div>
                    <label>Stock:</label>
                    <input type="text" name="stock" value={stock} onChange={handleChange} />
                </div>
                <div>
                    <label>Category:</label>
                    <select name="category" value={category} onChange={handleChange}>
                        <option value="laptop">Laptop</option>
                        <option value="mobile">Mobile</option>
                        <option value="tablet">Tablets</option>
                        <option value="headphones">Headphones</option>
                        <option value="smartwatch">Smart Watch</option>
                    </select>
                </div>
                <button type="submit">Update Article</button>
            </form>
        </div>
    );
};

export default EditArticle;