
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

    function handleDelete(id) {
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









    useEffect(() => {
        getUsers().then(data => setUsers(data));
        getArticles().then(data => setArticles(data));
    }, []);

    return (<div className="dashboard">
        {msg && (
            <div className={`message ${msg.includes("successfully") ? "message-success" : "message-error"}`}>{msg}</div>
        )}
        <div className="table-container">
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/register">
                <button className="btn btn-primary btn-block">Add new user</button>
            </Link>
        </div>

        <div className="table-container">
            <h1>Articles</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((article) => (
                        <tr key={article.id}>
                            <td>{article.name}</td>
                            <td>{article.price}</td>
                            <td>{article.category}</td>
                            <td>{article.stock}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(article.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/add-article">
                <button className="btn btn-primary btn-block">Add new article</button>
            </Link>
        </div>
    </div>)

};


export default Dashboard;