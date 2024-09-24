import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './Context/UserContext';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { isEnglish } = useContext(UserContext)


    const fetchNotifications = async (type) => {
        setLoading(true);
        setError('');
        let endpoint;
        switch (type) {
            case 'all':
                endpoint = 'http://localhost:4000/notification/all';
                break;
            case 'read':
                endpoint = 'http://localhost:4000/notification/read';
                break;
            case 'unread':
                endpoint = 'http://localhost:4000/notification/unread';
                break;
            default:
                endpoint = 'http://localhost:4000/notification/all';
        }

        try {
            const response = await fetch(endpoint, { credentials: 'include' });
            if (!response.ok) {
                throw new Error('Failed to fetch notifications');
            }
            const data = await response.json();
            setNotifications(data);
        } catch (error) {
            setError('Failed to fetch notifications');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications('all'); // Fetch all notifications on initial render
    }, []);

    const markAsRead = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/notification/read/${id}`, {
                method: 'GET',
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('Failed to mark notification as read');
            }
            setNotifications((prevNotifications) =>
                prevNotifications.map((notification) =>
                    notification.id === id ? { ...notification, read: true } : notification
                )
            );
        } catch (error) {
            setError('Failed to mark notification as read');
        }
    };

    const markAllAsRead = async () => {
        try {
            const response = await fetch(`http://localhost:4000/notification/markAllAsRead`, {
                method: 'PATCH',
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('Failed to mark all notifications as read');
            }
            setNotifications((prevNotifications) =>
                prevNotifications.map((notification) => ({ ...notification, read: true }))
            );
        } catch (error) {
            setError('Failed to mark all notifications as read');
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-around bg-gray-200 p-2 rounded-md">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-black text-lg font-bold px-2 py-1 rounded"
                    onClick={() => fetchNotifications('all')}
                >
                    {isEnglish ? `All` : `ሁሉንም አሳይ`}
                </button>
                <button
                    className="bg-green-500 hover:bg-green-700 text-black text-lg font-bold px-2 py-1 rounded"
                    onClick={() => fetchNotifications('read')}
                >
                    {isEnglish ? `Read` : `የተነበቡ`}
                </button>
                <button
                    className="bg-red-500 hover:bg-red-700 text-black text-lg font-bold px-2 py-1 rounded"
                    onClick={() => fetchNotifications('unread')}
                >
                     {isEnglish ? `Unread` : `ያልተነበቡ`}
                </button>
                <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-lg text-black font-bold px-2 py-1 rounded"
                    onClick={markAllAsRead}
                >
                     {isEnglish ? `Mark All as Read` : `ሁሉንም የተነበቡ አድርግ`}
                </button>
            </div>
            <div className="mt-4">
                {loading && <p>Loading notifications...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && notifications.length === 0 && (
                    <p> {isEnglish ? `No notifications found.` : `ምንም አይነት ኖቲፊኬሸን አልተገኘም !`}</p>
                )}
                <ul className="list-disc list-inside">
                    {!loading && !error && notifications.map((notification) => (
                        <li key={notification.id} className="border-b p-2 rounded-lg bg-slate-300 hover:bg-slate-400 py-2 flex justify-between items-center">
                            <span className='flex gap-2'>
                             <img src='/notification.svg' className='w-6 h-6'/>   {notification.message} 
                            </span>
                            {!notification.read && (
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-4"
                                    onClick={() => markAsRead(notification.id)}
                                >
                                    Mark as Read
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Notifications;
