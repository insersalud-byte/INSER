import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 900,
    // manifest: lo lee scripts/prerender-meta.mjs para precargar el chunk de cada pagina
    manifest: true,
    rollupOptions: {
      output: {
        // Separar vendors pesados en chunks propios: mejor cacheo y descarga
        // en paralelo. Supabase + Dexie quedan en su chunk (solo lo usan auth/
        // admin/chat, que ahora son lazy).
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'supabase': ['@supabase/supabase-js'],
          'icons': ['lucide-react'],
        },
      },
    },
  },
  server: {
    proxy: {
      // En desarrollo local, reenvía /api/* al servidor Express en puerto 3001
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // registerSW.js con defer: antes era un <script> sincronico en el <head> que frenaba
      // el primer pintado. El service worker no hace falta para mostrar la pagina.
      injectRegister: 'script-defer',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      workbox: {
        // /tarjeta es una página estática fuera de la SPA: sin esto el SW la tapa con el shell de React
        // Paginas fuera de la SPA: el service worker no debe devolverles el
        // index.html de la app, tienen su propio HTML.
        navigateFallbackDenylist: [/^\/tarjeta/, /^\/politica-de-privacidad/, /^\/politica-de-devoluciones/, /^\/sobre-nosotros/, /^\/contacto/, /^\/(about|nosotros|quienes-somos|contact|privacy|privacidad)\/?$/, /^\/academia/, /\.md$/, /\.txt$/, /\.xml$/, /\.tsv$/],
        // Los ebooks de /academia/ no van al precache: son sitios estaticos aparte,
        // pesan varios MB (se descargaban en cada visita a la home) y, al servirse
        // cache-first, una version vieja quedaba pegada hasta que el SW se actualizaba.
        globIgnores: ['**/academia/**', '**/consultorio/**',
          // Admin, login, chat y Supabase son rutas privadas en lazy: no tiene sentido que
          // el SW se los baje en segundo plano a cada visitante de las paginas publicas.
          'assets/{AdminPanel,AdminLoginPage,LoginPage,LoginPage.module,ChatAI,AuthContext,Input,supabase}-*'],
        // Las PAGINAS (HTML) no van al precache. Antes el SW guardaba dist/index.html (la
        // variante inser.ar) y la servia para cualquier navegacion: quien ya habia entrado
        // a insersalud.com veia el titulo y la descripcion viejos/equivocados hasta que el
        // SW se actualizaba. Ahora cada pagina se pide a la red (siempre la version
        // publicada) y solo si no hay conexion se usa la ultima copia guardada.
        globPatterns: ['**/*.{js,css}', '*.{ico,png,svg}'],
        navigateFallback: null,
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'paginas',
              networkTimeoutSeconds: 5,
              expiration: { maxEntries: 40, maxAgeSeconds: 7 * 24 * 60 * 60 },
            },
          },
        ],
      },
      manifest: {
        name: 'Inser Salud App',
        short_name: 'InserSalud',
        description: 'Gestión integral de tratamientos respiratorios',
        theme_color: '#0f766e',
        background_color: '#f8fafc',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
});
