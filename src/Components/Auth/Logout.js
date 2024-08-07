import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import '../../output.css';
import { UserContext } from '../Context/UserContext';

const Logout = () => {
    const navigate = useNavigate()
    const { setName,setPath,setCurrentFolderId,setSelectedItems,setSelectedItemsLength,setSelectedForTransfer,setContextRootId,setIsLoggedIn}=useContext(UserContext)
    useEffect(() => {
        fetch('https://gonderdms.onrender.com/auth/logout', {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials:"include"
        })
        setName('')
        setPath('')
        setCurrentFolderId('')
        setSelectedItems({})
        setSelectedItemsLength(0)
        setSelectedForTransfer(false)
        setContextRootId('')
        setIsLoggedIn(false)
        localStorage.setItem('contextRootId', '')
        localStorage.setItem('orglist', '')
        localStorage.setItem('role', '')
        localStorage.setItem('organizationName', '')
        localStorage.setItem("orgUsername",'')
        navigate('/login') 
    },[])

    return (
        <div>
      

        </div>
    );
};

export default Logout;
