// Conversion U$S -> pesos al dolar del dia (src/data/dolar.json).
// Sin imports: lo usan el sitio (Vite), los scripts de build (Node) y la API.

const miles = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

// "1.400" -> 1400 · "89,50" / "89.50" -> 89.5 · "9.084" -> 9084
export function numeroUsd(txt) {
    const s = String(txt).trim();
    if (/^\d{1,3}(\.\d{3})+$/.test(s)) return Number(s.replace(/\./g, ''));
    return Number(s.replace(/\./g, (m, i) => (s.slice(i + 1).length === 3 ? '' : '.')).replace(',', '.'));
}

export function crearConversor(dolar) {
    const pesos = (usd) => '$' + miles(usd * dolar);
    // "U$S 153" -> "U$S 153 (≈ $248.625)". No toca lo que ya trae pesos al lado.
    const conPesos = (texto) => String(texto ?? '').replace(
        /U\$S\s?(\d+(?:\.\d{3})*(?:[.,]\d{1,2})?)(?![\d.,]\d|\d)(?!\s*(?:<[^>]*>\s*)?\(?≈)/g,
        (m, n) => `${m} (≈ ${pesos(numeroUsd(n))})`,
    );
    return { dolar, pesos, conPesos, dolarTxt: '$' + miles(dolar) };
}
