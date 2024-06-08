import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from './Context/UserContext';

const OrgList = () => {
    const location = useLocation();
    const { setContextRootId } = useContext(UserContext)
    let { usersFolder } = location.state || { usersFolder: [] };
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const {isEnglish}=useContext(UserContext)

    useEffect(() => {
     
    if (users.length === 0) {
      const storedUsers = JSON.parse(localStorage.getItem('orglist') || '[]');
      usersFolder = storedUsers;
        }
        setUsers(usersFolder)
  },[]);

    const handleOrgLink = (rootId,role,username) => {
        setContextRootId(rootId);
        localStorage.setItem('contextRootId', rootId);
        localStorage.setItem('role', role)
        localStorage.setItem('orgUsername',username)
        navigate(`/home/${rootId}`);
   }
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{isEnglish ? "You have been included under this companies" : "እርስዎን ያካተቱ (የመዘገቡ) ድርጅቶች ስም ዝርዝር"}</h1>
            <ul className="pl-5">
                {users.map((user, index) => (
                    <button key={index} onClick={()=>handleOrgLink(user.rootId,user.role,user.username)} className='block w-full hover:bg-slate-300 rounded-2xl'>
                        <li  className="mb-2  px-5 py-2 flex gap-10">
                            <img  src='/organization.svg' className='w-10 h-10'/>
                            <div className='text-left'>
                            <div className="font-semibold "> {user.organizationName}</div> 
                            <div className="font-semibold text-sm">|| {user.username}</div> 
                            </div>
                        </li>
                        </button>
                ))}
            </ul>
        </div>
    );
};

export default OrgList;
