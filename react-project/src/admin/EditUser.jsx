import { useState, useEffect } from 'react';
import "../styles/Edit.css"

const EditUser = () => {
    const id = localStorage.getItem("userId");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("")
    const [role, setRole] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`http://localhost:5000/users/${id}`);
            if (response.ok) {
                const data = await response.json();
                setUsername(data.username);
                setPassword(data.password);
                setEmail(data.email);
                setDate(data.date)
                setRole(data.role);
            } else {
                console.error("Failed to fetch user");
                alert("User not found. Please check the user ID.");
            }
        };

        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case "username":
                setUsername(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "role":
                setRole(value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            username,
            password,
            email,
            date,
            role
        };

        const response = await fetch(`http://localhost:5000/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });


        if (response.ok) {
            console.log("User updated successfully");
            window.location.href = "/dashboard";
        } else {
            console.error("Failed to update user");
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-semibold text-center mb-4">Edit User</h1>
            <p className="text-center text-gray-600 mb-6">This is an edit user component.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium">Username:</label>
                    <input
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleChange}
                        readOnly
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Email:</label>
                    <input
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        readOnly
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Role:</label>
                    <select
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        name="role"
                        value={role}
                        onChange={handleChange}
                    >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>
                <button
                    className="w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 rounded-md transition"
                    type="submit"
                >
                    Update User
                </button>
            </form>
        </div>

    );
};

export default EditUser;