import { useState, useEffect } from "react";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [users, setUsers] = useState([]);
    const [msg, setMsg] = useState("");

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleRepeatPasswordChange(event) {
        setRepeatPassword(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (password !== repeatPassword) {
            setMsg("Passwords do not match");
            return;
        }
        const isRepeat = users.some(user => {
            if (user.username === username) {
                setMsg("Username already exists");
                return true;
            }
            return false;
        });
        if (isRepeat) {
            return;
        }
        const registrationDate = new Date().toLocaleString();
        const newUser = { username: username.toLowerCase(), password, email, date: registrationDate, role: "user" };
        setUsers([...users, newUser]);
        setUsername("");
        setPassword("");
        setRepeatPassword("");
        setEmail("");

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

    async function receiveUsers() {
        const response = await fetch("http://localhost:5000/users");
        const data = await response.json();
        setUsers(data);
    }

    useEffect(() => {
        receiveUsers();
    }, []);

    return (
        <div className="max-w-md m-auto my-20 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Register</h1>
        <form className="w-3/4 mx-auto" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 font-semibold mb-1">Username</label>
                <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email</label>
                <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Password</label>
                <input
                    type="password"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="repeat-password" className="block text-gray-700 font-semibold mb-1">Repeat password</label>
                <input
                    type="password"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    placeholder="Repeat Password"
                    value={repeatPassword}
                    onChange={handleRepeatPasswordChange}
                />
            </div>
            {msg && (
                <div className={`p-3 text-center rounded-lg font-medium flex items-center justify-center gap-2 text-sm ${msg.includes("successfully") ? "bg-green-100 text-green-700 border-l-4 border-green-700" : "bg-red-100 text-red-700 border-l-4 border-red-700"}`}>
                    <span>{msg.includes("successfully") ? "✔️" : "⚠️"}</span> {msg}
                </div>
            )}
            <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded-lg mt-4 hover:bg-teal-700 transition">Register</button>
            <div className="flex justify-end mt-3 text-sm">
                <p className='mr-1'>If you are register yet, you can login</p>
                <a href="/login" className="text-teal-600 hover:underline">here</a>
            </div>
        </form>
    </div>
    );
}

export default Register;
