
import { useEffect, useState } from 'react';
import "../styles/Dashboard.css";

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [articles, setArticles] = useState([]);
    const [msg, setMsg] = useState("");

    async function getUsers() {
        const response = await fetch("http://localhost:5000/users");
        const data = await response.json();
        return data;
    }

    async function getArticles() {
        const response = await fetch("http://localhost:5000/articles");
        const data = await response.json();
        return data;
    }

    function handleDeleteUser(id) {
        const newUsers = users.filter(user => user.id !== id);
        setUsers(newUsers);
        fetch(`http://localhost:5000/users/${id}`, {
            method: "DELETE",
        }).then(response => {
            if (response.ok) {
                setMsg("User deleted successfully");
            } else {
                setMsg("Failed to delete user");
            }
        });
    }

    function handleDeleteArticle(id) {
        fetch(`http://localhost:5000/articles/${id}`, {
            method: "DELETE",
        }).then(response => {
            if (response.ok) {
                setMsg("Article deleted successfully");
            } else {
                setMsg("Failed to delete article");
            }
        });

    }


    function handleEditArticle(id) {
        localStorage.setItem("articleId", id);
        window.location.href = "/edit-article";
    }

    function handleEditUser(id) {
        localStorage.setItem("userId", id);
        window.location.href = "/edit-user";
    }


    function newUser() {
        window.location.href = "/register";
    }







    useEffect(() => {
        getUsers().then(data => setUsers(data));
        getArticles().then(data => setArticles(data));
    }, []);

    return (
        <section className="container mx-auto px-4 py-8">
            {/* Mensaje de éxito o error */}
            {msg && (
                <div
                    className={`p-3 text-center rounded-lg font-medium flex items-center justify-center gap-2 text-sm 
            ${msg.includes("successfully") ? "bg-green-100 text-green-700 border-l-4 border-green-700" :
                            "bg-red-100 text-red-700 border-l-4 border-red-700"}`}
                >
                    <span>{msg.includes("successfully") ? "✔️" : "⚠️"}</span> {msg}
                </div>
            )}

            {/* Sección de Usuarios */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Users</h1>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Username</th>
                                <th className="border border-gray-300 px-4 py-2">Email</th>
                                <th className="border border-gray-300 px-4 py-2">Role</th>
                                <th className="border border-gray-300 px-4 py-2">Registration Date</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border border-gray-200">
                                    <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.date ? user.date.substring(0, 8) : "N/A"}</td>
                                    <td className="border border-gray-300 px-4 py-2 flex gap-2">
                                        <button
                                            className="bg-red-700 hover:bg-red-500 text-white px-4 py-1 rounded-md transition"
                                            onClick={() => handleDeleteUser(user.id)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="bg-yellow-600 hover:bg-yellow-400 text-white px-4 py-1 rounded-md transition"
                                            onClick={() => handleEditUser(user.id)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button
                    className="mt-4 bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded-md transition"
                    onClick={newUser}
                >
                    Add new user
                </button>
            </div>

            {/* Sección de Artículos */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Articles</h1>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Price</th>
                                <th className="border border-gray-300 px-4 py-2">Category</th>
                                <th className="border border-gray-300 px-4 py-2">Stock</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map((article) => (
                                <tr key={article.id} className="border border-gray-200">
                                    <td className="border border-gray-300 px-4 py-2">{article.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{article.price}</td>
                                    <td className="border border-gray-300 px-4 py-2">{article.category}</td>
                                    <td className="border border-gray-300 px-4 py-2">{article.stock}</td>
                                    <td className="border border-gray-300 px-4 py-2 flex gap-2">
                                        <button
                                            className="bg-red-700 hover:bg-red-500 text-white px-4 py-1 rounded-md transition"
                                            onClick={() => handleDeleteArticle(article.id)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="bg-yellow-600 hover:bg-yellow-400 text-white px-4 py-1 rounded-md transition"
                                            onClick={() => handleEditArticle(article.id)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>


    )

};


export default Dashboard;