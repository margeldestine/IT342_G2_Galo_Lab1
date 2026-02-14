import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

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

    return (
        <div className="dashboard-container">
            <div className="dashboard-sidebar">
                <h2 className="dashboard-title">Dashboard</h2>
                <button className="sidebar-btn sidebar-btn-profile" onClick={() => navigate('/profile')}>
                    👤 Profile
                </button>
                <button className="sidebar-btn sidebar-btn-logout" onClick={handleLogoutClick}>
                    🚪 Logout
                </button>
            </div>
            <div className="dashboard-content">
                <div className="welcome-message">
                    <h1>Welcome to MiniApp!</h1>
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

export default Dashboard;