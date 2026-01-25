import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Chatbot from './pages/Chatbot';
import MedicalProfile from './pages/MedicalProfile';
import Home from './pages/Home'; // Using the new Home component
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div></div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: 'calc(100vh - 80px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/chatbot" element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><MedicalProfile /></ProtectedRoute>} />
        </Routes>
      </div>
      <footer style={{ background: 'var(--surface)', color: 'var(--text-light)', padding: '3rem 0', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
        <p>© 2026 MedIntel. Empowering Patients.</p>
      </footer>
    </>
  );
}

export default App;
