import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [users, setUsers] = useState([]);
    const [msg, setMsg] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        async function receiveUsers() {
            const response = await fetch("http://localhost:5000/users");
            const data = await response.json();
            setUsers(data);
        }
        receiveUsers();
    }, []);

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePassword(password) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
    }

    function checkUsernameExists(username) {
        return users.some(user => user.username === username.toLowerCase());
    }

    function handleUsernameChange(event) {
        const value = event.target.value;
        setUsername(value);
        setErrors(prev => ({
            ...prev,
            username: checkUsernameExists(value) ? "Username already exists" : ""
        }));
    }

    function handleEmailChange(event) {
        const value = event.target.value;
        setEmail(value);
        setErrors(prev => ({
            ...prev,
            email: validateEmail(value) ? "" : "Invalid email format"
        }));
    }

    function handlePasswordChange(event) {
        const value = event.target.value;
        setPassword(value);
        setErrors(prev => ({
            ...prev,
            password: validatePassword(value) ? "" : "Password must be at least 8 characters, contain an uppercase letter, a lowercase letter, and a number"
        }));
    }

    function handleRepeatPasswordChange(event) {
        const value = event.target.value;
        setRepeatPassword(value);
        setErrors(prev => ({
            ...prev,
            repeatPassword: value !== password ? "Passwords do not match" : ""
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        
        if (Object.values(errors).some(error => error) || !username || !email || !password || !repeatPassword) {
            setMsg("Please fix the errors before submitting");
            return;
        }

        const newUser = {
            username: username.toLowerCase(),
            email,
            password,
            date: new Date().toLocaleString(),
            role: "user",
            cart_ids : []
        };

        setUsers([...users, newUser]);
        setUsername("");
        setEmail("");
        setPassword("");
        setRepeatPassword("");
        setMsg("");

        const response = await fetch("http://localhost:5000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
        });

        if (response.ok) {
            window.location.href = "/login";
        } else {
            setMsg("Failed to register user");
        }
    }

    return (
        <div className="max-w-md m-auto my-20 p-6 bg-white rounded-lg shadow-lg w-100">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Register</h1>
            <form className="w-3/4 mx-auto" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label  className="block text-gray-700 font-semibold mb-1">Username</label>
                    <input type="text"  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none" placeholder="Username" value={username} onChange={handleUsernameChange} />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-1">Email</label>
                    <input type="email"  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none" placeholder="Email" value={email} onChange={handleEmailChange} />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-1">Password</label>
                    <input type="password"  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"placeholder="Password" value={password} onChange={handlePasswordChange} />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-1">Repeat password</label>
                    <input type="password"  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none" placeholder="Repeat Password" value={repeatPassword} onChange={handleRepeatPasswordChange} />
                    {errors.repeatPassword && <p className="text-red-500 text-sm">{errors.repeatPassword}</p>}
                </div>
                {msg && (
                    <div className="p-3 text-center rounded-lg font-medium bg-red-100 text-red-700 border-l-4 border-red-700">
                        ⚠️ {msg}
                    </div>
                )}
                <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded-lg mt-4 hover:bg-teal-700 transition">Register</button>
                <div className="flex justify-end mt-3 text-sm">
                    <p className='mr-1'>If you are registered, you can login</p>
                    <Link to="/login" className="text-teal-600 hover:underline">here</Link>
                </div>
            </form>
        </div>
    );
}

export default Register;
