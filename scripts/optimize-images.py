#!/usr/bin/env python3
"""
Optimiza los PNG exportados de Figma.

Figma exporta a resolución de origen: los retratos venían entre 1 y
8,5 MB cada uno y el conjunto pesaba unos 66 MB. Sin este paso el
sitio es correcto pero inusable en una conexión normal.

Qué hace, por cada imagen:
  1. la reescala al DOBLE del tamaño al que se pinta (suficiente
     para pantallas retina, nada más)
  2. escribe un .webp al lado, que es lo que sirve <picture>
  3. reescribe el .png ya reducido, y ADEMÁS lo cuantiza a 256
     colores

El paso 3 necesita explicación: PNG es un formato sin pérdida, así
que una foto reescalada seguía pesando megas — los respaldos sumaban
14 MB frente a 1 MB de los WebP. Cuantizar a paleta introduce algo
de banding en los degradados, pero ese archivo SOLO lo ve un
navegador sin soporte WebP (por debajo del 3% del tráfico), mientras
que el peso lo pagaba el despliegue entero.

Ejecutar después de get-assets.ps1, que restaura los originales:

    python scripts/optimize-images.py

Requiere Pillow:  pip install Pillow
"""

from pathlib import Path

from PIL import Image

IMG = Path(__file__).resolve().parent.parent / "public" / "img"

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

CALIDAD_WEBP = 84
COLORES_PNG = 256

# Proporción forzada, recortando desde el centro.
#
# Las cuatro fotos de Resources salen de Figma con alturas distintas
# (resource-1 venía 596 × 894 y el resto 596 × 397). Aunque el CSS
# las recorte con object-fit, dejar el original al doble de alto
# significa servir el doble de bytes para píxeles que nadie ve, y
# cualquier fallo de layout se nota al instante. Se recortan aquí,
# una vez, a la proporción de la tarjeta del archivo (298 × 210).
RECORTES = {
    "resource-": 298 / 210,
}


def recorte_objetivo(nombre: str) -> float | None:
    for clave, ratio in RECORTES.items():
        if nombre.startswith(clave):
            return ratio
    return None


def recortar_centrado(im: Image.Image, ratio: float) -> Image.Image:
    """Recorta al ratio pedido conservando el centro de la imagen."""
    actual = im.width / im.height
    if abs(actual - ratio) < 0.001:
        return im

    if actual > ratio:  # demasiado ancha: se recorta a los lados
        nuevo_ancho = round(im.height * ratio)
        margen = (im.width - nuevo_ancho) // 2
        return im.crop((margen, 0, margen + nuevo_ancho, im.height))

    nuevo_alto = round(im.width / ratio)  # demasiado alta: arriba y abajo
    margen = (im.height - nuevo_alto) // 2
    return im.crop((0, margen, im.width, margen + nuevo_alto))


def ancho_objetivo(nombre: str) -> int | None:
    for clave, ancho in ANCHOS.items():
        if nombre.startswith(clave):
            return ancho
    return None


def main() -> None:
    total_antes = total_despues = 0

    for png in sorted(IMG.glob("*.png")):
        objetivo = ancho_objetivo(png.stem)
        if objetivo is None:
            print(f"  --  {png.name}: sin regla, se deja igual")
            continue

        antes = png.stat().st_size
        total_antes += antes

        with Image.open(png) as im:
            im = im.convert("RGBA" if "A" in im.getbands() else "RGB")

            ratio = recorte_objetivo(png.stem)
            if ratio is not None:
                im = recortar_centrado(im, ratio)

            # Solo se reduce; ampliar una imagen no añade detalle.
            if im.width > objetivo:
                alto = round(im.height * objetivo / im.width)
                im = im.resize((objetivo, alto), Image.LANCZOS)

            im.save(png.with_suffix(".webp"), "WEBP", quality=CALIDAD_WEBP, method=6)

            # MEDIANCUT no acepta RGBA; FASTOCTREE sí y conserva el
            # canal alfa, que hace falta en los logos recortados.
            metodo = Image.FASTOCTREE if im.mode == "RGBA" else Image.MEDIANCUT
            im.quantize(colors=COLORES_PNG, method=metodo).save(png, "PNG", optimize=True)

        despues = png.stat().st_size + png.with_suffix(".webp").stat().st_size
        total_despues += despues
        print(f"  OK  {png.name}: {antes / 1024:8.0f} KB -> {despues / 1024:7.0f} KB (png+webp)")

    if total_antes:
        print(
            f"\n  Total: {total_antes / 1024 / 1024:.1f} MB -> "
            f"{total_despues / 1024 / 1024:.1f} MB "
            f"({100 - total_despues / total_antes * 100:.0f}% menos)"
        )


if __name__ == "__main__":
    main()
