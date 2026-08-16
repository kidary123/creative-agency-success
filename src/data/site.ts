/**
 * Única fuente de verdad del contenido del sitio.
 *
 * Nota importante sobre ortografía:
 * el diseño de Figma trae tres typos ("Sucess", "Expertize",
 * "Recurning Revenue"). Aquí guardamos AMBAS versiones:
 *   - `display` → lo que se pinta en pantalla (fiel al diseño)
 *   - `correct` → lo que va en llms.txt, catalog.txt y JSON-LD
 * Así reproducimos el diseño tal cual sin ensuciar la metadata
 * que consumen los crawlers de IA.
 */

export const site = {
  name: 'Creative Agency Success',
  tagline: 'Your Agency Vision Made Real.',
  positioning: 'You scale your agency. We simplify your life.',
  description:
    'Coaching and scaling systems for creative-agency owners — predictable client flow, systemized operations, and the path from 5–6 to 6–7 figures with the founder’s time back.',
  // Se reemplaza por la URL real de Vercel antes del deploy final.
  url: 'https://creative-agency-success-roads1.vercel.app',
} as const;

/**
 * Navegación tal como está en el Figma: siete enlaces y un icono de
 * búsqueda, no los cinco + botón CTA que describía el brief original.
 * El diseño manda — `display` conserva el typo "Sucess" del archivo.
 */
export const navLinks = [
  { label: 'Sucess Stories', correct: 'Success Stories', href: '#success-stories' },
  { label: 'Project Page', correct: 'Project Page', href: '#projects' },
  { label: 'Resources', correct: 'Resources', href: '#resources' },
  { label: 'Services', correct: 'Services', href: '#programs' },
  { label: 'About', correct: 'About', href: '#about' },
  { label: 'Podcast', correct: 'Podcast', href: '#podcast' },
  { label: 'Contact', correct: 'Contact', href: '#contact' },
] as const;

export const hero = {
  headline: 'Your Agency Vision Made Real,',
  headlineDisplay: 'Your Agency Vision Made Real,',
  subcopy:
    'Creative Agency Owners, we’ve got you. Impact, Freedom and Profit is what we want for you, and we know exactly how to get you there.',
  kicker: 'You scale your agency. We simplify your life.',
  cta: { label: 'Book A Call', href: '#contact' },
} as const;

/**
 * The Journey To Your Sucess.
 * El typo "Sucess" es del Figma: se pinta tal cual, y la versión
 * correcta va a la metadata que consumen los crawlers.
 */
export const journey = {
  heading: 'The Journey To Your Success',
  headingDisplay: 'The Journey To Your Sucess',
  body:
    "The stories of our clients' success inspire us. We've helped them navigate the challenges that come with growth and development, so they can succeed on their own terms.",
  /** offset = desplazamiento vertical en px del Figma, sobre 489 de banda */
  portraits: [
    { src: '/img/journey-1.png', offset: 70,  alt: 'Agency owner looking ahead, wearing red-rimmed glasses' },
    { src: '/img/journey-2.png', offset: 124, alt: 'Agency founder laughing during a portrait session' },
    { src: '/img/journey-3.png', offset: 66,  alt: 'Creative professional standing outside a glass office building' },
    { src: '/img/journey-4.png', offset: 138, alt: 'Agency owner smiling on a city street' },
    { src: '/img/journey-5.png', offset: 65,  alt: 'Agency partner in a suit leaning against a stone column' },
    { src: '/img/journey-6.png', offset: 140, alt: 'Creative director in a denim jacket, smiling' },
    { src: '/img/journey-7.png', offset: 106, alt: 'Agency founder with a green scarf, looking at the camera' },
  ],
} as const;

/**
 * Banda de datos. Las cifras van con el espacio tras el símbolo
 * ("$ 3,000,000") tal como están escritas en el Figma.
 * `plain` es la forma normalizada para el JSON-LD y catalog.txt.
 */
export const stats = {
  eyebrowDisplay: 'Ready to find your tribe?',
  headingLead: 'Individual Clarity and',
  headingAccent: 'Collective Confidence',
  media: {
    src: '/img/stats-media.png',
    alt: 'Two agency partners high-fiving across a desk after reviewing their numbers together',
  },
  figures: [
    { value: '$ 3,000,000', plain: '$3,000,000', label: 'Revenue Added In Just 90 Days' },
    { value: '$ 1,500,000', plain: '$1,500,000', label: 'Profit Per Partner Per Year' },
    { value: '897%', plain: '897%', label: 'Revenue Increase in 9 Months' },
    { value: '83%', plain: '83%', label: 'Efficiency Gains' },
  ],
} as const;

/**
 * Las dos ofertas. Del Figma:
 *   bloque superior   612 × 418, púrpura #8686F2 / verde #32E0A5
 *   insignia          círculo de 130, solapando la esquina inferior
 *   barra de título   611 × 76, azul tinta, Arboria Medium 36 blanco
 *   cuerpo            Work Sans 18/30, tracking -0.36, #4D4D4D
 *   CTA               195 × 59, púrpura, "Get Started", sin redondeo
 */
export const programs = [
  {
    id: 'agency-accelerator',
    badgeTop: '5 to 6',
    badgeBottom: 'Figures',
    tone: 'purple' as const,
    art: '/img/program-accelerator.svg',
    badge: '5 to 6 Figures',
    name: 'Agency Accelerator',
    /** Fiel al diseño, typo incluido */
    nameDisplay: 'Agency Accelerator',
    body: 'Build the systems to get a consistent flow of new clients each month, streamline your services to maximize profit, and get your free time back. Some of our clients now work as little as 5 hours a week while still growing.',
    cta: { label: 'Get Started', href: '#contact' },
    aiDescription:
      'For agencies at 5 to 6 figures: systems for consistent monthly client flow, streamlined services, higher profit, and reclaimed founder time.',
  },
  {
    id: 'scale-partnership',
    badgeTop: '6 to 7',
    badgeBottom: 'Figures',
    tone: 'green' as const,
    art: '/img/program-partnership.svg',
    badge: '6 to 7 Figures',
    name: 'Scale Partnership',
    nameDisplay: 'Scale Partnership',
    body: 'This is a premium group for agencies already at 7-figures that are ready to scale to $10M+ revenue per year. You gain access to business wisdom you can use to create sustainable growth for your creative agency.\n\nA tailored approach that will help you maximize profits, create a management structure that works for you, develop a long-term vision for your agency, and maximize valuation.',
    cta: { label: 'Get Started', href: '#contact' },
    aiDescription:
      'For 6 to 7 figure agencies scaling to $10M+/year: sustainable growth, management structure, long-term vision, and maximized valuation.',
  },
] as const;

/**
 * Los seis pilares. `display` reproduce los typos del Figma,
 * `correct` alimenta la metadata.
 */
export const scaleMethod = [
  { display: 'Positioning', correct: 'Positioning' },
  { display: 'Expertize', correct: 'Expertise' },
  { display: 'Specialization', correct: 'Specialization' },
  { display: 'Authority', correct: 'Authority' },
  { display: 'Seamless Operation', correct: 'Seamless Operation' },
  { display: 'Recurning Revenue', correct: 'Recurring Revenue' },
] as const;

export const footerColumns = [
  {
    title: 'Menu',
    links: [
      { label: 'Success Stories', href: '#success-stories' },
      { label: 'Services', href: '#programs' },
      { label: 'About', href: '#about' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Facebook Group', href: '#resources' },
      { label: 'Books', href: '#resources' },
      { label: 'Free Trainings', href: '#resources' },
      { label: 'Podcast', href: '#resources' },
    ],
  },
] as const;
