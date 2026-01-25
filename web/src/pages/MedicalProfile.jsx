import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSave, FaPlus, FaTimes, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import './MedicalProfile.css';

const MedicalProfile = () => {
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        age: '',
        gender: 'male',
        weight: '',
        height: '',
        medications: [],
        diseaseType: '',
        durationInYears: '',
        followUpWithDoctor: false,
        symptoms: [],
        otherNotes: ''
    });

    const [newMed, setNewMed] = useState('');
    const [newSymptom, setNewSymptom] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await axios.get('/patients/medical-profile');
            if (res.data.success) {
                setFormData({ ...formData, ...res.data.data });
            }
        } catch (err) {
            if (err.response?.status !== 404) {
                setMessage({ type: 'error', text: 'Failed to load profile' });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/patients/medical-profile', formData);
            setMessage({ type: 'success', text: 'Medical profile saved successfully!' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to save profile' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const addMed = () => {
        if (newMed.trim()) {
            setFormData({ ...formData, medications: [...formData.medications, newMed.trim()] });
            setNewMed('');
        }
    };

    const addSymptom = () => {
        if (newSymptom.trim()) {
            setFormData({ ...formData, symptoms: [...formData.symptoms, newSymptom.trim()] });
            setNewSymptom('');
        }
    };

    const removeListItem = (listName, index) => {
        const list = formData[listName].filter((_, i) => i !== index);
        setFormData({ ...formData, [listName]: list });
    };

    if (loading) return <div className="container" style={{ paddingTop: '2rem' }}>Loading...</div>;

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <h2 className="profile-title">Medical Profile</h2>
                </div>

                {message.text && (
                    <div className={`status-msg ${message.type === 'error' ? 'msg-error' : 'msg-success'}`}>
                        {message.type === 'error' ? <FaExclamationCircle /> : <FaCheckCircle />}
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Section 1: Basic Stats */}
                    <div className="form-grid-4">
                        <div className="input-group">
                            <label className="input-label">Age</label>
                            <input
                                type="number" className="input-field"
                                value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Gender</label>
                            <select
                                className="input-field"
                                value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label className="input-label">Weight (kg)</label>
                            <input
                                type="number" className="input-field"
                                value={formData.weight} onChange={e => setFormData({ ...formData, weight: e.target.value })}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Height (cm)</label>
                            <input
                                type="number" className="input-field"
                                value={formData.height} onChange={e => setFormData({ ...formData, height: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <h3 className="section-title">Medical Condition</h3>

                    <div className="form-grid-2">
                        <div className="input-group">
                            <label className="input-label">Primary Disease Type</label>
                            <select
                                className="input-field"
                                value={formData.diseaseType || ''} onChange={e => setFormData({ ...formData, diseaseType: e.target.value })}
                            >
                                <option value="">None / Healthy</option>
                                <option value="diabetes">Diabetes</option>
                                <option value="heart">Heart Disease</option>
                                <option value="pressure">High Blood Pressure</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label className="input-label">Duration (Years)</label>
                            <input
                                type="number" className="input-field"
                                value={formData.durationInYears || ''} onChange={e => setFormData({ ...formData, durationInYears: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Current Symptoms</label>
                        <div className="tags-input-wrapper">
                            <input
                                type="text" className="input-field"
                                placeholder="type symptom and press +"
                                value={newSymptom} onChange={e => setNewSymptom(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addSymptom())}
                            />
                            <button type="button" onClick={addSymptom} className="add-btn"><FaPlus /></button>
                        </div>
                        <div className="tags-container">
                            {formData.symptoms?.length === 0 && <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>No symptoms added.</span>}
                            {formData.symptoms?.map((s, i) => (
                                <span key={i} className="tag-chip">
                                    {s} <FaTimes className="tag-remove" onClick={() => removeListItem('symptoms', i)} />
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="checkbox-group" onClick={() => setFormData({ ...formData, followUpWithDoctor: !formData.followUpWithDoctor })}>
                        <input
                            type="checkbox"
                            className="custom-checkbox"
                            checked={formData.followUpWithDoctor}
                            onChange={() => { }} // handled by parent div for better UX
                        />
                        <label className="checkbox-label">Requires Doctor Follow-up</label>
                    </div>

                    <h3 className="section-title">Treatment & Notes</h3>

                    <div className="input-group">
                        <label className="input-label">Current Medications</label>
                        <div className="tags-input-wrapper">
                            <input
                                type="text" className="input-field"
                                placeholder="e.g. Insulin"
                                value={newMed} onChange={e => setNewMed(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addMed())}
                            />
                            <button type="button" onClick={addMed} className="add-btn"><FaPlus /></button>
                        </div>
                        <div className="tags-container">
                            {formData.medications?.length === 0 && <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>No medications added.</span>}
                            {formData.medications?.map((m, i) => (
                                <span key={i} className="tag-chip" style={{ background: 'var(--accent)', color: 'white' }}>
                                    {m} <FaTimes className="tag-remove" onClick={() => removeListItem('medications', i)} />
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Other Notes</label>
                        <textarea
                            className="input-field"
                            rows="3"
                            value={formData.otherNotes || ''} onChange={e => setFormData({ ...formData, otherNotes: e.target.value })}
                            placeholder="Any allergies or specific conditions..."
                        />
                    </div>

                    <button type="submit" className="btn btn-primary save-btn">
                        <FaSave style={{ marginRight: '0.5rem' }} /> Save Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MedicalProfile;
