import React from 'react';
import "bootstrap-icons/font/bootstrap-icons.css"; 
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary w-100">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link text-white">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/articles" className="nav-link text-white">Articles</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className="nav-link text-white">Contact</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to="/login" className="nav-link text-white"> <i className="bi bi-box-arrow-in-right dark h4"></i></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
