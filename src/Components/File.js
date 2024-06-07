// Folder.js
import React, { useEffect, useState } from 'react';
import '../output.css'; // Import the custom styles

const File = ({ name,isSelected }) => {
  const [source, setSource] = useState('')
  useEffect(() => {
    if (name.includes('.png'))
      setSource('/png.svg')
   else if (name.includes('.jpg'))
       setSource('/jpg.svg')
    else if (name.includes('.jpeg'))
         setSource('/jpeg.svg')
   else if (name.includes('.mp4'))
      setSource('/mp4.svg')
   else if (name.includes('.pdf'))
      setSource('/pdf.svg')
   else if (name.includes('.txt'))
      setSource('/txt.svg')
   else if (name.includes('.doc') || name.includes('.docx'))
      setSource('/word.svg')
   else if (name.includes('.xls') || name.includes('.xlsx'))
      setSource('/excel.svg')
   else if (name.includes('.ppt') || name.includes('.pptx'))
      setSource('/ppt.svg')
   else 
    setSource('/default.svg')
  }, [name])


  return (
    <div  className={`folder ${isSelected ==true ? 'bg-slate-400' : ''}`}>
      <div className="folder-icon">
        <img src={source} className='w-8 h-8' />
      </div>
      <span className="folder-name">{name}</span>
    </div>
  );
};

export default File;
