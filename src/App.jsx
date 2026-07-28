import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import LandingPage from './features/landing/LandingPage';
import PathologyPage from './features/pathologies/PathologyPage';
import LocalPage from './features/seo/LocalPage';
import { localPages } from './features/seo/localPages';
import AIFloat from './components/AIFloat';
import WhatsAppFloat from './components/WhatsAppFloat';
import ScrollToTop from './components/ScrollToTop';

// Rutas privadas/pesadas en lazy: sacan admin, login y chat (con Supabase y
// dashboard) del bundle publico. Landing/patologias/locales quedan eager para
// que las paginas SEO no parpadeen al entrar directo desde Google.
const ChatAI = lazy(() => import('./features/inquiries/ChatAI'));
const LoginPage = lazy(() => import('./features/auth/LoginPage'));
const AdminPanel = lazy(() => import('./features/admin/AdminPanel'));
const AdminLoginPage = lazy(() => import('./features/admin/AdminLoginPage'));

// AuthProvider tambien en lazy: antes se importaba en main.jsx y arrastraba el cliente
// de Supabase (172 KB) a TODAS las paginas publicas, que no usan sesion. Ahora solo lo
// cargan las 4 rutas que realmente la necesitan (chat, login y admin).
const AuthProvider = lazy(() =>
  import('./features/auth/AuthContext.jsx').then((m) => ({ default: m.AuthProvider }))
);
// Un UNICO proveedor para las 4 rutas privadas, montado como ruta padre sin path: asi la
// sesion sobrevive al pasar de /login-admin a /admin. Si cada ruta creara el suyo, el
// provider se desmontaria en cada navegacion y se perderia el estado de sesion.
const LayoutPrivado = () => (
  <AuthProvider>
    <Outlet />
  </AuthProvider>
);

function App() {
  const location = useLocation();

  // SPA page_view: GA4 solo dispara 1 page_view al cargar; aca lo enviamos en
  // cada cambio de ruta para medir bien patologias y landing locales.
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') window.fbq('track', 'PageView');
  }, [location.pathname, location.search]);

  // Eventos de conversión para GA4 (clicks de WhatsApp y apertura de Santi)
  useEffect(() => {
    const track = (name, params) => { if (typeof window !== 'undefined' && typeof window.gtag === 'function') window.gtag('event', name, params || {}); };
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href*="wa.me"], a[href^="tel:"]');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      track(href.startsWith('tel:') ? 'contact_phone' : 'contact_whatsapp', { transport_type: 'beacon', link_url: href });
      if (typeof window.fbq === 'function') window.fbq('track', 'Contact', { method: href.startsWith('tel:') ? 'phone' : 'whatsapp' });
    };
    const onSanti = () => { track('open_santi'); if (typeof window !== 'undefined' && typeof window.fbq === 'function') window.fbq('trackCustom', 'OpenSanti'); };
    document.addEventListener('click', onClick, true);
    window.addEventListener('open-santi', onSanti);
    return () => { document.removeEventListener('click', onClick, true); window.removeEventListener('open-santi', onSanti); };
  }, []);

  return (
    <div className="app-container">
      <ScrollToTop />
      <AIFloat />
      <WhatsAppFloat />
      <Suspense fallback={null}>
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

        {/* Rutas privadas (chat, login y admin): comparten un unico AuthProvider */}
        <Route element={<LayoutPrivado />}>
          <Route path="/chat-ai" element={<ChatAI />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login-admin" element={<AdminLoginPage />} />
          <Route path="/admin/*" element={<AdminPanel />} />
        </Route>

        {/* Fallback to Landing */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </Suspense>
    </div>
  );
}

export default App;
