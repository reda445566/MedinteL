import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        password: ''
    });
    const [error, setError] = useState('');
    const { registerUser } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await registerUser(formData);
        if (res.success) {
            navigate('/dashboard');
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <div className="reg-header">
                    <h2 className="reg-title">Create Account</h2>
                    <p className="reg-subtitle">Join MedIntel for smarter healthcare</p>
                </div>

                {error && <div className="error-msg">{error}</div>}

                <form onSubmit={handleSubmit} className="reg-form">
                    <div>
                        <label className="reg-label">Full Name</label>
                        <input name="name" type="text" className="reg-input" onChange={handleChange} required placeholder="John Doe" />
                    </div>

                    <div className="register-grid">
                        <div>
                            <label className="reg-label">Age</label>
                            <input name="age" type="number" className="reg-input" onChange={handleChange} required placeholder="e.g. 25" />
                        </div>
                        <div>
                            <label className="reg-label">Date of Birth (Optional)</label>
                            <input type="date" className="reg-input" style={{ color: 'var(--text-light)' }} />
                        </div>
                    </div>

                    <div>
                        <label className="reg-label">Email Address</label>
                        <input name="email" type="email" className="reg-input" onChange={handleChange} required placeholder="john@example.com" />
                    </div>

                    <div>
                        <label className="reg-label">Password</label>
                        <input name="password" type="password" className="reg-input" onChange={handleChange} required minLength="6" placeholder="Min 6 characters" />
                    </div>

                    <button type="submit" className="btn btn-primary reg-btn">Create Account</button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
