import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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
                {}
                <div className="password-input-wrapper">
                    <input 
                        className="auth-input"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <button 
                        type="button"
                        className="eye-toggle-btn" 
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="Toggle password visibility"
                    >
                        {showPassword ? (
                            
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        ) : (
                            
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                <line x1="1" y1="1" x2="23" y2="23"></line>
                            </svg>
                        )}
                    </button>
                </div>
                <button className="btn btn-primary" style={{width: '100%', marginTop: '10px'}} type="submit">Login</button>
                <p style={{fontSize: '14px', marginTop: '15px'}}>
                    Don't have an account? <span onClick={() => navigate('/register')} style={{color: '#ff6b9d', cursor: 'pointer', fontWeight: '600'}}>Register here</span>
                </p>
            </form>
        </div>
    );
};

export default Login;