# Deploy — pasos exactos

Todos los comandos se corren desde la carpeta del proyecto:

```powershell
cd "$env:USERPROFILE\Desktop\New folder"
```

---

## 1. Limpiar el estado de git

Inicialicé el repo desde mi entorno, pero el montaje de archivos dejó un
lock a medias. Bórralo y arranca limpio:

```powershell
Remove-Item -Recurse -Force .git
git init
git add -A
git commit -m "Creative Agency Success landing - Astro + AI-readable metadata"
git branch -M main
```

---

## 2. Crear el repo en GitHub

No tienes `gh` CLI, así que este paso es manual:

1. Ve a **https://github.com/new**
2. Nombre: `creative-agency-success` (o el que prefieras)
3. Visibilidad: **Public** — el brief lo pide explícitamente
4. **No** marques "Add a README", "Add .gitignore" ni licencia. El repo
   debe quedar vacío o el push falla.
5. Create repository

Luego conecta y sube (reemplaza `TU-USUARIO`):

```powershell
git remote add origin https://github.com/TU-USUARIO/creative-agency-success.git
git push -u origin main
```

---

## 3. Deploy a Vercel

```powershell
npx vercel login
npx vercel --prod
```

- `vercel login` abre el navegador — autentícate ahí, no en la terminal.
- Vercel detecta Astro solo. Acepta los valores por defecto:
  - Framework: **Astro**
  - Build command: `npm run build`
  - Output directory: `dist`

Al terminar imprime la URL de producción.

---

## 4. Paso final importante

Vercel te da la URL real. Ábrela en `src/data/site.ts` y reemplaza:

```ts
url: 'https://creative-agency-success.vercel.app',
```

por tu URL real. Esto alimenta el `canonical`, las `og:url` y el campo
`url` del JSON-LD — si queda mal, el structured data apunta a un dominio
que no existe.

Luego:

```powershell
git add -A
git commit -m "Set production URL"
git push
npx vercel --prod
```

---

## 5. Verificación post-deploy

Comprueba que estas cuatro rutas responden en la URL de producción:

- `/` — la landing
- `/llms.txt` — el overview para IA
- `/catalog.txt` — el catálogo machine-readable
- `/ai/about.md` — uno de los archivos de contenido enlazados desde llms.txt

Y valida el structured data en:
**https://validator.schema.org/** — pega la URL de producción.

---

## Comandos locales

| Comando           | Qué hace                                |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Servidor local en http://localhost:4321 |
| `npm run build`   | Verifica tipos y compila a `dist/`      |
| `npm run preview` | Sirve el build de producción            |
