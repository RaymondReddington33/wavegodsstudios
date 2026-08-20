#!/usr/bin/env python3
"""Descarga las publicaciones de Instagram elegidas a mano para la galería
   de la sección «El estudio».
   Downloads the hand-picked Instagram posts used in the studio gallery.

   Uso / usage:   npm run gallery      (o / or: python3 src/gallery.py)

   Edita POSTS y vuelve a ejecutarlo para cambiar las obras de la sala.
"""
from PIL import Image
import io
import json
import pathlib
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'assets' / 'img' / 'wall'
UA = ('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36')

#        código           archivo        es vídeo   crédito (cuenta de origen)
POSTS = [
    ('DRegn0JjLmg', 'wall-1', True,  'wavegodsstudio'),
    ('C7YqjIso5Vg', 'wall-2', False, 'wavegodsstudio'),
    ('DLNfcq9NTBM', 'wall-3', False, 'arepaymatebcn'),
    ('C69DPx1o74w', 'wall-4', False, 'wavegodsstudio'),
    ('DJsN_xNsmOL', 'wall-5', False, 'thesocietyofcypher'),
    ('C584iL6Izk5', 'wall-6', False, 'wavegodsstudio'),
]
WIDTHS = [960, 620, 400]


def fetch(code):
    url = f'https://www.instagram.com/p/{code}/media/?size=l'
    raw = urllib.request.urlopen(
        urllib.request.Request(url, headers={'User-Agent': UA}), timeout=45).read()
    return Image.open(io.BytesIO(raw)).convert('RGB')


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    data = []
    for code, name, video, credit in POSTS:
        try:
            im = fetch(code)
        except Exception as e:
            print(f'  ! {code}: {e}')
            continue
        made = []
        for w in WIDTHS:
            if w > im.width:
                continue
            im.resize((w, int(round(w * im.height / im.width))), Image.LANCZOS) \
              .save(OUT / f'{name}-{w}.webp', 'WEBP', quality=84, method=6)
            made.append(w)
        data.append({
            'file': name, 'code': code, 'video': video, 'credit': credit,
            'w': im.width, 'h': im.height, 'sizes': made
        })
        print(f'  ✓ {name}  {im.width}×{im.height}  ratio {im.width / im.height:.2f}  @{credit}')

    (ROOT / 'src' / 'gallery.json').write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'\n{len(data)} piezas en assets/img/wall/ y src/gallery.json actualizado.')


if __name__ == '__main__':
    main()
