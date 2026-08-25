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
        slug: 'alquiler-equipos-respiratorios-cordoba',
        formularioEquipos: true,
        h1: 'Alquiler de equipos respiratorios en Córdoba',
        metaTitle: 'Alquiler de Equipos Respiratorios en Córdoba | Entrega e Instalación | INSER SALUD',
        metaTitleSalud: 'Alquiler de Equipos Respiratorios en Córdoba | INSER SALUD',
        description: 'Alquilá oxígeno, CPAP, BiPAP, ventilador o asistente de tos en Córdoba, con entrega e instalación a domicilio. Decinos qué te indicó tu médico y te cotizamos el mismo día por WhatsApp.',
        heroImg: '/artifacts/products/concentrador_bmc_1.jpg',
        intro: 'Alquilamos equipos de terapia respiratoria en Córdoba con entrega e instalación a domicilio. Elegí abajo qué te indicó tu médico y te pasamos la cotización el mismo día por WhatsApp. No necesitás saber de marcas ni modelos: con la indicación alcanza.',
        ctaSanti: 'Hola Santi, quiero alquilar un equipo respiratorio en Córdoba. ¿Cómo es el alquiler?',
        sections: [
            {
                title: 'Qué equipos alquilamos',
                content: 'Alquilamos toda la línea de terapia respiratoria domiciliaria: concentradores de oxígeno fijos y portátiles, mochilas y tubos de oxígeno, CPAP y AutoCPAP para apnea del sueño, BiPAP y ventilación no invasiva, ventiladores domiciliarios y asistente de tos (Cough Assist).\n\nTambién alquilamos los insumos que acompañan a cada equipo: máscaras, tubuladuras y repuestos.\n\nSi no sabés cuál te corresponde, marcá "No estoy seguro" y te orientamos.',
            },
            {
                title: 'Cuándo conviene alquilar en lugar de comprar',
                content: 'Alquilar conviene cuando el uso es por tiempo definido: después de una internación, en un post operatorio, o mientras se define el tratamiento definitivo.\n\nTambién es la mejor forma de probar un equipo antes de decidir la compra, sobre todo en apnea del sueño, donde la adaptación es lo que define si el tratamiento funciona.\n\nY si el tratamiento resulta ser de largo plazo, en algún momento la compra se vuelve más conveniente que seguir pagando el alquiler. Te lo decimos con honestidad cuando llegue ese punto.',
            },
            {
                title: 'No te entregamos una caja',
                content: 'Tu equipo llega configurado según la indicación de tu médico (presión, flujo, modo), listo para usar desde la primera noche. No tenés que aprender a programarlo ni adivinar valores.\n\nLa instalación la hace personal profesional especializado, que te explica cómo usarlo, cómo limpiarlo y qué esperar los primeros días. Te quedás con el equipo funcionando y sabiendo usarlo, no con un manual.\n\nEsto vale tanto si comprás como si alquilás. Es la diferencia entre recibir un aparato y empezar un tratamiento.',
            },
            {
                title: 'Cómo es el proceso',
                content: 'Nos escribís por WhatsApp o completás el formulario de esta página con lo que te indicó tu médico. Te pasamos la cotización el mismo día, con el valor del alquiler y qué incluye.\n\nCuando confirmás, coordinamos la entrega en tu domicilio en Córdoba, normalmente en el día. Ahí se instala el equipo, se configura y te enseñamos a usarlo.\n\nRecién al cerrar la operación te pedimos los datos para la entrega. Para cotizar no necesitás mandar DNI ni dirección.',
            },
            {
                title: 'Probalo un mes antes de comprarlo',
                content: 'Si alquilás un CPAP o un AutoCPAP y después decidís comprarlo, ese primer mes de alquiler te lo descontamos del precio de venta.\n\nEs la forma de empezar el tratamiento sin la inversión completa de entrada, y sin perder lo que ya pagaste. Aplica a CPAP y AutoCPAP.',
            },
        ],
        products: [
            { name: 'Concentrador de oxígeno (fijo o portátil)', price: 'consultar alquiler' },
            { name: 'CPAP y AutoCPAP', price: 'consultar alquiler' },
            { name: 'BiPAP y ventilación no invasiva', price: 'consultar alquiler' },
            { name: 'Ventilador domiciliario y asistente de tos', price: 'consultar alquiler' },
        ],
        faq: [
            { q: '¿Qué equipos se pueden alquilar?', a: 'Concentradores de oxígeno fijos y portátiles, mochilas y tubos de oxígeno, CPAP, AutoCPAP, BiPAP, ventiladores domiciliarios y asistente de tos. También los insumos que acompañan a cada equipo.' },
            { q: '¿Cuánto cuesta el alquiler?', a: 'Depende del equipo y del plazo. Completá el formulario de esta página o escribinos por WhatsApp y te pasamos la cotización el mismo día, sin compromiso.' },
            { q: '¿En cuánto tiempo lo entregan?', a: 'En Córdoba coordinamos la entrega e instalación a domicilio, normalmente en el día. La instalación la hace personal profesional especializado.' },
            { q: '¿Necesito indicación médica para alquilar?', a: 'Sí. El equipo se configura con los valores que indicó tu médico (presión, flujo o modo), así que necesitamos esa indicación para entregártelo listo para usar.' },
            { q: '¿Alquilan fuera de Córdoba?', a: 'El alquiler con entrega e instalación es en Córdoba. Al resto del país vendemos con envío: escribinos y te asesoramos sobre la mejor opción para tu caso.' },
            { q: '¿Qué pasa si el equipo falla durante el alquiler?', a: 'El soporte técnico está incluido durante todo el período de alquiler. Si el equipo presenta una falla, lo reemplazamos.' },
        ],
        related: [
            { label: 'Alquiler de CPAP en Córdoba', href: '/alquiler-cpap-cordoba' },
            { label: 'Alquiler de concentrador de oxígeno', href: '/alquiler-concentrador-oxigeno-cordoba' },
            { label: 'Oxígeno a domicilio en Córdoba', href: '/oxigeno-a-domicilio-cordoba' },
        ],
    },
    {
        slug: 'alquiler-cpap-cordoba',
        h1: 'Alquiler de CPAP en Córdoba',
        metaTitle: 'Alquiler de CPAP en Córdoba | Entrega a Domicilio en el Día | INSER SALUD',
        metaTitleSalud: 'Alquiler de CPAP a Domicilio en Córdoba | INSER SALUD',
        description: 'Alquilá un CPAP o AutoCPAP en Córdoba con entrega e instalación a domicilio en el día. Equipos aprobados por ANMAT, con máscara y humidificador incluidos, sin depósito y con soporte técnico. Consultá por WhatsApp.',
        heroImg: '/artifacts/products/resmed_airsense10_1.jpg',
        intro: '¿Necesitás un CPAP por un tiempo o querés probarlo antes de comprarlo? En INSER SALUD alquilamos CPAP y AutoCPAP en Córdoba con entrega e instalación a domicilio en el día. Equipos aprobados por ANMAT, con máscara, humidificador y soporte técnico incluidos.',
        ctaSanti: 'Hola Santi, quiero alquilar un CPAP en Córdoba. ¿Cómo es el alquiler y cuánto cuesta por mes?',
        sections: [
            {
                title: '¿Cómo funciona el alquiler de CPAP?',
                content: 'Coordinamos la entrega del equipo en tu domicilio en Córdoba, normalmente en el día. Te instalamos el CPAP, ajustamos la presión según tu indicación médica y te explicamos el uso y la limpieza.\n\nEl alquiler es por mes, sin depósito y con soporte técnico incluido durante todo el período. Si el equipo presenta alguna falla, lo reemplazamos.',
            },
            {
                title: '¿Para quién es el alquiler?',
                content: 'El alquiler de CPAP es ideal para quienes fueron diagnosticados recién y quieren empezar el tratamiento sin la inversión inicial, para quienes desean probar el equipo antes de comprarlo, para uso temporal (post-internación o post-operatorio) y para quienes viajan a Córdoba por un período.',
            },
            {
                title: '¿Qué incluye?',
                content: 'El alquiler incluye el equipo CPAP o AutoCPAP, la [máscara (nasal o nasobucal según tu caso)](/mascaras-cpap), el humidificador, la tubuladura, la instalación a domicilio y el seguimiento. Aparatología aprobada por ANMAT. Si más adelante querés comprar tu propio equipo, te asesoramos para pasar de alquiler a compra.',
            },
            {
                title: 'Los primeros días con el equipo',
                content: 'Es normal que las primeras noches cuesten. Casi nadie duerme perfecto la primera vez que usa un CPAP, y eso no significa que el tratamiento no sirva.\n\nLo más común al principio es sentir el aire fuerte al empezar, despertarse con la boca seca, o que la máscara marque un poco la cara. Las tres cosas se resuelven ajustando: el humidificador para la sequedad, el arnés para las marcas, y la función de rampa para que la presión suba de a poco mientras te dormís.\n\nPor eso la instalación la hacemos en tu casa y no te dejamos el equipo en una caja. Si a los pocos días algo no te cierra, escribinos: la mayoría de los problemas se arreglan con un ajuste, no cambiando de equipo.',
            },
            {
                title: 'Alquilar o comprar: cuándo conviene cada uno',
                content: 'Alquilar conviene si recién te diagnosticaron y querés empezar el tratamiento sin desembolsar todo de una, si el uso es por un tiempo definido (después de una internación o una cirugía), o si querés probar cómo te adaptás antes de decidir.\n\nComprar conviene cuando la indicación es de largo plazo. La apnea del sueño es una condición crónica: si vas a usar el equipo todas las noches durante años, en algún momento la compra se vuelve más conveniente que seguir pagando el alquiler.\n\nEscribinos y vemos tu caso: no te vamos a empujar a la compra si el alquiler te sirve más.',
            },
            {
                title: 'La higiene del equipo',
                content: 'Un CPAP bien cuidado dura años, y la rutina es simple.\n\nLa máscara se limpia con agua y jabón neutro, y conviene hacerlo seguido porque está en contacto con la piel. El humidificador se llena solo con agua destilada, nunca de la canilla, porque el sarro daña el equipo. La tubuladura se lava y se cuelga a secar.\n\nCuando te entregamos el equipo te mostramos todo esto en tu casa.',
            },
            {
                title: 'No te entregamos una caja',
                content: 'Tu equipo llega configurado según la indicación de tu médico (presión, flujo, modo), listo para usar desde la primera noche. No tenés que aprender a programarlo ni adivinar valores.\n\nLa instalación la hace personal profesional especializado, que te explica cómo usarlo, cómo limpiarlo y qué esperar los primeros días. Te quedás con el equipo funcionando y sabiendo usarlo, no con un manual.\n\nEsto vale tanto si comprás como si alquilás. Es la diferencia entre recibir un aparato y empezar un tratamiento.',
            },
            {
                title: 'Probalo un mes antes de comprarlo',
                content: 'Si no estás seguro de cómo te vas a adaptar, alquilá el equipo y probalo en tu casa.\n\nSi después decidís comprarlo, ese primer mes de alquiler te lo descontamos del precio de venta. Aplica a CPAP y AutoCPAP.\n\nEs la forma de empezar el tratamiento sin la inversión completa de entrada, y sin perder lo que ya pagaste.',
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
            { q: '¿Entregan a domicilio?', a: 'Sí, hacemos entrega e instalación a domicilio en Córdoba Capital y alrededores, normalmente en el día.' },
            { q: '¿Puedo comprar el equipo después de alquilarlo?', a: 'Sí. Vendemos equipos nuevos aprobados por ANMAT y te asesoramos para pasar del alquiler a la compra cuando quieras.' },
            { q: '¿Necesito estudio del sueño para alquilar?', a: 'Sí, hace falta la indicación médica: el equipo se configura con la presión que definió tu médico a partir del estudio. Si todavía no lo hiciste, en Córdoba hacemos el [estudio del sueño a domicilio](/estudio-del-sueno-cordoba).' },
            { q: '¿Qué pasa si me voy de viaje?', a: 'El equipo es transportable y podés llevarlo. Avisanos si vas a viajar para orientarte con el traslado.' },
            { q: '¿Y si no me adapto al equipo?', a: 'Antes de entregártelo te asesoramos para elegir la máscara adecuada, que es donde está la mayoría de los problemas de adaptación. Si aun así necesitás cambiar de máscara, la nueva se cobra aparte, pero primero te ayudamos a ajustar la que tenés. Justamente para eso sirve alquilar antes de comprar.' },
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
            {
                title: 'No te entregamos una caja',
                content: 'Tu equipo llega configurado según la indicación de tu médico (presión, flujo, modo), listo para usar desde la primera noche. No tenés que aprender a programarlo ni adivinar valores.\n\nLa instalación la hace personal profesional especializado, que te explica cómo usarlo, cómo limpiarlo y qué esperar los primeros días. Te quedás con el equipo funcionando y sabiendo usarlo, no con un manual.\n\nEsto vale tanto si comprás como si alquilás. Es la diferencia entre recibir un aparato y empezar un tratamiento.',
            },
            {
                title: 'Qué significa "oxígeno 24 horas"',
                content: 'Cuando se habla de oxígeno 24 horas se mezclan dos cosas distintas, y conviene separarlas.\n\nUna es el equipo. Los concentradores estacionarios que entregamos están preparados para uso continuo las 24 horas del día: toman el aire del ambiente y de ahí extraen el oxígeno, así que no dependen de la recarga de un tubo ni hay que estar pendiente de que se termine.\n\nLa otra son las horas que te corresponde usarlo, y eso lo define tu médico según tus estudios. En oxigenoterapia domiciliaria la evidencia muestra que el tratamiento es efectivo cuando se usa un mínimo de 15 a 18 horas por día, idealmente todo el día: usarlo pocas horas no aporta los beneficios que demostraron los estudios.\n\nPor eso, cuando la indicación es de muchas horas, el concentrador suele ser la opción más práctica: produce oxígeno mientras está enchufado, sin costo de recarga.',
            },
            {
                title: 'Los litros por minuto son el dato que manda',
                content: 'En tu indicación médica hay un número que define qué equipo te corresponde: el flujo en litros por minuto.\n\nHasta 5 litros por minuto, el concentrador estacionario estándar cubre la mayoría de los casos de oxigenoterapia domiciliaria. El BMC que alquilamos entrega de 0,5 a 5 L/min con una pureza de oxígeno del 93% o superior, muestra en pantalla la pureza, el flujo y las horas de uso, y trae control remoto y medidor de oxígeno integrado.\n\nPor encima de 5 litros por minuto hace falta un equipo de alto flujo. El [concentrador Yuwell de 10 litros](/concentrador-oxigeno-10-litros) llega al doble del flujo del estacionario estándar; hoy lo publicamos en venta, así que si tu indicación supera los 5 L/min escribinos y vemos qué opción hay para tu caso.\n\nY hay una distinción que confunde seguido: los dos portátiles que figuran en esta página, el KINGON P2-S3 y el GCE Zen-O, entregan el oxígeno a pulso, es decir una bocanada por cada inspiración. Si tu indicación es de flujo continuo, un equipo a pulso no lo reemplaza; para eso está el Philips SimplyGo, que entrega flujo continuo de 0,5 a 2 L/min además del modo pulso. Podés ver los modelos en [concentrador de oxígeno portátil en Córdoba](/concentrador-oxigeno-portatil-cordoba), o mandarnos la indicación por WhatsApp y te confirmamos qué equipo cumple.',
            },
            {
                title: 'Qué incluye el alquiler',
                content: 'El alquiler no es solo el equipo.\n\nIncluye la entrega y el retiro en tu domicilio en Córdoba Capital y gran Córdoba, y el soporte técnico durante todo el período de alquiler. Si el equipo presenta una falla, lo reemplazamos. No pedimos depósito.\n\nEl valor mensual depende del equipo y del plazo, así que lo cotizamos por WhatsApp: decinos qué flujo te indicaron y por cuánto tiempo lo vas a necesitar. Con eso alcanza para pasarte el precio; para cotizar no te pedimos DNI ni dirección.\n\nUna aclaración para que no haya malentendidos: el descuento del primer mes de alquiler a cuenta de la compra aplica a CPAP y AutoCPAP, no al alquiler de oxígeno.\n\nEl alquiler con entrega e instalación es un servicio de Córdoba. Al resto del país vendemos con envío, y te asesoramos igual para elegir el equipo.',
            },
            {
                title: 'Cómo es convivir con el concentrador en casa',
                content: 'El concentrador va a estar encendido muchas horas por día, así que conviene saber de antemano cómo es tenerlo en casa.\n\nConsume poca electricidad: se enchufa a la red eléctrica y podés usarlo todas las horas que te indicaron sin que se note en la factura. Y los estacionarios son lo bastante silenciosos como para usarlos en el dormitorio, que es donde suele usarse de noche.\n\nEl mantenimiento es simple: se limpia el filtro externo con agua y se deja secar, una vez por mes. Los filtros internos se cambian con menos frecuencia y te avisamos cuándo corresponde.\n\nLo único innegociable es la seguridad: no se fuma cerca del concentrador, porque el oxígeno es altamente inflamable. Eso vale para todos los que estén en la casa, no solo para el paciente.\n\nY si notás que tu saturación baja por debajo de lo habitual, avisale a tu médico. Nosotros te acompañamos con el equipo; la indicación es siempre suya.',
            },
        ],
        products: [
            { name: 'Concentrador de oxígeno BMC estacionario (control remoto + medidor de O₂)', price: 'también en venta $999.000' },
            { name: 'Concentrador portátil KINGON P2-S3 (apto vuelos)', price: 'consultar' },
            { name: 'Concentrador portátil GCE Zen-O (2 baterías + carro)', price: 'consultar' },
        ],
        faq: [
            { q: '¿Atienden las 24 horas? ¿Y si necesito oxígeno un fin de semana?', a: 'Respondemos consultas por WhatsApp todos los días, también fines de semana y fuera del horario comercial, así que podés escribirnos cuando lo necesites y coordinamos desde ese momento. Los concentradores que entregamos están preparados para uso continuo las 24 horas del día. La entrega e instalación en Córdoba las coordinamos con vos, normalmente en el día.' },
            { q: '¿Cuánto cuesta alquilar un concentrador de oxígeno en Córdoba?', a: 'Depende de si es fijo o portátil y del plazo. Escribinos por WhatsApp y te damos el valor mensual actualizado, con entrega e instalación incluidas.' },
            { q: '¿Entregan e instalan a domicilio?', a: 'Sí, hacemos entrega, instalación y capacitación de uso a domicilio en Córdoba Capital y alrededores.' },
            { q: '¿Necesito receta médica?', a: 'La oxigenoterapia se usa según indicación médica (flujo en litros por minuto). Te asesoramos para que el equipo cumpla con lo que indicó tu médico.' },
            { q: '¿Tienen concentradores portátiles para viajar?', a: 'Sí, tenemos concentradores portátiles con batería, algunos homologados para vuelos. Consultanos por el modelo.' },
            { q: '¿Cuántas horas por día tengo que usar el concentrador?', a: 'Lo define tu médico según tu saturación y tus estudios. Como referencia, la oxigenoterapia domiciliaria demostró beneficio cuando se usa un mínimo de 15 a 18 horas por día, idealmente todo el día: usarla pocas horas no aporta los beneficios que mostraron los estudios. Los concentradores que entregamos soportan cualquier esquema que te hayan indicado.' },
            { q: '¿Cuánta electricidad consume un concentrador de oxígeno?', a: 'Poca. Se enchufa a la red eléctrica de la casa y podés usarlo todas las horas que te indicaron sin que se note en la factura. Y a diferencia de un tubo, no tiene costo de recarga: produce el oxígeno del aire del ambiente mientras esté enchufado.' },
            { q: '¿Qué pasa si el equipo falla durante el alquiler?', a: 'El soporte técnico está incluido durante todo el período de alquiler. Si el equipo presenta una falla, lo reemplazamos: escribinos por WhatsApp y coordinamos el cambio. Respondemos consultas todos los días, también fines de semana y fuera del horario comercial.' },
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
                content: 'CPAP BMC G2S con humidificador: $499.000 (el más vendido, presión fija).\nAutoCPAP BMC G2S con humidificador: $630.000 (presión automática, más confort).\nCPAP ResMed AirSense 10: $799.000 (equipo completo, el CPAP de gama alta de nuestro catálogo).\nBiPAP BMC G3 con frecuencia respiratoria: U$S 907 (para EPOC y enfermedades neuromusculares).\n\nLos precios se actualizan; confirmá el valor del día por WhatsApp. También ofrecemos alquiler.',
            },
            {
                title: 'CPAP, AutoCPAP o BiPAP: ¿cuál te conviene?',
                content: 'El CPAP entrega una presión fija y continua: es el tratamiento estándar de la apnea del sueño. El AutoCPAP ajusta la presión automáticamente noche a noche, ofreciendo más comodidad. El BiPAP entrega dos presiones (una al inhalar y otra al exhalar) y se usa en EPOC, enfermedades neuromusculares e hipoventilación.\n\nTe ayudamos a elegir según lo que indicó tu médico y tu presión de tratamiento.',
            },
            {
                title: 'Garantía y respaldo',
                content: 'Los CPAP y AutoCPAP que vendemos son aparatología aprobada por ANMAT y declaran 2 años de garantía oficial. Incluimos asesoramiento para la adaptación, repuestos (máscaras, filtros, tubuladuras) y soporte técnico continuo en Córdoba.',
            },
            {
                title: 'Qué incluye el equipo cuando lo comprás',
                content: 'Cuando comprás un CPAP con nosotros no te llevás solo el motor. El equipo viene completo: la unidad, el humidificador, la tubuladura, la fuente de alimentación, la tarjeta de memoria y el bolso de traslado.\n\nLa máscara la elegimos juntos, porque es la pieza que define si el tratamiento funciona o no. Es donde más pacientes abandonan, y casi siempre es por una máscara mal elegida, no por el equipo.\n\nAdemás te configuramos la presión que indicó tu médico y te explicamos cómo usarlo. No entregamos equipos en una caja para que los descubras solo.',
            },
            {
                title: 'Cómo elegir la máscara',
                content: 'Hay tres tipos y la diferencia es concreta.\n\nLa NASAL cubre solo la nariz. Es la más usada, la más liviana y la que mejor toleran la mayoría.\n\nLa NASOBUCAL cubre nariz y boca. Es la indicada si dormís con la boca abierta o si tenés la nariz congestionada seguido.\n\nLas ALMOHADILLAS NASALES apoyan directamente en las fosas nasales. Son las de menor contacto con la cara, ideales si te sentís encerrado con las otras o si usás anteojos para leer en la cama.\n\nEl talle importa tanto como el tipo: una máscara del talle equivocado pierde aire y despierta. Contanos cómo dormís y te ayudamos a elegir el modelo y el talle correcto. Podés ver todas las opciones en [máscaras para CPAP y BiPAP](/mascaras-cpap).',
            },
            {
                title: 'Qué gastos vas a tener después de la compra',
                content: 'Te lo decimos de entrada para que no haya sorpresas.\n\nEl equipo en sí no requiere gastos: con la limpieza correcta dura años y tiene 2 años de garantía oficial.\n\nLo que sí se renueva son los consumibles. La máscara es lo que más se usa y con el tiempo el silicón pierde sello. Los filtros son baratos y se cambian periódicamente. La tubuladura dura bastante, pero si se raja hay que reemplazarla.\n\nTenemos los repuestos en Córdoba, así que no vas a tener que esperar un envío ni buscarlos por tu cuenta.',
            },
            {
                title: 'No te entregamos una caja',
                content: 'Tu equipo llega configurado según la indicación de tu médico (presión, flujo, modo), listo para usar desde la primera noche. No tenés que aprender a programarlo ni adivinar valores.\n\nLa instalación la hace personal profesional especializado, que te explica cómo usarlo, cómo limpiarlo y qué esperar los primeros días. Te quedás con el equipo funcionando y sabiendo usarlo, no con un manual.\n\nEsto vale tanto si comprás como si alquilás. Es la diferencia entre recibir un aparato y empezar un tratamiento.',
            },
            {
                title: 'Probalo un mes antes de comprarlo',
                content: 'Si no estás seguro de cómo te vas a adaptar, alquilá el equipo y probalo en tu casa.\n\nSi después decidís comprarlo, ese primer mes de alquiler te lo descontamos del precio de venta. Aplica a CPAP y AutoCPAP.\n\nEs la forma de empezar el tratamiento sin la inversión completa de entrada, y sin perder lo que ya pagaste.',
            },
        ],
        products: [
            { name: 'CPAP BMC G2S con humidificador', price: '$499.000' },
            { name: 'AutoCPAP BMC G2S con humidificador', price: '$630.000' },
            { name: 'CPAP ResMed AirSense 10 (equipo completo)', price: '$799.000' },
            { name: 'BiPAP BMC G3 con frecuencia respiratoria', price: 'U$S 907' },
        ],
        faq: [
            { q: '¿Cuánto cuesta un CPAP en Córdoba?', a: 'Desde $499.000 (CPAP BMC G2S con humidificador). El CPAP ResMed AirSense 10 está en oferta a $799.000. Confirmá el precio del día por WhatsApp.' },
            { q: '¿Qué CPAP me conviene comprar?', a: 'Depende de tu indicación médica y tu presión de tratamiento. El CPAP fijo es la opción estándar y económica; el AutoCPAP da más confort. Te asesoramos sin cargo.' },
            { q: '¿Los equipos tienen garantía?', a: 'Sí. Los CPAP y AutoCPAP declaran 2 años de garantía oficial y son aparatología aprobada por ANMAT. En otras familias el plazo cambia: figura en la ficha de cada equipo.' },
            { q: '¿Puedo alquilar en lugar de comprar?', a: 'Sí, ofrecemos alquiler de CPAP en Córdoba con entrega a domicilio, ideal para probar antes de comprar.' },
            { q: '¿Puedo pagar el CPAP en cuotas?', a: 'Sí. Si sos cliente de Banco Galicia tenés 3 cuotas sin interés los miércoles y viernes. El resto de la semana hay planes de 3, 6 y 9 cuotas, sujeto a las condiciones del banco.' },
            { q: '¿Puedo probar el equipo antes de comprarlo?', a: 'Sí. En Córdoba podés [alquilarlo primero](/alquiler-cpap-cordoba), usarlo el tiempo que necesites y decidir después con la experiencia hecha.' },
            { q: '¿Necesito llevar el estudio del sueño?', a: 'Sí, hace falta la indicación médica con la presión de tratamiento, porque con ese dato configuramos el equipo. Si todavía no lo hiciste, hacemos el [estudio del sueño a domicilio](/estudio-del-sueno-cordoba) en Córdoba.' },
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
            {
                title: 'Cómo es la noche del estudio',
                content: 'Se entrega el polígrafo, dormís con él una noche en tu casa y se devuelve al día siguiente. No hay internación y no tenés que dormir en un laboratorio.\n\nDurante esa noche el equipo registra el flujo de aire nasal, el oxígeno en sangre (SpO₂), el ronquido, la posición del cuerpo, el esfuerzo respiratorio del tórax y el abdomen y la frecuencia cardíaca. El registro es de toda la noche de sueño.\n\nNo es invasivo: dormís en tu propia cama, como cualquier noche.\n\nLa cánula nasal que se conecta al equipo es un insumo descartable y se cambia en cada estudio.',
            },
            {
                title: 'Qué dice el informe: el índice de apnea-hipopnea (IAH)',
                content: 'El polígrafo incluye software de descarga y análisis, que genera el informe con el Índice de Apnea-Hipopnea (IAH o AHI): la cantidad de apneas e hipopneas por hora de sueño. Es el índice que indica la severidad.\n\nLas referencias son: menos de 5 se considera normal, entre 5 y 15 apnea leve, entre 15 y 30 moderada y más de 30 severa.\n\nEl estudio además registra la saturación de oxígeno durante el sueño, el flujo aéreo y el ronquido.\n\nLa interpretación del estudio la hace el médico: es quien define el diagnóstico y el tratamiento a partir del informe. Nosotros vendemos y asesoramos sobre el equipamiento.',
            },
            {
                title: 'Qué conviene preguntar antes de hacerte el estudio',
                content: 'Si estás por hacerte un estudio domiciliario, acá o en cualquier otro lado, estas son las preguntas que conviene hacer antes.\n\nQué registra el equipo. Nosotros trabajamos con el polígrafo BMC YH-600B PRO, aprobado por ANMAT: registra flujo aéreo nasal, ronquido, saturación de oxígeno y frecuencia cardíaca, e incluye el software de descarga y análisis para el informe.\n\nSi el informe incluye el IAH. Es el dato con el que tu médico define la indicación y, si corresponde, la presión con la que después se configura el equipo.\n\nQuién interpreta el registro. La interpretación la hace el médico.\n\nSi la cánula es descartable. Es el insumo que va en contacto con vos y se cambia en cada estudio.\n\nQué pasa después. Si el estudio confirma apnea vas a necesitar equipo, máscara y configuración. En Córdoba te acompañamos también en esa etapa: elección del equipo, [compra](/comprar-cpap-cordoba) o [alquiler](/alquiler-cpap-cordoba) y adaptación.',
            },
            {
                title: 'Si el estudio da apnea: probá el equipo antes de comprarlo',
                content: 'Si el informe confirma apnea, el tratamiento estándar es el CPAP o el AutoCPAP. En Córdoba podés [alquilar el equipo](/alquiler-cpap-cordoba) con entrega e instalación a domicilio y empezar el tratamiento sin la inversión completa de entrada.\n\nSi después decidís comprarlo, ese primer mes de alquiler te lo descontamos del precio de venta. Aplica a CPAP y AutoCPAP.\n\nPrecios de referencia para comprar: CPAP BMC G2S con humidificador $499.000, AutoCPAP BMC G2S con humidificador $630.000 y CPAP ResMed AirSense 10 $799.000. Aparatología aprobada por ANMAT, con 2 años de garantía oficial. Los precios se actualizan: confirmá el valor del día por WhatsApp.\n\nEl orden importa: primero el estudio y la indicación médica, después el equipo. La presión con la que se configura sale de ahí. Podés ver todas las opciones en [comprar CPAP en Córdoba](/comprar-cpap-cordoba).',
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
            { q: '¿Es molesto dormir con el polígrafo puesto?', a: 'Es un estudio no invasivo: dormís en tu propia cama, en tu casa, como cualquier noche. Se entrega el polígrafo, dormís una noche con él y se devuelve al día siguiente. No hay internación ni hace falta dormir en un laboratorio.' },
            { q: '¿Qué es el IAH y qué valores indican apnea?', a: 'El Índice de Apnea-Hipopnea (IAH o AHI) cuenta cuántas apneas e hipopneas se registran por hora de sueño. Como referencia: menos de 5 es normal, de 5 a 15 apnea leve, de 15 a 30 moderada y más de 30 severa. La interpretación del informe la hace el médico.' },
            { q: '¿Puedo comprar un CPAP sin hacerme el estudio del sueño?', a: 'Hace falta la indicación médica: el equipo y la presión se determinan a partir de una poligrafía respiratoria o una polisomnografía indicada por tu médico. Con ese dato configuramos el equipo antes de entregarlo. Si todavía no te hiciste el estudio, escribinos por WhatsApp y te asesoramos.' },
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
                content: 'La ventilación no invasiva (VNI) con dos niveles de presión es uno de los tratamientos con mayor respaldo en medicina respiratoria. En las exacerbaciones de EPOC con retención de dióxido de carbono, la VNI reduce la necesidad de intubación y la mortalidad, y es el estándar de cuidado recomendado por las guías internacionales (GOLD).\n\nEn EPOC estable con hipercapnia crónica, el ensayo de Köhnlein y colaboradores (2014) mostró que la VNI domiciliaria bien configurada mejora la sobrevida, y el ensayo HOT-HMV (Murphy y col., 2017) demostró que sumar VNI al oxígeno domiciliario tras una exacerbación prolonga el tiempo libre de reinternaciones.\n\nEn enfermedades neuromusculares como la ELA, el trabajo de Bourke y colaboradores (2006) demostró que la VNI mejora tanto la sobrevida como la calidad de vida, y las guías la recomiendan de forma temprana cuando aparecen signos de hipoventilación. Para estos pacientes es clave que el equipo cuente con frecuencia respiratoria de respaldo (modo S/T), como el BiPAP BMC G3.\n\nNota: la indicación de VNI, los modos y las presiones los define siempre el médico tratante. Esta reseña es informativa. Revisada por el Lic. Sergio Giorda (MP 2123), kinesiólogo con 25 años en terapia intensiva y director de INSER SALUD. Última revisión: agosto 2026.',
            },
            {
                title: 'No te entregamos una caja',
                content: 'Tu equipo llega configurado según la indicación de tu médico (presión, flujo, modo), listo para usar desde la primera noche. No tenés que aprender a programarlo ni adivinar valores.\n\nLa instalación la hace personal profesional especializado, que te explica cómo usarlo, cómo limpiarlo y qué esperar los primeros días. Te quedás con el equipo funcionando y sabiendo usarlo, no con un manual.\n\nEsto vale tanto si comprás como si alquilás. Es la diferencia entre recibir un aparato y empezar un tratamiento.',
            },
        ],
        products: [
            { name: 'BiPAP BMC G3 con frecuencia respiratoria y humidificador', price: 'U$S 907' },
            { name: 'Ventilador STELLAR 150 ResMed (alta gama)', price: 'consultar' },
        ],
        faq: [
            { q: '¿Cuánto cuesta un BiPAP en Córdoba?', a: 'El BiPAP BMC G3 está en U$S 907. También hay opciones de alta gama y alquiler. Confirmá el precio del día por WhatsApp.' },
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
            {
                title: 'No te entregamos una caja',
                content: 'Tu equipo llega configurado según la indicación de tu médico (presión, flujo, modo), listo para usar desde la primera noche. No tenés que aprender a programarlo ni adivinar valores.\n\nLa instalación la hace personal profesional especializado, que te explica cómo usarlo, cómo limpiarlo y qué esperar los primeros días. Te quedás con el equipo funcionando y sabiendo usarlo, no con un manual.\n\nEsto vale tanto si comprás como si alquilás. Es la diferencia entre recibir un aparato y empezar un tratamiento.',
            },
            {
                title: 'Qué quiere decir "oxígeno 24 horas"',
                content: 'Es una consulta que mezcla dos cosas distintas.\n\nUna es el equipo. Los concentradores estacionarios que entregamos están declarados para uso continuo las 24 horas, así que soportan cualquier esquema que te hayan indicado. El BMC trabaja entre 0,5 y 5 litros por minuto con pureza igual o mayor al 93%, y el [Yuwell de 10 litros](/concentrador-oxigeno-10-litros) llega hasta 10 L/min para casos de alta demanda.\n\nLa otra es cuántas horas por día tenés que usarlo, y eso lo define tu médico según los resultados de saturación y gases en sangre. En oxigenoterapia domiciliaria las indicaciones suelen ser de muchas horas diarias, generalmente entre 16 y 24.\n\nY una aclaración práctica: respondemos consultas por WhatsApp todos los días, también fines de semana y fuera del horario comercial. La entrega y la instalación en Córdoba las coordinamos con vos.',
            },
            {
                title: 'Qué trae cada opción de oxígeno',
                content: 'El concentrador estacionario BMC ($999.000) viene con control remoto para manejarlo a distancia y medidor de pureza de oxígeno integrado, con display digital que muestra pureza, flujo y horas de uso. Tiene 2 años de garantía.\n\nEl Yuwell de 10 litros ($2.800.000) es el de alto flujo: llega al doble del concentrador estándar de 5 L, tiene ruedas para traslado dentro de la casa y alarmas de seguridad por corte de energía y por baja concentración. Garantía de 1 año oficial.\n\nLa mochila de oxígeno es otra categoría: un tubo portátil de oxígeno medicinal con regulador, bolso de transporte y carga inicial incluida, de alrededor de 1,8 kg. Da entre 1 y 3 horas según el flujo indicado y no requiere electricidad ni batería, así que sirve para salidas cortas, un turno médico o cuando la batería no alcanza. Cuando se agota, se recarga en INSER SALUD.\n\nSi pasás buena parte del día fuera de casa, la opción es un [concentrador portátil](/concentrador-oxigeno-portatil-cordoba).',
            },
            {
                title: 'El concentrador en tu casa: ruido, consumo y limpieza',
                content: 'El concentrador funciona enchufado a la corriente: toma el aire del ambiente, le extrae el nitrógeno y entrega oxígeno concentrado. No hay tubos que reponer ni recargas que pagar mientras esté enchufado.\n\nSobre ruido y consumo, el concentrador estacionario Yuwell de 5 L/min de nuestro catálogo declara menos de 45 dB y unos 300 W, y pesa 14 kg con ruedas para pasarlo de una habitación a otra. El estacionario es el equipo que se usa durante la noche y en las horas en que la persona está en el hogar.\n\nEl mantenimiento es simple: el filtro externo se limpia con agua una vez por mes y se deja secar. Los filtros internos se cambian con menos frecuencia y te avisamos cuándo corresponde.\n\nSi estás en Córdoba, todo esto te lo mostramos en tu casa el día de la instalación, junto con el encendido y la regulación de flujo.',
            },
            {
                title: 'Qué conviene tener a mano antes de escribirnos',
                content: 'Con tres datos te cotizamos sin vueltas.\n\nPrimero, cuántos litros por minuto te indicaron. Es el dato que define todo: hasta 5 L/min lo cubre un concentrador estacionario estándar, y por encima de eso necesitás un equipo de alto flujo.\n\nSegundo, cuántas horas por día y si también es de noche. El estacionario entrega flujo continuo; los portátiles a pulso liberan oxígeno cuando detectan la inspiración, y durante el sueño la respiración se vuelve más suave, así que para la noche lo habitual es el estacionario en casa.\n\nTercero, si necesitás salir. Ahí se define si sumás un portátil o una mochila para los traslados.\n\nSi no tenés la indicación a mano, mandanos una foto por WhatsApp y te decimos qué equipo cumple con lo que te prescribieron. Para cotizar no te pedimos DNI, dirección ni obra social: esos datos recién hacen falta al cerrar la operación.',
            },
        ],
        products: [
            { name: 'Concentrador de oxígeno BMC estacionario (control remoto + medidor de O₂)', price: '$999.000' },
            { name: 'Concentrador portátil KINGON P2-S3', price: 'consultar' },
            { name: 'Mochila / tubo de oxígeno portátil', price: 'consultar' },
        ],
        faq: [
            { q: '¿Atienden las 24 horas? ¿Y si necesito oxígeno un fin de semana?', a: 'Respondemos consultas por WhatsApp todos los días, también fines de semana y fuera del horario comercial, así que podés escribirnos cuando lo necesites y coordinamos desde ese momento. Los concentradores que entregamos están preparados para uso continuo las 24 horas del día. La entrega e instalación en Córdoba las coordinamos con vos, normalmente en el día.' },
            { q: '¿Hacen entrega de oxígeno a domicilio en Córdoba?', a: 'Sí, entregamos e instalamos concentradores de oxígeno a domicilio en Córdoba Capital y alrededores, normalmente en el día.' },
            { q: '¿Necesito receta médica para el oxígeno?', a: 'La oxigenoterapia se usa según indicación médica (flujo en litros por minuto). Te asesoramos para que el equipo cumpla con lo prescripto.' },
            { q: '¿Conviene concentrador fijo o portátil?', a: 'El fijo es para uso continuo en casa; el portátil tiene batería para salir o viajar. Muchos pacientes combinan ambos.' },
            { q: '¿Venden o alquilan?', a: 'Las dos cosas. Tenés el concentrador BMC estacionario desde $999.000 y opciones de alquiler.' },
            { q: '¿Puedo usar el concentrador toda la noche mientras duermo?', a: 'Los concentradores estacionarios que entregamos están declarados para uso continuo las 24 horas y entregan flujo continuo. Los portátiles a pulso liberan oxígeno cuando detectan la inspiración, y durante el sueño la respiración se vuelve más suave: por eso solo se usan de noche si son de flujo continuo y tu médico lo autorizó. Cuántas horas por día usarlo lo define tu médico.' },
            { q: '¿Cuánta electricidad consume un concentrador de oxígeno?', a: 'Poca para lo que hace. El concentrador estacionario Yuwell de 5 L/min declara alrededor de 300 W. A cambio no tenés costo de recarga: el equipo produce oxígeno a partir del aire del ambiente todo el tiempo que esté enchufado, sin tubos que reponer.' },
            { q: '¿Qué pasa si se corta la luz?', a: 'El concentrador necesita estar enchufado para funcionar. Para esos casos está la mochila de oxígeno, que es un tubo con regulador y bolso, no depende de electricidad ni de batería y rinde entre 1 y 3 horas según el flujo indicado. Si querés tener ese respaldo, decínoslo cuando cotizamos y lo incluimos en el presupuesto. Qué respaldo corresponde en tu caso conviene consultarlo con tu médico.' },
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
            {
                title: 'Pulso o flujo continuo: la diferencia que más importa',
                content: 'No todos los portátiles entregan el oxígeno de la misma manera, y esta es la confusión más frecuente.\n\nLos equipos de PULSO liberan una bocanada de oxígeno cada vez que la persona inhala. Son más chicos, más livianos y la batería dura más, pero no sirven si tu médico indicó flujo continuo, porque durante el sueño la respiración se vuelve más superficial y el equipo puede no detectarla.\n\nLos de FLUJO CONTINUO entregan oxígeno de forma constante, igual que un concentrador de casa, pero pesan más y consumen más batería.\n\nAntes de comprar, fijate en tu indicación médica: si dice litros por minuto continuos, necesitás un equipo de flujo continuo. Mandanos la indicación por WhatsApp y te confirmamos qué modelos sirven.',
            },
            {
                title: 'Qué incluye el equipo',
                content: 'Todos nuestros portátiles se entregan con batería, cargador de red y cargador para el auto, bolso o mochila de traslado, cánula nasal y manual en español. El GCE Zen-O viene con dos baterías, lo que le da más autonomía fuera de casa.\n\nAdemás, cuando lo comprás o alquilás en Córdoba, la entrega es a domicilio y te enseñamos a usarlo: cómo cargar la batería, cómo cambiar el filtro y cómo interpretar las alarmas.',
            },
            {
                title: 'Antes de viajar en avión',
                content: 'Si vas a volar, avisanos con tiempo. Las aerolíneas exigen que el equipo esté homologado y suelen pedir un certificado médico y aviso previo. También piden batería suficiente para más tiempo que la duración del vuelo.\n\nLa documentación de homologación la entrega el fabricante y viene con el equipo, para que la presentes en la aerolínea. Consultá igual con tu aerolínea, porque cada una tiene sus propios requisitos.',
            },
            {
                title: 'No te entregamos una caja',
                content: 'Tu equipo llega configurado según la indicación de tu médico (presión, flujo, modo), listo para usar desde la primera noche. No tenés que aprender a programarlo ni adivinar valores.\n\nLa instalación la hace personal profesional especializado, que te explica cómo usarlo, cómo limpiarlo y qué esperar los primeros días. Te quedás con el equipo funcionando y sabiendo usarlo, no con un manual.\n\nEsto vale tanto si comprás como si alquilás. Es la diferencia entre recibir un aparato y empezar un tratamiento.',
            },
        ],
        products: [
            { name: 'Concentrador portátil KINGON P2-S3 (el más liviano de nuestro catálogo)', price: 'consultar' },
            { name: 'Concentrador portátil GCE Zen-O (2 baterías + carro, apto vuelos)', price: 'consultar' },
            { name: 'Concentrador portátil Philips SimplyGo', price: 'consultar' },
        ],
        faq: [
            { q: '¿Cuánto cuesta un concentrador de oxígeno portátil en Córdoba?', a: 'Depende del modelo y la autonomía. Escribinos por WhatsApp y te pasamos precios de venta y alquiler actualizados.' },
            { q: '¿Hay concentradores portátiles aptos para vuelos?', a: 'Sí, modelos como el GCE Zen-O y el Philips SimplyGo están homologados para volar. Consultanos antes de viajar.' },
            { q: '¿Cuánta autonomía tienen?', a: 'Varía según el modelo y la configuración de flujo; los modelos con doble batería ofrecen varias horas. Te asesoramos según tu uso.' },
            { q: '¿Se pueden alquilar?', a: 'Sí, ofrecemos venta y alquiler de concentradores portátiles con entrega a domicilio en Córdoba.' },
            { q: '¿Puedo usar el portátil mientras duermo?', a: 'Solo si es de flujo continuo y tu médico lo autorizó. Los equipos de pulso dependen de detectar cada inspiración, y durante el sueño la respiración se vuelve más suave. Consultalo con tu neumonólogo antes de usarlo de noche.' },
            { q: '¿Cuánta batería dura un concentrador portátil?', a: 'Depende del modelo y del flujo configurado: a mayor flujo, menos autonomía. Los modelos con doble batería, como el GCE Zen-O, dan varias horas de uso. Decinos cuántas horas necesitás fuera de casa y te recomendamos el que corresponde.' },
            { q: '¿Hacen mucho ruido?', a: 'Bastante menos que un concentrador estacionario. Se pueden usar en una oficina o en una reunión sin molestar.' },
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
        description: 'CPAP BMC G2S $499.000, AutoCPAP $630.000 y ResMed AirSense 10 $799.000. Precios publicados, ANMAT, garantía y envío a todo el país. Cuotas Banco Galicia.',
        heroImg: '/artifacts/products/resmed_airsense10_3.jpg',
        intro: 'En INSER SALUD vendemos CPAP, AutoCPAP y BiPAP con envío a todo el país. Vivas en Buenos Aires, Rosario, Salta o donde sea, te enviamos tu equipo aprobado por ANMAT, con garantía, configuración y asesoramiento para que lo uses bien desde el primer día.',
        ctaSanti: 'Hola Santi, quiero comprar un CPAP y me lo envíen a mi provincia. ¿Cómo es el envío y qué modelos tienen?',
        sections: [
            {
                title: 'Equipos y precios (envío a todo el país)',
                content: 'CPAP BMC G2S con humidificador: $499.000 (el más vendido).\nAutoCPAP BMC G2S: $630.000 (presión automática, más confort).\nCPAP ResMed AirSense 10: $799.000 (equipo completo, el CPAP de gama alta de nuestro catálogo).\nBiPAP BMC G3: U$S 907 (para EPOC y enfermedades neuromusculares).\n\nLos precios se actualizan; confirmá el valor del día y el costo de envío por WhatsApp.',
            },
            {
                title: 'Cómo comprar y recibir tu equipo',
                content: 'Nos escribís por WhatsApp, te asesoramos sobre el equipo según tu indicación médica y coordinamos el envío a tu domicilio en cualquier provincia de Argentina. Te llega configurado y con instrucciones; si necesitás ayuda con la puesta en marcha, te guiamos a distancia.',
            },
            {
                title: 'Garantía, ANMAT y respaldo',
                content: 'Los CPAP y AutoCPAP que vendemos son aparatología aprobada por ANMAT y declaran 2 años de garantía oficial. Conseguís repuestos ([máscaras](/mascaras-cpap), filtros, tubuladuras) y soporte técnico continuo, sin importar en qué provincia estés.',
            },
            {
                title: 'Evidencia científica: por qué el CPAP es el tratamiento de referencia',
                content: 'El CPAP es el tratamiento de primera línea para la apnea obstructiva del sueño moderada y severa según las guías de la Academia Americana de Medicina del Sueño (AASM), desde su descripción original por Sullivan y colaboradores en 1981.\n\nLa evidencia acumulada muestra que la apnea no tratada se asocia a hipertensión arterial (cohorte de Wisconsin, Peppard y col.) y a mayor riesgo de eventos cardiovasculares en los casos severos (Marin y col., 2005), además de somnolencia diurna que multiplica el riesgo de accidentes de tránsito y laborales.\n\nEl tratamiento con CPAP reduce la somnolencia diurna, mejora la calidad de vida y el descanso del acompañante, disminuye modestamente la presión arterial en pacientes hipertensos con apnea, y reduce el riesgo de accidentes. El beneficio depende de la constancia: se recomienda usarlo todas las noches, al menos 4 a 6 horas, para obtener resultados.\n\nNota: el diagnóstico (poligrafía o polisomnografía) y la indicación de presión los define el médico especialista en sueño. Esta reseña es informativa. Revisada por el Lic. Sergio Giorda (MP 2123), kinesiólogo con 25 años en terapia intensiva y director de INSER SALUD. Última revisión: agosto 2026.',
            },
            {
                title: 'No te entregamos una caja',
                content: 'Tu equipo llega configurado según la indicación de tu médico (presión, flujo, modo), listo para usar desde la primera noche. No tenés que aprender a programarlo ni adivinar valores.\n\nLa instalación la hace personal profesional especializado, que te explica cómo usarlo, cómo limpiarlo y qué esperar los primeros días. Te quedás con el equipo funcionando y sabiendo usarlo, no con un manual.\n\nEsto vale tanto si comprás como si alquilás. Es la diferencia entre recibir un aparato y empezar un tratamiento.\n\nEn Córdoba la instalación la hace personal profesional en tu domicilio. Al resto del país el equipo llega ya configurado según tu indicación médica y te guiamos la puesta en marcha por WhatsApp.',
            },
            {
                title: 'Probalo un mes antes de comprarlo (alquiler en Córdoba)',
                content: 'Si estás en Córdoba y no estás seguro de cómo te vas a adaptar, alquilá el equipo y probalo en tu casa.\n\nSi después decidís comprarlo, ese primer mes de alquiler te lo descontamos del precio de venta. Aplica a CPAP y AutoCPAP.\n\nEs la forma de empezar el tratamiento sin la inversión completa de entrada, y sin perder lo que ya pagaste.\n\nEl alquiler es solo en Córdoba. Al resto del país vendemos con envío y te acompañamos en la puesta en marcha.',
            },
        ],
        products: [
            { name: 'CPAP BMC G2S con humidificador', price: '$499.000' },
            { name: 'AutoCPAP BMC G2S con humidificador', price: '$630.000' },
            { name: 'CPAP ResMed AirSense 10 (equipo completo)', price: '$799.000' },
        ],
        faq: [
            { q: '¿Envían CPAP a todo el país?', a: 'Sí. Vendemos con envío a cualquier provincia de Argentina (Buenos Aires, Rosario, Salta, etc.). Coordinamos el envío por WhatsApp.' },
            { q: '¿Cuánto cuesta un CPAP?', a: 'Desde $499.000 (CPAP BMC G2S). El AutoCPAP BMC está a $630.000 y el ResMed AirSense 10 a $799.000. Confirmá el precio del día por WhatsApp.' },
            { q: '¿Los equipos tienen garantía?', a: 'Sí. Los CPAP y AutoCPAP declaran 2 años de garantía oficial y son aparatología aprobada por ANMAT, en todo el país. En otras familias el plazo cambia: figura en la ficha de cada equipo.' },
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
            {
                title: 'Qué concentrador necesitás según los litros que te indicaron',
                content: 'El dato que define todo es el flujo que figura en tu indicación médica, expresado en litros por minuto.\n\nHasta 5 litros por minuto: el concentrador estacionario estándar cubre la mayoría de los casos de oxigenoterapia domiciliaria. El BMC de $999.000 entra en esta categoría e incluye control remoto y medidor de oxígeno.\n\nMás de 5 litros por minuto: necesitás un equipo de alto flujo. El [concentrador Yuwell de 10 litros](/concentrador-oxigeno-10-litros) llega al doble del estándar y es el que se usa en pacientes con alta demanda y en centros de rehabilitación pulmonar.\n\nPara salir de casa: los portátiles funcionan con batería, pero prestá atención a si tu indicación es de flujo continuo o si alcanza con pulsos.\n\nSi tenés dudas, mandanos la indicación médica por WhatsApp y te decimos qué equipo cumple.',
            },
            {
                title: 'Cómo es comprar a distancia',
                content: 'Estás comprando un equipo médico sin verlo, así que te contamos cómo trabajamos.\n\nPrimero nos escribís por WhatsApp con la indicación médica y desde qué provincia sos. Te pasamos las opciones que cumplen, con el precio final y el costo del envío, sin sorpresas después.\n\nCuando confirmás, coordinamos el envío. El equipo viaja embalado en su caja original y llega listo para enchufar y usar.\n\nCuando lo recibís, te acompañamos por WhatsApp en la puesta en marcha: cómo armarlo, cómo regular el flujo y cómo limpiar el filtro. No te quedás solo con el manual.',
            },
            {
                title: 'Consumo y mantenimiento',
                content: 'Los concentradores consumen poca electricidad, así que podés usarlo todas las horas que te indicaron sin que se note en la factura.\n\nEl mantenimiento es simple: limpiar el filtro externo con agua y dejarlo secar una vez por mes. Los filtros internos se cambian con menos frecuencia y te avisamos cuándo corresponde.',
            },
            {
                title: 'No te entregamos una caja',
                content: 'Tu equipo llega configurado según la indicación de tu médico (presión, flujo, modo), listo para usar desde la primera noche. No tenés que aprender a programarlo ni adivinar valores.\n\nLa instalación la hace personal profesional especializado, que te explica cómo usarlo, cómo limpiarlo y qué esperar los primeros días. Te quedás con el equipo funcionando y sabiendo usarlo, no con un manual.\n\nEsto vale tanto si comprás como si alquilás. Es la diferencia entre recibir un aparato y empezar un tratamiento.\n\nEn Córdoba la instalación la hace personal profesional en tu domicilio. Al resto del país el equipo llega ya configurado según tu indicación médica y te guiamos la puesta en marcha por WhatsApp.',
            },
        ],
        products: [
            { name: 'Concentrador de oxígeno BMC estacionario (control remoto + medidor de O₂)', price: '$999.000' },
            { name: 'Concentrador portátil KINGON P2-S3 (apto vuelos)', price: 'consultar' },
            { name: 'Concentrador portátil GCE Zen-O (2 baterías + carro)', price: 'consultar' },
            { name: 'Concentrador YUWELL 10 litros (alto flujo)', price: '$2.800.000' },
        ],
        faq: [
            { q: '¿Envían concentradores de oxígeno a todo el país?', a: 'Sí. Vendemos con envío a cualquier provincia de Argentina. Coordinamos el envío por WhatsApp.' },
            { q: '¿Conviene fijo o portátil?', a: 'El fijo es para uso continuo en casa; el portátil tiene batería para salir o viajar. Muchos pacientes combinan ambos.' },
            { q: '¿Hay concentradores aptos para vuelos?', a: 'Sí, modelos como el GCE Zen-O están homologados para volar. Consultanos antes de viajar.' },
            { q: '¿Necesito receta médica?', a: 'La oxigenoterapia se usa según indicación médica (flujo en litros por minuto). Te asesoramos para que el equipo cumpla con lo prescripto.' },
            { q: '¿Cuánto tarda en llegar a mi provincia?', a: 'Depende del destino y del transporte. Te confirmamos el plazo estimado por WhatsApp antes de que compres, junto con el costo del envío.' },
            { q: '¿Los equipos tienen garantía?', a: 'Sí, todos los equipos son aparatología aprobada por ANMAT y tienen garantía oficial.' },
            { q: '¿Puedo pagar en cuotas?', a: 'Sí. Si sos cliente de Banco Galicia tenés 3 cuotas sin interés los miércoles y viernes. El resto de la semana hay planes de 3, 6 y 9 cuotas, sujeto a las condiciones del banco.' },
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
                content: 'La rehabilitación pulmonar es una de las intervenciones con mayor respaldo científico en EPOC y enfermedades respiratorias crónicas: las guías internacionales (GOLD y la declaración conjunta de las sociedades ATS/ERS) la recomiendan porque mejora la disnea, la capacidad de ejercicio y la calidad de vida de los pacientes.\n\nEl oxígeno suplementario potencia ese entrenamiento. Los ensayos clásicos que fundaron la oxigenoterapia moderna (NOTT, 1980, y el estudio del MRC británico, 1981) demostraron que el oxígeno prolongado mejora la sobrevida en pacientes con hipoxemia severa.\n\nDurante el ejercicio, muchos pacientes respiratorios desaturan al esfuerzo. La evidencia muestra que entrenar con oxígeno suplementario reduce la disnea, retrasa la fatiga muscular y permite sesiones más largas y de mayor intensidad: el estudio de Emtner y colaboradores (2003) encontró que el oxígeno durante el entrenamiento permite alcanzar intensidades superiores incluso en pacientes sin hipoxemia de reposo. Y a mayor intensidad de entrenamiento, mayor beneficio fisiológico de la rehabilitación.\n\nEn la práctica, el objetivo es sostener la saturación por encima del 90% durante toda la sesión. Ahí es donde el alto flujo marca la diferencia: un concentrador de 10 L/min puede corregir desaturaciones profundas al esfuerzo que un equipo domiciliario de 5 L no alcanza a compensar, dando margen de seguridad para trabajar con pacientes de alta demanda.\n\nNota: la indicación de oxígeno (flujo, modalidad y objetivos de saturación) la define siempre el equipo médico tratante. Esta reseña es informativa. Revisada por el Lic. Sergio Giorda (MP 2123), kinesiólogo con 25 años en terapia intensiva y director de INSER SALUD. Última revisión: agosto 2026.',
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
        garantia: 'Garantía oficial del fabricante',
        national: true,
        h1: 'Máscaras para CPAP y BiPAP: nasales, nasobucales y pediátricas',
        metaTitle: 'Máscaras para CPAP | Nasales, Nasobucales y Pediátricas | Precios | INSER SALUD',
        metaTitleSalud: 'Máscaras para CPAP y BiPAP | Precios y Envío Nacional | INSER SALUD',
        description: 'Máscaras para CPAP y BiPAP con precios visibles y envío a todo el país: nasales desde U$S 35, DreamWear U$S 153, nasobucales (full face) y línea pediátrica completa. Aprobadas por ANMAT. Consultá por WhatsApp.',
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
                content: 'Nasales: RESCOMF multitalle U$S 35 (la más económica de nuestro catálogo) · BMC N4 U$S 36 · BMC N5a sin apoya frente U$S 60 · BMC multitalle U$S 89,50 · Philips DreamWear mínimo contacto U$S 153 · ResMed AirFit U$S 157 · Almohadillas Yuwell YP-01 U$S 42.\n\nNasobucales (full face): BMC F6 multitalle U$S 124 (oferta, tan cómoda como la DreamWear) · Philips DreamWear Full Face U$S 157 · BMC F2 codo azul SIN FUGA para respiradores de terapia intensiva $68.000 (oferta) · Yuwell con apoya frente U$S 52 · Yuwell YF02 U$S 55 · BMC F5A U$S 52 · ResMed AirFit F20 U$S 189,50 · AirFit F30 U$S 212.\n\nLos precios se actualizan; confirmá el valor del día por WhatsApp.',
            },
            {
                title: 'Máscaras pediátricas',
                content: 'Contamos con línea pediátrica completa, algo poco frecuente en el país: HSINER Cirri Mini nasal XS/S/M/L (U$S 105), máscara Philips Wisp pediátrica con su diseño de jirafa (U$S 227) e Infant CPAP Kit neonatal tallas 00 a 5 (U$S 97). Fundamentales en AME, [parálisis cerebral](/patologia/paralisis-cerebral) y cuadros respiratorios pediátricos, siempre con indicación médica.\n\nSi buscás específicamente para un chico, tenemos una página aparte con los tres modelos en detalle: [máscaras pediátricas para CPAP y BiPAP](/mascaras-pediatricas).',
            },
            {
                title: 'Cambio y reposición',
                content: 'La almohadilla de silicona conviene renovarla cada 2 a 4 semanas y la máscara completa cada 6 a 12 meses, según uso e higiene: la silicona pierde sellado con el tiempo y aparecen fugas que restan eficacia al tratamiento.\n\nEnviamos repuestos y máscaras a todo el país, y por WhatsApp te confirmamos compatibilidad con tu equipo antes de comprar.',
            },
        ],
        products: [
            { name: 'Máscara nasal RESCOMF multitalle (la más económica de nuestro catálogo)', price: 'U$S 35' },
            { name: 'Máscara nasal Philips DreamWear — mínimo contacto', price: 'U$S 153' },
            { name: 'Máscara nasobucal BMC F6 multitalle (oferta)', price: 'U$S 124' },
            { name: 'Máscara nasobucal Philips DreamWear Full Face', price: 'U$S 157' },
            { name: 'Máscara buconasal BMC F2 codo azul — SIN FUGA, para respiradores de terapia intensiva', price: '$68.000' },
            { name: 'Máscaras pediátricas (Cirri Mini, Philips Wisp, Infant CPAP Kit)', price: 'desde U$S 97' },
        ],
        faq: [
            { q: '¿Qué máscara elijo si respiro por la boca?', a: 'Una nasobucal (full face) que cubre nariz y boca: DreamWear Full Face (U$S 157), BMC F6 (U$S 124) o ResMed AirFit F20/F30. Si respirás por la nariz, una nasal alcanza y es más liviana.' },
            { q: '¿Cuánto cuesta una máscara para CPAP?', a: 'Desde U$S 35 (nasal RESCOMF multitalle). La DreamWear de Philips está a U$S 153 y las nasobucales desde U$S 52. Enviamos a todo el país.' },
            { q: '¿Son compatibles con cualquier equipo CPAP o BiPAP?', a: 'Sí. Todas usan la conexión estándar de tubuladura de 22 mm, compatible con CPAP, AutoCPAP y BiPAP de cualquier marca (BMC, ResMed, Philips, Yuwell, etc.).' },
            { q: '¿Cada cuánto se cambia la máscara?', a: 'La almohadilla de silicona cada 2 a 4 semanas y la máscara completa cada 6 a 12 meses, según uso e higiene. Un sellado gastado genera fugas y resta eficacia al tratamiento.' },
            { q: '¿Tienen máscaras para chicos?', a: 'Sí, línea pediátrica completa: HSINER Cirri Mini, máscara Philips Wisp (jirafa) e Infant CPAP Kit neonatal para recién nacidos. Siempre con indicación médica.' },
        ],
        related: [
            { label: 'Máscaras pediátricas', href: '/mascaras-pediatricas' },
            { label: 'Comprar CPAP (envío nacional)', href: '/comprar-cpap-argentina' },
            { label: 'Comprar CPAP en Córdoba', href: '/comprar-cpap-cordoba' },
            { label: 'Apnea del sueño', href: '/patologia/apnea-del-sueno' },
        ],
    },
    {
        slug: 'mascaras-pediatricas',
        garantia: 'Garantía oficial del fabricante',
        national: true,
        h1: 'Máscaras pediátricas para CPAP y BiPAP: los 3 modelos que tenemos',
        metaTitle: 'Máscaras Pediátricas para CPAP y BiPAP | Philips Wisp, Cirri Mini e Infant Kit | INSER SALUD',
        metaTitleSalud: 'Máscaras Pediátricas para CPAP y BiPAP | Precios y Envío Nacional | INSER SALUD',
        description: 'Máscaras pediátricas para CPAP y BiPAP con precios a la vista: Philips Wisp (la de la jirafa) U$S 227, HSINER Cirri Mini U$S 105 e Infant CPAP Kit neonatal desde U$S 97. Talles desde neonatal, envío a todo el país. Te asesoramos según la edad y la indicación médica.',
        heroImg: '/artifacts/products/876bc618-e07c-4007-8341-8660f0226cb4.jpg',
        intro: 'La línea pediátrica es difícil de conseguir en Argentina. Nosotros tenemos las tres, con talles desde neonatal y precios publicados. Y algo que importa tanto como el precio: te ayudamos a elegir cuál y qué talle, porque en un chico una máscara incómoda muchas veces está detrás del abandono del tratamiento.',
        ctaSanti: 'Hola Santi, necesito una máscara pediátrica para CPAP/BiPAP. ¿Me ayudás a elegir el modelo y el talle según la edad?',
        sections: [
            {
                title: 'Una máscara pediátrica no es una de adulto en talle chico',
                content: 'Es uno de los errores más frecuentes, y muchas veces está detrás del abandono del tratamiento. La cara de un chico no es una cara adulta a escala: cambian las proporciones y la piel es más delicada.\n\nUna máscara de adulto en el talle más chico apoya donde no debe. Puede generar fugas, marcar la cara y, sobre todo, incomodar. Y un nene incómodo se saca la máscara: no negocia, se la saca.\n\nLas máscaras pediátricas están diseñadas con medidas y materiales propios para bebés y chicos. No son máscaras de adulto en talle chico.',
            },
            {
                title: 'Philips Wisp pediátrica (la de la jirafa)',
                content: 'Es la que más eligen los padres, y se reconoce enseguida por su funda con estampado de jirafa.\n\nEse detalle no es decorativo, es la parte funcional del diseño: en un chico, que acepte la máscara es la mitad del tratamiento. Una máscara que parece un aparato médico se resiste; una que parece un juguete se tolera mucho mejor noche tras noche. Es la diferencia entre una familia que sostiene la terapia y una que la abandona a la semana.\n\nTiene armazón compacto y almohadilla de silicona hipoalergénica que apoya solo sobre la nariz, y es compatible con equipos de CPAP, AutoCPAP y BiPAP.\n\nPrecio: U$S 227, con envío a todo el país.',
            },
            {
                title: 'Los otros dos modelos, y cuándo conviene cada uno',
                content: 'HSINER Cirri Mini — nasal pediátrica en cuatro talles (XS, S, M y L). U$S 105. Es la opción más accesible de la línea y la que da más margen para acertar el talle sin cambiar de modelo.\n\nInfant CPAP Kit neonatal — un kit con las tallas 00, 0, 1, 2, 3, 4 y 5, para neonatos, lactantes y niños. Desde U$S 97. Es la respuesta cuando el paciente es muy chico y ninguna máscara nasal común le sirve.\n\nLas tres son compatibles con equipos de CPAP, AutoCPAP y BiPAP. Antes de comprar te confirmamos por WhatsApp que la máscara le entre a tu equipo.',
            },
            {
                title: 'El talle no se elige por catálogo',
                content: 'Esta es la parte que no se resuelve mirando una foto. El talle correcto depende de la edad, del tamaño y la forma de la cara, de la presión indicada y de si el chico respira por la nariz o abre la boca al dormir.\n\nPor eso no te vendemos una máscara y listo: te asesoramos antes. Contanos la edad, qué equipo usa y qué indicó el médico, y te decimos cuál corresponde. Si hace falta, hablamos con quien lleva el tratamiento.\n\nNo te entregamos una caja. Con las máscaras el asesoramiento es parte de lo que comprás: te ayudamos a elegir modelo y talle antes de la compra, y quedamos disponibles por WhatsApp después. Si estás en Córdoba, además coordinamos la entrega a domicilio.',
            },
            {
                title: 'En qué cuadros se usan',
                content: 'La ventilación no invasiva pediátrica aparece habitualmente en enfermedades neuromusculares y cuadros respiratorios crónicos de la infancia.\n\nLos más frecuentes en nuestra experiencia son la [atrofia muscular espinal](/patologia/atrofia-muscular-espinal) y la [parálisis cerebral](/patologia/paralisis-cerebral). En AME tipo 1, por ejemplo, las máscaras nasales pediátricas suelen ser mejor toleradas que las que cubren nariz y boca.\n\nEn todos los casos el equipo y la máscara se usan con indicación médica: nosotros proveemos y asesoramos, no indicamos el tratamiento.',
            },
            {
                title: 'Cada cuánto se cambia',
                content: 'La almohadilla de silicona conviene renovarla cada 2 a 4 semanas y la máscara completa cada 6 a 12 meses, según uso e higiene. La silicona pierde sellado con el tiempo y aparecen fugas que le restan eficacia al tratamiento.\n\nEn chicos hay un motivo extra para revisarla seguido: crecen. Un talle que sellaba perfecto hace seis meses puede haber quedado chico.\n\nEnviamos repuestos y máscaras a todo el país, y por WhatsApp te confirmamos la compatibilidad con tu equipo antes de que compres.',
            },
        ],
        products: [
            { name: 'Máscara Nasal Pediátrica Philips Wisp (la de la jirafa)', price: 'U$S 227' },
            { name: 'Máscara Nasal Pediátrica HSINER Cirri Mini (XS/S/M/L)', price: 'U$S 105' },
            { name: 'Infant CPAP Kit neonatal (tallas 00 a 5)', price: 'U$S 97' },
            { name: 'Tubuladura para CPAP / BiPAP (repuesto universal)', price: '$36.000' },
        ],
        faq: [
            { q: '¿Puedo usar una máscara de adulto en talle chico?', a: 'No es recomendable. La cara de un chico tiene proporciones distintas, no es una cara adulta a escala: una máscara de adulto apoya donde no debe, genera fugas hacia los ojos y marca la piel. El resultado más habitual es que el chico se la saque y se abandone el tratamiento.' },
            { q: '¿Cuál es la máscara pediátrica más elegida?', a: 'La Philips Wisp, que viene con la funda estampada de jirafa (U$S 227). Ese diseño ayuda a que el chico la acepte, que es la mitad del tratamiento. También tenemos la HSINER Cirri Mini (U$S 105) y el Infant CPAP Kit neonatal (desde U$S 97).' },
            { q: '¿Tienen máscaras para bebés y recién nacidos?', a: 'Sí. El Infant CPAP Kit incluye las tallas 00, 0, 1, 2, 3, 4 y 5, pensadas para neonatos y lactantes. Es la línea más difícil de conseguir en el país.' },
            { q: '¿Cómo sé qué talle le corresponde?', a: 'No se elige por catálogo. Depende de la edad, del tamaño y la forma de la cara, de la presión indicada y de si respira por la nariz o abre la boca al dormir. Escribinos por WhatsApp con esos datos y te decimos cuál corresponde antes de que compres.' },
            { q: '¿Son compatibles con mi equipo?', a: 'Las tres son compatibles con equipos de CPAP, AutoCPAP y BiPAP. Antes de comprar, pasanos por WhatsApp la marca y el modelo de tu equipo y te confirmamos la compatibilidad: preferimos chequearlo nosotros y no que te arriesgues, sobre todo en el kit neonatal.' },
            { q: '¿Envían a todo el país?', a: 'Sí, enviamos las máscaras pediátricas a cualquier provincia. El alquiler de equipos es solo en Córdoba, pero la venta con envío es nacional.' },
        ],
        related: [
            { label: 'Todas las máscaras para CPAP y BiPAP', href: '/mascaras-cpap' },
            { label: 'Atrofia muscular espinal', href: '/patologia/atrofia-muscular-espinal' },
            { label: 'Parálisis cerebral', href: '/patologia/paralisis-cerebral' },
            { label: 'BiPAP en Córdoba', href: '/bipap-cordoba' },
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
                content: 'BiPAP BMC G3 con frecuencia respiratoria (U$S 907) para ventilación no invasiva en sesiones y titulación.\nVentilador ResMed STELLAR 150 (U$S 7.342) para soporte ventilatorio invasivo/no invasivo de mayor complejidad.\nMáscaras nasales y nasobucales en todos los talles (desde U$S 35), incluida línea pediátrica, e insumos de reposición: tubuladuras, filtros y cánulas.',
            },
            {
                title: 'Compra institucional',
                content: 'Emitimos presupuesto formal y factura para instituciones, obras sociales y compras corporativas. Envío a todo el país con capacitación de uso (presencial en Córdoba, guiada a distancia en el resto del país), soporte técnico continuo y provisión de repuestos e insumos.',
            },
            {
                title: 'Cómo dimensionar el equipamiento del centro',
                content: 'No hay una receta única: el equipamiento se define por cuántos pacientes trabajan en simultáneo y por los flujos que indican los médicos derivantes.\n\nPara los pacientes de mayor demanda, el concentrador de alto flujo es el que da margen: el YUWELL de 10 litros trabaja de 1 a 10 L/min, con uso continuo declarado de 24 hs, display digital de flujo, alarmas de corte de energía y de baja concentración, y ruedas para moverlo entre boxes.\n\nDonde el requerimiento de flujo es menor, un estacionario de 5 L/min cubre y baja bastante la inversión: el BMC estacionario está a $999.000, con flujo de 0,5 a 5 L/min, pureza ≥93%, uso continuo 24 hs y 2 años de garantía. Trae medidor de oxígeno integrado y display digital de pureza, flujo y horas, dos cosas que en una institución sirven para verificar la concentración entregada y llevar el control del mantenimiento.\n\nEl esquema habitual es mixto: uno o dos equipos de alto flujo para los pacientes de alta demanda y estacionarios de 5 L para el resto. Como respaldo para salidas cortas y traslados, la mochila de oxígeno (tubo de 0,415 m³ con regulador, bolso y carga inicial, U$S 270) da entre 1 y 3 horas según el flujo.',
            },
            {
                title: 'Qué preguntar antes de comprar equipamiento institucional',
                content: 'Un equipo que trabaja toda la jornada exige más que uno domiciliario. Estas son las preguntas que conviene hacerle a cualquier proveedor, incluidos nosotros.\n\n¿Qué garantía tiene ese modelo en particular? No es la misma en todos: el concentrador YUWELL de 10 litros tiene 1 año de garantía oficial, mientras que el BMC estacionario de 5 L/min, el BiPAP BMC G3 y el ventilador STELLAR 150 tienen 2 años. Toda la aparatología está aprobada por ANMAT.\n\n¿Está declarado para uso continuo? Los dos concentradores estacionarios (el de 10 litros y el BMC de 5 L/min) declaran uso continuo 24 hs, y el STELLAR 150 está especificado para 24 hs continuas en pacientes adultos y pediátricos.\n\n¿Qué rango cubre? En oxígeno importa el flujo máximo; en ventilación, la presión y los modos. El BiPAP BMC G3 trabaja en CPAP, S, T y S/T, con IPAP de 4 a 25 cm H₂O y frecuencia de respaldo de 4 a 40 rpm. El STELLAR 150 llega a 40 cm H₂O, suma los modos PAC e iVAPS y tiene batería interna de hasta 2 hs, que se extiende a 8 hs con la Power Station II.\n\n¿Hay reposición de insumos y repuestos? Es lo que más se nota con los meses. Nosotros proveemos máscaras, tubuladuras, filtros, cánulas y humidificadores de reposición con envío a todo el país.',
            },
            {
                title: 'Los insumos son el gasto que se repite',
                content: 'El equipo se compra una vez; las máscaras, las tubuladuras y los filtros se renuevan todo el tiempo. En un centro con rotación de pacientes, ese es el rubro que conviene tener resuelto de entrada.\n\nNasales desde U$S 35 (RESCOMF multitalle) y nasobucales desde U$S 52 (Yuwell con apoya frente y BMC F5A); la BMC F6 multitalle está a U$S 124. En pediátrico, la HSINER Cirri Mini en talles XS/S/M/L (U$S 105) y el Infant CPAP Kit con tallas 00 a 5 (U$S 97), una línea difícil de conseguir en el país. El listado completo con precios está en [máscaras para CPAP y BiPAP](/mascaras-cpap).\n\nComo referencia de recambio: la almohadilla de silicona conviene renovarla cada 2 a 4 semanas y la máscara completa cada 6 a 12 meses, según uso e higiene. En una institución eso es lo que define el volumen de reposición.\n\nUn caso que conviene no confundir: la BMC F2 codo azul ($68.000) es una buconasal SIN puertos de exhalación, la interfaz correcta para respiradores de terapia intensiva y para ventilación no invasiva con válvula espiratoria en el circuito. No corresponde usarla con un CPAP o BiPAP domiciliario estándar, que necesitan máscara ventilada.\n\nLa tubuladura de recambio para CPAP/BiPAP está a $36.000: 22 mm de diámetro estándar, 1,8 m aprox. de largo, PVC flexible de grado médico.',
            },
            {
                title: 'Sumar diagnóstico al centro: el polígrafo respiratorio',
                content: 'Si el centro también atiende sospecha de apnea del sueño, el polígrafo respiratorio permite hacer el estudio en el domicilio del paciente, sin laboratorio.\n\nEl BMC YH-600B PRO (U$S 1.570) registra 4 canales: flujo aéreo nasal, ronquido, saturación de oxígeno y frecuencia cardíaca, con software de descarga y análisis para armar el informe. Es un equipo pensado para rotar entre pacientes: se entrega a la noche, se retira a la mañana y queda listo para el siguiente estudio.\n\nTambién está la versión con 30 cánulas Luer Lock incluidas, a U$S 1.794. La cánula es descartable y se cambia en cada estudio, así que sirve para arrancar sin depender de otra compra.\n\nLa capacitación de uso del equipo y del software está incluida (presencial en Córdoba, guiada a distancia en el resto del país) y la interpretación del estudio la hace el médico. El detalle completo está en [comprar polígrafo respiratorio](/comprar-poligrafo-argentina).',
            },
        ],
        products: [
            { name: 'Concentrador YUWELL 10 litros — alto flujo (uso intensivo)', price: '$2.800.000' },
            { name: 'BiPAP BMC G3 con frecuencia respiratoria', price: 'U$S 907' },
            { name: 'Ventilador ResMed STELLAR 150', price: 'U$S 7.342' },
            { name: 'Máscaras e insumos de reposición', price: 'desde U$S 35' },
        ],
        faq: [
            { q: '¿Sirve un concentrador domiciliario de 5 litros para un centro de rehabilitación?', a: 'Para uso intensivo o pacientes de alta demanda conviene el de 10 litros: duplica el flujo (hasta 10 L/min) y está pensado para funcionar de forma continua durante toda la jornada.' },
            { q: '¿Emiten presupuesto formal y factura para instituciones?', a: 'Sí. Preparamos presupuesto formal para la institución u obra social y entregamos factura. También asesoramos en la elección del equipamiento según la demanda del centro.' },
            { q: '¿Hacen envío e instalación en el interior?', a: 'Enviamos a todo el país. En Córdoba la capacitación es presencial; en el resto del país guiamos la puesta en marcha a distancia y damos soporte técnico continuo.' },
            { q: '¿Proveen repuestos e insumos de forma continua?', a: 'Sí: máscaras, tubuladuras, filtros, cánulas y humidificadores de reposición, con envío a todo el país.' },
            { q: '¿Qué garantía tienen los equipos?', a: 'Depende del modelo, así que conviene chequearlo uno por uno: el concentrador YUWELL de 10 litros tiene 1 año de garantía oficial, mientras que el concentrador BMC estacionario de 5 L/min, el BiPAP BMC G3 y el ventilador ResMed STELLAR 150 tienen 2 años. Toda la aparatología está aprobada por ANMAT.' },
            { q: '¿Cuántos concentradores necesita un centro de rehabilitación?', a: 'Depende de cuántos pacientes trabajen en simultáneo y de los flujos que indiquen los médicos derivantes. El esquema habitual es mixto: uno o dos equipos de alto flujo (hasta 10 L/min, $2.800.000) para los pacientes de mayor demanda y estacionarios de 5 L/min para el resto, bastante más económicos: el BMC está a $999.000. Contanos cuántos puestos tenés y qué flujos manejás y armamos el esquema por WhatsApp.' },
            { q: '¿Se puede sumar el estudio del sueño al centro?', a: 'Sí. El polígrafo respiratorio BMC YH-600B PRO (U$S 1.570) registra 4 canales — flujo aéreo nasal, ronquido, saturación de oxígeno y frecuencia cardíaca — con software de descarga y análisis para el informe, y el paciente duerme en su casa. También hay una versión con 30 cánulas Luer Lock incluidas por U$S 1.794. La capacitación de uso del equipo y del software está incluida (presencial en Córdoba, guiada a distancia en el resto del país); la interpretación del estudio la hace el médico.' },
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
        description: 'KINGON P2-S3 $2.735.400, el más liviano de nuestro catálogo (2,3 kg con batería), más la línea de flujo continuo, GCE Zen-O y Philips SimplyGo aptos para vuelos. ANMAT y envío a todo el país.',
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
                content: 'KINGON P2-S3 — $2.735.400: el más liviano de nuestro catálogo (2,3 kg con batería), pulso, apto vuelos (FAA).\nKINGON P2-E — U$S 2.379: entrada a los de flujo continuo.\nKINGON P2-E6 — U$S 2.695: flujo continuo con batería.\nKINGON P2-E7 — U$S 3.099: alto flujo continuo, batería extendida.\nKINGON P2-TOC — U$S 3.458: continuo + pulso con 9,5 hs de autonomía.\nGCE Zen-O — U$S 3.747: premium europeo, 2 baterías + carro, homologado para vuelos.\nPhilips SimplyGo — U$S 3.887: continuo + pulso, apto vuelos.\n\nPrecios de referencia; confirmá el valor del día por WhatsApp.',
            },
            {
                title: 'Para viajar en avión',
                content: 'Los modelos KINGON P2-S3, GCE Zen-O y Philips SimplyGo cuentan con aprobación FAA para vuelos. Las aerolíneas suelen exigir batería para el 150% de la duración del vuelo y aviso previo: te asesoramos con los requisitos antes de tu viaje.',
            },
            {
                title: 'Compra con respaldo',
                content: 'Aparatología aprobada por ANMAT con garantía oficial. Envío a todo el país, capacitación de uso, servicio técnico y provisión de baterías y accesorios. Si estás en Córdoba, también ofrecemos alquiler para probar antes de comprar.',
            },
            {
                title: 'Peso y autonomía: los dos datos que definen el modelo',
                content: 'Entre los portátiles la diferencia práctica está en cuánto pesa el equipo y cuántas horas te banca fuera de casa. No siempre van juntos, así que conviene mirar los dos números antes de decidir.\n\nEl KINGON P2-S3 pesa 2,3 kg con batería y rinde entre 4 y 5 horas: es el más liviano del catálogo y alcanza para una salida, un turno médico o media jornada. El KINGON P2-TOC pesa 2,8 kg con batería y estira la autonomía hasta 9,5 horas, para estar todo el día afuera. En autonomía, entre esos dos quedan el P2-E6 (hasta 6 horas) y el P2-E7 (hasta 7).\n\nEl GCE Zen-O pesa 4,66 kg con las dos baterías puestas y llega hasta 8 horas, pero viene con carro de transporte, así que no lo llevás colgado. El Philips SimplyGo pesa 4,5 kg y entrega flujo continuo de 0,5 a 2 L/min además de pulso.\n\nUn detalle que conviene tener claro: la autonomía depende del flujo que uses. A mayor flujo, menos dura la batería. Por eso la pregunta correcta no es cuántas horas rinde el equipo, sino cuántas horas rinde en tu nivel.',
            },
            {
                title: 'Qué viene con el equipo y qué garantía tiene',
                content: 'Todos nuestros portátiles se entregan con batería, cargador de red y cargador para el auto, bolso o mochila de traslado, cánula nasal y manual en español. El cargador de auto no es un detalle menor: el KINGON P2-S3 funciona con corriente de 100 a 240V, con 12V del auto o con su batería, así que lo recargás en pleno viaje por ruta.\n\nEl GCE Zen-O suma la segunda batería y el carro de transporte, y tiene app móvil para seguir el uso del equipo desde el celular.\n\nLa garantía es oficial de fábrica y cambia según la marca: los KINGON tienen 1 año, mientras que el GCE Zen-O y el Philips SimplyGo tienen 3 años. Si el equipo va a ser de uso diario durante varios años, ese dato entra en la cuenta junto con el precio.\n\nOtro dato para quien lo va a usar en la oficina o en reuniones: el P2-S3 trabaja por debajo de los 43 dB, bastante menos que un concentrador estacionario.',
            },
            {
                title: 'El portátil muchas veces no es el único equipo',
                content: 'Muchos pacientes combinan los dos equipos: un concentrador estacionario para las horas en casa y el portátil para salir. No es venta doble, es cómo suele quedar armado el esquema.\n\nEl motivo es técnico. Los portátiles a pulso entregan oxígeno en demanda, cuando detectan la inspiración. Para flujos continuos o para el uso nocturno se recomienda complementar con un [concentrador estacionario](/comprar-concentrador-oxigeno-argentina), que entrega flujo constante y está pensado para funcionar de forma continua las 24 horas. El BMC estacionario, por ejemplo, va de 0,5 a 5 L/min y está $999.000.\n\nPara salidas cortas hay además una opción más económica que un portátil: la mochila de oxígeno, con tubo, regulador, bolso y carga inicial, a U$S 270. Pesa alrededor de 1,8 kg y rinde entre 1 y 3 horas según el flujo, así que sirve para un trámite o un turno médico, no para una jornada completa.\n\nDecinos cuántas horas por día te indicaron y cuántas de esas estás fuera de casa: con esos dos datos armamos la combinación que te sirve, sin que compres de más.',
            },
            {
                title: 'Qué tener a mano antes de escribirnos',
                content: 'Para recomendarte un modelo con precisión necesitamos cuatro datos, y los tenés todos sin llamar a nadie.\n\nQué flujo te indicó el médico, en litros por minuto, y si es continuo o alcanza con pulsos: ese dato descarta o habilita cada equipo. Cuántas horas seguidas necesitás estar fuera de casa, que es lo que define la autonomía. Si vas a viajar en avión y con qué aerolínea, porque cada una tiene sus propios requisitos. Y desde qué provincia escribís, para coordinar el envío.\n\nCon eso te pasamos los modelos que cumplen y el precio del día, antes de que compres. Si estás en Córdoba, también podés [alquilar un portátil](/concentrador-oxigeno-portatil-cordoba) para probar antes de decidir la compra.\n\nRespondemos por WhatsApp todos los días, también fines de semana.',
            },
        ],
        products: [
            { name: 'KINGON P2-S3 (el más liviano de nuestro catálogo, apto vuelos)', price: '$2.735.400' },
            { name: 'KINGON P2-TOC (9,5 hs, continuo + pulso)', price: 'U$S 3.458' },
            { name: 'GCE Zen-O (2 baterías + carro, apto vuelos)', price: 'U$S 3.747' },
            { name: 'Philips SimplyGo (continuo + pulso)', price: 'U$S 3.887' },
        ],
        faq: [
            { q: '¿Cuál es el concentrador portátil más liviano y económico?', a: 'El más liviano de nuestro catálogo es el KINGON P2-S3: 2,3 kg con batería, flujo de pulso en 5 niveles y aprobación FAA para vuelos. Está a $2.735.400.' },
            { q: '¿Puedo viajar en avión con un concentrador portátil?', a: 'Sí, con los modelos aprobados FAA (KINGON P2-S3, GCE Zen-O, Philips SimplyGo). Las aerolíneas piden batería suficiente y aviso previo; te asesoramos con el trámite.' },
            { q: '¿Pulso o flujo continuo?', a: 'Depende de tu indicación médica. Pulso: más liviano y autónomo, para actividad. Continuo: cuando el médico lo indica o para usar durmiendo con CPAP/BiPAP. Te ayudamos a elegir.' },
            { q: '¿Envían a todo el país?', a: 'Sí, enviamos a cualquier provincia con capacitación de uso guiada y garantía oficial. En Córdoba también hay alquiler para probar antes de comprar.' },
            { q: '¿Cuántas horas de batería tiene cada modelo?', a: 'El KINGON P2-S3 da entre 4 y 5 horas, el P2-E6 hasta 6, el P2-E7 hasta 7, el GCE Zen-O hasta 8 con sus dos baterías y el KINGON P2-TOC hasta 9,5. La autonomía depende del flujo configurado: a mayor flujo, menos dura la batería. Decinos cuántas horas necesitás estar fuera de casa y en qué nivel, y te confirmamos qué modelo llega.' },
            { q: '¿Qué garantía tienen los concentradores portátiles?', a: 'La garantía es oficial y depende de la marca: los KINGON tienen 1 año, y el GCE Zen-O y el Philips SimplyGo tienen 3 años. Toda la aparatología está aprobada por ANMAT, y después de la compra tenés capacitación de uso, servicio técnico y provisión de baterías y accesorios.' },
            { q: '¿Puedo usar el concentrador portátil mientras duermo?', a: 'Solo si es un equipo de flujo continuo y tu médico lo autorizó. Los equipos de pulso dependen de detectar cada inspiración, y durante el sueño la respiración se vuelve más superficial. Consultalo con tu neumonólogo antes de usarlo de noche.' },
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
            {
                title: 'Los modos ventilatorios: qué chequear contra tu prescripción',
                content: 'La ficha del equipo lista seis modos: CPAP, S, ST, T, PAC e iVAPS, con un rango de presión de 2 a 40 cm H₂O. Antes de comprar, lo primero es simple: chequear que el modo y las presiones que figuran en tu prescripción entren en esa lista.\n\nEntre esos modos está el ST: el modo S/T es el que suma frecuencia respiratoria de respaldo, que garantiza un número mínimo de respiraciones por minuto aunque el paciente no inicie el ciclo inspiratorio. Es la función por la que este tipo de equipo aparece en enfermedades neuromusculares como la [ELA](/patologia/esclerosis-lateral-amiotrofica).\n\nEl otro dato de la ficha que conviene leer es el uso previsto: 24 horas continuas, en pacientes adultos y pediátricos. No es un equipo pensado solo para la noche.\n\nLos modos, las presiones y las horas de uso los define el médico tratante, siempre. Lo que hacemos nosotros es leer tu prescripción antes de la compra y confirmarte que el equipo cubre lo indicado.',
            },
            {
                title: 'STELLAR 150 o BiPAP: cómo se decide',
                content: 'Es la pregunta que ordena la compra, porque entre las dos opciones hay una diferencia de precio grande: el [BiPAP BMC G3](/bipap-cordoba) está en U$S 907 y el STELLAR 150 en U$S 7.342.\n\nEn números: el G3 trabaja con modos CPAP, S, T y S/T, llega hasta 25 cm H₂O de IPAP y 20 de EPAP, con frecuencia respiratoria de respaldo de 4 a 40 rpm, y está indicado en EPOC, enfermedades neuromusculares e hipoventilación. El STELLAR 150 suma modos (PAC e iVAPS además de CPAP, S, ST y T), llega hasta 40 cm H₂O, trae humidificador H4i y batería interna, y su uso previsto es de 24 horas continuas en adultos y pediátricos, con indicación en ELA, AME, fibrosis y EPOC severa.\n\nLa diferencia de fondo no es solo de números. El BiPAP es un equipo de ventilación no invasiva; el STELLAR 150 soporta además ventilación invasiva por traqueostomía, con alarmas clínicas completas. Por eso lo describimos como el paso siguiente cuando un BiPAP ya no alcanza.\n\nEn ELA, por ejemplo, la ventilación no invasiva suele indicarse primero solo durante el sueño (8 a 10 horas) y, a medida que la enfermedad avanza, el médico puede indicar uso diurno parcial o continuo. Cuál de los dos equipos corresponde lo define tu médico tratante: pasanos la prescripción y te confirmamos cuál cubre los modos y las presiones indicadas antes de que gastes de más.',
            },
            {
                title: 'La batería: cuánto dura y para qué sirve',
                content: 'La batería interna del STELLAR 150 da hasta 2 horas de autonomía y viene incluida con el equipo, junto con el humidificador. Con la batería externa Power Station II, la ficha declara hasta 8 horas.\n\nEsa autonomía está pensada para dos situaciones concretas: los cortes de luz y los traslados, para mover al paciente sin desconectar el equipo. En un ventilador cuyo uso previsto es de 24 horas continuas, no es un accesorio: es parte de lo que estás comprando.\n\nUna aclaración para que no te lleves una sorpresa. Dos horas son una autonomía de contingencia, no un plan de respaldo para un corte largo: si vivís en una zona con cortes frecuentes, planteanoslo antes de comprar. Y si buscás la autonomía de 8 horas, consultanos por WhatsApp disponibilidad y precio de la Power Station II antes de contar con ella.',
            },
            {
                title: 'Qué máscara corresponde: ventilada o sin fuga',
                content: 'Con un ventilador la interfaz no es un detalle de confort, es parte del circuito. Hay dos familias de máscaras y no son intercambiables.\n\nLas máscaras ventiladas tienen orificios de fuga controlada (puertos de exhalación) y son las que corresponden a un CPAP o BiPAP domiciliario estándar: la BMC F6 multitalle a U$S 124 o las DreamWear de Philips, entre otras.\n\nLas máscaras no ventiladas no tienen puertos de exhalación y se reconocen por el codo azul. Son la interfaz correcta para respiradores de terapia intensiva y para ventilación no invasiva con circuito de doble rama o válvula espiratoria, donde la exhalación se maneja por el circuito y no por la máscara. En nuestro catálogo es la BMC F2 codo azul, a $68.000, con conexión estándar de 22 mm.\n\nCuál de las dos corresponde depende del circuito con el que se configure el equipo, y eso lo define el equipo médico tratante. Mandanos la indicación y te decimos qué modelo y qué talle pedir: la máscara no se prueba, se asesora. Podés ver todos los modelos y talles en [máscaras para CPAP y BiPAP](/mascaras-cpap).',
            },
        ],
        products: [
            { name: 'Ventilador ResMed STELLAR 150 (humidificador + batería)', price: 'U$S 7.342' },
            { name: 'Cough Assist — asistente de tos (complemento ELA/AME)', price: 'U$S 9.084' },
            { name: 'BiPAP BMC G3 con frecuencia respiratoria (alternativa no invasiva)', price: 'U$S 907' },
            { name: 'Máscaras de ventilación no invasiva', price: 'desde U$S 35' },
        ],
        faq: [
            { q: '¿El STELLAR 150 sirve para ventilación invasiva y no invasiva?', a: 'Sí, soporta ambas: por traqueostomía (invasiva) y por máscara (no invasiva), en pacientes adultos y pediátricos, con alarmas clínicas y batería interna.' },
            { q: '¿Cuánto cuesta el STELLAR 150 en Argentina?', a: 'Precio de referencia U$S 7.342, con humidificador y batería interna incluidos. Confirmá la cotización del día por WhatsApp. Aprobado por ANMAT con garantía oficial.' },
            { q: '¿Necesito prescripción médica?', a: 'Sí. Es un equipo de soporte vital: la indicación y la configuración las define el médico tratante. Nosotros proveemos el equipo y el soporte técnico.' },
            { q: '¿Qué diferencia hay con un BiPAP?', a: 'El BiPAP es para ventilación no invasiva de soporte. El STELLAR 150 agrega ventilación invasiva, más modos ventilatorios, alarmas clínicas completas y batería interna: es para dependencia ventilatoria de mayor complejidad.' },
            { q: '¿Cuánta autonomía tiene la batería del STELLAR 150?', a: 'La batería interna da hasta 2 horas de autonomía y viene incluida con el equipo, junto con el humidificador. Con la batería externa Power Station II la ficha declara hasta 8 horas: consultanos por WhatsApp disponibilidad y precio de esa batería externa antes de contar con ella. Las 2 horas de la interna son una autonomía de contingencia para cortes de luz y traslados, no un respaldo para un corte largo.' },
            { q: '¿Qué modos ventilatorios y qué presiones maneja el STELLAR 150?', a: 'Los modos disponibles son CPAP, S, ST, T, PAC e iVAPS, con un rango de presión de 2 a 40 cm H₂O. El modo S/T es el que suma frecuencia respiratoria de respaldo, es decir, el que asegura un mínimo de respiraciones por minuto aunque el paciente no inicie el ciclo. Los modos y las presiones los define tu médico tratante: pasanos la prescripción y te confirmamos que el equipo cubra lo indicado antes de que compres.' },
            { q: '¿Se puede alquilar en lugar de comprarlo?', a: 'En Córdoba alquilamos ventiladores domiciliarios, con entrega e instalación a domicilio. El alquiler se cotiza según el equipo y el plazo: escribinos por WhatsApp con la indicación de tu médico y te pasamos la cotización el mismo día. Fuera de Córdoba trabajamos con venta y envío a todo el país.' },
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
        heroImg: '/artifacts/products/1752508033704-poligrafobmc.jpg',
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
            {
                title: 'Opción con 30 cánulas Luer Lock incluidas',
                content: 'El polígrafo se puede comprar solo o con 30 cánulas Luer Lock incluidas.\n\nLa cánula es el insumo descartable que va en cada estudio: se cambia por paciente, así que si vas a empezar a hacer estudios de entrada, la opción con 30 unidades te evita tener que conseguirlas por separado en las primeras semanas.\n\nEl equipo solo cuesta U$S 1.570. La versión con las 30 cánulas Luer Lock incluidas cuesta U$S 1.794. Consultanos por WhatsApp y te confirmamos el valor en pesos del día.',
            },
        ],
        products: [
            { name: 'Polígrafo BMC YH-600B PRO (4 canales + software)', price: 'U$S 1.570' },
            { name: 'CPAP BMC G2S (tratamiento post-diagnóstico)', price: '$499.000' },
            { name: 'CPAP ResMed AirSense 10 (equipo completo)', price: '$799.000' },
            { name: 'Polígrafo BMC YH-600B PRO + 30 cánulas Luer Lock', price: 'U$S 1.794' },
        ],
        faq: [
            { q: '¿Quién puede comprar y usar el polígrafo?', a: 'Está orientado a profesionales e instituciones de salud (neumonólogos, clínicas del sueño, kinesiólogos, centros de diagnóstico). La interpretación del estudio la realiza el médico.' },
            { q: '¿Qué registra el BMC YH-600B PRO?', a: 'Es un polígrafo respiratorio de 4 canales: flujo aéreo nasal, ronquido, saturación de oxígeno y frecuencia cardíaca. Incluye software de descarga y análisis para el informe.' },
            { q: '¿Cuánto cuesta el polígrafo?', a: 'Precio de referencia U$S 1.570, aprobado por ANMAT y con garantía oficial. Confirmá la cotización del día por WhatsApp. Emitimos factura para instituciones.' },
            { q: '¿Incluye capacitación?', a: 'Sí: capacitación de uso del equipo y del software, presencial en Córdoba o guiada a distancia en el resto del país, más soporte técnico permanente.' },
            { q: '¿El polígrafo viene con cánulas?', a: 'Hay dos opciones: el equipo solo, o el equipo con 30 cánulas Luer Lock incluidas por U$S 1.794. La cánula es descartable y se cambia en cada estudio, así que la versión con insumos sirve para arrancar sin depender de otra compra.' },
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
                content: 'El Cough Assist suele combinarse con ventilación no invasiva: BiPAP con frecuencia respiratoria de respaldo (U$S 907) en etapas iniciales, o ventilador ResMed STELLAR 150 (U$S 7.342) cuando la dependencia ventilatoria es mayor, más las máscaras adecuadas en cada etapa, incluida la línea pediátrica para AME. Podemos equipar el cuidado respiratorio completo con un solo proveedor.',
            },
            {
                title: 'Cuándo se indica: los valores que mira el equipo médico',
                content: 'La indicación de un asistente de tos se apoya en la evaluación funcional respiratoria. El valor que se usa para decidir sobre este equipo es el pico de flujo de tos (PCF), que refleja la capacidad de eliminar secreciones.\n\nPor encima de 270 L/min la tos se considera efectiva. Entre 160 y 270 L/min es zona de riesgo, sobre todo durante una infección respiratoria. Por debajo de 160 L/min hay indicación de asistencia mecánica de la tos.\n\nTambién pesan las presiones respiratorias máximas: una PEMAX por debajo de 80 cmH₂O indica tos ineficaz y una PIMAX por debajo de 60 cmH₂O, debilidad inspiratoria significativa. A esos números se suman criterios clínicos que ya usa el equipo tratante, como una tos débil, húmeda o ineficaz y la historia de internaciones por neumonía. Una capacidad vital forzada por debajo del 50% del valor predicho apunta a la necesidad de asistencia ventilatoria, sobre todo durante el sueño, aunque eso se refiere a la ventilación y no a la tos.\n\nEstos valores los mide e interpreta el equipo médico tratante: la indicación y los parámetros los define siempre él. Nosotros vendemos el equipo y te asesoramos. Si ya tenés el estudio funcional y el pedido médico, escribinos por WhatsApp y te pasamos precio, disponibilidad y cómo es el envío a tu provincia. El detalle clínico por patología está en [ELA](/patologia/esclerosis-lateral-amiotrofica), [AME](/patologia/atrofia-muscular-espinal) y [parálisis cerebral](/patologia/paralisis-cerebral).',
            },
            {
                title: 'Qué mirar en la ficha técnica antes de comprar',
                content: 'A un asistente de tos lo definen las presiones que alcanza y cómo se controla el ciclo. Este equipo llega hasta +70 cm H₂O en la insuflación y hasta −70 cm H₂O en la exuflación, y trabaja en modo manual y en modo automático. Con qué valores y en qué modo se usa lo define la indicación médica, no el equipo.\n\nEstá previsto para uso adulto y pediátrico, con interfaces específicas según el caso, y sus indicaciones declaradas son ELA, AME, Duchenne y parálisis cerebral. La garantía declarada es de 2 años.\n\nAntes de cerrar una compra de este monto conviene tener resueltas tres cosas: el pedido médico con los parámetros de presión, con qué interfaz se va a aplicar (máscara, boquilla o traqueostomía) y quién va a operar el equipo en casa, porque la capacitación se hace con esa persona.\n\nSi el paciente ya usa ventilación no invasiva o está por empezarla, contanos qué equipo tiene. Podemos equipar el cuidado respiratorio completo con un solo proveedor y mirar los dos esquemas juntos.',
            },
            {
                title: 'Cómo se usa en casa, día a día',
                content: 'No es un equipo de uso continuo como un concentrador de oxígeno, que está preparado para funcionar las 24 horas: el asistente de tos se usa en sesiones. La pauta habitual es de 2 a 3 sesiones por día, de alrededor de 5 ciclos cada una, y durante una infección respiratoria el médico puede indicar aumentar la frecuencia.\n\nLo puede usar la familia en el domicilio con entrenamiento previo. Esa capacitación es parte de la entrega: formamos a familiares y cuidadores en el uso seguro del equipo, presencial en Córdoba y guiada a distancia en el resto del país, y después quedamos como soporte.\n\nLa frecuencia y los valores de cada sesión salen de la indicación médica o kinésica de cada paciente, así que no hay una pauta única. Si te queda una duda sobre el uso, escribinos por WhatsApp: respondemos consultas todos los días, también fines de semana y fuera del horario comercial.\n\nEs habitual que el asistente de tos se combine con ventilación no invasiva. Si el médico también indicó VNI, podés ver los equipos en [BiPAP con frecuencia respiratoria de respaldo](/bipap-cordoba) y en el [ventilador ResMed STELLAR 150](/ventilador-stellar-150).',
            },
        ],
        products: [
            { name: 'Cough Assist — asistente de tos mecánico', price: 'U$S 9.084' },
            { name: 'BiPAP BMC G3 con frecuencia respiratoria', price: 'U$S 907' },
            { name: 'Ventilador ResMed STELLAR 150', price: 'U$S 7.342' },
            { name: 'Máscaras de ventilación (adultos y pediátricas)', price: 'desde U$S 35' },
        ],
        faq: [
            { q: '¿Qué hace exactamente un Cough Assist?', a: 'Reproduce una tos eficaz mediante insuflación-exuflación mecánica: llena los pulmones con presión positiva y de inmediato aplica presión negativa, generando el flujo que arrastra las secreciones. Es no invasivo.' },
            { q: '¿Para qué pacientes está indicado?', a: 'Para tos débil o ineficaz por enfermedades neuromusculares: ELA, AME, distrofias musculares y lesiones medulares, entre otras. La indicación la define el equipo médico tratante.' },
            { q: '¿Cuánto cuesta el Cough Assist en Argentina?', a: 'Precio de referencia U$S 9.084, aprobado por ANMAT con garantía oficial. Confirmá la cotización del día por WhatsApp. Entregamos presupuesto y factura para el reintegro de la obra social.' },
            { q: '¿La familia puede aprender a usarlo?', a: 'Sí, es parte de la entrega: capacitamos a familiares y cuidadores en el uso seguro (presencial en Córdoba, a distancia en el resto del país) y quedamos como soporte permanente.' },
            { q: '¿Cuántas veces por día se usa el Cough Assist?', a: 'Se usa en sesiones, no de forma continua. La pauta habitual es de 2 a 3 sesiones por día de alrededor de 5 ciclos cada una, y durante una infección respiratoria el médico puede indicar aumentar la frecuencia. La pauta definitiva sale de la indicación médica o kinésica de cada paciente.' },
            { q: '¿Sirve para un paciente pediátrico?', a: 'Sí: está previsto para uso adulto y pediátrico, con interfaces específicas según el caso. Entre sus indicaciones declaradas están la AME, la distrofia de Duchenne y la parálisis cerebral. Contanos la edad del paciente y qué indicó el médico y te pasamos precio, disponibilidad y el envío a tu provincia.' },
            { q: '¿Qué presiones alcanza y qué modos tiene?', a: 'Llega hasta +70 cm H₂O de presión positiva en la insuflación y hasta −70 cm H₂O de presión negativa en la exuflación, y tiene modo manual y modo automático. Los valores de cada sesión los define la indicación médica. La garantía declarada es de 2 años.' },
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
