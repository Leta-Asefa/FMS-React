import React, { useContext, useState } from 'react';
import { UserContext } from '../Context/UserContext';

const LanguageToggle = () => {
  const {isEnglish,setIsEnglish} = useContext(UserContext);

  const handleChangeLanguage = () => {
      setIsEnglish(!isEnglish);
      
  };

  return (
    <div >
      
      <select className='rounded-md p-1' id="languageSelect" value={isEnglish ? 'english' : 'amharic'} onChange={handleChangeLanguage}>
        <option value="english">English</option>
        <option value="amharic">አማርኛ </option>
      </select>
    </div>
  );
};

export default LanguageToggle;
