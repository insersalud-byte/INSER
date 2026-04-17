import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './features/landing/LandingPage';
import ChatAI from './features/inquiries/ChatAI';
import LoginPage from './features/auth/LoginPage';
import AdminPanel from './features/admin/AdminPanel';
import AdminLoginPage from './features/admin/AdminLoginPage';
import PathologyPage from './features/pathologies/PathologyPage';
import AIFloat from './components/AIFloat';

function App() {
  return (
    <div className="app-container">
      <AIFloat />
      <Routes>
        {/* Main Entry: Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Pathology Pages — rutas internas modernas */}
        <Route path="/patologia/:slug" element={<PathologyPage />} />

        {/* Alias con los slugs originales de insersalud.com para futura migración */}
        <Route path="/apnea-del-sueno" element={<Navigate to="/patologia/apnea-del-sueno" replace />} />
        <Route path="/epoc" element={<Navigate to="/patologia/epoc" replace />} />
        <Route path="/fibrosis-pulmonar" element={<Navigate to="/patologia/fibrosis-pulmonar" replace />} />
        <Route path="/esclerosis-lateral-amiotrofica" element={<Navigate to="/patologia/esclerosis-lateral-amiotrofica" replace />} />
        <Route path="/atrofia-muscular-espinal" element={<Navigate to="/patologia/atrofia-muscular-espinal" replace />} />
        <Route path="/paralisis-cerebral" element={<Navigate to="/patologia/paralisis-cerebral" replace />} />

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
