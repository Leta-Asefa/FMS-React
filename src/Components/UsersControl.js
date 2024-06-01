import React, { useState } from 'react';

const UsersControl = () => {
  // Hardcoded array of user objects
  const [users,setUsers] = useState([
    { id: 1, name:"Abebe" , username: 'user1', accessControl: 'read' },
    { id: 2, name:"Kebede" ,  username: 'user2', accessControl: 'write' },
    { id: 3, name:"Shemsu" ,  username: 'user3', accessControl: 'read-write' },
  ]);

  // Function to handle access control change
  const handleAccessControlChange = (userId, e) => {
    // Update the access control for the selected user
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        user.accessControl = e.target.value;
      }
      return user;
    });
    // Update the state with the updated users
    setUsers(updatedUsers);
  };

  return (
    <div className='bg-slate-300 w-96 mx-auto p-2 rounded-lg mt-5'>
      <h2 className='mx-auto w-20 mb-5'>Users List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id} className='grid grid-cols-3 hover:bg-slate-400 p-2 bg-slate-200 mt-1 rounded-lg' >
                <div>{user.username}</div>
                <div>{user.name}</div>
            <select className='rounded-md bg-slate-300' value={user.accessControl} onChange={e => handleAccessControlChange(user.id, e)}>
              <option value="read">Read</option>
              <option value="write">Write</option>
              <option value="read-write">Read & Write</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersControl;
