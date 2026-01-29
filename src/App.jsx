import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './features/landing/LandingPage';
import ChatAI from './features/inquiries/ChatAI';
import LoginPage from './features/auth/LoginPage';
import AdminPanel from './features/admin/AdminPanel';
import AdminLoginPage from './features/admin/AdminLoginPage';
import AIFloat from './components/AIFloat';

function App() {
  return (
    <div className="app-container">
      <AIFloat />
      <Routes>
        {/* Main Entry: Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Santi Chat AI */}
        <Route path="/chat-ai" element={<ChatAI />} />

        {/* Admin & Login (Hidden for public) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login-admin" element={<AdminLoginPage />} />
        <Route path="/admin/*" element={<AdminPanel />} />

        {/* Fallback to Landing */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
