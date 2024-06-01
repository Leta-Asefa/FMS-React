import React, { useState, useEffect } from 'react';

const AddUsers = ({ onSelect }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  
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
  const handleAddUsers = () => {
    // Pass selected users to parent component
    onSelect(selectedUsers);
  };

  return (
    <div className='mx-auto w-80 p-5 bg-slate-300 rounded-md mt-10' >
      <input
        type="text"
        placeholder="Search by username"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='w-full rounded-lg px-3 py-1 mb-5'
          />
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id} className='p-2 hover:bg-slate-400 rounded-md'>
            <input
              type="checkbox"
              checked={selectedUsers.includes(user)}
              onChange={() => handleCheckboxChange(user)}
            />
            {user.username}
          </li>
        ))}
      </ul>
      <button className='bg-blue-500 text-white rounded-md px-3 py-1 w-full hover:bg-blue-600 mt-5' onClick={handleAddUsers}>Add Users</button>
    </div>
  );
};

export default AddUsers;
