// Folder.js
import React from 'react';
import '../output.css'; // Import the custom styles

const Folder = ({ name,isSelected }) => {
  return (
    <div className={`folder ${isSelected ==true ? 'bg-slate-400' : ''}`}>
      <div className="folder-icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8 text-gray-700">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2h-7l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      </div>
      <span className="folder-name">{name}</span>
    </div>
  );
};

export default Folder;
