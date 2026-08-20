/* =========================================================================
   Iconos, logos de plataformas y marca. Todo SVG inline, sin peticiones.
   Icons, platform logos and brand mark. Inline SVG, zero requests.
   ========================================================================= */

/* ---------------------------------------------------------- iconos de UI */
const UI = {
  whatsapp: '<path fill="currentColor" d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35M12.05 21.8h-.03a9.8 9.8 0 0 1-4.98-1.36l-.36-.21-3.7.97.99-3.61-.24-.37a9.76 9.76 0 0 1-1.5-5.22c0-5.4 4.4-9.79 9.83-9.79 2.62 0 5.09 1.02 6.94 2.88a9.72 9.72 0 0 1 2.87 6.92c0 5.4-4.4 9.79-9.82 9.79M20.5 3.49A11.75 11.75 0 0 0 12.05 0C5.53 0 .23 5.29.22 11.79c0 2.08.55 4.1 1.58 5.89L.12 24l6.47-1.69a11.85 11.85 0 0 0 5.46 1.39h.01c6.51 0 11.81-5.29 11.82-11.79 0-3.15-1.23-6.11-3.46-8.34"/>',
  mail: '<path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M3 6.5h18v11H3zM3.5 7l8.5 6 8.5-6"/>',
  phone: '<path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M6.5 3h-2A1.5 1.5 0 0 0 3 4.6C3 13.1 10.9 21 19.4 21a1.5 1.5 0 0 0 1.6-1.5v-2a1 1 0 0 0-.8-1l-3.4-.7a1 1 0 0 0-1 .4l-1 1.3a13.6 13.6 0 0 1-5.3-5.3l1.3-1a1 1 0 0 0 .4-1l-.7-3.4a1 1 0 0 0-1-.8Z"/>',
  pin: '<path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6" fill="none" stroke="currentColor" stroke-width="1.6"/>',
  clock: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" d="M12 7v5.2l3.2 2"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17.2" cy="6.8" r="1.2" fill="currentColor"/>',
  youtube: '<path fill="currentColor" d="M23 12s0-3.6-.46-5.32a2.77 2.77 0 0 0-1.95-1.96C18.87 4.25 12 4.25 12 4.25s-6.87 0-8.59.47A2.77 2.77 0 0 0 1.46 6.7C1 8.4 1 12 1 12s0 3.6.46 5.32c.25.94 1 1.68 1.95 1.93 1.72.47 8.59.47 8.59.47s6.87 0 8.59-.47a2.77 2.77 0 0 0 1.95-1.93C23 15.6 23 12 23 12M9.75 15.29V8.71L15.5 12z"/>',
  facebook: '<path fill="currentColor" d="M14.5 8.5V6.9c0-.75.17-1.13 1.34-1.13h1.49V3h-2.5c-2.9 0-3.9 1.35-3.9 3.66V8.5H9v2.9h1.93V21h3.57v-9.6h2.6l.34-2.9z"/>',
  arrow: '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6"/>',
  arrowUp: '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M12 19V5m-6 6 6-6 6 6"/>',
  arrowDown: '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m6-6-6 6-6-6"/>',
  play: '<path fill="currentColor" d="M8 5.2v13.6L19 12z"/>',
  check: '<path fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.5 5 5 10-11"/>',
  plus: '<path fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" d="M12 5v14M5 12h14"/>',
  globe: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><path fill="none" stroke="currentColor" stroke-width="1.6" d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z"/>',
  star: '<path fill="currentColor" d="m12 2.6 2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.44l-5.81 3.06 1.11-6.47-4.7-4.58 6.5-.95z"/>',
  google: '<path fill="#4285F4" d="M23.5 12.27c0-.82-.07-1.6-.2-2.36H12v4.47h6.45a5.5 5.5 0 0 1-2.4 3.6v3h3.87c2.26-2.08 3.58-5.15 3.58-8.71"/><path fill="#34A853" d="M12 24c3.24 0 5.96-1.08 7.95-2.91l-3.88-3.01c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.95H1.26v3.1A12 12 0 0 0 12 24"/><path fill="#FBBC05" d="M5.27 14.28a7.2 7.2 0 0 1 0-4.56v-3.1H1.26a12 12 0 0 0 0 10.76z"/><path fill="#EA4335" d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.96 1.18 15.24 0 12 0A12 12 0 0 0 1.26 6.62l4.01 3.1C6.22 6.88 8.87 4.77 12 4.77"/>'
};

/* -------------------------------------- logos de plataformas (a todo color) */
const PLAT = {
  spotify: '<circle cx="16" cy="16" r="15" fill="#1ED760"/><g fill="none" stroke="#08120C" stroke-linecap="round"><path d="M8.4 12.3c5-1.6 11.4-1 15.4 1.4" stroke-width="2.9"/><path d="M9.7 17.1c4.1-1.3 9.2-.8 12.6 1.2" stroke-width="2.4"/><path d="M11 21.4c3.3-1 7.1-.6 9.8.9" stroke-width="1.9"/></g>',
  applemusic: '<rect x="1" y="1" width="30" height="30" rx="7.5" fill="url(#g-am)"/><path fill="#fff" d="M22.6 7.4a.7.7 0 0 0-.85-.68l-8.6 1.83a.9.9 0 0 0-.71.88v9.94a2.9 2.9 0 1 0 1.72 2.65V12.2l6.72-1.43v5.5a2.9 2.9 0 1 0 1.72 2.65z"/>',
  youtubemusic: '<circle cx="16" cy="16" r="15" fill="#FF0000"/><circle cx="16" cy="16" r="9.6" fill="none" stroke="#fff" stroke-width="1.9"/><path fill="#fff" d="M13.3 11.4 21.2 16l-7.9 4.6z"/>',
  tidal: '<g fill="#fff"><path d="M7.6 5.6 12.2 10.2 7.6 14.8 3 10.2z"/><path d="M16.2 5.6 20.8 10.2 16.2 14.8 11.6 10.2z"/><path d="M24.8 5.6 29.4 10.2 24.8 14.8 20.2 10.2z"/><path d="M16.2 14.2 20.8 18.8 16.2 23.4 11.6 18.8z"/></g>',
  deezer: '<g><rect x="21.5" y="5" width="8.5" height="3.2" rx="1.3" fill="#F9A01B"/><rect x="21.5" y="10.4" width="8.5" height="3.2" rx="1.3" fill="#EF5466"/><rect x="11" y="10.4" width="8.5" height="3.2" rx="1.3" fill="#40AB5D"/><rect x="21.5" y="15.8" width="8.5" height="3.2" rx="1.3" fill="#B7288A"/><rect x="11" y="15.8" width="8.5" height="3.2" rx="1.3" fill="#0F6EB4"/><rect x=".5" y="15.8" width="8.5" height="3.2" rx="1.3" fill="#FF555D"/><rect x="21.5" y="21.2" width="8.5" height="3.2" rx="1.3" fill="#48C3E3"/><rect x="11" y="21.2" width="8.5" height="3.2" rx="1.3" fill="#8F4DA0"/><rect x=".5" y="21.2" width="8.5" height="3.2" rx="1.3" fill="#F9A01B"/></g>',
  soundcloud: '<g fill="#FF5500"><rect x="1" y="15.5" width="1.9" height="6.5" rx=".95"/><rect x="4.7" y="12.6" width="1.9" height="9.4" rx=".95"/><rect x="8.4" y="10.4" width="1.9" height="11.6" rx=".95"/><path d="M12.6 9.9c1.9-3 6-3.8 8.9-1.7a6.2 6.2 0 0 1 2.5 5.1h.8a4.35 4.35 0 1 1 0 8.7H12.6z"/></g>',
  instagram: '<rect x="1.5" y="1.5" width="29" height="29" rx="8.5" fill="url(#g-ig)"/><rect x="8.4" y="8.4" width="15.2" height="15.2" rx="5" fill="none" stroke="#fff" stroke-width="2.1"/><circle cx="16" cy="16" r="4.2" fill="none" stroke="#fff" stroke-width="2.1"/><circle cx="22.6" cy="9.5" r="1.5" fill="#fff"/>',
  facebook: '<circle cx="16" cy="16" r="15" fill="#1877F2"/><path fill="#fff" d="M20.4 20.3l.66-4.3h-4.13v-2.79c0-1.18.58-2.33 2.43-2.33h1.88V7.03s-1.7-.29-3.33-.29c-3.4 0-5.62 2.06-5.62 5.79V16h-3.78v4.3h3.78v10.4a15 15 0 0 0 4.64 0V20.3z"/>',
  youtube: '<rect x="1" y="5.5" width="30" height="21" rx="6.5" fill="#FF0000"/><path fill="#fff" d="M13 11.2 21.4 16 13 20.8z"/>',
  amazonmusic: '<circle cx="16" cy="16" r="15" fill="#25D1DA"/><path fill="#fff" d="M22.3 7.6a.62.62 0 0 0-.76-.6l-7.6 1.6a.8.8 0 0 0-.63.78v7.9a2.5 2.5 0 1 0 1.5 2.29v-6.9l5.99-1.26v4.4a2.5 2.5 0 1 0 1.5 2.29z"/><path fill="#0B3B47" d="M9.4 22.6c4 2.3 8.9 2.3 12.9 0 .5-.3 1 .3.5.8-1.8 1.7-4.4 2.5-7 2.5s-5.2-.8-7-2.5c-.4-.5.2-1.1.6-.8"/>'
};

const gradients = '<defs>'
  + '<linearGradient id="g-am" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FB5C74"/><stop offset="1" stop-color="#F62B47"/></linearGradient>'
  + '<radialGradient id="g-ig" cx="0.28" cy="1.05" r="1.25"><stop offset="0" stop-color="#FFD879"/><stop offset=".28" stop-color="#FA7E1E"/><stop offset=".55" stop-color="#E1306C"/><stop offset=".8" stop-color="#B325B6"/><stop offset="1" stop-color="#6A31D8"/></radialGradient>'
  + '</defs>';

export const SPRITE =
  '<svg class="sprite" aria-hidden="true" focusable="false" width="0" height="0">' + gradients +
  Object.entries(UI).map(([k, v]) => `<symbol id="i-${k}" viewBox="0 0 24 24">${v}</symbol>`).join('') +
  Object.entries(PLAT).map(([k, v]) => `<symbol id="p-${k}" viewBox="0 0 32 32">${v}</symbol>`).join('') +
  '</svg>';

export const ICONS = Object.fromEntries(Object.keys(UI).map((n) =>
  [n, `<svg class="ic ic-${n}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#i-${n}"/></svg>`]));

export const plat = (n) =>
  `<svg class="plat-logo" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><use href="#p-${n}"/></svg>`;

export const PLATFORM_KEYS = Object.keys(PLAT);

/* ------------------------------------------- marca de onda del logo original */
const BARS = [22, 40, 58, 44, 26, 34, 20, 30, 52, 66, 50, 34, 44, 28, 38, 24, 30, 18, 24, 14];
export const LOGO_MARK = (() => {
  const w = 4, gap = 3.2, max = 70;
  const parts = BARS.map((h, i) =>
    `<rect class="lb" style="--i:${i}" x="${(i * (w + gap)).toFixed(2)}" y="${((max - h) / 2).toFixed(2)}" width="${w}" height="${h}" rx="${w / 2}"/>`).join('');
  const total = (BARS.length * (w + gap) - gap).toFixed(2);
  return `<svg class="logo-mark" viewBox="0 0 ${total} ${max}" fill="currentColor" aria-hidden="true" focusable="false">${parts}</svg>`;
})();

export const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const jsonld = (o) => JSON.stringify(o).replace(/</g, '\\u003c');
