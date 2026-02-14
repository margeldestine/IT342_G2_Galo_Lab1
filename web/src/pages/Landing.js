import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/landing.css';

const Landing = () => {
    const navigate = useNavigate();
    return (
        <div className="landing-container">
            <div className="landing-card">
                <h1 className="landing-title">MiniApp</h1>
                <p>Welcome! Please choose an option.</p>
                <div className="btn-group">
                    <button className="btn btn-primary" onClick={() => navigate('/register')}>Register</button>
                    <button className="btn btn-outline" onClick={() => navigate('/login')}>Login</button>
                </div>
            </div>
        </div>
    );
};
export default Landing;