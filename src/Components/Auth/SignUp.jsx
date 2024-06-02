import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../output.css';
import { UserContext } from '../Context/UserContext';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        organizationName: '',
        password: '',
        role: ''
    });
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [isOrg, setIsOrg] = useState(false)
    const navigate = useNavigate()
    const {setContextRootId}=useContext(UserContext)


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleIsOrg = (e) => {
        setIsOrg(!isOrg)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:4000/auth/signup', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                if (typeof data.error !== 'undefined')
                    setError(data.error)
                console.log(data)
                setContextRootId(data.root._id)
                navigate('/home/'+data.root._id)


            })
            .catch(error => {
                console.error('Fetch error:', error);
            });




    };

    return (
        <div className="signup-container bg-cover  bg-center bg-no-repeat relative " style={{ backgroundImage: `url('/bg-login.svg')` }}>
            <div className="absolute inset-0 bg-black opacity-30"></div>
           
            <form className="signup-form z-50 my-5" onSubmit={handleSubmit}>
                <h2 className="signup-title"> <b className='text-2xl'>A</b>mon<b className='text-2xl'>D</b>MS</h2>

                <div className="mb-4 ">
                    <label htmlFor="role" className="block text-gray-700 text-sm">Sign Up As </label>
                    <select
                        value={isOrg}
                        onChange={handleIsOrg}
                        className="mt-1 block  bg-gray-200 border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                        <option value={false}>User</option>
                        <option value={true}>Organization</option>
                    </select>
                </div>

                <input
                    type="text"
                    name="username"
                    className="signup-input"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <div className='error-box'>{error && error.username}</div>
                {isOrg === false && <div>
                    <input
                        type="text"
                        name="firstName"
                        className="signup-input"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        className="signup-input"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                }
                {isOrg === true &&
                    <input
                        type="text"
                        name="organizationName"
                        className="signup-input"
                        placeholder="Organization Name"
                        value={formData.organizationName}
                        onChange={handleChange}
                        required
                    />
                }
                <input
                    type="password"
                    name="password"
                    className="signup-input"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <div className='error-box'>{error && error.password}</div>
                <button
                    type="submit"
                    className="signup-button"
                >
                    Sign Up
                </button>
                <div className="text-center">
                    <a href='/login' className="signup-link">
                        Already have an account? Login
                    </a>
                </div>
            </form>

            
        </div>
    );
};

export default Signup;
