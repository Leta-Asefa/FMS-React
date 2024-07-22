import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

const FileSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const { isEnglish } = useContext(UserContext)

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = async () => {
    try {

      setLoading(true);
      const username = localStorage.getItem('orgUsername')
      console.log("Username", username)

      const response = await fetch(`http://gonderdms.onrender.com/folders/search/${searchTerm}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ username })
      });
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data = await response.json();
      navigate(`/file-viewer`, { state: { data } });

    } catch (error) {
      console.error('Error searching files:', error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className='flex items-center gap-5 text-white'>
      <input
        type="text"
        placeholder={isEnglish ? "Search files..." : `ፋይል ለመፈለግ የፋይል ስም ያስገቡ...  `}
        value={searchTerm}
        onChange={handleSearchChange}
        className='rounded-md bg-slate-300 px-3 py-2 text-black'
      />
      <button onClick={handleSearchClick} disabled={loading} className='rounded-md bg-blue-600 hover:bg-blue-700 hover:fontbold p-2'>
        {loading
          ? (isEnglish ? 'Searching...' : 'እየፈለገ ነው...')
          : (isEnglish ? 'Search' : 'ፈልግ')}
      </button>
    </div>
  );
};

export default FileSearch;
