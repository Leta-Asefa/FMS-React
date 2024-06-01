import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import '../../output.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('handle submit called')

       



    };

    return (
        <div className="signup-container bg-cover bg-center bg-no-repeat relative " style={{ backgroundImage: `url('/bg-login.jpg')` }}>
             <div className="absolute inset-0 bg-black opacity-50"></div>
      
            <form className="signup-form z-50" onSubmit={handleSubmit}>
            <h2 className="signup-title"> <b className='text-3xl'>A</b>mon<b className='text-3xl'>D</b>MS</h2>
                <h2 className="signup-title">Login</h2>
               
                <input
                    type="email"
                    name="email"
                    className="signup-input"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <div className='error-box'>{error && error.error.email}</div>
                <input
                    type="password"
                    name="password"
                    className="signup-input"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <div className='error-box'>{error && error.error.password}</div>
                <button
                    type="submit"
                    className="signup-button"
                >
                    Login
                </button>
                <div className="text-center">
                     <NavLink to="/signup" className="signup-link">
                        Create an account ? Signup Here
                    </NavLink>
                </div>
            </form>

        </div>
    );
};

export default Login;
