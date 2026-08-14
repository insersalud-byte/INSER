/**
 * pathologyData.js
 * Contenido verificado contra insersalud.com en cada página.
 * Última revisión: 2026-04 — transcripción completa de todo el sitio original.
 *
 * Fuentes consultadas:
 *  /apnea-del-sueno  /epoc  /fibrosis-pulmonar  /esclerosis-lateral-amiotrofica
 *  /atrofia-muscular-espinal  /paralisis-cerebral  /neuromusculares
 *  /servicios  /tienda  /rehabilitacion-pulmonar  /oxigenoterapia
 *
 * POLÍTICA: Sin links externos a insersalud.com. Todo el contenido es self-contained.
 */

export const pathologies = [

    /* ─────────────────────────────────────────────────────────────────
       1. APNEA DEL SUEÑO
       Fuentes: /apnea-del-sueno  /servicios  /tienda
    ───────────────────────────────────────────────────────────────── */
    {
        slug: 'apnea-del-sueno',
        faq: [
            { q: '¿Qué equipo se usa para tratar la apnea del sueño?', a: 'El tratamiento de referencia es el CPAP, que entrega una presión de aire fija durante la noche. También existe el AutoCPAP, que ajusta la presión solo. Cuál corresponde y con qué presión lo define tu médico a partir del estudio del sueño. En INSER SALUD tenemos CPAP BMC G2S a $499.000, AutoCPAP BMC G2S a $600.000 y CPAP ResMed AirSense 10 a $799.000, todos con humidificador incluido.' },
            { q: '¿Necesito un estudio del sueño antes de comprar el equipo?', a: 'Sí. El equipo y la presión se determinan a partir de una poligrafía respiratoria o polisomnografía indicada por tu médico. En Córdoba hacemos el estudio del sueño a domicilio: dormís en tu casa y el informe lo interpreta un profesional.' },
            { q: '¿Puedo alquilar un CPAP antes de comprarlo?', a: 'En Córdoba sí: alquilamos CPAP con entrega e instalación a domicilio, lo que permite probar el tratamiento antes de decidir la compra. Al resto del país enviamos equipos en venta, con garantía de 2 años.' },
            { q: '¿Cada cuánto se cambia la máscara del CPAP?', a: 'La máscara es el consumible que más se recambia y su duración depende del uso y de la limpieza. Cuando pierde sello o marca la piel, conviene cambiarla. Tenemos máscaras nasales desde $50.000 y nasobucales, con asesoramiento para elegir la talla correcta.' },
        ],
        title: 'Apnea del Sueño',
        metaTitle: 'APNEA DEL SUEÑO | INSER SALUD',
        headline: '¿Te despertás cansado? Podría ser Apnea del Sueño.',
        subtitle: 'Si roncás fuerte, te despertás varias veces en la noche o te sentís agotado durante el día, podés estar sufriendo apnea del sueño sin saberlo.',
        color: '#1e40af',
        colorLight: '#dbeafe',
        heroImg: '/artifacts/hero_apnea.jpg',

        intro: 'La buena noticia es que la apnea del sueño se puede detectar fácilmente con un estudio simple y sin internación. En Inser Salud te acompañamos desde el diagnóstico hasta la adaptación completa al equipo.',

        description: 'La apnea del sueño es una enfermedad en la que la respiración se detiene repetidamente durante el sueño, privando al cerebro y al cuerpo de oxígeno. Provoca ronquidos fuertes, despertares nocturnos y somnolencia diurna excesiva. Sin tratamiento, aumenta el riesgo de hipertensión arterial, problemas cardíacos y accidentes de tránsito.',

        sections: [
            {
                id: 'diagnostico',
                title: 'Diagnóstico: Poligrafía Respiratoria Domiciliaria',
                content: `¿Te despertás cansado? Podría ser apnea del sueño.

Si roncás fuerte, te despertás varias veces en la noche o te sentís agotado durante el día, puede que estés sufriendo apnea del sueño y no lo sepas.

La buena noticia es que se puede detectar fácilmente con un estudio simple y sin internación: una poligrafía respiratoria que se realiza en casa, mientras dormís.

✅ No es invasivo
✅ Es cómodo y seguro
✅ Se hace en tu cama, como cualquier noche

Detectar la apnea a tiempo puede cambiar tu calidad de vida. Si tenés dudas, en Inser Salud te acompañamos en cada paso.

¿Qué mide la poligrafía respiratoria?
• Número de apneas e hipopneas por hora (IAH)
• Saturación de oxígeno durante el sueño
• Flujo aéreo nasal y oral
• Movimientos torácicos y abdominales
• Frecuencia cardíaca

¿Cuándo sospechar apnea del sueño?
• Roncido fuerte y habitual, observado por la pareja
• Pausas en la respiración durante el sueño
• Despertares con sensación de ahogo
• Somnolencia diurna excesiva
• Cansancio al despertar aunque hayas dormido muchas horas
• Cefalea matutina
• Dificultad para concentrarse o irritabilidad`,
                link: 'https://wa.me/5493512065320?text=Hola, quiero consultar sobre la poligrafía respiratoria para diagnóstico de apnea del sueño',
                linkText: 'Consultá sobre el estudio →',
            },
            {
                id: 'sintomas',
                title: 'Síntomas y Consecuencias de la Apnea',
                content: `La apnea del sueño no tratada puede tener consecuencias graves a mediano y largo plazo. Muchos pacientes conviven durante años con síntomas que atribuyen a "no dormir bien" o al estrés.

Síntomas más frecuentes:

🌙 Nocturnos:
• Ronquido intenso y frecuente
• Pausas respiratorias observadas por la pareja
• Despertares con sensación de ahogo o sofocación
• Nicturia (levantarse al baño varias veces)
• Sudoración nocturna excesiva
• Sueño muy liviano o fragmentado

☀️ Diurnos:
• Somnolencia excesiva durante el día
• Cansancio al despertar aunque hayas dormido muchas horas
• Cefalea matutina
• Dificultad para concentrarse o problemas de memoria
• Irritabilidad, cambios de humor o depresión
• Disminución del deseo sexual

⚠️ Consecuencias cardiovasculares:
• Hipertensión arterial (especialmente resistente a medicación)
• Arritmias cardíacas
• Mayor riesgo de infarto y ACV
• Insuficiencia cardíaca derecha en casos graves

El tratamiento con CPAP o BiPAP revierte la mayoría de estas consecuencias cuando se inicia a tiempo.`,
                link: null,
                linkText: null,
            },
            {
                id: 'tratamiento',
                title: 'Adaptación a Ventilación No Invasiva: CPAP y BiPAP',
                content: `Adaptarse al BiPAP, paso a paso.

Sabemos que usar un BiPAP al principio puede generar incomodidad, miedo o rechazo. Pero también sabemos que vale la pena insistir con paciencia.

En Inser Salud te acompañamos con respeto y cercanía para que te sientas seguro. Vamos de a poco, sin apuros, hasta que el equipo deje de ser una molestia y se convierta en un verdadero alivio para respirar mejor y descansar.

💬 Estamos para ayudarte.
🤝 No estás solo.
🌙 Respirar bien también es vivir mejor.

¿CPAP o BiPAP? ¿Cuál te corresponde?

• CPAP fijo: una sola presión continua durante toda la noche. Indicado para apnea moderada a severa.
• CPAP automático (APAP): ajusta la presión según la necesidad de cada momento del sueño.
• BiPAP: dos niveles de presión (mayor en inspiración, menor en espiración). Indicado cuando el CPAP no es tolerado, en apnea central o en enfermedades neuromusculares.

Estrategia de adaptación recomendada:
Semana 1 → Usá el equipo 1-2 horas estando despierto para familiarizarte
Semana 2 → Comenzá a usarlo al dormirte
Semana 3-4 → Extendé hasta completar la noche
1 mes → La mayoría de los pacientes duerme notablemente mejor`,
                link: 'https://wa.me/5493512065320?text=Hola, necesito ayuda para adaptarme al CPAP o BiPAP. ¿Pueden asesorarme?',
                linkText: 'Consultá sobre adaptación →',
            },
            {
                id: 'alquiler',
                title: 'Alquiler de CPAP para Adaptación — Probalo con Calma',
                content: `Probalo con calma. Te ayudamos a dar el primer paso.

Iniciar el tratamiento con CPAP puede generar dudas, incomodidad o ansiedad. Por eso, en Inser Salud te ofrecemos la opción de alquiler por adaptación, para que puedas probar el equipo en tu casa, con tranquilidad y acompañamiento profesional.

✅ Te entregamos el equipo listo para usar
✅ Te explicamos cómo colocarlo y usarlo correctamente
✅ Hacemos seguimiento los primeros días para ayudarte a adaptarte
✅ Sin compromiso de compra: lo usás el tiempo que necesités

El CPAP puede cambiar tu vida: mejorar tu descanso, tu energía, tu salud. Y nosotros estamos acá para acompañarte en ese proceso paso a paso, sin apuros.

💬 Respirá mejor. Dormí mejor. Viví mejor.`,
                link: 'https://wa.me/5493512065320?text=Hola, quiero consultar sobre el alquiler de CPAP para adaptación. ¿Cuáles son las condiciones?',
                linkText: 'Consultá alquiler por WhatsApp →',
            },
            {
                id: 'mascaras',
                title: 'Máscaras para CPAP y BiPAP: elegí la más cómoda',
                content: `La elección de la máscara correcta es tan importante como el equipo. Una máscara inadecuada puede arruinar el tratamiento aunque el equipo sea perfecto.

Tipos de máscaras disponibles:

👃 Máscaras nasales (las más usadas):
• Solo cubren la nariz
• Mayor comodidad y menor claustrofobia
• Ideales para respiradores nasales
• Ejemplos: DreamWear (mínimo contacto), BMC N4, BMC N5a, RESMED AirFit N20, YUWELL

😮 Máscaras nasobucales (full-face):
• Cubren nariz y boca
• Indicadas para quienes respiran por la boca durante el sueño
• Ejemplos: DreamWear Full Face, BMC F6, AirFit F20/F30, YUWELL YF02

👁️ Máscaras de almohadillas nasales (mínimo contacto):
• Solo sellan en las fosas nasales
• Máxima comodidad y libertad de movimiento
• Ideales para claustrofóbicos

Si la máscara que tenés no te resulta cómoda, o tenés escapes, presión en el puente de la nariz o intolerancia, podemos ayudarte a encontrar la indicada. Contamos con la mayor variedad de interfaces de Córdoba.`,
                link: 'https://wa.me/5493512065320?text=Hola, necesito ayuda para elegir la máscara correcta para mi CPAP o BiPAP',
                linkText: 'Consultá sobre máscaras →',
            },
        ],

        products: [
            {
                name: 'CPAP BMC G2S',
                priceARS: '$499.000',
                priceUSD: null,
                img: '/artifacts/cpap_bmc_g2s.jpg',
                badge: null,
                desc: 'CPAP fijo con humidificador. El más vendido.',
            },
            {
                name: 'BiPAP BMC G3 (con FR y humidificador)',
                priceARS: '$1.300.000',
                priceUSD: 'U$S 907',
                img: '/artifacts/bipap_bmc_g3.jpg',
                badge: null,
                desc: 'BiPAP con frecuencia respiratoria de respaldo.',
            },
            {
                name: 'AUTOCPAP PHILIPS DREAMSTATION',
                priceARS: null,
                priceUSD: 'U$S 758',
                img: '/artifacts/autocpap_dreamstation.jpg',
                badge: null,
                desc: 'Con humidificador y conectividad.',
            },
            {
                name: 'CPAP RESMED AIRSENSE 10',
                priceARS: '$799.000',
                priceUSD: null,
                img: '/artifacts/cpap_airsense10.jpg',
                badge: 'OFERTA',
                desc: 'Equipo completo con humidificador HumidAir, tubuladura, fuente, tarjeta SD y bolso.',
            },
            {
                name: 'Máscara Nasal DreamWear (mínimo contacto)',
                priceARS: '$223.000',
                priceUSD: 'U$S 153',
                img: '/artifacts/mascara_nasal_dreamwear.jpg',
                badge: null,
                desc: 'Comodidad y mínimo contacto facial.',
            },
            {
                name: 'Máscara Nasobucal DreamWear Philips',
                priceARS: '$229.000',
                priceUSD: 'U$S 157',
                img: '/artifacts/mascara_nasobucal_dreamwear.jpg',
                badge: null,
                desc: 'Full-face de mínimo contacto.',
            },
            {
                name: 'Máscara Nasal RESCOMF CPAP/BIPAP',
                priceARS: '$50.000',
                priceUSD: 'U$S 35',
                img: '/artifacts/mascara_rescomf.jpg',
                badge: 'OFERTA',
                desc: 'La opción más económica del mercado.',
            },
        ],

        tips: [
            'Usá el CPAP todas las noches, incluso en siestas cortas: la consistencia hace la diferencia.',
            'Limpiá la máscara con agua tibia y jabón suave todos los días para evitar infecciones.',
            'Si sentís molestias con la máscara actual, hay opciones más cómodas: consultanos sin compromiso.',
            'La humidificación integrada reduce la sequedad nasal y de garganta considerablemente.',
            'Los primeros días son los más difíciles. Si persistís, la mayoría de los pacientes duerme mejor en 2 semanas.',
            'Evitá dormir boca arriba: la posición de costado reduce los episodios de apnea.',
            'Controlá los datos de tu CPAP periódicamente: la mayoría guarda estadísticas de uso y eficacia.',
            'Revisá el ajuste de las correas de la máscara: ni muy floja (escapes) ni muy apretada (marcas en la piel).',
        ],

        alertText: '¿Te despertás cansado? El diagnóstico con poligrafía es sencillo, no invasivo y se hace en tu casa.',
        alertCta: 'Consultá hoy →',

        testimonials: [
            { name: 'María G.', city: 'Córdoba', text: 'Los equipos de Inser Salud han mejorado mi calidad de vida. Mi sueño es mucho mejor y ya no me despierto cansada.', stars: 5 },
            { name: 'Juan P.', city: 'Córdoba', text: 'Excelente atención y asesoramiento. Me ayudaron a adaptarme al CPAP con mucha paciencia. Los recomiendo totalmente.', stars: 5 },
        ],

        relatedLinks: [],

        santiMessage: 'Hola Santi, creo que tengo apnea del sueño. ¿Qué equipos CPAP o BiPAP tenés disponibles y cuáles son los precios? ¿También hacen alquiler para adaptación?',
        moreInfoUrl: '',
    },

    /* ─────────────────────────────────────────────────────────────────
       2. EPOC
       Fuentes: /epoc  /tienda  /rehabilitacion-pulmonar  /servicios
    ───────────────────────────────────────────────────────────────── */
    {
        slug: 'epoc',
        faq: [
            { q: '¿Qué equipos se usan en el tratamiento domiciliario de la EPOC?', a: 'Los más frecuentes son los concentradores de oxígeno para oxigenoterapia domiciliaria y, en casos de mayor compromiso, los equipos de ventilación no invasiva tipo BiPAP. Qué corresponde en cada caso, y con qué flujo o presión, lo indica el neumonólogo.' },
            { q: '¿Cuántas horas por día se usa el oxígeno?', a: 'Lo define tu médico según los resultados de saturación y gases en sangre. Nuestros concentradores están preparados para uso continuo las 24 horas del día, así que soportan cualquier esquema que te hayan indicado.' },
            { q: '¿Se puede alquilar el concentrador de oxígeno?', a: 'En Córdoba sí, con entrega e instalación a domicilio y capacitación en el uso. Es la opción habitual después de una internación o para tratamientos por tiempo definido. A todo el país vendemos con envío.' },
            { q: '¿Sirve un concentrador portátil para salir de casa?', a: 'Sí, siempre que respete el tipo de flujo que te indicaron. Hay portátiles de flujo continuo y otros que entregan oxígeno solo por pulsos: si tu indicación es de flujo continuo, un equipo de pulsos no lo reemplaza. Te ayudamos a verificar la compatibilidad antes de comprar.' },
        ],
        title: 'EPOC',
        metaTitle: 'EPOC | INSER SALUD',
        headline: 'Vivir con EPOC: equipamiento y acompañamiento para respirar mejor',
        subtitle: 'Brindamos información, equipos certificados y asesoramiento personalizado para que los pacientes con EPOC recuperen su calidad de vida.',
        color: '#0284c7',
        colorLight: '#e0f2fe',
        heroImg: '/artifacts/hero_epoc.jpg',

        intro: 'La EPOC es una enfermedad pulmonar crónica que dificulta la respiración. Con el tratamiento adecuado y el equipamiento correcto se puede llevar una vida activa y con buena calidad. En Inser Salud te acompañamos con aparatología aprobada por ANMAT y asesoramiento profesional.',

        description: 'La Enfermedad Pulmonar Obstructiva Crónica (EPOC) es una condición que dificulta el paso de aire hacia y desde los pulmones. Provoca tos persistente con producción de moco, sibilancias y falta de aire al esfuerzo. Aunque no tiene cura, el tratamiento correcto — incluyendo oxigenoterapia, inhaladores, broncodilatadores y rehabilitación pulmonar — puede mejorar significativamente la calidad de vida y frenar la progresión.',

        sections: [
            {
                id: 'que-es',
                title: '¿Qué es la EPOC y cómo afecta la respiración?',
                content: `La Enfermedad Pulmonar Obstructiva Crónica (EPOC) engloba principalmente dos condiciones: el enfisema pulmonar y la bronquitis crónica. En ambos casos, el flujo de aire queda obstruido de manera permanente, dificultando la respiración.

¿Qué pasa en el pulmón?

En el enfisema: los alvéolos (pequeños sacos de aire) se dañan y pierden elasticidad. El aire queda "atrapado" en el pulmón y no puede salir completamente.

En la bronquitis crónica: los bronquios se inflaman y producen exceso de moco, dificultando el paso del aire y favoreciendo las infecciones respiratorias.

Síntomas principales de la EPOC:
• Tos crónica con producción de moco (especialmente por la mañana)
• Disnea (falta de aire) al esfuerzo, que progresa con los años
• Sibilancias (silbidos al respirar)
• Sensación de opresión en el pecho
• Cansancio y falta de energía
• Infecciones respiratorias frecuentes (exacerbaciones)

Factores de riesgo:
🚬 Tabaquismo (causa más del 85% de los casos)
🏭 Exposición a contaminantes laborales (humos, polvos, gases)
🌫️ Contaminación del aire ambiental
🧬 Factores genéticos (déficit de alfa-1-antitripsina)

La EPOC se diagnostica mediante una espirometría. Si sospechás que podés tenerla, consultá a tu médico.`,
                link: 'https://wa.me/5493512065320?text=Hola, tengo EPOC y quisiera información sobre equipos y tratamiento',
                linkText: 'Consultá con nuestro equipo →',
            },
            {
                id: 'inhalador',
                title: 'Técnica Inhalatoria Correcta con Aerocámara',
                content: `El inhalador es la base del tratamiento farmacológico de la EPOC. Sin embargo, estudios demuestran que más del 70% de los pacientes no utiliza correctamente su inhalador, lo que reduce drásticamente la efectividad del medicamento.

¿Por qué usar aerocámara?

Sin aerocámara, gran parte del medicamento queda depositado en la boca y la garganta, sin llegar a los bronquios donde realmente se necesita. Con aerocámara, entre el 20 y el 40% del medicamento llega al pulmón (vs. solo el 10-15% sin ella).

Técnica correcta paso a paso:

1. Agitá bien el inhalador (si es MDI — cartucho presurizado)
2. Colocá el inhalador en la entrada de la aerocámara
3. Expirá lentamente, vaciando bien los pulmones
4. Sellá los labios alrededor de la boquilla de la aerocámara
5. Activá el inhalador y al mismo tiempo comenzá a inspirar lenta y profundamente
6. Mantené el aire 10 segundos (o los que puedas)
7. Espirá lentamente
8. Aguardá 30 segundos antes de la segunda inhalación

Errores más frecuentes a evitar:
❌ No agitar el inhalador antes de usarlo
❌ Inspirar muy rápido (el medicamento queda en la boca)
❌ No mantener el aire retenido
❌ No usar aerocámara

Si tenés dudas sobre tu técnica, consultanos: podemos mostrarte cómo hacerlo correctamente.`,
                link: 'https://wa.me/5493512065320?text=Hola, necesito asesoramiento sobre técnica inhalatoria con aerocámara para EPOC',
                linkText: 'Consultá sobre técnica inhalatoria →',
            },
            {
                id: 'oxigenoterapia',
                title: 'Oxigenoterapia Domiciliaria en EPOC',
                content: `La oxigenoterapia domiciliaria está indicada en pacientes con EPOC que presentan insuficiencia respiratoria crónica: saturación de oxígeno (SpO₂) por debajo del 88% en reposo o al ejercicio.

¿Cuándo se indica oxígeno?

• SpO₂ ≤ 88% en reposo (PaO₂ ≤ 55 mmHg en gasometría arterial)
• SpO₂ ≤ 90% con hipertensión pulmonar, poliglobulia o insuficiencia cardíaca derecha
• Desaturación significativa solo durante el ejercicio o el sueño

¿Cuántas horas usar el oxígeno?

La evidencia demuestra que la oxigenoterapia es efectiva solo cuando se usa un mínimo de 15-18 horas diarias (idealmente 24 horas). Usar el oxígeno pocas horas por día no aporta los beneficios en sobrevida demostrados por los estudios.

Tipos de sistemas de oxígeno disponibles en Inser Salud:

🏠 Concentrador estacionario (para el hogar):
• Produce oxígeno a partir del aire ambiente
• Flujo continuo sin costo de recarga
• Modelos hasta 5 L/min — YUWELL y otras marcas
• Precio referencia: U$S 713

🎒 Concentrador portátil (para salir de casa):
• Permite mantener la actividad diaria y la autonomía
• KINGON P2-S3: el más liviano y económico (desde U$S 1.880)
• KINGON P2-TOC: 9,5 horas de autonomía (U$S 3.458)
• GCE Zen-O: premium, con carrito y 2 baterías (desde U$S 3.747)

💧 Oxígeno líquido:
• Mayor autonomía en menor peso
• Ideal para pacientes muy activos o con flujos elevados
• Consultá disponibilidad en Córdoba

🎒 Mochila de oxígeno portátil:
• Tubo de 0,415 L + regulador + bolso + carga incluida
• Ideal para salidas cortas o visitas médicas`,
                link: 'https://wa.me/5493512065320?text=Hola, soy paciente con EPOC y necesito información sobre concentradores de oxígeno',
                linkText: 'Consultá disponibilidad →',
            },
            {
                id: 'exacerbaciones',
                title: 'Exacerbaciones: Cómo Prevenir Internaciones',
                content: `Las exacerbaciones de EPOC (crisis de empeoramiento agudo) son la principal causa de internación y mortalidad en estos pacientes. La mayoría son causadas por infecciones virales o bacterianas, contaminación o mal control del tratamiento.

Señales de alerta de exacerbación:
⚠️ Aumento de la disnea habitual
⚠️ Mayor cantidad o cambio de color del moco (amarillo o verde)
⚠️ Tos más intensa o frecuente
⚠️ Saturación de oxígeno por debajo de lo habitual
⚠️ Fiebre o escalofríos
⚠️ Edemas en los pies o tobillos

Ante estos síntomas, consultá a tu médico de inmediato. El tratamiento precoz de las exacerbaciones reduce la gravedad y evita internaciones.

Cómo prevenir exacerbaciones:

🛡️ Vacunación: influenza anualmente y neumococo según pauta médica
🚭 Dejar de fumar es la medida más efectiva para frenar la progresión
💊 Adherencia al tratamiento inhalatorio todos los días
🏃 Rehabilitación pulmonar para mejorar la capacidad funcional
🌡️ Evitar ambientes contaminados, humo, frío intenso y exposición laboral
🏠 Tener el concentrador de oxígeno en casa listo para usar`,
                link: 'https://wa.me/5493512065320?text=Hola, tengo EPOC y quiero saber cómo prevenir internaciones y exacerbaciones',
                linkText: 'Consultá con nuestro equipo →',
            },
            {
                id: 'rehabilitacion',
                title: 'Rehabilitación Pulmonar',
                content: `La rehabilitación pulmonar es el tratamiento no farmacológico más efectivo para la EPOC. Consiste en un programa supervisado de ejercicio físico, educación sobre la enfermedad y apoyo psicosocial.

Beneficios demostrados de la rehabilitación pulmonar:

✅ Reduce la disnea (falta de aire) en un 20-30%
✅ Mejora la capacidad de ejercicio y las actividades cotidianas
✅ Disminuye el número de internaciones por exacerbaciones
✅ Mejora la calidad de vida y el estado de ánimo
✅ Reduce la ansiedad y la depresión asociadas a la EPOC
✅ Mejora la supervivencia a largo plazo

¿Quién puede acceder?

La rehabilitación pulmonar está indicada para todos los pacientes con EPOC moderado a severo que presenten limitación funcional. No es necesario tener la enfermedad muy avanzada para beneficiarse.

Ejercicios recomendados:
• Caminata progresiva (comenzar con 10-15 min/día y aumentar gradualmente)
• Bicicleta fija o ergómetro de brazos
• Ejercicios de fortalecimiento muscular
• Técnicas de respiración: labios fruncidos, respiración diafragmática

En Inser Salud te orientamos sobre cómo acceder a programas de rehabilitación pulmonar en Córdoba.`,
                link: 'https://wa.me/5493512065320?text=Hola, quiero información sobre rehabilitación pulmonar para EPOC en Córdoba',
                linkText: 'Consultá sobre rehabilitación →',
            },
        ],

        products: [
            {
                name: 'Concentrador Portátil KINGON P2-S3',
                priceARS: '$2.735.400',
                priceUSD: 'U$S 1.880',
                img: '/artifacts/kingon_p2_s3.jpg',
                badge: 'EL MÁS LIVIANO',
                desc: 'El concentrador portátil más liviano y económico del mercado.',
            },
            {
                name: 'Concentrador Portátil KINGON P2-TOC',
                priceARS: null,
                priceUSD: 'U$S 3.458',
                img: '/artifacts/kingon_p2_toc.jpg',
                badge: '9,5 HS',
                desc: '9,5 horas de autonomía con batería extendida.',
            },
            {
                name: 'GCE Zen-O (2 baterías + carro)',
                priceARS: '$5.451.885',
                priceUSD: 'U$S 3.747',
                img: '/artifacts/gce_zeno.jpg',
                badge: 'PREMIUM',
                desc: 'Con 2 baterías y carrito incluidos.',
            },
            {
                name: 'Concentrador de Oxígeno YUWELL Estacionario',
                priceARS: null,
                priceUSD: 'U$S 713',
                img: '/artifacts/concentrador_yuwell.jpg',
                badge: null,
                desc: 'Para uso domiciliario continuo. 5 L/min.',
            },
            {
                name: 'Mochila de Oxígeno Portátil',
                priceARS: null,
                priceUSD: 'U$S 270',
                img: '/artifacts/kingon_p2_s3.jpg',
                badge: null,
                desc: 'Tubo 0,415 L + regulador + bolso + carga incluida.',
            },
        ],

        tips: [
            'Usá siempre el inhalador con aerocámara: mejora notablemente la llegada del medicamento a los bronquios.',
            'Vacunate contra la gripe anualmente y contra el neumococo: las infecciones son la principal causa de internación.',
            'Practicá la respiración con labios fruncidos para aliviar la disnea en momentos de ahogo.',
            'Evitá ambientes con humo, polvo, aerosoles o productos de limpieza con olor fuerte.',
            'Caminá todos los días dentro de tus posibilidades: el movimiento mejora la función pulmonar.',
            'Si usás oxígeno, no lo enciendas nunca cerca de una llama, cigarro o estufa a gas.',
            'Consultá a tu médico ante cualquier aumento de la falta de aire o cambio en el moco.',
            'Llevá siempre un oxímetro de pulso: es pequeño, económico y puede alertarte ante una crisis.',
        ],

        alertText: 'La EPOC no tiene cura, pero con el tratamiento correcto podés recuperar tu calidad de vida. Entrega inmediata en Córdoba.',
        alertCta: 'Consultá con Santi →',

        testimonials: [
            { name: 'Juan P.', city: 'Córdoba', text: 'Excelente atención y asesoramiento. Los concentradores son de alta calidad y me han ayudado muchísimo en el día a día.', stars: 5 },
            { name: 'María G.', city: 'Córdoba', text: 'Gracias al concentrador portátil puedo salir de mi casa sin miedo. El equipo de Inser Salud me cambió la vida.', stars: 5 },
        ],

        relatedLinks: [],

        santiMessage: 'Hola Santi, soy paciente con EPOC y necesito información sobre concentradores de oxígeno. ¿Cuáles son los modelos disponibles, portátiles y estacionarios, y sus precios?',
        moreInfoUrl: '',
    },

    /* ─────────────────────────────────────────────────────────────────
       3. FIBROSIS PULMONAR
       Fuentes: /fibrosis-pulmonar  /tienda  /oxigenoterapia  /oxigeno-liquido
    ───────────────────────────────────────────────────────────────── */
    {
        slug: 'fibrosis-pulmonar',
        faq: [
            { q: '¿Qué equipamiento se usa en la fibrosis pulmonar?', a: 'Principalmente oxigenoterapia domiciliaria con concentrador de oxígeno. El flujo en litros por minuto y las horas de uso los indica tu neumonólogo según la saturación. En rehabilitación pulmonar suelen usarse concentradores de alto flujo, como el Yuwell de 10 litros.' },
            { q: '¿Concentrador fijo o portátil?', a: 'El fijo es para el domicilio y funciona enchufado, sin recargas. El portátil tiene batería y permite salir, viajar o hacer trámites. Muchos pacientes usan los dos: el fijo en casa y el portátil para mantener su actividad.' },
            { q: '¿Alquilan equipos de oxígeno en Córdoba?', a: 'Sí. Alquilamos concentradores fijos y portátiles con entrega e instalación a domicilio en Córdoba Capital y alrededores. Respondemos consultas por WhatsApp todos los días.' },
            { q: '¿Trabajan con obra social?', a: 'Vendemos de forma particular y te ayudamos con el reintegro: te damos un presupuesto formal para presentar en tu obra social o prepaga y la factura oficial para gestionar el recupero según tu plan.' },
        ],
        title: 'Fibrosis Pulmonar',
        metaTitle: 'FIBROSIS PULMONAR | INSER SALUD',
        headline: 'Oxigenoterapia continua para una vida activa con Fibrosis Pulmonar',
        subtitle: 'Concentradores estacionarios, concentradores portátiles, mochilas de oxígeno y oxígeno líquido. Entrega en Córdoba con asesoramiento profesional.',
        color: '#6366f1',
        colorLight: '#ede9fe',
        heroImg: '/artifacts/hero_fibrosis.jpg',

        intro: 'La fibrosis pulmonar requiere oxigenoterapia continua para mejorar la calidad de vida, reducir la fatiga y preservar la autonomía del paciente. En Inser Salud contamos con todas las opciones de oxígeno domiciliario: desde concentradores estacionarios para el hogar hasta concentradores portátiles, mochilas y oxígeno líquido.',

        description: 'La Fibrosis Pulmonar es una enfermedad en la que el tejido pulmonar se cicatriza y endurece progresivamente, reduciendo la capacidad de intercambio de oxígeno. Los pulmones pierden elasticidad y el paciente siente disnea progresiva, inicialmente al esfuerzo y luego en reposo. La oxigenoterapia domiciliaria es el pilar fundamental del tratamiento: mejora la oxigenación, reduce la disnea y permite mantener mayor actividad física.',

        sections: [
            {
                id: 'que-es-fibrosis',
                title: '¿Qué es la Fibrosis Pulmonar y cómo progresa?',
                content: `La Fibrosis Pulmonar (FP) es una enfermedad pulmonar crónica y progresiva caracterizada por la acumulación de tejido cicatricial (fibrosis) en el pulmón. Este tejido reemplaza el tejido pulmonar sano y dificulta la respiración de forma progresiva e irreversible.

Tipos de fibrosis pulmonar:

• Fibrosis Pulmonar Idiopática (FPI): la más común. Causa desconocida. Progresión variable, pero generalmente irreversible.
• Fibrosis secundaria: asociada a enfermedades autoinmunes (artritis reumatoide, esclerodermia, lupus), exposición laboral a polvos o toxinas, medicamentos, radioterapia.

Síntomas característicos:
• Disnea (falta de aire) al esfuerzo que progresa con el tiempo
• Tos seca persistente e irritativa
• Fatiga y cansancio extremo
• Crepitantes ("velcro") al auscultar los pulmones
• Hipocratismo digital (dedos en palillo de tambor)
• Cianosis (color azulado en labios y uñas) en etapas avanzadas

Diagnóstico:
• Tomografía de alta resolución (TCAR)
• Pruebas de función pulmonar (espirometría, DLCO)
• Biopsia pulmonar en casos seleccionados
• Saturación de oxígeno en reposo y esfuerzo

La fibrosis pulmonar no tiene cura, pero con el tratamiento adecuado — incluyendo fármacos antifibróticos y oxigenoterapia — se puede frenar la progresión y mejorar la calidad de vida.`,
                link: 'https://wa.me/5493512065320?text=Hola, tengo Fibrosis Pulmonar y quisiera información sobre oxigenoterapia domiciliaria',
                linkText: 'Consultá con nuestro equipo →',
            },
            {
                id: 'concentradores-estacionarios',
                title: 'Concentradores de Oxígeno Estacionarios (Para el Hogar)',
                content: `Para uso domiciliario continuo, los concentradores estacionarios ofrecen flujo constante sin necesidad de recarga de tubos ni cilindros. Son ideales para el hogar: se enchufan a la red eléctrica y producen oxígeno a partir del aire ambiente al 93% de pureza.

Ventajas del concentrador estacionario:

✅ Sin costo de recarga: produce oxígeno indefinidamente mientras está enchufado
✅ Flujo continuo y constante según prescripción (1 a 5 L/min)
✅ No requiere almacenamiento de tubos
✅ Bajo costo operativo
✅ Silencioso y seguro para uso en dormitorio
✅ Disponible en alquiler con entrega inmediata en Córdoba

Modelos disponibles:
• YUWELL Estacionario 5L — U$S 713
• Otros modelos según disponibilidad

El concentrador estacionario es la opción ideal para usar durante la noche y en las horas en que el paciente está en el hogar. Para salir, se complementa con concentrador portátil o mochila.

Alquiler disponible con entrega inmediata en Córdoba. Ideal para necesidades transitorias o como evaluación antes de la compra.`,
                link: 'https://wa.me/5493512065320?text=Hola, quiero información sobre concentrador de oxígeno estacionario para Fibrosis Pulmonar',
                linkText: 'Consultá sobre alquiler →',
            },
            {
                id: 'concentradores-portatiles',
                title: 'Concentradores Portátiles: Mantenés tu Autonomía',
                content: `Los concentradores portátiles te permiten mantener la actividad diaria fuera del hogar sin depender de tubos o recambios. Son ideales para paseos, visitas médicas, viajes y actividades cotidianas.

Modelos disponibles en Inser Salud:

🥇 KINGON P2-S3 — El más liviano y económico
• Precio: $2.735.400 · U$S 1.880
• El más liviano del mercado
• Ideal para pacientes activos con necesidad de flujo bajo-moderado
• Batería incluida para autonomía en desplazamientos

⏱️ KINGON P2-TOC — 9,5 horas de autonomía
• Precio: U$S 3.458
• Batería de larga duración: 9,5 horas continuas
• Ideal para viajes en avión o jornadas largas fuera del hogar

👑 GCE Zen-O — Premium con carrito y 2 baterías
• Precio: $5.451.885 · U$S 3.747
• Incluye carrito y 2 baterías para máxima autonomía
• Homologado para vuelos comerciales
• La opción premium para el paciente más activo

Importante: Los concentradores portátiles funcionan por pulso (en demanda). Para flujos continuos o nocturnos, se recomienda complementar con concentrador estacionario.`,
                link: 'https://wa.me/5493512065320?text=Hola, quiero información sobre concentradores portátiles de oxígeno para Fibrosis Pulmonar',
                linkText: 'Consultá modelos portátiles →',
            },
            {
                id: 'mochilas',
                title: 'Mochilas de Oxígeno Portátil',
                content: `Las mochilas de oxígeno portátil son una solución práctica para pacientes que necesitan flujos más altos o que prefieren una opción compacta y económica para salidas cortas.

Contenido del kit mochila de Inser Salud:
• 1 tubo portátil de oxígeno (0,415 L)
• 1 regulador de flujo
• 1 bolso transportador especializado
• Carga de oxígeno incluida
• Precio referencia: U$S 270

¿Cuándo conviene la mochila de oxígeno?
• Salidas de 2 a 4 horas fuera del hogar
• Visitas médicas o estudios
• Situaciones de emergencia o backup
• Pacientes con flujos más altos que no cubre el concentrador portátil

Diferencia con el concentrador portátil:
La mochila de oxígeno usa oxígeno comprimido en tubo (carga finita), mientras que el concentrador portátil lo produce del aire (autonomía ilimitada con batería). La mochila es más económica pero requiere recarga periódica.

Consultanos para evaluar cuál es la mejor opción según tu prescripción médica y estilo de vida.`,
                link: 'https://wa.me/5493512065320?text=Hola, quiero información sobre mochilas de oxígeno portátil para Fibrosis Pulmonar',
                linkText: 'Consultá sobre mochilas →',
            },
            {
                id: 'oxigeno-liquido',
                title: 'Oxígeno Líquido',
                content: `El oxígeno líquido es la solución con mayor densidad energética: en el mismo volumen almacena mucho más oxígeno que el gas comprimido, lo que permite mayor autonomía con menor peso.

Ventajas del oxígeno líquido:

✅ Mayor autonomía que los tubos convencionales
✅ Menor peso total del equipo
✅ Flujo continuo a cualquier nivel (ideal para flujos elevados)
✅ Posibilidad de recarga del equipo portátil desde el tanque domiciliario
✅ Ideal para pacientes muy activos o con indicación de flujos altos (>3 L/min)

¿Quién lo necesita?

• Pacientes con fibrosis pulmonar avanzada que requieren flujos altos durante el ejercicio
• Pacientes que no toleran el pulso del concentrador portátil
• Pacientes muy activos que necesitan máxima autonomía fuera del hogar

En Inser Salud te asesoramos sobre disponibilidad de oxígeno líquido en Córdoba y cómo acceder a este sistema según la indicación médica.`,
                link: 'https://wa.me/5493512065320?text=Hola, quiero información sobre oxígeno líquido para Fibrosis Pulmonar en Córdoba',
                linkText: 'Consultá disponibilidad →',
            },
            {
                id: 'rehabilitacion-fp',
                title: 'Rehabilitación Pulmonar en Fibrosis Pulmonar',
                content: `La rehabilitación pulmonar tiene beneficios probados en la Fibrosis Pulmonar: mejora la tolerancia al ejercicio, reduce la disnea y mejora la calidad de vida, aunque no cambia la progresión de la enfermedad.

Componentes del programa:

🏃 Ejercicio aeróbico supervisado: caminata en cinta, bicicleta fija, ajustado a cada paciente con monitoreo de saturación.

💪 Entrenamiento de fuerza muscular: especialmente de extremidades inferiores y musculatura respiratoria.

📚 Educación sobre la enfermedad: aprender a reconocer señales de alerta, técnicas de ahorro energético, cómo usar el oxígeno durante el ejercicio.

🧘 Apoyo psicosocial: manejo de la ansiedad y la depresión frecuentes en pacientes con enfermedades crónicas progresivas.

Importante: el ejercicio debe realizarse siempre con oxígeno suplementario si el paciente lo necesita. Monitoreá la saturación antes, durante y después de cada sesión.`,
                link: 'https://wa.me/5493512065320?text=Hola, quiero información sobre rehabilitación pulmonar para Fibrosis Pulmonar',
                linkText: 'Consultá sobre rehabilitación →',
            },
        ],

        products: [
            {
                name: 'GCE Zen-O (2 baterías + carro)',
                priceARS: '$5.451.885',
                priceUSD: 'U$S 3.747',
                img: '/artifacts/gce_zeno.jpg',
                badge: 'PREMIUM',
                desc: 'Con carrito y 2 baterías. Máxima autonomía.',
            },
            {
                name: 'KINGON P2-S3 (Portátil)',
                priceARS: '$2.735.400',
                priceUSD: 'U$S 1.880',
                img: '/artifacts/kingon_p2_s3.jpg',
                badge: 'MÁS LIVIANO',
                desc: 'El más liviano y económico del mercado.',
            },
            {
                name: 'KINGON P2-TOC (Portátil)',
                priceARS: null,
                priceUSD: 'U$S 3.458',
                img: '/artifacts/kingon_p2_toc.jpg',
                badge: '9,5 HS',
                desc: '9,5 horas de autonomía con batería extendida.',
            },
            {
                name: 'Concentrador YUWELL Estacionario',
                priceARS: null,
                priceUSD: 'U$S 713',
                img: '/artifacts/concentrador_yuwell.jpg',
                badge: null,
                desc: 'Para uso domiciliario continuo. 5 L/min.',
            },
            {
                name: 'Mochila de Oxígeno Portátil',
                priceARS: null,
                priceUSD: 'U$S 270',
                img: '/artifacts/kingon_p2_s3.jpg',
                badge: null,
                desc: 'Tubo 0,415 L + regulador + bolso + carga.',
            },
        ],

        tips: [
            'Usá el oxígeno las horas indicadas por tu médico: especialmente durante la noche y el ejercicio.',
            'Mantené limpios los filtros del concentrador para garantizar el mejor rendimiento y vida útil.',
            'Consultá con tu médico antes de viajar en avión: los vuelos pueden requerir oxígeno adicional y algunos modelos son homologados para volar.',
            'La rehabilitación pulmonar supervisada mejora la tolerancia al ejercicio y reduce la disnea.',
            'Llevá siempre un oxímetro de pulso para monitorear tu saturación durante el día y el ejercicio.',
            'Nunca fumés ni permitas que fumen cerca del concentrador: el oxígeno es altamente inflamable.',
            'Si la saturación baja por debajo del 88% en reposo, avisá a tu médico inmediatamente.',
            'Tomá los fármacos antifibróticos indicados: frena la progresión aunque no cure la enfermedad.',
        ],

        alertText: 'La oxigenoterapia mejora la sobrevida y la calidad de vida en Fibrosis Pulmonar. Entrega inmediata en Córdoba.',
        alertCta: 'Consultá disponibilidad →',

        testimonials: [
            { name: 'María G.', city: 'Córdoba', text: 'El concentrador portátil de Inser Salud me permite salir y hacer mi vida normal. La calidad del equipo es excelente.', stars: 5 },
            { name: 'Roberto A.', city: 'Villa Carlos Paz', text: 'El asesoramiento fue impecable. Me explicaron todo sobre el oxígeno líquido y ahora tengo mucha más autonomía.', stars: 5 },
        ],

        relatedLinks: [],

        santiMessage: 'Hola Santi, tengo Fibrosis Pulmonar y necesito oxigenoterapia domiciliaria. ¿Qué concentradores tienen disponibles, tanto estacionarios como portátiles? ¿También tienen oxígeno líquido?',
        moreInfoUrl: '',
    },

    /* ─────────────────────────────────────────────────────────────────
       4. ESCLEROSIS LATERAL AMIOTRÓFICA (ELA)
       Fuentes: /esclerosis-lateral-amiotrofica  /neuromusculares  /tienda
    ───────────────────────────────────────────────────────────────── */
    {
        slug: 'esclerosis-lateral-amiotrofica',
        faq: [
            { q: '¿Qué equipos se usan en la ELA?', a: 'Los tres más frecuentes son la ventilación no invasiva (BiPAP con frecuencia respiratoria de respaldo, como el BMC G3 a $1.300.000), el asistente de tos o Cough Assist para movilizar secreciones, y en etapas avanzadas ventiladores de mayor complejidad como el ResMed STELLAR 150. La indicación y los parámetros los define el equipo médico tratante.' },
            { q: '¿Para qué sirve el asistente de tos (Cough Assist)?', a: 'Cuando la musculatura respiratoria se debilita, la tos pierde fuerza y cuesta eliminar secreciones. El asistente de tos insufla aire y luego genera una salida rápida que imita el mecanismo de la tos, ayudando a despejar la vía aérea. Es un equipo de indicación médica.' },
            { q: '¿Se pueden alquilar estos equipos?', a: 'En Córdoba alquilamos equipos de ventilación con entrega e instalación a domicilio. Al resto del país vendemos con envío, garantía y asesoramiento para la puesta en marcha.' },
            { q: '¿Cómo funciona el reintegro por obra social?', a: 'Trabajamos de forma particular y te acompañamos en el trámite: preparamos el presupuesto formal con los datos del equipo indicado y emitimos factura oficial para que gestiones el reintegro con tu cobertura.' },
        ],
        title: 'Esclerosis Lateral Amiotrófica',
        metaTitle: 'Información sobre la enfermedad ELA | INSER SALUD',
        headline: '¿Tenés Tos Suficiente? Todo sobre el soporte respiratorio en ELA',
        subtitle: 'En la ELA, mantener una tos efectiva y una ventilación adecuada puede ser la diferencia. Equipamos y acompañamos a pacientes y familias desde el primer día.',
        color: '#7c3aed',
        colorLight: '#ede9fe',
        heroImg: '/artifacts/hero_ela.jpg',

        intro: 'Más del 80% de las muertes en personas con enfermedades neuromusculares como la ELA se deben a causas respiratorias evitables. El seguimiento respiratorio debe comenzar incluso antes de que aparezcan síntomas evidentes.',

        description: 'La Esclerosis Lateral Amiotrófica (ELA) es una enfermedad neurodegenerativa que afecta progresivamente las neuronas motoras, debilitando los músculos, incluyendo los respiratorios. Una tos eficaz y una ventilación adecuada son fundamentales para mantener la calidad de vida y prevenir complicaciones graves como neumonías y insuficiencia respiratoria.',

        sections: [
            {
                id: 'enfermedades-neuromusculares',
                title: '🧠 Enfermedades Neuromusculares y Respiración: un Abordaje que puede Cambiarlo Todo',
                content: `Las enfermedades neuromusculares (ENM) son un grupo de trastornos que afectan el funcionamiento de los músculos debido a alteraciones en los nervios que los controlan. Estas enfermedades pueden ser hereditarias, adquiridas o progresivas, y entre las más frecuentes se encuentran:

• Distrofia muscular de Duchenne
• Esclerosis lateral amiotrófica (ELA)
• Atrofia muscular espinal (AME)
• Miopatías y polineuropatías
• Miastenia gravis

Una característica común en todas ellas es que con el tiempo se debilitan los músculos respiratorios, tanto los encargados de la inspiración (como el diafragma) como los que permiten toser y eliminar secreciones.

⚠️ El dato que no se puede ignorar
Más del 80% de las muertes en personas con enfermedades neuromusculares se deben a causas respiratorias evitables.

Esta estadística es dura, pero real. Lo más preocupante es que muchas veces se llega tarde al diagnóstico respiratorio, cuando los síntomas ya son severos. Por eso, el seguimiento respiratorio debe comenzar incluso antes de que aparezcan síntomas evidentes.

📌 El abordaje integral salva vidas
Abordar a tiempo la función respiratoria no es solo una estrategia médica: es una forma directa de cuidar la vida, de prolongar la autonomía y de acompañar con dignidad.

El seguimiento periódico, los estudios funcionales en domicilio, la educación de la familia y el acceso temprano a equipos como el Cough Assist o los BiPAP hacen la diferencia.

🧠 En enfermedades neuromusculares, saber cuándo comenzar a ventilar puede hacer la diferencia. La falta de aire muchas veces no se nota… hasta que es tarde.

En Inser Salud realizamos evaluaciones respiratorias gratuitas para detectar a tiempo cuándo es necesario comenzar con asistencia ventilatoria.`,
                link: 'https://wa.me/5493512065320?text=Hola, quisiera información sobre evaluación respiratoria gratuita para ELA o enfermedades neuromusculares',
                linkText: 'Consultá la evaluación gratuita →',
            },
            {
                id: 'evaluacion',
                title: '🔍 Evaluación Funcional Respiratoria: ¿Cómo Saber Cuándo Actuar?',
                content: `Los siguientes estudios permiten detectar a tiempo la debilidad muscular respiratoria, incluso cuando la persona todavía no presenta síntomas:

🫁 1. Capacidad Vital Forzada (CVF)
Se mide con espirometría. Un valor por debajo del 50% predicho sugiere que ya se requiere asistencia respiratoria, especialmente durante el sueño.
También es clave observar la variación entre la CVF sentado y acostado: si disminuye más del 20%, hay debilidad diafragmática.

🌬️ 2. Presiones inspiratorias y espiratorias máximas (PIMAX/PEMAX)
Evalúan la fuerza de los músculos respiratorios.
• PIMAX < 60 cmH₂O sugiere debilidad inspiratoria significativa.
• PEMAX < 80 cmH₂O indica tos ineficaz.

💨 3. Pico de flujo de tos (PCF)
Refleja la capacidad de eliminar secreciones.
• PCF > 270 L/min: normal
• PCF entre 160–270 L/min: riesgo
• PCF < 160 L/min: necesidad de asistencia para la tos (Cough Assist)

🌙 4. Capnografía y oximetría nocturna
Detectan acumulación de dióxido de carbono y desaturaciones durante el sueño, incluso sin síntomas. Son fundamentales para saber cuándo iniciar la ventilación no invasiva (VNI) nocturna.

En Inser Salud realizamos evaluaciones respiratorias gratuitas para detectar a tiempo cuándo es necesario comenzar con asistencia ventilatoria.`,
                link: 'https://wa.me/5493512065320?text=Hola, quisiera información sobre evaluación respiratoria gratuita para ELA o enfermedades neuromusculares',
                linkText: '📲 Solicitar evaluación gratuita →',
            },
            {
                id: 'cough-assist',
                title: '¿Tenés Tos Suficiente? — El Asistente de Tos (Cough Assist)',
                content: `¿Tenés tos suficiente?

Cuando los músculos respiratorios se debilitan, la tos pierde fuerza y efectividad. Las secreciones se acumulan en los pulmones y vías aéreas, generando un ambiente propicio para la neumonía — la causa más frecuente de muerte en ELA.

¿Qué hace el Asistente de Tos (Cough Assist)?

El Cough Assist (asistente mecánico de tos o Insufflator-Exsufflator) genera una tos mecánica efectiva mediante un ciclo de insuflación-exuflación:

1. Insuflación: el equipo llena los pulmones de aire (como una inspiración profunda)
2. Exuflación: el equipo extrae el aire rápidamente (simula la tos)
3. Resultado: las secreciones se moviliza hacia las vías aéreas superiores y se pueden eliminar

¿Cuándo se indica el Cough Assist?
• PCF < 160 L/min en cualquier momento
• PCF < 270 L/min durante infecciones respiratorias
• Tos débil, húmeda o ineficaz
• Historia de internaciones por neumonía

Beneficios demostrados:
✅ Previene neumonías por retención de secreciones
✅ Reduce hospitalizaciones hasta en un 40%
✅ Puede usarse de forma segura en domicilio (familiar capacitado)
✅ Mejora el bienestar y la tranquilidad del paciente y la familia

Precio referencia: U$S 9.084
Consultanos disponibilidad y financiación.`,
                link: 'https://wa.me/5493512065320?text=Hola, quiero consultar sobre el Asistente de Tos Cough Assist para ELA. ¿Cuál es el precio y disponibilidad?',
                linkText: 'Consultá el Cough Assist →',
            },
            {
                id: 'vni',
                title: '🛠️ ¿Cuándo Iniciar la Ventilación No Invasiva (VNI)?',
                content: `La ventilación no invasiva (VNI) debe indicarse antes de que el paciente tenga insuficiencia respiratoria aguda, y de forma preventiva si se observan estos criterios:

• Capacidad vital < 50% del valor teórico
• Desaturaciones nocturnas (SpO₂ < 90% durante más del 5% del sueño)
• Signos de hipoventilación: somnolencia, cefalea matutina, fatiga
• Hipercapnia (CO₂ > 45 mmHg) en gases arteriales
• Fallas en pruebas de fuerza respiratoria (PIMAX, PCF)

Cuanto antes se inicia la VNI, mejor se preserva la calidad de vida y se retrasa el deterioro.

¿Cuántas horas por día?

Generalmente se indica primero solo durante el sueño (8-10 hs). A medida que la enfermedad avanza, el médico puede indicar también uso diurno parcial o continuo.

Equipo de elección para ELA:

BiPAP con frecuencia respiratoria de respaldo (FR): esencial porque garantiza un número mínimo de respiraciones por minuto aunque el paciente no inicie el ciclo inspiratorio.

• BiPAP BMC G3 con FR y humidificador — $1.300.000 · U$S 907
• STELLAR 150 RESMED con humidificador y batería — U$S 7.342 (etapas avanzadas)

Adaptarse al BiPAP, paso a paso:

Sabemos que usar un BiPAP al principio puede generar incomodidad, miedo o rechazo. En Inser Salud te acompañamos con respeto y cercanía para que te sientas seguro. Vamos de a poco, sin apuros.

💬 Estamos para ayudarte. 🤝 No estás solo. 🌙 Respirar bien también es vivir mejor.`,
                link: 'https://wa.me/5493512065320?text=Hola, quiero información sobre BiPAP con frecuencia respiratoria para ELA',
                linkText: 'Consultá el BiPAP para ELA →',
            },
            {
                id: 'acompanamiento',
                title: 'Acompañamiento Integral: No estás solo',
                content: `El abordaje integral salva vidas en ELA. El seguimiento periódico, los estudios funcionales en domicilio, la educación de la familia y el acceso temprano a equipos como el Cough Assist o el BiPAP hacen la diferencia.

En Inser Salud ofrecemos:

✅ Evaluaciones respiratorias gratuitas para pacientes con ELA y enfermedades neuromusculares
✅ Asesoramiento personalizado para la elección del equipo correcto según la etapa de la enfermedad
✅ Entrega e instalación del equipo en domicilio
✅ Capacitación al paciente y la familia en el uso del Cough Assist y BiPAP
✅ Seguimiento durante los primeros días de adaptación
✅ Alquiler disponible (ideal para comenzar antes de decidir la compra)

En enfermedades neuromusculares, saber cuándo comenzar a ventilar puede ser determinante. La falta de aire muchas veces no se nota… hasta que es tarde.

🤝 Estamos para acompañarte en cada etapa.`,
                link: 'https://wa.me/5493512065320?text=Hola, tengo ELA y necesito información sobre evaluación respiratoria y equipamiento. ¿Me pueden ayudar?',
                linkText: 'Hablar con un asesor →',
            },
        ],

        products: [
            {
                name: 'COUGH ASSIST — Asistente de Tos',
                priceARS: null,
                priceUSD: 'U$S 9.084',
                img: '/artifacts/cough_assist.jpg',
                badge: 'ESENCIAL',
                desc: 'Asistente mecánico de tos. Previene neumonías en ELA.',
            },
            {
                name: 'BiPAP BMC G3 (con FR y humidificador)',
                priceARS: '$1.300.000',
                priceUSD: 'U$S 907',
                img: '/artifacts/bipap_bmc_g3.jpg',
                badge: null,
                desc: 'Con frecuencia respiratoria de respaldo. Equipo de elección para ELA.',
            },
            {
                name: 'STELLAR 150 RESMED (con humidificador y batería)',
                priceARS: null,
                priceUSD: 'U$S 7.342',
                img: '/artifacts/stellar_150.jpg',
                badge: 'PREMIUM',
                desc: 'Ventilador de alta gama para etapas avanzadas de ELA.',
            },
            {
                name: 'Máscara Nasobucal DreamWear Philips',
                priceARS: '$229.000',
                priceUSD: 'U$S 157',
                img: '/artifacts/mascara_nasobucal_dreamwear.jpg',
                badge: null,
                desc: 'Interfaz nasobucal de mínimo contacto para BiPAP.',
            },
        ],

        tips: [
            'El seguimiento respiratorio debe comenzar antes de que aparezcan síntomas: no esperés a sentir ahogo.',
            'Realizá sesiones de Cough Assist diariamente según indicación médica para mantener limpias las vías aéreas.',
            'Registrá la saturación de oxígeno regularmente con un oxímetro de pulso, especialmente al despertar.',
            'La capnografía nocturna detecta hipoventilación aunque durante el día no sientas síntomas.',
            'Informá a la familia sobre el uso del Cough Assist: pueden ayudar de forma segura en domicilio.',
            'Iniciá la VNI lo antes que indique tu médico: no esperés la crisis respiratoria.',
            'El BiPAP con frecuencia respiratoria de respaldo es el equipo de elección para ELA: no cualquier BiPAP sirve.',
            'Consultá en Inser Salud: hacemos evaluaciones respiratorias gratuitas para pacientes con ELA.',
        ],

        alertText: 'En Inser Salud realizamos evaluaciones respiratorias gratuitas para pacientes con ELA y enfermedades neuromusculares.',
        alertCta: 'Solicitar evaluación →',

        testimonials: [
            { name: 'Familia de Carlos R.', city: 'Córdoba', text: 'El equipo de Inser Salud nos enseñó a usar el Cough Assist en casa. La tranquilidad que nos da es invaluable.', stars: 5 },
            { name: 'Juan P.', city: 'Córdoba', text: 'Excelente atención. Los dispositivos son de alta calidad y el seguimiento fue clave para adaptarse al BiPAP.', stars: 5 },
        ],

        relatedLinks: [],

        santiMessage: 'Hola Santi, tengo ELA y necesito información sobre el Asistente de Tos (Cough Assist) y BiPAP con frecuencia respiratoria para enfermedades neuromusculares. ¿Qué equipos tienen y cuáles son los precios?',
        moreInfoUrl: '',
    },

    /* ─────────────────────────────────────────────────────────────────
       5. ATROFIA MUSCULAR ESPINAL (AME)
       Fuentes: /atrofia-muscular-espinal  /neuromusculares  /tienda
    ───────────────────────────────────────────────────────────────── */
    {
        slug: 'atrofia-muscular-espinal',
        faq: [
            { q: '¿Qué equipamiento respiratorio se usa en la AME?', a: 'Habitualmente ventilación no invasiva tipo BiPAP con frecuencia de respaldo y asistente de tos para el manejo de secreciones. En pacientes pediátricos se suman máscaras de tamaño adecuado. Todo el esquema lo define el equipo médico tratante.' },
            { q: '¿Tienen máscaras pediátricas?', a: 'Sí. Contamos con máscaras nasales pediátricas y kits neonatales de distintas tallas. La elección de la interfaz es clave para la tolerancia al tratamiento, así que te asesoramos según la edad y la anatomía del paciente.' },
            { q: '¿Hacen entrega e instalación a domicilio?', a: 'En Córdoba sí: llevamos el equipo, lo instalamos y capacitamos a la familia o al cuidador en el uso seguro. Al resto del país enviamos con instrucciones y soporte por WhatsApp.' },
            { q: '¿Qué pasa si el equipo falla?', a: 'Todos los equipos son aparatología aprobada por ANMAT y tienen 2 años de garantía oficial. Ante cualquier problema podés escribirnos por WhatsApp; respondemos todos los días.' },
        ],
        title: 'Atrofia Muscular Espinal',
        metaTitle: 'ATROFIA MUSCULAR ESPINAL | INSER SALUD',
        headline: 'Soporte ventilatorio especializado para AME en todas sus etapas',
        subtitle: 'BiPAP, asistentes de tos y máscaras pediátricas y de adultos. Seguimiento profesional para cada tipo y etapa de la enfermedad.',
        color: '#be185d',
        colorLight: '#fce7f3',
        heroImg: '/artifacts/hero_ame.jpg',

        intro: 'La AME es una enfermedad genética que afecta las neuronas motoras, debilitando progresivamente los músculos. Más del 80% de las complicaciones graves en AME son de origen respiratorio y evitables con un buen seguimiento.',

        description: 'La Atrofia Muscular Espinal (AME) es una enfermedad genética caracterizada por la degeneración progresiva de las neuronas motoras de la médula espinal, lo que provoca debilidad muscular progresiva incluyendo los músculos respiratorios. El soporte respiratorio es fundamental desde edades tempranas y debe adaptarse continuamente a cada tipo de AME (1, 2 o 3) y a cada etapa.',

        sections: [
            {
                id: 'tipos-ame',
                title: 'Tipos de AME y Compromiso Respiratorio',
                content: `La Atrofia Muscular Espinal se clasifica en 4 tipos según la edad de inicio y el nivel de función motora:

🔴 AME Tipo 1 (forma grave, inicio antes de los 6 meses):
• Debilidad muscular severa desde el nacimiento
• Incapacidad para sentarse sin apoyo
• Compromiso respiratorio severo y precoz: requiere ventilación desde los primeros meses de vida
• Alta mortalidad sin tratamiento antes de los 2 años
• Tratamiento actual con Nusinersen, Onasemnogene o Risdiplam cambia el pronóstico

🟠 AME Tipo 2 (inicio entre 6-18 meses):
• Puede sentarse pero no camina
• Compromiso respiratorio progresivo, especialmente durante el sueño
• Requiere VNI nocturna y en muchos casos Cough Assist
• Alta escoliosis que agrava el compromiso pulmonar

🟡 AME Tipo 3 (inicio después de los 18 meses):
• Puede caminar (aunque algunos pierden la marcha con los años)
• Compromiso respiratorio más tardío y variable
• Requiere seguimiento respiratorio periódico

⚠️ En todos los tipos de AME, el compromiso respiratorio es la principal causa de complicaciones y muerte. Más del 80% de los eventos graves son prevenibles con seguimiento y equipamiento adecuado.`,
                link: 'https://wa.me/5493512065320?text=Hola, quisiera información sobre soporte respiratorio para AME',
                linkText: 'Consultá con nuestro equipo →',
            },
            {
                id: 'evaluacion',
                title: 'Evaluación Respiratoria en AME: Cuándo y Cómo',
                content: `El seguimiento respiratorio debe iniciarse tempranamente en AME, incluso antes de síntomas evidentes. Los parámetros clave son:

🫁 Capacidad Vital Forzada (CVF):
• CVF < 50% del predicho → indicación de asistencia ventilatoria
• Diferencia sentado/acostado > 20% → debilidad diafragmática significativa (evaluar VNI nocturna incluso con CVF > 50%)

💨 Pico de Flujo de Tos (PCF):
• PCF > 270 L/min: tos efectiva (zona segura)
• PCF 160–270 L/min: zona de riesgo, especialmente durante infecciones
• PCF < 160 L/min: tos insuficiente → indicación de Cough Assist

💪 Presiones respiratorias:
• PIMAX < 60 cmH₂O: debilidad inspiratoria significativa
• PEMAX < 80 cmH₂O: tos ineficaz

🌙 Oximetría nocturna:
• Desaturaciones SpO₂ < 90% más del 5% del tiempo de sueño → indicación de VNI nocturna

En Inser Salud realizamos evaluaciones respiratorias gratuitas para pacientes con AME y sus familias. Detectar la debilidad a tiempo permite iniciar el soporte antes de la crisis.`,
                link: 'https://wa.me/5493512065320?text=Hola, quisiera información sobre evaluación respiratoria gratuita para AME',
                linkText: 'Solicitar evaluación gratuita →',
            },
            {
                id: 'vni-ame',
                title: 'Ventilación No Invasiva (BiPAP) para AME',
                content: `El BiPAP es el principal soporte ventilatorio en AME. Asiste la respiración durante el sueño y, en etapas avanzadas, también durante el día.

¿Cuándo iniciar el BiPAP en AME?

• AME Tipo 1: desde los primeros meses, según indicación del neuropediatra y neumonólogo
• AME Tipo 2 y 3: cuando CVF < 50%, PCF < 270, o hay síntomas de hipoventilación nocturna

Equipos disponibles en Inser Salud:

BiPAP BMC G3 con frecuencia respiratoria y humidificador:
• Precio: $1.300.000 · U$S 907
• La frecuencia respiratoria de respaldo garantiza ventilación mínima aunque el paciente no inicie el ciclo
• Fundamental para AME tipo 1 y 2

Modalidades de ventilación disponibles:
• BiPAP S: responde a los esfuerzos del paciente
• BiPAP S/T: responde + frecuencia de respaldo
• BiPAP T: controlado (para casos muy avanzados)

Máscaras para AME (pediátricas y adultos):
• Nasales: DreamWear, BMC N4/N5a, HSINER Cirri Mini (pediátrica)
• Nasobucales: DreamWear Full Face, BMC F6, AirFit F30
• Elección según la edad, talla y tolerancia del paciente

Trabajamos junto al equipo médico tratante para adaptar los parámetros de ventilación a cada paciente y cada etapa.`,
                link: 'https://wa.me/5493512065320?text=Hola, quiero información sobre BiPAP para AME. ¿Tienen opciones pediátricas y de adultos?',
                linkText: 'Consultá el BiPAP para AME →',
            },
            {
                id: 'cough-assist-ame',
                title: 'Asistente de Tos (Cough Assist) en AME',
                content: `La tos ineficaz es una de las complicaciones más peligrosas en AME. Cuando los músculos espiratorios son débiles (PEMAX < 80 cmH₂O o PCF < 270 L/min), la tos pierde efectividad y las secreciones se acumulan, facilitando las neumonías.

El Cough Assist (Asistente Mecánico de Tos) genera una tos artificial efectiva:

Fase 1 — Insuflación: el equipo llena los pulmones de aire (presión positiva)
Fase 2 — Exuflación: el equipo extrae el aire rápidamente (presión negativa), simulando la tos

Indicaciones en AME:
• PCF < 160 L/min: indicación absoluta
• PCF 160–270 L/min: indicación relativa, especialmente durante infecciones respiratorias
• Incapacidad de toser eficazmente en cualquier etapa

Cómo usarlo en casa:

El Cough Assist puede usarlo la familia en domicilio con entrenamiento previo. En Inser Salud capacitamos a familiares y cuidadores en el momento de la entrega del equipo, con seguimiento posterior.

Frecuencia de uso: según indicación médica, generalmente 2-3 sesiones/día de 5 ciclos cada una. En infecciones respiratorias, puede aumentarse la frecuencia.

Precio referencia: U$S 9.084`,
                link: 'https://wa.me/5493512065320?text=Hola, quiero consultar sobre el Asistente de Tos Cough Assist para AME',
                linkText: 'Consultá el Cough Assist →',
            },
            {
                id: 'mascaras-ame',
                title: 'Máscaras Pediátricas y de Adultos para BiPAP',
                content: `La elección correcta de la máscara es fundamental para la adherencia al tratamiento, especialmente en niños pequeños con AME tipo 1.

Máscaras pediátricas disponibles:

👶 HSINER Cirri Mini — Máscara nasal pediátrica
• Precio: U$S 144
• Talles XS, S, M, L para niños desde recién nacidos
• Diseño ergonómico adaptado al rostro pediátrico
• Máxima comodidad para uso continuo

🦒 Máscara Philips Wisp pediátrica (jirafa)
• Precio: U$S 227
• Diseño lúdico para facilitar la aceptación en niños
• Talles infantiles

Máscaras de adultos para AME tipo 2 y 3:

👃 Nasales: DreamWear (mínimo contacto), BMC N4, BMC N5a, RESMED AirFit N20
😮 Nasobucales: DreamWear Full Face, BMC F6, RESMED AirFit F20/F30
🌟 DreamWear (mínimo contacto nasal): U$S 153

Importante: si la máscara actual no es cómoda, hay muchas alternativas. Contamos con la mayor variedad de interfaces de Córdoba. El incumplimiento del tratamiento muchas veces se debe a una máscara inadecuada.`,
                link: 'https://wa.me/5493512065320?text=Hola, necesito máscaras para BiPAP para AME. ¿Tienen opciones pediátricas?',
                linkText: 'Consultá sobre máscaras →',
            },
        ],

        products: [
            {
                name: 'BiPAP BMC G3 (con FR y humidificador)',
                priceARS: '$1.300.000',
                priceUSD: 'U$S 907',
                img: '/artifacts/bipap_bmc_g3.jpg',
                badge: null,
                desc: 'Con frecuencia respiratoria de respaldo. Ideal para AME tipos 1 y 2.',
            },
            {
                name: 'COUGH ASSIST — Asistente de Tos',
                priceARS: null,
                priceUSD: 'U$S 9.084',
                img: '/artifacts/cough_assist.jpg',
                badge: 'ESENCIAL',
                desc: 'Asistente mecánico de tos. Previene neumonías en AME.',
            },
            {
                name: 'Máscara Nasal DreamWear (talles S/M/L)',
                priceARS: '$223.000',
                priceUSD: 'U$S 153',
                img: '/artifacts/mascara_nasal_dreamwear.jpg',
                badge: null,
                desc: 'Comodidad máxima para uso nocturno continuo.',
            },

            {
                name: 'Máscara Nasobucal DreamWear Philips',
                priceARS: '$229.000',
                priceUSD: 'U$S 157',
                img: '/artifacts/mascara_nasobucal_dreamwear.jpg',
                badge: null,
                desc: 'Para pacientes que prefieren cobertura nasobucal.',
            },
        ],

        tips: [
            'Iniciá el soporte ventilatorio según indicación médica: no esperés síntomas graves para comenzar.',
            'Las máscaras nasales pediátricas suelen ser mejor toleradas en niños pequeños con AME tipo 1.',
            'Chequeá el oxímetro regularmente, especialmente al despertar: la hipoventilación nocturna es silenciosa.',
            'La posición correcta para dormir (semi-incorporado o lateral) mejora la eficacia de la ventilación.',
            'Informá a la familia sobre el uso del Cough Assist y el BiPAP: el entrenamiento es fundamental.',
            'Llevá el equipo documentado al médico en cada control: los datos de la máquina son valiosos para ajustar parámetros.',
            'Revisá periódicamente el estado de las correas y el sellado de la máscara: los escapes reducen la eficacia.',
            'Consultá en Inser Salud: hacemos evaluaciones respiratorias gratuitas para pacientes con AME.',
        ],

        alertText: 'En Inser Salud realizamos evaluaciones respiratorias gratuitas para pacientes con AME. Detectar a tiempo marca la diferencia.',
        alertCta: 'Solicitar evaluación →',

        testimonials: [
            { name: 'Familia de Sofía M.', city: 'Córdoba', text: 'La máscara pediátrica que nos recomendaron fue un cambio total. Sofía duerme mucho mejor y sin incomodidades.', stars: 5 },
            { name: 'María G.', city: 'Villa María', text: 'El acompañamiento de Inser Salud fue excepcional. Nos enseñaron todo sobre el Cough Assist y el BiPAP con mucha paciencia.', stars: 5 },
        ],

        relatedLinks: [],

        santiMessage: 'Hola Santi, necesito equipos para Atrofia Muscular Espinal (AME). ¿Qué BiPAP, máscaras y Cough Assist tienen disponibles? ¿Trabajan con pediátrico también?',
        moreInfoUrl: '',
    },

    /* ─────────────────────────────────────────────────────────────────
       6. PARÁLISIS CEREBRAL
       Fuentes: /paralisis-cerebral  /tienda  /servicios
    ───────────────────────────────────────────────────────────────── */
    {
        slug: 'paralisis-cerebral',
        faq: [
            { q: '¿Qué equipos respiratorios se usan en parálisis cerebral?', a: 'Depende del grado de compromiso respiratorio. Los más frecuentes son la ventilación no invasiva tipo BiPAP y el asistente de tos cuando hay dificultad para movilizar secreciones. La indicación siempre proviene del equipo médico tratante.' },
            { q: '¿Tienen máscaras para niños?', a: 'Sí, contamos con máscaras nasales pediátricas en varias tallas y kits neonatales. Una interfaz bien elegida mejora mucho la tolerancia del paciente al tratamiento.' },
            { q: '¿Alquilan equipos en Córdoba?', a: 'Sí, alquilamos equipos de ventilación y oxígeno con entrega e instalación a domicilio en Córdoba, incluyendo la capacitación de la familia o el cuidador.' },
            { q: '¿Me ayudan con el trámite de la obra social?', a: 'Sí. Trabajamos de forma particular y preparamos el presupuesto formal y la factura oficial para que puedas gestionar el reintegro con tu obra social o prepaga.' },
        ],
        title: 'Parálisis Cerebral',
        metaTitle: 'Información para Pacientes sobre Parálisis Cerebral | INSER SALUD',
        headline: 'Máscaras BiPAP y soporte ventilatorio para Parálisis Cerebral',
        subtitle: 'Gran variedad de máscaras para BiPAP en todos los talles. Ventilación no invasiva con acompañamiento personalizado y respeto en cada paso.',
        color: '#d97706',
        colorLight: '#fef3c7',
        heroImg: '/artifacts/hero_paralisis.jpg',

        intro: 'Los pacientes con parálisis cerebral frecuentemente requieren soporte ventilatorio con BiPAP y el uso de máscaras especiales. La elección correcta de la interfaz es tan importante como el equipo en sí. En Inser Salud contamos con la mayor variedad de máscaras de Córdoba, incluyendo opciones pediátricas.',

        description: 'Los pacientes con Parálisis Cerebral frecuentemente presentan compromiso de la musculatura respiratoria, tos ineficaz, alteraciones del sueño e hipoventilación. El soporte ventilatorio con BiPAP y las máscaras adecuadas mejoran significativamente su calidad de vida, la oxigenación nocturna y reducen el riesgo de complicaciones respiratorias.',

        sections: [
            {
                id: 'compromiso-respiratorio',
                title: 'Compromiso Respiratorio en Parálisis Cerebral',
                content: `La Parálisis Cerebral (PC) es una alteración permanente del movimiento y la postura debida a una lesión cerebral no progresiva. Sin embargo, aunque la lesión cerebral no avanza, sus consecuencias sobre el sistema respiratorio pueden empeorar con el tiempo.

Principales problemas respiratorios en PC:

🌙 Trastornos respiratorios del sueño:
• Apneas obstructivas y centrales frecuentes
• Hipoventilación nocturna
• Desaturaciones durante el sueño
• Sueño fragmentado y no reparador

💪 Debilidad muscular respiratoria:
• Tos ineficaz por debilidad de músculos espiratorios
• Mayor riesgo de neumonías aspirativas
• Dificultad para movilizar secreciones

🦴 Escoliosis y deformidades torácicas:
• Reducen la capacidad pulmonar
• Dificultan la mecánica ventilatoria
• Agravadas por la falta de actividad motora

🤢 Reflujo gastroesofágico y aspiración:
• Muy frecuente en PC con compromiso motor severo
• Causa importante de neumonías repetidas

¿Cuándo sospechar compromiso respiratorio?
• Ronquido o pausas respiratorias durante el sueño
• Hipersomnia diurna o irritabilidad
• Infecciones respiratorias frecuentes
• Tos débil o húmeda
• Dificultad para limpiar secreciones`,
                link: 'https://wa.me/5493512065320?text=Hola, necesito asesoramiento sobre BiPAP y soporte respiratorio para parálisis cerebral',
                linkText: 'Consultá con nuestro equipo →',
            },
            {
                id: 'mascaras-bipap',
                title: 'Máscaras para BiPAP — La Mayor Variedad de Córdoba',
                content: `Contamos con la mayor variedad de máscaras para BiPAP y CPAP de Córdoba. La elección correcta de la interfaz es fundamental: una máscara inadecuada puede arruinar el tratamiento aunque el equipo sea excelente.

👃 Máscaras Nasales (cubren solo la nariz):
• DreamWear Philips — Mínimo contacto — $223.000 · U$S 153
• BMC N4 — Diseño ergonómico — Consultá precio
• BMC N5a — Ultra-slim — Consultá precio
• RESMED AirFit N20 — Sellado silicona suave — Consultá precio
• YUWELL — Opción económica — Consultá precio

😮 Máscaras Nasobucales / Full-Face (cubren nariz y boca):
• DreamWear Full Face Philips — Mínimo contacto — $229.000 · U$S 157
• BMC F6 — Amplia visibilidad — Consultá precio
• RESMED AirFit F20 — Mayor sellado — Consultá precio
• RESMED AirFit F30 — Mínimo contacto nasobucal — Consultá precio
• YUWELL YF02 — Opción económica — Consultá precio

👶 Máscaras Pediátricas:
• HSINER Cirri Mini — Talles XS/S/M/L — U$S 105
• Máscara Philips Wisp pediátrica (jirafa) — Diseño infantil — U$S 227

💰 Opción económica:
• Máscara Nasal RESCOMF — $50.000 · U$S 35

Si la máscara que tenés no te resulta cómoda, o presenta escapes, presión en la piel o intolerancia, tenemos alternativas para encontrar la indicada.`,
                link: 'https://wa.me/5493512065320?text=Hola, necesito ayuda para elegir una máscara para BiPAP para parálisis cerebral. ¿Tienen opciones pediátricas?',
                linkText: 'Consultá sobre máscaras →',
            },
            {
                id: 'bipap-pc',
                title: 'Ventilación No Invasiva (BiPAP) en Parálisis Cerebral',
                content: `El BiPAP asiste la respiración nocturna y en períodos de mayor dificultad respiratoria. En Parálisis Cerebral, se utiliza principalmente para tratar:

• Hipoventilación nocturna
• Apneas obstructivas y centrales
• Hipercapnia (acumulación de CO₂)
• Insuficiencia respiratoria crónica por debilidad muscular o escoliosis severa

¿Cuándo iniciar el BiPAP?

Los criterios son similares a otras enfermedades que afectan la función respiratoria:
✅ SpO₂ < 90% más del 5% del tiempo de sueño (oximetría nocturna)
✅ Hipercarbia (CO₂ > 45 mmHg) en gasometría arterial
✅ Síntomas de hipoventilación: cefalea matutina, somnolencia, cansancio
✅ CVF < 50% del predicho en pacientes colaboradores

Equipo disponible:
• BiPAP BMC G3 con FR y humidificador — $1.300.000 · U$S 907
• Con frecuencia respiratoria de respaldo para mayor seguridad

Adaptarse al BiPAP, paso a paso:

Sabemos que adaptarse al BiPAP puede generar incomodidad al principio, especialmente en niños y pacientes con capacidades cognitivas limitadas. En Inser Salud te acompañamos con cuidado humano, paciencia y respeto para que logrés la mejor adaptación posible.

🤝 No estás solo en este proceso.`,
                link: 'https://wa.me/5493512065320?text=Hola, quiero información sobre BiPAP para parálisis cerebral. ¿Cuáles son los precios?',
                linkText: 'Consultá el BiPAP →',
            },
            {
                id: 'adaptacion',
                title: 'Adaptación y Seguimiento Personalizado',
                content: `Acompañamos a pacientes y familias en todo el proceso de adaptación al equipo ventilatorio. Sabemos que cada paciente con Parálisis Cerebral es diferente: lo que funciona para uno puede no funcionar para otro. Por eso, nos tomamos el tiempo necesario.

Nuestro proceso de acompañamiento:

✅ Entrega del equipo listo para usar, con la configuración indicada por el médico
✅ Explicación detallada a la familia y/o cuidadores sobre el uso correcto
✅ Capacitación en colocación y ajuste de la máscara
✅ Seguimiento durante los primeros días: respondemos consultas y ajustamos si es necesario
✅ Ajuste de parámetros según indicación médica del especialista
✅ Soporte ante cualquier inconveniente técnico o de adaptación

Adaptarse al BiPAP, paso a paso:

Semana 1: probá el equipo durante el día, sin dormir, 1 hora. Familiarizarse con la sensación.
Semana 2: comenzá a usarlo al dormirte. No importa si lo sacás durante la noche.
Semana 3-4: extendé el uso gradualmente.
Objetivo: uso de 6-8 horas nocturnas según indicación.

Para niños con PC, la tolerancia inicial puede requerir más tiempo y estrategias especiales. Consultanos sin compromiso.

🤝 No estás solo. Estamos para ayudarte en cada paso.`,
                link: 'https://wa.me/5493512065320?text=Hola, necesito asesoramiento sobre adaptación al BiPAP para parálisis cerebral. ¿Pueden ayudarme?',
                linkText: 'Hablar con un asesor →',
            },
            {
                id: 'cough-assist-pc',
                title: 'Asistente de Tos en Parálisis Cerebral',
                content: `Muchos pacientes con Parálisis Cerebral presentan tos débil o ineficaz, especialmente aquellos con mayor compromiso motor o escoliosis severa. La acumulación de secreciones en el árbol bronquial es la principal causa de neumonías repetidas.

¿Cómo saber si la tos es insuficiente?

• Tos húmeda que no logra eliminar las secreciones
• PCF (Pico de Flujo de Tos) < 160 L/min
• PEMAX < 80 cmH₂O
• Historia de neumonías frecuentes

El Asistente de Tos (Cough Assist) genera una tos artificial efectiva mediante:
1. Insuflación a presión positiva (llena los pulmones)
2. Exuflación a presión negativa (vacía rápidamente los pulmones)
3. Las secreciones suben y se pueden eliminar fácilmente

Beneficios en PC:
✅ Reduce internaciones por neumonía
✅ Mejora la saturación de oxígeno
✅ Puede usarlo la familia en domicilio con entrenamiento
✅ Mejora el bienestar general del paciente

Precio referencia: U$S 9.084
Consultanos disponibilidad y opciones de financiación.`,
                link: 'https://wa.me/5493512065320?text=Hola, quiero información sobre el Asistente de Tos para parálisis cerebral',
                linkText: 'Consultá el Cough Assist →',
            },
        ],

        products: [
            {
                name: 'BiPAP BMC G3 (con FR y humidificador)',
                priceARS: '$1.300.000',
                priceUSD: 'U$S 907',
                img: '/artifacts/bipap_bmc_g3.jpg',
                badge: null,
                desc: 'Con frecuencia respiratoria de respaldo y humidificador.',
            },
            {
                name: 'Máscara Nasal DreamWear (mínimo contacto)',
                priceARS: '$223.000',
                priceUSD: 'U$S 153',
                img: '/artifacts/mascara_nasal_dreamwear.jpg',
                badge: null,
                desc: 'La más cómoda para uso nocturno continuo.',
            },
            {
                name: 'Máscara Nasobucal DreamWear Philips',
                priceARS: '$229.000',
                priceUSD: 'U$S 157',
                img: '/artifacts/mascara_nasobucal_dreamwear.jpg',
                badge: null,
                desc: 'Full-face de mínimo contacto.',
            },
            {
                name: 'Máscara Nasal RESCOMF CPAP/BIPAP',
                priceARS: '$50.000',
                priceUSD: 'U$S 35',
                img: '/artifacts/mascara_rescomf.jpg',
                badge: 'OFERTA',
                desc: 'La opción más accesible del mercado.',
            },

            {
                name: 'Máscara Nasal Philips Wisp pediátrica (jirafa)',
                priceARS: null,
                priceUSD: 'U$S 227',
                img: '/artifacts/mascara_nasal_dreamwear.jpg',
                badge: 'PEDIÁTRICO',
                desc: 'Diseño adaptado para niños. Philips Wisp, la de la jirafa.',
            },
            {
                name: 'COUGH ASSIST — Asistente de Tos',
                priceARS: null,
                priceUSD: 'U$S 9.084',
                img: '/artifacts/cough_assist.jpg',
                badge: 'ESENCIAL',
                desc: 'Para pacientes con PC y tos ineficaz.',
            },
        ],

        tips: [
            'Probá diferentes modelos de máscara para encontrar la más cómoda: tenemos la mayor variedad de Córdoba.',
            'Comenzá con sesiones cortas de BiPAP durante el día para familiarizarte antes de usarlo toda la noche.',
            'Mantené el equipo limpio y revisá el ajuste de las correas regularmente: ni muy floja ni muy apretada.',
            'Consultá ante cualquier signo de intolerancia: enrojecimiento, escapes excesivos o molestias en la piel.',
            'Llevá siempre el oxímetro para monitorear la saturación durante la noche.',
            'La posición correcta (semi-incorporado o decúbito lateral) mejora la eficacia de la ventilación.',
            'En niños, la aceptación del equipo requiere tiempo y paciencia: consultanos para estrategias de adaptación.',
            'Si hay infecciones respiratorias frecuentes, consultá sobre el Asistente de Tos (Cough Assist).',
        ],

        alertText: 'Tenemos la mayor variedad de máscaras BiPAP de Córdoba, incluyendo opciones pediátricas. Entrega inmediata.',
        alertCta: 'Ver máscaras disponibles →',

        testimonials: [
            { name: 'Familia de Lucía R.', city: 'Córdoba', text: 'El equipo de Inser Salud nos acompañó en todo el proceso con mucha dedicación y paciencia. La máscara pediátrica fue un cambio total.', stars: 5 },
            { name: 'María G.', city: 'Córdoba', text: 'Inmenso el catálogo de máscaras. Encontramos la indicada para mi hijo después de probar varias opciones sin cargo.', stars: 5 },
        ],

        relatedLinks: [],

        santiMessage: 'Hola Santi, necesito información sobre BiPAP y máscaras para parálisis cerebral. ¿Qué opciones tienen disponibles, incluyendo pediátricas? ¿Cuáles son los precios?',
        moreInfoUrl: '',
    },
];

export const getPathologyBySlug = (slug) => pathologies.find(p => p.slug === slug);
