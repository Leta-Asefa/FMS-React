import React, { useContext, useState } from 'react';
import '../input.css';
import { UserContext } from './Context/UserContext';

const ChangePassword = () => {
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [popupVisible, setPopupVisible] = useState(false); // State to manage popup visibility
    const {isEnglish}=useContext(UserContext)

   


    const handleChangePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            setError('New passwords do not match.');
            return;
        }

        try {
            const response = await fetch('http://gonderdms.onrender.com/auth/change_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    oldPassword,
                    newPassword,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.err || 'Failed to change password.');
            }

            setSuccessMessage('Password changed successfully.');
            setUsername('');
            setOldPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            setError(null)
            setPopupVisible(true); // Display the popup after successful removal
            setTimeout(() => {
              setPopupVisible(false); // Hide the popup after a certain duration
            }, 2000);

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className='change-password-container'>
            <h2 className='mx-auto w-40 mb-5 text-xl'> {isEnglish ? "Change Password" : "የይለፍ ቃል ቀይር"}</h2>
           
            {successMessage && <div className="success">{successMessage}</div>}
            <div className='change-password-input-container'>
                <label> {isEnglish ? "Username : " : "የተጠቃሚነት መለያ ስም"}</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='change-password-input'
                />
            </div>
            <div className='change-password-input-container'>
                <label> {isEnglish ? "Old Password : " : "የድሮ ይለፍ ቃል"}</label>
                <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className='change-password-input'
                />
            </div>
            <div className='change-password-input-container'>
                <label>{isEnglish ? "New Password:" : "አዲስ ይለፍ ቃል"}</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className='change-password-input'
                />
            </div>
            <div className='change-password-input-container'>
                <label>{isEnglish ? "Confirm New Password:" : "አዲሱን ይለፍ ቃል ይድገሙ"}</label>
                <input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className='change-password-input'
                />
            </div>
            <button className='bg-green-500 text-white rounded-md px-3 py-1 w-full hover:bg-green-600 mt-5 font-bold' onClick={handleChangePassword}>{isEnglish ? "Change" : "ቀይር"}</button>
            {error && <div className="error">{error}</div>}

            {popupVisible && (
                <div className="fixed bottom-10 right-5 bg-green-400 text-white p-3 rounded-md">
                    {isEnglish ? "Changed Successfully !" : "ተቀይሯል !"}
                </div>
            )}
        </div>
    );
};

export default ChangePassword;
