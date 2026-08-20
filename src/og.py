#!/usr/bin/env python3
"""Genera las imagenes Open Graph (1200x630) para ES y EN.
   Builds the Open Graph share images.   ·   python3 src/og.py"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import math, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / 'src' / 'img-src' / 'hero-studio.png'
OUT = ROOT / 'assets' / 'img'
RED = (255, 49, 49)
W, H = 1200, 630
BLACK = '/System/Library/Fonts/Supplemental/Arial Black.ttf'
NARROW = '/System/Library/Fonts/Supplemental/Arial Narrow Bold.ttf'


def star(d, cx, cy, r, fill):
    pts = []
    for i in range(10):
        a = -math.pi / 2 + i * math.pi / 5
        rr = r if i % 2 == 0 else r * 0.45
        pts.append((cx + rr * math.cos(a), cy + rr * math.sin(a)))
    d.polygon(pts, fill=fill)


def build(l1, l2, sub, meta, out):
    base = Image.open(SRC).convert('RGB')
    r = max(W / base.width, H / base.height)
    base = base.resize((int(base.width * r), int(base.height * r)), Image.LANCZOS)
    x = int((base.width - W) * 0.5)
    y = int((base.height - H) * 0.5)
    im = base.crop((x, y, x + W, y + H))
    im = ImageEnhance.Color(im).enhance(1.12)
    im = ImageEnhance.Brightness(im).enhance(1.02)

    # velo oscuro por la izquierda para que se lea el texto
    # mascara: 255 = foto a la vista (derecha) · 55 = casi negro (izquierda, bajo el texto)
    grad = Image.new('L', (W, H))
    gd = ImageDraw.Draw(grad)
    for px in range(W):
        t = min(1.0, max(0.0, (px / W - 0.04) * 2.1))
        gd.line([(px, 0), (px, H)], fill=int(55 + 200 * t))
    grad = grad.filter(ImageFilter.GaussianBlur(45))
    im = Image.composite(im, Image.new('RGB', (W, H), (8, 8, 10)), grad)

    d = ImageDraw.Draw(im)
    d.rectangle([0, H - 9, W, H], fill=RED)

    bx, by = 76, 72
    for h in [16, 30, 46, 32, 52, 28, 42, 20, 14]:
        d.rounded_rectangle([bx, by + (52 - h) / 2, bx + 7, by + (52 + h) / 2], radius=3.5, fill=RED)
        bx += 13
    d.text((bx + 14, by + 8), 'WAVE GODS STUDIO', font=ImageFont.truetype(BLACK, 26), fill=(244, 241, 234))

    f1 = ImageFont.truetype(BLACK, 88)
    d.text((76, 220), l1, font=f1, fill=(244, 241, 234))
    d.text((76, 318), l2, font=f1, fill=RED)
    d.text((78, 446), sub, font=ImageFont.truetype(NARROW, 30), fill=(206, 202, 194))
    f3 = ImageFont.truetype(NARROW, 26)
    d.text((78, 494), meta, font=f3, fill=(158, 154, 148))
    star(d, 78 + d.textlength(meta, font=f3) + 22, 507, 11, RED)

    im.save(OUT / out, 'JPEG', quality=88, optimize=True, progressive=True)
    print('  ✓', out)


if __name__ == '__main__':
    build('SUENA COMO', 'LO QUE ERES',
          'ESTUDIO DE GRABACIÓN, MEZCLA Y MASTERING · BARCELONA',
          'WAVEGODSSTUDIO.COM   ·   5.0 EN GOOGLE', 'og.jpg')
    build('SOUND LIKE', 'WHO YOU ARE',
          'RECORDING, MIXING & MASTERING STUDIO · BARCELONA',
          'WAVEGODSSTUDIO.COM   ·   RATED 5.0 ON GOOGLE', 'og-en.jpg')
