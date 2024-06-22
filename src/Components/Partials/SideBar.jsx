import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../../output.css'; // Import the custom styles
import { UserContext } from '../Context/UserContext';

const SideBar = () => {
    const image = 'w-5';
    const location = useLocation();
    const { contextRootId, setContextRootId } = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const { isEnglish } = useContext(UserContext)
  
    useEffect(() => {
        setContextRootId(localStorage.getItem('contextRootId'));
        console.log("Read from Local Storage", localStorage.getItem('contextRootId'));
        console.log(contextRootId);
        
        // Check if the user is an admin based on your criteria
        const organizationName = localStorage.getItem('organizationName');
        if (organizationName === '@gonder'){
            setIsSuperAdmin(true)
            setIsAdmin(false)
        }
        else
         setIsAdmin(!organizationName); // Set isAdmin to true if organizationName is falsy
    }, [setContextRootId, contextRootId]);

    return (
        <aside className="sidebar">
            <nav>
                <NavLink to={`/home/${contextRootId}`} className={`sidebar-link ${location.pathname.includes('/home') ? 'active-link-bg' : ''}`}>
                    <img src='/home.svg' className={image} />
                    <p>{isEnglish?"Home" :"ማህደር"}</p>
                </NavLink>
           
                {isSuperAdmin && (
                    <>
                    <NavLink to="/orglist" className={`sidebar-link ${location.pathname === '/orglist' ? 'active-link-bg' : ''}`}>
                        <img src='/organization.svg' className={image} />
                        <p>{isEnglish?"MyOrgs" :"የምሰራባቸው ድርጅቶቸ"}</p>
                    </NavLink>
                    <NavLink to="/notification" className={`sidebar-link ${location.pathname === '/notification' ? 'active-link-bg' : ''}`}>
                            <img src='/notification.svg' className={image} />
                            <p>{isEnglish?"Notifications" :"ኖቲፊኬሽንስ"}</p>
                        </NavLink>
                    </>
                )}


                {!isSuperAdmin && (
                    <>
                             {!isAdmin && (
                    <>
                        <NavLink to="/adduser" className={`sidebar-link ${location.pathname === '/adduser' ? 'active-link-bg' : ''}`}>
                            <img src='/adduser.svg' className={image} />
                            <p>{isEnglish?"Add User" :"ተጠቃሚ ጨምር"}</p>
                        </NavLink>
                        <NavLink to="/alloweduser" className={`sidebar-link ${location.pathname === '/alloweduser' ? 'active-link-bg' : ''}`}>
                            <img src='/allowed.svg' className={image} />
                            <p>{isEnglish?"Allowed Users" :"የተፈቀደላቸው ተጠቃሚዎቸ"}</p>
                        </NavLink>
                        <NavLink to="/notification" className={`sidebar-link ${location.pathname === '/notification' ? 'active-link-bg' : ''}`}>
                            <img src='/notification.svg' className={image} />
                            <p>{isEnglish?"Notifications" :"ኖቲፊኬሽንስ"}</p>
                        </NavLink>
                    </>
                )}
                {isAdmin && (
                    <NavLink to="/orglist" className={`sidebar-link ${location.pathname === '/orglist' ? 'active-link-bg' : ''}`}>
                        <img src='/organization.svg' className={image} />
                        <p>{isEnglish?"MyOrgs" :"የምሰራባቸው ድርጅቶቸ"}</p>
                    </NavLink>
                )}
                    </>
                )}
                <NavLink to="/changepassword" className={`sidebar-link ${location.pathname === '/changepassword' ? 'active-link-bg' : ''}`}>
                    <img src='/changepassword.svg' className={image} />
                    <p>{isEnglish?"Change Password" :"የይለፍ ቃል ቀይር"}</p>
                </NavLink>
            </nav>
        </aside>
    );
};

export default SideBar;
