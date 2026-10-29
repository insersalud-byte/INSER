/**
 * gen-local-index.mjs
 * Genera src/features/seo/localPagesIndex.js: solo { slug, h1 } de cada landing.
 *
 * Por que: localPages.js pesa ~190 KB (todo el contenido de las landings). App.jsx (rutas)
 * y el footer del home solo necesitan slug + titulo, pero al importar localPages.js
 * arrastraban esos 190 KB a TODAS las paginas, incluida la home. Con este indice liviano,
 * el contenido completo solo lo descarga la pagina de landing que lo usa (LocalPage, lazy).
 *
 * Corre solo antes de cada build y de `npm run dev` (ver package.json). Fuente unica de
 * verdad: localPages.js. No editar el archivo generado a mano.
 */
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, '..', 'src', 'features', 'seo', 'localPages.js');
const OUT = resolve(__dirname, '..', 'src', 'features', 'seo', 'localPagesIndex.js');

const { localPages } = await import(pathToFileURL(SRC).href);
const index = localPages.map(({ slug, h1 }) => ({ slug, h1 }));

const body = `// ARCHIVO GENERADO por scripts/gen-local-index.mjs a partir de localPages.js — no editar a mano.
// Indice liviano (slug + h1) para rutas y footer: evita cargar el contenido completo de las
// landings en todas las paginas.
export const localPagesIndex = ${JSON.stringify(index, null, 4)};
`;

const previo = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';
if (previo !== body) writeFileSync(OUT, body);
console.log(`[gen-local-index] ${index.length} landings -> localPagesIndex.js`);
