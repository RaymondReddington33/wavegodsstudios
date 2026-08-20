#!/usr/bin/env python3
"""Genera assets/img desde src/img-src.  ·  Generates assets/img from src/img-src.
   Uso / usage:  python3 src/images.py        (necesita / needs Pillow)

   Cada trabajo define un recorte con punto de interes (focus 0..1) para que
   ninguna foto quede mal encajada.
   Each job defines a crop with a focus point (0..1) so no photo ends up badly framed.
"""
from PIL import Image, ImageFilter
import os, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC, OUT = ROOT / 'src' / 'img-src', ROOT / 'assets' / 'img'
OUT.mkdir(parents=True, exist_ok=True)

#      archivo origen                                salida     ratio   focus  anchos
JOBS = [
    ('hero-studio.png',                              'hero',    1672/941, 0.50, [3344, 1672, 1150, 780]),
    ('photo1718642136-768x1024.jpeg',                'booth',   3/4,    0.50, [480]),
    ('photo1718642288-768x1024.jpeg',                'desk',    3/4,    0.50, [480]),
    ('photo1718895667-768x1024.jpeg',                'live',    3/4,    0.50, [480]),
    ('photo1718641762-821x1024.jpeg',                'amp',     1/1,    0.34, [480]),
    ('a88ce23d-9594-4c8e-a3af-9e4a417b1b77.jpg',     'prod',    3/4,    0.30, [480]),
    ('studio-microphone-closeup-.jpg',               'master',  3/4,    0.44, [480]),
    ]


def upscale(im, w):
    """Ampliacion en dos pasos con realce: mucho mas nitida que dejar que
       la haga el navegador. Solo para la foto del hero a pantalla completa."""
    f = w / im.width
    a = im.resize((int(im.width * f ** 0.5), int(im.height * f ** 0.5)), Image.LANCZOS)
    a = a.filter(ImageFilter.UnsharpMask(radius=1.1, percent=55, threshold=3))
    b = a.resize((w, int(round(im.height * f))), Image.LANCZOS)
    return b.filter(ImageFilter.UnsharpMask(radius=1.6, percent=70, threshold=2))


def crop(im, ratio, focus):
    """Recorta al ratio pedido manteniendo el punto de interes vertical/horizontal."""
    w, h = im.size
    if w / h > ratio:                       # sobra ancho -> recorta a los lados
        nw = int(round(h * ratio))
        left = int((w - nw) * focus)
        return im.crop((left, 0, left + nw, h))
    nh = int(round(w / ratio))              # sobra alto -> recorta arriba/abajo
    top = int((h - nh) * focus)
    return im.crop((0, top, w, top + nh))


def main():
    for src, name, ratio, focus, widths in JOBS:
        p = SRC / src
        if not p.exists():
            print('  ! falta / missing:', src)
            continue
        im = crop(Image.open(p).convert('RGB'), ratio, focus)
        for w in widths:
            if w > im.width * 2.2:          # mas alla de 2x no compensa
                print(f'  · {name}-{w}: origen demasiado pequeño ({im.width}px), se omite')
                continue
            r = upscale(im, w) if w > im.width else im.resize((w, int(round(im.height * w / im.width))), Image.LANCZOS)
            dst = OUT / f'{name}-{w}.webp'
            r.save(dst, 'WEBP', quality=74 if w > im.width else 84, method=6)
            print(f'  ✓ {dst.name:20s} {r.width}×{r.height}  {os.path.getsize(dst)//1024} KB')


if __name__ == '__main__':
    main()
