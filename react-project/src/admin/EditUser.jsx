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
        <div className='edit-container'>
            <h1 className='edit-tittle'>Edit User</h1>
            <p>This is an edit user component.</p>
            <form onSubmit={handleSubmit} className='edit-form'>
                <div>
                    <label className='edit-label'>Username:</label>
                    <input className='edit-input' type="text" name="username" value={username} onChange={handleChange} readOnly />
                </div>
                <div>
                    <label className='edit-label'>Email:</label>
                    <input className='edit-input' type="text" name="email" value={email} onChange={handleChange} readOnly />
                </div>
                <div>
                    <label className='edit-label' >Role:</label>
                    <select className='edit-select' name="role" id="role" value={role} onChange={handleChange}>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>
                
                <button className='save-btn' type="submit">Update User</button>
            </form>
        </div>
    );
};

export default EditUser;