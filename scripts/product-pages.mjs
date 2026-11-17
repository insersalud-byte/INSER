/**
 * product-pages.mjs
 * Fichas individuales de producto: una pagina estatica por equipo en /producto/<id>.
 * Las genera scripts/prerender-meta.mjs en cada build (no son parte de la SPA de React:
 * son HTML liviano, como /sobre-nosotros o /contacto).
 *
 * DE DONDE SALE CADA DATO (nada se escribe dos veces):
 * - id, titulo para Google, descripcion neutra, fotos y marca: de la tabla FEED de
 *   scripts/merchant-feed.mjs (la misma que arma el feed de Merchant Center).
 * - nombre comercial, precio, nota y especificaciones: del catalogo de LandingPage.jsx
 *   (ofertas[] y tienda[]). Un cambio de precio en el sitio cambia la ficha sola.
 * - de esta tabla (FICHAS): que productos tienen ficha, el nombre que se muestra, el
 *   titulo de la pagina y a que familia pertenecen (define los textos de ayuda).
 *
 * Para sumar una ficha: agregar una fila a FICHAS con el id del producto en FEED.
 * El feed de Merchant apunta solo a la ficha de todo producto que la tenga.
 *
 * REGLAS DE TEXTO (las del sitio): sin "24 horas", sin superlativos ni comparaciones,
 * sin precios de alquiler; alquiler, instalacion y estudios solo en Cordoba; la venta de
 * CPAP/AutoCPAP no incluye mascara.
 */

const WA_NUM = '5493512065320';

const CATEGORIAS = {
    mascaras: { label: 'Máscaras para CPAP y BiPAP', href: '/mascaras-cpap', ver: 'Ver todas las máscaras para CPAP y BiPAP', otros: 'Otras máscaras e insumos' },
    pediatricas: { label: 'Máscaras pediátricas para CPAP y BiPAP', href: '/mascaras-pediatricas', ver: 'Ver las máscaras pediátricas para CPAP y BiPAP', otros: 'Otras máscaras pediátricas' },
    estacionarios: { label: 'Concentradores de oxígeno', href: '/comprar-concentrador-oxigeno-argentina', ver: 'Ver todos los concentradores de oxígeno', otros: 'Otros concentradores de oxígeno' },
    portatiles: { label: 'Concentradores de oxígeno portátiles', href: '/comprar-concentrador-oxigeno-portatil-argentina', ver: 'Ver los concentradores de oxígeno portátiles', otros: 'Otros equipos de oxígeno portátil' },
};

// familia: nasal | nasobucal | pillow | uti | pediatrica | tubuladura | estacionario | portatil | mochila
// titulo: va en <title> (marca y modelo adelante, para no competir con la pagina de categoria).
// resumen (opcional): primera frase de la meta description cuando la del feed es muy larga.
// h1 (opcional): encabezado de la pagina cuando conviene que arranque por marca y modelo.
// multitalle (opcional): talles de almohadilla que trae la caja (dato confirmado por el dueño).
export const FICHAS = [
    // ---- Mascaras nasales ----
    { id: 'mascara-nasal-philips-dreamwear', familia: 'nasal', cat: 'mascaras', nombre: 'Máscara nasal Philips DreamWear de mínimo contacto', titulo: 'Philips DreamWear nasal: máscara para CPAP y BiPAP' },
    { id: 'mascara-nasal-rescomf', familia: 'nasal', cat: 'mascaras', nombre: 'Máscara nasal RESCOMF con apoya frente', titulo: 'RESCOMF: máscara nasal para CPAP y BiPAP' },
    { id: 'mascara-nasal-bmc-n4', familia: 'nasal', cat: 'mascaras', nombre: 'Máscara nasal BMC N4 con apoya frente', titulo: 'BMC N4: máscara nasal con apoya frente para CPAP' },
    { id: 'mascara-nasal-bmc-n5a', familia: 'nasal', cat: 'mascaras', nombre: 'Máscara nasal BMC N5a sin apoya frente', titulo: 'BMC N5a: máscara nasal sin apoya frente para CPAP' },
    { id: 'mascara-nasal-bmc-multitalle', familia: 'nasal', cat: 'mascaras', nombre: 'Máscara nasal BMC multitalle', titulo: 'BMC multitalle: máscara nasal para CPAP y BiPAP' },
    { id: 'mascara-nasal-resmed-airfit-minimo-contacto', familia: 'nasal', cat: 'mascaras', nombre: 'Máscara nasal ResMed AirFit de mínimo contacto', titulo: 'ResMed AirFit nasal: máscara de mínimo contacto' },
    { id: 'mascara-almohadillas-yuwell-yp-01', familia: 'pillow', cat: 'mascaras', nombre: 'Almohadillas nasales Yuwell YP-01 (pillow)', titulo: 'Yuwell YP-01: almohadillas nasales para CPAP' },
    // ---- Mascaras nasobucales ----
    { id: 'mascara-nasobucal-philips-dreamwear', familia: 'nasobucal', cat: 'mascaras', nombre: 'Máscara nasobucal Philips DreamWear Full Face', titulo: 'Philips DreamWear Full Face: máscara nasobucal' },
    { id: 'mascara-nasobucal-bmc-f6', familia: 'nasobucal', cat: 'mascaras', multitalle: 'S, M y L', resumen: 'Máscara nasobucal (full face) BMC F6 multitalle, sin apoya frente: trae las almohadillas S, M y L.', nombre: 'Máscara nasobucal BMC F6 multitalle', titulo: 'BMC F6: máscara nasobucal multitalle para CPAP' },
    { id: 'mascara-buconasal-yuwell-apoya-frente', familia: 'nasobucal', cat: 'mascaras', nombre: 'Máscara buconasal Yuwell con apoya frente', titulo: 'Yuwell con apoya frente: máscara buconasal CPAP' },
    { id: 'mascara-buconasal-yuwell-yf02', familia: 'nasobucal', cat: 'mascaras', nombre: 'Máscara buconasal Yuwell YF02 sin apoya frente', titulo: 'Yuwell YF02: máscara buconasal sin apoya frente' },
    { id: 'mascara-buconasal-bmc-f5a', familia: 'nasobucal', cat: 'mascaras', nombre: 'Máscara buconasal BMC F5A sin apoya frente', titulo: 'BMC F5A: máscara buconasal sin apoya frente' },
    { id: 'mascara-nasobucal-resmed-airfit-f20', familia: 'nasobucal', cat: 'mascaras', nombre: 'Máscara nasobucal ResMed AirFit F20', titulo: 'ResMed AirFit F20: máscara nasobucal para CPAP' },
    { id: 'mascara-nasobucal-resmed-airfit-f30', familia: 'nasobucal', cat: 'mascaras', resumen: 'Máscara nasobucal ResMed AirFit F30 de bajo perfil: apoya por debajo de la nariz. Para CPAP y BiPAP.', nombre: 'Máscara nasobucal ResMed AirFit F30', titulo: 'ResMed AirFit F30: máscara nasobucal de bajo perfil' },
    { id: 'mascara-buconasal-bmc-f2-codo-azul', familia: 'uti', cat: 'mascaras', resumen: 'Máscara buconasal BMC F2 no ventilada, con codo azul, para respiradores de terapia intensiva y VNI con válvula espiratoria.', nombre: 'Máscara buconasal BMC F2 codo azul (no ventilada)', titulo: 'BMC F2 codo azul: máscara no ventilada para VNI' },
    // ---- Pediatricas ----
    { id: 'mascara-pediatrica-philips-wisp', familia: 'pediatrica', cat: 'pediatricas', nombre: 'Máscara nasal pediátrica Philips Wisp (jirafa)', titulo: 'Philips Wisp pediátrica (jirafa): máscara nasal' },
    { id: 'mascara-pediatrica-hsiner-cirri-mini', familia: 'pediatrica', cat: 'pediatricas', nombre: 'Máscara nasal pediátrica HSINER Cirri Mini', titulo: 'HSINER Cirri Mini: máscara nasal pediátrica' },
    { id: 'infant-cpap-kit-neonatal', familia: 'pediatrica', cat: 'pediatricas', nombre: 'Infant CPAP Kit neonatal (tallas 00 a 5)', titulo: 'Infant CPAP Kit neonatal: tallas 00 a 5' },
    // ---- Insumos ----
    { id: 'tubuladura-cpap-bipap', familia: 'tubuladura', cat: 'mascaras', resumen: 'Tubuladura de repuesto para CPAP, AutoCPAP y BiPAP, de 22 mm de diámetro estándar y 1,8 m de largo.', nombre: 'Tubuladura para CPAP y BiPAP (22 mm, 1,8 m)', titulo: 'Tubuladura para CPAP y BiPAP de 22 mm' },
    // ---- Oxigeno ----
    { id: 'concentrador-de-oxigeno-bmc-estacionario', familia: 'estacionario', cat: 'estacionarios', nota: true, nombre: 'Concentrador de oxígeno BMC estacionario de 5 L/min', h1: 'BMC estacionario de 5 L/min: concentrador de oxígeno con control remoto', titulo: 'BMC estacionario 5 L/min: concentrador de oxígeno' },
    { id: 'concentrador-de-oxigeno-yuwell-7f-5b', familia: 'estacionario', cat: 'estacionarios', nota: true, nombre: 'Concentrador de oxígeno Yuwell 7F-5B de 5 L/min', h1: 'Yuwell 7F-5B: concentrador de oxígeno estacionario de 5 L/min', titulo: 'Yuwell 7F-5B: estacionario 5 L/min con humidificador' },
    { id: 'gce-zen-o', familia: 'portatil', cat: 'portatiles', nota: true, resumen: 'Concentrador de oxígeno portátil GCE Zen-O con pulso y flujo continuo de 0,5 a 2 L/min, 2 baterías y carro. Apto para vuelos.', nombre: 'Concentrador de oxígeno portátil GCE Zen-O', h1: 'GCE Zen-O: concentrador de oxígeno portátil con 2 baterías y carro', titulo: 'GCE Zen-O: concentrador de oxígeno portátil' },
    { id: 'philips-simplygo', familia: 'portatil', cat: 'portatiles', nota: true, nombre: 'Concentrador de oxígeno portátil Philips SimplyGo', h1: 'Philips SimplyGo: concentrador de oxígeno portátil', titulo: 'Philips SimplyGo: concentrador de oxígeno portátil' },
    // PENDIENTES (no publicar hasta que lo confirme el dueño):
    // - concentrador-yuwell-estacionario-5l: la foto dice "8F-5A" y el catalogo no trae el modelo;
    //   sin ese dato no se distingue del Yuwell 7F-5B.
    // - mochila-de-oxigeno: falta saber si se envia al resto del pais (la recarga es en Cordoba).
];

export const rutaFicha = (id) => `/producto/${id}`;
export const idsConFicha = () => new Set(FICHAS.map((f) => f.id));

// Filas del catalogo que son promocion o comparacion, no una especificacion del producto.
const SPECS_FUERA = /^(ventaja|financiaci[oó]n|env[ií]o|stock|ideal para)$/i;
const ENVIO_GRATIS = /env[ií]o\s+(sin\s+cargo|gratis)/i;
const SIN_INTERES = /cuotas\s+sin\s+inter[eé]s/i;

// Fotos que no se muestran en la ficha aunque vuelvan a cargarse en FEED (fondo cuadriculado de falso transparente).
const FOTOS_FUERA = ['c1223981-5f7b-44d4-8c72-ba979f43f504'];
// Frases del catalogo que no van en una ficha (afirmaciones de mercado).
const FRASE_FUERA = /dif[ií]cil de conseguir|pocas opciones|gama alta|ideal para|m[aá]s econ[oó]mic|mejor/i;

const MASCARAS = new Set(['nasal', 'nasobucal', 'pillow', 'uti', 'pediatrica']);
const esInsumo = (fam) => MASCARAS.has(fam) || fam === 'tubuladura';

// "Máscara nasal BMC N4 con apoya frente" -> "la máscara nasal BMC N4 con apoya frente" (para frases).
const ARTICULOS = { 'máscara': 'la', almohadillas: 'las', tubuladura: 'la', concentrador: 'el', mochila: 'la' };
function cortoDe(nombre) {
    const base = nombre.replace(/\s*\([^)]*\)/g, '').replace(/:.*$/, '').trim();
    const primera = base.split(' ')[0];
    const art = ARTICULOS[primera.toLowerCase()];
    return art ? `${art} ${primera.toLowerCase()}${base.slice(primera.length)}` : `el ${base}`;
}

// Segundo parrafo de la descripcion: el texto "review" del catalogo, sin frases de mercado, sin
// la oferta (ya esta en "Envio, pago y garantia") y sin las oraciones que repiten la descripcion.
function sobreElModelo(review, desc) {
    const palabras = (s) => new Set(String(s).toLowerCase().match(/[a-záéíóúñü0-9]{4,}/g) || []);
    const yaDicho = palabras(desc);
    return String(review).replace(/SIN FUGA/g, 'sin fuga').split(/(?<=\.)\s+/).filter((x) => {
        if (!x || FRASE_FUERA.test(x) || /^Esta oferta/i.test(x)) return false;
        const w = [...palabras(x)];
        return w.length > 0 && w.filter((k) => yaDicho.has(k)).length / w.length < 0.6;
    }).join(' ');
}

function precioDe(raw) {
    const s = String(raw || '').trim();
    const m = s.match(/^(?:U\$S\s*([\d.,]+)|\$\s*([\d.]+))$/i);
    if (!m) return null;
    if (m[1]) {
        const n = m[1].replace(/\./g, '').replace(',', '.');
        return /^\d+(\.\d+)?$/.test(n) ? { valor: n, moneda: 'USD', texto: s } : null;
    }
    const n = m[2].replace(/\./g, '');
    return /^\d+$/.test(n) ? { valor: n, moneda: 'ARS', texto: s } : null;
}

// Meta description (<= 155): lo que es el producto (primeras oraciones de la descripcion
// neutra), el precio y el envio. Sin repetir el nombre dos veces.
function metaDescripcion(nombre, precio, desc, cola, resumen) {
    const frases = String(desc).split(/(?<=\.)\s+/);
    let intro = resumen || '';
    for (const frase of (resumen ? [] : frases)) {
        if ((intro ? intro + ' ' : '').length + frase.length > 105) break;
        intro = intro ? intro + ' ' + frase : frase;
    }
    if (!intro) intro = nombre.replace(/\s*\([^)]*\)/g, '') + '.';
    let out = `${intro} Precio: ${precio.texto}.`;
    if ((out + ' ' + cola).length <= 155) out += ' ' + cola;
    return out;
}

// ── Textos de ayuda por familia (HTML ya escapado; enlaces internos reales) ───────────
function guia(f, d) {
    const cat = CATEGORIAS[f.cat];
    const verCat = `<p><a href="${cat.href}">${cat.ver}</a></p>`;
    switch (f.familia) {
        case 'nasal':
        case 'nasobucal':
        case 'pillow': {
            const tipo = f.familia === 'nasal'
                ? 'Una máscara nasal cubre solo la nariz: es la indicada si respirás por la nariz al dormir. Si respirás por la boca, tenés congestión frecuente o usás presiones altas, suele corresponder una nasobucal.'
                : f.familia === 'nasobucal'
                    ? 'Una máscara nasobucal (también llamada buconasal o full face) cubre nariz y boca: se usa si respirás por la boca al dormir, tenés congestión frecuente o usás presiones altas. Si respirás por la nariz, podés usar una máscara nasal.'
                    : 'Las almohadillas nasales apoyan directo en las fosas nasales, con mínima presencia en la cara. Sirven si respirás por la nariz al dormir; si respirás por la boca, tenés congestión frecuente o usás presiones altas, suele corresponder una nasobucal.';
            return `<h2>¿Es el tipo de máscara que necesitás?</h2>
<p>${tipo} En <a href="${cat.href}">máscaras para CPAP y BiPAP</a> comparamos los tres tipos.</p>
<p>${f.multitalle ? `El talle importa tanto como el tipo: una máscara del talle equivocado pierde aire y te despierta. Este modelo es multitalle: la caja trae las almohadillas ${f.multitalle}. Si tenés dudas sobre el modelo, contanos por WhatsApp cómo dormís y qué equipo usás.` : 'El talle importa tanto como el tipo: una máscara del talle equivocado pierde aire y te despierta. Contanos por WhatsApp cómo dormís y qué equipo usás, y te ayudamos a elegir el modelo y el talle antes de comprar.'}</p>
<p>La máscara se vende por separado del equipo. Si alquilás un CPAP en Córdoba, <a href="/alquiler-cpap-cordoba">el alquiler ya incluye la máscara</a>.</p>
<h2>Cambio y cuidado</h2>
<p>La almohadilla de silicona conviene renovarla cada 2 a 4 semanas y la máscara completa cada 6 a 12 meses, según uso e higiene: la silicona pierde sellado con el tiempo y aparecen fugas. Se limpia con agua y jabón neutro.</p>`;
        }
        case 'uti':
            return `<h2>Para qué equipos es</h2>
<p>Es una máscara no ventilada: no tiene puertos de exhalación. Se usa con respiradores de terapia intensiva y con equipos de ventilación no invasiva que tienen válvula espiratoria.</p>
<p><strong>No sirve para un CPAP o BiPAP domiciliario estándar</strong>, que necesitan una máscara ventilada. Si tu equipo es de uso en casa, mirá las <a href="/mascaras-cpap">máscaras para CPAP y BiPAP</a> o escribinos y te confirmamos cuál corresponde.</p>`;
        case 'pediatrica':
            return `<h2>El talle no se elige por catálogo</h2>
<p>La cara de un chico no es una cara adulta a escala. El talle correcto depende de la edad, del tamaño y la forma de la cara, de la presión indicada y de si respira por la nariz o abre la boca al dormir.</p>
<p>Escribinos por WhatsApp con esos datos y con la marca y el modelo del equipo: te decimos cuál corresponde y te confirmamos la compatibilidad antes de comprar. Las máscaras pediátricas se usan siempre con indicación médica.</p>
<h2>Cambio y cuidado</h2>
<p>La almohadilla de silicona conviene renovarla cada 2 a 4 semanas y la máscara completa cada 6 a 12 meses, según uso e higiene.</p>
${verCat}`;
        case 'tubuladura':
            return `<h2>Para qué sirve</h2>
<p>Es el tubo que une el equipo con la máscara. Este repuesto tiene la conexión estándar de 22 mm que usan los CPAP, AutoCPAP y BiPAP. Por WhatsApp te confirmamos la compatibilidad con tu equipo antes de comprar.</p>
<h2>Cuidado</h2>
<p>La tubuladura se lava y se cuelga a secar. Si se raja, hay que reemplazarla.</p>
${verCat}`;
        case 'estacionario':
            return `<h2>¿Es el equipo que te indicaron?</h2>
<p>El dato que define el equipo es el flujo de tu indicación médica, en litros por minuto. Hasta 5 L/min lo cubre un concentrador estacionario como este; por encima de eso hace falta un equipo de alto flujo, como el <a href="/concentrador-oxigeno-10-litros">concentrador Yuwell de 10 litros</a>.</p>
<p>Funciona enchufado a la red eléctrica y produce oxígeno a partir del aire del ambiente: no hay tubos que recargar. El filtro externo se limpia con agua una vez por mes y se deja secar.</p>
<p>Por seguridad, no se fuma ni se acerca una llama al equipo mientras está en uso.</p>
<p>En Córdoba también alquilamos concentradores con entrega e instalación a domicilio: mirá <a href="/alquiler-concentrador-oxigeno-cordoba">alquiler de concentrador de oxígeno en Córdoba</a>.</p>
${verCat}`;
        case 'portatil':
            return `<h2>Pulso y flujo continuo</h2>
<p>Este equipo tiene modo pulso y flujo continuo de 0,5 a 2 L/min. En modo pulso entrega oxígeno cuando detecta la inspiración y la batería rinde más; el flujo continuo es la opción cuando el médico lo indica. Si tu indicación es de flujo continuo por encima de 2 L/min, corresponde un <a href="/comprar-concentrador-oxigeno-argentina">concentrador estacionario</a>.</p>
<p>La autonomía depende del flujo que uses: a mayor flujo, menos dura la batería. Decinos cuántas horas necesitás estar fuera de casa y en qué nivel, y te confirmamos si alcanza.</p>
<h2>Para viajar en avión</h2>
<p>Está homologado para vuelos (FAA). Las aerolíneas suelen pedir aviso previo y batería para más tiempo que la duración del vuelo: consultá los requisitos de la tuya antes de viajar.</p>
<p>En Córdoba también alquilamos concentradores portátiles: mirá <a href="/concentrador-oxigeno-portatil-cordoba">concentrador de oxígeno portátil en Córdoba</a>.</p>
${verCat}`;
        case 'mochila':
            return `<h2>Para qué sirve</h2>
<p>Es un tubo portátil de oxígeno medicinal con regulador y bolso de transporte. No necesita electricidad ni batería y rinde entre 1 y 3 horas según el flujo indicado: sirve para salidas cortas o un turno médico.</p>
<p>Cuando se agota, se recarga en INSER SALUD, en Córdoba. Si pasás buena parte del día fuera de casa, mirá los <a href="/comprar-concentrador-oxigeno-portatil-argentina">concentradores de oxígeno portátiles</a>.</p>
<p>El flujo lo define tu médico.</p>`;
        default:
            return '';
    }
}

function preguntas(f, d) {
    const qs = [];
    const usd = d.precio.moneda === 'USD';
    qs.push({
        q: `¿Cuánto ${/^l[ao]s /.test(f.corto) ? 'cuestan' : 'cuesta'} ${f.corto}?`,
        a: `${d.precio.texto}. ${usd ? 'Es un precio de referencia en dólares: te confirmamos el valor en pesos del día por WhatsApp.' : 'Los precios se actualizan: confirmá el valor del día por WhatsApp.'}`,
    });
    const talles = (d.specs.find(([k]) => /^tallas?$/i.test(String(k).trim())) || [])[1];
    if (f.multitalle) {
        qs.push({ q: '¿En qué talles viene?', a: `Es multitalle: la caja trae las almohadillas ${f.multitalle}.` });
    } else if (talles && MASCARAS.has(f.familia)) {
        qs.push({ q: /^l[ao]s /.test(f.corto) ? '¿En qué talles vienen?' : '¿En qué talles viene?', a: `${talles}. Si no sabés cuál te corresponde, escribinos por WhatsApp y te ayudamos a elegir antes de comprar.` });
    }
    if (['nasal', 'nasobucal', 'pillow'].includes(f.familia)) {
        qs.push({ q: '¿Es compatible con mi CPAP o BiPAP?', a: 'Usa la conexión estándar de tubuladura de 22 mm, compatible con CPAP, AutoCPAP y BiPAP. Si tenés dudas, pasanos la marca y el modelo de tu equipo y te lo confirmamos antes de comprar.' });
    } else if (f.familia === 'uti') {
        qs.push({ q: '¿Sirve para mi CPAP o BiPAP de casa?', a: 'No. Es una máscara no ventilada, para respiradores de terapia intensiva y VNI con válvula espiratoria. Un CPAP o BiPAP domiciliario estándar necesita una máscara ventilada.' });
    } else if (f.familia === 'pediatrica') {
        qs.push({ q: '¿Es compatible con el equipo que usa mi hijo?', a: 'Es para equipos de CPAP y BiPAP. Antes de comprar, pasanos por WhatsApp la marca y el modelo del equipo y te confirmamos la compatibilidad.' });
    } else if (f.familia === 'estacionario') {
        qs.push({ q: '¿Necesito indicación médica?', a: 'La oxigenoterapia se usa según indicación médica, con el flujo en litros por minuto. Te asesoramos para que el equipo cumpla con lo que te indicaron.' });
        qs.push({ q: '¿Se puede alquilar en lugar de comprar?', a: 'En Córdoba sí: alquilamos concentradores con entrega e instalación a domicilio, y el alquiler se cotiza por WhatsApp. Al resto del país vendemos con envío.' });
    } else if (f.familia === 'portatil') {
        qs.push({ q: '¿Se puede usar en un avión?', a: 'Sí, está homologado para vuelos (FAA). Las aerolíneas suelen pedir aviso previo y batería suficiente: consultá los requisitos de la tuya antes de viajar.' });
        qs.push({ q: '¿Se puede usar mientras duermo?', a: 'Solo en flujo continuo y si tu médico lo autorizó. El modo pulso depende de detectar cada inspiración, y durante el sueño la respiración se vuelve más suave.' });
    } else if (f.familia === 'mochila') {
        qs.push({ q: '¿Cuánto dura la carga?', a: 'Entre 1 y 3 horas según el flujo indicado.' });
        qs.push({ q: '¿Dónde se recarga?', a: 'En INSER SALUD, en Córdoba.' });
    }
    if (f.familia !== 'mochila') {
        qs.push({ q: '¿Hacen envíos?', a: d.envioGratis
            ? 'Sí. Por la oferta vigente este equipo se envía sin cargo a todo el país. En Córdoba Capital la entrega es en el día.'
            : 'Sí. En Córdoba Capital la entrega es sin cargo y en el día. Al resto del país el envío tiene costo y tarda de 3 a 7 días hábiles; te confirmamos el valor para tu destino por WhatsApp.' });
    }
    return qs;
}

function compraYGarantia(f, d) {
    const li = [];
    if (f.familia === 'mochila') {
        li.push('<strong>Entrega:</strong> en Córdoba. Para otras zonas, consultanos por WhatsApp: la recarga del tubo se hace en INSER SALUD, en Córdoba.');
    } else if (d.envioGratis) {
        li.push('<strong>Envío:</strong> por la oferta vigente, este equipo se envía sin cargo a todo el país. En Córdoba Capital la entrega es en el día.');
    } else {
        li.push('<strong>Envío:</strong> en Córdoba Capital la entrega es sin cargo y en el día. Al resto del país el envío tiene costo y tarda de 3 a 7 días hábiles; te confirmamos el valor para tu destino por WhatsApp.');
    }
    if (esInsumo(f.familia) || f.familia === 'mochila') {
        li.push('<strong>Pago:</strong> efectivo, transferencia o tarjeta.');
    } else if (d.sinInteres) {
        // Solo la frase de las cuotas (el envio ya esta en el punto anterior) y, si el catalogo la declara, la condicion de stock.
        const cuotas = d.nota.split(/(?<=\.)\s+/).filter((x) => SIN_INTERES.test(x)).join(' ');
        const stock = (d.specsTodas.find(([k]) => /^stock$/i.test(k)) || [])[1];
        li.push(`<strong>Pago:</strong> ${d.esc(cuotas)}${stock ? ' ' + d.esc(stock) + '.' : ''} También efectivo, transferencia y tarjeta.`);
    } else {
        li.push('<strong>Pago:</strong> cuotas fijas con Banco Galicia: 3 cuotas (+15%), 6 cuotas (+24%) o 9 cuotas (+39%), con el recargo ya incluido en la cuota y sujeto a condiciones del banco. También efectivo, transferencia y tarjeta.');
    }
    const garantia = (d.specs.find(([k]) => /^garant[ií]a$/i.test(k)) || [])[1];
    if (garantia) { const g = garantia.replace(/\s*\(premium\)/i, ''); li.push(`<strong>Garantía:</strong> ${d.esc(g.charAt(0).toLowerCase() + g.slice(1))}.`); }
    else if (MASCARAS.has(f.familia)) li.push('<strong>Garantía:</strong> oficial del fabricante.');
    if (f.familia === 'tubuladura') {
        li.push('<strong>Devoluciones:</strong> por razones de higiene, las tubuladuras son descartables y no tienen devolución. <a href="/politica-de-devoluciones">Política de devoluciones</a>.');
    } else if (esInsumo(f.familia)) {
        li.push('<strong>Devoluciones:</strong> por razones de higiene, las máscaras y los descartables no tienen devolución una vez abiertos o usados. Si el producto llega con un defecto de fábrica, se aplica la garantía. <a href="/politica-de-devoluciones">Política de devoluciones</a>.');
    } else {
        li.push('<strong>Devoluciones:</strong> si comprás a distancia tenés 10 días corridos para arrepentirte de la compra. <a href="/politica-de-devoluciones">Política de devoluciones</a>.');
    }
    li.push('<strong>Factura y reintegro:</strong> trabajamos de forma particular y te entregamos presupuesto formal y factura para que gestiones el reintegro ante tu obra social o prepaga.');
    return `<h2>Envío, pago y garantía</h2>\n<ul class="lista">\n${li.map((x) => `<li>${x}</li>`).join('\n')}\n</ul>`;
}

const CSS = `:root{--tinta:#0f172a;--suave:#475569;--linea:#e2e8f0;--azul:#1e40af;--verde:#108043;--fondo:#f8fafc}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--fondo);color:var(--tinta);font-family:system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;line-height:1.65}
a{color:var(--azul)}
img{max-width:100%;height:auto}
.barra{position:sticky;top:0;z-index:50;background:#fff;border-bottom:1px solid #e8eef6;box-shadow:0 1px 8px rgba(30,64,175,.05)}
.barra-in{max-width:1100px;margin:0 auto;padding:.6rem 1rem;display:flex;align-items:center;justify-content:space-between;gap:.75rem}
.barra img{display:block;width:38px;height:38px}
.logo{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:var(--azul);font-weight:800;letter-spacing:.02em;font-size:.95rem}
.logo span{white-space:nowrap}
@media (max-width:440px){.logo span{display:none}}
.barra-btns{display:flex;gap:.5rem}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:.45rem;border-radius:.7rem;font-weight:700;text-decoration:none;color:#fff;background:var(--verde);padding:.5rem .9rem;font-size:.9rem;line-height:1.2}
.btn.azul{background:var(--azul)}
.btn.grande{padding:.9rem 1.3rem;font-size:1.05rem;width:100%}
.btn.linea{background:#fff;color:var(--azul);border:1px solid #bfdbfe}
.btn svg{flex:0 0 auto}
.btn:focus-visible,a:focus-visible,button:focus-visible{outline:3px solid #f59e0b;outline-offset:2px}
.wrap{max-width:1100px;margin:0 auto;padding:1.25rem 1rem 0}
.migas{font-size:.85rem;color:#64748b;margin:0 0 1rem}
.migas a{color:#64748b;text-decoration:none}
.migas a:hover{text-decoration:underline}
.ficha{display:grid;grid-template-columns:1fr;gap:1.5rem}
.fotos{min-width:0}
.foto-principal{background:#fff;border:1px solid var(--linea);border-radius:1rem;padding:.75rem;display:flex;align-items:center;justify-content:center;aspect-ratio:1/1;overflow:hidden}
.foto-principal picture{display:contents}
.foto-principal img{width:100%;height:100%;object-fit:contain}
.minis{display:flex;gap:.5rem;margin-top:.6rem;flex-wrap:wrap}
.minis a{display:block;width:72px;height:72px;background:#fff;border:1px solid var(--linea);border-radius:.6rem;padding:.25rem;overflow:hidden}
.minis a[aria-current="true"]{border-color:var(--azul);box-shadow:0 0 0 2px #bfdbfe}
.minis img{width:100%;height:100%;object-fit:contain}
.compra{min-width:0}
.marca{font-size:.8rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#64748b;margin:0 0 .3rem}
h1{font-size:clamp(1.5rem,4.2vw,2.1rem);line-height:1.18;margin:0 0 .75rem}
.precio{font-size:2.1rem;font-weight:800;color:var(--azul);line-height:1.1;margin:0}
.precio-nota{font-size:.88rem;color:var(--suave);margin:.35rem 0 1rem}
.oferta{display:inline-block;background:#ecfdf5;color:#065f46;border:1px solid #a7f3d0;border-radius:.6rem;padding:.4rem .7rem;font-size:.9rem;font-weight:600;margin:0 0 1rem}
.acciones{display:grid;gap:.6rem;margin:0 0 1rem}
.puntos{list-style:none;padding:0;margin:0;display:grid;gap:.45rem;font-size:.93rem;color:#334155}
.puntos li{display:flex;gap:.5rem;align-items:flex-start}
.puntos svg{flex:0 0 auto;margin-top:.22rem;color:var(--verde)}
.cuerpo{max-width:860px;margin:0 auto;padding:1rem 1rem 0}
h2{font-size:1.3rem;line-height:1.25;margin:2rem 0 .6rem}
.cuerpo p{margin:0 0 .8rem;color:#334155}
.aviso{background:#fffbeb;border:1px solid #fcd34d;color:#92400e;border-radius:.7rem;padding:.8rem 1rem;font-weight:600;margin:1rem 0}
table.specs{width:100%;border-collapse:collapse;background:#fff;border:1px solid var(--linea);border-radius:.8rem;overflow:hidden;font-size:.95rem}
table.specs th,table.specs td{text-align:left;padding:.6rem .85rem;border-bottom:1px solid #eef2f7;vertical-align:top}
table.specs tr:last-child th,table.specs tr:last-child td{border-bottom:0}
table.specs th{width:38%;font-weight:600;color:#475569;background:#f8fafc}
.lista{padding-left:1.1rem;margin:0;color:#334155}
.lista li{margin:0 0 .55rem}
.faq{background:#fff;border:1px solid #e8eef6;border-radius:.7rem;padding:.9rem 1.1rem;margin:0 0 .6rem}
.faq h3{margin:0 0 .3rem;font-size:1.02rem}
.faq p{margin:0}
.cta-final{background:#eff6ff;border:1px solid #bfdbfe;border-radius:.9rem;padding:1.1rem;margin:2rem 0 0;display:flex;flex-wrap:wrap;gap:.75rem;align-items:center;justify-content:space-between}
.cta-final p{margin:0;font-weight:600;color:var(--tinta);flex:1 1 240px}
.otros{max-width:1100px;margin:0 auto;padding:0 1rem}
.grilla{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:.75rem}
.tarjeta{background:#fff;border:1px solid #dbeafe;border-radius:.9rem;padding:.75rem;display:flex;flex-direction:column;gap:.3rem;text-decoration:none;color:var(--tinta)}
.tarjeta:hover{border-color:var(--azul)}
.tarjeta img{width:100%;height:120px;object-fit:contain}
.tarjeta span{font-size:.9rem;font-weight:600;line-height:1.3}
.tarjeta strong{color:var(--azul);font-size:1.05rem}
.pie{background:#0f172a;color:#cbd5e1;margin-top:2.5rem;padding:1.5rem 1rem 2rem;text-align:center;font-size:.85rem}
.pie a{color:#93c5fd}
.pie nav{display:flex;flex-wrap:wrap;gap:.9rem;justify-content:center;margin-top:.6rem}
@media (min-width:860px){.foto-principal{aspect-ratio:4/3}.ficha{grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:2.25rem;align-items:start}.btn.grande{width:auto}.acciones{grid-template-columns:auto auto;justify-content:start}}
@media print{.barra,.acciones,.cta-final{display:none!important}}`;

const ICON_WA = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.82 9.82 0 0 0 1.5 5.26l-.999 3.648 3.988-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>';
const ICON_TEL = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
const ICON_OK = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

// Medicion: mismos eventos que el resto del sitio (ver public/sobre-nosotros/index.html).
const GA = `<script async src="https://www.googletagmanager.com/gtag/js?id=G-XD586V0PLV"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  try{var q=location.search;if(/[?&]sinstats=1/.test(q))localStorage.setItem('inser-sin-stats','1');if(/[?&]constats=1/.test(q))localStorage.removeItem('inser-sin-stats');if(localStorage.getItem('inser-sin-stats')==='1')window['ga-disable-G-XD586V0PLV']=true;}catch(e){}
  if(!/(^|\\.)(insersalud\\.com|inser\\.ar)$/.test(location.hostname))window['ga-disable-G-XD586V0PLV']=true;
  gtag('js', new Date());
  gtag('config', 'G-XD586V0PLV');
  document.addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('a[href*="wa.me/"],a[href^="tel:"]');if(!a||typeof gtag!=='function')return;var href=a.getAttribute('href')||'';gtag('event',href.indexOf('tel:')===0?'contact_phone':'contact_whatsapp',{source:'producto',link_url:href,ubicacion:a.getAttribute('data-wa')||'contenido',pagina:location.pathname,transport_type:'beacon'});gtag('event','conversion',{send_to:'AW-18383657900/2leGCIadkeEcEKy3gb5E',value:1.0,currency:'ARS'});},true);
</script>`;

// Cambio de foto sin recargar; sin JS las miniaturas igual abren la foto.
const GALERIA_JS = `<script>
(function(){var p=document.getElementById('foto-principal');if(!p)return;var ms=document.querySelectorAll('.minis a');
for(var i=0;i<ms.length;i++){ms[i].addEventListener('click',function(e){e.preventDefault();var s=p.parentNode.querySelector('source');if(s)s.parentNode.removeChild(s);
p.removeAttribute('width');p.removeAttribute('height');p.src=this.getAttribute('data-webp')||this.getAttribute('href');p.alt=this.getAttribute('data-alt')||p.alt;for(var j=0;j<ms.length;j++)ms[j].removeAttribute('aria-current');this.setAttribute('aria-current','true');});}})();
</script>`;

/**
 * Arma todas las fichas.
 * @returns {Array<{id, ruta, html, cuerpo, titulo, descripcion, imagenes, nombre}>}
 * `cuerpo` es el HTML del contenido (sin <head>): sirve para el .md y para que el feed de
 * Merchant verifique que el precio se ve en la pagina.
 */
export function construirFichas({ FEED, catalogo, SALUD, esc, attr, imageSize, webpDe, existeArchivo, avisar = () => {} }) {
    const ruta = (url) => (url.startsWith(SALUD) ? url.slice(SALUD.length) : url);
    const datos = new Map();

    for (const f of FICHAS) {
        const p = FEED.find((x) => x.id === f.id);
        if (!p) { avisar(`${f.id}: no esta en FEED (merchant-feed.mjs), no se genera la ficha`); continue; }
        const filas = p.slug ? catalogo.filter((c) => c.slug === p.slug)
            : p.nombre ? catalogo.filter((c) => !c.slug && p.nombre.test(c.name || '')) : [];
        if (!filas.length) { avisar(`${f.id}: sin ficha en el catalogo de LandingPage.jsx, no se genera`); continue; }
        const precios = [...new Set(filas.map((c) => c.price))];
        if (precios.length > 1) { avisar(`${f.id}: figura con dos precios (${precios.join(' / ')}), no se genera`); continue; }
        const precio = precioDe(precios[0]);
        if (!precio) { avisar(`${f.id}: el precio "${precios[0]}" no es un importe, no se genera`); continue; }
        // La fila del catalogo con mas especificaciones (el producto puede estar en ofertas[] y tienda[]).
        const cat = [...filas].sort((a, b) => (b.specs || []).length - (a.specs || []).length)[0];
        const imagenes = [p.img, ...(p.add || [])].map(ruta)
            .filter((src, i, arr) => arr.indexOf(src) === i && existeArchivo(src) && !FOTOS_FUERA.some((x) => src.includes(x)));
        if (!imagenes.length) { avisar(`${f.id}: no existe la foto principal, no se genera`); continue; }
        const notas = filas.map((c) => c.note || '').join(' ');
        const nota = f.nota ? (cat.note || '') : '';
        datos.set(f.id, {
            f: { ...f, corto: cortoDe(f.nombre) },
            p, precio, imagenes,
            specs: (cat.specs || []).filter(([k]) => !SPECS_FUERA.test(String(k).trim()))
                .map(([k, v]) => [k, String(v).replace(/\s*\(premium\)/i, '')]),
            specsTodas: cat.specs || [],
            sobre: sobreElModelo(filas.map((c) => c.review || '').find(Boolean) || '', p.desc),
            nota,
            envioGratis: ENVIO_GRATIS.test(notas),
            sinInteres: SIN_INTERES.test(nota),
            esc,
        });
    }

    const picture = (src, alt, extra) => {
        const d = imageSize(src);
        const dim = d ? ` width="${d.w}" height="${d.h}"` : '';
        const w = webpDe(src);
        const img = `<img src="${attr(src)}" alt="${attr(alt)}"${dim}${extra || ''}>`;
        return w ? `<picture><source type="image/webp" srcset="${attr(w)}">${img}</picture>` : img;
    };

    const salida = [];
    for (const d of datos.values()) {
        const { f, p, precio, imagenes, specs } = d;
        const cat = CATEGORIAS[f.cat];
        const url = SALUD + rutaFicha(f.id);
        const titulo = `${f.titulo} | INSER`;
        const descripcion = metaDescripcion(f.nombre, precio, p.desc, f.familia === 'mochila' ? 'Entrega en Córdoba.' : 'Envío a todo el país.', f.resumen);
        const usd = precio.moneda === 'USD';
        const waTexto = (base) => `https://wa.me/${WA_NUM}?text=${encodeURIComponent(`${base} (Vengo de insersalud.com${rutaFicha(f.id)})`)}`;
        const waComprar = waTexto(`Hola, quiero comprar ${f.corto} (${precio.texto}). ¿Me pasan disponibilidad y formas de pago?`);
        const waConsulta = waTexto(`Hola, tengo una consulta sobre ${f.corto}.`);

        // Rotacion circular: cada ficha enlaza a las 4 que le siguen en su categoria, asi todas reciben enlaces.
        const deLaCat = [...datos.values()].filter((o) => o.f.cat === f.cat);
        const yo = deLaCat.findIndex((o) => o.f.id === f.id);
        const otros = [...deLaCat.slice(yo + 1), ...deLaCat.slice(0, yo)].slice(0, 4);

        const puntos = [];
        if (f.familia === 'mochila') puntos.push('Entrega en Córdoba; la recarga se hace en INSER SALUD');
        else if (d.envioGratis) puntos.push('Envío sin cargo a todo el país (oferta vigente)');
        else puntos.push('Envío a todo el país · En Córdoba Capital, entrega en el día');
        if (f.multitalle) puntos.push(`Multitalle: trae las almohadillas ${f.multitalle}`);
        else if (MASCARAS.has(f.familia) && f.familia !== 'uti') puntos.push('Te ayudamos a elegir el talle antes de comprar');
        if (f.familia === 'estacionario') puntos.push('En Córdoba también alquilamos concentradores, con entrega e instalación');
        if (f.familia === 'portatil') puntos.push('En Córdoba también alquilamos concentradores portátiles');
        puntos.push('Factura para gestionar el reintegro ante tu obra social o prepaga');

        const galeria = `<div class="fotos">
<div class="foto-principal">${picture(imagenes[0], f.nombre, ' id="foto-principal" fetchpriority="high" decoding="async"')}</div>
${imagenes.length > 1 ? `<div class="minis">\n${imagenes.map((src, i) => `<a href="${attr(src)}"${webpDe(src) ? ` data-webp="${attr(webpDe(src))}"` : ''} data-alt="${attr(`${f.nombre}, foto ${i + 1}`)}"${i === 0 ? ' aria-current="true"' : ''}><img src="${attr(webpDe(src) || src)}" alt="${attr(`${f.nombre}, foto ${i + 1}`)}" width="72" height="72" loading="lazy" decoding="async"></a>`).join('\n')}\n</div>` : ''}
</div>`;

        const qs = preguntas(f, d);
        const cuerpo = `<main>
<div class="wrap">
<nav class="migas" aria-label="Ruta de navegación"><a href="/">Inicio</a> › <a href="${cat.href}">${esc(cat.label)}</a> › <span>${esc(f.nombre)}</span></nav>
<div class="ficha">
${galeria}
<div class="compra">
${p.brand ? `<p class="marca">${esc(p.brand)}</p>\n` : ''}<h1>${esc(f.h1 || f.nombre)}</h1>
<p class="precio">${esc(precio.texto)}</p>
<p class="precio-nota">${usd ? 'Precio de referencia en dólares: te confirmamos el valor en pesos del día por WhatsApp.' : 'Los precios se actualizan: confirmá el valor del día por WhatsApp.'}</p>
${d.nota ? `<p class="oferta">${esc(d.nota)}</p>` : ''}
<div class="acciones">
<a class="btn grande" data-wa="ficha-comprar" href="${attr(waComprar)}" target="_blank" rel="noopener noreferrer">${ICON_WA} Lo quiero</a>
<a class="btn grande linea" data-wa="ficha-consulta" href="${attr(waConsulta)}" target="_blank" rel="noopener noreferrer">Hacer una consulta</a>
</div>
<ul class="puntos">
${puntos.map((x) => `<li>${ICON_OK}<span>${esc(x)}</span></li>`).join('\n')}
</ul>
</div>
</div>
</div>
<div class="cuerpo">
${f.familia === 'uti' ? '<p class="aviso">Máscara no ventilada: no es para CPAP ni BiPAP domiciliario.</p>' : ''}
<h2>Descripción</h2>
<p>${esc(p.desc)}</p>
${d.sobre ? `<p>${esc(d.sobre)}</p>` : ''}
${specs.length ? `<h2>Características</h2>\n<table class="specs">\n<tbody>\n${specs.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`).join('\n')}\n</tbody>\n</table>` : ''}
${guia(f, d)}
${compraYGarantia(f, d)}
<h2>Preguntas frecuentes</h2>
${qs.map((x) => `<div class="faq"><h3>${esc(x.q)}</h3><p>${esc(x.a)}</p></div>`).join('\n')}
<div class="cta-final"><p>¿Te quedó alguna duda sobre ${esc(f.corto)}? Respondemos por WhatsApp todos los días de 8 a 20 hs.</p><a class="btn" data-wa="ficha-final" href="${attr(waConsulta)}" target="_blank" rel="noopener noreferrer">${ICON_WA} Escribinos</a></div>
</div>
${otros.length ? `<div class="otros">
<h2>${cat.otros}</h2>
<div class="grilla">
${otros.map((o) => `<a class="tarjeta" href="${rutaFicha(o.f.id)}">${picture(o.imagenes[0], o.f.nombre, ' loading="lazy" decoding="async"')}<span>${esc(o.f.nombre)}</span><strong>${esc(o.precio.texto)}</strong></a>`).join('\n')}
</div>
<p style="margin:1rem 0 0"><a href="${cat.href}">${esc(cat.ver)}</a></p>
</div>` : ''}
</main>`;

        const ld = {
            '@context': 'https://schema.org',
            '@graph': [
                {
                    '@type': 'WebPage',
                    '@id': `${url}#webpage`,
                    url,
                    name: titulo,
                    description: descripcion,
                    inLanguage: 'es-AR',
                    isPartOf: { '@id': 'https://insersalud.com/#website' },
                    publisher: { '@id': 'https://insersalud.com/#organization' },
                    breadcrumb: { '@id': `${url}#breadcrumb` },
                    mainEntity: { '@id': `${url}#producto` },
                },
                {
                    '@type': 'BreadcrumbList',
                    '@id': `${url}#breadcrumb`,
                    itemListElement: [
                        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SALUD}/` },
                        { '@type': 'ListItem', position: 2, name: cat.label, item: SALUD + cat.href },
                        { '@type': 'ListItem', position: 3, name: f.nombre, item: url },
                    ],
                },
                {
                    '@type': 'Product',
                    '@id': `${url}#producto`,
                    name: f.nombre.replace(/\s*\([^)]*\)/g, '').trim(),
                    description: p.desc,
                    sku: f.id,
                    image: imagenes.map((src) => SALUD + src),
                    url,
                    ...(p.brand ? { brand: { '@type': 'Brand', name: p.brand } } : {}),
                    category: p.type,
                    offers: {
                        '@type': 'Offer',
                        url,
                        price: precio.valor,
                        priceCurrency: precio.moneda,
                        availability: 'https://schema.org/InStock',
                        itemCondition: 'https://schema.org/NewCondition',
                        seller: { '@id': 'https://insersalud.com/#organization' },
                        ...(d.envioGratis ? {
                            shippingDetails: {
                                '@type': 'OfferShippingDetails',
                                shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'ARS' },
                                shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'AR' },
                            },
                        } : {}),
                    },
                },
                {
                    '@type': 'FAQPage',
                    '@id': `${url}#faq`,
                    mainEntity: qs.map((x) => ({ '@type': 'Question', name: x.q, acceptedAnswer: { '@type': 'Answer', text: x.a } })),
                },
            ],
        };

        const preload = webpDe(imagenes[0]) || imagenes[0];
        const html = `<!DOCTYPE html>
<html lang="es-AR">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(titulo)}</title>
<meta name="description" content="${attr(descripcion)}" />
<link rel="canonical" href="${attr(url)}" />
<meta name="robots" content="index, follow" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="preload" as="image" href="${attr(preload)}" fetchpriority="high" />
<meta property="og:type" content="product" />
<meta property="og:site_name" content="INSER SALUD" />
<meta property="og:locale" content="es_AR" />
<meta property="og:title" content="${attr(titulo)}" />
<meta property="og:description" content="${attr(descripcion)}" />
<meta property="og:url" content="${attr(url)}" />
<meta property="og:image" content="${attr(SALUD + imagenes[0])}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${attr(titulo)}" />
<meta name="twitter:description" content="${attr(descripcion)}" />
<script type="application/ld+json">
${JSON.stringify(ld, null, 2).replace(/</g, '\\u003c')}
</script>
${GA}
<style>
${CSS}
</style>
</head>
<body>
<header class="barra"><div class="barra-in">
<a class="logo" href="/" aria-label="INSER SALUD, inicio"><img src="/artifacts/logo_insersalud_160.webp" alt="" width="38" height="38"><span>INSER SALUD</span></a>
<div class="barra-btns">
<a class="btn azul" data-wa="encabezado" href="tel:+5493512065320">${ICON_TEL} Llamar</a>
<a class="btn" data-wa="encabezado" href="${attr(waConsulta)}" target="_blank" rel="noopener noreferrer">${ICON_WA} WhatsApp</a>
</div>
</div></header>
${cuerpo}
<footer class="pie">
<div>&copy; 2026 INSER SALUD · Córdoba, Argentina · Dirige: Lic. Sergio Giorda, kinesiólogo (MP 2123)</div>
<nav aria-label="Enlaces del sitio">
<a href="/">Inicio</a>
<a href="${cat.href}">${esc(cat.label)}</a>
<a href="/sobre-nosotros">Quiénes somos</a>
<a href="/contacto">Contacto</a>
<a href="/politica-de-devoluciones">Devoluciones</a>
<a href="/politica-de-privacidad">Privacidad</a>
</nav>
</footer>
${imagenes.length > 1 ? GALERIA_JS : ''}
</body>
</html>
`;
        // Version para el .md (llms): mismo contenido, sin botones ni iconos, con las tablas como listas.
        const cuerpoMd = `<h1>${esc(f.h1 || f.nombre)}</h1>
<p><strong>Precio:</strong> ${esc(precio.texto)}. ${usd ? 'Precio de referencia en dólares: el valor en pesos del día se confirma por WhatsApp.' : 'Los precios se actualizan: el valor del día se confirma por WhatsApp.'}</p>
${d.nota ? `<p>${esc(d.nota)}</p>` : ''}
<p>Categoría: <a href="${cat.href}">${esc(cat.label)}</a>${p.brand ? ` · Marca: ${esc(p.brand)}` : ''}</p>
<h2>Descripción</h2>
<p>${esc(p.desc)}</p>
${d.sobre ? `<p>${esc(d.sobre)}</p>` : ''}
${specs.length ? `<h2>Características</h2>\n<ul>\n${specs.map(([k, v]) => `<li><strong>${esc(k)}:</strong> ${esc(v)}</li>`).join('\n')}\n</ul>` : ''}
${guia(f, d)}
${compraYGarantia(f, d).replace(' class="lista"', '')}
<h2>Preguntas frecuentes</h2>
${qs.map((x) => `<h3>${esc(x.q)}</h3>\n<p>${esc(x.a)}</p>`).join('\n')}
${otros.length ? `<h2>${cat.otros}</h2>\n<ul>\n${otros.map((o) => `<li><a href="${rutaFicha(o.f.id)}">${esc(o.f.nombre)}</a>: ${esc(o.precio.texto)}</li>`).join('\n')}\n</ul>` : ''}
<p>Consultas y compra por WhatsApp: <a href="https://wa.me/${WA_NUM}">+54 9 351 206-5320</a>, todos los días de 8 a 20 hs.</p>`;
        salida.push({ id: f.id, ruta: rutaFicha(f.id), html, cuerpo, cuerpoMd, titulo, descripcion, nombre: f.nombre, imagenes, cat: f.cat, precio: precio.texto });
    }
    return salida;
}
