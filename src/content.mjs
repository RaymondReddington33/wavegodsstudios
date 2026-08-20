/* =========================================================================
   WAVE GODS STUDIO — fuente única de contenido / single source of content
   Cambia los textos SOLO aquí y ejecuta: npm run build
   Edit copy ONLY here, then run: npm run build
   ========================================================================= */

export const SITE = {
  domain: 'https://wavegodsstudio.com',
  brand: 'Wave Gods Studio',
  phoneDisplay: '+34 658 618 186',
  phoneRaw: '+34658618186',
  whatsapp: '34658618186',
  email: 'hello@wavegodstudio.com',
  instagram: 'https://www.instagram.com/wavegodsstudio/',
  instagramHandle: '@wavegodsstudio',
  youtube: 'https://www.youtube.com/@WaveGodsStudio',
  spotify: 'https://open.spotify.com/artist/1Xaz0jJ8OlzBoZkFBqSDSr',
  spotifyEmbed: 'https://open.spotify.com/embed/artist/1Xaz0jJ8OlzBoZkFBqSDSr?utm_source=generator',
  facebook: 'https://www.facebook.com/CHNDMAS',
  city: 'Barcelona',
  district: 'Poblenou',
  region: 'Catalunya',
  country: 'ES',
  postalCode: '08005',
  geo: { lat: '41.4036', lng: '2.1944' },
  maps: 'https://www.google.com/maps/search/?api=1&query=Wave+Gods+Studio+Poblenou+Barcelona',
  rating: { value: '5.0', count: '17' },
  ogImage: '/assets/img/og.jpg'
};

/* Cartelas de la sala: la clave es el archivo de src/gallery.json */
export const WALL = {
  'wall-1': { es: { t: 'Trono',                   m: 'Vídeo · Producción' },      en: { t: 'Throne',              m: 'Video · Production' } },
  'wall-2': { es: { t: 'La mesa a las tres',      m: 'Fotografía · Mezcla' },     en: { t: 'The desk at three',   m: 'Photograph · Mixing' } },
  'wall-3': { es: { t: 'Directo en la terraza',   m: 'Fotografía · Directo' },    en: { t: 'Rooftop live',        m: 'Photograph · Live' } },
  'wall-4': { es: { t: 'Al otro lado del cristal',m: 'Fotografía · Grabación' },  en: { t: 'Behind the glass',    m: 'Photograph · Tracking' } },
  'wall-5': { es: { t: 'Cypher',                  m: 'Fotografía · Sesión' },     en: { t: 'Cypher',              m: 'Photograph · Session' } },
  'wall-6': { es: { t: 'Toma de voz',             m: 'Fotografía · Voz' },        en: { t: 'Vocal take',          m: 'Photograph · Vocals' } }
};

/* Plataformas: la clave debe existir en src/parts.mjs (PLAT) */
export const PLATFORMS = [
  { k: 'spotify',      n: 'Spotify' },
  { k: 'applemusic',   n: 'Apple Music' },
  { k: 'youtubemusic', n: 'YouTube Music' },
  { k: 'tidal',        n: 'Tidal' },
  { k: 'deezer',       n: 'Deezer' },
  { k: 'soundcloud',   n: 'SoundCloud' },
  { k: 'amazonmusic',  n: 'Amazon Music' }
];

/* Equipo destacado: SVG en assets/img/gear/. h = altura optica en px */
export const GEAR = [
  { f: 'universal-audio', n: 'Universal Audio', h: 46 },
  { f: 'avid',            n: 'Avid',            h: 21 },
  { f: 'rme',             n: 'RME',             h: 21 },
  { f: 'akg',             n: 'AKG',             h: 24 },
  { f: 'shure',           n: 'Shure',           h: 17 },
  { f: 'warm-audio',      n: 'Warm Audio',      h: 23 }
];

/* Reseñas reales publicadas en Google — no inventar / real Google reviews */
export const REVIEWS = [
  { name: 'Xavi Allueva',      date: '2025-04-11', sx: 'Espectacular setup, de lo mejorcito para grabar un disco.', ex: 'Spectacular setup, one of the best places to record an album.',  es: 'Espectacular setup, de lo mejorcito que se puede encontrar para grabar un disco. Dani es el puto amo.', en: 'Spectacular setup — one of the best places you can find to record an album. Dani is an absolute beast.' },
  { name: 'Enric Curto',       date: '2025-04-11', sx: 'El espacio es enorme y el sonido es una pasada.', ex: 'The room is huge and the sound is unreal.',  es: 'El estudio tiene un espacio enorme y el sonido es una pasada. Muy contento con la experiencia y el trato.', en: 'The studio has a huge live room and the sound is unreal. Really happy with the experience and the vibe.' },
  { name: 'erosaka47',         date: '2025-04-11', sx: 'Como en casa pero con la calidad de un profesional.', ex: 'Feels like home but with full pro quality.',  es: 'Como en casa pero con la calidad de un profesional. Gran trato y un sonido maravilloso.', en: 'Feels like home but with full pro quality. Great vibe and beautiful sound.' },
  { name: 'Marc Cánovas Fons', date: '2025-04-11', sx: 'Súper cómodos grabando. Recomendable 100%.', ex: 'Incredibly comfortable recording. 100% recommended.',  es: 'Hemos estado súper cómodos grabando. Mi banda y yo, súper agradecidos. Recomendable 100%.', en: 'We were incredibly comfortable recording. My band and I are super grateful. 100% recommended.' },
  { name: 'EMHE de Méndez',    date: '2025-04-11', sx: 'Un estudio espectacular y un trato inmejorable.', ex: 'A spectacular studio and unbeatable treatment.',  es: 'Un estudio espectacular y un trato inmejorable. Mucha calidad y muchísima implicación.', en: 'A spectacular studio and unbeatable treatment. Real quality and serious commitment.' },
  { name: 'Daniel Balmanya',   date: '2025-04-11', sx: 'El mejor sitio en el que he estado para grabar música.', ex: 'The best place I have ever been to record music.',  es: 'El mejor sitio en el que he estado para grabar música.', en: 'The best place I have ever been to record music.' }
];

/* ===================== ESPAÑOL ===================== */
const es = {
  lang: 'es',
  htmlLang: 'es-ES',
  path: '/',
  altPath: '/en/',
  altLabel: 'EN',
  altName: 'English',
  meta: {
    title: 'Wave Gods Studio | Estudio de grabación, mezcla y mastering en Barcelona',
    description: 'Estudio de grabación profesional en el Poblenou, Barcelona. Grabación, mezcla, mastering y producción musical. 5.0★ con 17 reseñas en Google. Reserva por WhatsApp.',
    keywords: 'estudio de grabación barcelona, grabar maqueta barcelona, mezcla y mastering barcelona, estudio poblenou, producción musical barcelona, grabar voz barcelona, estudio grabación bandas'
  },
  nav: {
    media: 'Lo último', services: 'Servicios', studio: 'Estudio', contact: 'Contacto',
    cta: 'Reservar', menu: 'Menú', langLabel: 'Idioma'
  },
  hero: {
    eyebrow: 'Poblenou · Barcelona',
    line1: 'Suena como',
    line2: 'lo que eres',
    lead: 'Grabación, mezcla y mastering. Entras con una idea, sales con un tema listo para publicar.',
    ctaPrimary: 'Reserva por WhatsApp',
    ctaSecondary: 'Ver el estudio',
    platLabel: 'Tu música sale lista para',
    ratingLabel: 'en Google',
    countLabel: '17 reseñas',
    reviewsCta: 'Ver todas en Google',
    photoAlt: 'Sala de control de Wave Gods Studio en Barcelona con micrófono de condensador en primer plano, monitores, mesa de mezclas y cabina de grabación al fondo',
    photoAlt2: 'Ingeniero de sonido trabajando en la mesa de mezclas del estudio'
  },
  punk: {
    line1: 'Graba lo que',
    line2: 'sientes',
    sub: 'Sin plantillas. Sin prisa de reloj. Sin excusas.',
    stamp: 'Est. Poblenou',
    gearLabel: 'Equipo destacado'
  },
  media: {
    eyebrow: 'En directo',
    title: 'Lo último del estudio',
    lead: 'Lo que grabamos, lo que suena y lo que subimos. Todo lo que sale de aquí, en un sitio.',
    ig: {
      label: 'Instagram',
      title: 'Del día a día',
      cta: 'Seguir',
      view: 'Ver en Instagram',
      empty: 'Míranos en Instagram'
    },
    sp: {
      label: 'Spotify',
      title: 'Lo más escuchado',
      note: 'Temas grabados, mezclados o masterizados aquí.',
      cta: 'Abrir en Spotify',
      loading: 'Cargando el reproductor…'
    },
    yt: {
      label: 'YouTube',
      title: 'Últimos vídeos',
      note: 'Live sessions y sesiones en la terraza.',
      cta: 'Ver el canal',
      play: 'Reproducir',
      views: 'visualizaciones'
    }
  },
  services: {
    eyebrow: 'Lo que hacemos',
    title: 'Servicios',
    items: [
      { t: 'Grabación',      d: 'Sala y equipo pro para bandas, solistas y voces.',                 img: 'booth' },
      { t: 'Mezcla',         d: 'Multitracks grabados aquí o donde sea. Balanceado y potente.',      img: 'desk' },
      { t: 'Mastering',      d: 'Analógico y digital. Nivel de release en cualquier plataforma.',    img: 'master' },
      { t: 'Producción',     d: 'Beats, arreglos y temas desde cero o desde tus referencias.',       img: 'prod' },
      { t: 'Analógico',      d: 'Máquinas de gama alta para un carácter que no da un plugin.',       img: 'amp' },
      { t: 'Estudio móvil',  d: 'Llevamos el equipo a tu gira, local o exteriores.',                 img: 'live' }
    ]
  },
  studio: {
    eyebrow: 'El estudio',
    quote: 'Una sala grande, tratada de verdad, y alguien detrás de la mesa que se implica.',
    title: 'No es un pasillo con un micro',
    body: 'Estamos en el Poblenou, el distrito creativo de Barcelona. Sala principal con espacio para una banda entera tocando a la vez, backline propio y un ambiente en el que apetece quedarse.',
    features: [
      'Cabe una banda completa, batería incluida',
      'Acondicionamiento acústico profesional',
      'Analógico de gama alta + plugins TOP',
      'Sin reloj encima: se sale cuando suena bien'
    ],
    cta: 'Ven a verlo',
    room: 'Sala 01',
    meta: ['Poblenou, Barcelona', 'Grabación · Mezcla · Mastering', 'Colección permanente'],
    wallTitle: 'La sala, por dentro',
    wallNote: 'Piezas de sesiones reales. Toca cualquiera para verla en Instagram.',
    panel: 'Sobre la sala',
    alt1: 'Dos artistas grabando voces con auriculares frente al micro en Wave Gods Studio',
    alt2: 'Cantante grabando una toma de voz en la cabina del estudio con luz azul',
    alt3: 'Vocalista cantando frente al micro de condensador bajo luz verde en el estudio',
    cap1: 'Grabando voces',
    cap2: 'En la cabina',
    cap3: 'Toma de voz',
    highlight: { k: 'Banda entera', v: 'Espacio de sobra para grabar al grupo completo tocando a la vez, batería incluida.' }
  },
  faq: {
    title: 'Preguntas',
    items: [
      { q: '¿Cuánto cuesta una sesión?', a: 'Depende de las horas y del proyecto: no es lo mismo una voz sobre un beat que una banda con batería. Escríbenos por WhatsApp y te damos un presupuesto cerrado antes de empezar, sin compromiso.' },
      { q: '¿Dónde estáis exactamente?', a: 'En el Poblenou, Barcelona, muy bien comunicado en metro y bus y a pocos minutos del centro. Te pasamos la dirección exacta al confirmar la reserva.' },
      { q: '¿Puedo grabar con toda la banda?', a: 'Sí. La sala principal está acondicionada y tiene espacio de sobra para grabar el grupo entero tocando a la vez, batería incluida, con backline disponible en el estudio.' },
      { q: '¿Mezcláis temas grabados en otro sitio?', a: 'Sí, es de lo que más hacemos. Nos mandas los multitracks desde donde estés y trabajamos la mezcla y el mastering online, con revisiones hasta que suene como quieres.' },
      { q: '¿Me llevo la mezcla el mismo día?', a: 'En el pack de voz sobre beat, sí: sales con la mezcla y un mastering general hecho. Las mezclas más complejas y los proyectos de banda necesitan unos días de trabajo posterior.' },
      { q: '¿Hace falta llevar algo preparado?', a: 'Con tener claras las canciones y traer referencias de cómo quieres que suene, sobra. Micros, previos, instrumentos y criterio los ponemos nosotros.' }
    ]
  },
  contact: {
    eyebrow: 'Reserva',
    title: 'Cuéntanos tu proyecto',
    lead: 'Rellena esto y se abre WhatsApp con el mensaje escrito. Sin esperar tres días a que alguien conteste un email.',
    fields: { name: 'Tu nombre', project: '¿Qué necesitas?', message: 'Cuéntanos un poco más', messagePh: 'Tengo 3 temas grabados en casa y quiero mezclarlos y masterizarlos...' },
    options: ['Grabar voz sobre beat', 'Grabar con mi banda', 'Mezcla y mastering', 'Producción musical', 'Estudio móvil', 'Otra cosa'],
    submit: 'Enviar por WhatsApp',
    or: 'o si lo prefieres',
    directMail: 'mándanos un email',
    locationLabel: 'Dónde',
    locationValue: 'Poblenou, Barcelona',
    locationCta: 'Abrir mapa',
    hoursLabel: 'Horario',
    hoursValue: 'Con cita previa',
    phoneLabel: 'WhatsApp',
    emailLabel: 'Email',
    waPrefill: 'Hola Wave Gods Studio! Me gustaría reservar una sesión.'
  },
  footer: {
    tagline: 'Estudio de grabación, mezcla y mastering en el Poblenou, Barcelona.',
    nav: 'Navegación',
    contact: 'Contacto',
    social: 'Síguenos',
    rights: 'Todos los derechos reservados.',
    top: 'Arriba',
    note: 'Hecho en Barcelona, obsesionados con el sonido.'
  },
  a11y: { skip: 'Saltar al contenido', logo: 'Wave Gods Studio — inicio', loading: 'Cargando' }
};

/* ===================== ENGLISH ===================== */
const en = {
  lang: 'en',
  htmlLang: 'en',
  path: '/en/',
  altPath: '/',
  altLabel: 'ES',
  altName: 'Español',
  meta: {
    title: 'Wave Gods Studio | Recording, Mixing & Mastering Studio in Barcelona',
    description: 'Professional recording studio in Poblenou, Barcelona. Recording, mixing, mastering and music production. Rated 5.0★ across 17 Google reviews. Book on WhatsApp.',
    keywords: 'recording studio barcelona, mixing and mastering barcelona, music production barcelona, band recording studio barcelona, poblenou studio, vocal recording barcelona'
  },
  nav: {
    media: 'Latest', services: 'Services', studio: 'Studio', contact: 'Contact',
    cta: 'Book now', menu: 'Menu', langLabel: 'Language'
  },
  hero: {
    eyebrow: 'Poblenou · Barcelona',
    line1: 'Sound like',
    line2: 'who you are',
    lead: 'Recording, mixing and mastering. Walk in with an idea, walk out with a track ready to release.',
    ctaPrimary: 'Book on WhatsApp',
    ctaSecondary: 'See the studio',
    platLabel: 'Your music leaves ready for',
    ratingLabel: 'on Google',
    countLabel: '17 reviews',
    reviewsCta: 'Read them all on Google',
    photoAlt: 'Wave Gods Studio control room in Barcelona with a condenser microphone in the foreground, monitors, mixing desk and the recording booth behind the glass',
    photoAlt2: 'Sound engineer working at the studio mixing desk'
  },
  punk: {
    line1: 'Record what',
    line2: 'you feel',
    sub: 'No templates. No clock-watching. No excuses.',
    stamp: 'Est. Poblenou',
    gearLabel: 'Featured gear'
  },
  media: {
    eyebrow: 'Live feed',
    title: 'Latest from the studio',
    lead: 'What we record, what it sounds like and what we post. Everything that leaves this room, in one place.',
    ig: {
      label: 'Instagram',
      title: 'Day to day',
      cta: 'Follow',
      view: 'View on Instagram',
      empty: 'Find us on Instagram'
    },
    sp: {
      label: 'Spotify',
      title: 'Most played',
      note: 'Tracks recorded, mixed or mastered here.',
      cta: 'Open in Spotify',
      loading: 'Loading the player…'
    },
    yt: {
      label: 'YouTube',
      title: 'Latest videos',
      note: 'Live sessions from the studio rooftop.',
      cta: 'Visit the channel',
      play: 'Play',
      views: 'views'
    }
  },
  services: {
    eyebrow: 'What we do',
    title: 'Services',
    items: [
      { t: 'Recording',      d: 'Pro room and gear for bands, solo artists and vocals.',        img: 'booth' },
      { t: 'Mixing',         d: 'Multitracks from here or anywhere. Balanced and powerful.',    img: 'desk' },
      { t: 'Mastering',      d: 'Analogue and digital. Release level on every platform.',       img: 'master' },
      { t: 'Production',     d: 'Beats, arrangements and tracks from scratch or from refs.',    img: 'prod' },
      { t: 'Analogue',       d: 'High-end machines for character no plugin can fake.',          img: 'amp' },
      { t: 'Mobile studio',  d: 'We bring the gear to your tour, space or outdoor session.',     img: 'live' }
    ]
  },
  studio: {
    eyebrow: 'The studio',
    quote: 'A big room, properly treated, and someone behind the desk who actually cares.',
    title: 'Not a hallway with a mic',
    body: 'We’re in Poblenou, Barcelona’s creative district. A main room with space for a full band playing at once, our own backline, and a place you actually want to stay in.',
    features: [
      'Fits a full band, drums included',
      'Professional acoustic treatment',
      'High-end analogue + top-tier plugins',
      'No clock-watching: we leave when it sounds right'
    ],
    cta: 'Come and see it',
    room: 'Room 01',
    meta: ['Poblenou, Barcelona', 'Recording · Mixing · Mastering', 'Permanent collection'],
    wallTitle: 'Inside the room',
    wallNote: 'Pieces from real sessions. Tap any of them to open it on Instagram.',
    panel: 'About the room',
    alt1: 'Two artists tracking vocals on headphones at the mic in Wave Gods Studio',
    alt2: 'Singer recording a vocal take in the studio booth under blue light',
    alt3: 'Vocalist singing into the condenser mic under green light in the studio',
    cap1: 'Tracking vocals',
    cap2: 'In the booth',
    cap3: 'Vocal take',
    highlight: { k: 'Full band', v: 'Room enough to track the whole group playing at once, drums included.' }
  },
  faq: {
    title: 'Questions',
    items: [
      { q: 'How much is a session?', a: 'It depends on the hours and the project: one vocal over a beat is not the same as a full band with drums. Message us on WhatsApp and we’ll give you a fixed quote before we start, no strings attached.' },
      { q: 'Where exactly are you?', a: 'In Poblenou, Barcelona, well connected by metro and bus and minutes from the centre. We send the exact address once your booking is confirmed.' },
      { q: 'Can I record with my whole band?', a: 'Yes. The main room is treated and has plenty of space to track the whole group playing at once, drums included, with backline available at the studio.' },
      { q: 'Do you mix tracks recorded elsewhere?', a: 'Yes, it’s most of what we do. Send us the multitracks from wherever you are and we handle mixing and mastering online, with revisions until it sounds the way you want.' },
      { q: 'Do I get the mix the same day?', a: 'With the vocals-on-a-beat package, yes: you leave with the mix and a general master done. More complex mixes and band projects need a few extra days.' },
      { q: 'Do I need to prepare anything?', a: 'Knowing your songs and bringing references for how you want them to sound is plenty. Mics, preamps, instruments and judgement are on us.' }
    ]
  },
  contact: {
    eyebrow: 'Booking',
    title: 'Tell us about your project',
    lead: 'Fill this in and WhatsApp opens with the message already written. No waiting three days for an email reply.',
    fields: { name: 'Your name', project: 'What do you need?', message: 'Tell us a bit more', messagePh: 'I have 3 tracks recorded at home and I want them mixed and mastered...' },
    options: ['Record vocals on a beat', 'Record with my band', 'Mixing and mastering', 'Music production', 'Mobile studio', 'Something else'],
    submit: 'Send on WhatsApp',
    or: 'or if you prefer',
    directMail: 'send us an email',
    locationLabel: 'Where',
    locationValue: 'Poblenou, Barcelona',
    locationCta: 'Open map',
    hoursLabel: 'Hours',
    hoursValue: 'By appointment',
    phoneLabel: 'WhatsApp',
    emailLabel: 'Email',
    waPrefill: 'Hi Wave Gods Studio! I’d like to book a session.'
  },
  footer: {
    tagline: 'Recording, mixing and mastering studio in Poblenou, Barcelona.',
    nav: 'Navigation',
    contact: 'Contact',
    social: 'Follow us',
    rights: 'All rights reserved.',
    top: 'Top',
    note: 'Made in Barcelona, obsessed with sound.'
  },
  a11y: { skip: 'Skip to content', logo: 'Wave Gods Studio — home', loading: 'Loading' }
};

export const LOCALES = { es, en };
