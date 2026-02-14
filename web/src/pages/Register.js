import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); 
    try {
        const response = await api.post('/auth/register', formData);
        if (response.data.success) {
            navigate('/login');
        }
    } catch (error) {
        const serverMessage = error.response?.data?.message || "An unexpected error occurred.";
        setMessage(serverMessage);
    }
};

    return (
        <div>
            <h2>Register</h2>
            {message && <p style={{ color: 'red' }}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required /><br/>
                <input type="text" name="firstname" placeholder="First Name" onChange={handleChange} required /><br/>
                <input type="text" name="lastname" placeholder="Last Name" onChange={handleChange} required /><br/>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required /><br/>
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br/>
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
    );
};

export default Register;