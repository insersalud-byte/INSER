/**
 * localPages.js — datos de las landing pages SEO locales (alta intención, Córdoba).
 * Archivo PLANO sin imports: lo consume tanto el componente React (LocalPage.jsx)
 * como el prerender (scripts/prerender-meta.mjs) para generar HTML estático por
 * dominio. Fuente única de verdad de estas páginas.
 *
 * Estructura por página:
 *  - slug, h1, metaTitle (inser.ar), metaTitleSalud (insersalud.com), description
 *  - heroImg, intro, ctaSanti
 *  - sections: [{ title, content }]  (content: párrafos separados por \n\n)
 *  - products: [{ name, price }]      (opcional, lista de referencia)
 *  - faq: [{ q, a }]
 *  - related: [{ label, href }]       (links internos)
 */
export const localPages = [
    {
        slug: 'alquiler-cpap-cordoba',
        h1: 'Alquiler de CPAP en Córdoba',
        metaTitle: 'Alquiler de CPAP en Córdoba | Entrega a Domicilio 24hs | INSER SALUD',
        metaTitleSalud: 'Alquiler de CPAP a Domicilio en Córdoba | INSER SALUD',
        description: 'Alquilá un CPAP o AutoCPAP en Córdoba con entrega e instalación a domicilio en 24 hs. Equipos aprobados por ANMAT, con máscara y humidificador incluidos, sin depósito y con soporte técnico. Consultá por WhatsApp.',
        heroImg: '/artifacts/products/resmed_airsense10_1.jpg',
        intro: '¿Necesitás un CPAP por un tiempo o querés probarlo antes de comprarlo? En INSER SALUD alquilamos CPAP y AutoCPAP en Córdoba con entrega e instalación a domicilio en 24 horas. Equipos aprobados por ANMAT, con máscara, humidificador y soporte técnico incluidos.',
        ctaSanti: 'Hola Santi, quiero alquilar un CPAP en Córdoba. ¿Cómo es el alquiler y cuánto cuesta por mes?',
        sections: [
            {
                title: '¿Cómo funciona el alquiler de CPAP?',
                content: 'Coordinamos la entrega del equipo en tu domicilio en Córdoba, normalmente dentro de las 24 horas. Te instalamos el CPAP, ajustamos la presión según tu indicación médica y te explicamos el uso y la limpieza.\n\nEl alquiler es por mes, sin depósito y con soporte técnico incluido durante todo el período. Si el equipo presenta alguna falla, lo reemplazamos.',
            },
            {
                title: '¿Para quién es el alquiler?',
                content: 'El alquiler de CPAP es ideal para quienes fueron diagnosticados recién y quieren empezar el tratamiento sin la inversión inicial, para quienes desean probar el equipo antes de comprarlo, para uso temporal (post-internación o post-operatorio) y para quienes viajan a Córdoba por un período.',
            },
            {
                title: '¿Qué incluye?',
                content: 'El alquiler incluye el equipo CPAP o AutoCPAP, la máscara (nasal o nasobucal según tu caso), el humidificador, la tubuladura, la instalación a domicilio y el seguimiento. Aparatología aprobada por ANMAT. Si más adelante querés comprar tu propio equipo, te asesoramos para pasar de alquiler a compra.',
            },
        ],
        products: [
            { name: 'CPAP BMC G2S con humidificador', price: 'también en venta $499.000' },
            { name: 'CPAP ResMed AirSense 10', price: 'también en venta $799.000' },
            { name: 'AutoCPAP (presión automática)', price: 'consultar alquiler' },
        ],
        faq: [
            { q: '¿Cuánto cuesta alquilar un CPAP en Córdoba?', a: 'El valor mensual depende del equipo y del plazo. Escribinos por WhatsApp y te pasamos el precio actualizado; incluye entrega, instalación y soporte técnico.' },
            { q: '¿El alquiler incluye la máscara?', a: 'Sí. El alquiler incluye la máscara, el humidificador y la tubuladura, además del equipo.' },
            { q: '¿Entregan a domicilio?', a: 'Sí, hacemos entrega e instalación a domicilio en Córdoba Capital y alrededores, normalmente en 24 horas.' },
            { q: '¿Puedo comprar el equipo después de alquilarlo?', a: 'Sí. Vendemos equipos nuevos aprobados por ANMAT y te asesoramos para pasar del alquiler a la compra cuando quieras.' },
        ],
        related: [
            { label: 'Comprar CPAP en Córdoba', href: '/comprar-cpap-cordoba' },
            { label: 'Apnea del sueño', href: '/patologia/apnea-del-sueno' },
            { label: 'Estudio del sueño a domicilio', href: '/estudio-del-sueno-cordoba' },
        ],
    },
    {
        slug: 'alquiler-concentrador-oxigeno-cordoba',
        h1: 'Alquiler de concentrador de oxígeno en Córdoba',
        metaTitle: 'Alquiler de Concentrador de Oxígeno en Córdoba | A Domicilio | INSER SALUD',
        metaTitleSalud: 'Alquiler de Concentrador de Oxígeno a Domicilio en Córdoba | INSER SALUD',
        description: 'Alquilá un concentrador de oxígeno (fijo o portátil) en Córdoba con entrega e instalación a domicilio. Para oxigenoterapia en EPOC, fibrosis pulmonar y post-internación. Aprobado por ANMAT, con soporte técnico. Consultá por WhatsApp.',
        heroImg: '/artifacts/products/concentrador_bmc_1.jpg',
        intro: 'Si necesitás oxígeno en casa, en INSER SALUD alquilamos concentradores de oxígeno (fijos y portátiles) en Córdoba con entrega e instalación a domicilio. Ideal para oxigenoterapia continua en EPOC, fibrosis pulmonar, post-internación y otras indicaciones médicas.',
        ctaSanti: 'Hola Santi, necesito alquilar un concentrador de oxígeno en Córdoba. ¿Tienen fijo y portátil? ¿Cómo es la entrega?',
        sections: [
            {
                title: 'Concentrador fijo o portátil: ¿cuál necesito?',
                content: 'El concentrador estacionario (fijo) es para uso continuo en el hogar, las 24 horas, y entrega mayor flujo de oxígeno. El concentrador portátil tiene batería y es para quienes necesitan moverse, salir o viajar manteniendo el oxígeno.\n\nTe ayudamos a elegir según el flujo que indicó tu médico (litros por minuto) y tu estilo de vida.',
            },
            {
                title: 'Entrega e instalación a domicilio',
                content: 'Llevamos el concentrador a tu casa en Córdoba, lo instalamos y te capacitamos a vos y a tu familia en el uso seguro: encendido, regulación de flujo, limpieza y mantenimiento. El alquiler incluye soporte técnico durante todo el período.',
            },
            {
                title: '¿Para quién es la oxigenoterapia?',
                content: 'La oxigenoterapia domiciliaria está indicada cuando la saturación de oxígeno en sangre es baja, situación frecuente en EPOC, fibrosis pulmonar, secuelas post-COVID y cuadros respiratorios crónicos. Siempre se usa según indicación médica.',
            },
        ],
        products: [
            { name: 'Concentrador de oxígeno BMC estacionario (control remoto + medidor de O₂)', price: 'también en venta $999.000' },
            { name: 'Concentrador portátil KINGON P2-S3 (apto vuelos)', price: 'consultar' },
            { name: 'Concentrador portátil GCE Zen-O (2 baterías + carro)', price: 'consultar' },
        ],
        faq: [
            { q: '¿Cuánto cuesta alquilar un concentrador de oxígeno en Córdoba?', a: 'Depende de si es fijo o portátil y del plazo. Escribinos por WhatsApp y te damos el valor mensual actualizado, con entrega e instalación incluidas.' },
            { q: '¿Entregan e instalan a domicilio?', a: 'Sí, hacemos entrega, instalación y capacitación de uso a domicilio en Córdoba Capital y alrededores.' },
            { q: '¿Necesito receta médica?', a: 'La oxigenoterapia se usa según indicación médica (flujo en litros por minuto). Te asesoramos para que el equipo cumpla con lo que indicó tu médico.' },
            { q: '¿Tienen concentradores portátiles para viajar?', a: 'Sí, tenemos concentradores portátiles con batería, algunos homologados para vuelos. Consultanos por el modelo.' },
        ],
        related: [
            { label: 'EPOC', href: '/patologia/epoc' },
            { label: 'Fibrosis pulmonar', href: '/patologia/fibrosis-pulmonar' },
            { label: 'Comprar CPAP en Córdoba', href: '/comprar-cpap-cordoba' },
        ],
    },
    {
        slug: 'comprar-cpap-cordoba',
        h1: 'Comprar CPAP en Córdoba: precios y modelos',
        metaTitle: 'Comprar CPAP en Córdoba | Precios CPAP, AutoCPAP y BiPAP | INSER SALUD',
        metaTitleSalud: 'Comprar CPAP en Córdoba | Precios y Asesoramiento | INSER SALUD',
        description: 'Comprá tu CPAP, AutoCPAP o BiPAP en Córdoba. Equipos aprobados por ANMAT, con garantía y asesoramiento. CPAP desde $499.000. Mirá precios y elegí el equipo correcto con ayuda de nuestro equipo. Consultá por WhatsApp.',
        heroImg: '/artifacts/products/resmed_airsense10_3.jpg',
        intro: 'En INSER SALUD vendemos CPAP, AutoCPAP y BiPAP en Córdoba, aprobados por ANMAT, con garantía oficial y asesoramiento personalizado. Mirá los precios de referencia y elegí el equipo correcto según tu indicación médica.',
        ctaSanti: 'Hola Santi, quiero comprar un CPAP en Córdoba. ¿Qué modelos tienen y a qué precio? ¿Cuál me conviene?',
        sections: [
            {
                title: 'Precios de CPAP en Córdoba (referencia)',
                content: 'CPAP BMC G2S con humidificador: $499.000 (el más vendido, presión fija).\nCPAP ResMed AirSense 10: $799.000 (equipo completo, el estándar de oro en apnea del sueño).\nBiPAP BMC G3 con frecuencia respiratoria: $1.300.000 (para EPOC y enfermedades neuromusculares).\n\nLos precios se actualizan; confirmá el valor del día por WhatsApp. También ofrecemos alquiler.',
            },
            {
                title: 'CPAP, AutoCPAP o BiPAP: ¿cuál te conviene?',
                content: 'El CPAP entrega una presión fija y continua: es el tratamiento estándar de la apnea del sueño. El AutoCPAP ajusta la presión automáticamente noche a noche, ofreciendo más comodidad. El BiPAP entrega dos presiones (una al inhalar y otra al exhalar) y se usa en EPOC, enfermedades neuromusculares e hipoventilación.\n\nTe ayudamos a elegir según lo que indicó tu médico y tu presión de tratamiento.',
            },
            {
                title: 'Garantía y respaldo',
                content: 'Todos nuestros equipos son aparatología aprobada por ANMAT, con 2 años de garantía oficial. Incluimos asesoramiento para la adaptación, repuestos (máscaras, filtros, tubuladuras) y soporte técnico continuo en Córdoba.',
            },
        ],
        products: [
            { name: 'CPAP BMC G2S con humidificador', price: '$499.000' },
            { name: 'CPAP ResMed AirSense 10 (equipo completo)', price: '$799.000' },
            { name: 'BiPAP BMC G3 con frecuencia respiratoria', price: '$1.300.000' },
        ],
        faq: [
            { q: '¿Cuánto cuesta un CPAP en Córdoba?', a: 'Desde $499.000 (CPAP BMC G2S con humidificador). El CPAP ResMed AirSense 10 está en oferta a $799.000. Confirmá el precio del día por WhatsApp.' },
            { q: '¿Qué CPAP me conviene comprar?', a: 'Depende de tu indicación médica y tu presión de tratamiento. El CPAP fijo es la opción estándar y económica; el AutoCPAP da más confort. Te asesoramos sin cargo.' },
            { q: '¿Los equipos tienen garantía?', a: 'Sí, 2 años de garantía oficial y aparatología aprobada por ANMAT.' },
            { q: '¿Puedo alquilar en lugar de comprar?', a: 'Sí, ofrecemos alquiler de CPAP en Córdoba con entrega a domicilio, ideal para probar antes de comprar.' },
        ],
        related: [
            { label: 'Alquiler de CPAP en Córdoba', href: '/alquiler-cpap-cordoba' },
            { label: 'Apnea del sueño', href: '/patologia/apnea-del-sueno' },
            { label: 'Estudio del sueño a domicilio', href: '/estudio-del-sueno-cordoba' },
        ],
    },
    {
        slug: 'estudio-del-sueno-cordoba',
        h1: 'Estudio del sueño a domicilio en Córdoba (poligrafía respiratoria)',
        metaTitle: 'Estudio del Sueño a Domicilio en Córdoba | Poligrafía Respiratoria | INSER SALUD',
        metaTitleSalud: 'Estudio del Sueño a Domicilio en Córdoba | INSER SALUD',
        description: '¿Roncás o te dijeron que dejás de respirar al dormir? Te asesoramos sobre el estudio del sueño domiciliario (poligrafía respiratoria) y el tratamiento de la apnea con CPAP en Córdoba. Aprobado por ANMAT. Consultá por WhatsApp.',
        heroImg: '/artifacts/products/resmed_airsense10_1.jpg',
        intro: '¿Roncás fuerte, te despertás cansado o te dijeron que dejás de respirar mientras dormís? La poligrafía respiratoria domiciliaria permite estudiar la apnea del sueño desde tu casa, sin internación. En INSER SALUD te asesoramos sobre el estudio del sueño y el tratamiento.',
        ctaSanti: 'Hola Santi, quiero hacerme un estudio del sueño a domicilio en Córdoba. ¿Cómo es y qué necesito?',
        sections: [
            {
                title: '¿Qué es la poligrafía respiratoria?',
                content: 'Es un estudio del sueño que se realiza en tu propia casa con un equipo (polígrafo) que registra durante la noche tu respiración, el flujo de aire, los ronquidos, el oxígeno en sangre y las pausas respiratorias.\n\nEs cómodo, no invasivo y permite detectar la apnea obstructiva del sueño sin tener que dormir en un laboratorio.',
            },
            {
                title: 'Señales de que podrías tener apnea del sueño',
                content: 'Ronquidos fuertes y frecuentes, pausas en la respiración mientras dormís (que suele notar la pareja), somnolencia durante el día, despertares con sensación de ahogo, dolor de cabeza al levantarte y cansancio a pesar de dormir muchas horas.\n\nLa apnea no tratada aumenta el riesgo cardiovascular, por eso conviene estudiarla a tiempo.',
            },
            {
                title: 'Del diagnóstico al tratamiento',
                content: 'Si el estudio confirma apnea del sueño, el tratamiento estándar es el CPAP o AutoCPAP, que mantiene las vías respiratorias abiertas durante la noche. En INSER SALUD te acompañamos en todo el camino: desde el estudio hasta la elección, compra o alquiler del equipo y su adaptación.',
            },
        ],
        products: [
            { name: 'Polígrafo BMC YH-600B PRO (estudio del sueño domiciliario)', price: 'consultar' },
            { name: 'CPAP BMC G2S (tratamiento de la apnea)', price: '$499.000' },
            { name: 'CPAP ResMed AirSense 10', price: '$799.000' },
        ],
        faq: [
            { q: '¿Se puede hacer el estudio del sueño en casa?', a: 'Sí. La poligrafía respiratoria domiciliaria se hace en tu propia casa con un equipo que registra la respiración durante la noche. Te asesoramos sobre cómo realizarlo en Córdoba.' },
            { q: '¿Qué pasa si el estudio da apnea del sueño?', a: 'El tratamiento estándar es el CPAP o AutoCPAP. Te ayudamos a elegir el equipo según tu indicación médica y te acompañamos en la adaptación.' },
            { q: '¿Cómo sé si tengo apnea del sueño?', a: 'Los signos más comunes son ronquidos fuertes, pausas al respirar mientras dormís, somnolencia diurna y cansancio. El estudio del sueño lo confirma.' },
            { q: '¿Atienden en Córdoba?', a: 'Sí, somos de Córdoba y trabajamos a domicilio en Córdoba Capital y alrededores. Consultanos por WhatsApp.' },
        ],
        related: [
            { label: 'Apnea del sueño', href: '/patologia/apnea-del-sueno' },
            { label: 'Comprar CPAP en Córdoba', href: '/comprar-cpap-cordoba' },
            { label: 'Alquiler de CPAP en Córdoba', href: '/alquiler-cpap-cordoba' },
        ],
    },
];

export const getLocalPageBySlug = (slug) => localPages.find((p) => p.slug === slug);

export default localPages;
