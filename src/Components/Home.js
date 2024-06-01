// FoldersGrid.js
import React, { useContext, useEffect, useState } from 'react';
import File from './File';
import '../input.css';
import Folder from './Folder';
import { useParams } from 'react-router';
import { UserContext } from './Context/UserContext';
import { Link } from 'react-router-dom';
import MenuBar from './Partials/MenuBar';
import PathBar from './Partials/PathBar';

const Home = () => {
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { setPath, setCurrentFolderId,selectedItems, setSelectedItems,setSelectedItemsLength,selectedItemsLength,selectedForTransfer } = useContext(UserContext)
    const { id } = useParams()
    const [rootId,setRootId]=useState('')
    const baseUrl = 'http://localhost:4000/folders/all_populated/'


    const handleCheckboxChange = (id, isFile, parentId) => {
        
        console.log("ParentId",parentId)

        setSelectedItems((prevSelectedItems) => {
            const newSelectedItems = { ...prevSelectedItems };
            
            
            if (newSelectedItems[id]?.selected) {
                // If the item is already selected, remove it from the object
                delete newSelectedItems[id];
            } else {
                // Otherwise, add it to the object as selected
                newSelectedItems[id] = {
                    selected: true, // Set selected to true
                    isFile: isFile // Store the file type indicator
                };
            }
            
            newSelectedItems['parentId']=parentId
    
            return newSelectedItems;
        });
    };
    
    
    useEffect(() => {

        
        setSelectedItemsLength(()=> Object.keys(selectedItems).length-1)
        console.log( "Length = "+ selectedItemsLength,selectedItems)

    },[selectedItems])



    useEffect(() => {
        const fetchSites = async () => {
            const constructedUrl = id ? `${baseUrl}${id}` : baseUrl

            try {

                const response = await fetch(constructedUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                
                if (!id)
                    setRootId(data._id)
                    
                const folders = data.subfolders.map((sub) => ({ folderId: sub._id, folderName: sub.name }))
                const files = data.files.map((file) => ({ fileId: file._id, fileName: file.name }))

                setFiles(files)
                setFolders(folders);
                setPath(data.path)
                setCurrentFolderId(data._id)
                setLoading(false);
                if (!selectedForTransfer) {
                    setSelectedItems({})
                }

            } catch (error) {

                console.error('Error fetching sites:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchSites();
    }, [id]);

    return (
        <div className="flex flex-wrap gap-0 p-1">
            <div className='w-full'><MenuBar /></div>
            <div className='w-full'> <PathBar /></div>
            {folders.map((folder, index) => (
                <div key={folder.folderId} className="w-1/5 p-2 relative">

                    <input type='checkbox'
                        className='absolute top-3 left-3'
                        checked={!!selectedItems[folder.folderId]?.selected}
                        onChange={() => handleCheckboxChange(folder.folderId, false,id?id:rootId)}
                    />

                    <Link to={`/home/${folder.folderId}`}><Folder name={folder.folderName} isSelected={!!selectedItems[folder.folderId]?.selected} /></Link>

                </div>
            ))}
            {files.map((file, index) => (
                <div key={file.fileId} className="w-1/5 p-2 relative">

                    <input
                        type='checkbox'
                        className='absolute top-3 left-3'
                        checked={!!selectedItems[file.fileId]?.selected}
                        onChange={() => handleCheckboxChange(file.fileId, true)}
                    />

                    <File name={file.fileName} isSelected={!!selectedItems[file.fileId]?.selected} />

                </div>
            ))}
        </div>
    );
};

export default Home;
