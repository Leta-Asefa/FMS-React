import React, { useState } from 'react';
import '../input.css';

const ChangePassword = () => {
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChangePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            setError('New passwords do not match.');
            return;
        }

        try {
            const response = await fetch('http://example.com/change-password', {
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

            if (!response.ok) {
                throw new Error('Failed to change password.');
            }

            setSuccessMessage('Password changed successfully.');
            setUsername('');
            setOldPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className='change-password-container'>
            <h2 className='mx-auto w-40 mb-5 text-xl'>Change Password</h2>
            {error && <div className="error">{error}</div>}
            {successMessage && <div className="success">{successMessage}</div>}
            <div className='change-password-input-container'>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='change-password-input'
                />
            </div>
            <div className='change-password-input-container'>
                <label>Old Password:</label>
                <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className='change-password-input'
                />
            </div>
            <div className='change-password-input-container'>
                <label>New Password:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className='change-password-input'
                />
            </div>
            <div className='change-password-input-container'>
                <label>Confirm New Password:</label>
                <input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className='change-password-input'
                />
            </div>
            <button className='bg-green-500 text-white rounded-md px-3 py-1 w-full hover:bg-green-600 mt-5 font-bold' onClick={handleChangePassword}>Change</button>
        </div>
    );
};

export default ChangePassword;
