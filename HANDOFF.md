# Handoff — rebuild visual desde Figma

> Documento para retomar el trabajo en una sesión nueva con el conector de
> Figma ya autorizado. Contiene todo el estado actual y el plan.

---

## Estado actual

| | |
|---|---|
| **Live** | https://creative-agency-success-roads1.vercel.app |
| **Repo** | https://github.com/kidary123/creative-agency-success |
| **Proyecto Vercel** | `roads1/creative-agency-success` (ya enlazado, `.vercel/` presente) |
| **Deployment Protection** | desactivada — el sitio es público |
| **Stack** | Astro 7.2.2 · CSS nativo con design tokens · GSAP + ScrollTrigger |

Verificado en producción: `/`, `/llms.txt`, `/catalog.txt`, `/ai/about.md`
responden 200 con los content-types correctos. `astro check` → 0 errores.

---

## Qué falta

### 1. Fidelidad visual (el trabajo grande)

El build actual sigue **el copy, el orden de secciones y las cifras del
brief**, pero con dirección de arte propia — el Figma nunca fue accesible.
Ahora hay que hacerlo coincidir con el diseño real.

**Figma:**
https://www.figma.com/design/jXvZyzTAejZDdFwKlHIScm/Creative-Agency-Success-Website--Copy---Copy-?node-id=0-1&m=dev

**Alcance acordado: la página completa.** Las cinco del brief ya existen
como componentes; el resto hay que crearlas.

| # | Sección | Estado |
|---|---------|--------|
| 1 | Header / nav | existe — reajustar |
| 2 | Hero | existe — reajustar |
| 3 | Stats band | existe — reajustar |
| 4 | Program cards | existe — reajustar |
| 5 | Footer | existe — reajustar |
| 6 | Journey To Your Success | **crear** |
| 7 | Featured in (logos de prensa) | **crear** |
| 8 | Testimonials | **crear** |
| 9 | The Scale Method (6 pilares) | **crear** |
| 10 | Resources grid | **crear** |
| 11 | Paths To Success (CTA final) | **crear** |

### 2. Canonical URL

`src/data/site.ts` línea 20 debe quedar en el dominio estable
(`https://creative-agency-success-roads1.vercel.app`), no en una URL de
deployment con hash. Ya está corregido en local; falta publicar.

### 3. Loom (≤5 min)

---

## Cómo está montado el código

```
src/
├── components/
│   ├── Header.astro          nav + panel móvil
│   ├── Hero.astro            headline + SVG propio (placeholder)
│   ├── StatsBand.astro       media + cuatro cifras
│   ├── ProgramCards.astro    las dos ofertas
│   ├── Footer.astro          columnas + newsletter
│   ├── Logo.astro
│   └── StructuredData.astro  JSON-LD generado desde site.ts
├── data/
│   └── site.ts               ← TODO el copy vive aquí
├── layouts/BaseLayout.astro
├── scripts/motion.ts         único archivo que conoce GSAP
└── styles/
    ├── tokens.css            ← TODO el sistema visual vive aquí
    ├── reset.css
    └── global.css
```

**Dos reglas que hay que respetar al rehacer el visual:**

1. **Ningún componente escribe valores crudos.** Nada de `#hex`, `24px`,
   `0.4s` dentro de un `.astro`. Todo pasa por una variable de
   `tokens.css`. Esto es lo que permite que re-skinear al Figma sea un
   cambio contenido en un solo archivo.

2. **El copy no se escribe en los componentes.** Vive en `site.ts`, que es
   la fuente única que alimenta a la vez la página, el JSON-LD y los
   archivos de metadata IA. Si se duplica, se desincroniza.

**Animación:** se declara en el markup (`data-animate="fade-up"`,
`data-parallax="0.15"`) y la ejecuta `motion.ts`. Dos garantías que no hay
que romper: el contenido sigue visible si JS falla, y
`prefers-reduced-motion` se respeta vía `gsap.matchMedia()`.

---

## Decisión sobre las erratas — mantener

El Figma tiene tres erratas: **"Sucess"**, **"Expertize"**,
**"Recurning Revenue"**. `site.ts` guarda `display` y `correct` en paralelo:
la página renderiza la errata (fidelidad al diseño), y `llms.txt`,
`catalog.txt` y el JSON-LD usan la ortografía correcta. El brief lo pide
explícitamente así.

---

## Plan para la sesión nueva

1. Extraer del Figma, por orden: **tokens primero** — paleta, escala
   tipográfica, familia y pesos, radios, sombras, grid y anchos de
   contenedor. Volcarlos en `tokens.css`.
2. Exportar assets a `public/` (2x): logo, gráfico del hero, imagen del
   stats band, logos de prensa, fotos de testimonios, iconos de pilares.
3. Sección por sección, en orden de página. Ajustar las cinco existentes
   antes de crear las nuevas.
4. Añadir el copy de las secciones nuevas a `site.ts` y ampliar
   `llms.txt` / `catalog.txt` / `public/ai/*.md` si aportan información
   real de la empresa (testimonios y método sí aportan).
5. `npm run check` y `npm run build` en verde antes de desplegar.
6. Desplegar con `DEPLOY-ME.bat`.

---

## Publicar cambios

Doble clic en `DEPLOY-ME.bat`. Hace commit, push a GitHub, deploy a
producción en Vercel, y al final comprueba con un HEAD que las cuatro
rutas clave devuelven 200. Todo queda grabado en `deploy-log.txt`.
