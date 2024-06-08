import React, { useState, useRef, useEffect, useContext } from 'react';
import '../../output.css'; 
import { UserContext } from '../Context/UserContext';

const CreateNewFolder = ({ isOpen, onClose, onCreate }) => {
  const [folderName, setFolderName] = useState('');
  const popupRef = useRef(null);
  const { isEnglish } = useContext(UserContext)

  
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (folderName.trim()) {
      onCreate(folderName);
      setFolderName('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay z-50">
      <div ref={popupRef} className="popup-box relative">
        <button className="close-button" onClick={onClose}>&times;</button>
        <form onSubmit={handleSubmit}>
          <label htmlFor="folderName" className="block text-gray-700">{isEnglish ? "Folder Name" : "የዶሴ ስም"}
  
  </label>
          <input
            type="text"
            id="folderName"
            className="input-field"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            style={{fontFamily: 'Noto Sans Ethiopic'}}
          />
          <button type="submit" className="button">{isEnglish ? "Create" : "ፍጠር"}</button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewFolder;
