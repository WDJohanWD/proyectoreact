import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {

    //Form Fields
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    //Validation and Navigation
    const [users, setUsers] = useState([]);
    const [msg, setMsg] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    //Fetch Users
    useEffect(() => {
        async function receiveUsers() {
            const response = await fetch("http://localhost:5000/users");
            const data = await response.json();
            setUsers(data);
        }
        receiveUsers();
    }, []);

    //Validation Functions
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
    const checkUsernameExists = (username) => users.some(user => user.username === username.toLowerCase());

    //Functions to handle
    const handleUsernameChange = (event) => {
        const value = event.target.value;
        setUsername(value);
        setErrors(prev => ({
            ...prev,
            username: checkUsernameExists(value) ? "Username already exists" : ""
        }));
    };

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        setErrors(prev => ({
            ...prev,
            email: validateEmail(value) ? "" : "Invalid email format"
        }));
    };

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);
        setErrors(prev => ({
            ...prev,
            password: validatePassword(value) ? "" : "Password must be at least 8 characters, contain an uppercase letter, a lowercase letter, and a number"
        }));
    };

    const handleRepeatPasswordChange = (event) => {
        const value = event.target.value;
        setRepeatPassword(value);
        setErrors(prev => ({
            ...prev,
            repeatPassword: value !== password ? "Passwords do not match" : ""
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMsg("");

        if (Object.values(errors).some(error => error) || !username || !email || !password || !repeatPassword) {
            setMsg("Please fix the errors before submitting");
            return;
        }

        if (checkUsernameExists(username)) {
            setMsg("Username already exists");
            return;
        }

        const newUser = {
            username: username.toLowerCase(),
            email,
            password,
            date: new Date().toLocaleString(),
            role: "user",
            cart_ids: []
        };

        const response = await fetch("http://localhost:5000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
        });

        if (response.ok) {
            setUsers([...users, newUser]);
            navigate("/login");
        } else {
            setMsg("Failed to register user");
        }
    };

    return (

        <div className="h-screen flex items-center justify-center w-100">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Register</h1>

                <form className="w-3/4 mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-1">Username</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            placeholder="Username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            placeholder="Email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-1">Repeat password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            placeholder="Repeat Password"
                            value={repeatPassword}
                            onChange={handleRepeatPasswordChange}
                        />
                        {errors.repeatPassword && <p className="text-red-500 text-sm">{errors.repeatPassword}</p>}
                    </div>

                    {msg && (
                        <div className="p-3 text-center rounded-lg font-medium bg-red-100 text-red-700 border-l-4 border-red-700">
                            ⚠️ {msg}
                        </div>
                    )}

                    <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded-lg mt-1 hover:bg-teal-700 transition">
                        Register
                    </button>

                    <div className="flex justify-end mt-3 text-sm">
                        <p className="mr-1">If you are registered, you can login</p>
                        <Link to="/login" className="text-teal-600 hover:underline">here</Link>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Register;
