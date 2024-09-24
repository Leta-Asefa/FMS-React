import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuBar from './Partials/MenuBar';
import PathBar from './Partials/PathBar';
import FileViewerModal from './PopUps/FileViewerModal';

const FileViewer = () => {
    const location = useLocation();
    const { data } = location.state || { data: [] };  // Default to an empty array if no files are provided
    const [fileData, setFileData] = useState(null);
    const [fileType, setFileType] = useState('');
    const [fileName, setFileName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);



    const handleFileDoubleClick = (fileId) => {
        fetchFile(fileId);
    };

    const fetchFile = async (fileId) => {
        try {
            const response = await fetch('http://localhost:4000/folders/openfile/' + fileId, {
                method: 'GET',
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const formattedData = await response.json();


            const { url, type, name } = formattedData;
            setFileData(url);
            setFileType(type);
            setFileName(name);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error fetching file:', error);
        }
    };


    return (
        <div >
            <div className='w-full'><MenuBar /></div>
            <div className='w-full'> <PathBar /></div>

            {data.length > 0 ? (
                <ul className='overflow-y-scroll' style={{ maxHeight: "508px" }}>
                    {data.map((file, index) => (
                        <li key={index} className='m-1 bg-slate-300 rounded-md p-3 hover:bg-slate-400'
                            onDoubleClick={() => handleFileDoubleClick(file.id)}>
                            {file.name}
                        </li>
                    ))}
                </ul>
            ) : (
                <div className='text-2xl mx-auto w-52'>
                    <img className='w-40 h-40 mx-auto' src='/404.svg' />
                    <p className='text-center'>Not Found</p>
                </div>
            )}



            <FileViewerModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                fileUrl={fileData}
                fileType={fileType}
                fileName={fileName}
            />

        </div>


    );
};

export default FileViewer;
