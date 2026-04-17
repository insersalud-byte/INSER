/**
 * pathologyData.js
 * Contenido verificado contra insersalud.com en cada página.
 * Última revisión: 2026-04 — se visitaron todas las secciones del sitio original.
 *
 * Fuentes consultadas:
 *  /apnea-del-sueno  /epoc  /fibrosis-pulmonar  /esclerosis-lateral-amiotrofica
 *  /atrofia-muscular-espinal  /paralisis-cerebral  /neuromusculares
 *  /servicios  /tienda  /rehabilitacion-pulmonar  /oxigenoterapia
 */

export const pathologies = [

    /* ─────────────────────────────────────────────────────────────────
       1. APNEA DEL SUEÑO
       Fuentes: /apnea-del-sueno  /servicios  /tienda
    ───────────────────────────────────────────────────────────────── */
    {
        slug: 'apnea-del-sueno',
        title: 'Apnea del Sueño',
        metaTitle: 'APNEA DEL SUEÑO | INSER SALUD',
        headline: '¿Te despertás cansado? Podría ser Apnea del Sueño.',
        subtitle: 'Si roncás fuerte, te despertás varias veces en la noche o te sentís agotado durante el día, podés estar sufriendo apnea del sueño sin saberlo.',
        color: '#1e40af',
        colorLight: '#dbeafe',
        heroImg: '/artifacts/cpap_real.png',

        intro: 'La buena noticia es que la apnea del sueño se puede detectar fácilmente con un estudio simple y sin internación. En Inser Salud te acompañamos desde el diagnóstico hasta la adaptación completa al equipo.',

        description: 'La apnea del sueño es una enfermedad en la que la respiración se detiene repetidamente durante el sueño, privando al cerebro y al cuerpo de oxígeno. Provoca ronquidos fuertes, despertares nocturnos y somnolencia diurna excesiva. Sin tratamiento, aumenta el riesgo de hipertensión arterial, problemas cardíacos y accidentes de tránsito.',

        sections: [
            {
                id: 'diagnostico',
                title: 'Diagnóstico: Poligrafía Respiratoria',
                content: '¿Cómo sabés si tenés apnea del sueño? Con una poligrafía respiratoria domiciliaria: un estudio no invasivo, cómodo y seguro que se realiza en tu propia casa, mientras dormís en tu cama como cualquier noche.\n\n✅ No es invasivo\n✅ Es cómodo y seguro\n✅ Se hace en tu cama, como cualquier noche\n\nDetectar la apnea a tiempo puede cambiar tu calidad de vida.',
                link: 'https://wa.me/5493512065320?text=Hola, quiero consultar sobre la poligrafía respiratoria para diagnóstico de apnea del sueño',
                linkText: 'Consultá sobre el estudio →',
            },
            {
                id: 'tratamiento',
                title: 'Tratamiento: CPAP y BiPAP',
                content: 'El tratamiento de elección es la presión positiva continua (CPAP) o la ventilación de dos niveles (BiPAP). El equipo envía aire a presión constante para mantener las vías respiratorias abiertas durante el sueño.\n\nSabemos que usar un CPAP o BiPAP al principio puede generar incomodidad, miedo o rechazo. Pero también sabemos que vale la pena insistir con paciencia. En Inser Salud te acompañamos con respeto y cercanía para que te sientas seguro. Vamos de a poco, sin apuros, hasta que el equipo deje de ser una molestia y se convierta en un verdadero alivio para respirar mejor y descansar.',
                link: 'https://insersalud.com/cpap-yuwell-yh-360-con-humidificador',
                linkText: 'Ver CPAP con humidificador →',
            },
            {
                id: 'alquiler',
                title: 'Alquiler de CPAP para Adaptación',
                content: 'Iniciar el tratamiento con CPAP puede generar dudas, incomodidad o ansiedad. Por eso, en Inser Salud te ofrecemos la opción de alquiler por adaptación, para que puedas probar el equipo en tu casa, con tranquilidad y acompañamiento profesional.\n\n✅ Te entregamos el equipo listo para usar\n✅ Te explicamos cómo colocarlo y usarlo correctamente\n✅ Hacemos seguimiento los primeros días para ayudarte a adaptarte\n✅ Sin compromiso de compra: lo usás el tiempo que necesitás\n\nEl CPAP puede cambiar tu vida: mejorar tu descanso, tu energía, tu salud.',
                link: 'https://wa.me/5493512065320?text=Hola, quiero consultar sobre el alquiler de CPAP para adaptación',
                linkText: 'Consultá alquiler por WhatsApp →',
            },
            {
                id: 'mascaras',
                title: 'Máscaras para CPAP y BiPAP',
                content: 'La elección de la máscara adecuada es fundamental para la comodidad y el éxito del tratamiento. Contamos con máscaras nasales, nasobucales y de mínimo contacto en todos los talles. Si la que tenés no te resulta cómoda, podemos ayudarte a encontrar la indicada.',
                link: 'https://insersalud.com/tienda',
                linkText: 'Ver todas las máscaras disponibles →',
            },
        ],

        products: [
            {
                name: 'CPAP BMC G2S',
                priceARS: '$499.000',
                priceUSD: null,
                img: '/artifacts/cpap_bmc_g2s.jpg',
                link: 'https://insersalud.com/cpap-bmc-g2s',
                badge: null,
                desc: 'CPAP fijo con humidificador. El más vendido.',
            },
            {
                name: 'BiPAP BMC G3 (con FR y humidificador)',
                priceARS: '$1.300.000',
                priceUSD: 'U$S 907',
                img: '/artifacts/bipap_bmc_g3.jpg',
                link: 'https://insersalud.com/bipap-bmc-g3-con-frecuencia-respiratoria-y-humidificador',
                badge: null,
                desc: 'BiPAP con frecuencia respiratoria de respaldo.',
            },
            {
                name: 'AUTOCPAP PHILIPS DREAMSTATION',
                priceARS: null,
                priceUSD: 'U$S 758',
                img: '/artifacts/cpap_bmc_g2s.jpg',
                link: 'https://insersalud.com/tienda',
                badge: null,
                desc: 'Con humidificador y conectividad.',
            },
            {
                name: 'CPAP RESMED AIRSENSE 10',
                priceARS: null,
                priceUSD: 'U$S 616',
                img: '/artifacts/cpap_bmc_g2s.jpg',
                link: 'https://insersalud.com/tienda',
                badge: null,
                desc: 'Con humidificador y conectividad.',
            },
            {
                name: 'Máscara Nasal DreamWear (mínimo contacto)',
                priceARS: '$223.000',
                priceUSD: 'U$S 153',
                img: '/artifacts/mascara_nasal_dreamwear.jpg',
                link: 'https://insersalud.com/mascarilla-nasal-cpap',
                badge: null,
                desc: 'Comodidad y mínimo contacto facial.',
            },
            {
                name: 'Máscara Nasobucal DreamWear Philips',
                priceARS: '$229.000',
                priceUSD: 'U$S 157',
                img: '/artifacts/mascara_nasobucal_dreamwear.jpg',
                link: 'https://insersalud.com/mascarilla-nasobucal-dreamwear-philips-cpap',
                badge: null,
                desc: 'Full-face de mínimo contacto.',
            },
            {
                name: 'Máscara Nasal RESCOMF CPAP/BIPAP',
                priceARS: '$50.000',
                priceUSD: 'U$S 35',
                img: '/artifacts/mascara_rescomf.jpg',
                link: 'https://insersalud.com/tienda',
                badge: 'OFERTA',
                desc: 'La opción más económica del mercado.',
            },
        ],

        tips: [
            'Usá el CPAP todas las noches, incluso en siestas cortas: la consistencia hace la diferencia.',
            'Limpiá la máscara con agua tibia y jabón suave todos los días para evitar infecciones.',
            'Si sentís molestias con la máscara actual, hay opciones más cómodas: consultanos sin compromiso.',
            'La humidificación integrada reduce la sequedad nasal y de garganta.',
            'Los primeros días son los más difíciles. Si persistís, la mayoría de los pacientes duerme mejor en 2 semanas.',
            'Evitá dormir boca arriba: la posición de costado reduce los episodios de apnea.',
        ],

        alertText: '¿Te despertás cansado? El diagnóstico con poligrafía es sencillo, no invasivo y se hace en tu casa.',
        alertCta: 'Consultá hoy →',

        testimonials: [
            { name: 'María G.', text: 'Los equipos de Inser Salud han mejorado mi calidad de vida y mi sueño es mucho mejor.', stars: 5 },
            { name: 'Juan P.', text: 'Excelente atención y asesoramiento. Los dispositivos son de alta calidad y me han ayudado mucho.', stars: 5 },
        ],

        relatedLinks: [
            { text: 'Equipos de Terapia Respiratoria (Alquiler)', url: 'https://insersalud.com/equipos-de-terapia-respiratoria-1' },
            { text: 'CPAP Yuwell YH-360 con Humidificador', url: 'https://insersalud.com/cpap-yuwell-yh-360-con-humidificador' },
            { text: 'Ver todas las máscaras', url: 'https://insersalud.com/tienda' },
        ],

        santiMessage: 'Hola Santi, creo que tengo apnea del sueño. ¿Qué equipos CPAP o BiPAP tenés disponibles y cuáles son los precios? ¿También hacen alquiler para adaptación?',
        moreInfoUrl: 'https://www.insersalud.com/apnea-del-sueno',
    },

    /* ─────────────────────────────────────────────────────────────────
       2. EPOC
       Fuentes: /epoc  /tienda  /rehabilitacion-pulmonar  /servicios
    ───────────────────────────────────────────────────────────────── */
    {
        slug: 'epoc',
        title: 'EPOC',
        metaTitle: 'EPOC | INSER SALUD',
        headline: 'Información y consejos sobre el EPOC para pacientes en Córdoba',
        subtitle: 'Brindamos datos y consejos sobre la EPOC para ayudar a los pacientes a manejar su condición con los mejores equipos del mercado.',
        color: '#0284c7',
        colorLight: '#e0f2fe',
        heroImg: '/artifacts/kingon_p2_s3.jpg',

        intro: 'La EPOC es una enfermedad pulmonar crónica que dificulta la respiración. Con el tratamiento adecuado y el equipamiento correcto se puede llevar una vida activa y con buena calidad.',

        description: 'La Enfermedad Pulmonar Obstructiva Crónica (EPOC) es una condición que dificulta el paso de aire hacia y desde los pulmones. Provoca tos persistente con producción de moco, sibilancias y falta de aire. Aunque no tiene cura, el tratamiento correcto — incluyendo oxigenoterapia, inhaladores y rehabilitación — puede mejorar significativamente la calidad de vida.',

        sections: [
            {
                id: 'inhalador',
                title: 'Forma correcta de usar tu inhalador',
                content: 'El inhalador debe usarse siempre con aerocámara para garantizar que el medicamento llegue correctamente a los pulmones. Sin aerocámara, gran parte del medicamento queda en la boca y garganta y no llega a los bronquios donde se necesita.\n\nSi tenés dudas sobre la técnica inhalatoria, consultá con nuestro equipo: una técnica correcta puede marcar la diferencia en el control de los síntomas.',
                link: 'https://wa.me/5493512065320?text=Hola, necesito asesoramiento sobre técnica inhalatoria con aerocámara para EPOC',
                linkText: 'Consultá sobre técnica inhalatoria →',
            },
            {
                id: 'concentradores',
                title: 'Concentradores de Oxígeno',
                content: 'Para pacientes con indicación de oxigenoterapia domiciliaria ofrecemos:\n\n• Concentradores de oxígeno estacionarios para uso en el hogar: flujo constante sin costo de recarga.\n• Concentradores portátiles para mantener tu autonomía: salís de casa, viajás y hacés tus actividades con oxígeno.\n\nTe acompañamos en la elección según tu prescripción médica y estilo de vida.',
                link: 'https://insersalud.com/concentrador-de-oxigeno-portatil-kingon-p2-s3-el-mas-liviano-y-economico',
                linkText: 'Ver concentradores disponibles →',
            },
            {
                id: 'mochilas',
                title: 'Mochilas y Oxígeno Portátil',
                content: 'Las mochilas de oxígeno portátil te permiten salir de tu casa manteniendo la autonomía. Contamos con tubos portátiles de 0,415 L con regulador, bolso especializado y carga, listos para usar.\n\nIdeal para pacientes que necesitan oxígeno fuera del hogar durante actividades cotidianas o visitas médicas.',
                link: 'https://insersalud.com/mochila-de-oxigeno-tubo-de0415-regulador-bolso-carga',
                linkText: 'Ver mochila de oxígeno →',
            },
            {
                id: 'rehabilitacion',
                title: 'Rehabilitación Pulmonar',
                content: 'La rehabilitación pulmonar es un programa supervisado de ejercicios y educación diseñado para mejorar la tolerancia al ejercicio, reducir la disnea y mejorar la calidad de vida en pacientes con EPOC.\n\nEn Inser Salud te orientamos sobre cómo acceder a programas de rehabilitación y qué equipos pueden ayudarte en el proceso.',
                link: 'https://insersalud.com/rehabilitacion-pulmonar',
                linkText: 'Saber más sobre rehabilitación →',
            },
        ],

        products: [
            {
                name: 'Concentrador Portátil KINGON P2-S3',
                priceARS: '$2.735.400',
                priceUSD: 'U$S 1.880',
                img: '/artifacts/kingon_p2_s3.jpg',
                link: 'https://insersalud.com/concentrador-de-oxigeno-portatil-kingon-p2-s3-el-mas-liviano-y-economico',
                badge: 'EL MÁS LIVIANO',
                desc: 'El concentrador portátil más liviano y económico del mercado.',
            },
            {
                name: 'Concentrador Portátil KINGON P2-TOC',
                priceARS: null,
                priceUSD: 'U$S 3.458',
                img: '/artifacts/kingon_p2_s3.jpg',
                link: 'https://insersalud.com/tienda',
                badge: '9,5 HS',
                desc: '9,5 horas de autonomía con batería.',
            },
            {
                name: 'GCE Zen-O (2 baterías + carro)',
                priceARS: '$5.451.885',
                priceUSD: 'U$S 3.747',
                img: '/artifacts/gce_zeno.jpg',
                link: 'https://insersalud.com/concentrador-portatil-gce-zen-o-con-carrito-y-2-baterias',
                badge: 'PREMIUM',
                desc: 'Con 2 baterías y carrito incluidos.',
            },
            {
                name: 'Concentrador de Oxígeno YUWELL Estacionario',
                priceARS: null,
                priceUSD: 'U$S 713',
                img: '/artifacts/gce_zeno.jpg',
                link: 'https://insersalud.com/tienda',
                badge: null,
                desc: 'Para uso domiciliario continuo.',
            },
            {
                name: 'Mochila de Oxígeno Portátil',
                priceARS: null,
                priceUSD: 'U$S 270',
                img: '/artifacts/kingon_p2_s3.jpg',
                link: 'https://insersalud.com/mochila-de-oxigeno-tubo-de0415-regulador-bolso-carga',
                badge: null,
                desc: 'Tubo 0,415 L + regulador + bolso + carga.',
            },
        ],

        tips: [
            'Usá siempre el inhalador con aerocámara: mejora la llegada del medicamento a los bronquios.',
            'Vacunate contra la gripe anualmente y contra el neumococo: las infecciones son la principal causa de internación.',
            'Practicá la respiración con labios fruncidos para aliviar la disnea en momentos de ahogo.',
            'Evitá ambientes con humo, polvo, aerosoles o productos químicos fuertes.',
            'Caminá todos los días dentro de tus posibilidades: el movimiento mejora la función pulmonar.',
            'Si usás oxígeno, no lo enciendas nunca cerca de una llama o cigarrillo.',
        ],

        alertText: 'La EPOC no tiene cura, pero con el tratamiento correcto podés recuperar tu calidad de vida.',
        alertCta: 'Consultá con Santi →',

        testimonials: [
            { name: 'Juan P.', text: 'Excelente atención y asesoramiento. Los dispositivos son de alta calidad y me han ayudado mucho.', stars: 5 },
            { name: 'María G.', text: 'Los equipos de Inser Salud han mejorado mi calidad de vida notablemente.', stars: 5 },
        ],

        relatedLinks: [
            { text: 'Oxigenoterapia domiciliaria', url: 'https://insersalud.com/oxigenoterapia' },
            { text: 'Concentradores portátiles', url: 'https://insersalud.com/concentradores-portatiles' },
            { text: 'Mochila de oxígeno portátil', url: 'https://insersalud.com/mochila-de-oxigeno-tubo-de0415-regulador-bolso-carga' },
            { text: 'Rehabilitación pulmonar', url: 'https://insersalud.com/rehabilitacion-pulmonar' },
        ],

        santiMessage: 'Hola Santi, soy paciente con EPOC y necesito información sobre concentradores de oxígeno. ¿Cuáles son los modelos disponibles, portátiles y estacionarios, y sus precios?',
        moreInfoUrl: 'https://www.insersalud.com/epoc',
    },

    /* ─────────────────────────────────────────────────────────────────
       3. FIBROSIS PULMONAR
       Fuentes: /fibrosis-pulmonar  /tienda  /oxigenoterapia  /oxigeno-liquido
    ───────────────────────────────────────────────────────────────── */
    {
        slug: 'fibrosis-pulmonar',
        title: 'Fibrosis Pulmonar',
        metaTitle: 'FIBROSIS PULMONAR | INSER SALUD',
        headline: 'Oxigenoterapia continua para una vida activa con Fibrosis Pulmonar',
        subtitle: 'Concentradores estacionarios, concentradores portátiles, mochilas de oxígeno y oxígeno líquido. Entrega en Córdoba con asesoramiento profesional.',
        color: '#6366f1',
        colorLight: '#ede9fe',
        heroImg: '/artifacts/gce_zeno.jpg',

        intro: 'La fibrosis pulmonar requiere oxigenoterapia continua para mejorar la calidad de vida, reducir la fatiga y preservar la autonomía del paciente. En Inser Salud contamos con todas las opciones de oxígeno domiciliario.',

        description: 'La Fibrosis Pulmonar es una enfermedad en la que el tejido pulmonar se cicatriza y endurece progresivamente, reduciendo la capacidad de intercambio de oxígeno. La oxigenoterapia domiciliaria es el pilar fundamental del tratamiento: mejora la oxigenación, reduce la disnea y permite al paciente mantener mayor actividad física.',

        sections: [
            {
                id: 'concentradores-oxigeno',
                title: 'Concentradores de Oxígeno (Estacionarios)',
                content: 'Para uso domiciliario continuo, los concentradores estacionarios ofrecen flujo constante sin necesidad de recarga de tubos. Son ideales para el hogar: se enchufan a la red eléctrica y producen oxígeno a partir del aire ambiente.\n\nAlquiler disponible con entrega inmediata en Córdoba.',
                link: 'https://insersalud.com/oxigenoterapia',
                linkText: 'Ver oxigenoterapia domiciliaria →',
            },
            {
                id: 'concentradores-portatiles',
                title: 'Concentradores Portátiles',
                content: 'Los concentradores portátiles te permiten mantener la actividad diaria fuera del hogar. Contamos con los modelos más livianos y de mayor autonomía:\n\n• KINGON P2-S3: el más liviano y económico del mercado\n• KINGON P2-TOC: 9,5 horas de autonomía\n• GCE Zen-O: premium con carrito y 2 baterías\n\nIdeal para salir, viajar y mantener independencia.',
                link: 'https://insersalud.com/concentradores-portatiles',
                linkText: 'Ver concentradores portátiles →',
            },
            {
                id: 'mochilas',
                title: 'Mochilas de Oxígeno',
                content: 'Las mochilas de oxígeno portátil son ideales para pacientes activos que necesitan flujos más altos o requieren una solución compacta para salidas cortas. Incluyen tubo, regulador, bolso y carga.',
                link: 'https://insersalud.com/mochila-de-oxigeno-tubo-de0415-regulador-bolso-carga',
                linkText: 'Ver mochila de oxígeno →',
            },
            {
                id: 'oxigeno-liquido',
                title: 'Oxígeno Líquido',
                content: 'El oxígeno líquido ofrece mayor autonomía y menor peso que los tubos de oxígeno convencionales. Es la solución ideal para pacientes muy activos o que necesitan flujos elevados durante actividades físicas. Consultanos disponibilidad en Córdoba.',
                link: 'https://insersalud.com/oxigeno-liquido',
                linkText: 'Consultar oxígeno líquido →',
            },
            {
                id: 'rehabilitacion',
                title: 'Rehabilitación Pulmonar',
                content: 'La rehabilitación pulmonar supervisada mejora la tolerancia al ejercicio, reduce la disnea y mejora la calidad de vida en pacientes con Fibrosis Pulmonar. Te orientamos sobre cómo acceder a este tratamiento complementario.',
                link: 'https://insersalud.com/rehabilitacion-pulmonar',
                linkText: 'Saber más sobre rehabilitación →',
            },
        ],

        products: [
            {
                name: 'GCE Zen-O (2 baterías + carro)',
                priceARS: '$5.451.885',
                priceUSD: 'U$S 3.747',
                img: '/artifacts/gce_zeno.jpg',
                link: 'https://insersalud.com/concentrador-portatil-gce-zen-o-con-carrito-y-2-baterias',
                badge: 'PREMIUM',
                desc: 'Con carrito y 2 baterías. Máxima autonomía.',
            },
            {
                name: 'KINGON P2-S3 (Portátil)',
                priceARS: '$2.735.400',
                priceUSD: 'U$S 1.880',
                img: '/artifacts/kingon_p2_s3.jpg',
                link: 'https://insersalud.com/concentrador-de-oxigeno-portatil-kingon-p2-s3-el-mas-liviano-y-economico',
                badge: 'MÁS LIVIANO',
                desc: 'El más liviano y económico del mercado.',
            },
            {
                name: 'KINGON P2-TOC (Portátil)',
                priceARS: null,
                priceUSD: 'U$S 3.458',
                img: '/artifacts/kingon_p2_s3.jpg',
                link: 'https://insersalud.com/tienda',
                badge: '9,5 HS',
                desc: '9,5 horas de autonomía con batería extendida.',
            },
            {
                name: 'Concentrador YUWELL Estacionario',
                priceARS: null,
                priceUSD: 'U$S 713',
                img: '/artifacts/gce_zeno.jpg',
                link: 'https://insersalud.com/tienda',
                badge: null,
                desc: 'Para uso domiciliario continuo.',
            },
            {
                name: 'Mochila de Oxígeno Portátil',
                priceARS: null,
                priceUSD: 'U$S 270',
                img: '/artifacts/kingon_p2_s3.jpg',
                link: 'https://insersalud.com/mochila-de-oxigeno-tubo-de0415-regulador-bolso-carga',
                badge: null,
                desc: 'Tubo 0,415 L + regulador + bolso + carga.',
            },
        ],

        tips: [
            'Usá el oxígeno las horas indicadas por tu médico, especialmente durante la noche y el ejercicio.',
            'Mantené limpios los filtros del concentrador para garantizar el mejor rendimiento.',
            'Consultá con tu médico antes de viajar en avión: los vuelos pueden requerir oxígeno adicional.',
            'La rehabilitación pulmonar supervisada mejora la tolerancia al ejercicio y reduce la disnea.',
            'Llevá siempre un oxímetro de pulso para monitorear tu saturación durante el día.',
            'Nunca fumés ni permitas que fumen cerca del concentrador: el oxígeno es altamente inflamable.',
        ],

        alertText: 'La oxigenoterapia mejora la sobrevida y la calidad de vida en Fibrosis Pulmonar. Entrega inmediata en Córdoba.',
        alertCta: 'Consultá disponibilidad →',

        testimonials: [
            { name: 'María G.', text: 'Los equipos de Inser Salud han mejorado mi calidad de vida y mi sueño es mucho mejor.', stars: 5 },
        ],

        relatedLinks: [
            { text: 'Oxigenoterapia domiciliaria', url: 'https://insersalud.com/oxigenoterapia' },
            { text: 'Concentradores portátiles', url: 'https://insersalud.com/concentradores-portatiles' },
            { text: 'Mochila de oxígeno portátil', url: 'https://insersalud.com/mochila-de-oxigeno-tubo-de0415-regulador-bolso-carga' },
            { text: 'Oxígeno líquido', url: 'https://insersalud.com/oxigeno-liquido' },
            { text: 'Rehabilitación pulmonar', url: 'https://insersalud.com/rehabilitacion-pulmonar' },
        ],

        santiMessage: 'Hola Santi, tengo Fibrosis Pulmonar y necesito oxigenoterapia domiciliaria. ¿Qué concentradores tienen disponibles, tanto estacionarios como portátiles? ¿También tienen oxígeno líquido?',
        moreInfoUrl: 'https://www.insersalud.com/fibrosis-pulmonar',
    },

    /* ─────────────────────────────────────────────────────────────────
       4. ESCLEROSIS LATERAL AMIOTRÓFICA (ELA)
       Fuentes: /esclerosis-lateral-amiotrofica  /neuromusculares  /tienda
    ───────────────────────────────────────────────────────────────── */
    {
        slug: 'esclerosis-lateral-amiotrofica',
        title: 'Esclerosis Lateral Amiotrófica',
        metaTitle: 'Información sobre la enfermedad ELA | INSER SALUD',
        headline: '¿Tenés Tos Suficiente?',
        subtitle: 'En la ELA, mantener una tos efectiva y una ventilación adecuada puede ser la diferencia. Equipamos y acompañamos a pacientes y familias.',
        color: '#7c3aed',
        colorLight: '#ede9fe',
        heroImg: '/artifacts/bipap_bmc_g3.jpg',

        intro: 'Más del 80% de las muertes en personas con enfermedades neuromusculares como la ELA se deben a causas respiratorias evitables. El seguimiento respiratorio debe comenzar incluso antes de que aparezcan síntomas evidentes.',

        description: 'La Esclerosis Lateral Amiotrófica (ELA) es una enfermedad neurodegenerativa que afecta progresivamente las neuronas motoras, debilitando los músculos, incluyendo los respiratorios. Una tos eficaz y una ventilación adecuada son fundamentales para mantener la calidad de vida y prevenir complicaciones graves.',

        sections: [
            {
                id: 'evaluacion',
                title: 'Evaluación Funcional Respiratoria',
                content: 'Los siguientes estudios permiten detectar a tiempo la debilidad muscular respiratoria, incluso antes de los síntomas:\n\n🫁 Capacidad Vital Forzada (CVF): por debajo del 50% predicho, se requiere asistencia respiratoria.\n\n🌬️ Presiones inspiratorias y espiratorias (PIMAX/PEMAX): evalúan la fuerza de los músculos respiratorios.\n\n💨 Pico de flujo de tos (PCF): PCF < 160 L/min indica necesidad de asistencia (Cough Assist).\n\n🌙 Capnografía y oximetría nocturna: detectan hipoventilación durante el sueño.\n\nEn Inser Salud realizamos evaluaciones respiratorias gratuitas para detectar a tiempo cuándo es necesario comenzar con asistencia ventilatoria.',
                link: 'https://wa.me/5493512065320?text=Hola, quisiera información sobre evaluación respiratoria gratuita para ELA',
                linkText: '📲 Consultá la evaluación gratuita →',
            },
            {
                id: 'cough-assist',
                title: '¿Tenés Tos Suficiente? — Cough Assist',
                content: 'Cuando los músculos respiratorios se debilitan, la tos pierde efectividad y las secreciones se acumulan en los pulmones, aumentando el riesgo de neumonía.\n\nEl Asistente de Tos (Cough Assist) genera una tos mecánica efectiva que limpia las vías aéreas. Se indica cuando el PCF cae por debajo de 160 L/min.\n\n• Previene neumonías por retención de secreciones\n• Reduce hospitalizaciones\n• Puede usarse en domicilio con la familia\n\nPrecio: U$S 9.084',
                link: 'https://insersalud.com/tienda',
                linkText: 'Consultar Cough Assist →',
            },
            {
                id: 'vni',
                title: 'Ventilación No Invasiva (VNI / BiPAP)',
                content: 'La VNI debe iniciarse antes de que el paciente tenga insuficiencia respiratoria aguda. Se indica cuando:\n\n✅ Capacidad Vital < 50% del valor teórico\n✅ Desaturaciones nocturnas (SpO₂ < 90% más del 5% del sueño)\n✅ Somnolencia, cefalea matutina, fatiga\n✅ Hipercapnia (CO₂ > 45 mmHg)\n\nCuanto antes se inicia la VNI, mejor se preserva la calidad de vida y se retrasa el deterioro. El BiPAP con frecuencia respiratoria de respaldo es el equipo de elección para ELA.',
                link: 'https://insersalud.com/bipap-bmc-g3-con-frecuencia-respiratoria-y-humidificador',
                linkText: 'Ver BiPAP BMC G3 con FR →',
            },
            {
                id: 'neuromusculares',
                title: 'Abordaje Integral en Enfermedades Neuromusculares',
                content: 'El abordaje integral salva vidas. El seguimiento periódico, los estudios funcionales en domicilio, la educación de la familia y el acceso temprano a equipos como el Cough Assist o los BiPAP hacen la diferencia.\n\nEn enfermedades neuromusculares, saber cuándo comenzar a ventilar puede ser determinante. La falta de aire muchas veces no se nota… hasta que es tarde.',
                link: 'https://insersalud.com/neuromusculares',
                linkText: 'Leer más sobre enfermedades neuromusculares →',
            },
        ],

        products: [
            {
                name: 'COUGH ASSIST — Asistente de Tos',
                priceARS: null,
                priceUSD: 'U$S 9.084',
                img: '/artifacts/bipap_bmc_g3.jpg',
                link: 'https://insersalud.com/tienda',
                badge: 'ESENCIAL',
                desc: 'Asistente mecánico de tos para enfermedades neuromusculares.',
            },
            {
                name: 'BiPAP BMC G3 (con FR y humidificador)',
                priceARS: '$1.300.000',
                priceUSD: 'U$S 907',
                img: '/artifacts/bipap_bmc_g3.jpg',
                link: 'https://insersalud.com/bipap-bmc-g3-con-frecuencia-respiratoria-y-humidificador',
                badge: null,
                desc: 'Con frecuencia respiratoria de respaldo para ELA.',
            },
            {
                name: 'STELLAR 150 RESMED (con humidificador y batería)',
                priceARS: null,
                priceUSD: 'U$S 7.342',
                img: '/artifacts/bipap_bmc_g3.jpg',
                link: 'https://insersalud.com/tienda',
                badge: 'PREMIUM',
                desc: 'Ventilador de alta gama para casos avanzados.',
            },
            {
                name: 'Máscara Nasobucal DreamWear Philips',
                priceARS: '$229.000',
                priceUSD: 'U$S 157',
                img: '/artifacts/mascara_nasobucal_dreamwear.jpg',
                link: 'https://insersalud.com/mascarilla-nasobucal-dreamwear-philips-cpap',
                badge: null,
                desc: 'Interfaz nasobucal de mínimo contacto.',
            },
        ],

        tips: [
            'El seguimiento respiratorio debe comenzar antes de que aparezcan síntomas: no esperés a sentir ahogo.',
            'Realizá sesiones de Cough Assist diariamente según indicación médica para mantener limpias las vías aéreas.',
            'Registrá la saturación de oxígeno regularmente con un oxímetro de pulso, especialmente al despertar.',
            'La capnografía nocturna detecta hipoventilación aunque no sientas síntomas durante el día.',
            'Informá a la familia sobre el uso del Cough Assist: pueden ayudar en domicilio de forma segura.',
            'Iniciá la VNI lo antes que indique tu médico: no esperés a la crisis respiratoria.',
        ],

        alertText: 'En Inser Salud realizamos evaluaciones respiratorias gratuitas para pacientes con enfermedades neuromusculares.',
        alertCta: 'Solicitar evaluación →',

        testimonials: [
            { name: 'Juan P.', text: 'Excelente atención y asesoramiento. Los dispositivos son de alta calidad y me han ayudado mucho.', stars: 5 },
        ],

        relatedLinks: [
            { text: 'Información completa sobre enfermedades neuromusculares', url: 'https://insersalud.com/neuromusculares' },
            { text: 'BiPAP BMC G3 con frecuencia respiratoria', url: 'https://insersalud.com/bipap-bmc-g3-con-frecuencia-respiratoria-y-humidificador' },
            { text: 'Ver tienda — Cough Assist y equipos', url: 'https://insersalud.com/tienda' },
        ],

        santiMessage: 'Hola Santi, tengo ELA y necesito información sobre el Asistente de Tos (Cough Assist) y BiPAP para enfermedades neuromusculares. ¿Qué equipos tienen y cuáles son los precios?',
        moreInfoUrl: 'https://www.insersalud.com/esclerosis-lateral-amiotrofica',
    },

    /* ─────────────────────────────────────────────────────────────────
       5. ATROFIA MUSCULAR ESPINAL (AME)
       Fuentes: /atrofia-muscular-espinal  /neuromusculares  /tienda
    ───────────────────────────────────────────────────────────────── */
    {
        slug: 'atrofia-muscular-espinal',
        title: 'Atrofia Muscular Espinal',
        metaTitle: 'ATROFIA MUSCULAR ESPINAL | INSER SALUD',
        headline: 'Soporte ventilatorio especializado para AME en todas sus etapas',
        subtitle: 'BiPAP, asistentes de tos y máscaras pediátricas y de adultos. Seguimiento profesional para cada tipo y etapa de la enfermedad.',
        color: '#be185d',
        colorLight: '#fce7f3',
        heroImg: '/artifacts/mascara_nasobucal_dreamwear.jpg',

        intro: 'La AME es una enfermedad genética que afecta las neuronas motoras, debilitando progresivamente los músculos. Más del 80% de las complicaciones graves en AME son de origen respiratorio y evitables con un buen seguimiento.',

        description: 'La Atrofia Muscular Espinal (AME) es una enfermedad genética caracterizada por la degeneración progresiva de las neuronas motoras de la médula espinal, lo que provoca debilidad muscular progresiva incluyendo los músculos respiratorios. El soporte respiratorio es fundamental desde edades tempranas y debe adaptarse continuamente a cada tipo de AME (1, 2 o 3) y a cada etapa.',

        sections: [
            {
                id: 'evaluacion',
                title: 'Evaluación Respiratoria en AME',
                content: 'Al igual que en otras enfermedades neuromusculares, el seguimiento respiratorio debe iniciarse tempranamente, incluso antes de síntomas:\n\n🫁 CVF < 50%: indica necesidad de asistencia ventilatoria\n💨 PCF < 160 L/min: requiere asistente de tos (Cough Assist)\n🌙 Oximetría nocturna: detecta desaturaciones durante el sueño\n\nEn Inser Salud realizamos evaluaciones respiratorias gratuitas para pacientes con AME.',
                link: 'https://wa.me/5493512065320?text=Hola, quisiera información sobre evaluación respiratoria gratuita para AME',
                linkText: 'Solicitar evaluación gratuita →',
            },
            {
                id: 'vni',
                title: 'Ventilación No Invasiva (BiPAP) para AME',
                content: 'El BiPAP es el principal soporte ventilatorio en AME. Contamos con equipos para:\n\n• AME tipo 1 (pediátrico): máscaras nasales de menor talle, interfaces especializadas\n• AME tipo 2 y 3: BiPAP con diferentes modalidades según la prescripción\n\nTrabajamos junto al equipo médico tratante para adaptar los parámetros de ventilación a cada paciente.',
                link: 'https://insersalud.com/bipap-bmc-g3-con-frecuencia-respiratoria-y-humidificador',
                linkText: 'Ver BiPAP disponibles →',
            },
            {
                id: 'cough-assist',
                title: 'Asistente de Tos (Cough Assist)',
                content: 'Para pacientes con AME que tienen tos débil o ineficaz, el asistente de tos mecánico es fundamental para mantener limpias las vías aéreas y prevenir neumonías por acumulación de secreciones.\n\nSe puede usar en domicilio con la familia, siguiendo un protocolo sencillo que enseñamos al momento de la entrega.',
                link: 'https://insersalud.com/tienda',
                linkText: 'Consultar Cough Assist →',
            },
            {
                id: 'info-completa',
                title: 'Información completa sobre Enfermedades Neuromusculares',
                content: 'La AME forma parte de un grupo de enfermedades neuromusculares que comparten el compromiso progresivo de los músculos respiratorios. En nuestra sección de neuromusculares encontrás información clínica detallada sobre evaluación funcional, criterios para inicio de VNI y abordaje integral.',
                link: 'https://insersalud.com/neuromusculares',
                linkText: 'Ver info completa sobre neuromusculares →',
            },
        ],

        products: [
            {
                name: 'BiPAP BMC G3 (con FR y humidificador)',
                priceARS: '$1.300.000',
                priceUSD: 'U$S 907',
                img: '/artifacts/bipap_bmc_g3.jpg',
                link: 'https://insersalud.com/bipap-bmc-g3-con-frecuencia-respiratoria-y-humidificador',
                badge: null,
                desc: 'Con frecuencia respiratoria de respaldo. Ideal para AME.',
            },
            {
                name: 'COUGH ASSIST — Asistente de Tos',
                priceARS: null,
                priceUSD: 'U$S 9.084',
                img: '/artifacts/bipap_bmc_g3.jpg',
                link: 'https://insersalud.com/tienda',
                badge: 'ESENCIAL',
                desc: 'Asistente mecánico de tos para AME con tos ineficaz.',
            },
            {
                name: 'Máscara Nasal DreamWear (talles S/M/L)',
                priceARS: '$223.000',
                priceUSD: 'U$S 153',
                img: '/artifacts/mascara_nasal_dreamwear.jpg',
                link: 'https://insersalud.com/mascarilla-nasal-cpap',
                badge: null,
                desc: 'Comodidad máxima para uso nocturno continuo.',
            },
            {
                name: 'Máscara Nasal Pediátrica NeoQ Infant',
                priceARS: null,
                priceUSD: 'U$S 144',
                img: '/artifacts/mascara_nasal_dreamwear.jpg',
                link: 'https://insersalud.com/tienda',
                badge: 'PEDIÁTRICO',
                desc: 'Talles XS, S, M, L para niños con AME tipo 1.',
            },
            {
                name: 'Máscara Nasobucal DreamWear Philips',
                priceARS: '$229.000',
                priceUSD: 'U$S 157',
                img: '/artifacts/mascara_nasobucal_dreamwear.jpg',
                link: 'https://insersalud.com/mascarilla-nasobucal-dreamwear-philips-cpap',
                badge: null,
                desc: 'Para pacientes que prefieren cobertura nasobucal.',
            },
        ],

        tips: [
            'Iniciá el soporte ventilatorio según indicación médica: no esperes síntomas graves para comenzar.',
            'Las máscaras nasales pediátricas suelen ser mejor toleradas en niños pequeños con AME tipo 1.',
            'Chequeá el oxímetro regularmente, especialmente durante el sueño.',
            'La posición correcta para dormir mejora la eficacia de la ventilación.',
            'Informá a la familia sobre el uso del Cough Assist y el BiPAP: el entrenamiento es fundamental.',
            'Llevá el equipo documentado al médico en cada control: los datos de la máquina son valiosos.',
        ],

        alertText: 'En Inser Salud realizamos evaluaciones respiratorias gratuitas para pacientes con AME.',
        alertCta: 'Solicitar evaluación →',

        testimonials: [
            { name: 'María G.', text: 'Los equipos de Inser Salud han mejorado mi calidad de vida y el acompañamiento es excepcional.', stars: 5 },
        ],

        relatedLinks: [
            { text: 'Información completa: Enfermedades Neuromusculares', url: 'https://insersalud.com/neuromusculares' },
            { text: 'BiPAP BMC G3 con frecuencia respiratoria', url: 'https://insersalud.com/bipap-bmc-g3-con-frecuencia-respiratoria-y-humidificador' },
            { text: 'Ver tienda — todos los equipos y máscaras', url: 'https://insersalud.com/tienda' },
        ],

        santiMessage: 'Hola Santi, necesito equipos para Atrofia Muscular Espinal (AME). ¿Qué BiPAP, máscaras y Cough Assist tienen disponibles? ¿Trabajan con pediátrico también?',
        moreInfoUrl: 'https://www.insersalud.com/atrofia-muscular-espinal',
    },

    /* ─────────────────────────────────────────────────────────────────
       6. PARÁLISIS CEREBRAL
       Fuentes: /paralisis-cerebral  /tienda  /servicios
    ───────────────────────────────────────────────────────────────── */
    {
        slug: 'paralisis-cerebral',
        title: 'Parálisis Cerebral',
        metaTitle: 'Información para Pacientes sobre Parálisis Cerebral | INSER SALUD',
        headline: 'Máscaras BiPAP y soporte ventilatorio para Parálisis Cerebral',
        subtitle: 'Gran variedad de máscaras para BiPAP en todos los talles. Ventilación no invasiva con acompañamiento personalizado y respeto en cada paso.',
        color: '#d97706',
        colorLight: '#fef3c7',
        heroImg: '/artifacts/mascara_nasal_dreamwear.jpg',

        intro: 'Los pacientes con parálisis cerebral frecuentemente requieren soporte ventilatorio con BiPAP y el uso de máscaras especiales. La elección correcta de la interfaz es tan importante como el equipo en sí.',

        description: 'Los pacientes con Parálisis Cerebral frecuentemente presentan compromiso de la musculatura respiratoria, tos ineficaz, alteraciones del sueño e hipoventilación. El soporte ventilatorio con BiPAP y las máscaras adecuadas mejoran significativamente su calidad de vida, la oxigenación nocturna y reducen el riesgo de complicaciones respiratorias.',

        sections: [
            {
                id: 'mascaras-bipap',
                title: 'Máscaras para BiPAP — Gran variedad disponible',
                content: 'Contamos con la mayor variedad de máscaras para BiPAP de Córdoba:\n\n👃 Máscaras nasales: DreamWear, BMC N4, BMC N5a, RESMED AirFit, YUWELL\n😮 Máscaras nasobucales: DreamWear, BMC F2, AirFit F20/F30, YUWELL YF02\n👶 Máscaras pediátricas: NeoQ Infant, máscaras Jirafa Philips Respironics\n\nSi la máscara actual no te resulta cómoda, tenemos alternativas para encontrar la indicada.',
                link: 'https://insersalud.com/tienda',
                linkText: 'Ver todas las máscaras disponibles →',
            },
            {
                id: 'bipap',
                title: 'Ventilación No Invasiva (BiPAP)',
                content: 'El BiPAP asiste la respiración nocturna y en períodos de mayor dificultad respiratoria. Se calibra según cada paciente para lograr el mejor confort y efectividad terapéutica.\n\nSabemos que adaptarse al BiPAP puede generar incomodidad al principio. En Inser Salud te acompañamos con cuidado humano, paciencia y respeto para que te sientas seguro y logres la mejor adaptación posible.',
                link: 'https://insersalud.com/bipap-bmc-g3-con-frecuencia-respiratoria-y-humidificador',
                linkText: 'Ver BiPAP BMC G3 con FR →',
            },
            {
                id: 'adaptacion',
                title: 'Adaptación y Seguimiento Personalizado',
                content: 'Acompañamos a pacientes y familias en todo el proceso de adaptación al equipo ventilatorio. Hacemos seguimiento los primeros días, ajustamos la máscara si es necesario y respondemos consultas al instante.\n\n✅ Entrega del equipo listo para usar\n✅ Explicación detallada a la familia\n✅ Seguimiento en los primeros días\n✅ Ajuste de parámetros según indicación médica\n\n🤝 No estás solo. Estamos para ayudarte.',
                link: 'https://wa.me/5493512065320?text=Hola, necesito asesoramiento sobre BiPAP y máscaras para parálisis cerebral',
                linkText: 'Hablar con un asesor →',
            },
        ],

        products: [
            {
                name: 'BiPAP BMC G3 (con FR y humidificador)',
                priceARS: '$1.300.000',
                priceUSD: 'U$S 907',
                img: '/artifacts/bipap_bmc_g3.jpg',
                link: 'https://insersalud.com/bipap-bmc-g3-con-frecuencia-respiratoria-y-humidificador',
                badge: null,
                desc: 'Con frecuencia respiratoria de respaldo y humidificador.',
            },
            {
                name: 'Máscara Nasal DreamWear (mínimo contacto)',
                priceARS: '$223.000',
                priceUSD: 'U$S 153',
                img: '/artifacts/mascara_nasal_dreamwear.jpg',
                link: 'https://insersalud.com/mascarilla-nasal-cpap',
                badge: null,
                desc: 'La más cómoda para uso nocturno continuo.',
            },
            {
                name: 'Máscara Nasobucal DreamWear Philips',
                priceARS: '$229.000',
                priceUSD: 'U$S 157',
                img: '/artifacts/mascara_nasobucal_dreamwear.jpg',
                link: 'https://insersalud.com/mascarilla-nasobucal-dreamwear-philips-cpap',
                badge: null,
                desc: 'Full-face de mínimo contacto.',
            },
            {
                name: 'Máscara Nasal RESCOMF CPAP/BIPAP',
                priceARS: '$50.000',
                priceUSD: 'U$S 35',
                img: '/artifacts/mascara_rescomf.jpg',
                link: 'https://insersalud.com/tienda',
                badge: 'OFERTA',
                desc: 'La opción más accesible del mercado.',
            },
            {
                name: 'Máscara Pediátrica NeoQ Infant (XS/S/M/L)',
                priceARS: null,
                priceUSD: 'U$S 144',
                img: '/artifacts/mascara_nasal_dreamwear.jpg',
                link: 'https://insersalud.com/tienda',
                badge: 'PEDIÁTRICO',
                desc: 'Para niños con parálisis cerebral que usan BiPAP.',
            },
            {
                name: 'Máscara Nasal Jirafa Philips (pediátrica)',
                priceARS: null,
                priceUSD: 'U$S 220',
                img: '/artifacts/mascara_nasal_dreamwear.jpg',
                link: 'https://insersalud.com/tienda',
                badge: 'PEDIÁTRICO',
                desc: 'Diseño adaptado para niños. Jirafa Philips Respironics.',
            },
        ],

        tips: [
            'Probá diferentes modelos de máscara para encontrar la más cómoda: tenemos gran variedad.',
            'Comenzá con sesiones cortas de BiPAP durante el día para familiarizarte antes de usarlo toda la noche.',
            'Mantené el equipo limpio y revisá el ajuste de las correas regularmente.',
            'Consultá ante cualquier signo de intolerancia: enrojecimiento, escapes excesivos o molestias en la piel.',
            'Llevá siempre el oxímetro para monitorear la saturación durante la noche.',
            'La posición correcta (decúbito lateral o semi-incorporado) mejora la eficacia de la ventilación.',
        ],

        alertText: 'Tenemos la mayor variedad de máscaras BiPAP de Córdoba, incluyendo opciones pediátricas.',
        alertCta: 'Ver máscaras disponibles →',

        testimonials: [
            { name: 'María G.', text: 'El equipo de Inser Salud nos acompañó en todo el proceso con mucha dedicación y paciencia.', stars: 5 },
        ],

        relatedLinks: [
            { text: 'Ver todas las máscaras y equipos — Tienda', url: 'https://insersalud.com/tienda' },
            { text: 'BiPAP BMC G3 con frecuencia respiratoria', url: 'https://insersalud.com/bipap-bmc-g3-con-frecuencia-respiratoria-y-humidificador' },
            { text: 'Servicios de adaptación y seguimiento', url: 'https://insersalud.com/servicios' },
        ],

        santiMessage: 'Hola Santi, necesito información sobre BiPAP y máscaras para parálisis cerebral. ¿Qué opciones tienen disponibles, incluyendo pediátricas? ¿Cuáles son los precios?',
        moreInfoUrl: 'https://www.insersalud.com/paralisis-cerebral',
    },
];

export const getPathologyBySlug = (slug) => pathologies.find(p => p.slug === slug);
