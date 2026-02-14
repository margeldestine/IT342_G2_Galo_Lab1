import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/user/me')
            .then(res => setUser(res.data))
            .catch(() => {
                localStorage.removeItem('accessToken');
                navigate('/');
            });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/');
    };

    if (!user) return <p>Loading...</p>;

    return (
        <div>
            <h1>User Profile</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>First Name: {user.firstname}</p>
            <p>Last Name: {user.lastname}</p>
            
            <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;