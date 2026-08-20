#!/usr/bin/env python3
"""Convierte la tira de logos de equipo (src/img-src/gear-strip.png) en SVG vectoriales.
   Traces the gear-logo strip into clean vector SVGs.   ·   python3 src/trace_logos.py"""
from PIL import Image
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'assets' / 'img' / 'gear'
OUT.mkdir(parents=True, exist_ok=True)

BAND = (45, 108)                      # franja vertical donde estan los logos
GROUPS = [(38, 107), (175, 256), (316, 408), (454, 543), (607, 714), (776, 858)]
NAMES = ['universal-audio', 'avid', 'rme', 'akg', 'shure', 'warm-audio']
UP = 8                                # supermuestreo antes de trazar
EPS = 1.4                             # tolerancia de simplificacion (px supermuestreados)

SEGS = {
    0: [], 15: [],
    1: [('L', 'B')], 2: [('B', 'R')], 3: [('L', 'R')], 4: [('R', 'T')],
    5: [('L', 'T'), ('B', 'R')], 6: [('B', 'T')], 7: [('L', 'T')],
    8: [('T', 'L')], 9: [('T', 'B')], 10: [('T', 'R'), ('B', 'L')],
    11: [('T', 'R')], 12: [('R', 'L')], 13: [('R', 'B')], 14: [('B', 'L')],
}


def contours(grid, w, h):
    """Marching squares -> lista de bucles cerrados."""
    segs = {}
    for y in range(h - 1):
        for x in range(w - 1):
            idx = grid[y][x] * 8 + grid[y][x + 1] * 4 + grid[y + 1][x + 1] * 2 + grid[y + 1][x]
            if idx in (0, 15):
                continue
            pt = {'T': (2 * x + 1, 2 * y), 'R': (2 * x + 2, 2 * y + 1),
                  'B': (2 * x + 1, 2 * y + 2), 'L': (2 * x, 2 * y + 1)}
            for a, b in SEGS[idx]:
                segs.setdefault(pt[a], []).append(pt[b])

    loops = []
    while segs:
        start = next(iter(segs))
        loop = [start]
        cur = start
        while True:
            nxts = segs.get(cur)
            if not nxts:
                break
            nxt = nxts.pop()
            if not nxts:
                del segs[cur]
            loop.append(nxt)
            cur = nxt
            if cur == start:
                break
        if len(loop) > 6:
            loops.append(loop)
    return loops


def dp(pts, eps):
    """Douglas-Peucker."""
    if len(pts) < 3:
        return pts
    keep = [False] * len(pts)
    keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        i, j = stack.pop()
        if j <= i + 1:
            continue
        x1, y1 = pts[i]; x2, y2 = pts[j]
        dx, dy = x2 - x1, y2 - y1
        den = (dx * dx + dy * dy) ** 0.5 or 1e-9
        best, bi = -1, i
        for k in range(i + 1, j):
            x0, y0 = pts[k]
            d = abs(dy * x0 - dx * y0 + x2 * y1 - y2 * x1) / den
            if d > best:
                best, bi = d, k
        if best > eps:
            keep[bi] = True
            stack.append((i, bi)); stack.append((bi, j))
    return [p for p, k in zip(pts, keep) if k]


def dp_closed(loop, eps):
    """DP sobre un bucle cerrado: se parte por el punto mas lejano al primero."""
    pts = loop[:-1] if loop[0] == loop[-1] else loop[:]
    if len(pts) < 4:
        return pts
    x0, y0 = pts[0]
    far = max(range(len(pts)), key=lambda k: (pts[k][0] - x0) ** 2 + (pts[k][1] - y0) ** 2)
    a = dp(pts[:far + 1], eps)
    b = dp(pts[far:] + [pts[0]], eps)
    return a[:-1] + b[:-1]


def trace(crop, name):
    big = crop.resize((crop.width * UP, crop.height * UP), Image.LANCZOS)
    px = big.load()
    w, h = big.width + 2, big.height + 2
    grid = [[0] * w for _ in range(h)]
    for y in range(big.height):
        for x in range(big.width):
            if px[x, y] < 150:
                grid[y + 1][x + 1] = 1

    paths = []
    for loop in contours(grid, w, h):
        pts = dp_closed(loop, EPS * 2)   # coords estan x2 por marching squares
        if len(pts) < 4:
            continue
        d = 'M' + ' L'.join(f'{(x / 2 - 1) / UP:.2f},{(y / 2 - 1) / UP:.2f}' for x, y in pts) + 'Z'
        paths.append(d)

    vw, vh = crop.width, crop.height
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vw} {vh}" '
           f'fill="#0F0F13" fill-rule="evenodd" role="img">'
           f'<path d="{"".join(paths)}"/></svg>')
    (OUT / f'{name}.svg').write_text(svg)
    return len(paths), len(svg), vw, vh


def main():
    im = Image.open(ROOT / 'src' / 'img-src' / 'gear-strip.png').convert('RGBA')
    im = Image.alpha_composite(Image.new('RGBA', im.size, (255, 255, 255, 255)), im).convert('L')
    for (x0, x1), name in zip(GROUPS, NAMES):
        crop = im.crop((x0 - 1, BAND[0], x1 + 1, BAND[1]))
        # recorta filas vacias arriba/abajo
        p = crop.load()
        rows = [y for y in range(crop.height) if any(p[x, y] < 160 for x in range(crop.width))]
        crop = crop.crop((0, rows[0], crop.width, rows[-1] + 1))
        n, size, vw, vh = trace(crop, name)
        print(f'  ✓ {name:16s} {vw}×{vh}  {n} contornos  {size // 1024 or 1} KB')


if __name__ == '__main__':
    main()
