#!/usr/bin/env python3
"""Lee el canal de YouTube por su RSS publico y descarga las miniaturas.
   Reads the public YouTube RSS feed and downloads the thumbnails.

   Uso / usage:   npm run youtube      (o / or: python3 src/youtube.py)

   No usa API ni clave: el feed RSS de YouTube es publico. Vuelve a
   ejecutarlo cuando subas un video nuevo y luego `npm run build`.
"""
from PIL import Image
import html as htmlmod
import io
import json
import pathlib
import re
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'assets' / 'img' / 'yt'
CHANNEL = 'UCNYPcOPQ0CXjz2OoKvQ_VAg'          # @WaveGodsStudio
FEED = f'https://www.youtube.com/feeds/videos.xml?channel_id={CHANNEL}'
COUNT = 4
WIDTHS = [960, 560, 320]
UA = ('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36')


def get(url):
    return urllib.request.urlopen(
        urllib.request.Request(url, headers={'User-Agent': UA}), timeout=45).read()


def thumb(vid):
    """maxres es 1280x720; si no existe se cae a sd y luego a hq."""
    for name in ('maxresdefault', 'sddefault', 'hqdefault'):
        try:
            raw = get(f'https://i.ytimg.com/vi/{vid}/{name}.jpg')
            im = Image.open(io.BytesIO(raw)).convert('RGB')
            if im.width >= 480:
                return im
        except Exception:
            continue
    return None


def crop169(im):
    w, h = im.size
    if abs(w / h - 16 / 9) < 0.02:
        return im
    nh = int(round(w * 9 / 16))                # hq/sd vienen en 4:3 con bandas
    top = (h - nh) // 2
    return im.crop((0, top, w, top + nh))


def main():
    xml = get(FEED).decode('utf-8', 'ignore')
    ids = re.findall(r'<yt:videoId>([^<]+)</yt:videoId>', xml)
    titles = [htmlmod.unescape(x) for x in re.findall(r'<media:title>([^<]+)</media:title>', xml)]
    dates = re.findall(r'<published>([^<]+)</published>', xml)
    views = re.findall(r'<media:statistics views="(\d+)"', xml)
    if not ids:
        raise SystemExit('El feed no ha devuelto vídeos. Revisa CHANNEL en src/youtube.py.')

    # el feed no siempre viene ordenado: lo ordenamos por fecha, mas nuevo primero
    order = sorted(range(len(ids)), key=lambda k: dates[k] if k < len(dates) else '', reverse=True)
    ids = [ids[k] for k in order]
    titles = [titles[k] if k < len(titles) else '' for k in order]
    dates = [dates[k] if k < len(dates) else '' for k in order]
    views = [views[k] if k < len(views) else '' for k in order]

    OUT.mkdir(parents=True, exist_ok=True)
    data = []
    for i, vid in enumerate(ids[:COUNT]):
        im = thumb(vid)
        if im is None:
            print(f'  ! sin miniatura para {vid}, se omite')
            continue
        im = crop169(im)
        made = []
        for w in WIDTHS:
            if w > im.width:
                continue
            im.resize((w, int(round(w * im.height / im.width))), Image.LANCZOS) \
              .save(OUT / f'{vid}-{w}.webp', 'WEBP', quality=82, method=6)
            made.append(w)
        data.append({
            'id': vid,
            'title': titles[i] if i < len(titles) else '',
            'date': dates[i][:10] if i < len(dates) else '',
            'views': int(views[i]) if i < len(views) and views[i] else None,
            'sizes': made
        })
        print(f'  ✓ {vid}  {data[-1]["date"]}  {data[-1]["title"][:56]}')

    (ROOT / 'src' / 'youtube.json').write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'\n{len(data)} vídeos en assets/img/yt/ y src/youtube.json actualizado.')
    print('Ejecuta ahora:  npm run build')


if __name__ == '__main__':
    main()
