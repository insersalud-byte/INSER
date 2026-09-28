# Ejemplos clínicos junto a los esquemas · 28/09/2026

Pedido: conservar los esquemas y el atlas; agregar en los simuladores RX, TC y ecografía un ejemplo real por escenario, con signos seleccionables sobre la imagen y explicación.

Alcance: 24 escenarios (incluida normalidad). Imágenes con licencia reutilizable, originales intactos y superposición didáctica separada. Diferenciar signos visibles de signos generales no demostrables en una captura. No atribuir la misma lateralidad, extensión o etiología del esquema a un paciente diferente. En ecografía usar videos para signos dinámicos.

Implementación: banco clínico explícito por ID, panel bajo el esquema, lista de signos y marcas sincronizadas por mouse/teclado, ocultación de contenido que revela la respuesta en modo práctica. Reutilizar recursos existentes cuando sean adecuados. Sin dependencias nuevas ni despliegue.

Verificación: pruebas Node para cobertura, coordenadas, fuentes y estado de práctica; navegador para selección/reset, signos, videos y 320/768/1024/1440 px. Actualizar copia portable de Documentos tras comprobar los cambios. La validación clínica independiente sigue pendiente.

## Entregado

- 24 ejemplos: 8 RX, 9 TC/angio-TC y 7 ecografías. Se conservan los esquemas y el atlas previo.
- Ocho archivos nuevos con autores/licencias en `clinical-media.json`. Se reutilizan estudios existentes cuando corresponden; 56 imágenes + 7 videos + 7 posters en total.
- Marcas numéricas y lista sincronizada, texto por signo, ampliación modal con cierre Escape y ocultación de superposiciones. Los fotogramas se anotan; los videos no reciben marcas fijas que simulen seguimiento anatómico.
- Atelectasia RX: opacidad, volumen y posición traqueal; los signos no resolubles se explican sin inventar su ubicación. Advertencia sobre rotación y sobre diferencias respecto del esquema.
- La ecografía tabicada es un caso pospleurodesis con talco, no una imagen etiquetada como empiema. Las composiciones conservan todos sus paneles y especifican cuál se interpreta.
- Práctica: el panel desaparece hasta comprobar la respuesta. Los datos no se envían a un servidor.

## Comprobaciones

33 pruebas Node correctas. Comprobación en Chromium de selección en RX/TC/ecografía, sincronización de marcas, ampliación/cierre y ocultación/reaparición en práctica. Anchos 320, 768, 1024 y 1440 sin desbordamiento horizontal. Los nuevos recursos TC y ecografía cargan con sus dimensiones originales. Una colisión de clase con los controles del atlas se reprodujo y corrigió; se agregó prueba de regresión. La evaluación visual anterior conserva sus 12 ejercicios.

Copia portable: scripts normalizados a rutas relativas; seis archivos contrastados con el sitio y ocho imágenes verificadas por SHA-256. No se realizó despliegue. Estas son verificaciones de contenido técnico y funcionamiento, no validación clínica independiente de las anotaciones.
