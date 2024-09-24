import React, { useState, useEffect } from 'react';

const FolderList = () => {
    const [folders, setFolders] = useState([]);
    const [folderName, setFolderName] = useState('');
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchFolders();
    }, []);

    const fetchFolders = async () => {
        const response = await fetch('http://localhost:5000/folders');
        const data = await response.json();
        setFolders(data);
    };

    const addFolder = async (parentId = null) => {
        const response = await fetch(parentId ? `http://localhost:5000/folders/${parentId}/subfolders` : 'http://localhost:5000/folders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: folderName, path: parentId ? `${selectedFolder.path}${selectedFolder.name}/` : '/' })
        });
        const data = await response.json();
        if (parentId) { 
            setFolders(folders.map(folder => folder.id === parentId ? { ...folder, subfolders: [...folder.subfolders, data] } : folder));
        } else {
            setFolders([...folders, data]);
        }
        setFolderName('');
    };

    const deleteFolder = async (id) => {
        await fetch(`http://localhost:5000/folders/${id}`, {
            method: 'DELETE'
        });
        setFolders(folders.filter(folder => folder.id !== id));
    };

    const uploadFile = async (folderId) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`http://localhost:5000/folders/${folderId}/files`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        setFolders(folders.map(folder => folder.id === folderId ? data : folder));
        setFile(null);
    };

    const renderFolders = (folders) => {
        return folders.map(folder => (
            <li key={folder.id}>
                {folder.name}
                <button onClick={() => deleteFolder(folder.id)}>Delete</button>
                <button onClick={() => setSelectedFolder(folder)}>Select</button>
                {folder.subfolders.length > 0 && (
                    <ul>
                        {renderFolders(folder.subfolders)}
                    </ul>
                )}
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <button onClick={() => uploadFile(folder.id)}>Upload File</button>
                {folder.files.length > 0 && (
                    <ul>
                        {folder.files.map(file => (
                            <li key={file.id}>
                                {file.name} ({file.size} bytes)
                            </li>
                        ))}
                    </ul>
                )}
            </li>
        ));
    };

    return (
        <div>
            <h1>Folder Management</h1>
            <input
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Add new folder"
            />
            <button onClick={() => addFolder(selectedFolder ? selectedFolder.id : null)}>Add Folder</button>
            <ul>
                {renderFolders(folders)}
            </ul>
        </div>
    );
};

export default FolderList;
