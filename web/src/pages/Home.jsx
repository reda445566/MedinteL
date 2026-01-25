import React from 'react';
import { FaHeartbeat, FaBrain, FaHospitalAlt, FaShieldAlt, FaArrowRight, FaTimesCircle, FaCheckCircle, FaDatabase } from 'react-icons/fa';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="container grid-2">
                    <div className="animate-fade-in">
                        <span className="hero-tag">Next-Gen Healthcare</span>
                        <h1 className="hero-title">
                            Your Health, <br />
                            <span className="text-gradient typewriter">Intelligently Connected.</span>
                        </h1>
                        <p className="hero-desc">
                            Experience the power of AI-driven diagnostics combined with real-time hospital integration.
                            MedIntel anticipates your needs before you do.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <a href="/register" className="btn btn-primary" style={{ padding: '1rem 2.5rem' }}>
                                Join for Free <FaArrowRight style={{ marginLeft: '0.8rem' }} />
                            </a>
                            <a href="#demo" className="btn btn-outline" style={{ padding: '1rem 2.5rem' }}>View Demo</a>
                        </div>
                    </div>

                    <div className="hero-visual animate-fade-in delay-200">
                        {/* Floating 3D Elements */}
                        <div className="visual-card-main" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                {/* Left Side: Status */}
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
                                        <div style={{ padding: '0.6rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '10px', color: 'var(--primary)' }}>
                                            <FaBrain size={24} />
                                        </div>
                                        <h4 style={{ fontSize: '1rem', fontWeight: 'bold', margin: 0 }}>AI Diagnosis</h4>
                                    </div>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--success)', fontWeight: '600', marginLeft: '0.2rem' }}>● Processing</span>
                                </div>

                                {/* Right Side: Security Badge (Moved Inside/Top) */}
                                <div style={{
                                    background: 'var(--surface-2)', padding: '0.5rem 1rem', borderRadius: '20px',
                                    fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '600'
                                }}>
                                    <FaShieldAlt style={{ color: 'var(--success)' }} /> Secure Profile
                                </div>
                            </div>

                            <div style={{ height: '6px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: '75%', background: 'linear-gradient(90deg, var(--primary), var(--accent))' }}></div>
                            </div>

                            <p style={{
                                fontSize: '0.9rem',
                                color: 'var(--text-light)',
                                lineHeight: '1.6',
                                background: 'var(--surface-2)', /* Better contrast background */
                                padding: '1rem',
                                borderRadius: '12px',
                                border: '1px dashed var(--border)',
                                margin: 0
                            }}>
                                "Symptoms analysis complete. Recommend consulting a cardiologist for mild arrhythmia."
                            </p>
                        </div>

                        {/* Emergency Link Floating Only */}
                        <div className="floating-pill pill-2" style={{ bottom: '15%', left: '-10%' }}>
                            <FaHospitalAlt style={{ color: 'var(--danger)' }} /> Emergency Link
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section section-bg">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">Features</span>
                        <h2 className="section-title">Complete Health Ecosystem</h2>
                        <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>Everything you need to manage your well-being in one place.</p>
                    </div>

                    <div className="grid-3">
                        <div className="feature-card">
                            <div className="feature-icon"><FaBrain /></div>
                            <h3 className="feature-title">AI Diagnostics</h3>
                            <p style={{ color: 'var(--text-light)' }}>Advanced algorithms analyze your symptoms instantly to provide accurate preliminary advice.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon"><FaHospitalAlt /></div>
                            <h3 className="feature-title">Hospital Sync</h3>
                            <p style={{ color: 'var(--text-light)' }}>Directly share your vitals and history with nearby hospitals during emergencies.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon"><FaHeartbeat /></div>
                            <h3 className="feature-title">Vitals Tracking</h3>
                            <p style={{ color: 'var(--text-light)' }}>Monitor heart rate, glucose, and more. Get alerted when anomalies are detected.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Section */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">Why Us</span>
                        <h2 className="section-title">The MedIntel Advantage</h2>
                    </div>

                    <div className="comparison-grid">
                        <div className="comparison-col">
                            <h3 style={{ color: 'var(--text-light)' }}>Traditional Way</h3>
                            <div className="comparison-item" style={{ borderLeft: '4px solid var(--danger)' }}>
                                <FaTimesCircle style={{ color: 'var(--danger)', fontSize: '1.5rem', flexShrink: 0 }} />
                                <div>
                                    <strong>Slow Reactions</strong>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>Waiting hours for simple advice.</p>
                                </div>
                            </div>
                            <div className="comparison-item" style={{ borderLeft: '4px solid var(--danger)' }}>
                                <FaDatabase style={{ color: 'var(--danger)', fontSize: '1.5rem', flexShrink: 0 }} />
                                <div>
                                    <strong>Data Silos</strong>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>Medical history scattered on paper.</p>
                                </div>
                            </div>
                        </div>

                        <div className="comparison-col">
                            <h3 style={{ color: 'var(--primary)' }}>MedIntel Way</h3>
                            <div className="comparison-item" style={{ borderLeft: '4px solid var(--primary)', background: 'var(--surface)' }}>
                                <FaCheckCircle style={{ color: 'var(--primary)', fontSize: '1.5rem', flexShrink: 0 }} />
                                <div>
                                    <strong>Instant AI Response</strong>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>Get clarity in seconds, 24/7.</p>
                                </div>
                            </div>
                            <div className="comparison-item" style={{ borderLeft: '4px solid var(--primary)', background: 'var(--surface)' }}>
                                <FaShieldAlt style={{ color: 'var(--primary)', fontSize: '1.5rem', flexShrink: 0 }} />
                                <div>
                                    <strong>Centralized Vault</strong>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>One secure profile, accessible anywhere.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section">
                <div className="container">
                    <div className="cta-box">
                        <h2>Ready to transform your health?</h2>
                        <p style={{ marginBottom: '2.5rem', fontSize: '1.2rem', opacity: 0.9 }}>Join thousands of patients using MedIntel today.</p>
                        <a href="/register" className="btn btn-white">Get Started Now</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
