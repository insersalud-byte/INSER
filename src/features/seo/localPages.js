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
                content: 'CPAP BMC G2S con humidificador: $499.000 (el más vendido, presión fija).\nAutoCPAP BMC G2S con humidificador: $600.000 (presión automática, más confort).\nCPAP ResMed AirSense 10: $799.000 (equipo completo, el estándar de oro en apnea del sueño).\nBiPAP BMC G3 con frecuencia respiratoria: $1.300.000 (para EPOC y enfermedades neuromusculares).\n\nLos precios se actualizan; confirmá el valor del día por WhatsApp. También ofrecemos alquiler.',
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
            { name: 'AutoCPAP BMC G2S con humidificador', price: '$600.000' },
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
    {
        slug: 'bipap-cordoba',
        h1: 'BiPAP en Córdoba: venta y alquiler',
        metaTitle: 'BiPAP en Córdoba | Venta y Alquiler | EPOC y ELA | INSER SALUD',
        metaTitleSalud: 'BiPAP a Domicilio en Córdoba | Venta y Alquiler | INSER SALUD',
        description: 'BiPAP en Córdoba para EPOC, enfermedades neuromusculares e hipoventilación. Venta y alquiler de equipos aprobados por ANMAT, con entrega a domicilio y soporte técnico. Consultá por WhatsApp.',
        heroImg: '/artifacts/products/2cffdc89-7433-4bcb-80cd-7f2862733ec0.jpg',
        intro: 'En INSER SALUD ofrecemos BiPAP en Córdoba, en venta y alquiler, para EPOC, enfermedades neuromusculares (ELA, AME), hipoventilación y apnea compleja. Equipos aprobados por ANMAT, con entrega a domicilio, adaptación y soporte técnico.',
        ctaSanti: 'Hola Santi, necesito un BiPAP en Córdoba. ¿Tienen en venta y alquiler? ¿Cuál me conviene?',
        sections: [
            { title: '¿Qué es un BiPAP y cuándo se usa?', content: 'El BiPAP (o BPAP) entrega dos niveles de presión: uno mayor al inhalar (IPAP) y otro menor al exhalar (EPAP), lo que facilita la respiración. Puede incluir frecuencia respiratoria de respaldo (modo S/T).\n\nSe indica en EPOC, enfermedades neuromusculares (ELA, AME), síndrome de hipoventilación y en apnea del sueño compleja que no responde al CPAP.' },
            { title: 'BiPAP o CPAP: ¿cuál necesito?', content: 'El CPAP entrega una sola presión continua y es el tratamiento estándar de la apnea del sueño. El BiPAP entrega dos presiones y se usa cuando hace falta asistir tanto la inhalación como la exhalación, o cuando se necesitan presiones altas que con CPAP serían incómodas.\n\nLa indicación la define tu médico; nosotros te ayudamos a elegir el equipo correcto.' },
            { title: 'Venta y alquiler con soporte', content: 'Vendemos y alquilamos BiPAP en Córdoba con entrega e instalación a domicilio, configuración según tu prescripción, máscara adecuada y soporte técnico continuo. Aparatología aprobada por ANMAT con garantía.' },
        ],
        products: [
            { name: 'BiPAP BMC G3 con frecuencia respiratoria y humidificador', price: '$1.300.000' },
            { name: 'BiPAP Yuwell con FR y humidificador', price: 'consultar' },
            { name: 'Ventilador STELLAR 150 ResMed (alta gama)', price: 'consultar' },
        ],
        faq: [
            { q: '¿Cuánto cuesta un BiPAP en Córdoba?', a: 'El BiPAP BMC G3 está en $1.300.000. También hay opciones de alta gama y alquiler. Confirmá el precio del día por WhatsApp.' },
            { q: '¿Cuál es la diferencia entre BiPAP y CPAP?', a: 'El CPAP da una presión fija continua; el BiPAP da dos presiones (inhalación y exhalación) y se usa en EPOC, enfermedades neuromusculares e hipoventilación.' },
            { q: '¿Alquilan BiPAP?', a: 'Sí, ofrecemos venta y alquiler de BiPAP en Córdoba con entrega a domicilio y soporte técnico.' },
            { q: '¿Sirve para EPOC y ELA?', a: 'Sí. El BiPAP es uno de los tratamientos de referencia en EPOC, ELA y otras enfermedades neuromusculares, siempre según indicación médica.' },
        ],
        related: [
            { label: 'EPOC', href: '/patologia/epoc' },
            { label: 'ELA (Esclerosis Lateral Amiotrófica)', href: '/patologia/esclerosis-lateral-amiotrofica' },
            { label: 'Comprar CPAP en Córdoba', href: '/comprar-cpap-cordoba' },
        ],
    },
    {
        slug: 'oxigeno-a-domicilio-cordoba',
        h1: 'Oxígeno a domicilio en Córdoba',
        metaTitle: 'Oxígeno a Domicilio en Córdoba | Oxigenoterapia y Concentradores | INSER SALUD',
        metaTitleSalud: 'Oxígeno a Domicilio en Córdoba | Oxigenoterapia | INSER SALUD',
        description: 'Oxígeno a domicilio en Córdoba: oxigenoterapia con concentradores fijos y portátiles, entrega e instalación en tu casa. Para EPOC, fibrosis pulmonar y post-internación. Aprobado por ANMAT. Consultá por WhatsApp.',
        heroImg: '/artifacts/products/concentrador_bmc_1.jpg',
        intro: 'En INSER SALUD llevamos el oxígeno a tu casa en Córdoba. Ofrecemos oxigenoterapia domiciliaria con concentradores de oxígeno fijos y portátiles, en venta y alquiler, con entrega, instalación y capacitación de uso.',
        ctaSanti: 'Hola Santi, necesito oxígeno a domicilio en Córdoba. ¿Qué opciones tienen y cómo es la entrega?',
        sections: [
            { title: '¿Qué es la oxigenoterapia domiciliaria?', content: 'Es el aporte de oxígeno suplementario en el hogar cuando la saturación de oxígeno en sangre es baja. Se indica en EPOC, fibrosis pulmonar, secuelas post-COVID y otros cuadros respiratorios crónicos, siempre según prescripción médica (flujo en litros por minuto).' },
            { title: 'Concentrador, tubo o mochila de oxígeno', content: 'El concentrador estacionario filtra el aire y entrega oxígeno de forma continua en el hogar, sin recargas. El concentrador portátil tiene batería para salir. También contamos con tubos y mochilas de oxígeno para traslados. Te ayudamos a elegir según tu necesidad.' },
            { title: 'Entrega e instalación a domicilio en 24 hs', content: 'Llevamos el equipo a tu casa en Córdoba, lo instalamos y te capacitamos en el uso seguro. Incluye soporte técnico. Disponible en venta y alquiler. Aparatología aprobada por ANMAT.' },
        ],
        products: [
            { name: 'Concentrador de oxígeno BMC estacionario (control remoto + medidor de O₂)', price: '$999.000' },
            { name: 'Concentrador portátil KINGON P2-S3', price: 'consultar' },
            { name: 'Mochila / tubo de oxígeno portátil', price: 'consultar' },
        ],
        faq: [
            { q: '¿Hacen entrega de oxígeno a domicilio en Córdoba?', a: 'Sí, entregamos e instalamos concentradores de oxígeno a domicilio en Córdoba Capital y alrededores, normalmente en 24 horas.' },
            { q: '¿Necesito receta médica para el oxígeno?', a: 'La oxigenoterapia se usa según indicación médica (flujo en litros por minuto). Te asesoramos para que el equipo cumpla con lo prescripto.' },
            { q: '¿Conviene concentrador fijo o portátil?', a: 'El fijo es para uso continuo en casa; el portátil tiene batería para salir o viajar. Muchos pacientes combinan ambos.' },
            { q: '¿Venden o alquilan?', a: 'Las dos cosas. Tenés el concentrador BMC estacionario desde $999.000 y opciones de alquiler.' },
        ],
        related: [
            { label: 'Alquiler de concentrador de oxígeno', href: '/alquiler-concentrador-oxigeno-cordoba' },
            { label: 'Concentrador de oxígeno portátil', href: '/concentrador-oxigeno-portatil-cordoba' },
            { label: 'EPOC', href: '/patologia/epoc' },
        ],
    },
    {
        slug: 'concentrador-oxigeno-portatil-cordoba',
        h1: 'Concentrador de oxígeno portátil en Córdoba',
        metaTitle: 'Concentrador de Oxígeno Portátil en Córdoba | Venta y Alquiler | INSER SALUD',
        metaTitleSalud: 'Concentrador de Oxígeno Portátil a Domicilio en Córdoba | INSER SALUD',
        description: 'Concentradores de oxígeno portátiles en Córdoba: livianos, con batería y algunos aptos para vuelos. Venta y alquiler, aprobados por ANMAT, con entrega a domicilio. Consultá por WhatsApp.',
        heroImg: '/artifacts/products/f18cede5-9404-4eee-a751-01f532e715d7.jpg',
        intro: 'En INSER SALUD tenés concentradores de oxígeno portátiles en Córdoba: livianos, con batería y autonomía para salir, trabajar o viajar. Venta y alquiler, con asesoramiento para elegir el modelo según tu flujo y tu rutina.',
        ctaSanti: 'Hola Santi, busco un concentrador de oxígeno portátil en Córdoba. ¿Qué modelos tienen y cuál es apto para vuelos?',
        sections: [
            { title: '¿Para quién es un concentrador portátil?', content: 'Para quienes necesitan oxígeno pero no quieren quedar atados a un equipo fijo: personas activas, que salen, trabajan o viajan. Funciona con batería y se recarga en casa o en el auto.' },
            { title: 'Modelos disponibles', content: 'KINGON P2-S3: uno de los más livianos y económicos, ideal para uso diario. GCE Zen-O: premium, con dos baterías y carro, homologado para vuelos. Philips SimplyGo: continuo + pulso, apto para viajes.\n\nTe ayudamos a elegir según el flujo que indicó tu médico.' },
            { title: 'Venta y alquiler', content: 'Ofrecemos los portátiles en venta y alquiler, con entrega a domicilio en Córdoba, capacitación de uso y soporte técnico. Aparatología aprobada por ANMAT.' },
        ],
        products: [
            { name: 'Concentrador portátil KINGON P2-S3 (el más liviano)', price: 'consultar' },
            { name: 'Concentrador portátil GCE Zen-O (2 baterías + carro, apto vuelos)', price: 'consultar' },
            { name: 'Concentrador portátil Philips SimplyGo', price: 'consultar' },
        ],
        faq: [
            { q: '¿Cuánto cuesta un concentrador de oxígeno portátil en Córdoba?', a: 'Depende del modelo y la autonomía. Escribinos por WhatsApp y te pasamos precios de venta y alquiler actualizados.' },
            { q: '¿Hay concentradores portátiles aptos para vuelos?', a: 'Sí, modelos como el GCE Zen-O y el Philips SimplyGo están homologados para volar. Consultanos antes de viajar.' },
            { q: '¿Cuánta autonomía tienen?', a: 'Varía según el modelo y la configuración de flujo; los modelos con doble batería ofrecen varias horas. Te asesoramos según tu uso.' },
            { q: '¿Se pueden alquilar?', a: 'Sí, ofrecemos venta y alquiler de concentradores portátiles con entrega a domicilio en Córdoba.' },
        ],
        related: [
            { label: 'Oxígeno a domicilio en Córdoba', href: '/oxigeno-a-domicilio-cordoba' },
            { label: 'Alquiler de concentrador de oxígeno', href: '/alquiler-concentrador-oxigeno-cordoba' },
            { label: 'EPOC', href: '/patologia/epoc' },
        ],
    },
];

export const getLocalPageBySlug = (slug) => localPages.find((p) => p.slug === slug);

export default localPages;
