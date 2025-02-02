import { Link } from 'react-router-dom';

const Login = () => {
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
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-3">Login</button> <br />
                <div className="d-flex justify-content-end">
                    <Link to="/register">If you are not user yet, you can register here</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;