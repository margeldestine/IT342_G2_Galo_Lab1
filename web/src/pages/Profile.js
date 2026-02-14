import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/user/me')
            .then(res => setUser(res.data))
            .catch(() => {
                // If the token is invalid or expired, clear and go to landing
                localStorage.removeItem('accessToken');
                navigate('/');
            });
    }, [navigate]);

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/');
    };

    const cancelLogout = () => {
        setShowLogoutModal(false);
    };

    if (!user) return (
        <div className="profile-container">
            <div className="profile-content">
                <p className="loading-message">Loading...</p>
            </div>
        </div>
    );

    return (
        <div className="profile-container">
            <div className="profile-sidebar">
                <h2 className="profile-sidebar-title">Profile</h2>
                <button className="sidebar-btn sidebar-btn-dashboard" onClick={() => navigate('/dashboard')}>
                    🏠 Dashboard
                </button>
                <button className="sidebar-btn sidebar-btn-logout" onClick={handleLogoutClick}>
                    🚪 Logout
                </button>
            </div>
            <div className="profile-content">
                <div className="profile-card">
                    <h1>User Profile</h1>
                    <div className="profile-info">
                        <div className="profile-field">
                            <div className="profile-label">Username</div>
                            <div className="profile-value">{user.username}</div>
                        </div>
                        <div className="profile-field">
                            <div className="profile-label">Email</div>
                            <div className="profile-value">{user.email}</div>
                        </div>
                        <div className="profile-field">
                            <div className="profile-label">First Name</div>
                            <div className="profile-value">{user.firstname}</div>
                        </div>
                        <div className="profile-field">
                            <div className="profile-label">Last Name</div>
                            <div className="profile-value">{user.lastname}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="modal-overlay" onClick={cancelLogout}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        <h2 className="modal-title">Confirm Logout</h2>
                        <p className="modal-message">Are you sure you want to logout?</p>
                        <div className="modal-buttons">
                            <button className="modal-btn modal-btn-cancel" onClick={cancelLogout}>
                                Cancel
                            </button>
                            <button className="modal-btn modal-btn-confirm" onClick={confirmLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;