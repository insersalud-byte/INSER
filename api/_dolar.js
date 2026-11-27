// Dolar del dia para el prompt de Santi. Sale de src/data/dolar.json (lo actualiza la tarea diaria).
// El prompt trae [[DOLAR]] donde va la cotizacion; los pesos aproximados se recalculan aca.
const { bnaVenta } = require('../src/data/dolar.json');

const miles = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
function numeroUsd(txt) {
    const s = String(txt).trim();
    if (/^\d{1,3}(\.\d{3})+$/.test(s)) return Number(s.replace(/\./g, ''));
    return Number(s.replace(',', '.'));
}
const pesos = (usd) => miles(numeroUsd(usd) * bnaVenta);

function aplicarDolar(prompt) {
    return prompt
        .replace(/(U\$S ([\d.,]+) \| ~\$)[\d.]+/g, (m, a, n) => a + pesos(n))
        .replace(/(U\$S ([\d.,]+) \((?:aprox\. |~)\$)[\d.]+/g, (m, a, n) => a + pesos(n))
        .replace(/(U\$S ([\d.,]+) × \$\[\[DOLAR\]\] = \$)[\d.]+/g, (m, a, n) => a + pesos(n))
        .replace(/\[\[DOLAR\]\]/g, miles(bnaVenta));
}

module.exports = { aplicarDolar, DOLAR: bnaVenta };
