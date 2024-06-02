import React, { createContext, useState } from 'react';

// Create a context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [path, setPath] = useState('');
  const [currentFolderId, setCurrentFolderId] = useState('')
  const [selectedItems, setSelectedItems] = useState({})
  const [selectedItemsLength, setSelectedItemsLength] = useState(0)
  const [selectedForTransfer, setSelectedForTransfer] = useState(false)
  const [contextRootId, setContextRootId] = useState('')
  const [isLoggedIn,setIsLoggedIn]=useState(false)

  return (
    <UserContext.Provider value={{ name, setName,path,setPath,currentFolderId,setCurrentFolderId,selectedItems,setSelectedItems,selectedItemsLength,setSelectedItemsLength,selectedForTransfer,setSelectedForTransfer,contextRootId,setContextRootId,isLoggedIn,setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
