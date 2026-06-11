// Specs compartidas entre LandingPage y PathologyPage.
// Key = substring clave del nombre del producto (lower-case).

const SPECS = {
    'bmc g2s mini': [
        ['Fabricante', 'BMC Medical'],
        ['Tipo', 'AutoCPAP'],
        ['Rango de presión', '4 – 20 cm H₂O autoajustable'],
        ['Humidificador', 'p2H calefactado'],
        ['Peso', '0,9 kg'],
        ['Accesorios', 'Almohadillas nasales incluidas'],
        ['Garantía', '2 años'],
    ],
    'bmc g2s': [
        ['Fabricante', 'BMC Medical (China)'],
        ['Tipo', 'CPAP fijo'],
        ['Rango de presión', '4 – 20 cm H₂O'],
        ['Humidificador', 'Calefactado integrado'],
        ['Peso', '1,3 kg con humidificador'],
        ['Pantalla', 'LCD color táctil'],
        ['Garantía', '2 años oficiales ANMAT'],
    ],
    'bmc g3': [
        ['Fabricante', 'BMC Medical'],
        ['Tipo', 'BiPAP S/T con frecuencia de respaldo'],
        ['Modos', 'CPAP · S · T · S/T'],
        ['Rango IPAP', '4 – 25 cm H₂O'],
        ['Rango EPAP', '4 – 20 cm H₂O'],
        ['FR respaldo', '4 – 40 rpm'],
        ['Humidificador', 'Calefactado integrado'],
        ['Indicación', 'EPOC, ENM, hipoventilación'],
        ['Garantía', '2 años ANMAT'],
    ],
    'autocpap philips dreamstation': [
        ['Fabricante', 'Philips Respironics'],
        ['Tipo', 'AutoCPAP'],
        ['Rango de presión', '4 – 20 cm H₂O auto'],
        ['Humidificador', 'Calefactado integrado'],
        ['Conectividad', 'WiFi + Bluetooth + app DreamMapper'],
        ['Garantía', '2 años oficiales'],
    ],
    'cpap philips dreamstation': [
        ['Fabricante', 'Philips Respironics'],
        ['Tipo', 'CPAP fijo'],
        ['Rango de presión', '4 – 20 cm H₂O'],
        ['Humidificador', 'Calefactado'],
        ['Conectividad', 'WiFi + Bluetooth'],
        ['Garantía', '2 años'],
    ],
    'autocpap resmed airsense': [
        ['Fabricante', 'ResMed'],
        ['Tipo', 'AutoCPAP AirSense 10 AutoSet'],
        ['Rango de presión', '4 – 20 cm H₂O auto'],
        ['Humidificador', 'HumidAir calefactado'],
        ['Conectividad', 'WiFi + 4G (AirView + myAir)'],
        ['Garantía', '2 años'],
    ],
    'resmed airsense': [
        ['Fabricante', 'ResMed'],
        ['Tipo', 'CPAP fijo AirSense 10'],
        ['Rango de presión', '4 – 20 cm H₂O'],
        ['Humidificador', 'HumidAir calefactado'],
        ['Conectividad', 'AirView + myAir'],
        ['Garantía', '2 años'],
    ],
    'stellar 150': [
        ['Fabricante', 'ResMed'],
        ['Tipo', 'Ventilador no invasivo de alta gama'],
        ['Modos', 'CPAP · S · ST · T · PAC · iVAPS'],
        ['Rango de presión', '2 – 40 cm H₂O'],
        ['Batería interna', 'Hasta 2 hs'],
        ['Humidificador', 'H4i integrado'],
        ['Indicación', 'ELA, AME, fibrosis, EPOC severa'],
        ['Garantía', '2 años'],
    ],
    'cough assist': [
        ['Tipo', 'Insuflador–exsuflador mecánico'],
        ['Presión positiva', 'Hasta +70 cm H₂O'],
        ['Presión negativa', 'Hasta −70 cm H₂O'],
        ['Modos', 'Manual y automático'],
        ['Indicación', 'ELA, AME, Duchenne, parálisis cerebral'],
        ['Función', 'Simula la tos para movilizar secreciones'],
        ['Uso', 'Adulto y pediátrico'],
        ['Garantía', '2 años'],
    ],
    'kingon p2-toc': [
        ['Fabricante', 'KINGON'],
        ['Tipo', 'Concentrador portátil a pulso — batería extendida'],
        ['Flujo', '5 settings (1 – 5)'],
        ['Autonomía', 'Hasta 9,5 hs'],
        ['Peso', '2,8 kg con batería'],
        ['Apto vuelos', 'FAA'],
        ['Garantía', '1 año'],
    ],
    'kingon p2-s3': [
        ['Fabricante', 'KINGON'],
        ['Tipo', 'Portátil a pulso'],
        ['Flujo', '5 settings (1 – 5)'],
        ['Peso', '2,3 kg'],
        ['Autonomía', '4 – 5 hs'],
        ['Ruido', '< 43 dB'],
        ['Apto vuelos', 'FAA'],
        ['Garantía', '1 año'],
    ],
    'gce zen-o': [
        ['Fabricante', 'GCE Healthcare'],
        ['Tipo', 'Portátil a pulso premium'],
        ['Flujo', '5 settings (1 – 5)'],
        ['Peso', '4,66 kg con 2 baterías'],
        ['Autonomía', 'Hasta 8 hs'],
        ['Incluye', 'Carro + 2 baterías + cargadores'],
        ['Apto vuelos', 'FAA'],
        ['Garantía', '3 años'],
    ],
    'yuwell estacionario': [
        ['Fabricante', 'YUWELL'],
        ['Tipo', 'Concentrador estacionario'],
        ['Flujo', '0,5 – 5 L/min'],
        ['Pureza O₂', '93% ± 3%'],
        ['Ruido', '< 45 dB'],
        ['Peso', '14 kg con ruedas'],
        ['Garantía', '2 años'],
    ],
    'dreamwear': [
        ['Fabricante', 'Philips Respironics'],
        ['Tipo', 'Máscara de mínimo contacto'],
        ['Tallas', 'S / M / L'],
        ['Material', 'Silicona hipoalergénica'],
        ['Compatibilidad', 'CPAP / BiPAP'],
    ],
    'bmc n4': [
        ['Fabricante', 'BMC Medical'],
        ['Tipo', 'Nasal con apoya frente'],
        ['Tallas', 'M / L'],
        ['Compatibilidad', 'CPAP / BiPAP'],
    ],
    'rescomf': [
        ['Fabricante', 'Rescomf'],
        ['Tipo', 'Nasal con apoya frente'],
        ['Tallas', 'S / M / L'],
        ['Arnés', '4 puntos de fijación'],
        ['Compatibilidad', 'CPAP / BiPAP'],
    ],
    'neoq infant': [
        ['Fabricante', 'NeoQ'],
        ['Tipo', 'Nasal pediátrica'],
        ['Tallas', 'XS / S / M / L'],
        ['Uso', 'Lactantes, niños con AME / PC'],
        ['Material', 'Silicona médica suave'],
    ],
    'bmc f6': [
        ['Fabricante', 'BMC Medical'],
        ['Tipo', 'Nasobucal con apoya frente'],
        ['Tallas', 'S / M / L'],
        ['Compatibilidad', 'CPAP / BiPAP'],
    ],
    'yuwell yf02': [
        ['Fabricante', 'YUWELL'],
        ['Modelo', 'YF02'],
        ['Tipo', 'Nasobucal sin apoya frente'],
        ['Tallas', 'S / M / L'],
        ['Compatibilidad', 'CPAP / BiPAP'],
    ],
    'yuwell': [
        ['Fabricante', 'YUWELL'],
        ['Tipo', 'Nasobucal con apoya frente'],
        ['Tallas', 'S / M / L'],
        ['Compatibilidad', 'CPAP / BiPAP'],
    ],
};

export const getSpecsFor = (productName) => {
    if (!productName) return [];
    const n = productName.toLowerCase();
    // buscar la clave más específica (más larga) que matchee
    const keys = Object.keys(SPECS).sort((a, b) => b.length - a.length);
    for (const k of keys) {
        if (n.includes(k)) return SPECS[k];
    }
    return [];
};

export default SPECS;
