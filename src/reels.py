#!/usr/bin/env python3
"""Descarga las portadas de las ultimas publicaciones de Instagram y las deja
   listas para las tarjetas del one-pager.

   Downloads the latest Instagram post covers for the card grid.

   Uso / usage:   npm run reels        (o / or: python3 src/reels.py)

   Como funciona: abre el embed publico del perfil en Chrome headless, lee las
   imagenes ya renderizadas y las guarda en assets/img/reels/. No usa API,
   ni token, ni login. Vuelve a ejecutarlo cuando publiques algo nuevo.
"""
from PIL import Image
import html as htmlmod
import io
import json
import os
import pathlib
import re
import subprocess
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'assets' / 'img' / 'reels'
HANDLE = 'wavegodsstudio'
EMBED = f'https://www.instagram.com/{HANDLE}/embed/'
COUNT = 6
RATIO = 4 / 5
WIDTHS = [520, 320]
CHROME = os.environ.get('CHROME') or '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
UA = ('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36')


def render_dom():
    if not os.path.exists(CHROME):
        raise SystemExit(f'No encuentro Chrome en {CHROME}.\n'
                         'Indica la ruta con:  CHROME="/ruta/a/chrome" npm run reels')
    out = subprocess.run(
        [CHROME, '--headless', '--disable-gpu', '--virtual-time-budget=15000',
         '--window-size=1200,1200', '--dump-dom', EMBED],
        capture_output=True, text=True, timeout=120)
    return out.stdout


def posts_from(dom):
    """Devuelve [(caption, url_imagen)] saltando la foto de perfil."""
    found = []
    for m in re.finditer(r'<img[^>]*?alt="([^"]*)"[^>]*?src="(https://scontent[^"]+)"', dom):
        alt, src = htmlmod.unescape(m.group(1)), htmlmod.unescape(m.group(2))
        if 't51.2885-19' in src:            # foto de perfil
            continue
        found.append((' '.join(alt.split()), src))
    return found[:COUNT]


def crop(im, ratio):
    w, h = im.size
    if w / h > ratio:
        nw = int(round(h * ratio))
        return im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    nh = int(round(w / ratio))
    return im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))


def main():
    print('Leyendo el embed público de Instagram…')
    posts = posts_from(render_dom())
    if not posts:
        raise SystemExit('No he podido leer ninguna publicación. Instagram puede haber '
                         'cambiado el embed: revisa src/reels.py.')
    OUT.mkdir(parents=True, exist_ok=True)
    data = []
    for i, (caption, url) in enumerate(posts, start=1):
        req = urllib.request.Request(url, headers={'User-Agent': UA, 'Referer': 'https://www.instagram.com/'})
        raw = urllib.request.urlopen(req, timeout=45).read()
        im = crop(Image.open(io.BytesIO(raw)).convert('RGB'), RATIO)
        name = f'reel-{i}'
        for w in WIDTHS:
            r = im.resize((w, int(round(w / RATIO))), Image.LANCZOS)
            r.save(OUT / f'{name}-{w}.webp', 'WEBP', quality=82, method=6)
        data.append({'img': name, 'caption': caption})
        print(f'  ✓ {name}  {caption[:52]}…')

    (ROOT / 'src' / 'reels.json').write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'\n{len(data)} portadas en assets/img/reels/ y src/reels.json actualizado.')
    print('Ejecuta ahora:  npm run build')


if __name__ == '__main__':
    main()
