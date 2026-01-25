import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FaHeartbeat, FaMoon, FaSun, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsOpen(false);
    };

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo */}
                <Link to="/" className="logo">
                    <div className="logo-icon">
                        <FaHeartbeat />
                    </div>
                    <span>MedIntel</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="nav-links">
                    {user ? (
                        <>
                            <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>Dashboard</Link>
                            <Link to="/chatbot" className={`nav-link ${isActive('/chatbot')}`}>AI Assistant</Link>
                            <Link to="/profile" className={`nav-link ${isActive('/profile')}`}>Profile</Link>
                        </>
                    ) : (
                        <>
                            <a href="#how-it-works" className="nav-link">How it Works</a>
                            <a href="#features" className="nav-link">Features</a>
                            <a href="#solutions" className="nav-link">Solutions</a>
                        </>
                    )}
                </div>

                {/* Right Actions */}
                <div className="nav-actions">
                    <button onClick={toggleTheme} className="theme-toggle">
                        {isDark ? <FaSun /> : <FaMoon />}
                    </button>

                    <div className="desktop-auth">
                        {user ? (
                            <div className="profile-badge">
                                <span className="profile-name">{user.name.split(' ')[0]}</span>
                                <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}>
                                    <FaSignOutAlt />
                                </button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <Link to="/login" className="btn btn-outline" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>Login</Link>
                                <Link to="/register" className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>Join Now</Link>
                            </div>
                        )}
                    </div>

                    <button onClick={() => setIsOpen(!isOpen)} className="menu-toggle">
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="mobile-menu">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="nav-link" onClick={() => setIsOpen(false)}>Dashboard</Link>
                            <Link to="/chatbot" className="nav-link" onClick={() => setIsOpen(false)}>AI Assistant</Link>
                            <Link to="/profile" className="nav-link" onClick={() => setIsOpen(false)}>Profile</Link>
                            <button onClick={handleLogout} className="btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link" onClick={() => setIsOpen(false)}>Login</Link>
                            <Link to="/register" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setIsOpen(false)}>Get Started</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
