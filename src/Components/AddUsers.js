import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './Context/UserContext';

const AddUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { contextRootId } = useContext(UserContext)
  const [popupVisible, setPopupVisible] = useState(false); // State to manage popup visibility
  const {isEnglish}=useContext(UserContext)

 
  useEffect(() => {
    // Your fetch logic here to get the list of users
    const fetchData = async () => {
      try {
        // Fetch users from the server
        const response = await fetch('https://gonderdms.onrender.com/auth/all/users');
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

      const response = await fetch('https://gonderdms.onrender.com/folders/permission/' + contextRootId, {
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
      setPopupVisible(true); // Display the popup after successful removal
      setTimeout(() => {
        setPopupVisible(false); // Hide the popup after a certain duration
      }, 2000);
      
      window.location.reload()
  
    } catch (error) {
      console.error('Error adding users:', error);
    }




  };

  return (
    <div className=' w-full h-screen p-5 bg-slate-300' >
      <input
        type="text"
        placeholder={isEnglish ? "Search by username" : "የተጠቃሚውን ስም (@username) በማስገባት ይፈልጉ ..."}
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
      <button className='bg-blue-500 text-white rounded-md px-3 py-1 w-full hover:bg-blue-600 mt-5' onClick={handleAddUsers}> {isEnglish ? "Add Users" : "ተጠቃሚዎችን ጨምር"}
</button>

      {popupVisible && (
        <div className="fixed bottom-10 right-5 bg-green-400 text-white p-3 rounded-md">
          {isEnglish ? " Users added successfully!" : "ተጠቃሚዎች በተሳካ መንገድ ተጨምረዋል !"}

        </div>
      )}
    </div>
  );
};

export default AddUsers;
