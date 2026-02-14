import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', firstname: '', lastname: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await api.post('/auth/register', formData);
            if (res.data.success) {
                navigate('/login');
            }
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed.");
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-card" onSubmit={handleSubmit}>
                <h2>Register</h2>
                {error && <div className="error-box">{error}</div>}
                <input className="auth-input" type="text" placeholder="Username" onChange={e => setFormData({...formData, username: e.target.value})} required />
                <input className="auth-input" type="text" placeholder="First Name" onChange={e => setFormData({...formData, firstname: e.target.value})} required />
                <input className="auth-input" type="text" placeholder="Last Name" onChange={e => setFormData({...formData, lastname: e.target.value})} required />
                <input className="auth-input" type="email" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} required />
                <input className="auth-input" type="password" placeholder="Password" onChange={e => setFormData({...formData, password: e.target.value})} required />
                <button className="btn btn-primary" style={{width: '100%', marginTop: '10px'}} type="submit">Create Account</button>
                <p style={{fontSize: '14px', marginTop: '15px'}}>Already have an account? <span onClick={() => navigate('/login')} style={{color: '#1a73e8', cursor: 'pointer'}}>Login</span></p>
            </form>
        </div>
    );
};
export default Register;