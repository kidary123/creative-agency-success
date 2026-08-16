// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

/**
 * Resuelve una ruta del proyecto a una ruta absoluta del sistema.
 * Necesario para que los alias funcionen igual en Windows y en POSIX:
 * la forma '/src/components' se rompe en Windows porque se interpreta
 * como raíz del disco.
 *
 * @param {string} path
 * @returns {string}
 */
const resolvePath = (path) => fileURLToPath(new URL(path, import.meta.url));

// https://astro.build/config
export default defineConfig({
  // Reemplazar por la URL real de Vercel tras el deploy.
  // Alimenta canonical, og:url y el campo url del JSON-LD.
  site: 'https://creative-agency-success.vercel.app',

  server: {
    port: 4321,
    host: true, // permite abrir el sitio desde el celular en la misma red
  },

  build: {
    // Genera /about/index.html en vez de /about.html — URLs limpias
    format: 'directory',
  },

  vite: {
    resolve: {
      /**
       * Forma de array: cada alias coincide solo si el import es
       * exactamente `find` o empieza por `find + '/'`. Por eso '@'
       * captura '@/data/site' pero no '@components/...', que tiene
       * su propia entrada.
       */
      alias: [
        { find: '@components', replacement: resolvePath('./src/components') },
        { find: '@layouts', replacement: resolvePath('./src/layouts') },
        { find: '@styles', replacement: resolvePath('./src/styles') },
        { find: '@scripts', replacement: resolvePath('./src/scripts') },
        { find: '@', replacement: resolvePath('./src') },
      ],
    },
  },
});
