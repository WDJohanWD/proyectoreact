import React from 'react';
    
import 'bootstrap/dist/css/bootstrap.min.css';  
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="navbar-brand">
                <a href="/">Logo</a>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-a me-2">Home </Link> <br />
                    </li>
                    <li className="nav-item">
                        <Link to="/articles" className="nav-a me-2" >  Articles  </Link> <br />
                    </li>
                    <li className="nav-item">
                        <a className="nav-a" href="/login">Login</a> <br />
                    </li>
                </ul>
                
            </div>
        </nav>
    );
};

export default NavBar;