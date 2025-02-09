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
        <div className="edit-container mt-5">
            <h1 className="edit-tittle text-center">Register</h1>
            <form className="edit-form w-75 mx-auto" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="username" className="edit-label">Username</label>
                    <input    
                        type="text"
                        className="edit-input form-control"
                        placeholder="Username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div className="form-group">
                <label htmlFor="email" className="edit-label">Email</label>
                    <input
                        type="email"
                        className="edit-input form-control"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div className="form-group">
                <label htmlFor="password" className="edit-label">Password</label>
                    <input
                        type="password"
                        className="edit-input form-control"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="form-group">
                <label htmlFor="repeat-password" className="edit-label">Repeat password</label>
                    <input
                        type="password"
                        className="edit-input form-control"
                        placeholder="Repeat Password"
                        value={repeatPassword}
                        onChange={handleRepeatPasswordChange}
                    />
                </div> 
                {msg && (
                    <div className={`message ${msg.includes("successfully") ? "message-success" : "message-error"}`}>
                        <span>{msg.includes("successfully") ? "✔️" : "⚠️"}</span> {msg}
                    </div>
                )}

                <button type="submit" className="save-btn mb-2">Register</button>
            </form>
        </div>
    );
}

export default Register;
