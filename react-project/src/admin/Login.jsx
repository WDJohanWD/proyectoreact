import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Login = () => {

    // User Input State
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Validation and Error Handling
    const [users, setUsers] = useState([]);
    const [msg, setMsg] = useState("");
    const [errors, setErrors] = useState({});

    // Navigation Hook
    const navigate = useNavigate();

    // Fetch Users from the Database
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

    // Validate User Input Fields
    function validateFields() {
        let newErrors = {};
        if (!username.trim()) newErrors.username = "Username is required";
        if (!password.trim()) newErrors.password = "Password is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    // Handle Username Input Change
    function handleUsernameChange(event) {
        setUsername(event.target.value);
        setErrors(prev => ({ ...prev, username: "" })); // Remove error message dynamically
    }

    // Handle Password Input Change
    function handlePasswordChange(event) {
        setPassword(event.target.value);
        setErrors(prev => ({ ...prev, password: "" })); // Remove error message dynamically
    }

    // Handle Login Submission
    function handleSubmit(event) {
        event.preventDefault();
        setMsg(""); // Clear previous messages

        if (!validateFields()) return; // Stop if validation fails

        // Find user in the fetched database
        const user = users.find(user => user.username === username.trim().toLowerCase());

        if (!user) {
            return setMsg("User not found");
        }

        if (user.password !== password.trim()) {
            return setMsg("Password is incorrect");
        }

        // Store User Information in Local Storage
        localStorage.setItem("isAdmin", user.role === "admin" ? "true" : "false");
        localStorage.setItem("isLogged", "true"); // Fix typo from "Isloggged"
        localStorage.setItem("userId", user.id);

        // Navigate to Home Page after Successful Login
        navigate("/");
    }

    return (
        <div className="h-screen flex items-center justify-center w-100">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Login</h1>

                <form className="w-3/4 mx-auto" onSubmit={handleSubmit}>
                    {/* Username Input */}
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

                    {/* Password Input */}
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

                    {/* Error Message */}
                    {msg && (
                        <div className="p-3 text-center rounded-lg font-medium flex items-center justify-center gap-2 text-sm bg-red-100 text-red-700 border-l-4 border-red-700">
                            ⚠️ {msg}
                        </div>
                    )}
                    <br />

                    {/* Login Button */}
                    <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded-lg mt-1 hover:bg-teal-700 transition">
                        Login
                    </button>

                    {/* Register Link */}
                    <div className="justify-end mt-3 text-sm">
                        <p className='mr-1'>If you are not a user yet, you can register</p>
                        <Link to="/register" className="text-teal-600 hover:underline">here</Link>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Login;
