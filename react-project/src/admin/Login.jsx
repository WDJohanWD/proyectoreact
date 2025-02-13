import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    const [msg, setMsg] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        async function getUsers() {
            try {
                const response = await fetch("http://localhost:5000/users");
                if (!response.ok) throw new Error("Failed to fetch users");
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
                setMsg("Error fetching user data");
            }
        }
        getUsers();
    }, []);

    function validateFields() {
        let newErrors = {};
        if (!username.trim()) newErrors.username = "Username is required";
        if (!password.trim()) newErrors.password = "Password is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleUsernameChange(event) {
        setUsername(event.target.value);
        setErrors(prev => ({ ...prev, username: "" }));
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
        setErrors(prev => ({ ...prev, password: "" }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        setMsg("");

        if (!validateFields()) return;

        const user = users.find(user => user.username === username.trim().toLowerCase());

        if (!user) {
            return setMsg("User not found");
        }

        if (user.password !== password.trim()) {
            return setMsg("Password is incorrect");
        }

        localStorage.setItem("isAdmin", user.username === "admin" ? "true" : "false");
        localStorage.setItem("username", user.username);
        localStorage.setItem("userId", user.id)
        window.location.href = "/";
    }

    return (
        <div className="max-w-md mx-auto my-20 p-6 bg-white rounded-lg shadow-md w-100">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Login</h1>
            <form className="w-3/4 mx-auto" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-1">Username</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        placeholder="Enter username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-1">Password</label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        placeholder="Enter password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                {msg && (
                    <div className="p-3 text-center rounded-lg font-medium flex items-center justify-center gap-2 text-sm bg-red-100 text-red-700 border-l-4 border-red-700">
                        ⚠️ {msg}
                    </div>
                )} <br />
                <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded-lg mt-4 hover:bg-teal-700 transition">Login</button>
                
                <div className="justify-end mt-3 text-sm">
                    <p className='mr-1'>If you are not a user yet, you can register</p>
                    <Link to="/register" className="text-teal-600 hover:underline">here</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
