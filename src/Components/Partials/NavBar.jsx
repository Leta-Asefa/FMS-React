// src/components/Navbar.js
import React, { useContext } from 'react';
import '../../output.css';  
import { Link } from 'react-router-dom';
import LanguageToggle from './LanguageToggle';
import { UserContext } from '../Context/UserContext';

const Navbar = () => {

    const { isEnglish } = useContext(UserContext)
    const { contextRootId, setContextRootId } = useContext(UserContext);



    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                  <div className='mr-0 bg-white'><img src='/logo.png' /></div>  
                    <Link to="/">  <p className='text-sm pr-4'> {isEnglish?"Gonder City Administration DMS" :" የጎንደር ከተማ መስተዳደር መረጃ መቆጣጠሪያ ሲስተም"}</p></Link>
                  
                </div>
                <ul className="navbar-links">
                    <LanguageToggle/>
                    <li>
                        <Link to={`/home/${contextRootId}`} className="navbar-link">{isEnglish?"Home" :"ማህደር"}</Link>
                    </li>
                    <li>
                        <a href="#footer" className="navbar-link">{isEnglish?"About" :"ስለ እኛ"}</a>
                    </li>
                    <li>
                        <a to="#footer" className="navbar-link">{isEnglish?"Services" :"አገልግሎቶቸ"}</a>
                    </li>
                    <li>
                        <a to="#footer" className="navbar-link">{isEnglish?"Contacts" :"አድራሻ"}</a>
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
