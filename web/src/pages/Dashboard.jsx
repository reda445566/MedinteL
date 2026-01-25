import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaUserMd, FaNotesMedical, FaHeartbeat, FaArrowRight, FaEdit } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useAuth();
    const [medicalData, setMedicalData] = useState(null);

    useEffect(() => {
        axios.get('/patients/medical-profile')
            .then(res => {
                if (res.data.success) setMedicalData(res.data.data);
            })
            .catch(err => console.log('No profile found'));
    }, []);

    return (
        <div className="dashboard-container animate-fade-in">
            <header className="dashboard-header">
                <div>
                    <h1 className="dashboard-title">Dashboard</h1>
                    <p className="dashboard-welcome">Welcome back, {user.name} 👋</p>
                </div>
                <Link to="/profile" className="btn btn-primary">
                    <FaEdit style={{ marginRight: '0.5rem' }} /> Edit Profile
                </Link>
            </header>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon-wrapper" style={{ background: '#fee2e2', color: '#ef4444' }}>
                        <FaHeartbeat />
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Health Condition</div>
                        <div className="stat-value">{medicalData?.diseaseType ? medicalData.diseaseType.toUpperCase() : 'Healthy'}</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon-wrapper" style={{ background: '#dbeafe', color: '#2563eb' }}>
                        <FaUserMd />
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Doctor Follow-up</div>
                        <div className="stat-value" style={{ color: medicalData?.followUpWithDoctor ? 'var(--warning)' : 'var(--success)' }}>
                            {medicalData?.followUpWithDoctor ? 'Required' : 'Not Needed'}
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon-wrapper" style={{ background: '#dcfce7', color: '#16a34a' }}>
                        <FaNotesMedical />
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Active Medications</div>
                        <div className="stat-value">{medicalData?.medications?.length || 0}</div>
                    </div>
                </div>
            </div>

            {/* Action Cards */}
            <div className="actions-grid">
                <Link to="/profile" className="action-card">
                    <h3 className="action-title">Update Medical Profile</h3>
                    <p className="action-desc">
                        Keep your vital statistics and medical history up to date to ensure the AI diagnostics are accurate.
                    </p>
                    <span className="action-link">Update Now <FaArrowRight /></span>
                </Link>

                <Link to="/chatbot" className="action-card">
                    <h3 className="action-title">AI Medical Assistant</h3>
                    <p className="action-desc">
                        Talk to our advanced AI about your symptoms, get instant advice, or understand your lab reports.
                    </p>
                    <span className="action-link">Start Chat <FaArrowRight /></span>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
