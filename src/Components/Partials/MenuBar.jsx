// src/components/MenuBar.js
import React, { useContext, useEffect, useState } from 'react';
import CreateNewFolder from '../PopUps/CreateNewFolder';
import { UserContext } from '../Context/UserContext';
import UploadFiles from '../PopUps/UploadFiles';
import DeleteConfirmation from '../PopUps/DeleteConfirmation';
import RenameFolder from '../PopUps/RenameFolder';
import FileSearch from './FileSearch';

const MenuBar = () => {
    const [openedPopup, setOpendPopup] = useState(null);
    const { currentFolderId, setSelectedItems, selectedItems, selectedItemsLength, contextRootId, setSelectedForTransfer } = useContext(UserContext)
    const [copyText, setCopyText] = useState('')
    const [moveText, setMoveText] = useState('')
    const [isForMove, setIsForMove] = useState(true)
    const style = 'relative rounded hover:border-black border-2'
    const image = 'w-8 p-1 '
    const [role, setRole] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const { isEnglish } = useContext(UserContext)


    useEffect(() => {
        // Retrieve role from localStorage
        const localStrageRole = localStorage.getItem('role');
        setRole(localStrageRole);

        // Check if the user is admin based on organizationName
        const organizationName = localStorage.getItem('organizationName');
        if (organizationName === '@gonder')
            setIsSuperAdmin(true)
        else
            setIsAdmin(!organizationName); // Set isAdmin to true if organizationName is falsy


    }, [contextRootId]); // Empty dependency array ensures this effect runs only once on mount


    useEffect(() => {
        setCopyText(() => selectedItemsLength + " copy")
        setMoveText(() => selectedItemsLength + ' move')
    }, [selectedItemsLength])

    const handleCreatePopup = () => {
        setOpendPopup("create");
    };

    const handleUploadPopup = () => {
        setOpendPopup("upload");
    };
    const handleDeletePopup = () => {
        setOpendPopup("delete");
    };

    const handleRenamePopup = () => {
        setOpendPopup("rename")
    }

    const handleCopyPopup = () => {
        if (openedPopup !== 'copy') {  //use to display copyText
            setOpendPopup("copy")
            setSelectedForTransfer(true)
            setIsForMove(false)
        }
        else {
            handleClosePopup()
            setSelectedForTransfer(false)
        }
    }

    const handleMovePopup = () => {
        if (openedPopup !== 'move') {  //use to display copyText
            setOpendPopup("move")
            setSelectedForTransfer(true)
            setIsForMove(true)
        }
        else {
            handleClosePopup()
            setSelectedForTransfer(false)
            setIsForMove(false)
        }
    }



    const handlePastePopup = async () => {
        console.log(selectedItems)
        const data = {
            newParentId: currentFolderId,
            files: selectedItems,
            parentId: selectedItems.parentId
        }
        const url = isForMove ? 'http://gonderdms.onrender.com/folders/move' : 'http://gonderdms.onrender.com/folders/copy'
        console.log("URL ", url)
        console.log("Data ", data)
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify(data)
            })
            console.log(response)


        } catch (err) {
            console.log(Error, err)
        }

        window.location.reload()

        handleClosePopup()
    }

    const handleClosePopup = () => {
        setOpendPopup(null);
    };

    const handleCreateFolder = async function (folderName) {
        const formData = {
            parentId: currentFolderId,
            name: folderName
        }
        try {
            const response = await fetch('http://gonderdms.onrender.com/folders/add_subfolder', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify(formData)
            })
            console.log(response)
            const data = await response.json()
            console.log(data)

            console.log('Folder Created:', folderName);
            handleClosePopup();// Close the popup after creating the folder
            localStorage.setItem('contextRootId', contextRootId)
            window.location.reload()
        } catch (err) {
            console.log(Error, err)
        }
    };

    const handleFileUpload = async (files) => {


        try {
            files = Array.from(files)
            const formData = new FormData();
            files.forEach((file) => {
                formData.append('files', file);
            });
            formData.append('owner', localStorage.getItem('orgUsername'))
            console.log(formData)
            const response = await fetch('http://gonderdms.onrender.com/folders/upload/' + currentFolderId, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });


            if (!response.ok) {
                console.log("ERROR")
                throw new Error('Failed to upload files');
            }

            console.log('Files are uploaded successfully');
        } catch (error) {
            console.error('Error uploading files:', error);
        }

        window.location.reload()
        console.log('Uploaded files:', files);
    };

    const handleDeleteFiles = async (selectedItems) => {
        let data = []

        if (selectedItems) {

            console.log('selected Items = ', selectedItems)

            for (const [key, value] of Object.entries(selectedItems)) {
                if (key === 'parentId')
                    continue
                if (value.selected) {
                    data.push({ id: key, isFile: value.isFile });
                }
            }


            try {
                const response = await fetch('http://gonderdms.onrender.com/folders/delete', {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include',
                    body: JSON.stringify({ data })
                })
                console.log(response)

                handleClosePopup();
                window.location.reload()
            } catch (err) {
                console.log(Error, err)
            }



            setSelectedItems({})
            handleClosePopup()
        }
    }

    const handleRenameFolder = async function (folderName) {
        console.log("In rename folder ", folderName)
        let keyToBeRenamed
        let isFile

        for (const [key, value] of Object.entries(selectedItems)) {
            if (value.selected) {
                keyToBeRenamed = key
                isFile = value.isFile
                break
            }
        }


        const data = {
            newName: folderName
        }

        if (keyToBeRenamed) {
            try {
                const response = await fetch(isFile ? 'http://gonderdms.onrender.com/folders/rename/file/' + keyToBeRenamed : 'http://gonderdms.onrender.com/folders/rename/' + keyToBeRenamed, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include',
                    body: JSON.stringify(data)
                })
                console.log(response)
                const res = await response.json()
                console.log(res)

                console.log('Folder Renamed:', folderName);
                handleClosePopup();// Close the popup after creating the folder
                window.location.reload()
            } catch (err) {
                console.log(Error, err)
            }
        }
        else
            handleClosePopup();

    };




    return (
        <div className=" p-1 border-b rounded  border-gray-300 flex justify-center gap-5 text-sm ">
         

            {isSuperAdmin && <div className='flex justify-center gap-5 text-sm'>              
                <FileSearch />
            </div>}

            {!isSuperAdmin && (
                <>
                     {role === "read" && <div>{isEnglish ? `You can only read files ` : `ፈይል መመልከት ብቻ ነው የምትችለው/የምትችዪው`} <FileSearch /></div>}

{(role === "write" || role === "readWrite") &&
    <div className='flex justify-center gap-5 text-sm items-center'>
        <button onClick={handleCreatePopup} className={style} title={isEnglish ? `create folder` : `ዶሴ ፍጠር`}><img src='/create-folder.svg' className={image} /></button>
        <button onClick={handleUploadPopup} className={style} title={isEnglish ? `upload here` : `ሰርቨር ላይ ጫን`}><img src='/upload.svg' className={image} /></button>
        <button onClick={handleCopyPopup} className={style} title={isEnglish ? `copy` : `ኮፒ`}><img src='/copy.svg' className={image} /> <p className={`absolute left-0 top-6 text-xxs font-bold w-full bg-green-200 rounded-lg ${openedPopup === 'copy' ? "visible" : "hidden"}`}>{copyText}</p></button>
        <button onClick={handleMovePopup} className={style} title={isEnglish ? `move` : `አዘዋውር`}><img src='/move.svg' className={image} /><p className={`absolute left-0 top-6 text-xxs font-bold w-full bg-green-200 rounded-lg ${openedPopup === 'move' ? "visible" : "hidden"}`}>{moveText}</p></button>
        <button onClick={handlePastePopup} className={style} title={isEnglish ? `paste` : `ለጥፍ`}><img src='/paste.svg' className={image} /></button>
        <button onClick={handleRenamePopup} className={style} title={isEnglish ? `rename` : `እንደገና ሰይም`}><img src='/rename.svg' className={image} /></button>
        <button onClick={handleDeletePopup} className={style} title={isEnglish ? `delete` : `አጥፋ`}><img src='/delete.svg' className={image} /></button> <FileSearch />
    </div>
}

{!isAdmin && <div className='flex justify-center gap-5 text-sm'>
    <button onClick={handleCreatePopup} className={style} title={isEnglish ? `create folder` : `ዶሴ ፍጠር`}><img src='/create-folder.svg' className={image} /></button>
    <button onClick={handleUploadPopup} className={style} title={isEnglish ? `upload here` : `ሰርቨር ላይ ጫን`}><img src='/upload.svg' className={image} /></button>
    <button onClick={handleCopyPopup} className={style} title={isEnglish ? `copy` : `ኮፒ`}><img src='/copy.svg' className={image} /> <p className={`absolute left-0 top-6 text-xxs font-bold w-full bg-green-200 rounded-lg ${openedPopup === 'copy' ? "visible" : "hidden"}`}>{copyText}</p></button>
    <button onClick={handleMovePopup} className={style} title={isEnglish ? `move` : `አዘዋውር`}><img src='/move.svg' className={image} /><p className={`absolute left-0 top-6 text-xxs font-bold w-full bg-green-200 rounded-lg ${openedPopup === 'move' ? "visible" : "hidden"}`}>{moveText}</p></button>
    <button onClick={handlePastePopup} className={style} title={isEnglish ? `paste` : `ለጥፍ`}><img src='/paste.svg' className={image} /></button>
    <button onClick={handleRenamePopup} className={style} title={isEnglish ? `rename` : `እንደገና ሰይም`}><img src='/rename.svg' className={image} /></button>
    <button onClick={handleDeletePopup} className={style} title={isEnglish ? `delete` : `አጥፋ`}><img src='/delete.svg' className={image} /></button>

    <FileSearch />

</div>}  
                </>
            ) }

            {openedPopup === 'create' && <CreateNewFolder isOpen={true} onClose={handleClosePopup} onCreate={handleCreateFolder} />}
            {openedPopup === 'upload' && <UploadFiles isOpen={true} onClose={handleClosePopup} onUpload={handleFileUpload} />}
            {openedPopup === 'delete' && <DeleteConfirmation isOpen={true} onClose={handleClosePopup} onDelete={handleDeleteFiles} />}
            {openedPopup === 'rename' && <RenameFolder isOpen={true} onClose={handleClosePopup} onRename={handleRenameFolder} />}


        </div>
    );
};

export default MenuBar;
