import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './Context/UserContext';

const AddUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { contextRootId } = useContext(UserContext)


  useEffect(() => {
    // Your fetch logic here to get the list of users
    const fetchData = async () => {
      try {
        // Fetch users from the server
        const response = await fetch('http://localhost:4000/auth/all/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle checkbox change
  const handleCheckboxChange = (user) => {
    const isSelected = selectedUsers.includes(user);
    if (isSelected) {
      setSelectedUsers(prevUsers => prevUsers.filter(u => u !== user));
    } else {
      setSelectedUsers(prevUsers => [...prevUsers, user]);
    }
  };

  // Function to handle add users button click
  const handleAddUsers = async () => {

    console.log(selectedUsers)
    try {

      const response = await fetch('http://localhost:4000/folders/permission/' + contextRootId, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Add Content-Type header
        },
        body: JSON.stringify({ selectedUsers: selectedUsers }),
        credentials: 'include'
      });


      if (!response.ok) {
        console.log("ERROR")
        throw new Error('Failed to upload files');
      }

      console.log('Users are added successfully');
    } catch (error) {
      console.error('Error adding users:', error);
    }




  };

  return (
    <div className=' w-full h-screen p-5 bg-slate-300' >
      <input
        type="text"
        placeholder="Search by username"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='w-full rounded-lg px-3 py-1 mb-5'
      />
      <ul className='grid grid-cols-4 gap-x-10'>
        {filteredUsers.map((user, index) => (
          <li key={index} className='p-2 hover:bg-slate-400 rounded-md flex gap-5'>
            <input
              type="checkbox"
              className='w-8'
              checked={selectedUsers.includes(user)}
              onChange={() => handleCheckboxChange(user)}
            />
            <div>
              {user.username}
              <div className='text-xs font-bold'> || {user.firstName} {user.lastName}</div>
            </div>
            
            
          </li>
        ))}
      </ul>
      <button className='bg-blue-500 text-white rounded-md px-3 py-1 w-full hover:bg-blue-600 mt-5' onClick={handleAddUsers}>Add Users</button>
    </div>
  );
};

export default AddUsers;
