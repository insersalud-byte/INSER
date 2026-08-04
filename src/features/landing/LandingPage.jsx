import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Moon, Wind, Activity, Brain, Zap, Heart,
    CheckCircle, Clock, Award, Users,
    Lightbulb, Shield, Bell, RefreshCw,
    Phone, Mail, MapPin, Star, Menu, X, MessageCircle,
    Layers, Droplet, Waves, Stethoscope, ChevronDown, BookOpen,
    Instagram, Facebook, Truck
} from 'lucide-react';
import LeadForm from '../../components/LeadForm';
import css from './LandingPage.module.css';
import { productGalleries } from './productGalleries';
import { localPages } from '../seo/localPages';

// Resuelve la galería de imágenes de un producto.
// Prioridad: (1) product.images si existe, (2) productGalleries[slug], (3) [product.img]
const getGallery = (p) => {
    if (Array.isArray(p.images) && p.images.length) return p.images;
    if (p.slug && productGalleries[p.slug]) return productGalleries[p.slug];
    return [p.img];
};

// Precio doble moneda ("$1.300.000 · U$S 907"): si va en una sola linea grande,
// el navegador la corta donde cae y parte el simbolo del monto. Lo separamos a
// proposito: pesos en grande, dolares abajo en chico, cada uno sin cortarse.
const Precio = ({ valor, className }) => {
    const partes = String(valor || '').split('·').map((s) => s.trim()).filter(Boolean);
    if (partes.length < 2) return <div className={className}>{valor}</div>;
    return (
        <div className={className}>
            <span style={{ whiteSpace: 'nowrap' }}>{partes[0]}</span>
            <span style={{ display: 'block', fontSize: '0.62em', fontWeight: 600, opacity: 0.75, whiteSpace: 'nowrap' }}>
                {partes[1]}
            </span>
        </div>
    );
};

// ── Datos ──────────────────────────────────────────────────────────────────
// OFERTAS = todos los productos con precio en pesos ARS (promo local)
const ofertas = [
    {
        name: 'CPAP ResMed AirSense 10', slug: 'cpap-resmed-airsense-10', price: '$799.000', img: '/artifacts/products/resmed_airsense10_3.jpg', images: ['/artifacts/products/resmed_airsense10_3.jpg', '/artifacts/products/resmed_airsense10_4.jpg', '/artifacts/products/resmed_airsense10_2.jpg', '/artifacts/products/resmed_airsense10_5.jpg', '/artifacts/products/resmed_airsense10_1.jpg'], badge: 'OFERTA', note: 'El estándar de oro en apnea del sueño. Equipo completo.', category: 'CPAP',
        review: 'El ResMed AirSense 10 es el estándar de oro en el tratamiento de la apnea del sueño y uno de los equipos más elegidos del mundo. Entrega una presión continua estable y confiable que mantiene tus vías respiratorias abiertas durante toda la noche. Incluye humidificador HumidAir integrado para evitar la sequedad de nariz y garganta, alivio en la exhalación (EPR) que hace más natural el momento de exhalar, y la función AutoRamp que arranca con presión suave y sube recién cuando ya estás dormido. Se conecta a la app myAir para que veas tu calidad de sueño cada mañana, y es notablemente silencioso (26 dB). Viene completo: humidificador, tubuladura, fuente, tarjeta SD y bolso de transporte. Aparatología aprobada por ANMAT, con 2 años de garantía oficial. Si preferís, también lo tenemos disponible en alquiler.',
        specs: [
            ['Fabricante', 'ResMed (Australia)'],
            ['Tipo', 'CPAP — presión continua fija'],
            ['Rango de presión', '4 – 20 cm H₂O'],
            ['Humidificador', 'HumidAir calefactado integrado'],
            ['Alivio espiratorio', 'EPR 1 – 3 cm H₂O'],
            ['AutoRamp', 'Sí, con detección de sueño'],
            ['Conectividad', 'Módulo celular + app myAir'],
            ['Nivel sonoro', '26 dBA (ultra silencioso)'],
            ['Pantalla', 'LCD color'],
            ['Incluye', 'Humidificador, tubuladura, fuente, tarjeta SD y bolso'],
            ['Garantía', '2 años oficiales ANMAT'],
        ],
    },
    {
        name: 'CPAP BMC G2S con Humidificador', slug: 'cpap-bmc-g2s', price: '$499.000', img: '/artifacts/products/1752160942319-bmcg2.2.jfif', badge: 'OFERTA', note: 'El más vendido. CPAP fijo.', category: 'CPAP',
        specs: [
            ['Fabricante', 'BMC Medical (China)'],
            ['Tipo', 'CPAP fijo (presión constante)'],
            ['Rango de presión', '4 – 20 cm H₂O'],
            ['Humidificador', 'Incluido, calefactado integrado'],
            ['Rampa', '0 – 60 min, presión inicial 4 cm H₂O'],
            ['Nivel sonoro', '< 30 dB'],
            ['Pantalla', 'LCD color táctil'],
            ['Peso', '1,3 kg con humidificador'],
            ['Tarjeta SD', 'Sí, para registro de uso'],
            ['Garantía', '2 años oficiales ANMAT'],
        ],
    },
    {
        name: 'AUTOCPAP BMC G2S Mini con Almohadillas Nasales', slug: 'oferta-autocpap-bmc-g2s-m1-mini-con-almohadillas-nasales-con-humidificador-p2h-', price: 'U$S 1.400', img: '/artifacts/products/fcd9a652-1366-4c5a-916d-e4321777fe9e.jpeg', badge: 'OFERTA', note: 'Con humidificador p2H incluido.', category: 'CPAP',
        specs: [
            ['Fabricante', 'BMC Medical'],
            ['Tipo', 'AutoCPAP (presión automática)'],
            ['Rango de presión', '4 – 20 cm H₂O autoajustable'],
            ['Humidificador', 'p2H calefactado incluido'],
            ['Accesorios', 'Almohadillas nasales incluidas'],
            ['Peso', '0,9 kg (el más liviano de su gama)'],
            ['Alimentación', '100–240 V AC / 24 V DC'],
            ['Conectividad', 'Tarjeta SD'],
            ['Garantía', '2 años oficiales'],
        ],
    },
    {
        name: 'BiPAP BMC G3 con Frecuencia Respiratoria y Humidificador', slug: 'bipap-bmc-g2-con-frecuencia-respiratoria-y-humidificador', price: '$1.300.000 · U$S 907', img: '/artifacts/products/2cffdc89-7433-4bcb-80cd-7f2862733ec0.jpg', badge: 'OFERTA', note: 'Con FR de respaldo. Ideal ENM.', category: 'BiPAP',
        specs: [
            ['Fabricante', 'BMC Medical'],
            ['Tipo', 'BiPAP S/T con frecuencia respiratoria de respaldo'],
            ['Modos', 'CPAP, S (Spontaneous), T (Timed), S/T'],
            ['Rango IPAP', '4 – 25 cm H₂O'],
            ['Rango EPAP', '4 – 20 cm H₂O'],
            ['Frecuencia respiratoria', '4 – 40 rpm'],
            ['Humidificador', 'Calefactado integrado'],
            ['Indicación', 'EPOC, ENM, hipoventilación, AOS compleja'],
            ['Pantalla', 'LCD color'],
            ['Garantía', '2 años oficiales ANMAT'],
        ],
    },
    {
        name: 'Concentrador Portátil KINGON P2-S3', slug: 'concentrador-de-oxigeno-portatil-kingon-p2-s3-el-mas-liviano-y-economico', price: '$2.735.400 · U$S 1.880', img: '/artifacts/products/f18cede5-9404-4eee-a751-01f532e715d7.jpg', badge: 'OFERTA', note: 'El más liviano y económico.', category: 'Concentrador',
        specs: [
            ['Fabricante', 'KINGON (China, ANMAT)'],
            ['Tipo', 'Concentrador portátil a pulso'],
            ['Flujo', '5 settings de pulso (1 – 5)'],
            ['Peso', '2,3 kg con batería (el más liviano)'],
            ['Autonomía', '≈ 4 – 5 hs con batería estándar'],
            ['Alimentación', 'AC 100–240V / DC 12V / batería'],
            ['Ruido', '< 43 dB'],
            ['Apto vuelos', 'FAA aprobado'],
            ['Incluye', 'Bolso de transporte + cánula + cargadores'],
            ['Garantía', '1 año oficial'],
        ],
    },
    {
        name: 'Concentrador de Oxígeno BMC Estacionario', slug: 'concentrador-de-oxigeno-bmc-estacionario', price: '$999.000', img: '/artifacts/products/concentrador_bmc_1.jpg', images: ['/artifacts/products/concentrador_bmc_1.jpg', '/artifacts/products/concentrador_bmc_2.jpg'], badge: 'OFERTA', note: 'Con control remoto y medidor de oxígeno.', category: 'Concentrador',
        specs: [
            ['Fabricante', 'BMC Medical'],
            ['Tipo', 'Concentrador estacionario domiciliario'],
            ['Control remoto', 'Sí — manejo a distancia'],
            ['Medidor de O₂', 'Sí — monitor de pureza integrado'],
            ['Flujo', '0,5 – 5 L/min'],
            ['Pureza O₂', '≥ 93%'],
            ['Pantalla', 'Display digital (pureza, flujo, horas)'],
            ['Uso', 'Continuo 24hs'],
            ['Garantía', '2 años'],
        ],
    },
    {
        name: 'Concentrador Portátil GCE Zen-O (2 Bat. + Carro)', slug: 'concentrador-portatil-gce-zen-o-con-carrito-y-2-baterias', price: '$5.451.885 · U$S 3.747', img: '/artifacts/products/47b7a3ad-17b0-41c1-a9a9-0b26530f595e.jpg', badge: 'OFERTA', note: 'Homologado para vuelos.', category: 'Concentrador',
        specs: [
            ['Fabricante', 'GCE Healthcare (Europa)'],
            ['Tipo', 'Concentrador portátil a pulso'],
            ['Flujo', '5 settings (1 – 5)'],
            ['Peso', '4,66 kg con 2 baterías'],
            ['Autonomía', 'Hasta 8 hs con 2 baterías'],
            ['Incluye', 'Carro de transporte + 2 baterías + cargadores'],
            ['Apto vuelos', 'FAA homologado'],
            ['Conectividad', 'App móvil para seguimiento'],
            ['Garantía', '3 años oficiales (premium)'],
        ],
    },
    {
        name: 'Mascarilla Nasal DreamWear — Mínimo Contacto', slug: 'mascarilla-nasal-cpap', price: '$223.000 · U$S 153', img: '/artifacts/products/1751037116992-1000306910.jpg', badge: 'OFERTA', note: 'CPAP/BiPAP.', category: 'Máscara',
        specs: [
            ['Fabricante', 'Philips Respironics'],
            ['Tipo', 'Máscara nasal de mínimo contacto'],
            ['Compatibilidad', 'CPAP, AutoCPAP, BiPAP'],
            ['Material', 'Silicona hipoalergénica suave'],
            ['Tubo', 'Ingresa por la parte superior de la cabeza'],
            ['Tallas', 'S / M / L / MW'],
            ['Ventaja', 'Sin presión sobre puente nasal, 360° libertad de movimiento'],
            ['Ideal para', 'Quienes duermen de costado o boca abajo'],
        ],
    },
    {
        name: 'Máscara Nasal RESCOMF CPAP/BIPAP', slug: 'mascara-nasal-para-cpap-y-bipap', price: '$50.000 · U$S 35', img: '/artifacts/products/1751037583753-1000306949.jpg', badge: 'OFERTA', note: 'La más económica del mercado.', category: 'Máscara',
        specs: [
            ['Fabricante', 'Rescomf'],
            ['Tipo', 'Máscara nasal con apoya frente'],
            ['Compatibilidad', 'CPAP, AutoCPAP, BiPAP (conector universal)'],
            ['Material', 'Silicona médica suave'],
            ['Tallas', 'S / M / L'],
            ['Arnés', '4 puntos de fijación ajustables'],
            ['Ventaja', 'Excelente relación precio–calidad'],
            ['Garantía', '90 días'],
        ],
    },
    {
        name: 'Mascarilla Nasobucal DreamWear Philips CPAP', slug: 'mascarilla-nasobucal-dreamwear-philips-cpap', price: '$229.000 · U$S 157', img: '/artifacts/products/1752247435824-666541bd-3849-490c-bb8b-efd84470de78.jfif', badge: 'OFERTA', note: 'Mínimo contacto.', category: 'Máscara',
        specs: [
            ['Fabricante', 'Philips Respironics'],
            ['Tipo', 'Máscara nasobucal (full face) de mínimo contacto'],
            ['Compatibilidad', 'CPAP, AutoCPAP, BiPAP'],
            ['Material', 'Silicona hipoalergénica'],
            ['Tubo superior', 'Sale por la parte superior de la cabeza'],
            ['Tallas', 'S / M / L'],
            ['Ideal para', 'Respiradores bucales o presiones altas'],
            ['Ventaja', 'Sin contacto con puente nasal'],
        ],
    },
    {
        name: 'Máscara Nasobucal BMC F6 Multitalle', slug: 'mascara-cpap-bipap-bmc-f6-nasobucal-con-apoya-frontal-', price: '$198.000 · U$S 124', img: '/artifacts/products/bmc_f2_1.jpg', images: ['/artifacts/products/bmc_f2_1.jpg', '/artifacts/products/bmc_f2_2.jpg', '/artifacts/products/bmc_f2_3.jpg'], badge: 'OFERTA', note: 'Tan cómoda como la DreamWear, a mejor precio.', category: 'Máscara',
        specs: [
            ['Fabricante', 'BMC Medical'],
            ['Tipo', 'Nasobucal (full face) con apoya frente'],
            ['Tallas', 'S / M / L (multitalle)'],
            ['Compatibilidad', 'CPAP / BiPAP'],
            ['Ventaja', 'Tan cómoda como la DreamWear pero más económica'],
            ['Material', 'Silicona médica suave'],
            ['Garantía', '1 año oficial'],
        ],
    },
    {
        name: 'Máscara Buconasal BMC F2 Codo Azul — Terapia Intensiva', slug: 'mascara-buconasal-bmc-f2-codo-azul', price: '$68.000', img: '/artifacts/products/bmc_f2_codo_azul_2.jpg', images: ['/artifacts/products/bmc_f2_codo_azul_2.jpg', '/artifacts/products/bmc_f2_codo_azul_1.jpg'], badge: 'OFERTA', note: 'SIN FUGA (no ventilada): para respiradores de terapia intensiva.', category: 'Máscara',
        review: 'Máscara buconasal (full face) BMC F2 con codo azul SIN FUGA: a diferencia de las máscaras ventiladas de CPAP domiciliario, no tiene puertos de exhalación, por eso es la interfaz correcta para respiradores de terapia intensiva y ventilación no invasiva con válvula espiratoria en el circuito. Silicona médica hipoalergénica, arnés con apoya frente y conexión estándar de 22 mm. Ideal para clínicas, sanatorios e internación domiciliaria con ventilador. Importante: para CPAP o BiPAP domiciliario estándar corresponde una máscara ventilada (como la BMC F6 o la DreamWear).',
        specs: [
            ['Fabricante', 'BMC Medical'],
            ['Tipo', 'Buconasal (full face) NO ventilada — codo azul'],
            ['Uso', 'Respiradores de terapia intensiva / VNI con válvula espiratoria'],
            ['Fuga', 'SIN puertos de exhalación (sin fuga intencional)'],
            ['Conexión', 'Estándar 22 mm'],
            ['Material', 'Silicona médica hipoalergénica'],
            ['Importante', 'NO usar con CPAP/BiPAP domiciliario estándar (requieren máscara ventilada)'],
            ['Garantía', '1 año oficial'],
        ],
    },
];

// Catálogo completo de tienda (todos los productos)
const tienda = [
    // ── CPAP / AUTOCPAP ──────────────────────────────────────────────────────
    {
        name: 'CPAP BMC G2S con Humidificador', slug: 'cpap-bmc-g2s', price: '$499.000', img: '/artifacts/products/1752160942319-bmcg2.2.jfif', badge: 'OFERTA', note: 'El más vendido. CPAP fijo.', category: 'CPAP',
        specs: [
            ['Fabricante', 'BMC Medical (China)'],
            ['Tipo', 'CPAP fijo'],
            ['Rango de presión', '4 – 20 cm H₂O'],
            ['Humidificador', 'Calefactado integrado'],
            ['Peso', '1,3 kg con humidificador'],
            ['Pantalla', 'LCD color táctil'],
            ['Garantía', '2 años oficiales ANMAT'],
        ],
    },
    {
        name: 'AUTOCPAP BMC G2S Mini con Almohadillas Nasales', slug: 'oferta-autocpap-bmc-g2s-m1-mini-con-almohadillas-nasales-con-humidificador-p2h-', price: 'U$S 1.400', img: '/artifacts/products/fcd9a652-1366-4c5a-916d-e4321777fe9e.jpeg', badge: 'OFERTA', note: 'Con humidificador p2H incluido.', category: 'CPAP',
        specs: [
            ['Fabricante', 'BMC Medical'],
            ['Tipo', 'AutoCPAP'],
            ['Rango de presión', '4 – 20 cm H₂O autoajustable'],
            ['Humidificador', 'p2H calefactado'],
            ['Peso', '0,9 kg'],
            ['Accesorios', 'Almohadillas nasales incluidas'],
            ['Garantía', '2 años'],
        ],
    },
    {
        name: 'AUTOCPAP BMC G2S con Humidificador', slug: 'autocpap-bmc-g2s', price: '$600.000', img: '/artifacts/products/autocpap_bmc_g2_2.jpg', images: ['/artifacts/products/autocpap_bmc_g2_2.jpg', '/artifacts/products/autocpap_bmc_g2_1.jpg', '/artifacts/products/autocpap_bmc_g2_3.jpg'], badge: 'NUEVO', note: 'Presión automática. Equipo completo con bolso.', category: 'CPAP',
        specs: [
            ['Fabricante', 'BMC Medical'],
            ['Tipo', 'AutoCPAP (presión automática)'],
            ['Rango de presión', '4 – 20 cm H₂O autoajustable'],
            ['Humidificador', 'Calefactado integrado'],
            ['Rampa', 'Automática, presión inicial reducida'],
            ['Pantalla', 'LCD color'],
            ['Incluye', 'Equipo, humidificador, tubuladura, fuente y bolso de transporte'],
            ['Tarjeta SD', 'Sí, registro de uso'],
            ['Garantía', '2 años oficiales ANMAT'],
        ],
    },
    {
        name: 'AUTOCPAP PHILIPS DREAMSTATION con Humidificador', slug: 'autocpap-philips-dreamstation-con-humidificador-y-conectividad-', price: 'U$S 758', img: '/artifacts/products/bbb738c4-8671-4228-b86d-6f1ffd179569.jpg', badge: null, note: 'Con conectividad.', category: 'CPAP',
        specs: [
            ['Fabricante', 'Philips Respironics'],
            ['Tipo', 'AutoCPAP'],
            ['Rango de presión', '4 – 20 cm H₂O auto'],
            ['Humidificador', 'Calefactado integrado'],
            ['Conectividad', 'WiFi + Bluetooth + app DreamMapper'],
            ['Pantalla', 'Color 2,8"'],
            ['Garantía', '2 años oficiales'],
        ],
    },
    {
        name: 'CPAP PHILIPS DREAMSTATION con Humidificador', slug: 'cpap-philips-dreamstation-con-humidificador-y-conectividad-', price: 'U$S 579', img: '/artifacts/products/64719ec9-c027-4d35-8280-ffa4ac3d291e.jpg', badge: null, note: 'Con conectividad.', category: 'CPAP',
        specs: [
            ['Fabricante', 'Philips Respironics'],
            ['Tipo', 'CPAP fijo'],
            ['Rango de presión', '4 – 20 cm H₂O'],
            ['Humidificador', 'Calefactado'],
            ['Conectividad', 'WiFi + Bluetooth'],
            ['Garantía', '2 años'],
        ],
    },

    {
        name: 'AUTOCPAP RESMED AIRSENSE 10 con Conectividad', slug: 'autocpap-resmed-airsense-10-con-nube', price: 'U$S 907', img: '/artifacts/products/38e665d6-2c44-4e1b-8c1d-7578f26aea9d.jpg', badge: null, note: 'Con humidificador.', category: 'CPAP',
        specs: [
            ['Fabricante', 'ResMed'],
            ['Tipo', 'AutoCPAP AirSense 10 AutoSet'],
            ['Rango de presión', '4 – 20 cm H₂O auto'],
            ['Humidificador', 'HumidAir calefactado'],
            ['Algoritmo', 'AutoSet con detección AOS/AOC'],
            ['Conectividad', 'WiFi + 4G (AirView)'],
            ['Garantía', '2 años'],
        ],
    },
    // ── BiPAP / Ventiladores ─────────────────────────────────────────────────
    {
        name: 'BiPAP BMC G3 con Frecuencia Respiratoria y Humidificador', slug: 'bipap-bmc-g2-con-frecuencia-respiratoria-y-humidificador', price: '$1.300.000 · U$S 907', img: '/artifacts/products/2cffdc89-7433-4bcb-80cd-7f2862733ec0.jpg', badge: 'OFERTA', note: 'Con FR de respaldo. Ideal ENM.', category: 'BiPAP',
        specs: [
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
    },
    {
        name: 'STELLAR 150 RESMED con Humidificador y Batería', slug: 'stellar-50-resmed-con-humidificador-y-bateria', price: 'U$S 7.342', img: '/artifacts/products/b3205a47-2021-4f73-b11a-a48ac33e29ce.jpg', badge: 'PREMIUM', note: 'Ventilador de alta gama.', category: 'BiPAP',
        specs: [
            ['Fabricante', 'ResMed'],
            ['Tipo', 'Ventilador no invasivo de alta gama'],
            ['Modos', 'CPAP · S · ST · T · PAC · iVAPS'],
            ['Rango de presión', '2 – 40 cm H₂O'],
            ['Batería interna', 'Hasta 2 hs'],
            ['Batería externa', 'Hasta 8 hs con Power Station II'],
            ['Humidificador', 'H4i integrado'],
            ['Uso', '24hs continuos, adultos y pediátricos'],
            ['Indicación', 'ELA, AME, fibrosis, EPOC severa'],
            ['Garantía', '2 años oficiales'],
        ],
    },
    // ── Cough Assist ─────────────────────────────────────────────────────────
    {
        name: 'Cough Assist — Asistente de Tos', slug: 'cough-asisst-asistente-tos', price: 'U$S 9.084', img: '/artifacts/products/a44d34ae-c159-4f83-8c8d-41c2fcfc4e49.jpg', badge: 'ESENCIAL', note: 'Para enfermedades neuromusculares.', category: 'Cough Assist',
        specs: [
            ['Tipo', 'Insuflador–exsuflador mecánico (asistente de tos)'],
            ['Presión positiva', 'Hasta +70 cm H₂O'],
            ['Presión negativa', 'Hasta −70 cm H₂O'],
            ['Modos', 'Manual y automático'],
            ['Indicación', 'ELA, AME, Duchenne, parálisis cerebral'],
            ['Función', 'Simula el mecanismo de la tos para movilizar secreciones'],
            ['Uso', 'Adulto y pediátrico'],
            ['Garantía', '2 años'],
        ],
    },
    // ── Concentradores Portátiles ────────────────────────────────────────────
    {
        name: 'Concentrador Portátil KINGON P2-S3', slug: 'concentrador-de-oxigeno-portatil-kingon-p2-s3-el-mas-liviano-y-economico', price: '$2.735.400 · U$S 1.880', img: '/artifacts/products/f18cede5-9404-4eee-a751-01f532e715d7.jpg', badge: 'OFERTA', note: 'El más liviano y económico.', category: 'Concentrador',
        specs: [
            ['Fabricante', 'KINGON'],
            ['Tipo', 'Concentrador portátil a pulso'],
            ['Flujo', '5 settings (1 – 5)'],
            ['Peso', '2,3 kg'],
            ['Autonomía', '4 – 5 hs'],
            ['Ruido', '< 43 dB'],
            ['Apto vuelos', 'FAA'],
            ['Garantía', '1 año'],
        ],
    },
    {
        name: 'Concentrador Portátil KINGON P2-TOC 9,5 Hs', slug: 'concentrador-de-oxigeno-portatil-kingon-p2-toc', price: 'U$S 3.458', img: '/artifacts/products/dbf2f4a8-6dd6-4d06-863f-2a14deaa9086.jpg', badge: '9,5 HS', note: 'Máxima autonomía de batería.', category: 'Concentrador',
        specs: [
            ['Fabricante', 'KINGON'],
            ['Tipo', 'Concentrador portátil a pulso — batería extendida'],
            ['Flujo', '5 settings (1 – 5)'],
            ['Autonomía', 'Hasta 9,5 hs'],
            ['Peso', '2,8 kg con batería'],
            ['Apto vuelos', 'FAA'],
            ['Garantía', '1 año'],
        ],
    },
    {
        name: 'Concentrador Portátil GCE Zen-O (2 Bat. + Carro)', slug: 'concentrador-portatil-gce-zen-o-con-carrito-y-2-baterias', price: '$5.451.885 · U$S 3.747', img: '/artifacts/products/47b7a3ad-17b0-41c1-a9a9-0b26530f595e.jpg', badge: 'OFERTA', note: 'Homologado para vuelos.', category: 'Concentrador',
        specs: [
            ['Fabricante', 'GCE Healthcare'],
            ['Tipo', 'Portátil a pulso premium'],
            ['Flujo', '5 settings (1 – 5)'],
            ['Peso', '4,66 kg con 2 baterías'],
            ['Autonomía', 'Hasta 8 hs'],
            ['Incluye', 'Carro + 2 baterías + cargadores'],
            ['Apto vuelos', 'FAA'],
            ['Garantía', '3 años'],
        ],
    },
    // ── Concentradores Estacionarios ─────────────────────────────────────────
    {
        name: 'Concentrador de Oxígeno YUWELL 10 Litros (Alto Flujo)', slug: 'concentrador-de-oxigeno-yuwell-10-litros', price: '$2.800.000', img: '/artifacts/products/concentrador_yuwell_10l_2.jpg', images: ['/artifacts/products/concentrador_yuwell_10l_2.jpg', '/artifacts/products/concentrador_yuwell_10l_1.jpg'], badge: 'ALTO FLUJO', note: 'Hasta 10 L/min, el doble del estándar. Para alta demanda de oxígeno y centros de rehabilitación pulmonar.', category: 'Concentrador',
        specs: [
            ['Fabricante', 'YUWELL (China)'],
            ['Tipo', 'Concentrador estacionario de alto flujo'],
            ['Flujo', '1 – 10 L/min (el doble del concentrador estándar de 5 L)'],
            ['Indicado para', 'Alta demanda de oxígeno y centros de rehabilitación pulmonar'],
            ['Uso', 'Continuo, 24 hs'],
            ['Pantalla', 'Display digital de flujo'],
            ['Alarmas', 'De seguridad (corte de energía y baja concentración)'],
            ['Movilidad', 'Ruedas para traslado'],
            ['Garantía', '1 año oficial'],
        ],
    },
    {
        name: 'Concentrador de Oxígeno YUWELL Estacionario', slug: 'concentrador-de-oxigeno-estacionario1', price: 'U$S 713', img: '/artifacts/products/b9875919-47d8-482e-ba62-800aff89739d.jpeg', badge: null, note: 'Para uso domiciliario. 5 L/min.', category: 'Concentrador',
        specs: [
            ['Fabricante', 'YUWELL (China)'],
            ['Tipo', 'Concentrador estacionario (domiciliario)'],
            ['Flujo', '0,5 – 5 L/min'],
            ['Pureza O₂', '93% ± 3%'],
            ['Consumo', '≈ 300 W'],
            ['Ruido', '< 45 dB'],
            ['Peso', '14 kg con ruedas'],
            ['Garantía', '2 años'],
        ],
    },
    // ── Máscaras Nasales ─────────────────────────────────────────────────────
    {
        name: 'Mascarilla Nasal DreamWear — Mínimo Contacto', slug: 'mascarilla-nasal-cpap', price: '$223.000 · U$S 153', img: '/artifacts/products/1751037116992-1000306910.jpg', badge: 'OFERTA', note: 'CPAP/BiPAP.', category: 'Máscara',
        specs: [
            ['Fabricante', 'Philips Respironics'],
            ['Tipo', 'Nasal de mínimo contacto'],
            ['Tallas', 'S / M / L / MW'],
            ['Material', 'Silicona hipoalergénica'],
            ['Compatibilidad', 'CPAP / BiPAP'],
        ],
    },
    {
        name: 'Máscara Nasal BMC N4 con Apoya Frente (M/L)', slug: 'nascara-nasal-con-apoya-frente-bmc-n4-talle-m-l', price: 'U$S 36', img: '/artifacts/products/231e89f7-3ea1-4155-84ba-d67de27ddf8d.jpg', badge: null, note: 'Opción económica.', category: 'Máscara',
        specs: [
            ['Fabricante', 'BMC Medical'],
            ['Tipo', 'Nasal con apoya frente'],
            ['Tallas', 'M / L'],
            ['Material', 'Silicona'],
            ['Compatibilidad', 'CPAP / BiPAP (conector universal)'],
        ],
    },
    {
        name: 'Máscara Nasal RESCOMF CPAP/BIPAP', slug: 'mascara-nasal-para-cpap-y-bipap', price: '$50.000 · U$S 35', img: '/artifacts/products/1751037583753-1000306949.jpg', badge: 'OFERTA', note: 'La más económica del mercado.', category: 'Máscara',
        specs: [
            ['Fabricante', 'Rescomf'],
            ['Tipo', 'Nasal con apoya frente'],
            ['Tallas', 'S / M / L'],
            ['Arnés', '4 puntos de fijación'],
            ['Compatibilidad', 'CPAP / BiPAP'],
        ],
    },

    // ── Máscaras Nasobucales ─────────────────────────────────────────────────
    {
        name: 'Mascarilla Nasobucal DreamWear Philips CPAP', slug: 'mascarilla-nasobucal-dreamwear-philips-cpap', price: '$229.000 · U$S 157', img: '/artifacts/products/1752247435824-666541bd-3849-490c-bb8b-efd84470de78.jfif', badge: 'OFERTA', note: 'Mínimo contacto.', category: 'Máscara',
        specs: [
            ['Fabricante', 'Philips Respironics'],
            ['Tipo', 'Nasobucal de mínimo contacto'],
            ['Tallas', 'S / M / L'],
            ['Tubo', 'Sale por la parte superior'],
            ['Ideal para', 'Respiradores bucales o presiones altas'],
        ],
    },
    {
        name: 'Máscara Nasobucal BMC F6 Multitalle', slug: 'mascara-cpap-bipap-bmc-f6-nasobucal-con-apoya-frontal-', price: '$198.000 · U$S 124', img: '/artifacts/products/bmc_f2_1.jpg', images: ['/artifacts/products/bmc_f2_1.jpg', '/artifacts/products/bmc_f2_2.jpg', '/artifacts/products/bmc_f2_3.jpg'], badge: 'OFERTA', note: 'Tan cómoda como la DreamWear, a mejor precio.', category: 'Máscara',
        specs: [
            ['Fabricante', 'BMC Medical'],
            ['Tipo', 'Nasobucal (full face) con apoya frente'],
            ['Tallas', 'S / M / L (multitalle)'],
            ['Compatibilidad', 'CPAP / BiPAP'],
            ['Ventaja', 'Tan cómoda como la DreamWear pero más económica'],
            ['Material', 'Silicona médica suave'],
            ['Arnés', 'Ajustable 4 puntos'],
        ],
    },
    {
        name: 'Buconasal YUWELL con Apoya Frente CPAP/BiPAP', slug: 'buconasal-con-apoya-frente-yuwell-cpapbpap', price: 'U$S 52', img: '/artifacts/products/7c70e16b-1955-44ed-9297-3088a17005e5.jpg', badge: null, note: 'CPAP/BiPAP.', category: 'Máscara',
        specs: [
            ['Fabricante', 'YUWELL'],
            ['Tipo', 'Nasobucal con apoya frente'],
            ['Tallas', 'S / M / L'],
            ['Compatibilidad', 'CPAP / BiPAP'],
        ],
    },
    {
        name: 'Buconasal YUWELL YF02 sin Apoya Frente', slug: 'buconasal-sin-apoya-frente-yuwell-yf02-cpapbpap', price: 'U$S 55', img: '/artifacts/products/bdaf0580-27be-4e1b-86d4-bc5216e7b94f.jpg', badge: null, note: 'CPAP/BiPAP.', category: 'Máscara',
        specs: [
            ['Fabricante', 'YUWELL'],
            ['Modelo', 'YF02'],
            ['Tipo', 'Nasobucal sin apoya frente (mayor campo visual)'],
            ['Tallas', 'S / M / L'],
            ['Compatibilidad', 'CPAP / BiPAP'],
        ],
    },
    // ── Agregados desde catálogo oficial insersalud.com ─────────────────
    // (El "CPAP BMC G2s (sin Mini)" era duplicado del primer CPAP BMC G2S — removido)
    {
        name: 'AUTOCPAP BMC G2s', price: 'U$S 415', img: '/artifacts/cpap_bmc_g2s.jpg', badge: null, note: 'AutoCPAP estándar, ajuste automático.', category: 'CPAP',
        specs: [
            ['Fabricante', 'BMC Medical'],
            ['Tipo', 'AutoCPAP'],
            ['Rango de presión', '4 – 20 cm H₂O automático'],
            ['Humidificador', 'Opcional'],
            ['Tarjeta SD', 'Sí'],
            ['Garantía', '2 años'],
        ],
    },
    {
        name: 'CPAP YUWELL YH-360 con Humidificador', slug: 'cpap-yuwell-yh-360-con-humidificador', price: 'U$S 416', img: '/artifacts/products/1752269565561-269d4b6c-772c-4dcb-b8f1-0bcc3244be73.jfif', badge: null, note: 'Opción económica con humidificador.', category: 'CPAP',
        specs: [
            ['Fabricante', 'YUWELL'],
            ['Modelo', 'YH-360'],
            ['Tipo', 'CPAP con humidificador activo'],
            ['Rango de presión', '4 – 20 cm H₂O'],
            ['Humidificador', 'Calefactado integrado'],
            ['Garantía', '2 años'],
        ],
    },
    {
        name: 'CPAP YAMIND con Humidificador Activo', price: 'U$S 330', img: '/artifacts/cpap_bmc_g2s.jpg', badge: 'ECONÓMICO', note: 'El CPAP más accesible del catálogo.', category: 'CPAP',
        specs: [
            ['Fabricante', 'YAMIND'],
            ['Tipo', 'CPAP fijo con humidificador'],
            ['Rango de presión', '4 – 20 cm H₂O'],
            ['Humidificador', 'Activo calefactado'],
            ['Peso', 'Liviano para viajes'],
            ['Garantía', '1 año'],
        ],
    },
    {
        name: 'BIPAP YUWELL con Frecuencia Respiratoria y Humidificador', price: 'U$S 1.014', img: '/artifacts/bipap_bmc_g3.jpg', badge: null, note: 'Alternativa accesible al BMC G3.', category: 'BiPAP',
        specs: [
            ['Fabricante', 'YUWELL'],
            ['Tipo', 'BiPAP S/T con FR de respaldo'],
            ['Modos', 'CPAP · S · T · S/T'],
            ['Rango IPAP', '4 – 25 cm H₂O'],
            ['Rango EPAP', '4 – 20 cm H₂O'],
            ['Humidificador', 'Calefactado integrado'],
            ['Garantía', '2 años'],
        ],
    },
    // Diagnóstico
    {
        name: 'POLÍGRAFO BMC YH-600B PRO (Estudio del Sueño)', slug: 'poligrafo-bmc-yh-600b-pro-', price: 'U$S 1.570', img: '/artifacts/products/1752508033704-poligrafobmc.jfif', badge: 'DIAGNÓSTICO', note: 'Poligrafía domiciliaria profesional. Opción con 30 cánulas Luer Lock: U$S 1.794.', category: 'Diagnóstico',
        specs: [
            ['Fabricante', 'BMC Medical'],
            ['Tipo', 'Polígrafo respiratorio portátil'],
            ['Canales', 'Flujo, SpO₂, ronquido, posición, esfuerzo torácico/abdominal'],
            ['Uso', 'Estudio del sueño en domicilio (AOS)'],
            ['Software', 'Incluido, reporte automático AHI'],
            ['Garantía', '2 años'],
        ],
    },
    // Concentradores KINGON adicionales
    {
        name: 'Concentrador Portátil KINGON P2-E7', slug: 'concentrador-de-oxigeno-portatil-kingon-p2-e7', price: 'U$S 3.099', img: '/artifacts/products/1748964279808-p2-e7.jpg', badge: null, note: 'Autonomía y flujo extendidos.', category: 'Concentrador',
        specs: [
            ['Fabricante', 'KINGON'],
            ['Modelo', 'P2-E7'],
            ['Tipo', 'Portátil a pulso'],
            ['Flujo', '5 settings'],
            ['Autonomía', 'Hasta 7 hs'],
            ['Apto vuelos', 'FAA'],
            ['Garantía', '1 año'],
        ],
    },
    {
        name: 'Concentrador Portátil KINGON P2-E6', slug: 'concentrador-de-oxigeno-portatil-kingon-p2-e6', price: 'U$S 2.695', img: '/artifacts/products/1748963802989-kingonp2.png', badge: null, note: 'Opción intermedia.', category: 'Concentrador',
        specs: [
            ['Fabricante', 'KINGON'],
            ['Modelo', 'P2-E6'],
            ['Tipo', 'Portátil a pulso'],
            ['Flujo', '5 settings'],
            ['Autonomía', 'Hasta 6 hs'],
            ['Apto vuelos', 'FAA'],
            ['Garantía', '1 año'],
        ],
    },
    {
        name: 'Concentrador Portátil KINGON P2-E', slug: 'concentrador-de-oxigeno-portatil', price: 'U$S 2.379', img: '/artifacts/products/880a332c-b080-4b38-9ab2-059aba2ea797.jpg', badge: null, note: 'Entrada de gama KINGON.', category: 'Concentrador',
        specs: [
            ['Fabricante', 'KINGON'],
            ['Modelo', 'P2-E'],
            ['Tipo', 'Portátil a pulso'],
            ['Flujo', '5 settings'],
            ['Autonomía', '4 – 5 hs'],
            ['Apto vuelos', 'FAA'],
            ['Garantía', '1 año'],
        ],
    },
    {
        name: 'Concentrador Portátil PHILIPS SIMPLYGO', slug: 'concentrador-de-oxigeno-portatil-simplygo', price: 'U$S 3.887', img: '/artifacts/products/e5627e6c-819d-40b2-8c96-9d96340f5ebc.jfif', badge: 'PREMIUM', note: 'Flujo continuo + pulso. Referencia del mercado.', category: 'Concentrador',
        specs: [
            ['Fabricante', 'Philips Respironics'],
            ['Modelo', 'SimplyGo'],
            ['Tipo', 'Portátil con flujo continuo y a pulso'],
            ['Flujo continuo', '0,5 – 2 L/min'],
            ['Flujo pulso', '1 – 6 settings'],
            ['Peso', '4,5 kg'],
            ['Apto vuelos', 'FAA homologado'],
            ['Garantía', '3 años oficiales'],
        ],
    },
    {
        name: 'Concentrador de Oxígeno BMC Estacionario', slug: 'concentrador-de-oxigeno-bmc-estacionario', price: '$999.000', img: '/artifacts/products/concentrador_bmc_1.jpg', images: ['/artifacts/products/concentrador_bmc_1.jpg', '/artifacts/products/concentrador_bmc_2.jpg'], badge: 'CONTROL REMOTO', note: 'Con control remoto y medidor de oxígeno integrado.', category: 'Concentrador',
        specs: [
            ['Fabricante', 'BMC Medical'],
            ['Tipo', 'Concentrador estacionario domiciliario'],
            ['Control remoto', 'Sí — manejo a distancia'],
            ['Medidor de O₂', 'Sí — monitor de pureza integrado'],
            ['Flujo', '0,5 – 5 L/min'],
            ['Pureza O₂', '≥ 93%'],
            ['Pantalla', 'Display digital (pureza, flujo, horas)'],
            ['Uso', 'Continuo 24hs'],
            ['Garantía', '2 años'],
        ],
    },
    // Accesorios oxígeno
    {
        name: 'Mochila de Oxígeno (Tubo 0,415 + Regulador + Bolso)', slug: 'mochila-de-oxigeno-tubo-de0415-regulador-bolso-carga', price: 'U$S 270', img: '/artifacts/products/c1aa3c71-a9fb-422a-82ac-222625d0bd3a.jpg', badge: 'MÓVIL', note: 'Autonomía para salidas. Incluye recarga.', category: 'Oxígeno',
        specs: [
            ['Tipo', 'Tubo portátil de oxígeno medicinal'],
            ['Capacidad', '0,415 m³'],
            ['Incluye', 'Regulador + bolso + carga inicial'],
            ['Peso', '≈ 1,8 kg'],
            ['Autonomía', '1 – 3 hs según flujo'],
            ['Uso', 'Salidas cortas, transporte'],
        ],
    },
    {
        name: 'Tubuladura para CPAP / BiPAP', slug: 'tubuladura-para-cpap-bipap', price: '$36.000', img: '/artifacts/products/tubuladura_cpap_bipap.jpg', badge: 'NUEVO', note: 'Repuesto universal CPAP/BiPAP.', category: 'Oxígeno',
        specs: [
            ['Tipo', 'Tubuladura (manguera) de paciente'],
            ['Compatibilidad', 'CPAP / BiPAP universal'],
            ['Diámetro', '22 mm estándar'],
            ['Largo', '1,8 m aprox.'],
            ['Material', 'PVC flexible de grado médico'],
            ['Uso', 'Repuesto / recambio de tubo'],
        ],
    },
    // ("Tubo Portátil 0,5 m" era local — no existe en catálogo oficial. Removido.)
    // Máscaras adicionales
    {
        name: 'Máscara Nasal Pediátrica HSINER Cirri Mini (XS/S/M/L)', slug: 'nascara-nasal-pediatrica-nasal-hsiner-cirri-mini-s-m-l-xs', price: 'U$S 105', img: '/artifacts/products/0714643b-30ed-48d5-bf66-1d41dbfd5805.jfif', badge: 'PEDIÁTRICO', note: 'Para niños — AME, PC.', category: 'Máscara',
        specs: [
            ['Fabricante', 'HSINER'],
            ['Modelo', 'Cirri Mini'],
            ['Tipo', 'Nasal pediátrica'],
            ['Tallas', 'XS / S / M / L'],
            ['Compatibilidad', 'CPAP / BiPAP'],
        ],
    },
    {
        name: 'Máscara Nasal Pediátrica JIRAFA Philips Respironics', slug: 'nascara-nasal-peditrica-jirafa-philips-respironics', price: 'U$S 220', img: '/artifacts/products/876bc618-e07c-4007-8341-8660f0226cb4.jfif', badge: 'PEDIÁTRICO', note: 'Diseño ergonómico para niños.', category: 'Máscara',
        specs: [
            ['Fabricante', 'Philips Respironics'],
            ['Modelo', 'JIRAFA'],
            ['Tipo', 'Nasal pediátrica'],
            ['Material', 'Silicona hipoalergénica'],
            ['Compatibilidad', 'CPAP / BiPAP'],
        ],
    },
    {
        name: 'Infant CPAP Kit Pediátrico (00, 0, 1, 2, 3, 4, 5)', slug: 'nascara-nasal-pediatrica-infant-cpap-kit-00-0-1-2-3-4-5', price: 'U$S 97', img: '/artifacts/products/7ed94670-d1a4-4454-8f1a-71ce4cf90af6.jfif', badge: 'PEDIÁTRICO', note: 'Todas las tallas neonatales.', category: 'Máscara',
        specs: [
            ['Tipo', 'Kit de máscaras nasales pediátricas'],
            ['Tallas incluidas', '00 / 0 / 1 / 2 / 3 / 4 / 5'],
            ['Uso', 'Neonatos, lactantes y niños'],
            ['Compatibilidad', 'CPAP / BiPAP'],
        ],
    },
    {
        name: 'Máscara Nasal BMC N5a sin Apoya Frente (SW/S/M)', slug: 'nascara-nasal-sin-apoya-frente-bmc-n5a-talles-swsm-', price: 'U$S 60', img: '/artifacts/products/7e6ce401-57fd-4b1c-81d6-2bebf2d3cd3d.jfif', badge: null, note: 'Mayor campo visual.', category: 'Máscara',
        specs: [
            ['Fabricante', 'BMC Medical'],
            ['Modelo', 'N5a'],
            ['Tipo', 'Nasal sin apoya frente'],
            ['Tallas', 'SW / S / M'],
            ['Compatibilidad', 'CPAP / BiPAP'],
        ],
    },
    {
        name: 'Buconasal BMC F5A sin Apoya Frente (S/M/L)', slug: 'buconasal-sin-apoya-frente-bmc-sml-f5a-cpapbpap', price: 'U$S 52', img: '/artifacts/products/a1504e31-1c48-4f61-b0d8-f7bb5bc03c78.jfif', badge: null, note: 'Nasobucal amplia visión.', category: 'Máscara',
        specs: [
            ['Fabricante', 'BMC Medical'],
            ['Modelo', 'F5A'],
            ['Tipo', 'Nasobucal sin apoya frente'],
            ['Tallas', 'S / M / L'],
            ['Compatibilidad', 'CPAP / BiPAP'],
        ],
    },
    {
        name: 'Máscara Nasal AirFit Mínimo Contacto RESMED (SW/S/M)', slug: '-mascara-nasal-airfit-mimimo-contacto-talles-swsm-resmed', price: 'U$S 157', img: '/artifacts/products/d34cfe5d-2be4-4768-9901-57d4651d2380.jfif', badge: null, note: 'Máxima libertad facial.', category: 'Máscara',
        specs: [
            ['Fabricante', 'ResMed'],
            ['Modelo', 'AirFit (nasal mínimo contacto)'],
            ['Tipo', 'Nasal de mínimo contacto'],
            ['Tallas', 'SW / S / M'],
            ['Compatibilidad', 'CPAP / BiPAP'],
        ],
    },
    {
        name: 'Nasobucal AirFit F30 RESMED CPAP/BiPAP', slug: 'mascarilla-nasobucal-airfit-f30-resmed-cpapbpap', price: 'U$S 212', img: '/artifacts/products/3b1f7377-109b-4572-a96c-9a2727df3d4f.jfif', badge: null, note: 'Apoya bajo la nariz.', category: 'Máscara',
        specs: [
            ['Fabricante', 'ResMed'],
            ['Modelo', 'AirFit F30'],
            ['Tipo', 'Nasobucal de mínimo contacto sub-nasal'],
            ['Tallas', 'S / M'],
            ['Compatibilidad', 'CPAP / BiPAP'],
        ],
    },
    {
        name: 'Nasobucal AirFit F20 RESMED (S/M/L)', price: 'U$S 189,50', img: '/artifacts/airfit_f20.jpg', images: ['/artifacts/airfit_f20.jpg', '/artifacts/airfit_f20_lifestyle1.jpg', '/artifacts/airfit_f20_uso.jpg'], badge: null, note: 'Clásica full-face Resmed.', category: 'Máscara',
        specs: [
            ['Fabricante', 'ResMed'],
            ['Modelo', 'AirFit F20'],
            ['Tipo', 'Nasobucal full-face'],
            ['Tallas', 'S / M / L'],
            ['Compatibilidad', 'CPAP / BiPAP'],
        ],
    },
    {
        name: 'Máscara Nasal BMC Multitalle CPAP/BiPAP', price: 'U$S 89,50', img: '/artifacts/mascara_bmc_n4.jpg', badge: null, note: 'Se adapta a distintas morfologías.', category: 'Máscara',
        specs: [
            ['Fabricante', 'BMC Medical'],
            ['Tipo', 'Nasal multitalle'],
            ['Material', 'Silicona adaptable'],
            ['Compatibilidad', 'CPAP / BiPAP'],
        ],
    },
    {
        name: 'Máscara Nasal Pillow YUWELL YP-01 (L/M)', slug: 'mascara-nasal-yuwell-pillow-l-o-m-yp-01-para-cpap-y-bipap', price: 'U$S 42', img: '/artifacts/products/1752270243027-43fec688-2e01-4f0b-9f5f-76e8fa11db9d.jfif', badge: 'ECONÓMICO', note: 'Almohadillas nasales directas.', category: 'Máscara',
        specs: [
            ['Fabricante', 'YUWELL'],
            ['Modelo', 'YP-01 Pillow'],
            ['Tipo', 'Almohadillas nasales'],
            ['Tallas', 'L / M'],
            ['Compatibilidad', 'CPAP / BiPAP'],
        ],
    },
];

const services = [
    { title: 'Alquiler de Equipos', desc: 'CPAP, BiPAP y Concentradores con entrega inmediata en domicilio en Córdoba. Sin depósito, con soporte técnico incluido.', img: '/artifacts/cpap_real.png', link: 'https://wa.me/5493512065320', cta: 'Consultar alquiler' },
    { title: 'Venta Directa', desc: 'Equipos nuevos con garantía oficial y el mejor asesoramiento técnico del mercado. Los precios más competitivos de Córdoba.', img: '/artifacts/venta_directa_ofertas.jpg', link: '#tienda', cta: 'Ver tienda', focusTop: true },
    {
        title: 'Adaptación y Seguimiento',
        desc: 'Nuestro equipo de especialistas te acompaña día a día con cuidado, paciencia y respeto para que tu terapia sea un éxito.',
        img: '/artifacts/seguimiento_profesional.jpg',
        link: 'https://wa.me/5493512065320',
        cta: 'Consultar',
        details: {
            intro: 'Sabemos que adaptarse a un equipo de terapia respiratoria puede ser un proceso desafiante. Por eso nuestro equipo de especialistas está con vos en cada paso del camino.',
            steps: [
                { icon: '📞', title: 'Primera consulta personalizada', text: 'Evaluamos tu indicación médica y te asesoramos en la elección del equipo ideal para tu patología y estilo de vida, sin costo adicional.' },
                { icon: '🏠', title: 'Entrega e instalación en domicilio', text: 'Llevamos el equipo a tu domicilio en Córdoba, lo configuramos según la prescripción médica y te enseñamos paso a paso cómo usarlo correctamente.' },
                { icon: '📅', title: 'Seguimiento los primeros días', text: 'Durante las primeras semanas hacemos seguimiento activo por WhatsApp para verificar tu adaptación, resolver dudas y ajustar parámetros si fuera necesario.' },
                { icon: '🔧', title: 'Soporte técnico permanente', text: 'Ante cualquier problema técnico con tu equipo, tenés soporte directo por WhatsApp. Respondemos siempre, sin esperas ni turnos.' },
                { icon: '📊', title: 'Control de adherencia al tratamiento', text: 'Revisamos los datos de uso registrados en el equipo para verificar que la terapia esté siendo efectiva y ayudarte a mejorar la adherencia.' },
                { icon: '🔄', title: 'Recordatorio de renovación de accesorios', text: 'Te avisamos cuándo renovar filtros, máscaras y tubos para mantener la eficacia, higiene y seguridad de tu equipo en todo momento.' },
            ],
        },
    },
];

// ── Reseñas de tags — todas las patologías ────────────────────────────────
const ALL_TAG_INFO = {
    'CPAP': {
        icon: '💨',
        title: '¿Qué es el CPAP?',
        subtitle: 'Continuous Positive Airway Pressure',
        body: 'El CPAP entrega aire a una presión constante y continua durante toda la noche. Esa corriente mantiene la vía aérea abierta, impidiendo que colapse y cause las apneas. Es el tratamiento de referencia para la apnea obstructiva del sueño leve, moderada y severa.',
        bullets: [
            { icon: '⚙️', text: 'Presión fija configurada por tu médico' },
            { icon: '📊', text: 'Registra horas de uso y eventos en tarjeta SD' },
            { icon: '💤', text: 'Reduce ronquidos, somnolencia diurna y riesgo cardiovascular' },
            { icon: '✅', text: 'Primera línea de tratamiento según guías internacionales' },
        ],
        waMsg: 'Hola, quiero información sobre el CPAP para apnea del sueño. ¿Qué modelos tienen?',
    },
    'AutoCPAP': {
        icon: '🤖',
        title: '¿Qué es el AutoCPAP?',
        subtitle: 'CPAP automático con ajuste inteligente',
        body: 'El AutoCPAP (APAP) es una versión inteligente del CPAP. En vez de trabajar a una presión fija toda la noche, detecta en tiempo real cuánta presión necesitás y se ajusta automáticamente según cada momento del sueño.',
        bullets: [
            { icon: '🔄', text: 'Ajusta la presión automáticamente momento a momento' },
            { icon: '😴', text: 'Mayor confort: no más presión excesiva cuando no la necesitás' },
            { icon: '📈', text: 'Ideal si tu apnea varía por postura, peso o alcohol' },
            { icon: '💡', text: 'El CPAP da presión fija; el AutoCPAP la adapta a vos cada noche' },
        ],
        waMsg: 'Hola, quiero información sobre el AutoCPAP para apnea del sueño. ¿Cuáles tienen disponibles?',
    },
    'BiPAP': {
        icon: '🫁',
        title: '¿Qué es el BiPAP?',
        subtitle: 'Bilevel Positive Airway Pressure',
        body: 'El BiPAP entrega dos presiones distintas: una presión alta (IPAP) al inspirar y una presión más baja (EPAP) al exhalar. Esto reduce considerablemente el esfuerzo respiratorio y es fundamental en enfermedades que debilitan los músculos respiratorios.',
        bullets: [
            { icon: '🔀', text: 'Dos presiones: alta al inspirar (IPAP) · baja al exhalar (EPAP)' },
            { icon: '💪', text: 'Apoya el trabajo de los músculos respiratorios debilitados' },
            { icon: '⚡', text: 'Los modelos S/T agregan frecuencia de respaldo: si dejás de respirar, el equipo actúa' },
            { icon: '🏥', text: 'Indicado en EPOC severo, ELA, AME, fibrosis pulmonar, parálisis cerebral' },
        ],
        waMsg: 'Hola, necesito información sobre BiPAP para una enfermedad respiratoria. ¿Pueden asesorarme?',
    },
    'Máscaras': {
        icon: '😷',
        title: 'Máscaras para CPAP y BiPAP',
        subtitle: 'La interfaz entre vos y el equipo',
        body: 'La máscara conecta el equipo a tu vía aérea. Elegir la correcta es tan importante como el equipo: una máscara mal elegida puede arruinar el tratamiento. Existen dos grandes tipos según cómo respirás.',
        comparison: {
            left: {
                label: 'Máscara Nasal',
                icon: '👃',
                color: '#0ea5e9',
                points: [
                    'Cubre solo la nariz',
                    'Menor volumen, más fácil de ventilar',
                    'Ideal para respiradores nasales',
                    'Menos sensación de claustrofobia',
                    'Mayor libertad de movimiento',
                    'Para presiones bajas y medias',
                    'Ej: DreamWear, BMC N4, AirFit, RESCOMF',
                ],
            },
            right: {
                label: 'Máscara Nasobucal',
                icon: '😮',
                color: '#7c3aed',
                points: [
                    'Cubre nariz y boca (full face)',
                    'Imprescindible para respiradores bucales',
                    'Necesaria con presiones altas (BiPAP)',
                    'Para EPOC y enfermedades neuromusculares',
                    'Mayor superficie de sellado',
                    'Algo más de sensación de claustrofobia',
                    'Ej: DreamWear Full, BMC F6, AirFit F30/F20',
                ],
            },
        },
        tip: '💡 ¿No sabés cuál usar? Consultá con Santi: en base a tu indicación médica te ayudamos a elegir.',
        waMsg: 'Hola, necesito ayuda para elegir la máscara correcta para mi equipo. ¿Me pueden asesorar?',
    },
    'Alquiler': {
        icon: '🔑',
        title: 'Alquiler de equipos respiratorios',
        subtitle: 'Sin depósito · Entrega inmediata en Córdoba',
        body: 'Antes de comprar podés alquilar tu equipo para probar la terapia con apoyo profesional. Ideal para evaluar el tratamiento o cubrir necesidades temporales.',
        bullets: [
            { icon: '📦', text: 'Entrega y retiro en domicilio en Córdoba capital y gran Córdoba' },
            { icon: '⚙️', text: 'Equipo configurado según indicación médica' },
            { icon: '💬', text: 'Seguimiento y soporte técnico incluidos' },
            { icon: '💰', text: 'Sin depósito. Posibilidad de imputar al precio de compra' },
        ],
        waMsg: 'Hola, quiero consultar precios y disponibilidad para alquilar un equipo respiratorio.',
    },
    'Concentrador': {
        icon: '🔵',
        title: '¿Qué es un concentrador de oxígeno?',
        subtitle: 'Oxigenoterapia domiciliaria continua',
        body: 'Un concentrador de oxígeno toma el aire del ambiente y, mediante un proceso de filtrado molecular (tamiz molecular), extrae el nitrógeno y entrega oxígeno puro al paciente. No requiere recarga de tubos: funciona enchufado a la corriente eléctrica.',
        bullets: [
            { icon: '♾️', text: 'Fuente inagotable de oxígeno: no necesita recarga' },
            { icon: '🏠', text: 'Estacionario: para uso domiciliario 24 hs, silencioso' },
            { icon: '🎒', text: 'Portátil: para movilidad, viajes y vuelos (FAA aprobado)' },
            { icon: '📋', text: 'Indicado cuando SpO₂ < 88% en reposo o esfuerzo (prescripción médica)' },
        ],
        waMsg: 'Hola, necesito información sobre concentradores de oxígeno. ¿Cuáles tienen disponibles?',
    },
    'Oxígeno': {
        icon: '🌬️',
        title: 'Oxigenoterapia domiciliaria',
        subtitle: 'Tratamiento para baja saturación de oxígeno',
        body: 'La oxigenoterapia domiciliaria consiste en administrar oxígeno suplementario al paciente en su hogar para mantener una saturación de oxígeno en sangre (SpO₂) adecuada. Se indica cuando la enfermedad pulmonar reduce la capacidad de oxigenar la sangre por sí sola.',
        bullets: [
            { icon: '💉', text: 'Objetivo: mantener SpO₂ ≥ 90% (idealmente ≥ 92%)' },
            { icon: '👃', text: 'Se administra por cánula nasal o máscara Venturi' },
            { icon: '⏰', text: 'Generalmente 16-24 hs diarias para ser efectiva' },
            { icon: '❤️', text: 'Mejora calidad de vida, tolerancia al esfuerzo y expectativa de vida en EPOC' },
        ],
        waMsg: 'Hola, necesito información sobre oxigenoterapia domiciliaria para EPOC. ¿Me pueden asesorar?',
    },
    'Portátil': {
        icon: '🎒',
        title: 'Concentradores de oxígeno portátiles',
        subtitle: 'Movilidad e independencia para el paciente',
        body: 'Los concentradores portátiles permiten al paciente continuar su oxigenoterapia fuera del hogar: salidas, viajes y vuelos. Son livianos (desde 2,3 kg), silenciosos y pueden cargarse en el auto o con batería.',
        bullets: [
            { icon: '✈️', text: 'Homologados para vuelos comerciales (aprobación FAA)' },
            { icon: '🔋', text: 'Autonomía de batería: entre 4 y 9,5 horas según modelo' },
            { icon: '⚖️', text: 'Desde 2,3 kg con batería (KINGON P2-S3, el más liviano)' },
            { icon: '🔌', text: 'Carga en 220V, 12V auto o batería intercambiable' },
        ],
        waMsg: 'Hola, necesito un concentrador de oxígeno portátil. ¿Qué modelos tienen y cuáles son los precios?',
    },
    'Mochila O₂': {
        icon: '🎽',
        title: 'Mochila de oxígeno medicinal',
        subtitle: 'Oxígeno comprimido para salidas cortas',
        body: 'La mochila de oxígeno es un tubo de oxígeno medicinal comprimido con regulador de flujo. A diferencia del concentrador, no necesita electricidad: es ideal para salidas cortas, turnos médicos y situaciones donde la batería no alcanza.',
        bullets: [
            { icon: '⚡', text: 'No requiere electricidad ni batería: siempre disponible' },
            { icon: '⏱️', text: 'Autonomía de 1 a 3 horas según el flujo indicado' },
            { icon: '🏥', text: 'Incluye regulador, cánula nasal y bolso de transporte' },
            { icon: '🔄', text: 'Se recarga en Inser Salud cuando se agota' },
        ],
        waMsg: 'Hola, quiero consultar sobre la mochila de oxígeno para salidas. ¿Cómo funciona el servicio?',
    },
    'O₂ Líquido': {
        icon: '💧',
        title: 'Oxígeno líquido',
        subtitle: 'Máximo caudal en mínimo volumen',
        body: 'El oxígeno líquido es oxígeno almacenado en estado líquido a temperaturas muy bajas (−183 °C). Al pasar a estado gaseoso entrega caudales muy elevados en un recipiente mucho más pequeño y liviano que un tubo de gas comprimido. Se usa en fibrosis pulmonar avanzada y cuando se requiere flujo continuo alto.',
        bullets: [
            { icon: '💪', text: 'Permite flujos altos (hasta 6 L/min) que algunos concentradores no alcanzan' },
            { icon: '🤫', text: 'Totalmente silencioso, sin compresor' },
            { icon: '🌡️', text: 'Se almacena en recipiente térmico (mochilita portátil + depósito domiciliario)' },
            { icon: '📋', text: 'Requiere prescripción médica y recarga periódica' },
        ],
        waMsg: 'Hola, necesito información sobre oxígeno líquido para fibrosis pulmonar. ¿Trabajan con ese servicio?',
    },
    'Cough Assist': {
        icon: '💨',
        title: 'Asistente de Tos (Cough Assist)',
        subtitle: 'Insuflador-exsuflador mecánico',
        body: 'El Cough Assist (insuflador-exsuflador) es un dispositivo que simula el mecanismo natural de la tos. Primero insufla aire en los pulmones a presión positiva y luego revierte a presión negativa, generando un flujo de aire que moviliza y expulsa las secreciones de la vía aérea.',
        bullets: [
            { icon: '🔄', text: 'Ciclo insuflación (+presión) / exsuflación (−presión) programable' },
            { icon: '🧹', text: 'Limpia las secreciones bronquiales que el paciente no puede expectorar solo' },
            { icon: '🛡️', text: 'Previene neumonías por acumulación de secreciones' },
            { icon: '👶', text: 'Disponible en modalidad adulto y pediátrica con interfaces específicas' },
        ],
        waMsg: 'Hola, necesito información sobre el Cough Assist (asistente de tos). ¿Tienen stock y cuál es el precio?',
    },
    'Ventilación': {
        icon: '🌀',
        title: 'Ventilación No Invasiva (VNI)',
        subtitle: 'Soporte respiratorio sin intubación',
        body: 'La ventilación no invasiva (VNI) es el soporte ventilatorio mecánico que se aplica a través de una máscara, sin necesidad de intubación. Es el pilar del tratamiento de la insuficiencia respiratoria crónica en enfermedades neuromusculares.',
        bullets: [
            { icon: '😌', text: 'Sin intubación: máscara nasal o nasobucal, mucho más confortable' },
            { icon: '🌙', text: 'Generalmente se usa durante el sueño o en reposo' },
            { icon: '🏆', text: 'Equipos de referencia: BiPAP BMC G3, Stellar 150 ResMed, YUWELL BiPAP' },
            { icon: '📈', text: 'Prolonga la vida y mejora la calidad de vida en ELA y AME' },
        ],
        waMsg: 'Hola, necesito asesoramiento sobre ventilación no invasiva para enfermedad neuromuscular.',
    },
    'ELA': {
        icon: '🧠',
        title: 'ELA y la función respiratoria',
        subtitle: 'Esclerosis Lateral Amiotrófica',
        body: 'La ELA es una enfermedad neurodegenerativa que afecta progresivamente las neuronas motoras, incluyendo las que controlan los músculos respiratorios. A medida que avanza, el paciente necesita apoyo ventilatorio para respirar y herramientas para movilizar secreciones.',
        bullets: [
            { icon: '📉', text: 'Capacidad vital forzada (CVF) disminuye progresivamente' },
            { icon: '🫁', text: 'BiPAP S/T: primer soporte cuando CVF < 50% o hay síntomas nocturnos' },
            { icon: '💨', text: 'Cough Assist: esencial cuando el pico de flujo de tos < 270 L/min' },
            { icon: '🏥', text: 'Equipo de alta gama: Stellar 150 ResMed para ventilación 24hs' },
        ],
        waMsg: 'Hola, tengo un familiar con ELA y necesito equipos respiratorios. ¿Pueden asesorarme?',
    },
    'AME': {
        icon: '⚡',
        title: 'AME y la función respiratoria',
        subtitle: 'Atrofia Muscular Espinal',
        body: 'La AME es una enfermedad genética que afecta la fuerza muscular, incluyendo los músculos respiratorios. La afectación respiratoria varía según el tipo (1, 2 o 3): en los tipos más severos puede ser necesario soporte ventilatorio desde los primeros meses de vida.',
        bullets: [
            { icon: '👶', text: 'AME tipo 1: soporte ventilatorio y Cough Assist desde el diagnóstico' },
            { icon: '🧒', text: 'AME tipo 2: BiPAP nocturno y seguimiento de función pulmonar periódico' },
            { icon: '🦾', text: 'AME tipo 3: generalmente solo Cough Assist preventivo' },
            { icon: '😷', text: 'Máscaras pediátricas especiales: HSINER Cirri Mini, JIRAFA e Infant CPAP Kit' },
        ],
        waMsg: 'Hola, tengo un hijo/familiar con AME y necesito equipos respiratorios pediátricos. ¿Me asesoran?',
    },
    'Pediátrico': {
        icon: '👶',
        title: 'Equipos respiratorios pediátricos',
        subtitle: 'Interfaces y equipos adaptados a niños',
        body: 'Los equipos estándar para adultos no son adecuados para niños. En Inser Salud contamos con máscaras e interfaces pediátricas certificadas, desde neonatos hasta adolescentes, y asesoramiento especializado para familias con niños con enfermedades respiratorias.',
        bullets: [
            { icon: '🍼', text: 'Infant CPAP Kit: tallas 00 al 5 para neonatos y lactantes' },
            { icon: '🦒', text: 'Máscara JIRAFA Philips: diseño ergonómico especial para niños' },
            { icon: '🐣', text: 'HSINER Cirri Mini: nasal pediátrica en talles XS–L' },
            { icon: '💬', text: 'Acompañamiento para familias: explicamos todo con paciencia y empatía' },
        ],
        waMsg: 'Hola, necesito equipos respiratorios pediátricos para un niño con AME/PC. ¿Qué tienen disponible?',
    },
    'Adaptación': {
        icon: '🤝',
        title: 'Proceso de adaptación al equipo',
        subtitle: 'Acompañamiento paso a paso',
        body: 'Adaptarse a un equipo de terapia respiratoria lleva tiempo y paciencia. En Inser Salud acompañamos a cada paciente durante todo el proceso de adaptación, resolviendo dudas y ajustando la terapia para lograr los mejores resultados.',
        bullets: [
            { icon: '1️⃣', text: 'Primera semana: uso gradual, primero despierto luego dormido' },
            { icon: '2️⃣', text: 'Segunda semana: consolidación del hábito nocturno' },
            { icon: '📲', text: 'Seguimiento activo por WhatsApp con nuestro equipo' },
            { icon: '🔧', text: 'Ajuste de parámetros si el médico lo indica (Presión, rampa, humedad)' },
        ],
        waMsg: 'Hola, estoy teniendo dificultades para adaptarme al BiPAP. ¿Pueden ayudarme?',
    },
    'Seguimiento': {
        icon: '📋',
        title: 'Seguimiento profesional continuo',
        subtitle: 'Inser Salud siempre disponible',
        body: 'El seguimiento es parte central del servicio de Inser Salud. No entregamos el equipo y desaparecemos: estamos presentes durante todo el tratamiento para asegurarnos de que la terapia funcione y el paciente esté bien.',
        bullets: [
            { icon: '📱', text: 'Canal de WhatsApp directo con el equipo técnico: +54 9 351 206-5320' },
            { icon: '📊', text: 'Revisión de datos de adherencia y eventos respiratorios registrados por el equipo' },
            { icon: '🔄', text: 'Recordatorio automático de renovación de accesorios cada 30/90 días' },
            { icon: '🩺', text: 'Coordinación con tu médico tratante si se necesitan ajustes' },
        ],
        waMsg: 'Hola, soy paciente de Inser Salud y necesito apoyo con mi tratamiento respiratorio.',
    },
};

// ── Test de Epworth (Escala de Somnolencia) ────────────────────────────────
const EPWORTH_QUESTIONS = [
    'Sentado leyendo',
    'Mirando televisión',
    'Sentado, inactivo en un lugar público (sala de espera, teatro, reunión)',
    'Como pasajero en un auto durante 1 hora seguida sin parar',
    'Acostado a descansar a la tarde cuando las circunstancias lo permiten',
    'Sentado conversando con alguien',
    'Sentado tranquilo después de almorzar (sin haber tomado alcohol)',
    'Al volante del auto, detenido unos minutos en el tráfico',
];
const EPWORTH_LEVELS = [
    { max: 10,  label: 'Normal',                color: '#10b981', bg: '#d1fae5', icon: '✅', msg: 'No se detecta somnolencia diurna excesiva. Tu descanso parece ser adecuado.' },
    { max: 14,  label: 'Somnolencia leve',      color: '#d97706', bg: '#fef3c7', icon: '⚠️', msg: 'Somnolencia leve. Conviene comentarlo con tu médico para descartar trastornos del sueño.' },
    { max: 17,  label: 'Somnolencia moderada',  color: '#ea580c', bg: '#ffedd5', icon: '🟠', msg: 'Somnolencia moderada. Se recomienda realizar un estudio del sueño (poligrafía respiratoria).' },
    { max: 24,  label: 'Somnolencia severa',    color: '#dc2626', bg: '#fee2e2', icon: '🔴', msg: 'Somnolencia severa. Alta probabilidad de apnea del sueño. Consultá con tu médico a la brevedad.' },
];

const pathologies = [
    {
        icon: Moon,
        slug: 'apnea-del-sueno',
        name: 'Apnea del Sueño',
        subtitle: 'Diagnóstico · Tratamiento · CPAP/AutoCPAP',
        desc: 'La apnea del sueño provoca pausas en la respiración durante el descanso. Se diagnostica con poligrafía respiratoria y se trata con CPAP o AutoCPAP. En Inser Salud te asesoramos desde el diagnóstico hasta la adaptación al equipo.',
        img: '/artifacts/hero_apnea.jpg',
        color: '#1e40af',
        tags: ['CPAP', 'AutoCPAP', 'Máscaras', 'Alquiler'],
    },
    {
        icon: Wind,
        slug: 'epoc',
        name: 'EPOC',
        subtitle: 'Oxigenoterapia · Inhaladores · Concentradores',
        desc: 'Brindamos datos y consejos sobre la EPOC para ayudar a los pacientes a manejar su condición. Contamos con concentradores portátiles, mochilas de oxígeno y asesoramiento sobre el uso correcto del inhalador con aerocámara.',
        img: '/artifacts/hero_epoc.jpg',
        color: '#0ea5e9',
        tags: ['Concentrador', 'Oxígeno', 'Portátil', 'Mochila O₂'],
    },
    {
        icon: Activity,
        slug: 'fibrosis-pulmonar',
        name: 'Fibrosis Pulmonar',
        subtitle: 'Oxígeno líquido · Concentradores · Soporte 24hs',
        desc: 'La fibrosis pulmonar requiere oxigenoterapia continua. Ofrecemos concentradores de oxígeno estacionarios y portátiles, mochilas de oxígeno y oxígeno líquido para mantener la independencia y calidad de vida del paciente.',
        img: '/artifacts/hero_fibrosis.jpg',
        color: '#6366f1',
        tags: ['Concentrador', 'O₂ Líquido', 'Mochila O₂', 'Portátil'],
    },
    {
        icon: Brain,
        slug: 'esclerosis-lateral-amiotrofica',
        name: 'Esclerosis Lateral Amiotrófica',
        subtitle: 'Asistente de tos · BiPAP · Ventilación no invasiva',
        desc: 'En la ELA es fundamental mantener una tos eficaz y una ventilación adecuada. Equipamos a los pacientes con asistentes de tos (cough assist) y ventiladores no invasivos BiPAP para preservar la función respiratoria.',
        img: '/artifacts/hero_ela.jpg',
        color: '#8b5cf6',
        tags: ['Cough Assist', 'BiPAP', 'Ventilación', 'ELA'],
    },
    {
        icon: Zap,
        slug: 'atrofia-muscular-espinal',
        name: 'Atrofia Muscular Espinal',
        subtitle: 'BiPAP · Asistente de tos · Seguimiento especializado',
        desc: 'La AME afecta los músculos respiratorios progresivamente. Proveemos equipos de ventilación no invasiva y asistentes de tos adaptados a cada etapa de la enfermedad, con acompañamiento profesional continuo.',
        img: '/artifacts/hero_ame.jpg',
        color: '#ec4899',
        tags: ['BiPAP', 'Cough Assist', 'AME', 'Pediátrico'],
    },
    {
        icon: Heart,
        slug: 'paralisis-cerebral',
        name: 'Parálisis Cerebral',
        subtitle: 'Máscaras BiPAP · Ventilación · Adaptación',
        desc: 'Los pacientes con parálisis cerebral frecuentemente requieren soporte ventilatorio con BiPAP y máscaras especiales. Contamos con una amplia variedad de interfaces y acompañamiento para lograr la mejor adaptación.',
        img: '/artifacts/hero_paralisis.jpg',
        color: '#f59e0b',
        tags: ['BiPAP', 'Máscaras', 'Adaptación', 'Seguimiento'],
    },
];

const tips = [
    { icon: CheckCircle, title: 'Cómo adaptarse al CPAP', desc: 'Los primeros días pueden ser incómodos. Usá el equipo primero mientras estás despierto, en períodos cortos, hasta acostumbrarte a la sensación de presión y la máscara.', color: '#10b981' },
    { icon: Lightbulb, title: 'Ejercicios respiratorios', desc: 'Practicá respiración diafragmática y labios fruncidos diariamente. 10 minutos por la mañana mejoran la capacidad pulmonar y reducen la disnea.', color: '#1e40af' },
    { icon: RefreshCw, title: 'Renovación de accesorios', desc: 'Cambiá el filtro del CPAP cada 30 días, la almohadilla de la máscara cada 2 semanas y el tubo cada 3 meses para asegurar higiene y rendimiento óptimo.', color: '#f59e0b' },
    { icon: Bell, title: 'Señales de alerta', desc: 'Consultá a tu médico si notás mayor somnolencia diurna, dolores de cabeza matutinos, boca muy seca o si el equipo hace ruidos inusuales.', color: '#ef4444' },
];

const stats = [
    { value: '+500', label: 'Pacientes atendidos', icon: Users },
    { value: '+5', label: 'Años de experiencia', icon: Award },
    { value: 'ANMAT', label: 'Aparatología aprobada', icon: Shield },
    { value: '24hs', label: 'Entrega en Córdoba', icon: Clock },
];

// ── Guía educativa: ¿Qué son estos equipos? ────────────────────────────────
const guides = [
    {
        icon: Wind,
        title: 'CPAP',
        question: '¿Qué es un CPAP?',
        short: 'Equipo de presión positiva fija que mantiene las vías respiratorias abiertas durante el sueño.',
        img: '/artifacts/products/1752160942319-bmcg2.2.jfif',
        long: [
            'El CPAP (Continuous Positive Airway Pressure) entrega aire a una presión constante a través de una máscara para evitar que la vía aérea se colapse mientras dormís.',
            'Es el tratamiento de primera línea para la apnea obstructiva del sueño (AOS) leve a moderada.',
            'Se recomienda usarlo todas las noches durante al menos 4-6 horas para obtener sus beneficios: mejor descanso, menos somnolencia diurna y reducción del riesgo cardiovascular.',
        ],
        color: '#1e40af',
        priceFrom: 'Desde $495.000 · U$S 330',
    },
    {
        icon: Activity,
        title: 'AutoCPAP',
        question: '¿Qué es un AutoCPAP?',
        short: 'CPAP con presión automática: ajusta el flujo segundo a segundo según lo que tu cuerpo necesita.',
        img: '/artifacts/products/bbb738c4-8671-4228-b86d-6f1ffd179569.jpg',
        long: [
            'El AutoCPAP (APAP) es una variante inteligente del CPAP. En vez de una presión fija, trabaja dentro de un rango y ajusta automáticamente la presión que entrega.',
            'Ideal para pacientes cuya apnea varía por postura, peso, alcohol o fase del sueño.',
            'La diferencia clave con el CPAP fijo: el CPAP da una sola presión toda la noche; el AutoCPAP la sube o baja según lo necesites.',
        ],
        color: '#0ea5e9',
        priceFrom: 'Desde U$S 415',
    },
    {
        icon: Layers,
        title: 'BiPAP',
        question: '¿Qué es un BiPAP?',
        short: 'Equipo con dos niveles de presión: más alta al inspirar (IPAP) y más baja al exhalar (EPAP).',
        img: '/artifacts/products/2cffdc89-7433-4bcb-80cd-7f2862733ec0.jpg',
        long: [
            'El BiPAP (Bilevel Positive Airway Pressure) entrega dos presiones distintas: IPAP durante la inspiración y EPAP al exhalar. Esto reduce el esfuerzo respiratorio.',
            'Se indica cuando el CPAP no alcanza: EPOC severa, enfermedades neuromusculares (ELA, AME, Duchenne), hipoventilación, apnea compleja, síndrome de obesidad-hipoventilación.',
            'Los equipos S/T agregan una frecuencia de respaldo: si dejás de respirar, el equipo te da un ciclo automáticamente.',
        ],
        color: '#6366f1',
        priceFrom: 'Desde $1.300.000 · U$S 907',
    },
    {
        icon: Droplet,
        title: 'Concentrador de O₂',
        question: '¿Qué es la oxigenoterapia?',
        short: 'Equipo que toma aire del ambiente y entrega oxígeno puro (≥93%) al paciente.',
        img: '/artifacts/products/b9875919-47d8-482e-ba62-800aff89739d.jpeg',
        long: [
            'La oxigenoterapia domiciliaria se usa cuando la saturación de oxígeno baja por debajo de lo normal. Se indica en EPOC, fibrosis pulmonar, ELA avanzada, hipertensión pulmonar y otras condiciones.',
            'Los concentradores estacionarios son para uso en casa 24hs (más potentes, hasta 5 L/min). Los portátiles (a pulso) son para mantener movilidad y viajar.',
            'No se recarga como un tubo: enchufás el equipo y produce oxígeno a partir del aire ambiente. Los portátiles usan batería para salidas.',
        ],
        color: '#10b981',
        priceFrom: 'Desde U$S 713 · Portátiles desde U$S 1.880',
    },
    {
        icon: Waves,
        title: 'Asistente de Tos',
        question: '¿Qué es un Cough Assist?',
        short: 'Equipo que simula el mecanismo de la tos para movilizar secreciones respiratorias.',
        img: '/artifacts/products/a44d34ae-c159-4f83-8c8d-41c2fcfc4e49.jpg',
        long: [
            'El asistente de tos (insuflador-exsuflador mecánico) insufla aire a presión positiva y luego cambia rápidamente a presión negativa para imitar una tos natural.',
            'Es esencial en enfermedades neuromusculares donde los músculos respiratorios están debilitados: ELA, AME, Duchenne, parálisis cerebral y lesiones medulares altas.',
            'Previene neumonías por acumulación de secreciones y reduce hospitalizaciones. Se usa varias veces al día según indicación kinésica.',
        ],
        color: '#f59e0b',
        priceFrom: 'Desde U$S 9.084',
    },
    {
        icon: Stethoscope,
        title: 'Poligrafía',
        question: '¿Qué es un estudio del sueño?',
        short: 'Estudio diagnóstico que se hace en casa para detectar apnea del sueño sin internación.',
        img: '/artifacts/products/1752508033704-poligrafobmc.jfif',
        long: [
            'La poligrafía respiratoria mide flujo de aire nasal, oxígeno en sangre (SpO₂), ronquido, posición corporal y esfuerzo respiratorio durante una noche de sueño.',
            'Es la forma más práctica y económica de diagnosticar apnea obstructiva del sueño. Se entrega el polígrafo, dormís con él una noche en tu casa y se devuelve al día siguiente.',
            'El informe genera el Índice de Apnea-Hipopnea (AHI), que indica la severidad: <5 normal, 5-15 leve, 15-30 moderada, >30 severa.',
        ],
        color: '#ec4899',
        priceFrom: 'Consultar · Polígrafo desde U$S 1.570',
    },
];

// ── Guía de máscaras para CPAP y BiPAP ─────────────────────────────────────
// La máscara es donde más pacientes abandonan el tratamiento, y ningún competidor
// local publica sus precios. Esta guía es contenido propio + diferencial de venta.
const maskGuide = [
    {
        tipo: 'Nasal',
        icon: '👃',
        color: '#0ea5e9',
        queEs: 'Cubre solo la nariz, con un arnés liviano. Es la más usada y la que mejor tolera la mayoría de los pacientes.',
        paraQuien: 'Para quienes respiran por la nariz durante el sueño. Menos volumen sobre la cara, menos sensación de encierro y más libertad para moverse en la cama.',
        ojo: 'Si dormís con la boca abierta, se escapa el aire y perdés presión. En ese caso conviene una nasobucal o sumar una mentonera.',
        modelos: [
            ['Máscara Nasal RESCOMF', '$50.000'],
            ['Máscara Nasal BMC N4 con apoya frente', 'U$S 36'],
            ['Máscara Nasal BMC N5a sin apoya frente', 'U$S 60'],
            ['Máscara Nasal AirFit mínimo contacto ResMed', 'U$S 157'],
            ['Mascarilla Nasal DreamWear Philips', '$223.000'],
        ],
    },
    {
        tipo: 'Nasobucal (full face)',
        icon: '😮',
        color: '#8b5cf6',
        queEs: 'Cubre nariz y boca a la vez, con un sellado más amplio sobre la cara.',
        paraQuien: 'Para quienes abren la boca al dormir, tienen la nariz congestionada seguido o necesitan presiones altas. También es la habitual en BiPAP.',
        ojo: 'Pesa y apoya más que la nasal, así que el talle correcto es clave: una nasobucal grande de más pierde aire y marca la cara.',
        modelos: [
            ['Máscara Nasobucal BMC F6 multitalle', '$198.000'],
            ['Mascarilla Nasobucal DreamWear Philips', '$229.000'],
            ['Buconasal BMC F5A sin apoya frente', 'U$S 52'],
            ['Buconasal Yuwell con apoya frente', 'U$S 52'],
            ['Nasobucal AirFit F30 ResMed', 'U$S 212'],
        ],
    },
    {
        tipo: 'Almohadillas nasales',
        icon: '💨',
        color: '#10b981',
        queEs: 'No cubren la nariz: apoyan directamente en las fosas nasales con dos almohadillas de silicona.',
        paraQuien: 'Para quienes se sienten encerrados con las otras máscaras, usan anteojos para leer en la cama, tienen barba o duermen boca abajo.',
        ojo: 'Al ser el contacto más chico, en presiones altas puede molestar el chorro de aire directo en la nariz.',
        modelos: [
            ['Máscara Pillow nasal Yuwell YP-01', 'U$S 42'],
        ],
    },
    {
        tipo: 'Pediátricas',
        icon: '🧒',
        color: '#f59e0b',
        queEs: 'Diseñadas con medidas y materiales para bebés y chicos, no son máscaras de adulto en talle chico.',
        paraQuien: 'Lactantes y niños con indicación de ventilación, habitualmente en atrofia muscular espinal, parálisis cerebral y cuadros neuromusculares.',
        ojo: 'La línea pediátrica es difícil de conseguir en el país; tenemos tres opciones y talles desde neonatal.',
        modelos: [
            ['Máscara Nasal Pediátrica HSINER Cirri Mini', 'U$S 105'],
            ['Máscara Nasal Pediátrica Jirafa Philips', 'U$S 220'],
            ['Infant CPAP Kit neonatal (talles 00 a 5)', 'U$S 97'],
        ],
    },
    {
        tipo: 'Sin fuga (terapia intensiva)',
        icon: '🏥',
        color: '#ef4444',
        queEs: 'Máscara NO ventilada: no tiene los orificios de fuga que sí traen las de uso domiciliario.',
        paraQuien: 'Para respiradores de terapia intensiva y ventilación no invasiva con circuito de doble rama o válvula espiratoria.',
        ojo: 'NO sirve para un CPAP o BiPAP domiciliario común: sin la fuga controlada se reinhala el aire exhalado. Es un producto de uso profesional.',
        modelos: [
            ['Máscara Buconasal BMC F2 codo azul', '$68.000'],
        ],
    },
];

// ── Comparativa CPAP vs AutoCPAP vs BiPAP ──────────────────────────────────
const comparativeRows = [
    ['Tipo de presión', 'Fija, constante toda la noche', 'Variable, se ajusta automáticamente', 'Dos niveles: alta al inspirar / baja al exhalar'],
    ['Indicación principal', 'Apnea obstructiva leve a moderada', 'Apnea con presiones variables (por postura, etapas del sueño)', 'EPOC, ENM, apnea compleja, hipoventilación'],
    ['Confort', 'Estándar', 'Mayor (se adapta al paciente)', 'Muy alto al exhalar'],
    ['Costo', 'Más económico', 'Medio', 'Más elevado'],
    ['Desde', '$495.000 · U$S 330', 'U$S 415', '$1.300.000 · U$S 907'],
];

// ── Helper ─────────────────────────────────────────────────────────────────
const openSanti = (message) => {
    window.dispatchEvent(new CustomEvent('open-santi', { detail: { message } }));
};

// ── Galería interna del modal ─────────────────────────────────────────────
const ProductGallery = ({ images, name }) => {
    const [idx, setIdx] = useState(0);
    const total = images.length;
    const prev = (e) => { e.stopPropagation(); setIdx((idx - 1 + total) % total); };
    const next = (e) => { e.stopPropagation(); setIdx((idx + 1) % total); };
    return (
        <div className={css.galleryWrap}>
            <div className={css.galleryMain}>
                <img src={images[idx]} alt={`${name} (${idx + 1}/${total})`} loading="lazy" decoding="async" />
                {total > 1 && (
                    <>
                        <button className={`${css.galleryNav} ${css.galleryPrev}`} onClick={prev} aria-label="Anterior">‹</button>
                        <button className={`${css.galleryNav} ${css.galleryNext}`} onClick={next} aria-label="Siguiente">›</button>
                        <span className={css.galleryCounter}>{idx + 1} / {total}</span>
                    </>
                )}
            </div>
            {total > 1 && (
                <div className={css.galleryThumbs}>
                    {images.map((src, i) => (
                        <button
                            key={i}
                            className={`${css.galleryThumb} ${i === idx ? css.galleryThumbActive : ''}`}
                            onClick={(e) => { e.stopPropagation(); setIdx(i); }}
                            aria-label={`Imagen ${i + 1}`}
                        >
                            <img src={src} alt={`${name} thumb ${i + 1}`} loading="lazy" decoding="async" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

// ── Modal de especificaciones (in-page) ───────────────────────────────────
const SpecsModal = ({ product, onClose }) => {
    if (!product) return null;
    const gallery = getGallery(product);
    return (
        <div className={css.specsOverlay} onClick={onClose}>
            <div className={css.specsModal} onClick={(e) => e.stopPropagation()}>
                <button className={css.specsClose} onClick={onClose} aria-label="Cerrar">
                    <X size={22} />
                </button>

                <div className={css.specsHeader}>
                    <ProductGallery images={gallery} name={product.name} />
                    <div>
                        {product.category && <span className={css.specsCategory}>{product.category}</span>}
                        <h3>{product.name}</h3>
                        <Precio valor={product.price} className={css.specsPrice} />
                        {product.note && <p className={css.specsNote}>{product.note}</p>}
                        {gallery.length > 1 && (
                            <p className={css.galleryHint}>
                                📸 {gallery.length} imágenes disponibles — pasá entre ellas con las flechas o las miniaturas.
                            </p>
                        )}
                    </div>
                </div>

                <div className={css.specsBody}>
                    {product.review && (
                        <>
                            <h4>Reseña</h4>
                            <p className={css.specsNote} style={{ marginBottom: '1.25rem', lineHeight: 1.6 }}>{product.review}</p>
                        </>
                    )}
                    <h4>Especificaciones técnicas</h4>
                    {product.specs && product.specs.length > 0 ? (
                        <table className={css.specsTable}>
                            <tbody>
                                {product.specs.map(([k, v], i) => (
                                    <tr key={i}>
                                        <th>{k}</th>
                                        <td>{v}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className={css.specsNote}>Consultá con Santi las especificaciones completas.</p>
                    )}
                </div>

                <div className={css.specsFooter}>
                    <div className={css.specsSantiRow}>
                        <img
                            src="/artifacts/santi_real.jpg"
                            alt="Santi"
                            className={css.specsSantiAvatar}
                            onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Santi&background=1e40af&color=fff'; }}
                        />
                        <div>
                            <strong>¿Dudas sobre este equipo?</strong>
                            <p>Santi te asesora al instante — disponibilidad, financiación y adaptación.</p>
                        </div>
                    </div>
                    <div className={css.specsActions}>
                        <button
                            className={css.specsBtnSanti}
                            onClick={() => {
                                openSanti(`Hola Santi, estoy viendo las especificaciones del ${product.name} (${product.price}). ¿Podés asesorarme?`);
                                onClose();
                            }}
                        >
                            <MessageCircle size={16} /> Consultar con Santi
                        </button>
                        <a
                            className={css.specsBtnWa}
                            href={`https://wa.me/5493512065320?text=${encodeURIComponent(`Hola, me interesa el ${product.name}. ¿Me das más info?`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Phone size={14} /> WhatsApp directo
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ── Componente ─────────────────────────────────────────────────────────────
const LandingPage = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [specsProduct, setSpecsProduct] = useState(null);
    const [expandedGuide, setExpandedGuide] = useState(null);
    const [expandedService, setExpandedService] = useState(null);
    const [activeTagKey, setActiveTagKey] = useState(null); // formato: "slug::tag"
    const [showEpworth, setShowEpworth] = useState(false);
    const [epworthAnswers, setEpworthAnswers] = useState(Array(8).fill(-1));
    const [epworthResult, setEpworthResult] = useState(null);
    const navigate = useNavigate();

    // Diferenciacion por dominio: inser.ar apunta a venta de equipos;
    // insersalud.com a terapias domiciliarias y alquiler (su identidad historica).
    const isInsersalud = typeof window !== 'undefined' && window.location.hostname.includes('insersalud.com');

    const closeEpworth = () => {
        setShowEpworth(false);
        setEpworthAnswers(Array(8).fill(-1));
        setEpworthResult(null);
    };
    const computeEpworth = () => {
        const total = epworthAnswers.reduce((s, v) => s + (v === -1 ? 0 : v), 0);
        const level = EPWORTH_LEVELS.find(l => total <= l.max);
        setEpworthResult({ total, level });
    };

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
    };

    return (
        <div className={css.landingContainer}>

            {/* ── NAVBAR ─────────────────────────────────────────────── */}
            <nav className={css.navbar}>
                <div className={css.navContent}>
                    <div className={css.logo}>
                        <img src="/artifacts/logo_insersalud.jpg" alt="Inser Salud" className={css.logoImg} />
                    </div>

                    {/* Desktop links */}
                    <div className={css.navLinks}>
                        <button onClick={() => scrollTo('patologias')}>Patologías</button>
                        <button onClick={() => scrollTo('guia')}>Guía de equipos</button>
                        <button onClick={() => scrollTo('mascaras')}>Guía de máscaras</button>
                        <button onClick={() => scrollTo('ofertas')}>Ofertas</button>
                        <button onClick={() => scrollTo('tienda')}>Tienda</button>
                        <button onClick={() => scrollTo('servicios')}>Servicios</button>
                        <button onClick={() => scrollTo('consejos')}>Consejos</button>
                        <button onClick={() => scrollTo('contacto')}>Contacto</button>
                    </div>

                    <div className={css.navRight}>
                        <a href="tel:+5493512065320" className={css.waNavBtn} style={{ background: '#1e40af' }}>
                            <Phone size={16} /> Llamar
                        </a>
                        <a href={'https://wa.me/5493512065320?text=Hola%2C%20vengo%20del%20sitio%20de%20INSER%20SALUD%20y%20quiero%20hacer%20una%20consulta.'} target="_blank" rel="noopener noreferrer" className={css.waNavBtn}>
                            <MessageCircle size={16} /> WhatsApp
                        </a>
                        <button
                            className={css.hamburger}
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Menú"
                        >
                            {menuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <div className={css.mobileMenu}>
                        <button onClick={() => scrollTo('patologias')}>Patologías</button>
                        <button onClick={() => scrollTo('guia')}>Guía de equipos</button>
                        <button onClick={() => scrollTo('mascaras')}>Guía de máscaras</button>
                        <button onClick={() => scrollTo('ofertas')}>Ofertas</button>
                        <button onClick={() => scrollTo('tienda')}>Tienda</button>
                        <button onClick={() => scrollTo('servicios')}>Servicios</button>
                        <button onClick={() => scrollTo('consejos')}>Consejos</button>
                        <button onClick={() => scrollTo('contacto')}>Contacto</button>
                        <a href="tel:+5493512065320" className={css.mobileWa} style={{ background: '#1e40af' }}>
                            <Phone size={16} /> Llamar al +54 9 351 206-5320
                        </a>
                        <a href={'https://wa.me/5493512065320?text=Hola%2C%20vengo%20del%20sitio%20de%20INSER%20SALUD%20y%20quiero%20hacer%20una%20consulta.'} target="_blank" rel="noopener noreferrer" className={css.mobileWa}>
                            <MessageCircle size={16} /> Escribirnos por WhatsApp
                        </a>
                    </div>
                )}
            </nav>

            {/* ── HERO ───────────────────────────────────────────────── */}
            <header className={css.hero}>
                <div className={css.heroContent}>
                    <div className={css.badge}>
                        <Shield size={14} /> Aparatología aprobada por ANMAT
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.6rem' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', borderRadius: '999px', padding: '0.35rem 0.85rem', fontWeight: 700, fontSize: '0.83rem' }}>
                            <Truck size={14} /> Venta con envío a todo el país · Alquiler en Córdoba
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#fefce8', color: '#a16207', border: '1px solid #fde68a', borderRadius: '999px', padding: '0.35rem 0.85rem', fontWeight: 700, fontSize: '0.83rem' }}>
                            💳 3 cuotas sin interés con Banco Galicia
                        </span>
                    </div>
                    {isInsersalud ? (
                        <>
                            <h1 className={css.heroTitle}>
                                Terapias respiratorias<br />
                                <span>domiciliarias</span>
                            </h1>
                            <p className={css.heroSubtitle}>
                                Alquiler y venta de equipos CPAP, BiPAP y oxigenoterapia a domicilio en Córdoba. Instalación, adaptación y seguimiento profesional en tu hogar, con soporte técnico continuo. Vendemos con envío a todo el país; el alquiler es en Córdoba.
                            </p>
                        </>
                    ) : (
                        <>
                            <h1 className={css.heroTitle}>
                                Respirá mejor,<br />
                                <span>viví mejor</span>
                            </h1>
                            <p className={css.heroSubtitle}>
                                Especialistas en medicina respiratoria en Córdoba. Venta de equipos CPAP, BiPAP y concentradores de oxígeno con envío a todo el país, y alquiler en Córdoba, con seguimiento profesional y atención personalizada.
                            </p>
                        </>
                    )}
                    <div className={css.heroActions}>
                        <button className={css.heroBtnPrimary} onClick={() => openSanti(null)}>
                            Hablar con Santi
                        </button>
                        <button className={css.heroBtnOutline} onClick={() => scrollTo('ofertas')}>
                            Ver Ofertas
                        </button>
                    </div>
                </div>

                <div className={css.heroImageContainer}>
                    <div className={css.heroFloatCard}>
                        <img src="/artifacts/santi_real.jpg" alt="Santi" className={css.santiMini}
                            onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Santi&background=1e40af&color=fff'; }} />
                        <div>
                            <strong>Santi está en línea</strong>
                            <p>¿Te ayudo a elegir tu equipo?</p>
                        </div>
                    </div>
                    <div className={css.heroImgWrapper}>
                        <img src="/artifacts/cpap_real.png" alt="Inser Salud" className={css.heroImg} />
                    </div>
                </div>
            </header>

            {/* ── STATS BAR ──────────────────────────────────────────── */}
            <div className={css.statsBar}>
                {stats.map((s, i) => (
                    <div key={i} className={css.statItem}>
                        <s.icon size={28} className={css.statIcon} />
                        <div>
                            <span className={css.statValue}>{s.value}</span>
                            <span className={css.statLabel}>{s.label}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── ¿QUÉ NECESITÁS HOY? (caminos de usuario) ───────────── */}
            <section style={{ padding: '2.5rem 1rem', background: '#fff' }}>
                <div className={css.container}>
                    <h2 style={{ textAlign: 'center', color: '#0f172a', fontSize: 'clamp(1.3rem, 3vw, 1.7rem)', margin: '0 0 1.5rem' }}>¿Qué necesitás hoy?</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', maxWidth: 980, margin: '0 auto' }}>
                        <a href={`https://wa.me/5493512065320?text=${encodeURIComponent('Hola, necesito alquilar un equipo hoy en Córdoba.')}`} target="_blank" rel="noopener noreferrer" style={{ display: 'block', background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: '1rem', padding: '1.25rem', textDecoration: 'none' }}>
                            <strong style={{ display: 'block', color: '#166534', fontSize: '1.05rem', marginBottom: '0.35rem' }}>Necesito alquilar hoy</strong>
                            <span style={{ color: '#334155', fontSize: '0.9rem' }}>Entrega e instalación a domicilio en Córdoba, en 24 hs. Escribinos y lo resolvemos.</span>
                        </a>
                        <button onClick={() => scrollTo('ofertas')} style={{ textAlign: 'left', cursor: 'pointer', background: '#eff6ff', border: '1.5px solid #bfdbfe', borderRadius: '1rem', padding: '1.25rem', fontFamily: 'inherit' }}>
                            <strong style={{ display: 'block', color: '#1e40af', fontSize: '1.05rem', marginBottom: '0.35rem' }}>Quiero comprar un equipo</strong>
                            <span style={{ color: '#334155', fontSize: '0.9rem' }}>Precios visibles, envío a todo el país y cuotas con Banco Galicia. Mirá las ofertas.</span>
                        </button>
                        <button onClick={() => openSanti(null)} style={{ textAlign: 'left', cursor: 'pointer', background: '#fefce8', border: '1.5px solid #fde68a', borderRadius: '1rem', padding: '1.25rem', fontFamily: 'inherit' }}>
                            <strong style={{ display: 'block', color: '#a16207', fontSize: '1.05rem', marginBottom: '0.35rem' }}>Necesito asesoramiento</strong>
                            <span style={{ color: '#334155', fontSize: '0.9rem' }}>Santi te orienta al instante según tu indicación médica. Sin turnos, las 24 hs.</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* ── PATOLOGÍAS ─────────────────────────────────────────── */}
            <section id="patologias" className={css.section}>
                <div className={css.container}>
                    <div className={css.sectionHeader}>
                        <span className={css.sectionTag}>Áreas de tratamiento</span>
                        <h2>Patologías que atendemos</h2>
                        <p>Equipamiento certificado y acompañamiento profesional para cada condición respiratoria.</p>
                    </div>
                    <div className={css.pathGrid}>
                        {pathologies.map((p, i) => (
                            <div key={i} className={css.pathCard} style={{ '--card-color': p.color }}>
                                {/* Imagen del equipo */}
                                <div
                                    className={css.pathImgLink}
                                    onClick={() => navigate(`/patologia/${p.slug}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className={css.pathImgContainer}>
                                        <img src={p.img} alt={p.name} loading="lazy" decoding="async" />
                                        <div className={css.pathImgOverlay}>
                                            <p.icon size={32} />
                                            <span>Ver más info →</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Contenido */}
                                <div className={css.pathBody}>
                                    <div className={css.pathIconSmall}>
                                        <p.icon size={18} />
                                    </div>
                                    <h3>{p.name}</h3>
                                    <span className={css.pathSubtitle}>{p.subtitle}</span>
                                    <p>{p.desc}</p>

                                    {/* Tags */}
                                    <div className={css.pathTags}>
                                        {p.tags.map((tag, j) => {
                                            const hasInfo = !!ALL_TAG_INFO[tag];
                                            const key = `${p.slug}::${tag}`;
                                            const isActive = activeTagKey === key;
                                            return (
                                                <button
                                                    key={j}
                                                    className={`${css.pathTag} ${hasInfo ? css.pathTagClickable : ''} ${isActive ? css.pathTagActive : ''}`}
                                                    onClick={() => hasInfo ? setActiveTagKey(isActive ? null : key) : undefined}
                                                    style={hasInfo ? { cursor: 'pointer' } : { cursor: 'default' }}
                                                >
                                                    {tag} {hasInfo && <span className={css.pathTagArrow}>{isActive ? '▲' : '▼'}</span>}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Panel de reseña de tag activo */}
                                    {activeTagKey?.startsWith(p.slug + '::') && (() => {
                                        const activeTag = activeTagKey.split('::')[1];
                                        const info = ALL_TAG_INFO[activeTag];
                                        if (!info) return null;
                                        return (
                                            <div className={css.tagReview}>
                                                <div className={css.tagReviewHead}>
                                                    <span className={css.tagReviewIcon}>{info.icon}</span>
                                                    <div>
                                                        <strong>{info.title}</strong>
                                                        <span>{info.subtitle}</span>
                                                    </div>
                                                </div>
                                                <p className={css.tagReviewBody}>{info.body}</p>

                                                {/* Bullets (CPAP, AutoCPAP, Alquiler) */}
                                                {info.bullets && (
                                                    <ul className={css.tagReviewBullets}>
                                                        {info.bullets.map((b, bi) => (
                                                            <li key={bi}><span>{b.icon}</span>{b.text}</li>
                                                        ))}
                                                    </ul>
                                                )}

                                                {/* Comparación nasales vs nasobucales (Máscaras) */}
                                                {info.comparison && (
                                                    <div className={css.maskCompare}>
                                                        {[info.comparison.left, info.comparison.right].map((side, si) => (
                                                            <div key={si} className={css.maskSide} style={{ '--side-color': side.color }}>
                                                                <div className={css.maskSideHead}>
                                                                    <span>{side.icon}</span>
                                                                    <strong>{side.label}</strong>
                                                                </div>
                                                                <ul>
                                                                    {side.points.map((pt, pi) => (
                                                                        <li key={pi}>{pt}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {info.tip && <p className={css.tagReviewTip}>{info.tip}</p>}

                                                <a
                                                    href={`https://wa.me/5493512065320?text=${encodeURIComponent(info.waMsg)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={css.tagReviewWa}
                                                >
                                                    📲 Consultar por WhatsApp
                                                </a>
                                            </div>
                                        );
                                    })()}

                                    {/* Acciones */}
                                    <div className={css.pathActions}>
                                        <button
                                            className={css.pathBtnSanti}
                                            onClick={() => openSanti(`Hola Santi, necesito información y equipos para ${p.name}. ¿Qué me recomendás?`)}
                                        >
                                            Consultar con Santi
                                        </button>
                                        <button
                                            className={css.pathBtnInfo}
                                            onClick={() => navigate(`/patologia/${p.slug}`)}
                                        >
                                            Más info →
                                        </button>
                                        {p.slug === 'apnea-del-sueno' && (
                                            <button
                                                className={css.pathBtnEpworth}
                                                onClick={() => setShowEpworth(true)}
                                            >
                                                🧪 Test de Epworth
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── GUÍA EDUCATIVA: ¿Qué son estos equipos? ──────────────── */}
            <section id="guia" className={css.guiaSection}>
                <div className={css.container}>
                    <div className={css.sectionHeader}>
                        <span className={css.sectionTag}><BookOpen size={14} /> Guía rápida</span>
                        <h2>¿Qué son estos equipos?</h2>
                        <p>Entendé para qué sirve cada aparato antes de elegir. Información clara, sin tecnicismos innecesarios.</p>
                    </div>

                    <div className={css.guiaGrid}>
                        {guides.map((g, i) => {
                            const isOpen = expandedGuide === i;
                            return (
                                <div
                                    key={i}
                                    className={`${css.guiaCard} ${isOpen ? css.guiaCardOpen : ''}`}
                                    style={{ '--guia-color': g.color }}
                                >
                                    {/* Imagen de portada */}
                                    {g.img && (
                                        <div className={css.guiaImgWrap}>
                                            <img src={g.img} alt={g.title} className={css.guiaImg} loading="lazy" decoding="async" />
                                            <div className={css.guiaImgOverlay} style={{ background: `linear-gradient(to bottom, transparent 40%, ${g.color}22 100%)` }} />
                                        </div>
                                    )}

                                    <div className={css.guiaHeader}>
                                        <div className={css.guiaIconBox}>
                                            <g.icon size={26} />
                                        </div>
                                        <div className={css.guiaTitles}>
                                            <span className={css.guiaTitle}>{g.title}</span>
                                            <strong className={css.guiaQuestion}>{g.question}</strong>
                                        </div>
                                    </div>

                                    <p className={css.guiaShort}>{g.short}</p>

                                    {isOpen && (
                                        <div className={css.guiaLong}>
                                            {g.long.map((para, j) => (
                                                <p key={j}>{para}</p>
                                            ))}
                                            <div className={css.guiaPrice}>{g.priceFrom}</div>
                                        </div>
                                    )}

                                    <div className={css.guiaActions}>
                                        <button
                                            className={css.guiaExpandBtn}
                                            onClick={() => setExpandedGuide(isOpen ? null : i)}
                                        >
                                            {isOpen ? 'Mostrar menos' : 'Leer más'}
                                            <ChevronDown size={16} className={isOpen ? css.chevronOpen : ''} />
                                        </button>
                                        <button
                                            className={css.guiaSantiBtn}
                                            onClick={() => openSanti(`Hola Santi, ¿me explicás mejor qué es un ${g.title} y si me conviene?`)}
                                        >
                                            <MessageCircle size={14} /> Consultar
                                        </button>
                                    </div>

                                    <a
                                        className={css.guiaRentBtn}
                                        href={`https://wa.me/5493512065320?text=${encodeURIComponent(`Hola, quisiera consultar el precio de alquiler de un ${g.title}. ¿Me pasan info y disponibilidad?`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Phone size={14} /> Consultar por alquiler (WhatsApp)
                                    </a>
                                </div>
                            );
                        })}
                    </div>

                    {/* Tabla comparativa CPAP vs AutoCPAP vs BiPAP */}
                    <div className={css.comparativeWrap}>
                        <h3 className={css.comparativeTitle}>Comparativa rápida: CPAP · AutoCPAP · BiPAP</h3>
                        <div className={css.comparativeScroll}>
                            <table className={css.comparativeTable}>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>CPAP</th>
                                        <th>AutoCPAP</th>
                                        <th>BiPAP</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparativeRows.map(([label, c, a, b], i) => (
                                        <tr key={i}>
                                            <th>{label}</th>
                                            <td>{c}</td>
                                            <td>{a}</td>
                                            <td>{b}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className={css.comparativeFoot}>
                            ¿No estás seguro cuál te conviene?{' '}
                            <button
                                className={css.comparativeLink}
                                onClick={() => openSanti('Hola Santi, ¿me ayudás a decidir entre CPAP, AutoCPAP y BiPAP según mi caso?')}
                            >
                                Preguntale a Santi →
                            </button>
                        </p>
                    </div>
                </div>
            </section>

            {/* ── GUÍA DE MÁSCARAS ───────────────────────────────────── */}
            <section id="mascaras" className={css.guiaSection}>
                <div className={css.container}>
                    <div className={css.sectionHeader}>
                        <span className={css.sectionTag}>😷 Guía de máscaras</span>
                        <h2>Máscaras para CPAP y BiPAP: cuál te corresponde</h2>
                        <p>
                            La máscara es donde más pacientes abandonan el tratamiento, y casi siempre es por
                            una máscara mal elegida, no por el equipo. Acá están los 5 tipos que vendemos, para
                            quién es cada uno y a qué precio.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                        {maskGuide.map((m, i) => (
                            <article
                                key={i}
                                style={{
                                    background: '#fff',
                                    border: '1px solid #e8eef6',
                                    borderTop: `4px solid ${m.color}`,
                                    borderRadius: '0.9rem',
                                    padding: '1.1rem 1.2rem',
                                    boxShadow: '0 4px 18px rgba(30,64,175,0.06)',
                                }}
                            >
                                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.15rem', margin: '0 0 0.6rem', color: '#0f172a' }}>
                                    <span aria-hidden="true">{m.icon}</span> {m.tipo}
                                </h3>
                                <p style={{ margin: '0 0 0.55rem', lineHeight: 1.6, color: '#334155', fontSize: '0.95rem' }}>{m.queEs}</p>
                                <p style={{ margin: '0 0 0.55rem', lineHeight: 1.6, color: '#334155', fontSize: '0.95rem' }}>
                                    <strong style={{ color: m.color }}>Para quién:</strong> {m.paraQuien}
                                </p>
                                <p style={{ margin: '0 0 0.8rem', lineHeight: 1.6, color: '#475569', fontSize: '0.9rem', background: '#f8fafc', borderLeft: `3px solid ${m.color}`, padding: '0.5rem 0.7rem', borderRadius: '0 0.4rem 0.4rem 0' }}>
                                    <strong>A tener en cuenta:</strong> {m.ojo}
                                </p>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.35rem' }}>
                                    {m.modelos.map(([nombre, precio], k) => (
                                        <li key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: '0.8rem', fontSize: '0.88rem', borderBottom: '1px dashed #e8eef6', paddingBottom: '0.3rem' }}>
                                            <span style={{ color: '#475569' }}>{nombre}</span>
                                            <strong style={{ color: '#0f172a', whiteSpace: 'nowrap' }}>{precio}</strong>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.7rem', justifyContent: 'center' }}>
                        <button
                            className={css.guiaSantiBtn}
                            onClick={() => openSanti('Hola Santi, no sé qué máscara me conviene para mi CPAP. ¿Me ayudás a elegir?')}
                        >
                            ¿Cuál me conviene? Preguntale a Santi
                        </button>
                        <Link to="/mascaras-cpap" className={css.guiaRentBtn} style={{ textDecoration: 'none' }}>
                            Ver todas las máscaras y precios →
                        </Link>
                    </div>
                    <p style={{ textAlign: 'center', marginTop: '0.9rem', fontSize: '0.88rem', color: '#64748b' }}>
                        El talle importa tanto como el tipo: una máscara del talle equivocado pierde aire y te despierta.
                        Contanos cómo dormís y te ayudamos a elegir el modelo y el talle correcto.
                    </p>
                </div>
            </section>

            {/* ── OFERTAS DESTACADAS ─────────────────────────────────── */}
            <section id="ofertas" className={css.productsSection}>
                <div className={css.container}>
                    <div className={css.sectionHeader}>
                        <span className={css.sectionTagWhite}>🔥 Promociones especiales</span>
                        <h2 className={css.whiteText}>Ofertas Vigentes</h2>
                        <p className={css.whiteMutedText}>Precios promocionales por tiempo limitado. Aparatología aprobada por ANMAT.</p>
                    </div>
                    {/* Financiación Banco Galicia */}
                    <div style={{ maxWidth: 720, margin: '0 auto 2rem', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.35)', borderRadius: '0.9rem', padding: '1rem 1.25rem', textAlign: 'center', color: '#fff' }}>
                        <div style={{ fontWeight: 800, fontSize: '1.05rem', marginBottom: '0.25rem' }}>
                            💳 3 CUOTAS SIN INTERÉS con Banco Galicia
                        </div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.95 }}>
                            Clientes Galicia, miércoles y viernes, en todos los equipos. Otras opciones: 3 cuotas +15% · 6 cuotas +24% · 9 cuotas +39%.
                        </div>
                        <div style={{ fontSize: '0.78rem', opacity: 0.8, marginTop: '0.3rem' }}>
                            Promoción sujeta a condiciones del banco. Consultanos por tu equipo.
                        </div>
                    </div>
                    <div className={css.productsGrid}>
                        {ofertas.map((p, i) => {
                            const gCount = getGallery(p).length;
                            return (
                            <div key={i} className={`${css.productCard} ${css.productCardOferta}`}>
                                {p.badge && <span className={css.cardBadge}>{p.badge}</span>}
                                <button
                                    className={css.productImgContainer}
                                    onClick={() => setSpecsProduct(p)}
                                    aria-label={`Ver galería de ${p.name}`}
                                >
                                    <img src={p.img} alt={p.name} loading="lazy" decoding="async" />
                                    {gCount > 1 && <span className={css.galleryCountBadge}>📸 {gCount}</span>}
                                </button>
                                <h4>{p.name}</h4>
                                <Precio valor={p.price} className={css.priceTag} />
                                {p.note && <p className={css.productNote}>{p.note}</p>}
                                <div className={css.productCardBtns}>
                                    <button
                                        className={css.consultBtn}
                                        onClick={() => openSanti(`Hola Santi, me interesa aprovechar la oferta del ${p.name} a ${p.price}. ¿Está disponible?`)}
                                    >
                                        Aprovechar oferta
                                    </button>
                                    <button
                                        className={css.specBtn}
                                        onClick={() => setSpecsProduct(p)}
                                    >
                                        Especificaciones
                                    </button>
                                </div>
                            </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── TIENDA (Catálogo completo) ─────────────────────────── */}
            <section id="tienda" className={css.tiendaSection}>
                <div className={css.container}>
                    <div className={css.sectionHeader}>
                        <span className={css.sectionTag}>Catálogo completo</span>
                        <h2>Nuestra Tienda</h2>
                        <p>CPAP, BiPAP, concentradores de oxígeno, máscaras y accesorios. Aparatología aprobada por ANMAT.</p>
                    </div>

                    {[
                        { key: 'nasal',   label: 'Máscaras Nasales',            emoji: '👃', filter: p => p.category === 'Máscara' && !/nasobucal|buconasal|f2\b|f5a|f20|f30/i.test(p.name) },
                        { key: 'nasobu',  label: 'Máscaras Nasobucales',        emoji: '😷', filter: p => p.category === 'Máscara' && /nasobucal|buconasal|f2\b|f5a|f20|f30/i.test(p.name) },
                        { key: 'cpap',    label: 'CPAP & AutoCPAP',             emoji: '🌬️', filter: p => p.category === 'CPAP' },
                        { key: 'bipap',   label: 'BiPAP & Ventiladores',        emoji: '🫁', filter: p => p.category === 'BiPAP' },
                        { key: 'conc',    label: 'Concentradores de Oxígeno',   emoji: '🩺', filter: p => p.category === 'Concentrador' },
                        { key: 'cough',   label: 'Asistente de Tos',            emoji: '💨', filter: p => p.category === 'Cough Assist' },
                        { key: 'diag',    label: 'Diagnóstico del Sueño',       emoji: '📊', filter: p => p.category === 'Diagnóstico' },
                        { key: 'ox',      label: 'Oxígeno & Accesorios',        emoji: '🔵', filter: p => p.category === 'Oxígeno' },
                    ].map(({ key, label, emoji, filter }) => {
                        const items = tienda.filter(filter);
                        if (!items.length) return null;
                        return (
                            <div key={key} className={css.categoryGroup}>
                                <div className={css.categoryGroupTitle}>
                                    <span className={css.categoryGroupEmoji}>{emoji}</span>
                                    {label}
                                </div>
                                <div className={css.productsGrid}>
                                    {items.map((p, i) => {
                                        const gCount = getGallery(p).length;
                                        return (
                                        <div key={i} className={css.productCard}>
                                            {p.badge && <span className={css.cardBadge}>{p.badge}</span>}
                                            <button className={css.productImgContainer} onClick={() => setSpecsProduct(p)}>
                                                <img src={p.img} alt={p.name} loading="lazy" decoding="async" />
                                                {gCount > 1 && <span className={css.galleryCountBadge}>📸 {gCount}</span>}
                                            </button>
                                            <h4>{p.name}</h4>
                                            <Precio valor={p.price} className={css.priceTag} />
                                            {p.note && <p className={css.productNote}>{p.note}</p>}
                                            <div className={css.productCardBtns}>
                                                <button
                                                    className={css.consultBtn}
                                                    onClick={() => openSanti(`Hola Santi, me interesa el ${p.name} a ${p.price}. ¿Podés darme más información y disponibilidad?`)}
                                                >
                                                    Consultar precio
                                                </button>
                                                <button
                                                    className={css.specBtn}
                                                    onClick={() => setSpecsProduct(p)}
                                                >
                                                    Ver fotos
                                                </button>
                                            </div>
                                        </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ── SERVICIOS ──────────────────────────────────────────── */}
            <section id="servicios" className={css.section}>
                <div className={css.container}>
                    <div className={css.sectionHeader}>
                        <span className={css.sectionTag}>Lo que hacemos</span>
                        <h2>Servicios Profesionales</h2>
                        <p>Acompañamiento integral para pacientes respiratorios en Córdoba.</p>
                    </div>
                    <div className={css.servicesGrid}>
                        {services.map((s, i) => {
                            const isExp = expandedService === i;
                            return (
                            <div key={i} className={`${css.serviceCard} ${isExp ? css.serviceCardExpanded : ''}`}>
                                <div className={css.serviceImgContainer}>
                                    <img src={s.img} alt={s.title} className={s.focusTop ? css.imgTop : ''} loading="lazy" decoding="async" />
                                </div>
                                <div className={css.serviceInfo}>
                                    <h3>{s.title}</h3>
                                    <p>{s.desc}</p>
                                    <div className={css.serviceInfoBtns}>
                                        {s.details ? (
                                            <button
                                                className={css.serviceExpandBtn}
                                                onClick={() => setExpandedService(isExp ? null : i)}
                                            >
                                                {isExp ? 'Cerrar ↑' : 'Ver cómo funciona ↓'}
                                            </button>
                                        ) : null}
                                        <a href={s.link} target="_blank" rel="noopener noreferrer" className={css.serviceLink}>
                                            {s.cta} →
                                        </a>
                                    </div>

                                    {/* Panel expandible de Adaptación y Seguimiento */}
                                    {s.details && isExp && (
                                        <div className={css.serviceDetails}>
                                            <p className={css.serviceDetailsIntro}>{s.details.intro}</p>
                                            <div className={css.serviceSteps}>
                                                {s.details.steps.map((step, j) => (
                                                    <div key={j} className={css.serviceStep}>
                                                        <span className={css.serviceStepIcon}>{step.icon}</span>
                                                        <div>
                                                            <strong>{step.title}</strong>
                                                            <p>{step.text}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <a
                                                href="https://wa.me/5493512065320?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20el%20servicio%20de%20adaptaci%C3%B3n%20y%20seguimiento"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={css.serviceDetailsWa}
                                            >
                                                📲 Iniciar mi proceso de adaptación
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── CONSEJOS ───────────────────────────────────────────── */}
            <section id="consejos" className={css.tipsSection}>
                <div className={css.container}>
                    <div className={css.sectionHeader}>
                        <span className={css.sectionTag}>Información para pacientes</span>
                        <h2>Consejos de Salud Respiratoria</h2>
                        <p>Guías prácticas para mejorar tu tratamiento y calidad de vida en casa.</p>
                    </div>
                    <div className={css.tipsGrid}>
                        {tips.map((t, i) => (
                            <div key={i} className={css.tipCard} style={{ '--tip-color': t.color }}>
                                <div className={css.tipIcon}>
                                    <t.icon size={22} />
                                </div>
                                <h3>{t.title}</h3>
                                <p>{t.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIOS ────────────────────────────────────────── */}

            {/* ── SANTI CTA ──────────────────────────────────────────── */}
            <section className={css.santiCta}>
                <div className={css.container}>
                    <div className={css.santiCard} onClick={() => openSanti(null)}>
                        <img
                            src="/artifacts/santi_real.jpg"
                            alt="Santi"
                            className={css.santiLarge}
                            onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Santi&background=1e40af&color=fff&size=180'; }}
                        />
                        <div className={css.santiText}>
                            <h3>¿No sabés por dónde empezar?</h3>
                            <p>Contame tus dudas y te ayudo a encontrar el tratamiento ideal para vos en menos de un minuto. Sin turnos, sin esperas.</p>
                            <button className={css.santiBtn}>
                                ¡Quiero asesorarme ahora!
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CÓMO TRABAJAMOS (proceso post-contacto) ────────────── */}
            <section style={{ padding: '3rem 1rem', background: '#fff' }}>
                <div className={css.container}>
                    <h2 style={{ textAlign: 'center', color: '#0f172a', fontSize: 'clamp(1.3rem, 3vw, 1.7rem)', margin: '0 0 0.5rem' }}>Cómo trabajamos</h2>
                    <p style={{ textAlign: 'center', color: '#475569', margin: '0 0 1.75rem', fontSize: '0.95rem' }}>Del primer mensaje al seguimiento: así es comprar o alquilar con INSER SALUD.</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', maxWidth: 1050, margin: '0 auto' }}>
                        {[
                            ['1', 'Nos contactás', 'Por WhatsApp, teléfono, formulario o con Santi. Respondemos en minutos, todos los días.'],
                            ['2', 'Te asesoramos', 'Elegimos juntos el equipo correcto según tu prescripción médica y tu presupuesto.'],
                            ['3', 'Entregamos e instalamos', 'En Córdoba, a domicilio en 24 hs con instalación. Al resto del país, envío con puesta en marcha guiada.'],
                            ['4', 'Te acompañamos', 'Adaptación, soporte técnico continuo, repuestos, y factura con presupuesto formal para el reintegro de tu obra social.'],
                        ].map(([n, t, d]) => (
                            <div key={n} style={{ background: '#f8fafc', border: '1px solid #e8eef6', borderRadius: '1rem', padding: '1.25rem' }}>
                                <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#1e40af,#3b82f6)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '0.6rem' }}>{n}</div>
                                <strong style={{ display: 'block', color: '#0f172a', marginBottom: '0.3rem' }}>{t}</strong>
                                <span style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.55 }}>{d}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── OBRA SOCIAL / REINTEGRO ────────────────────────────── */}
            <section id="obra-social" style={{ background: '#eff6ff', borderTop: '1px solid #dbeafe', borderBottom: '1px solid #dbeafe', padding: '3rem 1rem' }}>
                <div className={css.container}>
                    <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ color: '#0f172a', fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', margin: '0 0 0.75rem' }}>
                            ¿Tenés obra social o prepaga? Te ayudamos con el reintegro
                        </h2>
                        <p style={{ color: '#334155', fontSize: '1.02rem', lineHeight: 1.65, margin: '0 0 1.25rem' }}>
                            Trabajamos de forma particular: comprás o alquilás con nosotros y te entregamos el
                            <strong> presupuesto formal</strong> y la <strong>factura oficial</strong> para que gestiones
                            el reembolso ante tu obra social o prepaga. Muchas coberturas reintegran total o parcialmente
                            los equipos con pedido médico. Te orientamos sobre qué documentación conviene presentar.
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#fff', border: '1px solid #bfdbfe', borderRadius: '999px', padding: '0.45rem 0.95rem', color: '#1e40af', fontWeight: 600, fontSize: '0.9rem' }}>
                                <CheckCircle size={15} /> Presupuesto formal para presentar
                            </span>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#fff', border: '1px solid #bfdbfe', borderRadius: '999px', padding: '0.45rem 0.95rem', color: '#1e40af', fontWeight: 600, fontSize: '0.9rem' }}>
                                <CheckCircle size={15} /> Factura oficial para el reintegro
                            </span>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#fff', border: '1px solid #bfdbfe', borderRadius: '999px', padding: '0.45rem 0.95rem', color: '#1e40af', fontWeight: 600, fontSize: '0.9rem' }}>
                                <CheckCircle size={15} /> Te orientamos con la documentación
                            </span>
                        </div>
                        <a
                            href={`https://wa.me/5493512065320?text=${encodeURIComponent('Hola, quiero saber cómo gestionar el reintegro con mi obra social por un equipo.')}`}
                            target="_blank" rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#25d366', color: '#fff', textDecoration: 'none', fontWeight: 700, padding: '0.85rem 1.4rem', borderRadius: '0.7rem', fontSize: '1rem' }}
                        >
                            <MessageCircle size={18} /> Consultar por mi obra social
                        </a>
                    </div>
                </div>
            </section>

            {/* ── CONTACTO ───────────────────────────────────────────── */}
            <section id="contacto" className={css.contactSection}>
                <div className={css.container}>
                    <div className={css.sectionHeader}>
                        <span className={css.sectionTag}>Estamos para vos</span>
                        <h2>Contacto Directo</h2>
                        <p>Respondemos todos los días. Para emergencias de equipos, tenemos atención prioritaria.</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                        <LeadForm contexto="Home" />
                    </div>
                    <div className={css.contactGrid}>
                        <a href={'https://wa.me/5493512065320?text=Hola%2C%20vengo%20del%20sitio%20de%20INSER%20SALUD%20y%20quiero%20hacer%20una%20consulta.'} target="_blank" rel="noopener noreferrer" className={css.contactCardWa}>
                            <MessageCircle size={32} />
                            <div>
                                <strong>WhatsApp Ventas</strong>
                                <span>+54 9 351 206-5320</span>
                                <small>Respondemos en minutos</small>
                            </div>
                        </a>
                        <a href="https://wa.me/5493515575258" target="_blank" rel="noopener noreferrer" className={css.contactCardWa2}>
                            <Phone size={32} />
                            <div>
                                <strong>Línea Alternativa</strong>
                                <span>+54 9 351 557-5258</span>
                                <small>Soporte técnico</small>
                            </div>
                        </a>
                        <a href="mailto:inser.salud@gmail.com" className={css.contactCard}>
                            <Mail size={32} />
                            <div>
                                <strong>Email</strong>
                                <span>inser.salud@gmail.com</span>
                                <small>Consultas generales</small>
                            </div>
                        </a>
                        <div className={css.contactCard}>
                            <MapPin size={32} />
                            <div>
                                <strong>Ubicación</strong>
                                <span>Córdoba, Argentina</span>
                                <small>Entrega en todo Córdoba</small>
                            </div>
                        </div>
                    </div>

                    <div className={css.portalCta}>
                        <p>¿Necesitás asesoramiento personalizado? Santi te responde al instante.</p>
                        <button className={css.portalBtn} onClick={() => openSanti('Hola Santi, necesito asesoramiento sobre equipos respiratorios. ¿Podés ayudarme?')}>
                            Hablar con Santi ahora →
                        </button>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ─────────────────────────────────────────────── */}
            <footer className={css.footer}>
                <div className={css.footerInner}>
                    <div className={css.footerBrand}>
                        <img src="/artifacts/logo_insersalud.jpg" alt="Inser Salud" className={css.footerLogo} loading="lazy" decoding="async"
                            onError={(e) => { e.target.style.display = 'none'; }} />
                        <p>Especialistas en terapias respiratorias domiciliarias. Córdoba, Argentina.</p>
                    </div>
                    <div className={css.footerLinks}>
                        <strong>Navegación</strong>
                        <button onClick={() => scrollTo('patologias')}>Patologías</button>
                        <button onClick={() => scrollTo('ofertas')}>Ofertas</button>
                        <button onClick={() => scrollTo('tienda')}>Tienda</button>
                        <button onClick={() => scrollTo('servicios')}>Servicios</button>
                        <button onClick={() => scrollTo('consejos')}>Consejos</button>
                        <button onClick={() => scrollTo('contacto')}>Contacto</button>
                    </div>
                    {/* Enlaces internos reales (<a href>) para crawlers: guias/landing y patologias */}
                    <div className={css.footerContact}>
                        <strong>Comprar y alquilar</strong>
                        {localPages.map((p) => (
                            <Link key={p.slug} to={`/${p.slug}`}>{p.h1}</Link>
                        ))}
                    </div>
                    <div className={css.footerContact}>
                        <strong>Patologías</strong>
                        <Link to="/patologia/apnea-del-sueno">Apnea del sueño</Link>
                        <Link to="/patologia/epoc">EPOC</Link>
                        <Link to="/patologia/fibrosis-pulmonar">Fibrosis pulmonar</Link>
                        <Link to="/patologia/esclerosis-lateral-amiotrofica">ELA</Link>
                        <Link to="/patologia/atrofia-muscular-espinal">Atrofia Muscular Espinal</Link>
                        <Link to="/patologia/paralisis-cerebral">Parálisis cerebral</Link>
                    </div>
                    <div className={css.footerContact}>
                        <strong>Contacto</strong>
                        <a href="https://wa.me/5493512065320" target="_blank" rel="noopener noreferrer">WhatsApp: +54 9 351 206-5320</a>
                        <a href="mailto:inser.salud@gmail.com">inser.salud@gmail.com</a>
                        <a href="https://g.page/r/CZW6Qq0aHAUAEBM/review" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.35rem', fontWeight: 600 }}>
                            <Star size={16} /> Dejanos tu reseña en Google
                        </a>
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                            <a href="https://www.instagram.com/inser.salud" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Inser Salud" title="Instagram"><Instagram size={20} /></a>
                            <a href="https://www.facebook.com/insersalud" target="_blank" rel="noopener noreferrer" aria-label="Facebook de Inser Salud" title="Facebook"><Facebook size={20} /></a>
                        </div>
                    </div>
                </div>
                <div className={css.footerBottom}>
                    <p>&copy; 2026 Inser Salud · Aparatología aprobada por ANMAT · Córdoba, Argentina</p>
                </div>
            </footer>

            {/* ── SPECS MODAL ────────────────────────────────────────── */}
            {specsProduct && (
                <SpecsModal product={specsProduct} onClose={() => setSpecsProduct(null)} />
            )}

            {/* ── TEST DE EPWORTH ─────────────────────────────────────── */}
            {showEpworth && (
                <div className={css.specsOverlay} onClick={closeEpworth}>
                    <div className={css.epworthModal} onClick={e => e.stopPropagation()}>
                        <button className={css.specsClose} onClick={closeEpworth} aria-label="Cerrar"><X size={22} /></button>

                        <div className={css.epworthHeader}>
                            <span className={css.epworthBadge}>🧪 Test validado clínicamente</span>
                            <h2>Escala de Somnolencia de Epworth</h2>
                            <p>¿Con qué probabilidad te quedarías dormido en las siguientes situaciones? Respondé con honestidad. No diagnostica, pero orienta.</p>
                        </div>

                        {!epworthResult ? (
                            <>
                                <div className={css.epworthQuestions}>
                                    {EPWORTH_QUESTIONS.map((q, qi) => (
                                        <div key={qi} className={css.epworthQuestion}>
                                            <p><strong>{qi + 1}.</strong> {q}</p>
                                            <div className={css.epworthOptions}>
                                                {[
                                                    { v: 0, label: 'Nunca' },
                                                    { v: 1, label: 'Poca' },
                                                    { v: 2, label: 'Moderada' },
                                                    { v: 3, label: 'Alta' },
                                                ].map(({ v, label }) => (
                                                    <button
                                                        key={v}
                                                        className={`${css.epworthOption} ${epworthAnswers[qi] === v ? css.epworthOptionSelected : ''}`}
                                                        onClick={() => {
                                                            const next = [...epworthAnswers];
                                                            next[qi] = v;
                                                            setEpworthAnswers(next);
                                                        }}
                                                    >
                                                        {label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={css.epworthFooter}>
                                    <span className={css.epworthProgress}>
                                        {epworthAnswers.filter(a => a !== -1).length} / 8 respondidas
                                    </span>
                                    <button
                                        className={css.epworthSubmit}
                                        disabled={epworthAnswers.some(a => a === -1)}
                                        onClick={computeEpworth}
                                    >
                                        Ver mi resultado →
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className={css.epworthResult} style={{ '--result-color': epworthResult.level.color, '--result-bg': epworthResult.level.bg }}>
                                <div className={css.epworthScore}>
                                    <span className={css.epworthScoreNum}>{epworthResult.total}</span>
                                    <span className={css.epworthScoreMax}>/24</span>
                                </div>
                                <div className={css.epworthLevelIcon}>{epworthResult.level.icon}</div>
                                <h3 className={css.epworthLevelLabel}>{epworthResult.level.label}</h3>
                                <p className={css.epworthLevelMsg}>{epworthResult.level.msg}</p>
                                <p className={css.epworthDisclaimer}>⚠️ Este test es orientativo. Solo un médico puede diagnosticar la apnea del sueño.</p>
                                <div className={css.epworthResultBtns}>
                                    <a
                                        href={`https://wa.me/5493512065320?text=${encodeURIComponent(`Hola, hice el test de Epworth y obtuve ${epworthResult.total}/24 (${epworthResult.level.label}). ¿Me pueden asesorar?`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={css.epworthBtnWa}
                                    >
                                        📲 Consultar mi resultado por WhatsApp
                                    </a>
                                    <button className={css.epworthBtnRetry} onClick={() => { setEpworthAnswers(Array(8).fill(-1)); setEpworthResult(null); }}>
                                        Repetir test
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
};

export default LandingPage;
