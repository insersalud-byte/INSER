// Tarjeta digital de INSER SALUD (guardar contacto, compartir, QR). Tomado del ebook de apnea.
(function(){
  const $ = (id) => document.getElementById(id);
  const inserGuardar = $('inserGuardar');
  if (inserGuardar) {
    inserGuardar.addEventListener('click', () => {
      const vcf = [
        'BEGIN:VCARD', 'VERSION:3.0', 'FN:Inser Salud', 'ORG:Inser Salud',
        'TITLE:Equipos Respiratorios — Venta y Alquiler',
        'TEL;TYPE=CELL:+5493512065320', 'EMAIL:inser.salud@gmail.com',
        'URL:https://insersalud.com',
        'NOTE:CPAP · BiPAP · Oxígeno · Máscaras · Accesorios. Instagram: @insersalud',
        'END:VCARD',
      ].join('\r\n');
      const blob = new Blob([vcf], { type: 'text/vcard' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'InserSalud.vcf';
      a.click();
      URL.revokeObjectURL(a.href);
    });
  }
  const inserCompartir = $('inserCompartir');
  if (inserCompartir) {
    inserCompartir.addEventListener('click', async () => {
      const datos = { title: 'Inser Salud — Equipos Respiratorios', text: 'CPAP · BiPAP · Oxígeno · Accesorios. Venta con envío a todo el país y alquiler en Córdoba.', url: 'https://insersalud.com/tarjeta' };
      if (navigator.share) { try { await navigator.share(datos); } catch (e) {} }
      else { try { await navigator.clipboard.writeText(datos.url); } catch (e) {} }
    });
  }
  const inserQrModal = $('inserQrModal');
  const inserQrAbrir = $('inserQrAbrir');
  if (inserQrModal && inserQrAbrir) {
    inserQrAbrir.addEventListener('click', () => inserQrModal.classList.add('ver'));
    inserQrModal.addEventListener('click', () => inserQrModal.classList.remove('ver'));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') inserQrModal.classList.remove('ver'); });
  }
})();
