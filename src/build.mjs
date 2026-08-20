import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, PLATFORMS, GEAR, WALL, REVIEWS, LOCALES } from './content.mjs';

/* Portadas de Instagram generadas por src/reels.py (npm run reels) */
let REELS = [];
try {
  REELS = JSON.parse(fs.readFileSync(new URL('./reels.json', import.meta.url), 'utf8'));
} catch { /* sin portadas todavia: la seccion muestra el enlace al perfil */ }

/* Videos de YouTube generados por src/youtube.py (npm run youtube) */
let YT = [];
try {
  YT = JSON.parse(fs.readFileSync(new URL('./youtube.json', import.meta.url), 'utf8'));
} catch { /* sin videos todavia */ }

/* Piezas de la sala generadas por src/gallery.py (npm run gallery) */
let GAL = [];
try {
  GAL = JSON.parse(fs.readFileSync(new URL('./gallery.json', import.meta.url), 'utf8'));
} catch { /* sin piezas todavia */ }
import { ICONS, SPRITE, LOGO_MARK, plat, esc, jsonld } from './parts.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/* Subcarpeta desde la que se sirve la web.
   ''                   -> dominio propio (wavegodsstudio.com)
   '/wavegodsstudios'   -> usuario.github.io/wavegodsstudios
   Se cambia con:  BASE=/wavegodsstudios npm run build          */
const BASE = (globalThis.process?.env?.BASE || '').replace(/\/$/, '');
const wa = (t) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(t)}`;
const NAV = ['media', 'services', 'studio', 'contact'];
const stars = (n = 5) => `<span class="stars" role="img" aria-label="${n}/5">${ICONS.star.repeat(n)}</span>`;

/* ------------------------------------------------------------------ head */
function head(t) {
  const url = SITE.domain + t.path;
  const A = t.lang === 'en' ? '../assets' : 'assets';
  const og = SITE.domain + (t.lang === 'en' ? '/assets/img/og-en.jpg' : SITE.ogImage);
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(t.meta.title)}</title>
<meta name="description" content="${esc(t.meta.description)}">
<meta name="keywords" content="${esc(t.meta.keywords)}">
<meta name="robots" content="${BASE ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1'}">
<meta name="theme-color" content="#08080A">
<meta name="color-scheme" content="dark">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="es" href="${SITE.domain}/">
<link rel="alternate" hreflang="en" href="${SITE.domain}/en/">
<link rel="alternate" hreflang="x-default" href="${SITE.domain}/en/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(SITE.brand)}">
<meta property="og:locale" content="${t.lang === 'es' ? 'es_ES' : 'en_GB'}">
<meta property="og:locale:alternate" content="${t.lang === 'es' ? 'en_GB' : 'es_ES'}">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(t.meta.title)}">
<meta property="og:description" content="${esc(t.meta.description)}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(t.meta.title)}">
<meta name="twitter:description" content="${esc(t.meta.description)}">
<meta name="twitter:image" content="${og}">
<meta name="geo.region" content="ES-CT">
<meta name="geo.placename" content="Barcelona">
<meta name="geo.position" content="${SITE.geo.lat};${SITE.geo.lng}">
<link rel="icon" href="${A}/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${A}/img/apple-touch-icon.png">
<link rel="manifest" href="${A}/site.webmanifest">
<link rel="preload" as="font" type="font/woff2" href="${A}/fonts/bricolage-latin.woff2" crossorigin>
<link rel="preload" as="font" type="font/woff2" href="${A}/fonts/archivo-latin.woff2" crossorigin>
<link rel="preload" as="image" type="image/webp" href="${A}/img/hero-1672.webp" imagesrcset="${A}/img/hero-780.webp 780w, ${A}/img/hero-1150.webp 1150w, ${A}/img/hero-1672.webp 1672w, ${A}/img/hero-3344.webp 3344w" imagesizes="100vw" fetchpriority="high">
<link rel="stylesheet" href="${A}/css/site.css">`;
}

/* --------------------------------------------------------------- schema */
function schema(t) {
  const business = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    additionalType: 'https://www.wikidata.org/wiki/Q1729176',
    '@id': SITE.domain + '/#studio',
    name: SITE.brand,
    description: t.meta.description,
    url: SITE.domain + '/',
    telephone: SITE.phoneDisplay,
    email: SITE.email,
    image: SITE.domain + '/assets/img/hero-1672.webp',
    logo: SITE.domain + '/assets/img/icon-512.png',
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    knowsLanguage: ['es', 'ca', 'en'],
    areaServed: [{ '@type': 'City', name: 'Barcelona' }, { '@type': 'Country', name: 'Spain' }],
    address: {
      '@type': 'PostalAddress',
      addressLocality: `${SITE.district}, ${SITE.city}`,
      addressRegion: SITE.region,
      postalCode: SITE.postalCode,
      addressCountry: SITE.country
    },
    geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    hasMap: SITE.maps,
    sameAs: [SITE.instagram, SITE.youtube, SITE.facebook, SITE.spotify],
    aggregateRating: {
      '@type': 'AggregateRating', ratingValue: SITE.rating.value,
      reviewCount: SITE.rating.count, bestRating: '5', worstRating: '1'
    },
    review: REVIEWS.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      datePublished: r.date,
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: t.lang === 'es' ? r.sx : r.ex
    })),
    makesOffer: t.services.items.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.t, description: s.d, areaServed: 'Barcelona' }
    }))
  };
  const faq = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    '@id': SITE.domain + t.path + '#faq', inLanguage: t.htmlLang,
    mainEntity: t.faq.items.map((f) => ({
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };
  const web = {
    '@context': 'https://schema.org', '@type': 'WebSite', '@id': SITE.domain + '/#website',
    url: SITE.domain + '/', name: SITE.brand, inLanguage: t.htmlLang,
    publisher: { '@id': SITE.domain + '/#studio' }
  };
  return [business, faq, web].map((o) => `<script type="application/ld+json">${jsonld(o)}<\/script>`).join('\n');
}

/* ------------------------------------------------------------------- nav */
const logo = (t, cls = '') => `<a class="logo ${cls}" href="${BASE}${t.path}#top" aria-label="${esc(t.a11y.logo)}">
  ${LOGO_MARK}<span class="logo-txt"><b>Wave Gods</b><i>Studio</i></span>
</a>`;

function nav(t) {
  const items = NAV.map((id) => `<li><a class="nav-link" href="#${id}" data-nav="${id}">${esc(t.nav[id])}</a></li>`).join('');
  const langLink = (cls) => `<a class="${cls}" href="${BASE}${t.altPath}" hreflang="${t.altLabel.toLowerCase()}" lang="${t.altLabel.toLowerCase()}" data-lang-switch="${t.altLabel.toLowerCase()}" aria-label="${esc(t.nav.langLabel)}: ${esc(t.altName)}">${t.altLabel}</a>`;
  return `<header class="nav" id="nav">
  <div class="nav-inner">
    ${logo(t)}
    <nav class="nav-links" aria-label="${esc(t.nav.menu)}"><ul>${items}</ul></nav>
    <div class="nav-actions">
      ${langLink('lang-switch')}
      <a class="btn btn-wa btn-xs" href="${wa(t.contact.waPrefill)}" target="_blank" rel="noopener">${ICONS.whatsapp}<span>${esc(t.nav.cta)}</span></a>
      <button class="burger" type="button" aria-expanded="false" aria-controls="menu" aria-label="${esc(t.nav.menu)}"><span></span><span></span></button>
    </div>
  </div>
  <div class="progress" aria-hidden="true"><i></i></div>
</header>
<div class="menu" id="menu" hidden>
  <nav class="menu-nav" aria-label="${esc(t.nav.menu)}">
    <ul>${NAV.map((id, i) => `<li style="--i:${i}"><a href="#${id}"><em>0${i + 1}</em>${esc(t.nav[id])}</a></li>`).join('')}</ul>
  </nav>
  <div class="menu-foot">
    <a href="${wa(t.contact.waPrefill)}" target="_blank" rel="noopener">${ICONS.whatsapp}${SITE.phoneDisplay}</a>
    <a href="mailto:${SITE.email}">${ICONS.mail}${SITE.email}</a>
    ${langLink('menu-lang')}
  </div>
</div>`;
}

/* ------------------------------------------------------------------ hero */
function hero(t, A) {
  const plats = PLATFORMS.map((p, i) => `<li style="--i:${i}"><span class="plat-in">${plat(p.k)}<b>${esc(p.n)}</b></span></li>`).join('');
  return `<section class="hero" id="top">
  <div class="hero-media">
    <picture>
      <source type="image/webp" srcset="${A}/img/hero-780.webp 780w, ${A}/img/hero-1150.webp 1150w, ${A}/img/hero-1672.webp 1672w, ${A}/img/hero-3344.webp 3344w" sizes="100vw">
      <img src="${A}/img/hero-1672.webp" width="1672" height="941" alt="${esc(t.hero.photoAlt)}" fetchpriority="high" decoding="async">
    </picture>
    <span class="hero-veil" aria-hidden="true"></span>
  </div>
  <div class="hero-body">
    <div class="wrap">
      <p class="eyebrow"><i class="dot" aria-hidden="true"></i>${esc(t.hero.eyebrow)}</p>
      <h1 class="hero-title">
        <span class="hl-a" data-split>${esc(t.hero.line1)}</span>
        <span class="hl-b" data-split>${esc(t.hero.line2)}</span>
      </h1>
      <p class="hero-lead">${esc(t.hero.lead)}</p>
      <div class="hero-cta">
        <a class="btn btn-wa" href="${wa(t.contact.waPrefill)}" target="_blank" rel="noopener">${ICONS.whatsapp}${esc(t.hero.ctaPrimary)}</a>
        <a class="btn btn-ghost" href="#studio">${esc(t.hero.ctaSecondary)}${ICONS.arrowDown}</a>
      </div>
      <a class="hero-rate" href="${SITE.maps}" target="_blank" rel="noopener" aria-label="${esc(t.hero.reviewsCta)}">
        <span class="hr-top">
          ${ICONS.google}<b>${esc(SITE.rating.value)}</b>${stars()}
          <em>${esc(t.hero.countLabel)} ${esc(t.hero.ratingLabel)}</em>
        </span>
        <span class="hr-q" data-quotes>
          ${REVIEWS.map((r, i) => `<span class="hr-i${i === 0 ? ' on' : ''}"><q>${esc(t.lang === 'es' ? r.sx : r.ex)}</q><i>${esc(r.name)}</i></span>`).join('')}
        </span>
      </a>
    </div>
  </div>
  <canvas class="hero-wave" aria-hidden="true"></canvas>
  <div class="hero-plats">
    <div class="wrap hero-plats-in">
      <p class="plats-label">${esc(t.hero.platLabel)}</p>
      <ul class="plats-row">${plats}</ul>
    </div>
  </div>
</section>`;
}

/* ------------------------------------------------------------------ punk */
function punk(t, A) {
  const gear = GEAR.map((g) => `<li><img src="${A}/img/gear/${g.f}.svg" width="120" height="${g.h}" style="--h:${g.h}px" loading="lazy" decoding="async" alt="${esc(g.n)}"></li>`).join('');
  return `<section class="punk">
  <div class="punk-body">
    <h2 class="punk-title"><span>${esc(t.punk.line1)}</span><span class="pk-2">${esc(t.punk.line2)}</span></h2>
    <span class="punk-stamp" aria-hidden="true">${esc(t.punk.stamp)}</span>
    <div class="punk-foot">
      <p class="punk-sub">${esc(t.punk.sub)}</p>
      <div class="gear">
        <p class="gear-label">${esc(t.punk.gearLabel)}</p>
        <ul class="gear-row">${gear}</ul>
      </div>
    </div>
  </div>
</section>`;
}

/* ------------------------------------------------- medios: IG · Spotify · YT */
const nf = (n, lang) => (n == null ? '' : new Intl.NumberFormat(lang === 'es' ? 'es-ES' : 'en-GB').format(n));
const fdate = (d, lang) => {
  if (!d) return '';
  const [y, m] = d.split('-');
  const months = lang === 'es'
    ? ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[Number(m) - 1]} ${y}`;
};

function media(t, A) {
  const M = t.media;

  /* --- Instagram: tarjetas verticales con relieve --- */
  const cards = REELS.length
    ? REELS.map((r, i) => `<li class="reel" style="--i:${i}">
        <a href="${SITE.instagram}" target="_blank" rel="noopener">
          <span class="reel-in">
            <img src="${A}/img/reels/${r.img}-320.webp" srcset="${A}/img/reels/${r.img}-320.webp 320w, ${A}/img/reels/${r.img}-520.webp 520w" sizes="(min-width:1200px) 15vw, (min-width:640px) 30vw, 45vw" width="520" height="650" loading="lazy" decoding="async" alt="${esc(r.caption).slice(0, 180)}">
            <span class="reel-play" aria-hidden="true">${ICONS.play}</span>
            <span class="reel-cap">${esc(r.caption).slice(0, 90)}</span>
            <span class="reel-go">${ICONS.instagram}<b>${esc(M.ig.view)}</b></span>
          </span>
        </a>
      </li>`).join('')
    : `<li class="reel reel-empty"><a href="${SITE.instagram}" target="_blank" rel="noopener"><span class="reel-in">${ICONS.instagram}<b>${esc(M.ig.empty)}</b></span></a></li>`;

  /* --- YouTube: reproductor grande + lista tipo playlist --- */
  /* elige el mayor tamaño disponible que no pase del pedido */
  const vsrc = (v, w) => {
    const sizes = (v.sizes || []).slice().sort((a, b) => b - a);
    const pick = sizes.find((s) => s <= w) ?? sizes[sizes.length - 1] ?? w;
    return `${A}/img/yt/${v.id}-${pick}.webp`;
  };
  const meta = (v) => [fdate(v.date, t.lang), v.views ? `${nf(v.views, t.lang)} ${esc(M.yt.views)}` : ''].filter(Boolean).join(' · ');
  const first = YT[0];
  const ytBlock = first ? `
    <div class="yt-player" data-yt-id="${first.id}">
      <img src="${vsrc(first, 960)}" srcset="${vsrc(first, 560)} 560w, ${vsrc(first, 960)} 960w" sizes="(min-width:1000px) 52vw, 92vw" width="960" height="540" loading="lazy" decoding="async" alt="${esc(first.title)}">
      <button class="yt-play" type="button" data-yt-id="${first.id}" data-yt-title="${esc(first.title)}" aria-label="${esc(M.yt.play)}: ${esc(first.title)}">${ICONS.play}</button>
    </div>
    <p class="yt-now"><b>${esc(first.title)}</b><span>${meta(first)}</span></p>
    <ul class="yt-list">
      ${YT.slice(1).map((v) => `<li>
        <button type="button" data-yt-id="${v.id}" data-yt-title="${esc(v.title)}">
          <span class="yt-thumb"><img src="${vsrc(v, 320)}" width="320" height="180" loading="lazy" decoding="async" alt="">${ICONS.play}</span>
          <span class="yt-txt"><b>${esc(v.title)}</b><em>${meta(v)}</em></span>
        </button>
      </li>`).join('')}
    </ul>` : '';

  return `<section class="media" id="media">
  <div class="wrap">
    <header class="sec-head sec-head-row">
      <div>
        <p class="eyebrow" data-reveal><i class="dot" aria-hidden="true"></i>${esc(M.eyebrow)}</p>
        <h2 class="sec-title sm" data-reveal>${esc(M.title)}</h2>
      </div>
      <div class="reels-side" data-reveal><p>${esc(M.lead)}</p></div>
    </header>

    <article class="mblock mb-ig" data-reveal>
      <header class="mhead">
        <span class="mtag">${plat('instagram')}<b>${esc(M.ig.label)}</b></span>
        <h3>${esc(M.ig.title)}</h3>
        <a class="mlink" href="${SITE.instagram}" target="_blank" rel="noopener">${esc(M.ig.cta)}${ICONS.arrow}</a>
      </header>
      <ul class="reel-row">${cards}</ul>
    </article>

    <div class="media-duo">
      <article class="mblock mb-sp" data-reveal>
        <header class="mhead">
          <span class="mtag">${plat('spotify')}<b>${esc(M.sp.label)}</b></span>
          <h3>${esc(M.sp.title)}</h3>
          <a class="mlink" href="${SITE.spotify}" target="_blank" rel="noopener">${esc(M.sp.cta)}${ICONS.arrow}</a>
        </header>
        <p class="mnote">${esc(M.sp.note)}</p>
        <div class="sp-frame" data-sp="${SITE.spotifyEmbed}" data-sp-title="${esc(M.sp.label)} — ${esc(SITE.brand)}">
          <span class="sp-skel">${plat('spotify')}<em>${esc(M.sp.loading)}</em></span>
        </div>
      </article>

      <article class="mblock mb-yt" data-reveal style="--d:90ms">
        <header class="mhead">
          <span class="mtag">${plat('youtube')}<b>${esc(M.yt.label)}</b></span>
          <h3>${esc(M.yt.title)}</h3>
          <a class="mlink" href="${SITE.youtube}" target="_blank" rel="noopener">${esc(M.yt.cta)}${ICONS.arrow}</a>
        </header>
        <p class="mnote">${esc(M.yt.note)}</p>
        ${ytBlock}
      </article>
    </div>
  </div>
</section>`;
}

/* -------------------------------------------------------------- services */
function services(t, A) {
  const rows = t.services.items.map((s, i) => `<li class="svc" data-img="${A}/img/${s.img}-480.webp" data-reveal style="--d:${i * 60}ms">
    <span class="svc-n">${String(i + 1).padStart(2, '0')}</span>
    <img class="svc-thumb" src="${A}/img/${s.img}-480.webp" width="480" height="640" loading="lazy" decoding="async" alt="">
    <h3 class="svc-t">${esc(s.t)}</h3>
    <p class="svc-d">${esc(s.d)}</p>
    <span class="svc-go" aria-hidden="true">${ICONS.arrow}</span>
    <a class="svc-hit" href="#contact"><span class="sr-only">${esc(s.t)}</span></a>
  </li>`).join('');
  return `<section class="services section" id="services">
  <div class="wrap">
    <header class="sec-head">
      <p class="eyebrow" data-reveal>${esc(t.services.eyebrow)}</p>
      <h2 class="sec-title" data-reveal>${esc(t.services.title)}</h2>
    </header>
    <ul class="svc-list">${rows}</ul>
  </div>
  <figure class="svc-preview" aria-hidden="true"><img alt="" width="480" height="640"></figure>
</section>`;
}

/* ------------------------------------------------- estudio: sala expositiva */
function studio(t, A) {
  const feats = t.studio.features.map((f) => `<li>${ICONS.check}<span>${esc(f)}</span></li>`).join('');

  const pieces = GAL.map((g, i) => {
    const L = (WALL[g.file] || {})[t.lang] || { t: '', m: '' };
    const big = Math.max(...g.sizes);
    const set = g.sizes.slice().sort((a, b) => a - b)
      .map((w) => `${A}/img/wall/${g.file}-${w}.webp ${w}w`).join(', ');
    return `<figure class="piece" data-reveal style="--d:${(i % 3) * 90}ms">
      <a href="https://www.instagram.com/p/${g.code}/" target="_blank" rel="noopener">
        <span class="piece-img" style="--ar:${(g.w / g.h).toFixed(4)}">
          <img src="${A}/img/wall/${g.file}-${big}.webp" srcset="${set}" sizes="(min-width:1100px) 30vw, (min-width:700px) 45vw, 88vw" width="${g.w}" height="${g.h}" loading="lazy" decoding="async" alt="${esc(L.t)} — ${esc(t.studio.eyebrow)} Wave Gods Studio">
          ${g.video ? `<span class="piece-play" aria-hidden="true">${ICONS.play}</span>` : ''}
        </span>
        <figcaption class="cartela">
          <b>${String(i + 1).padStart(2, '0')}</b>
          <span class="c-t">${esc(L.t)}</span>
          <span class="c-m">${esc(L.m)}</span>
          <span class="c-c">@${esc(g.credit)}</span>
        </figcaption>
      </a>
    </figure>`;
  }).join('');

  return `<section class="studio" id="studio">
  <div class="wrap room-head">
    <span class="room-ghost" aria-hidden="true">${esc(t.studio.room)}</span>
    <p class="eyebrow" data-reveal><i class="dot" aria-hidden="true"></i>${esc(t.studio.eyebrow)}</p>
    <blockquote class="studio-quote" data-reveal>${esc(t.studio.quote)}</blockquote>
    <div class="room-bar">
      <ul class="room-meta">${t.studio.meta.map((m) => `<li>${esc(m)}</li>`).join('')}</ul>
      <p class="wall-note">${esc(t.studio.wallNote)}</p>
    </div>
  </div>

  <div class="wall" data-drag>${pieces}</div>

  <div class="wrap">
    <div class="panel">
      <div class="panel-main" data-reveal>
        <p class="panel-tag">${esc(t.studio.panel)}</p>
        <h3 class="panel-t">${esc(t.studio.title)}</h3>
        <p>${esc(t.studio.body)}</p>
        <a class="btn btn-line" href="#contact">${esc(t.studio.cta)}${ICONS.arrow}</a>
      </div>
      <ul class="feats" data-reveal style="--d:70ms">${feats}</ul>
      <div class="studio-hl" data-reveal style="--d:120ms">
        <b>${esc(t.studio.highlight.k)}</b>
        <p>${esc(t.studio.highlight.v)}</p>
      </div>
    </div>
  </div>
</section>`;
}

/* --------------------------------------------------------------- contact */
function contactSec(t) {
  const opts = t.contact.options.map((o) => `<option value="${esc(o)}">${esc(o)}</option>`).join('');
  const qas = t.faq.items.map((f, i) => `<details class="qa"${i === 0 ? ' open' : ''}>
    <summary><span>${esc(f.q)}</span><i aria-hidden="true">${ICONS.plus}</i></summary>
    <div class="qa-body"><p>${esc(f.a)}</p></div>
  </details>`).join('');
  return `<section class="contact section" id="contact">
  <div class="wrap">
    <header class="sec-head center">
      <p class="eyebrow" data-reveal>${esc(t.contact.eyebrow)}</p>
      <h2 class="sec-title sm" data-reveal>${esc(t.contact.title)}</h2>
      <p class="sec-lead" data-reveal>${esc(t.contact.lead)}</p>
    </header>
    <div class="contact-grid">
      <div class="book" data-reveal>
        <form class="form" id="wa-form" data-wa="${SITE.whatsapp}" novalidate>
          <div class="field-row">
            <div class="field">
              <label for="f-name">${esc(t.contact.fields.name)}</label>
              <input id="f-name" name="name" type="text" autocomplete="name" required placeholder="—">
            </div>
            <div class="field">
              <label for="f-project">${esc(t.contact.fields.project)}</label>
              <div class="select"><select id="f-project" name="project">${opts}</select><i aria-hidden="true"></i></div>
            </div>
          </div>
          <div class="field">
            <label for="f-msg">${esc(t.contact.fields.message)}</label>
            <textarea id="f-msg" name="message" rows="2" placeholder="${esc(t.contact.fields.messagePh)}"></textarea>
          </div>
          <button class="btn btn-wa btn-block" type="submit">${ICONS.whatsapp}${esc(t.contact.submit)}</button>
          <p class="form-alt">${esc(t.contact.or)} <a href="mailto:${SITE.email}">${esc(t.contact.directMail)}</a></p>
        </form>
      </div>
      <div class="faq" id="faq" data-reveal>
        <h3 class="faq-t">${esc(t.faq.title)}</h3>
        ${qas}
      </div>
    </div>
  </div>
</section>`;
}

/* ---------------------------------------------------------------- footer */
function footer(t) {
  const social = [
    ['instagram', 'Instagram', SITE.instagram],
    ['spotify', 'Spotify', SITE.spotify],
    ['youtube', 'YouTube', SITE.youtube],
    ['facebook', 'Facebook', SITE.facebook]
  ].map(([k, n, u]) => `<li><a href="${u}" target="_blank" rel="noopener" aria-label="${n}">${plat(k)}</a></li>`).join('');

  return `<footer class="foot">
  <div class="wrap foot-in">
    <div class="foot-brand">
      ${logo(t, 'logo-foot')}
      <p>${esc(t.footer.tagline)}</p>
      <ul class="foot-social" aria-label="${esc(t.footer.social)}">${social}</ul>
    </div>
    <nav class="foot-col" aria-label="${esc(t.footer.nav)}">
      <h4>${esc(t.footer.nav)}</h4>
      <ul>${NAV.map((id) => `<li><a href="#${id}">${esc(t.nav[id])}</a></li>`).join('')}</ul>
    </nav>
    <div class="foot-col">
      <h4>${esc(t.footer.contact)}</h4>
      <ul>
        <li><a href="${wa(t.contact.waPrefill)}" target="_blank" rel="noopener">${esc(SITE.phoneDisplay)}</a></li>
        <li><a href="mailto:${SITE.email}">${esc(SITE.email)}</a></li>
        <li><a href="${SITE.maps}" target="_blank" rel="noopener">${esc(t.contact.locationValue)}</a></li>
      </ul>
    </div>
  </div>
  <div class="wrap foot-bar">
    <p>© <span data-year>2026</span> ${esc(SITE.brand)}. ${esc(t.footer.rights)}</p>
    <p class="foot-note">${esc(t.footer.note)}</p>
    <a class="foot-lang" href="${BASE}${t.altPath}" hreflang="${t.altLabel.toLowerCase()}" lang="${t.altLabel.toLowerCase()}" data-lang-switch="${t.altLabel.toLowerCase()}">${ICONS.globe}${esc(t.altName)}</a>
    <a class="to-top" href="#top" aria-label="${esc(t.footer.top)}">${ICONS.arrowUp}</a>
  </div>
</footer>`;
}

/* ------------------------------------------------------------------ page */
function page(t) {
  const A = t.lang === 'en' ? '../assets' : 'assets';
  const redirect = t.lang === 'es'
    ? `(function(){try{var q=new URLSearchParams(location.search),f=q.get('hl');var s=f||localStorage.getItem('wg-lang');if(f)localStorage.setItem('wg-lang',f);if(s){if(s==='en')location.replace('${BASE}/en/'+location.hash);return}var l=(navigator.languages&&navigator.languages[0]||navigator.language||'en').slice(0,2).toLowerCase();if(['es','ca','gl','eu'].indexOf(l)<0)location.replace('${BASE}/en/'+location.hash)}catch(e){}})();`
    : `(function(){try{var q=new URLSearchParams(location.search),f=q.get('hl');if(f){localStorage.setItem('wg-lang',f);if(f==='es')location.replace('${BASE}/'+location.hash);return}if(localStorage.getItem('wg-lang')==='es')location.replace('${BASE}/'+location.hash)}catch(e){}})();`;

  return `<!doctype html>
<html lang="${t.htmlLang}" class="no-js">
<head>
<script>document.documentElement.classList.remove('no-js');${redirect}<\/script>
${head(t)}
${schema(t)}
</head>
<body>
${SPRITE}
<a class="skip" href="#main">${esc(t.a11y.skip)}</a>
<div class="loader" id="loader" role="status" aria-label="${esc(t.a11y.loading)}"><div>${LOGO_MARK}</div></div>
<div class="grain" aria-hidden="true"></div>
${nav(t)}
<main id="main">
${hero(t, A)}
${media(t, A)}
${punk(t, A)}
${services(t, A)}
${studio(t, A)}
${contactSec(t)}
</main>
${footer(t)}
<a class="wa-float" href="${wa(t.contact.waPrefill)}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICONS.whatsapp}</a>
<script src="${A}/js/site.js" defer><\/script>
</body>
</html>`;
}

/* ----------------------------------------------------------------- write */
const w = (p, s) => {
  const full = path.join(ROOT, p);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, s);
  console.log('  ✓', p, (Buffer.byteLength(s) / 1024).toFixed(1) + ' KB');
};

console.log('Building Wave Gods Studio…');
w('index.html', page(LOCALES.es));
w('en/index.html', page(LOCALES.en));

const today = globalThis.process?.env?.BUILD_DATE || new Date().toISOString().slice(0, 10);
const alts = `    <xhtml:link rel="alternate" hreflang="es" href="${SITE.domain}/"/>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE.domain}/en/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE.domain}/en/"/>`;
w('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${SITE.domain}/</loc>
    <lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>1.0</priority>
${alts}
  </url>
  <url>
    <loc>${SITE.domain}/en/</loc>
    <lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.9</priority>
${alts}
  </url>
</urlset>`);

w('robots.txt', BASE
  ? 'User-agent: *\nDisallow: /\n'
  : `User-agent: *\nAllow: /\n\nSitemap: ${SITE.domain}/sitemap.xml\n`);

w('404.html', `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>404 — ${SITE.brand}</title>
<meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" href="${BASE}/assets/img/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${BASE}/assets/css/site.css"></head>
<body class="is-404"><main class="wrap nf">
<h1>404</h1><p>Esta página no existe. / This page does not exist.</p>
<a class="btn btn-red" href="${BASE}/">Wave Gods Studio</a>
</main></body></html>`);

w('assets/site.webmanifest', JSON.stringify({
  name: SITE.brand, short_name: 'Wave Gods',
  description: LOCALES.es.meta.description,
  start_url: BASE + '/', display: 'standalone',
  background_color: '#08080A', theme_color: '#08080A',
  icons: [
    { src: BASE + '/assets/img/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    { src: BASE + '/assets/img/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    { src: BASE + '/assets/img/icon-512.png', sizes: '512x512', type: 'image/png' }
  ]
}, null, 2));

if (!BASE) w('CNAME', 'wavegodsstudio.com\n');
else console.log('  · BASE=' + BASE + ': sin CNAME (se sirve desde la subcarpeta)');
w('.nojekyll', '');
console.log('Done.');
