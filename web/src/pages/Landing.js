import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Welcome</h1>
            <button onClick={() => navigate('/register')}>Register</button>
            <button onClick={() => navigate('/login')}>Login</button>
        </div>
    );
};

export default Landing;