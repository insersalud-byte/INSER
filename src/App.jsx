import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './features/landing/LandingPage';
import ChatAI from './features/inquiries/ChatAI';
import LoginPage from './features/auth/LoginPage';
import AdminPanel from './features/admin/AdminPanel';
import AdminLoginPage from './features/admin/AdminLoginPage';
import PathologyPage from './features/pathologies/PathologyPage';
import LocalPage from './features/seo/LocalPage';
import { localPages } from './features/seo/localPages';
import AIFloat from './components/AIFloat';
import WhatsAppFloat from './components/WhatsAppFloat';
import ScrollToTop from './components/ScrollToTop';

function App() {
  // Eventos de conversión para GA4 (clicks de WhatsApp y apertura de Santi)
  useEffect(() => {
    const track = (name, params) => { if (typeof window !== 'undefined' && typeof window.gtag === 'function') window.gtag('event', name, params || {}); };
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href*="wa.me"], a[href^="tel:"]');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      track(href.startsWith('tel:') ? 'contact_phone' : 'contact_whatsapp', { transport_type: 'beacon', link_url: href });
    };
    const onSanti = () => track('open_santi');
    document.addEventListener('click', onClick, true);
    window.addEventListener('open-santi', onSanti);
    return () => { document.removeEventListener('click', onClick, true); window.removeEventListener('open-santi', onSanti); };
  }, []);

  return (
    <div className="app-container">
      <ScrollToTop />
      <AIFloat />
      <WhatsAppFloat />
      <Routes>
        {/* Main Entry: Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Pathology Pages — rutas internas modernas */}
        <Route path="/patologia/:slug" element={<PathologyPage />} />

        {/* Landing pages SEO locales (alta intención, Córdoba) */}
        {localPages.map((p) => (
          <Route key={p.slug} path={`/${p.slug}`} element={<LocalPage slug={p.slug} />} />
        ))}

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
