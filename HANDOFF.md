# Creative Agency Success — estado del proyecto

Documento de continuidad. Recoge dónde está el proyecto, cómo se
trabaja con él y qué decisiones se tomaron y por qué.

Última actualización: 17 de agosto de 2026.

---

## 1. Entregables

| | |
|---|---|
| **Sitio en vivo** | https://creative-agency-success.vercel.app |
| **Repositorio** | https://github.com/kidary123/creative-agency-success |
| **Figma de origen** | `jXvZyzTAejZDdFwKlHIScm` — *Creative Agency Success Website (Copy) (Copy)* |
| **Loom** | Pendiente — lo graba el usuario |

El proyecto es una reconstrucción del diseño de Figma en **Astro
7.2.2**, desplegada y con metadatos legibles por IA.

---

## 2. Cómo se trabaja

Todo va por scripts de doble clic en la raíz del proyecto (están en
`.gitignore`, no forman parte del entregable):

| Script | Qué hace |
|---|---|
| `DEV.bat` | Servidor local en `localhost:4321` |
| `GET-ASSETS.bat` | Descarga los 41 assets de Figma a `public/img/` |
| `DEPLOY-ME.bat` | Commit → push a GitHub → deploy a Vercel → verifica 4 rutas |
| `LOGIN-VERCEL.bat` | Reconecta Vercel cuando el deploy da `Error: Not authorized` |

**Después de `GET-ASSETS` hay que ejecutar siempre:**

```
python scripts/optimize-images.py
```

`GET-ASSETS` restaura los originales de Figma (~84 MB). El script los
recorta, reescala, genera WebP y limpia los SVG. Deja el conjunto en
~16 MB, de los cuales **~1,7 MB son los WebP** que carga el visitante.

### La sesión de Vercel caduca

Pasa cada pocas horas. El síntoma es `Error: Not authorized` en el
paso 2 del deploy. `LOGIN-VERCEL.bat` lo resuelve; el código ya está
en GitHub, no se pierde nada.

### Las URLs de Figma caducan

`assets.json` guarda URLs firmadas que expiran **~7 días** desde su
generación (última: 17/08/2026). Si `GET-ASSETS` empieza a fallar,
hay que volver a pedirlas por el conector de Figma nodo a nodo — el
`nodeId` de cada asset está en el manifiesto.

---

## 3. Arquitectura

```
src/
  data/site.ts          Única fuente de verdad del contenido
  components/           14 componentes, uno por sección
  layouts/BaseLayout.astro
  styles/tokens.css     Sistema visual (colores, tipo, espaciado, motion)
  styles/global.css     Base + utilidades (.cta, .h1…)
  scripts/motion.ts     GSAP + ScrollTrigger, centralizado
scripts/
  optimize-images.py    Recorte, reescalado, WebP y limpieza de SVG
public/
  img/                  41 assets de Figma
  llms.txt  catalog.txt  ai/*.md   Metadatos para IA
```

### Reglas que conviene respetar

- **Ningún componente escribe un valor crudo.** Todo color, tamaño y
  duración sale de `tokens.css`.
- **Las animaciones se declaran con atributos**, no con clases:
  `data-animate="fade-up"`, `data-delay`, `data-stagger`. El único
  archivo que sabe de GSAP es `motion.ts`.
- **Los typos del Figma se conservan en pantalla.** `site.ts` guarda
  `display` (fiel al diseño) y `correct` (para los metadatos de IA):
  *Sucess*, *Expertize*, *Recurning Revenue*.

---

## 4. Orden de las secciones

Sacado de la coordenada Y de cada titular en el Figma, que es el
único dato fiable: el lienzo tiene varias maquetaciones superpuestas,
así que los fondos no sirven para ordenar.

| # | Componente | Y en el Figma |
|---|---|---|
| 1 | `Hero` | 100 |
| 2 | `Kicker` | 715 |
| 3 | `Journey` | 899 |
| 4 | `FeaturedIn` | 618 · *ver nota* |
| 5 | `StatsBand` | 2031 |
| 6 | `ProgramCards` | 3286 |
| 7 | `Testimonials` | 3919 |
| 8 | `ScaleMethod` | 4505 |
| 9 | `Resources` | 5598 |
| 10 | `PathsToSuccess` | 6530 |

**Nota sobre Featured in:** por coordenadas iría antes de Journey,
pero el usuario pidió expresamente la fila de logos **debajo** del
acordeón de retratos, y solo el kicker arriba. Es una decisión suya
consciente, no un descuido.

---

## 5. Decisiones de diseño y sus porqués

### Tipografía — Outfit, no Jost

El Figma usa **Arboria** (Adobe Fonts, comercial: no se puede servir
sin licencia). La sustituta es **Outfit**, y el rasgo que decide es
la **'a' de un solo piso** — un círculo con asta. Arboria y Outfit la
comparten; Jost la tiene de dos pisos, y por eso el texto no se
parecía por mucho que coincidieran tamaños y pesos. Outfit comparte
además la 'g' de un piso, los descendentes cortos y los cuencos
circulares.

Una sola familia en todo el sitio (`--font-display` apunta a
`--font-sans`). Si algún día se licencia Arboria, basta anteponerla
en `--font-sans` de `tokens.css`.

### Hover de los botones — inversión, no aclarado

Component 1 del Figma tiene dos variantes:

| | Fondo | Texto |
|---|---|---|
| Reposo (38:163) | verde `#32E0A5` | azul `#021E46` |
| Hover (38:162) | azul `#021E46` | verde `#32E0A5` |

Intercambia fondo y texto. No aclara, no desplaza. Vive en las clases
`.cta--green` / `.cta--purple` de `global.css` para que los cinco
botones del sitio se comporten igual.

### Los CTA van en color cruzado

Verde en Agency Accelerator (bloque púrpura), púrpura en Scale
Partnership (bloque verde). Lo mismo con la insignia circular y con
el color de su texto (negro sobre verde, blanco sobre púrpura).

### Hover de las formas — contrarrotación

Program cards, Scale Method y Paths To Success comparten recurso: las
dos capas superpuestas giran en **sentidos opuestos**. Los ángulos
salen de restar la variante en reposo a la de hover.

| Sección | Relleno | Contorno |
|---|---|---|
| Agency Accelerator | −7.21° | +6.97° |
| Scale Partnership | −5.68° | +8.74° |
| Paths To Success | −4.04° | +3.42° |

En Scale Method el hover es distinto: el polígono azul claro gira
**1.74°** y se desplaza, la foto crece por los cuatro lados, y el
botón de play **se rellena de blanco sin moverse**. Se transicionan
los `inset` reales del archivo en vez de aproximarlo con un `scale`.

Los tres respetan `prefers-reduced-motion`.

### Acordeón de Journey

Siete retratos que se expanden al pasar el ratón. Al abrirse, la foto
gira de retrato (180:348) a **horizontal (16:10)** — es lo que más
recorta el alto. El ratio de expansión está topado en `2.6` y 460px:
sin tope, en una pantalla de 2560 el slot se iba por encima de 900px.

Cada foto tiene su propio `object-position` calibrado a mano para que
la cara quede dentro del recorte horizontal.

El panel está posicionado en absoluto, así que **no suma altura**. Se
mide con JS al abrirse y se reserva esa altura en la banda; si no, se
montaba encima de la sección de abajo.

### Fondo diagonal de la banda de datos

`Rectangle 10` (42:72) es una banda arena cuyo borde superior cae
~20px de izquierda a derecha. Va con `clip-path`, no con el SVG
exportado: el export tiene proporción fija 1440×842 y al estirarlo el
ángulo cambia con el ancho. Con `clip-path` el corte mantiene su
altura en píxeles y se lee igual en 1280 que en 2560.

### El CTA del hero cruza el borde

En el archivo va de y=656 a 715 y la banda arena acaba en 696: **19px
del botón quedan sobre la sección blanca**. El hero pierde su relleno
inferior, la rejilla estira ambas columnas, el texto usa
`justify-content: flex-end` y el botón baja 19px con margen negativo.
La banda de abajo (`Kicker`) suma esos 19px a su relleno superior.

---

## 6. Trampas encontradas (para no repetirlas)

### Astro no propaga el scope a componentes sin estilos

`Picture.astro` no tiene `<style>` propio, así que sus elementos **no
reciben** el atributo `data-astro-cid-*`. Una regla escrita en el
padre se compila como `.clase[data-astro-cid-…]` y **no casa con
nada**.

Esto tuvo al hombre del hero pintándose en flujo normal a tamaño
natural, desbordando el heptágono. La solución: envolver el
`<Picture>` en un `<div>` que sí pertenezca al componente padre. El
resto de secciones no lo sufrían porque usan selectores descendentes
con `:global()`.

**Si algo posicionado no responde al CSS, mirar primero el HTML
compilado y comprobar si lleva el atributo de scope.**

### Recomprimir destruye las imágenes

`optimize-images.py` es **idempotente** a propósito: lleva un registro
en `public/img/.optimized.json` con el tamaño de cada archivo ya
procesado y salta los que coinciden.

WebP tiene pérdida: recomprimir no parte del original, parte del
resultado anterior. Ejecutarlo cuatro veces seguidas degradó todas
las fotos del sitio. **No quitar el registro.**

### Figma cuela un fondo gris en los SVG

Al exportar un nodo cuyo marco no tiene relleno, Figma añade un
`<rect>` del tamaño del lienzo con el gris de su interfaz
(`#E5E5E5`). En el archivo no se ve; en la web sale como un recuadro
detrás del logo. `optimize-images.py` lo limpia, y solo si el rect
cubre todo el `viewBox` y lleva ese gris exacto.

### El lienzo tiene maquetaciones superpuestas

Hay varios footers, varios hero y varias bandas apilados en las
mismas coordenadas. **Para ordenar secciones hay que usar la Y de los
titulares, no la de los fondos.**

### Los estados de hover están en variantes de componente

No se ven en el lienzo. Hay que buscar el component set y comparar la
variante por defecto con la segunda:

| Componente | Reposo | Hover |
|---|---|---|
| Botón CTA | 38:163 | 38:162 |
| Arte Accelerator | 89:136 | 138:143 |
| Arte Partnership | 89:216 | 138:193 |
| Diagrama Scale | 89:289 | 89:288 |
| Foto Paths | 233:1887 | 233:1886 |
| Learn More | 191:263 | 191:262 |

Los **seis testimonios** son igual: seis variantes del mismo
componente (`Property 1=Group 30..35`), no seis bloques en el lienzo.

---

## 7. Contenido pendiente

- **Nombres de los testimonios.** Las seis citas son reales y están
  puestas, pero las seis firman `- Name` en el propio Figma. Falta el
  copy real.
- **Tarjetas de Resources.** Las cuatro comparten el mismo párrafo en
  el archivo (relleno de maquetación). Las fotos y los iconos sí son
  distintos.
- **Formulario del newsletter.** Valida y confirma en cliente; no hay
  backend. Cambiar el `action` cuando exista endpoint.
- **Arboria.** Si se licencia, anteponerla en `--font-sans`.

---

## 8. Metadatos para IA

Ya generados y verificados en producción (los cuatro devuelven 200):

- `/llms.txt` — resumen navegable con enlaces a las fichas
- `/catalog.txt` — catálogo plano, legible por máquina
- `/ai/about.md`, `programs.md`, `results.md`, `scale-method.md`,
  `resources.md`
- JSON-LD en `StructuredData.astro`: Organization, Service,
  OfferCatalog y Dataset de resultados

Los typos del diseño **no** se propagan aquí: la metadata usa siempre
el campo `correct` de `site.ts`.
