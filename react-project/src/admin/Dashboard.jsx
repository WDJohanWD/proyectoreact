
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

    function handleEdit(id) {
        localStorage.setItem("articleId", id);
        window.location.href = "/edit-article";
    }

    function newUser() {
        window.location.href = "/register";
    }







    useEffect(() => {
        getUsers().then(data => setUsers(data));
        getArticles().then(data => setArticles(data));
    }, []);

    return (
        <div className="dashboard-container">
            {msg && (
                <div className={`dashboard-message ${msg.includes("successfully") ? "dashboard-message-success" : "dashboard-message-error"}`}>
                    {msg}
                </div>
            )}
            <div className="dashboard-table-container">
                <h1 className="dashboard-title">Users</h1>
                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Registration Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    {user.date}
                                </td>
                                <td>
                                    <button className="dashboard-btn dashboard-btn-danger" onClick={() => handleDelete(user.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                    <button className="dashboard-btn dashboard-btn-primary" onClick={newUser}>Add new user</button>
                
            </div>

            <div className="dashboard-table-container">
                <h1 className="dashboard-title">Articles</h1>
                <table className="dashboard-table">
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
                                    <button className="dashboard-btn dashboard-btn-danger" onClick={() => handleDelete(article.id)}>
                                        Delete
                                    </button>

                                    <button className="dashboard-btn dashboard-btn-warning ms-2" onClick={() => handleEdit(article.id)}>
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

};


export default Dashboard;