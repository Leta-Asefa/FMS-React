import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './Context/UserContext';

const UsersControl = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { contextRootId,setContextRootId } = useContext(UserContext)

 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:4000/folders/users/'+localStorage.getItem('contextRootId'), {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

 
  const handleAccessControlChange = async (userId,username, action) => {

    const updatedUsers = users.map(user => {
      if (user._id === userId) {
        return { ...user, accessControl: action };
      }
      return user;
    });

    setUsers(updatedUsers);

   
    try {
      const user = updatedUsers.find(user => user._id === userId);
      const response = await fetch('http://localhost:4000/folders/updatePermission/'+contextRootId, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, action }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Access control updated successfully:', result);
    } catch (error) {
      console.error('Error updating access control:', error);
    }

   // window.location.reload()
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Filter users based on the search term
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='bg-slate-300 w-full h-screen p-2 mt-0'>
      <h2 className='mx-auto w-20 mb-5'>Users List</h2>
      <input
        type="text"
        placeholder="Search by username"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='w-full rounded-lg px-3 py-1 mb-5'
      />
      <ul className='grid grid-cols-3 gap-x-5'>
        {filteredUsers.map(user => (
          <li key={user._id} className='flex flex-wrap justify-between hover:bg-slate-400 p-2 bg-slate-200 mt-1 rounded-lg'>
            <div>{user.username} <div className='text-xs font-bold'>|| {user.firstName} {user.lastName}</div></div>
            
            <select
              className='rounded-md bg-slate-300'
              value={user.accessControl}
              onChange={e => handleAccessControlChange(user._id,user.username, e.target.value)}
            >
              <option value="read">Read</option>
              <option value="write">Write</option>
              <option value="readWrite">Read & Write</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersControl;
