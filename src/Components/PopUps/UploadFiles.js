import React, { useState, useRef, useEffect, useContext } from 'react';
import '../../output.css'; // Ensure your styles are correctly imported
import { UserContext } from '../Context/UserContext';

const UploadFiles = ({ isOpen, onClose, onUpload }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);
    const popupRef = useRef(null);
    const {isEnglish}=useContext(UserContext)

  
    


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

    const handleFileInputChange = (e) => {
        setSelectedFiles([...e.target.files]);
    };

    const handleUpload = () => {
        onUpload(selectedFiles);
        setSelectedFiles([]);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="popup-overlay z-50">
            <div ref={popupRef} className="popup-box relative">
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2 className='text-2xl'>  {isEnglish ? "Upload Files" : "ፋይሎችን ወደ ሰርቨር ላክ (ጫን)"}
    </h2>
                <br></br>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                    multiple
                    
                 
                />
                <br></br>
                <button onClick={handleUpload} className='button'>  {isEnglish ? "Upload" : "ላክ (ጫን)"}
    </button>
            </div>
        </div>
    );
};

export default UploadFiles;
