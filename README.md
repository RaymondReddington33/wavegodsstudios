# Wave Gods Studio — one-pager

One-pager estático, bilingüe (ES/EN), sin base de datos y sin dependencias.
Pensado para GitHub Pages y optimizado para SEO y conversión.

---

## 1. Cómo funciona

Todos los textos viven en **un solo archivo**: `src/content.mjs`.
Un script de Node lee ese archivo y genera las dos páginas HTML reales:

```
src/content.mjs  ──▶  node src/build.mjs  ──▶  index.html      (español)
src/parts.mjs                              └▶  en/index.html   (inglés)
                                           └▶  sitemap.xml, robots.txt, 404.html…
```

Las dos versiones son **HTML real y estático**, no traducciones por JavaScript.
Google indexa las dos por separado y las relaciona con `hreflang`. Eso es lo que
hace que la web posicione en español *y* en inglés.

### Detección de idioma

- Alguien entra en `wavegodsstudio.com` → si el navegador está en español
  (o catalán / gallego / euskera) se queda; si está en **cualquier otro idioma
  se le manda a `/en/`**.
- La elección manual (botón `ES / EN`) se guarda en `localStorage` y manda
  siempre sobre la detección automática.
- Se puede forzar con `?hl=es` o `?hl=en`.

---

## 2. Editar la web

### Cambiar textos, servicios, packs, FAQ o reseñas

1. Abre `src/content.mjs`.
2. Edita lo que quieras (está todo comentado y duplicado en `es` y `en`).
3. Ejecuta:

```bash
npm run build
```

### Cambiar teléfono, email, redes o dirección

Todo está arriba del todo de `src/content.mjs`, en el bloque `SITE`.
Se cambia en un sitio y se actualiza en toda la web: menú, footer, botones de
WhatsApp, datos estructurados de Google, etc.

### Cambiar fotos

1. Mete las fotos nuevas en `src/img-src/`.
2. Ajusta la lista `JOBS` en `src/images.py` (nombre de archivo → nombre de salida).
3. Ejecuta:

```bash
npm run images   # requiere Pillow:  pip3 install Pillow
```

La foto del hero es `src/img-src/hero-studio.png`: si la cambias por otra, ejecuta
`npm run images` y después `npm run og` para regenerar también las imágenes que se
ven al compartir el enlace en WhatsApp, Instagram o Google.

**Sobre la resolución del hero.** El archivo actual mide 1376×768 px. Como la foto
va a pantalla completa, en un portátil Retina el navegador tiene que estirarla, así
que `images.py` genera además una versión al doble (2752 px) con ampliación en dos
pasos y realce, que es bastante más nítida que dejar que la estire el navegador.
Aun así, **ninguna técnica inventa detalle que no esté en el original**: si tienes
ese archivo a mayor resolución, sustitúyelo en `src/img-src/hero-studio.png` y
ejecuta `npm run images` — el sistema aprovechará todos los píxeles que tenga.

Genera automáticamente WebP en varios tamaños dentro de `assets/img/`.

### Ver la web en local

```bash
npm run dev        # construye y sirve en http://localhost:4321
```

---

## 3. Publicar en GitHub Pages

```bash
git init
git add .
git commit -m "Wave Gods Studio one-pager"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

Después, en el repo → **Settings → Pages**:

- **Opción A (recomendada, más simple):** *Source: Deploy from a branch* → `main` / `/ (root)`.
  El HTML ya va generado y commiteado, así que funciona tal cual.
- **Opción B:** *Source: GitHub Actions*. El workflow `.github/workflows/deploy.yml`
  reconstruye la web en cada push (útil si editas `src/content.mjs` directamente
  desde la web de GitHub).

### Dominio propio

El archivo `CNAME` ya contiene `wavegodsstudio.com`. En tu proveedor de DNS:

| Tipo  | Nombre | Valor |
|-------|--------|-------|
| A     | @      | 185.199.108.153 |
| A     | @      | 185.199.109.153 |
| A     | @      | 185.199.110.153 |
| A     | @      | 185.199.111.153 |
| CNAME | www    | TU-USUARIO.github.io |

Y en Settings → Pages marca **Enforce HTTPS**.

> Si prefieres publicarlo en `usuario.github.io/repo` en vez de en un dominio propio,
> hay que cambiar las rutas absolutas `'/'` y `'/en/'` del script de redirección de
> idioma en `src/build.mjs` (función `page`) por `'/repo/'` y `'/repo/en/'`.

---

## 4. Qué lleva de SEO

- HTML estático real en los dos idiomas + `hreflang` (`es`, `en`, `x-default` → inglés).
- `canonical` por página, títulos y descripciones distintos por idioma.
- **Datos estructurados JSON-LD**: `LocalBusiness` + `ProfessionalService` con
  dirección, geolocalización, teléfono, servicios, redes sociales, **valoración
  agregada (5.0 · 17 reseñas)** y las reseñas reales de Google → esto es lo que
  saca las estrellas en los resultados de búsqueda. El texto marcado es
  exactamente el que se ve en la tarjeta del hero, como pide Google: los datos
  estructurados tienen que corresponderse con contenido visible.
- `FAQPage` con las 6 preguntas frecuentes → puede salir como desplegable en Google.
- Open Graph y Twitter Card con imagen propia para cada idioma
  (`assets/img/og.jpg` y `assets/img/og-en.jpg`).
- `sitemap.xml` con alternancia de idiomas y `robots.txt`.
- Rendimiento: 0 librerías, 5 tipografías auto-alojadas (sin llamadas a Google
  Fonts), imágenes WebP responsive recortadas con punto de interés, `preload` de
  la foto del hero, sprite SVG para iconos y logos, JS con `defer`.
  Primer render ≈ 196 KB en total.
- Accesibilidad: un solo `<h1>`, jerarquía de encabezados correcta, `alt` en todas
  las imágenes, foco visible, skip link y soporte de `prefers-reduced-motion`.
- **Nada se oculta al hacer scroll**: el texto está siempre visible y los bloques
  solo se asientan con un desplazamiento corto al entrar en pantalla. Así la
  página no «aparece por partes» ni deja huecos en blanco si algo va lento.

### Después de publicar (importante)

1. Da de alta la web en [Google Search Console](https://search.google.com/search-console)
   y envía `https://wavegodsstudio.com/sitemap.xml`.
2. Actualiza tu **perfil de Google Business** con el enlace a la web: las reseñas
   y la ficha local son lo que más mueve la aguja para "estudio de grabación Barcelona".
3. Cuando tengas la **dirección exacta**, añádela al bloque `SITE` (`src/content.mjs`) y al objeto `address`
   y en el JSON-LD: Google valora mucho el `streetAddress` completo en negocios locales.

---

## 5. Estructura y diseño

La página es **un solo scroll con 6 bloques**, cada uno con su propia identidad visual
para que no se parezcan entre ellos:

| # | Bloque | Tratamiento |
|---|--------|-------------|
| 1 | Hero | Foto de la sala de control a sangre, onda de audio animada en canvas, titular a dos voces (grotesca + Anton inclinada en rojo), **tarjeta de reseñas de Google** que va alternando opiniones reales y **banda de logos de plataformas** al pie |
| 2 | Medios | Tres bloques con lenguaje propio: **Instagram** en tarjetas verticales con relieve e inclinación 3D, **Spotify** con el reproductor oficial en modo playlist, y **YouTube** con vídeo destacado y lista de los siguientes |
| 3 | Punk | Franja roja a sangre, Anton gigante con la segunda línea en contorno y rotada, y la parrilla de **logos de equipo** en negro sobre rojo |
| 4 | Servicios | Filas editoriales numeradas (no tarjetas). En escritorio, al pasar el ratón aparece una foto que sigue el cursor |
| 5 | Estudio | Montada como **sala de museo**: número de sala en contorno de fondo, ficha técnica y una **línea de colgado horizontal** —todas las obras a la misma altura, con anchos distintos según su formato— cada una con su **cartela** (número, título, técnica y cuenta de origen). Se recorre arrastrando. Cierra un panel de sala a tres columnas |
| 6 | Contacto | Formulario que abre WhatsApp + FAQ desplegable al lado, con halo rojo de fondo |

### Tipografías (todas auto-alojadas, 0 llamadas externas)

| Familia | Uso |
|---------|-----|
| **Bricolage Grotesque** | Titulares y nombres de sección |
| **Anton** | Bloque punk y segunda línea del titular del hero (inclinada, en mayúsculas) |
| **Archivo** | Texto corrido e interfaz |
| **Space Mono** | Etiquetas, botones, cifras y detalles técnicos |

### Archivos

```
├── index.html              generado (ES)
├── en/index.html           generado (EN)
├── 404.html, sitemap.xml, robots.txt, CNAME, .nojekyll
├── assets/
│   ├── css/site.css        todo el diseño, escrito mobile-first
│   ├── js/site.js          scroll suave, reveals, previews, formulario
│   ├── fonts/              las 5 familias en woff2
│   └── img/                WebP responsive, favicons, OG por idioma
│       ├── gear/           logos de equipo en SVG vectorial
│       ├── reels/          portadas de Instagram (generadas)
│       ├── yt/             miniaturas de YouTube (generadas)
│       └── wall/           obras de la sala (generadas)
└── src/
    ├── content.mjs         ← TEXTOS Y DATOS (edita aquí)
    ├── parts.mjs           iconos, logos de plataformas y marca
    ├── build.mjs           generador de HTML
    ├── images.py           recortes con punto de interés
    ├── reels.py            descarga las portadas de Instagram
    ├── reels.json          pies de foto de las portadas (generado)
    ├── youtube.py          lee el canal de YouTube por RSS
    ├── youtube.json        vídeos del canal (generado)
    ├── gallery.py          descarga las obras de la sala
    ├── gallery.json        obras de la sala (generado)
    ├── trace_logos.py      vectoriza la tira de logos de equipo
    ├── og.py               genera las imágenes para compartir (Open Graph)
    └── img-src/            fotos originales y tira de logos
```

### Instagram, Spotify y YouTube

Los tres se alimentan de fuentes públicas, **sin API, sin token y sin login**.

| Bloque | De dónde sale | Cómo se refresca |
|--------|---------------|------------------|
| Instagram (últimas) | Embed público del perfil, leído con Chrome | `npm run reels` |
| Instagram (sala) | Posts concretos, por su código | `npm run gallery` |
| YouTube | Feed RSS público del canal | `npm run youtube` |
| Spotify | Reproductor oficial incrustado | solo, en tiempo real |

Para refrescar Instagram y YouTube de una vez y reconstruir el HTML:

```bash
npm run social
```

**Instagram** (`src/reels.py`) abre el embed del perfil, lee las portadas ya
renderizadas y las guarda recortadas en `assets/img/reels/` con los pies de foto
reales en `src/reels.json`. Necesita Chrome instalado; si lo tienes en otra ruta:
`CHROME="/ruta/a/chrome" npm run reels`.

**YouTube** (`src/youtube.py`) lee
`youtube.com/feeds/videos.xml?channel_id=UCNYPcOPQ0CXjz2OoKvQ_VAg`, ordena los
vídeos por fecha y descarga las miniaturas en `assets/img/yt/`. El vídeo solo se
carga cuando el visitante pulsa play, así que no pesa nada hasta entonces.

**Spotify** es el único que se actualiza solo: el reproductor oficial del artista
muestra siempre sus canciones más escuchadas. Se monta cuando el visitante llega a
esa altura de la página, no en la carga inicial.

> Instagram, Spotify y YouTube son contenido de terceros y pueden poner sus propias
> cookies cuando el visitante los carga.

### La sala de la sección «El estudio»

Las obras de la pared son publicaciones concretas de Instagram elegidas a mano.
Se descargan con:

```bash
npm run gallery
npm run build
```

Para cambiar qué se expone, edita la lista `POSTS` en `src/gallery.py` (basta el
código del post, sale de su URL) y los títulos de las cartelas en `WALL`, dentro
de `src/content.mjs`. Funciona con posts de **cualquier cuenta**: la cartela
acredita siempre la cuenta de origen, que es lo correcto cuando la publicación no
es vuestra.

### Los logos de equipo

Están en `assets/img/gear/` como SVG vectoriales, generados a partir de la tira de
logos (`src/img-src/gear-strip.png`) con `python3 src/trace_logos.py`. Al ser
vectores se ven nítidos a cualquier tamaño y en cualquier pantalla.

Para cambiar la lista o el tamaño óptico de cada uno, edita `GEAR` en
`src/content.mjs` (`h` es la altura en px con la que se dibuja cada logo).

### Añadir o quitar plataformas

1. Dibuja el logo en `PLAT` dentro de `src/parts.mjs` (SVG de 32×32, a todo color).
2. Añade `{ k: 'clave', n: 'Nombre' }` a `PLATFORMS` en `src/content.mjs`.
3. `npm run build`.

## 6. Nota sobre el email

En la web actual aparece `hello@wavegodstudio.com` (con una sola «s» en *wavegod*)
y en tu mockup aparecía `info@wavegodsstudio.com`. He usado el de la web actual.
Si el bueno es el otro, cámbialo en `SITE.email` dentro de `src/content.mjs` y
vuelve a ejecutar `npm run build`.
