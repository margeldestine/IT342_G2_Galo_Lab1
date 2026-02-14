import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/');
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <p>You are logged in.</p>
            <button onClick={() => navigate('/profile')}>View Profile</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;