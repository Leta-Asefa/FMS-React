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
    const { setContextRootId } = useContext(UserContext)
    


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleIsOrg = (e) => {
        setIsOrg(!isOrg)
    }

    const handleSubmit = (e) => {
        e.preventDefault();



        fetch('http://gonderdms.onrender.com/auth/signup', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            credentials:'include'
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
                else {
                    if (formData.organizationName) {
                        setContextRootId(data.root._id)
                        localStorage.setItem('contextRootId', data.root._id)
                        localStorage.setItem('organizationName', formData.organizationName)
                        localStorage.setItem('orgUsername',data.username)
                        navigate('/home/' + data.root._id)
                    }
                    else
                    {
                        setContextRootId('')
                        localStorage.setItem('contextRootId','')
                        navigate('/waitingpage')
                     }
                    
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });




    };

    return (
        <div className="signup-container h-full">
           
           <div className='w-full h-full relative'>
                <div class="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center">  </div>
                <div class="text-white text-xl absolute inset-0  flex flex-col justify-between items-center p-10 ">
                </div>
                <img src='/bg.jpg' className='w-full h-full ' />
            </div>


            <form className="signup-form  mx-auto" onSubmit={handleSubmit}>
            <h2 className=" text-4xl text-center text-black font-extrabold mt-10"> የጎንደር ከተማ አስተዳደር መረጃ መቆጣጠሪያ ሲስተም</h2>
                <h2 className=" text-xl text-center text-black font-extrabold mt-4"> Gonder City Adminstration Document Managment System</h2>

                <h2 className="signup-title mt-16">Signup</h2>

                <div className="mb-4 ">
                    <label htmlFor="role" className="block text-black text-sm">Sign Up As </label>
                    <select
                        value={isOrg}
                        onChange={handleIsOrg}
                        className="mt-1 block  bg-white border border-black rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
