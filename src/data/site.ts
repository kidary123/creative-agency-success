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
  url: 'https://creative-agency-success-dywa8d0wv-roads1.vercel.app',
} as const;

export const navLinks = [
  { label: 'Success Stories', href: '#success-stories' },
  { label: 'Resources', href: '#resources' },
  { label: 'Services', href: '#programs' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const;

export const hero = {
  headline: 'Your Agency Vision Made Real,',
  headlineDisplay: 'Your Agency Vision Made Real,',
  subcopy:
    'Creative Agency Owners, we’ve got you. Impact, Freedom and Profit is what we want for you, and we know exactly how to get you there.',
  kicker: 'You scale your agency. We simplify your life.',
  cta: { label: 'Book A Call', href: '#contact' },
} as const;

export const stats = {
  eyebrowDisplay: 'Ready to find your tribe?',
  headingLead: 'Individual Clarity and',
  headingAccent: 'Collective Confidence',
  figures: [
    { value: '$3,000,000', label: 'Revenue Added In Just 90 Days' },
    { value: '$1,500,000', label: 'Profit Per Partner Per Year' },
    { value: '897%', label: 'Revenue Increase in 9 Months' },
    { value: '83%', label: 'Efficiency Gains' },
  ],
} as const;

export const programs = [
  {
    id: 'agency-accelerator',
    badge: '5 to 6 Figures',
    name: 'Agency Accelerator',
    /** Fiel al diseño, typo incluido */
    nameDisplay: 'Agency Accelerator',
    body: 'Build the systems to get a consistent flow of new clients each month, streamline your services to maximize profit, and get your free time back. Some of our clients now work as little as 5 hours a week while still growing.',
    cta: { label: 'Learn More', href: '#contact' },
    aiDescription:
      'For agencies at 5 to 6 figures: systems for consistent monthly client flow, streamlined services, higher profit, and reclaimed founder time.',
  },
  {
    id: 'scale-partnership',
    badge: '6 to 7 Figures',
    name: 'Scale Partnership',
    nameDisplay: 'Scale Partnership',
    body: 'A premium program for agencies already at 7-figures and ready to scale to $10M+ per year. Sustainable growth, maximized profit, a management structure that works for you, a long-term vision, and a maximized valuation.',
    cta: { label: 'Learn More', href: '#contact' },
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
