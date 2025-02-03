import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    
    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    async function getUser() {
        const response = await fetch("http://localhost:5000/users");
        const data = await response.json();
        return data;
    }

    function handleSubmit(event) {
        event.preventDefault();
        users.forEach(user => {
            if (user.username === username && user.password === password) {
                alert("You are logged in");
                localStorage.setItem("username", username);

                return window.location.href = "/";
            }
        });
    }

    useEffect(() => {
        getUser().then(data => setUsers(data));
    })

    return (
        <div className="container mt-5">
            <h1 className="text-center">Login</h1>

            <form className="w-50 mx-auto">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={handlePasswordChange}

                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-3" onClick={handleSubmit}>Login</button> <br />
                <div className="d-flex justify-content-end">
                    <p className='me-1'>If you are not user yet, you can register </p><Link to="/register"> here</Link>
                </div>
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

export default Login;