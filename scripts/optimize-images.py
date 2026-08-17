#!/usr/bin/env python3
"""
Optimiza los PNG exportados de Figma.

Figma exporta a resolución de origen: el conjunto llega pesando unos
80 MB. Sin este paso el sitio es correcto pero inusable en una
conexión normal.

Qué hace, por cada imagen:
  1. la recorta a la proporción de su hueco, si tiene una definida
  2. la reescala al DOBLE del tamaño al que se pinta (suficiente
     para pantallas retina, nada más)
  3. escribe un .webp de alta calidad, que es lo que sirve <picture>
  4. reescribe el .png ya reducido como respaldo, SIN pérdida

--------------------------------------------------------------------
IDEMPOTENTE — y esto no es un detalle
--------------------------------------------------------------------
JPEG y WebP son formatos con pérdida: recomprimir un archivo ya
comprimido no vuelve a partir del original, parte del resultado
anterior. Correr este script dos veces seguidas degrada las imágenes;
correrlo cuatro veces las destroza.

Por eso se guarda un registro en .optimized.json con el tamaño de
cada archivo ya procesado. Si el PNG del disco coincide con lo
registrado, se salta. Para rehacer el trabajo hay que volver a bajar
los originales con GET-ASSETS.bat, que es justo lo que borra el
registro al reescribir los archivos.

Ejecutar después de get-assets.ps1:

    python scripts/optimize-images.py

Requiere Pillow:  pip install Pillow
"""

import json
from pathlib import Path

from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
IMG = RAIZ / "public" / "img"
REGISTRO = IMG / ".optimized.json"

# Ancho de render × 2. La clave es el prefijo del nombre de archivo.
ANCHOS = {
    "hero-person": 1160,
    "journey-": 920,     # el slot expandido llega a 460
    "stats-media": 1844,
    "scale-media": 1140,
    "resource-": 596,
    "paths-photo": 1004,
    "press-": 600,
}

# Proporción forzada, recortando desde el centro.
#
# Las cuatro fotos de Resources salen de Figma con alturas distintas
# (resource-1 venía 596 × 894 y el resto 596 × 397). Se igualan aquí,
# una vez, a la proporción de la tarjeta del archivo (298 × 210).
RECORTES = {
    "resource-": 298 / 210,
}

# 92 sobre fotografía es visualmente indistinguible del original y
# sigue pesando una fracción del PNG. Bajar de 85 empieza a verse en
# los degradados de piel y cielo, que es exactamente lo que hay en
# estos retratos.
CALIDAD_WEBP = 92


def _buscar(tabla, nombre):
    for clave, valor in tabla.items():
        if nombre.startswith(clave):
            return valor
    return None


def recortar_centrado(im: Image.Image, ratio: float) -> Image.Image:
    """Recorta al ratio pedido conservando el centro de la imagen."""
    actual = im.width / im.height
    if abs(actual - ratio) < 0.005:
        return im

    if actual > ratio:  # demasiado ancha: se recorta a los lados
        ancho = round(im.height * ratio)
        margen = (im.width - ancho) // 2
        return im.crop((margen, 0, margen + ancho, im.height))

    alto = round(im.width / ratio)  # demasiado alta: arriba y abajo
    margen = (im.height - alto) // 2
    return im.crop((0, margen, im.width, margen + alto))


def main() -> None:
    hecho = {}
    if REGISTRO.exists():
        hecho = json.loads(REGISTRO.read_text(encoding="utf-8"))

    nuevo = {}
    total_antes = total_despues = 0
    saltados = 0

    for png in sorted(IMG.glob("*.png")):
        objetivo = _buscar(ANCHOS, png.stem)
        if objetivo is None:
            print(f"  --  {png.name}: sin regla, se deja igual")
            continue

        antes = png.stat().st_size
        webp = png.with_suffix(".webp")

        # Ya procesado y sin tocar desde entonces: no se vuelve a
        # comprimir. Esto es lo que evita la pérdida generacional.
        if hecho.get(png.name) == antes and webp.exists():
            nuevo[png.name] = antes
            saltados += 1
            continue

        with Image.open(png) as im:
            im = im.convert("RGBA" if "A" in im.getbands() else "RGB")

            ratio = _buscar(RECORTES, png.stem)
            if ratio is not None:
                im = recortar_centrado(im, ratio)

            # Solo se reduce; ampliar una imagen no añade detalle.
            if im.width > objetivo:
                alto = round(im.height * objetivo / im.width)
                im = im.resize((objetivo, alto), Image.LANCZOS)

            im.save(webp, "WEBP", quality=CALIDAD_WEBP, method=6)
            # PNG sin pérdida: es el respaldo para navegadores sin
            # WebP y no merece la pena degradarlo para ahorrar unos
            # megas que casi nadie descarga.
            im.save(png, "PNG", optimize=True)

        despues = png.stat().st_size + webp.stat().st_size
        total_antes += antes
        total_despues += despues
        nuevo[png.name] = png.stat().st_size
        print(f"  OK  {png.name}: {antes / 1024:8.0f} KB -> {despues / 1024:7.0f} KB (png+webp)")

    REGISTRO.write_text(json.dumps(nuevo, indent=2), encoding="utf-8")

    if saltados:
        print(f"\n  {saltados} ya optimizadas, sin tocar (evita perder calidad)")
    if total_antes:
        print(
            f"  Total procesado: {total_antes / 1024 / 1024:.1f} MB -> "
            f"{total_despues / 1024 / 1024:.1f} MB"
        )


if __name__ == "__main__":
    main()
