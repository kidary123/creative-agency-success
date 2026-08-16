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
  /**
   * Los siete retratos son un acordeón: al pasar el ratón, el slot
   * crece de ~192 a 520px y despliega un panel con el valor, su
   * historia y un CTA. Cada uno corresponde a uno de los siete
   * vértices del heptágono del hero.
   *
   * `offset` = desplazamiento vertical en px del Figma, sobre 489.
   *
   * NOTA: el séptimo slot repite el título "Control" en el archivo,
   * pero su copy habla de escalar y automatizar, y el heptágono
   * lista "Growth" como séptimo valor. Es un fallo de copiado del
   * diseño, no una errata: `title` mantiene la fidelidad visual y
   * `correct` es lo que va a la metadata para IA.
   */
  portraits: [
    {
      src: '/img/journey-1.png',
      offset: 70,
      alt: 'Agency owner looking ahead, wearing red-rimmed glasses',
      focus: '58% 28%',
      title: 'Freedom',
      correct: 'Freedom',
      body: [
        "You know that your agency's success depends on its ability to execute flawlessly on campaigns and projects, but there never seems to be enough time or bandwidth to handle all of the day-to-day process management tasks yourself.",
        "We help you automate and optimize your agency's processes so you can focus on what you do best — creating great work…and being able to leave at 4 PM every day without worrying about your business.",
      ],
    },
    {
      src: '/img/journey-2.png',
      offset: 124,
      alt: 'Agency founder laughing during a portrait session',
      focus: '50% 22%',
      title: 'Fulfillment',
      correct: 'Fulfillment',
      body: [
        "When your work becomes a job, it's hard to maintain the level of personal fulfillment that you once had. This can lead to burnout and creative stagnation.",
        "We'll help you rediscover the joy in your work and be inspired once again. We'll provide the resources and support you need to get back on track and make your dream agency a reality.",
      ],
    },
    {
      src: '/img/journey-3.png',
      offset: 66,
      alt: 'Creative professional standing outside a glass office building',
      focus: '36% 32%',
      title: 'Passion',
      correct: 'Passion',
      body: [
        "When you're starting an agency, it feels like anything is possible. But as time goes on, the challenges seem to mount up and it's harder to stay motivated.",
        "We can help reignite your passion for growing your agency. When you partner with us, you'll not only get access to our exclusive training, tools, and resources, but also a community of other agency owners that will encourage and push you to become your best.",
      ],
    },
    {
      src: '/img/journey-4.png',
      offset: 138,
      alt: 'Agency owner smiling on a city street',
      focus: '48% 42%',
      title: 'Purpose',
      correct: 'Purpose',
      body: [
        "Agencies are started with a dream, but that dream can quickly fade as the day-to-day grind takes over. It's easy to lose sight of your original purpose when you're bogged down with client work and administrative tasks.",
        "We will help you rediscover your purpose again and keep it at the forefront of everything you do. With regular check-ins and a supportive community, your purpose will help you stay focused on what's important and keep your business moving in the right direction.",
      ],
    },
    {
      src: '/img/journey-5.png',
      offset: 65,
      alt: 'Agency partner in a suit leaning against a stone column',
      focus: '63% 30%',
      title: 'Confidence',
      correct: 'Confidence',
      body: [
        "When you're feeling lost or uncertain, it's easy to doubt yourself and your decisions. This can quickly lead to stagnation and a lack of growth.",
        "We'll provide you with actionable steps so you can move forward with certainty. Plus, the community of other agency owners will provide a collective confidence that will help you break through your fear and hesitation.",
      ],
    },
    {
      src: '/img/journey-6.png',
      offset: 140,
      alt: 'Creative director in a denim jacket, smiling',
      focus: '48% 24%',
      title: 'Control',
      correct: 'Control',
      body: [
        'Clarity is impossible when you are bouncing from "fire" to "fire". You feel like you\'re always playing catch-up and never really getting ahead.',
        "We will help you get clear about what you need to do and when you need to do it. You'll learn how to measure the success in every area of your agency so that you can continue making progress.",
      ],
    },
    {
      src: '/img/journey-7.png',
      offset: 106,
      alt: 'Agency founder with a green scarf, looking at the camera',
      focus: '42% 35%',
      /** El archivo dice "Control"; por contenido y por el heptágono es Growth. */
      title: 'Control',
      correct: 'Growth',
      body: [
        "Agency growth is stunted because you're spending too much time working on things that don't scale.",
        "We offer a solution that helps free your time to focus on what's important — scaling your agency and driving results for your clients. As an agency scale partner we will help you automate processes and create systems, so you can spend less time working and more time growing your agency.",
      ],
    },
  ],
  cta: { label: 'Learn More', href: '#contact' },
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
