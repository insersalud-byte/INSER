import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { precargarRuta, precargarResto } from './routes';
import { localPagesIndex } from './features/seo/localPagesIndex';
import './styles/global.css';
// AuthProvider ya NO se importa aca: vive en App.jsx dentro de las rutas que usan sesion,
// para que el cliente de Supabase no se descargue en las paginas publicas.

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Fatal: Root element not found in index.html');
} else {
  const montar = () => {
   try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    );
   } catch (error) {
    console.error('Fatal rendering error:', error);
    rootElement.innerHTML = `<div style="padding: 20px; color: red;"><h1>Error al iniciar la aplicación</h1><p>${error.message}</p></div>`;
   }
  };
  // Esperar el chunk de la pagina actual antes de montar: si React monta antes, muestra un
  // Suspense vacio y borra por un instante el HTML prerenderizado que ya se esta viendo.
  // Si la precarga falla (red caida), se monta igual y React.lazy reintenta.
  const slugs = new Set(localPagesIndex.map((p) => p.slug));
  precargarRuta(window.location.pathname, slugs).then(montar, montar);
  if (document.readyState === 'complete') precargarResto();
  else window.addEventListener('load', precargarResto, { once: true });
}
