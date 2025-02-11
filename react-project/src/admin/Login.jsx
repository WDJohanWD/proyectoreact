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
        <div className="max-w-md mx-auto my-20 p-6 bg-white rounded-lg shadow-md w-100 h-100 ">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Login</h1>
        <form className="w-3/4 mx-auto" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 font-semibold mb-1">Username</label>
                <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2  focus:ring-teal-500 focus:outline-none"
                    id="username"
                    placeholder="Enter username"
                    value={username}
                    onChange={handleUsernameChange}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Password</label>
                <input
                    type="password"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded-lg mt-4 hover:bg-teal-700 transition">Login</button>
            {msg && (
                <div className={`p-3 text-center rounded-lg font-medium flex items-center justify-center gap-2 text-sm ${msg.includes("successfully") ? "bg-green-100 text-green-700 border-l-4 border-green-700" : "bg-red-100 text-red-700 border-l-4 border-red-700"}`}>
                    <span>{msg.includes("successfully") ? "✔️" : "⚠️"}</span> {msg}
                </div>
            )}
            <div className="justify-end mt-3 text-sm">
                <p className='mr-1'>If you are not a user yet, you can register</p>
                <a href="/register" className="text-teal-600 hover:underline m-0">here</a>
            </div>
        </form>
    </div>
    );
}

export default Login;