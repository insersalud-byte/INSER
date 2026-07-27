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
                content: 'El alquiler incluye el equipo CPAP o AutoCPAP, la [máscara (nasal o nasobucal según tu caso)](/mascaras-cpap), el humidificador, la tubuladura, la instalación a domicilio y el seguimiento. Aparatología aprobada por ANMAT. Si más adelante querés comprar tu propio equipo, te asesoramos para pasar de alquiler a compra.',
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
        metaTitle: 'Alquiler de Concentrador de Oxígeno en Córdoba | INSER',
        metaTitleSalud: 'Alquiler de Concentrador de Oxígeno en Córdoba | INSER',
        description: 'Alquilá un concentrador de oxígeno fijo o portátil en Córdoba, para uso continuo 24 horas, con entrega e instalación. Respondemos por WhatsApp todos los días.',
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
            { q: '¿Atienden las 24 horas? ¿Y si necesito oxígeno un fin de semana?', a: 'Respondemos consultas por WhatsApp todos los días, también fines de semana y fuera del horario comercial, así que podés escribirnos cuando lo necesites y coordinamos desde ese momento. Los concentradores que entregamos están preparados para uso continuo las 24 horas del día. La entrega e instalación en Córdoba las coordinamos con vos, normalmente dentro de las 24 hs.' },
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
                content: 'Es un estudio del sueño que se realiza en tu propia casa con un equipo ([polígrafo respiratorio](/comprar-poligrafo-argentina)) que registra durante la noche tu respiración, el flujo de aire, los ronquidos, el oxígeno en sangre y las pausas respiratorias.\n\nEs cómodo, no invasivo y permite detectar la apnea obstructiva del sueño sin tener que dormir en un laboratorio.',
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
            { title: 'Venta y alquiler con soporte', content: 'Vendemos y alquilamos BiPAP en Córdoba con entrega e instalación a domicilio, configuración según tu prescripción, [máscara adecuada](/mascaras-cpap) y soporte técnico continuo. Aparatología aprobada por ANMAT con garantía.' },
            {
                title: 'Evidencia científica: la ventilación no invasiva en EPOC y enfermedades neuromusculares',
                content: 'La ventilación no invasiva (VNI) con dos niveles de presión es uno de los tratamientos con mayor respaldo en medicina respiratoria. En las exacerbaciones de EPOC con retención de dióxido de carbono, la VNI reduce la necesidad de intubación y la mortalidad, y es el estándar de cuidado recomendado por las guías internacionales (GOLD).\n\nEn EPOC estable con hipercapnia crónica, el ensayo de Köhnlein y colaboradores (2014) mostró que la VNI domiciliaria bien configurada mejora la sobrevida, y el ensayo HOT-HMV (Murphy y col., 2017) demostró que sumar VNI al oxígeno domiciliario tras una exacerbación prolonga el tiempo libre de reinternaciones.\n\nEn enfermedades neuromusculares como la ELA, el trabajo de Bourke y colaboradores (2006) demostró que la VNI mejora tanto la sobrevida como la calidad de vida, y las guías la recomiendan de forma temprana cuando aparecen signos de hipoventilación. Para estos pacientes es clave que el equipo cuente con frecuencia respiratoria de respaldo (modo S/T), como el BiPAP BMC G3.\n\nNota: la indicación de VNI, los modos y las presiones los define siempre el médico tratante. Esta reseña es informativa. Última revisión: julio 2026.',
            },
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
        metaTitle: 'Alquiler de Oxígeno a Domicilio en Córdoba | INSER SALUD',
        metaTitleSalud: 'Alquiler de Oxígeno a Domicilio en Córdoba | INSER SALUD',
        description: 'Alquiler y venta de oxígeno a domicilio en Córdoba: concentradores para uso continuo 24 horas, con entrega e instalación. Respondemos por WhatsApp todos los días.',
        heroImg: '/artifacts/products/concentrador_bmc_1.jpg',
        intro: 'En INSER SALUD llevamos el oxígeno a tu casa en Córdoba. Ofrecemos oxigenoterapia domiciliaria con concentradores de oxígeno fijos y portátiles, en venta y alquiler, con entrega, instalación y capacitación de uso.',
        ctaSanti: 'Hola Santi, necesito oxígeno a domicilio en Córdoba. ¿Qué opciones tienen y cómo es la entrega?',
        sections: [
            { title: '¿Qué es la oxigenoterapia domiciliaria?', content: 'Es el aporte de oxígeno suplementario en el hogar cuando la saturación de oxígeno en sangre es baja. Se indica en EPOC, [fibrosis pulmonar](/patologia/fibrosis-pulmonar), secuelas post-COVID y otros cuadros respiratorios crónicos, siempre según prescripción médica (flujo en litros por minuto).' },
            { title: 'Concentrador, tubo o mochila de oxígeno', content: 'El concentrador estacionario filtra el aire y entrega oxígeno de forma continua en el hogar, sin recargas. El concentrador portátil tiene batería para salir. También contamos con tubos y mochilas de oxígeno para traslados. Te ayudamos a elegir según tu necesidad.' },
            { title: 'Entrega e instalación a domicilio en 24 hs', content: 'Llevamos el equipo a tu casa en Córdoba, lo instalamos y te capacitamos en el uso seguro. Incluye soporte técnico. Disponible en venta y alquiler. Aparatología aprobada por ANMAT.' },
        ],
        products: [
            { name: 'Concentrador de oxígeno BMC estacionario (control remoto + medidor de O₂)', price: '$999.000' },
            { name: 'Concentrador portátil KINGON P2-S3', price: 'consultar' },
            { name: 'Mochila / tubo de oxígeno portátil', price: 'consultar' },
        ],
        faq: [
            { q: '¿Atienden las 24 horas? ¿Y si necesito oxígeno un fin de semana?', a: 'Respondemos consultas por WhatsApp todos los días, también fines de semana y fuera del horario comercial, así que podés escribirnos cuando lo necesites y coordinamos desde ese momento. Los concentradores que entregamos están preparados para uso continuo las 24 horas del día. La entrega e instalación en Córdoba las coordinamos con vos, normalmente dentro de las 24 hs.' },
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
    {
        slug: 'comprar-cpap-argentina',
        national: true,
        h1: 'Comprar CPAP en Argentina: envío a todo el país',
        metaTitle: 'Comprar CPAP en Argentina: precios desde $499.000 | INSER',
        metaTitleSalud: 'Comprar CPAP en Argentina: precios desde $499.000 | INSER',
        description: 'CPAP BMC G2S $499.000, AutoCPAP $600.000 y ResMed AirSense 10 $799.000. Precios publicados, ANMAT, garantía y envío a todo el país. Cuotas Banco Galicia.',
        heroImg: '/artifacts/products/resmed_airsense10_3.jpg',
        intro: 'En INSER SALUD vendemos CPAP, AutoCPAP y BiPAP con envío a todo el país. Vivas en Buenos Aires, Rosario, Salta o donde sea, te enviamos tu equipo aprobado por ANMAT, con garantía, configuración y asesoramiento para que lo uses bien desde el primer día.',
        ctaSanti: 'Hola Santi, quiero comprar un CPAP y me lo envíen a mi provincia. ¿Cómo es el envío y qué modelos tienen?',
        sections: [
            {
                title: 'Equipos y precios (envío a todo el país)',
                content: 'CPAP BMC G2S con humidificador: $499.000 (el más vendido).\nAutoCPAP BMC G2S: $600.000 (presión automática, más confort).\nCPAP ResMed AirSense 10: $799.000 (equipo completo, el estándar de oro).\nBiPAP BMC G3: $1.300.000 (para EPOC y enfermedades neuromusculares).\n\nLos precios se actualizan; confirmá el valor del día y el costo de envío por WhatsApp.',
            },
            {
                title: 'Cómo comprar y recibir tu equipo',
                content: 'Nos escribís por WhatsApp, te asesoramos sobre el equipo según tu indicación médica y coordinamos el envío a tu domicilio en cualquier provincia de Argentina. Te llega configurado y con instrucciones; si necesitás ayuda con la puesta en marcha, te guiamos a distancia.',
            },
            {
                title: 'Garantía, ANMAT y respaldo',
                content: 'Todos los equipos son aparatología aprobada por ANMAT, con 2 años de garantía oficial. Conseguís repuestos ([máscaras](/mascaras-cpap), filtros, tubuladuras) y soporte técnico continuo, sin importar en qué provincia estés.',
            },
            {
                title: 'Evidencia científica: por qué el CPAP es el tratamiento de referencia',
                content: 'El CPAP es el tratamiento de primera línea para la apnea obstructiva del sueño moderada y severa según las guías de la Academia Americana de Medicina del Sueño (AASM), desde su descripción original por Sullivan y colaboradores en 1981.\n\nLa evidencia acumulada muestra que la apnea no tratada se asocia a hipertensión arterial (cohorte de Wisconsin, Peppard y col.) y a mayor riesgo de eventos cardiovasculares en los casos severos (Marin y col., 2005), además de somnolencia diurna que multiplica el riesgo de accidentes de tránsito y laborales.\n\nEl tratamiento con CPAP reduce la somnolencia diurna, mejora la calidad de vida y el descanso del acompañante, disminuye modestamente la presión arterial en pacientes hipertensos con apnea, y reduce el riesgo de accidentes. El beneficio depende de la constancia: se recomienda usarlo todas las noches, al menos 4 a 6 horas, para obtener resultados.\n\nNota: el diagnóstico (poligrafía o polisomnografía) y la indicación de presión los define el médico especialista en sueño. Esta reseña es informativa. Última revisión: julio 2026.',
            },
        ],
        products: [
            { name: 'CPAP BMC G2S con humidificador', price: '$499.000' },
            { name: 'AutoCPAP BMC G2S con humidificador', price: '$600.000' },
            { name: 'CPAP ResMed AirSense 10 (equipo completo)', price: '$799.000' },
        ],
        faq: [
            { q: '¿Envían CPAP a todo el país?', a: 'Sí. Vendemos con envío a cualquier provincia de Argentina (Buenos Aires, Rosario, Salta, etc.). Coordinamos el envío por WhatsApp.' },
            { q: '¿Cuánto cuesta un CPAP?', a: 'Desde $499.000 (CPAP BMC G2S). El AutoCPAP BMC está a $600.000 y el ResMed AirSense 10 a $799.000. Confirmá el precio del día por WhatsApp.' },
            { q: '¿Los equipos tienen garantía?', a: 'Sí, 2 años de garantía oficial y aparatología aprobada por ANMAT, en todo el país.' },
            { q: '¿Me ayudan a configurarlo si estoy en otra provincia?', a: 'Sí, te enviamos el equipo configurado y te guiamos a distancia en la puesta en marcha y la adaptación.' },
        ],
        related: [
            { label: 'Comprar concentrador de oxígeno (envío nacional)', href: '/comprar-concentrador-oxigeno-argentina' },
            { label: 'Comprar CPAP en Córdoba', href: '/comprar-cpap-cordoba' },
            { label: 'Apnea del sueño', href: '/patologia/apnea-del-sueno' },
        ],
    },
    {
        slug: 'comprar-concentrador-oxigeno-argentina',
        national: true,
        h1: 'Comprar concentrador de oxígeno en Argentina: envío a todo el país',
        metaTitle: 'Comprar Concentrador de Oxígeno en Argentina | Envío Nacional | INSER SALUD',
        metaTitleSalud: 'Comprar Concentrador de Oxígeno en Argentina | Envío Nacional | INSER SALUD',
        description: 'Comprá un concentrador de oxígeno (fijo o portátil) en Argentina con envío a todo el país. Para oxigenoterapia en EPOC y fibrosis pulmonar. Aprobado por ANMAT, con garantía. Consultá por WhatsApp.',
        heroImg: '/artifacts/products/concentrador_bmc_1.jpg',
        intro: 'En INSER SALUD vendemos concentradores de oxígeno fijos y portátiles con envío a todo el país. Para oxigenoterapia domiciliaria en EPOC, fibrosis pulmonar y otras indicaciones, te enviamos el equipo aprobado por ANMAT a cualquier provincia.',
        ctaSanti: 'Hola Santi, quiero comprar un concentrador de oxígeno con envío a mi provincia. ¿Qué modelos tienen?',
        sections: [
            {
                title: 'Concentrador fijo o portátil',
                content: 'El concentrador estacionario (fijo) es para uso continuo en el hogar y entrega mayor flujo. El portátil tiene batería para salir o viajar. Te ayudamos a elegir según el flujo que indicó tu médico (litros por minuto) y tu rutina.',
            },
            {
                title: 'Envío a todo el país',
                content: 'Coordinamos el envío del concentrador a tu domicilio en cualquier provincia de Argentina. Te llega listo para usar, con instrucciones y soporte técnico a distancia. Consultá costo y plazo de envío por WhatsApp.',
            },
            {
                title: 'Garantía y respaldo',
                content: 'Aparatología aprobada por ANMAT, con garantía oficial. Acceso a repuestos y soporte técnico continuo en todo el país.',
            },
        ],
        products: [
            { name: 'Concentrador de oxígeno BMC estacionario (control remoto + medidor de O₂)', price: '$999.000' },
            { name: 'Concentrador portátil KINGON P2-S3 (apto vuelos)', price: 'consultar' },
            { name: 'Concentrador portátil GCE Zen-O (2 baterías + carro)', price: 'consultar' },
        ],
        faq: [
            { q: '¿Envían concentradores de oxígeno a todo el país?', a: 'Sí. Vendemos con envío a cualquier provincia de Argentina. Coordinamos el envío por WhatsApp.' },
            { q: '¿Conviene fijo o portátil?', a: 'El fijo es para uso continuo en casa; el portátil tiene batería para salir o viajar. Muchos pacientes combinan ambos.' },
            { q: '¿Hay concentradores aptos para vuelos?', a: 'Sí, modelos como el GCE Zen-O están homologados para volar. Consultanos antes de viajar.' },
            { q: '¿Necesito receta médica?', a: 'La oxigenoterapia se usa según indicación médica (flujo en litros por minuto). Te asesoramos para que el equipo cumpla con lo prescripto.' },
        ],
        related: [
            { label: 'Comprar CPAP (envío nacional)', href: '/comprar-cpap-argentina' },
            { label: 'Concentrador de oxígeno portátil en Córdoba', href: '/concentrador-oxigeno-portatil-cordoba' },
            { label: 'EPOC', href: '/patologia/epoc' },
        ],
    },
    {
        slug: 'concentrador-oxigeno-10-litros',
        national: true,
        h1: 'Concentrador de oxígeno de 10 litros (alto flujo)',
        metaTitle: 'Concentrador de Oxígeno 10 Litros Yuwell $2.800.000 | INSER',
        metaTitleSalud: 'Concentrador de Oxígeno 10 Litros Yuwell $2.800.000 | INSER',
        description: 'Concentrador de alto flujo hasta 10 L/min, el doble del estándar, para alta demanda de oxígeno y rehabilitación pulmonar. $2.800.000, ANMAT y envío a todo el país.',
        heroImg: '/artifacts/products/concentrador_yuwell_10l_2.jpg',
        intro: 'El concentrador de oxígeno YUWELL de 10 litros entrega alto flujo (hasta 10 L/min, el doble del concentrador estándar de 5 L). Está pensado para pacientes con alta demanda de oxígeno y para [centros de rehabilitación pulmonar](/equipamiento-rehabilitacion-pulmonar). Se vende con envío a todo el país; $2.800.000, aprobado por ANMAT.',
        ctaSanti: 'Hola Santi, me interesa el concentrador de oxígeno de 10 litros (alto flujo). ¿Me das más información y disponibilidad?',
        sections: [
            {
                title: '¿Por qué un concentrador de 10 litros?',
                content: 'La mayoría de los concentradores domiciliarios entregan hasta 5 L/min. El de 10 litros duplica ese flujo, lo que lo hace apto para quienes necesitan altas concentraciones de oxígeno de forma sostenida y para uso intensivo en instituciones.\n\nEs un equipo estacionario de uso continuo (24 hs), con ruedas para trasladarlo dentro del hogar o el centro.',
            },
            {
                title: 'Ideal para alta demanda y rehabilitación pulmonar',
                content: 'Para pacientes con requerimientos altos de oxígeno (EPOC avanzado, fibrosis pulmonar, secuelas respiratorias graves) y para centros de rehabilitación pulmonar y kinesiología respiratoria que necesitan un equipo confiable de alto flujo para sesiones y uso frecuente.',
            },
            {
                title: 'Evidencia científica: por qué el oxígeno es clave en la rehabilitación pulmonar',
                content: 'La rehabilitación pulmonar es una de las intervenciones con mayor respaldo científico en EPOC y enfermedades respiratorias crónicas: las guías internacionales (GOLD y la declaración conjunta de las sociedades ATS/ERS) la recomiendan porque mejora la disnea, la capacidad de ejercicio y la calidad de vida de los pacientes.\n\nEl oxígeno suplementario potencia ese entrenamiento. Los ensayos clásicos que fundaron la oxigenoterapia moderna (NOTT, 1980, y el estudio del MRC británico, 1981) demostraron que el oxígeno prolongado mejora la sobrevida en pacientes con hipoxemia severa.\n\nDurante el ejercicio, muchos pacientes respiratorios desaturan al esfuerzo. La evidencia muestra que entrenar con oxígeno suplementario reduce la disnea, retrasa la fatiga muscular y permite sesiones más largas y de mayor intensidad: el estudio de Emtner y colaboradores (2003) encontró que el oxígeno durante el entrenamiento permite alcanzar intensidades superiores incluso en pacientes sin hipoxemia de reposo. Y a mayor intensidad de entrenamiento, mayor beneficio fisiológico de la rehabilitación.\n\nEn la práctica, el objetivo es sostener la saturación por encima del 90% durante toda la sesión. Ahí es donde el alto flujo marca la diferencia: un concentrador de 10 L/min puede corregir desaturaciones profundas al esfuerzo que un equipo domiciliario de 5 L no alcanza a compensar, dando margen de seguridad para trabajar con pacientes de alta demanda.\n\nNota: la indicación de oxígeno (flujo, modalidad y objetivos de saturación) la define siempre el equipo médico tratante. Esta reseña es informativa. Última revisión: julio 2026.',
            },
            {
                title: 'Compra con envío a todo el país',
                content: 'Lo enviamos a cualquier provincia de Argentina. Aparatología aprobada por ANMAT, con garantía y soporte técnico. Precio: $2.800.000. Consultá disponibilidad, formas de pago y envío por WhatsApp.',
            },
        ],
        products: [
            { name: 'Concentrador de oxígeno YUWELL 10 litros (alto flujo)', price: '$2.800.000' },
            { name: 'Concentrador de oxígeno BMC estacionario 5 L/min', price: '$999.000' },
            { name: 'Concentrador de oxígeno portátil (para salir/viajar)', price: 'consultar' },
        ],
        faq: [
            { q: '¿Para qué sirve un concentrador de oxígeno de 10 litros?', a: 'Para pacientes con alta demanda de oxígeno y para centros de rehabilitación pulmonar: entrega hasta 10 L/min, el doble del concentrador estándar de 5 L.' },
            { q: '¿Cuánto cuesta el concentrador de 10 litros?', a: 'Está a $2.800.000, aprobado por ANMAT y con garantía. Confirmá el precio del día y el envío por WhatsApp.' },
            { q: '¿Lo envían a todo el país?', a: 'Sí. Se vende con envío a cualquier provincia de Argentina. Coordinamos el envío por WhatsApp.' },
            { q: '¿Sirve para un centro de rehabilitación pulmonar?', a: 'Sí, es un equipo estacionario de alto flujo pensado para uso intensivo y sostenido, ideal para centros de rehabilitación pulmonar y kinesiología respiratoria.' },
        ],
        related: [
            { label: 'Comprar concentrador de oxígeno (envío nacional)', href: '/comprar-concentrador-oxigeno-argentina' },
            { label: 'Oxígeno a domicilio en Córdoba', href: '/oxigeno-a-domicilio-cordoba' },
            { label: 'EPOC', href: '/patologia/epoc' },
        ],
    },
    {
        slug: 'mascaras-cpap',
        national: true,
        h1: 'Máscaras para CPAP y BiPAP: nasales, nasobucales y pediátricas',
        metaTitle: 'Máscaras para CPAP | Nasales, Nasobucales y Pediátricas | Precios | INSER SALUD',
        metaTitleSalud: 'Máscaras para CPAP y BiPAP | Precios y Envío Nacional | INSER SALUD',
        description: 'Máscaras para CPAP y BiPAP con precios visibles y envío a todo el país: nasales desde $50.000, DreamWear $223.000, nasobucales (full face) y línea pediátrica completa. Aprobadas por ANMAT. Consultá por WhatsApp.',
        heroImg: '/artifacts/products/1751037116992-1000306910.jpg',
        intro: 'La máscara es la mitad del éxito del tratamiento con CPAP o BiPAP: una interfaz incómoda es la principal causa de abandono. En INSER SALUD tenés máscaras nasales, nasobucales (full face), almohadillas y línea pediátrica, con precios visibles y envío a todo el país. Te ayudamos a elegir el modelo y el talle correcto para tu equipo.',
        ctaSanti: 'Hola Santi, necesito una máscara para mi CPAP/BiPAP. ¿Me ayudás a elegir entre nasal y nasobucal, y me pasás precios?',
        sections: [
            {
                title: '¿Máscara nasal, nasobucal o almohadillas?',
                content: 'La máscara NASAL cubre solo la nariz: es liviana y cómoda, ideal si respirás por la nariz al dormir.\n\nLa NASOBUCAL (buconasal o full face) cubre nariz y boca: es la indicada si respirás por la boca, tenés congestión frecuente o usás presiones altas.\n\nLas ALMOHADILLAS nasales (pillow) apoyan directo en las fosas nasales, con mínima presencia facial: ideales para quienes se sienten encerrados o usan anteojos para leer.\n\nTodas nuestras máscaras son compatibles con equipos CPAP, AutoCPAP y BiPAP de cualquier marca (conexión estándar de tubuladura).',
            },
            {
                title: 'Precios de máscaras (referencia)',
                content: 'Nasales: RESCOMF multitalle $50.000 (la más económica) · BMC N4 U$S 36 · BMC N5a sin apoya frente U$S 60 · BMC multitalle U$S 89,50 · Philips DreamWear mínimo contacto $223.000 · ResMed AirFit U$S 157 · Almohadillas Yuwell YP-01 U$S 42.\n\nNasobucales (full face): BMC F6 multitalle $198.000 (oferta, tan cómoda como la DreamWear) · Philips DreamWear Full Face $229.000 · BMC F2 codo azul SIN FUGA para respiradores de terapia intensiva $68.000 (oferta) · Yuwell con apoya frente U$S 52 · Yuwell YF02 U$S 55 · BMC F5A U$S 52 · ResMed AirFit F20 U$S 189,50 · AirFit F30 U$S 212.\n\nLos precios se actualizan; confirmá el valor del día por WhatsApp.',
            },
            {
                title: 'Máscaras pediátricas',
                content: 'Contamos con línea pediátrica completa, algo poco frecuente en el país: NeoQ Infant para recién nacidos y lactantes (U$S 144), HSINER Cirri Mini nasal XS/S/M/L (U$S 105), máscara Jirafa de Philips Respironics con diseño amigable (U$S 220) e Infant CPAP Kit neonatal tallas 00 a 5 (U$S 97). Fundamentales en AME, [parálisis cerebral](/patologia/paralisis-cerebral) y cuadros respiratorios pediátricos, siempre con indicación médica.',
            },
            {
                title: 'Cambio y reposición',
                content: 'La almohadilla de silicona conviene renovarla cada 2 a 4 semanas y la máscara completa cada 6 a 12 meses, según uso e higiene: la silicona pierde sellado con el tiempo y aparecen fugas que restan eficacia al tratamiento.\n\nEnviamos repuestos y máscaras a todo el país, y por WhatsApp te confirmamos compatibilidad con tu equipo antes de comprar.',
            },
        ],
        products: [
            { name: 'Máscara nasal RESCOMF multitalle (la más económica)', price: '$50.000' },
            { name: 'Máscara nasal Philips DreamWear — mínimo contacto', price: '$223.000' },
            { name: 'Máscara nasobucal BMC F6 multitalle (oferta)', price: '$198.000' },
            { name: 'Máscara nasobucal Philips DreamWear Full Face', price: '$229.000' },
            { name: 'Máscara buconasal BMC F2 codo azul — SIN FUGA, para respiradores de terapia intensiva', price: '$68.000' },
            { name: 'Máscaras pediátricas (NeoQ, Cirri Mini, Jirafa, Infant Kit)', price: 'desde U$S 97' },
        ],
        faq: [
            { q: '¿Qué máscara elijo si respiro por la boca?', a: 'Una nasobucal (full face) que cubre nariz y boca: DreamWear Full Face ($229.000), BMC F6 ($198.000) o ResMed AirFit F20/F30. Si respirás por la nariz, una nasal alcanza y es más liviana.' },
            { q: '¿Cuánto cuesta una máscara para CPAP?', a: 'Desde $50.000 (nasal RESCOMF multitalle). La DreamWear de Philips está a $223.000 y las nasobucales desde U$S 52. Enviamos a todo el país.' },
            { q: '¿Son compatibles con cualquier equipo CPAP o BiPAP?', a: 'Sí. Todas usan la conexión estándar de tubuladura de 22 mm, compatible con CPAP, AutoCPAP y BiPAP de cualquier marca (BMC, ResMed, Philips, Yuwell, etc.).' },
            { q: '¿Cada cuánto se cambia la máscara?', a: 'La almohadilla de silicona cada 2 a 4 semanas y la máscara completa cada 6 a 12 meses, según uso e higiene. Un sellado gastado genera fugas y resta eficacia al tratamiento.' },
            { q: '¿Tienen máscaras para chicos?', a: 'Sí, línea pediátrica completa: NeoQ Infant (recién nacidos), HSINER Cirri Mini, máscara Jirafa de Philips e Infant CPAP Kit neonatal. Siempre con indicación médica.' },
        ],
        related: [
            { label: 'Comprar CPAP (envío nacional)', href: '/comprar-cpap-argentina' },
            { label: 'Comprar CPAP en Córdoba', href: '/comprar-cpap-cordoba' },
            { label: 'Apnea del sueño', href: '/patologia/apnea-del-sueno' },
        ],
    },
    {
        slug: 'equipamiento-rehabilitacion-pulmonar',
        national: true,
        h1: 'Equipamiento para centros de rehabilitación pulmonar',
        metaTitle: 'Equipamiento para Centros de Rehabilitación Pulmonar | Concentrador 10 Litros | INSER SALUD',
        metaTitleSalud: 'Equipamiento para Centros de Rehabilitación Pulmonar | INSER SALUD',
        description: 'Equipamiento para centros de rehabilitación pulmonar y kinesiología respiratoria: concentrador de oxígeno de 10 litros (alto flujo), BiPAP, ventilador STELLAR 150, máscaras e insumos. Presupuestos formales para instituciones y envío a todo el país. Aprobado por ANMAT.',
        heroImg: '/artifacts/products/concentrador_yuwell_10l_1.jpg',
        intro: 'Equipamos centros de rehabilitación pulmonar, consultorios de kinesiología respiratoria e instituciones de salud en todo el país: concentradores de oxígeno de alto flujo para uso intensivo, ventilación no invasiva, máscaras e insumos de reposición. Presupuesto formal, factura y soporte técnico continuo.',
        ctaSanti: 'Hola Santi, equipo un centro de rehabilitación pulmonar. ¿Me pasás presupuesto del concentrador de 10 litros y el equipamiento disponible?',
        sections: [
            {
                title: 'Qué necesita un centro de rehabilitación pulmonar',
                content: 'El uso institucional es distinto al domiciliario: varias sesiones por día, pacientes con requerimientos de flujo altos y equipos que no pueden fallar.\n\nPor eso el equipo central es el concentrador de ALTO FLUJO (10 L/min, el doble del estándar domiciliario de 5 L), apto para uso continuo e intensivo, complementado con ventilación no invasiva (BiPAP) y máscaras de reposición en varios talles.',
            },
            {
                title: 'El equipo central: concentrador de oxígeno de 10 litros',
                content: 'Concentrador YUWELL de 10 litros (alto flujo) — $2.800.000. Hasta 10 L/min, uso continuo 24 hs, display digital, alarmas de seguridad y ruedas para moverlo entre boxes o consultorios. Aprobado por ANMAT, con garantía.\n\nPara demanda muy alta, se pueden combinar dos equipos o complementar con tubos de oxígeno de respaldo.',
            },
            {
                title: 'Complementos: ventilación, máscaras e insumos',
                content: 'BiPAP BMC G3 con frecuencia respiratoria ($1.300.000) para ventilación no invasiva en sesiones y titulación.\nVentilador ResMed STELLAR 150 (U$S 7.342) para soporte ventilatorio invasivo/no invasivo de mayor complejidad.\nMáscaras nasales y nasobucales en todos los talles (desde $50.000), incluida línea pediátrica, e insumos de reposición: tubuladuras, filtros y cánulas.',
            },
            {
                title: 'Compra institucional',
                content: 'Emitimos presupuesto formal y factura para instituciones, obras sociales y compras corporativas. Envío a todo el país con capacitación de uso (presencial en Córdoba, guiada a distancia en el resto del país), soporte técnico continuo y provisión de repuestos e insumos.',
            },
        ],
        products: [
            { name: 'Concentrador YUWELL 10 litros — alto flujo (uso intensivo)', price: '$2.800.000' },
            { name: 'BiPAP BMC G3 con frecuencia respiratoria', price: '$1.300.000' },
            { name: 'Ventilador ResMed STELLAR 150', price: 'U$S 7.342' },
            { name: 'Máscaras e insumos de reposición', price: 'desde $50.000' },
        ],
        faq: [
            { q: '¿Sirve un concentrador domiciliario de 5 litros para un centro de rehabilitación?', a: 'Para uso intensivo o pacientes de alta demanda conviene el de 10 litros: duplica el flujo (hasta 10 L/min) y está pensado para funcionar de forma continua durante toda la jornada.' },
            { q: '¿Emiten presupuesto formal y factura para instituciones?', a: 'Sí. Preparamos presupuesto formal para la institución u obra social y entregamos factura. También asesoramos en la elección del equipamiento según la demanda del centro.' },
            { q: '¿Hacen envío e instalación en el interior?', a: 'Enviamos a todo el país. En Córdoba la capacitación es presencial; en el resto del país guiamos la puesta en marcha a distancia y damos soporte técnico continuo.' },
            { q: '¿Proveen repuestos e insumos de forma continua?', a: 'Sí: máscaras, tubuladuras, filtros, cánulas y humidificadores de reposición, con envío a todo el país.' },
        ],
        related: [
            { label: 'Concentrador de oxígeno de 10 litros', href: '/concentrador-oxigeno-10-litros' },
            { label: 'Ventilador STELLAR 150', href: '/ventilador-stellar-150' },
            { label: 'BiPAP en Córdoba', href: '/bipap-cordoba' },
        ],
    },
    {
        slug: 'comprar-concentrador-oxigeno-portatil-argentina',
        national: true,
        h1: 'Comprar concentrador de oxígeno portátil: envío a todo el país',
        metaTitle: 'Concentrador de Oxígeno Portátil desde $2.735.400 | INSER',
        metaTitleSalud: 'Concentrador de Oxígeno Portátil desde $2.735.400 | INSER',
        description: 'KINGON P2-S3 $2.735.400, el más liviano del mercado, más la línea de flujo continuo, GCE Zen-O y Philips SimplyGo aptos para vuelos. ANMAT y envío a todo el país.',
        heroImg: '/artifacts/products/f18cede5-9404-4eee-a751-01f532e715d7.jpg',
        intro: 'Un concentrador portátil te devuelve la movilidad: funciona a batería para salir, trabajar o viajar sin depender de tubos. En INSER SALUD vendemos portátiles de pulso y de flujo continuo con envío a todo el país, y te ayudamos a elegir el modelo según el flujo que indicó tu médico.',
        ctaSanti: 'Hola Santi, quiero comprar un concentrador de oxígeno portátil. ¿Qué modelos tienen, precios y cuál me conviene según mi flujo?',
        sections: [
            {
                title: 'Pulso o flujo continuo: la primera decisión',
                content: 'Los portátiles de PULSO entregan oxígeno al detectar la inspiración: son los más livianos y de mayor autonomía, ideales para caminar y salir.\n\nLos de FLUJO CONTINUO entregan oxígeno constante como un equipo fijo: son la opción cuando el médico indica flujo continuo o para usar con equipos de presión (CPAP/BiPAP) durante el sueño.\n\nLa indicación médica (litros por minuto y modalidad) define el modelo correcto; te asesoramos antes de comprar.',
            },
            {
                title: 'Modelos y precios',
                content: 'KINGON P2-S3 — $2.735.400: el más liviano (2,3 kg con batería) y económico, pulso, apto vuelos (FAA).\nKINGON P2-E — U$S 2.379: entrada a los de flujo continuo.\nKINGON P2-E6 — U$S 2.695: flujo continuo con batería.\nKINGON P2-E7 — U$S 3.099: alto flujo continuo, batería extendida.\nKINGON P2-TOC — U$S 3.458: continuo + pulso con 9,5 hs de autonomía.\nGCE Zen-O — $5.451.885: premium europeo, 2 baterías + carro, homologado para vuelos.\nPhilips SimplyGo — U$S 3.887: continuo + pulso, apto vuelos.\n\nPrecios de referencia; confirmá el valor del día por WhatsApp.',
            },
            {
                title: 'Para viajar en avión',
                content: 'Los modelos KINGON P2-S3, GCE Zen-O y Philips SimplyGo cuentan con aprobación FAA para vuelos. Las aerolíneas suelen exigir batería para el 150% de la duración del vuelo y aviso previo: te asesoramos con los requisitos antes de tu viaje.',
            },
            {
                title: 'Compra con respaldo',
                content: 'Aparatología aprobada por ANMAT con garantía oficial. Envío a todo el país, capacitación de uso, servicio técnico y provisión de baterías y accesorios. Si estás en Córdoba, también ofrecemos alquiler para probar antes de comprar.',
            },
        ],
        products: [
            { name: 'KINGON P2-S3 (el más liviano, apto vuelos)', price: '$2.735.400' },
            { name: 'KINGON P2-TOC (9,5 hs, continuo + pulso)', price: 'U$S 3.458' },
            { name: 'GCE Zen-O (2 baterías + carro, apto vuelos)', price: '$5.451.885' },
            { name: 'Philips SimplyGo (continuo + pulso)', price: 'U$S 3.887' },
        ],
        faq: [
            { q: '¿Cuál es el concentrador portátil más liviano y económico?', a: 'El KINGON P2-S3: 2,3 kg con batería, flujo de pulso en 5 niveles y aprobación FAA para vuelos. Está a $2.735.400.' },
            { q: '¿Puedo viajar en avión con un concentrador portátil?', a: 'Sí, con los modelos aprobados FAA (KINGON P2-S3, GCE Zen-O, Philips SimplyGo). Las aerolíneas piden batería suficiente y aviso previo; te asesoramos con el trámite.' },
            { q: '¿Pulso o flujo continuo?', a: 'Depende de tu indicación médica. Pulso: más liviano y autónomo, para actividad. Continuo: cuando el médico lo indica o para usar durmiendo con CPAP/BiPAP. Te ayudamos a elegir.' },
            { q: '¿Envían a todo el país?', a: 'Sí, enviamos a cualquier provincia con capacitación de uso guiada y garantía oficial. En Córdoba también hay alquiler para probar antes de comprar.' },
        ],
        related: [
            { label: 'Concentrador portátil en Córdoba (venta y alquiler)', href: '/concentrador-oxigeno-portatil-cordoba' },
            { label: 'Comprar concentrador de oxígeno (envío nacional)', href: '/comprar-concentrador-oxigeno-argentina' },
            { label: 'EPOC', href: '/patologia/epoc' },
        ],
    },
    {
        slug: 'ventilador-stellar-150',
        national: true,
        h1: 'Ventilador ResMed STELLAR 150: venta en Argentina',
        metaTitle: 'Ventilador ResMed STELLAR 150 | Venta en Argentina | Soporte Vital | INSER SALUD',
        metaTitleSalud: 'Ventilador ResMed STELLAR 150 | Venta en Argentina | INSER SALUD',
        description: 'Venta del ventilador ResMed STELLAR 150 en Argentina: soporte ventilatorio invasivo y no invasivo para ELA, enfermedades neuromusculares y EPOC severo. Con batería interna y humidificador. U$S 7.342. Envío a todo el país. Aprobado por ANMAT.',
        heroImg: '/artifacts/products/b3205a47-2021-4f73-b11a-a48ac33e29ce.jpg',
        intro: 'El ResMed STELLAR 150 es un ventilador de soporte vital para uso domiciliario e institucional: ventilación invasiva y no invasiva, pacientes adultos y pediátricos, con batería interna para traslados y cortes de luz. En INSER SALUD lo vendemos con envío a todo el país y acompañamiento en la puesta en marcha.',
        ctaSanti: 'Hola Santi, me interesa el ventilador ResMed STELLAR 150. ¿Me pasás precio, disponibilidad y qué incluye?',
        sections: [
            {
                title: 'Qué es el STELLAR 150',
                content: 'Es el ventilador de alta gama de ResMed para UCI domiciliaria: soporta ventilación INVASIVA (por traqueostomía) y NO INVASIVA (por máscara), con múltiples modos ventilatorios, alarmas clínicas completas, humidificador y batería interna de respaldo.\n\nEs el paso siguiente cuando un BiPAP ya no alcanza: pensado para dependencia ventilatoria de mayor complejidad.',
            },
            {
                title: 'Para quién está indicado',
                content: 'Pacientes con ELA y otras enfermedades neuromusculares en etapas avanzadas, EPOC severo con dependencia ventilatoria, hipoventilación y cuadros que requieren soporte por traqueostomía.\n\nSIEMPRE con prescripción y configuración indicada por el médico tratante: nosotros proveemos el equipo y acompañamos la puesta en marcha técnica.',
            },
            {
                title: 'Precio y qué incluye',
                content: 'Precio de referencia: U$S 7.342 (consultá la cotización del día por WhatsApp). Incluye humidificador y batería interna. Aprobado por ANMAT, con garantía oficial y acceso a servicio técnico y repuestos.\n\nComplementos habituales: Cough Assist (asistente de tos, U$S 9.084) para el manejo de secreciones en ELA/AME, y máscaras de ventilación no invasiva en todos los talles.',
            },
            {
                title: 'Compra con acompañamiento',
                content: 'Envío a todo el país. Coordinamos la puesta en marcha con la familia y el equipo tratante (presencial en Córdoba, guiada a distancia en el resto del país), y quedamos como soporte técnico permanente. También asesoramos el presupuesto formal para gestionar el reintegro o la cobertura con la obra social.',
            },
        ],
        products: [
            { name: 'Ventilador ResMed STELLAR 150 (humidificador + batería)', price: 'U$S 7.342' },
            { name: 'Cough Assist — asistente de tos (complemento ELA/AME)', price: 'U$S 9.084' },
            { name: 'BiPAP BMC G3 con frecuencia respiratoria (alternativa no invasiva)', price: '$1.300.000' },
            { name: 'Máscaras de ventilación no invasiva', price: 'desde $50.000' },
        ],
        faq: [
            { q: '¿El STELLAR 150 sirve para ventilación invasiva y no invasiva?', a: 'Sí, soporta ambas: por traqueostomía (invasiva) y por máscara (no invasiva), en pacientes adultos y pediátricos, con alarmas clínicas y batería interna.' },
            { q: '¿Cuánto cuesta el STELLAR 150 en Argentina?', a: 'Precio de referencia U$S 7.342, con humidificador y batería interna incluidos. Confirmá la cotización del día por WhatsApp. Aprobado por ANMAT con garantía oficial.' },
            { q: '¿Necesito prescripción médica?', a: 'Sí. Es un equipo de soporte vital: la indicación y la configuración las define el médico tratante. Nosotros proveemos el equipo y el soporte técnico.' },
            { q: '¿Qué diferencia hay con un BiPAP?', a: 'El BiPAP es para ventilación no invasiva de soporte. El STELLAR 150 agrega ventilación invasiva, más modos ventilatorios, alarmas clínicas completas y batería interna: es para dependencia ventilatoria de mayor complejidad.' },
        ],
        related: [
            { label: 'ELA (Esclerosis Lateral Amiotrófica)', href: '/patologia/esclerosis-lateral-amiotrofica' },
            { label: 'BiPAP en Córdoba', href: '/bipap-cordoba' },
            { label: 'Equipamiento para centros de rehabilitación', href: '/equipamiento-rehabilitacion-pulmonar' },
        ],
    },
    {
        slug: 'comprar-poligrafo-argentina',
        national: true,
        h1: 'Comprar polígrafo respiratorio para estudios del sueño',
        metaTitle: 'Comprar Polígrafo Respiratorio | BMC YH-600B PRO | Estudios del Sueño | INSER SALUD',
        metaTitleSalud: 'Comprar Polígrafo Respiratorio para Estudios del Sueño | INSER SALUD',
        description: 'Venta del polígrafo respiratorio BMC YH-600B PRO para neumonólogos, clínicas del sueño y kinesiólogos: poligrafía domiciliaria de la apnea del sueño. U$S 1.570, aprobado por ANMAT, con envío a todo el país y capacitación. Consultá por WhatsApp.',
        heroImg: '/artifacts/products/1752508033704-poligrafobmc.jfif',
        intro: 'El polígrafo respiratorio permite estudiar la apnea del sueño en el domicilio del paciente, sin laboratorio. En INSER SALUD vendemos el BMC YH-600B PRO a profesionales de la salud (neumonólogos, clínicas del sueño, kinesiólogos y centros de diagnóstico) con envío a todo el país, capacitación de uso y soporte técnico.',
        ctaSanti: 'Hola Santi, soy profesional de la salud y me interesa comprar el polígrafo BMC YH-600B PRO. ¿Me pasás precio, qué incluye y disponibilidad?',
        sections: [
            {
                title: 'Para quién es este equipo',
                content: 'Para profesionales e instituciones que quieren ofrecer estudios del sueño domiciliarios: neumonólogos, clínicas del sueño, centros de diagnóstico y consultorios de kinesiología respiratoria.\n\nLa poligrafía respiratoria domiciliaria es hoy la vía más accesible para diagnosticar la apnea obstructiva del sueño: el paciente duerme en su casa con el equipo colocado y el profesional analiza el registro al día siguiente. Sumar el estudio al consultorio acorta el circuito diagnóstico y fideliza al paciente que después necesita su CPAP.',
            },
            {
                title: 'El equipo: BMC YH-600B PRO',
                content: 'Polígrafo respiratorio de 4 canales: flujo aéreo nasal, ronquido, saturación de oxígeno (SpO2) y frecuencia cardíaca (oximetría de pulso). Portátil y sencillo de colocar, con software de descarga y análisis para el informe profesional.\n\nEs un equipo robusto pensado para rotar entre pacientes: se entrega a la noche, se retira a la mañana y queda listo para el siguiente estudio.',
            },
            {
                title: 'Precio y compra',
                content: 'Precio de referencia: U$S 1.570 (consultá la cotización del día por WhatsApp). Aprobado por ANMAT, con garantía oficial.\n\nEnviamos a todo el país, con capacitación de uso y del software incluida (presencial en Córdoba, guiada a distancia en el resto del país), y quedamos como soporte técnico permanente. Emitimos factura y presupuesto formal para instituciones.',
            },
            {
                title: '¿Buscás hacerte un estudio del sueño?',
                content: 'Esta página es para profesionales que compran el equipo. Si sos paciente y querés hacerte una poligrafía en Córdoba, mirá nuestra página de estudio del sueño a domicilio, donde te explicamos cómo es el proceso y cómo seguir si el resultado da apnea.',
            },
        ],
        products: [
            { name: 'Polígrafo BMC YH-600B PRO (4 canales + software)', price: 'U$S 1.570' },
            { name: 'CPAP BMC G2S (tratamiento post-diagnóstico)', price: '$499.000' },
            { name: 'CPAP ResMed AirSense 10 (equipo completo)', price: '$799.000' },
        ],
        faq: [
            { q: '¿Quién puede comprar y usar el polígrafo?', a: 'Está orientado a profesionales e instituciones de salud (neumonólogos, clínicas del sueño, kinesiólogos, centros de diagnóstico). La interpretación del estudio la realiza el médico.' },
            { q: '¿Qué registra el BMC YH-600B PRO?', a: 'Es un polígrafo respiratorio de 4 canales: flujo aéreo nasal, ronquido, saturación de oxígeno y frecuencia cardíaca. Incluye software de descarga y análisis para el informe.' },
            { q: '¿Cuánto cuesta el polígrafo?', a: 'Precio de referencia U$S 1.570, aprobado por ANMAT y con garantía oficial. Confirmá la cotización del día por WhatsApp. Emitimos factura para instituciones.' },
            { q: '¿Incluye capacitación?', a: 'Sí: capacitación de uso del equipo y del software, presencial en Córdoba o guiada a distancia en el resto del país, más soporte técnico permanente.' },
        ],
        related: [
            { label: 'Estudio del sueño a domicilio en Córdoba', href: '/estudio-del-sueno-cordoba' },
            { label: 'Comprar CPAP (envío nacional)', href: '/comprar-cpap-argentina' },
            { label: 'Apnea del sueño', href: '/patologia/apnea-del-sueno' },
        ],
    },
    {
        slug: 'cough-assist-asistente-de-tos',
        national: true,
        h1: 'Cough Assist (asistente de tos mecánico): venta en Argentina',
        metaTitle: 'Cough Assist | Asistente de Tos Mecánico | Venta en Argentina | ELA y AME | INSER SALUD',
        metaTitleSalud: 'Cough Assist | Asistente de Tos Mecánico | Venta en Argentina | INSER SALUD',
        description: 'Venta de Cough Assist (asistente de tos mecánico, insuflación-exuflación) para ELA, AME y enfermedades neuromusculares con tos débil. U$S 9.084, aprobado por ANMAT, envío a todo el país y capacitación familiar. Consultá por WhatsApp.',
        heroImg: '/artifacts/products/a44d34ae-c159-4f83-8c8d-41c2fcfc4e49.jpg',
        intro: 'El Cough Assist es un asistente de tos mecánico: mediante insuflación-exuflación reproduce una tos eficaz en pacientes que perdieron la fuerza para toser, ayudando a eliminar secreciones y prevenir infecciones respiratorias. Es un equipo clave en ELA, AME y otras enfermedades neuromusculares. Lo vendemos con envío a todo el país y capacitación para la familia.',
        ctaSanti: 'Hola Santi, me interesa el Cough Assist (asistente de tos). ¿Me pasás precio, disponibilidad y cómo es la capacitación?',
        sections: [
            {
                title: 'Qué es y cómo funciona',
                content: 'El asistente de tos aplica una presión positiva (insuflación) que llena los pulmones y de inmediato una presión negativa (exuflación) que genera un flujo espiratorio alto, imitando la mecánica de una tos eficaz.\n\nEso permite movilizar y eliminar las secreciones bronquiales en pacientes cuya musculatura respiratoria está debilitada, de forma no invasiva, a través de una máscara o boquilla, o por traqueostomía.',
            },
            {
                title: 'Para quién está indicado',
                content: 'Para pacientes con tos débil o ineficaz por enfermedades neuromusculares: ELA (Esclerosis Lateral Amiotrófica), AME (Atrofia Muscular Espinal), distrofias musculares, lesiones medulares altas y cuadros similares.\n\nLos consensos internacionales de cuidado respiratorio en enfermedades neuromusculares recomiendan la asistencia mecánica de la tos cuando la tos espontánea deja de ser eficaz, como complemento de la ventilación no invasiva. La indicación y los parámetros los define siempre el equipo médico tratante.',
            },
            {
                title: 'Precio y compra',
                content: 'Precio de referencia: U$S 9.084 (consultá la cotización del día por WhatsApp). Aprobado por ANMAT, con garantía oficial.\n\nEnviamos a todo el país y capacitamos a la familia y a los cuidadores en el uso seguro del equipo (presencial en Córdoba, guiada a distancia en el resto del país). Entregamos presupuesto formal y factura para gestionar el reintegro o la cobertura con la obra social.',
            },
            {
                title: 'El circuito completo para el paciente neuromuscular',
                content: 'El Cough Assist suele combinarse con ventilación no invasiva: BiPAP con frecuencia respiratoria de respaldo ($1.300.000) en etapas iniciales, o ventilador ResMed STELLAR 150 (U$S 7.342) cuando la dependencia ventilatoria es mayor, más las máscaras adecuadas en cada etapa, incluida la línea pediátrica para AME. Podemos equipar el cuidado respiratorio completo con un solo proveedor.',
            },
        ],
        products: [
            { name: 'Cough Assist — asistente de tos mecánico', price: 'U$S 9.084' },
            { name: 'BiPAP BMC G3 con frecuencia respiratoria', price: '$1.300.000' },
            { name: 'Ventilador ResMed STELLAR 150', price: 'U$S 7.342' },
            { name: 'Máscaras de ventilación (adultos y pediátricas)', price: 'desde $50.000' },
        ],
        faq: [
            { q: '¿Qué hace exactamente un Cough Assist?', a: 'Reproduce una tos eficaz mediante insuflación-exuflación mecánica: llena los pulmones con presión positiva y de inmediato aplica presión negativa, generando el flujo que arrastra las secreciones. Es no invasivo.' },
            { q: '¿Para qué pacientes está indicado?', a: 'Para tos débil o ineficaz por enfermedades neuromusculares: ELA, AME, distrofias musculares y lesiones medulares, entre otras. La indicación la define el equipo médico tratante.' },
            { q: '¿Cuánto cuesta el Cough Assist en Argentina?', a: 'Precio de referencia U$S 9.084, aprobado por ANMAT con garantía oficial. Confirmá la cotización del día por WhatsApp. Entregamos presupuesto y factura para el reintegro de la obra social.' },
            { q: '¿La familia puede aprender a usarlo?', a: 'Sí, es parte de la entrega: capacitamos a familiares y cuidadores en el uso seguro (presencial en Córdoba, a distancia en el resto del país) y quedamos como soporte permanente.' },
        ],
        related: [
            { label: 'ELA (Esclerosis Lateral Amiotrófica)', href: '/patologia/esclerosis-lateral-amiotrofica' },
            { label: 'Atrofia Muscular Espinal (AME)', href: '/patologia/atrofia-muscular-espinal' },
            { label: 'Ventilador STELLAR 150', href: '/ventilador-stellar-150' },
        ],
    },
];

// FAQ compartida: reintegro por obra social (trabajamos particular, NO facturacion
// directa a la obra social). Se agrega a TODAS las landings (React + prerender la ven).
const FAQ_OBRA_SOCIAL = {
    q: '¿Trabajan con obras sociales o prepagas?',
    a: 'Trabajamos de forma particular y te ayudamos con el reintegro: te entregamos presupuesto formal y factura oficial para que gestiones el reembolso ante tu obra social o prepaga. Muchas coberturas reintegran total o parcialmente los equipos con pedido médico.',
};
// FAQ compartida: financiacion Banco Galicia (flyer jul 2026).
const FAQ_CUOTAS = {
    q: '¿Se puede pagar en cuotas?',
    a: 'Sí. Con Banco Galicia tenés 3 cuotas sin interés los miércoles y viernes en todos los equipos (sujeto a condiciones del banco). También hay planes de 3 cuotas (+15%), 6 cuotas (+24%) y 9 cuotas (+39%). Además aceptamos efectivo, transferencia y tarjeta.',
};
for (const p of localPages) p.faq.push(FAQ_OBRA_SOCIAL, FAQ_CUOTAS);

export const getLocalPageBySlug = (slug) => localPages.find((p) => p.slug === slug);

export default localPages;
