import { useState, useEffect } from "react";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [users, setUsers] = useState([]);

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
            alert("Passwords do not match");
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
            alert("Failed to register user");
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
