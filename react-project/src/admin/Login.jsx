import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    const [msg, setMsg] = useState("");

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    async function getUser() {
        const response = await fetch("http://localhost:5000/users");
        const data = await response.json();
        return data;
    }

    function handleSubmit(event) {
        event.preventDefault();
        setMsg(""); // Reset the message before checking credentials
        let userFound = false;
        users.forEach(user => {
            if (user.username === username) {
                userFound = true;
                if (user.password === password) {
                    if (user.username === "admin") {
                        localStorage.setItem("isAdmin", true);
                    } else {
                        localStorage.setItem("isAdmin", false);
                    }
                    localStorage.setItem("username", username);
                    return window.location.href = "/";
                } else {
                    setMsg("Password is incorrect");
                }
            }
        });
        if (!userFound) {
            setMsg("User not found");
        }
    }

    useEffect(() => {
        getUser().then(data => setUsers(data));
    }, []); // Add an empty dependency array to run only once

    return (
        <div className="edit-container container mt-5">
            <h1 className="text-center">Login</h1>

            <form className="edit-form w-75 mx-auto" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label className='edit-label' htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="edit-input form-control"
                        id="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div className="form-group">
                    <label className='edit-label' htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="edit-input form-control"
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit" className="save-btn btn btn-primary mt-3">Login</button>
                {msg && (
                    <div className={`message ${msg.includes("successfully") ? "message-success" : "message-error"}`}>
                        <span>{msg.includes("successfully") ? "✔️" : "⚠️"}</span> {msg}
                    </div>
                )}



                <div className="d-flex justify-content-end">
                    <p className='me-1'>If you are not user yet, you can register </p><Link to="/register"> here</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;