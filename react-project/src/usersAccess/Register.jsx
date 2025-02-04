import { useState, useEffect } from "react";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [users, setUsers] = useState([]);
    const [msg, setMsg] = useState("");

    function handleUsernameChange(event) {
        setUsername(event.target.value);
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
        const newUser = { username, password };
        setUsers([...users, newUser]);
        setUsername("");
        setPassword("");
        setRepeatPassword("");

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
        <div className="container mt-5">
            <h1 className="text-center">Register</h1>
            <form className="w-50 mx-auto" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div> <br/>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div><br/>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Repeat Password"
                        value={repeatPassword}
                        onChange={handleRepeatPasswordChange}
                    />
                </div> <br />
                {msg && <div className="alert alert-danger mt-1">{msg}</div>}
                <button type="submit" className="btn btn-primary btn-block">Register</button>
            </form>

            

            {users.map((user, index) => (
                <div key={index}>
                    <h3>{user.username}</h3>
                    <p>{user.password}</p>
                </div>
            ))}
        </div>
    );
}

export default Register;
