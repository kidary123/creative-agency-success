/* ============================================================
   MOTION — capa de animación con GSAP + ScrollTrigger
   ------------------------------------------------------------
   Filosofía: el HTML declara la intención con atributos
   (`data-animate="fade-up"`), no con clases de animación.
   Este archivo es el único que sabe de GSAP.

   Uso en cualquier .astro:
     <h1 data-animate="fade-up">Título</h1>
     <p  data-animate="fade-up" data-delay="0.1">Texto</p>
     <div data-animate="stagger">   <!-- anima a sus hijos -->
       <span>uno</span><span>dos</span>
     </div>
   ============================================================ */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Curva y tiempos por defecto — espejo de los tokens CSS. */
const EASE = 'expo.out';
const DURATION = 1.1;

type Recipe = {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
};

/** Recetas disponibles vía data-animate="…" */
const recipes: Record<string, Recipe> = {
  'fade': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  'fade-up': {
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0 },
  },
  'fade-down': {
    from: { opacity: 0, y: -40 },
    to: { opacity: 1, y: 0 },
  },
  'fade-in-left': {
    from: { opacity: 0, x: -48 },
    to: { opacity: 1, x: 0 },
  },
  'fade-in-right': {
    from: { opacity: 0, x: 48 },
    to: { opacity: 1, x: 0 },
  },
  /** Revelado con un punto de fuga sutil — bueno para imágenes */
  'reveal': {
    from: { opacity: 0, y: 64, scale: 0.98 },
    to: { opacity: 1, y: 0, scale: 1 },
  },
  /** Máscara vertical: el contenido "sube" desde detrás de un borde */
  'mask-up': {
    from: { opacity: 0, yPercent: 110 },
    to: { opacity: 1, yPercent: 0 },
  },
};

/**
 * Anima un elemento cuando entra al viewport.
 * `once: true` — no se repite al hacer scroll hacia arriba;
 * repetirlo se siente barato en una landing.
 */
function animateElement(el: HTMLElement) {
  const name = el.dataset.animate || 'fade-up';
  const delay = Number.parseFloat(el.dataset.delay ?? '0') || 0;

  // Contenedor stagger: anima a los hijos directos en cascada
  if (name === 'stagger') {
    const children = Array.from(el.children) as HTMLElement[];
    gsap.set(el, { opacity: 1 });
    gsap.fromTo(
      children,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: DURATION,
        ease: EASE,
        delay,
        stagger: Number.parseFloat(el.dataset.stagger ?? '0.08') || 0.08,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      },
    );
    return;
  }

  const recipe = recipes[name] ?? recipes['fade-up']!;

  gsap.fromTo(el, recipe.from, {
    ...recipe.to,
    duration: DURATION,
    ease: EASE,
    delay,
    scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    // Limpia will-change al terminar: mantenerlo activo consume GPU
    onComplete: () => gsap.set(el, { clearProps: 'willChange' }),
  });
}

/** Parallax suave ligado al scroll. Uso: data-parallax="0.15" */
function initParallax() {
  const targets = document.querySelectorAll<HTMLElement>('[data-parallax]');

  targets.forEach((el) => {
    const strength = Number.parseFloat(el.dataset.parallax ?? '0.15') || 0.15;
    gsap.to(el, {
      yPercent: strength * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement ?? el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true, // ata el progreso al scroll en vez de a un reloj
      },
    });
  });
}

/** Marca la barra de navegación una vez que salimos del hero. */
function initNavState() {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (!nav) return;

  ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    onToggle: (self) => nav.classList.toggle('is-scrolled', self.isActive),
  });
}

export function initMotion() {
  document.documentElement.classList.remove('no-js');

  // gsap.matchMedia respeta prefers-reduced-motion y hace el revert
  // automático: si el usuario cambia la preferencia, todo se limpia.
  const mm = gsap.matchMedia();

  mm.add(
    {
      motionOk: '(prefers-reduced-motion: no-preference)',
      motionReduced: '(prefers-reduced-motion: reduce)',
    },
    (context) => {
      const { motionOk } = context.conditions as { motionOk: boolean };

      const animated = document.querySelectorAll<HTMLElement>('[data-animate]');

      if (!motionOk) {
        // Sin movimiento: el contenido simplemente aparece.
        gsap.set(animated, { opacity: 1, clearProps: 'transform,willChange' });
        return;
      }

      animated.forEach(animateElement);
      initParallax();
    },
  );

  // Fuera del matchMedia: el estado de la nav no es decorativo,
  // debe funcionar aunque el usuario pida movimiento reducido.
  initNavState();
}
