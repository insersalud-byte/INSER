import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/global.css';
// AuthProvider ya NO se importa aca: vive en App.jsx dentro de las rutas que usan sesion,
// para que el cliente de Supabase no se descargue en las paginas publicas.

console.log('App initialization started...');

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Fatal: Root element not found in index.html');
} else {
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    );
    console.log('React DOM Render called successfully.');
  } catch (error) {
    console.error('Fatal rendering error:', error);
    rootElement.innerHTML = `<div style="padding: 20px; color: red;"><h1>Error al iniciar la aplicación</h1><p>${error.message}</p></div>`;
  }
}
