import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await api.post('/auth/login', { email, password });
            const token = response.data.accessToken;
            
            if (token) {
                localStorage.setItem('accessToken', token); 
                navigate('/dashboard'); 
            }
        } catch (err) {
            setError(err.response?.data?.message || "Invalid email or password");
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-card" onSubmit={handleLogin}>
                <h2>Login</h2>
                {error && <div className="error-box">{error}</div>}
                <input 
                    className="auth-input"
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    className="auth-input"
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button className="btn btn-primary" style={{width: '100%', marginTop: '10px'}} type="submit">Login</button>
                <p style={{fontSize: '14px', marginTop: '15px'}}>
                    Don't have an account? <span onClick={() => navigate('/register')} style={{color: '#ff6b9d', cursor: 'pointer', fontWeight: '600'}}>Register here</span>
                </p>
            </form>
        </div>
    );
};

export default Login;