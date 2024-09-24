import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import '../../output.css';
import { UserContext } from '../Context/UserContext';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const { setContextRootId, setIsLoggedIn, contextRootId } = useContext(UserContext)
    const navigate = useNavigate()
  

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
   
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('handle submit called')

        fetch('http://localhost:4000/auth/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            credentials: "include"
        })
            .then(response => {
                console.log(response)
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {


                if (typeof data.error !== 'undefined') {
                    setError(data)
                }
                else {

                    if (typeof data.rootId !== 'undefined') {
                        setContextRootId(data.rootId)
                        localStorage.setItem('contextRootId', data.rootId)
                        localStorage.setItem('organizationName', data.organizationName)
                        localStorage.setItem('orgUsername', data.username)
                        navigate('/home/' + data.rootId)
                    }
                    else {
                        if (data.usersFolder) {
                            localStorage.setItem('orglist', JSON.stringify(data.usersFolder))
                            if (formData.username === '@gonder')
                                localStorage.setItem('organizationName', '@gonder')
                            else
                                localStorage.setItem('organizationName', data.organizationName)
                            navigate('/orglist', { state: { users: data.usersFolder } })
                        }
                        else
                            navigate('/waitingpage')

                    }
                }

            })
            .catch(error => {
                console.error('Fetch error:', error);
                navigate('/signup')
            });



    };

    return (
        <div className="signup-container" >


            <div className='w-full h-full relative'>
                <div class="absolute inset-0 bg-black bg-opacity-20 flex justify-center items-center">  </div>
                <div class="text-white text-xl absolute inset-0  flex flex-col justify-between items-center p-10 ">
                 </div>
                <img src='/bg.jpg' className='w-full h-full ' />
            </div>

            <form className="signup-form mx-auto" onSubmit={handleSubmit}>
                <h2 className=" text-4xl text-center text-black font-extrabold mt-10"> የጎንደር ከተማ አስተዳደር መረጃ መቆጣጠሪያ ሲስተም</h2>
                <h2 className=" text-xl text-center text-black font-extrabold mt-4"> Gonder City Adminstration Document Managment System</h2>



                <h2 className="signup-title mt-24">Login</h2>

                <input
                    type="text"
                    name="username"
                    className="signup-input"
                    placeholder="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    className="signup-input"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button
                    type="submit"
                    className="signup-button"
                >
                    Login
                </button>
                <div className='error-box'>{error && error.error}</div>

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
