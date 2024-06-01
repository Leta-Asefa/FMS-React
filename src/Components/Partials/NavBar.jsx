// src/components/Navbar.js
import React from 'react';
import '../../output.css';  
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <Link to="/"><img src='/logo.svg' className='w-6'/></Link>
                    <p> Drive</p>
                </div>
                <ul className="navbar-links">
                    <li>
                        <Link to="/" className="navbar-link">Home</Link>
                    </li>
                    <li>
                        <Link to="/about" className="navbar-link">About</Link>
                    </li>
                    <li>
                        <Link to="/services" className="navbar-link">Services</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="navbar-link">Contact</Link>
                    </li>
                    <li>
                        <Link to="/logout" className="bg-white p-1 cursor-pointer text-red-600 rounded hover:bg-slate-100 font-bold">Logout</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
