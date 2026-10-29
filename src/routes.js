import { lazy, createElement } from 'react';

/**
 * Carga diferida de las paginas publicas, con precarga.
 *
 * Antes LandingPage, PathologyPage y LocalPage (con todos sus datos) iban en un unico
 * bundle de ~440 KB que cada visitante descargaba y ejecutaba, aunque entrara a una sola
 * pagina. Ahora cada una es un chunk aparte.
 *
 * El HTML prerenderizado ya trae el contenido. Para que React no lo borre mostrando un
 * Suspense vacio mientras baja el chunk, main.jsx espera la precarga de la pagina actual
 * antes del primer render: cuando el componente ya esta cargado se renderiza directo,
 * sin pasar por React.lazy (que siempre suspende al menos una vez).
 */
function lazyConPrecarga(factory) {
    let Cargado = null;
    let promesa = null;
    const cargar = () => {
        if (!promesa) {
            promesa = factory().then((m) => {
                Cargado = m.default;
                return m;
            });
        }
        return promesa;
    };
    const Diferido = lazy(cargar);
    const Componente = (props) => createElement(Cargado || Diferido, props);
    Componente.precargar = cargar;
    return Componente;
}

export const LandingPage = lazyConPrecarga(() => import('./features/landing/LandingPage'));
export const PathologyPage = lazyConPrecarga(() => import('./features/pathologies/PathologyPage'));
export const LocalPage = lazyConPrecarga(() => import('./features/seo/LocalPage'));

const PRIVADAS = /^\/(chat-ai|login|login-admin|admin)(\/|$)/;

/** Precarga el chunk de la pagina publica que corresponde a la URL. */
export function precargarRuta(pathname, slugsLocales) {
    if (pathname === '/' || pathname === '/index.html') return LandingPage.precargar();
    if (pathname.startsWith('/patologia/')) return PathologyPage.precargar();
    const slug = pathname.replace(/^\/+|\/+$/g, '');
    if (slugsLocales.has(slug)) return LocalPage.precargar();
    if (PRIVADAS.test(pathname)) return Promise.resolve();
    // Cualquier otra ruta redirige a la home
    return LandingPage.precargar();
}

/** Baja en segundo plano las otras paginas para que la navegacion interna sea instantanea. */
export function precargarResto() {
    const correr = () => {
        LandingPage.precargar();
        PathologyPage.precargar();
        LocalPage.precargar();
    };
    if (typeof window === 'undefined') return;
    if ('requestIdleCallback' in window) window.requestIdleCallback(correr, { timeout: 8000 });
    else setTimeout(correr, 4000);
}
