import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

const Register = () => {
    const [formData, setFormData] = useState({ 
        username: '', 
        firstname: '', 
        lastname: '', 
        email: '', 
        password: '' 
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        let requirements = [];
        if (formData.password.length < 8) requirements.push("at least 8 characters");
        if (!/(?=.*[0-9])/.test(formData.password)) requirements.push("at least one number");
        if (!/(?=.*[!@#$%^&*])/.test(formData.password)) requirements.push("at least one special character");

        if (requirements.length > 0) {
            let message = "Password must have ";
            if (requirements.length === 1) {
                message += requirements[0];
            } else if (requirements.length === 2) {
                message += requirements[0] + " and " + requirements[1];
            } else {
                const allButLast = requirements.slice(0, -1).join(", ");
                const last = requirements[requirements.length - 1];
                message += `${allButLast}, and ${last}`;
            }
            setError(message + ".");
            return;
        }

        try {
            const res = await api.post('/auth/register', formData);
            if (res.data.success) {
                navigate('/login');
            }
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-card" onSubmit={handleSubmit}>
                <h2>Register</h2>
                
                {error && <div className="error-box">{error}</div>}
                
                <input className="auth-input" type="text" placeholder="Username" 
                    onChange={e => setFormData({...formData, username: e.target.value})} required />
                <input className="auth-input" type="text" placeholder="First Name" 
                    onChange={e => setFormData({...formData, firstname: e.target.value})} required />
                <input className="auth-input" type="text" placeholder="Last Name" 
                    onChange={e => setFormData({...formData, lastname: e.target.value})} required />
                <input className="auth-input" type="email" placeholder="Email" 
                    onChange={e => setFormData({...formData, email: e.target.value})} required />
                
                {}
                <div className="password-input-wrapper">
                    <input 
                        className="auth-input" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Password" 
                        onChange={e => setFormData({...formData, password: e.target.value})} 
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
                
                <button className="btn btn-primary" style={{width: '100%', marginTop: '10px'}} type="submit">
                    Create Account
                </button>
                
                <p style={{fontSize: '14px', marginTop: '15px'}}>
                    Already have an account? 
                    <span onClick={() => navigate('/login')} style={{color: '#ff6b9d', cursor: 'pointer', marginLeft: '5px', fontWeight: '600'}}>
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Register;