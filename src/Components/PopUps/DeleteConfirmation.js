import React, { useContext } from 'react';
import { UserContext } from '../Context/UserContext';

const DeleteConfirmation = ({ isOpen, onClose, onDelete }) => {
    const { selectedItems } = useContext(UserContext);
    const {isEnglish}=useContext(UserContext)

   
    
    function handleDelete() {
        onDelete(selectedItems);
    }

    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'} bg-black bg-opacity-50 flex justify-center items-center`}>
            <div className="bg-white p-8 rounded-lg">
                <h2 className="text-xl font-bold mb-4"> {isEnglish ? "Are you sure you want to delete?" : "እርግጠኛ ነዎት ማጥፋት ይፈልጋሉ ?"}</h2>
                <div className="flex justify-end">
                    <button className="px-4 py-2 bg-red-500 text-white rounded mr-2" onClick={handleDelete}> {isEnglish ? "Delete" : "አዎ አጥፋው"}</button>
                    <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={onClose}> {isEnglish ? "Cancel" : "ተመለስ ይቅር"}</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmation;
