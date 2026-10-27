#!/usr/bin/env python3
"""Crea la copia .webp (calidad 80) de cada JPG/PNG de public/artifacts y regenera
src/utils/webpDisponibles.js. Correr despues de agregar fotos nuevas:
    python3 scripts/generar-webp.py
Si una foto no gana al menos 5% en WebP, no se crea la copia (queda en JPG)."""
import glob, os
from PIL import Image

RAIZ = os.path.join(os.path.dirname(__file__), '..')
hechas = []
for f in sorted(glob.glob(os.path.join(RAIZ, 'public/artifacts/**/*'), recursive=True)):
    if not f.lower().endswith(('.jpg', '.jpeg', '.png')):
        continue
    w = os.path.splitext(f)[0] + '.webp'
    if not (os.path.exists(w) and os.path.getmtime(w) >= os.path.getmtime(f)):
        im = Image.open(f)
        im = im.convert('RGBA') if im.mode in ('P', 'LA', 'RGBA') else im.convert('RGB')
        im.save(w, 'WEBP', quality=80, method=6)
        if os.path.getsize(w) >= os.path.getsize(f) * 0.95:
            os.remove(w)
            continue
    if os.path.exists(w):
        hechas.append('/' + os.path.relpath(f, os.path.join(RAIZ, 'public')).replace(os.sep, '/'))

cuerpo = ',\n'.join(f"    '{p}'" for p in hechas)
with open(os.path.join(RAIZ, 'src/utils/webpDisponibles.js'), 'w', encoding='utf8') as out:
    out.write("// GENERADO: fotos de /public/artifacts que tienen copia .webp al lado (mismo nombre).\n"
              "// Se regenera con: python3 scripts/generar-webp.py\n"
              "// Una foto nueva que no figure aca se sigue mostrando en JPG: nunca se rompe.\n"
              f"export const WEBP_DISPONIBLES = new Set([\n{cuerpo},\n]);\n")
print(f'{len(hechas)} fotos con copia WebP')
