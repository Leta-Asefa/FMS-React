import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../../output.css'; // Import the custom styles

const SideBar = () => {
    const image = 'w-5';
    const location = useLocation();

    return (
        <aside className="sidebar">
            <nav>
                <NavLink to="/home" className={`sidebar-link ${location.pathname === '/home' ? 'active-link-bg' : ''}`}>
                    <img src='/home.svg' className={image} />
                    <p>Home</p>
                </NavLink>
                <NavLink to="/adduser" className={`sidebar-link ${location.pathname === '/adduser' ? 'active-link-bg' : ''}`}>
                    <img src='/adduser.svg' className={image} />
                    <p>Add User</p>
                </NavLink>
                <NavLink to="/alloweduser" className={`sidebar-link ${location.pathname === '/alloweduser' ? 'active-link-bg' : ''}`}>
                    <img src='/allowed.svg' className={image} />
                    <p>Allowed Users</p>
                </NavLink>
                <NavLink to="/changepassword" className={`sidebar-link ${location.pathname === '/changepassword' ? 'active-link-bg' : ''}`}>
                    <img src='/changepassword.svg' className={image} />
                    <p>Change Password</p>
                </NavLink>
            </nav>
        </aside>
    );
};

export default SideBar;
