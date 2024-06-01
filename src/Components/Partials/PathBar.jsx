// src/components/MenuBar.js
import React, { useContext } from 'react';
import { UserContext } from '../Context/UserContext';

const PathBar = () => {
    const {path}=useContext(UserContext)
    const style = ' rounded hover:border-black border-2'
    const image = 'w-8 p-1 '
    return (
        <div className='flex gap-5 border-b-2 border-gray-300 items-center'>
            <img src='/path.svg' className={image}></img>
            <p>{path}</p>
        </div>
    );
};

export default PathBar;
