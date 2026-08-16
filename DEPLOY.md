# Deploy

Run everything from the project folder:

```powershell
cd "$env:USERPROFILE\Desktop\New folder"
```

Git is already initialised, on `main`, with the first commit made and
`node_modules` ignored. Two steps left.

---

## 1. Push to GitHub

Create an **empty public** repo at <https://github.com/new> — name it
`creative-agency-success`. Do **not** tick "Add a README", `.gitignore`
or a license; the repo must be empty or the push is rejected.

Then, replacing `YOUR-USERNAME`:

```powershell
git remote add origin https://github.com/YOUR-USERNAME/creative-agency-success.git
git push -u origin main
```

---

## 2. Deploy to Vercel

```powershell
npx vercel login
npx vercel --prod
```

`vercel login` opens the browser — authenticate there, not in the terminal.
Vercel auto-detects Astro; accept the defaults (build `npm run build`,
output `dist`). It prints the production URL when it finishes.

---

## 3. Set the real URL

Vercel gives you the live domain. Open `src/data/site.ts` and replace:

```ts
url: 'https://creative-agency-success.vercel.app',
```

with the real one. That single value feeds the canonical link, the
`og:url`, and the `url` field in the JSON-LD — if it's wrong, the
structured data points at a domain that doesn't exist.

Then ship it:

```powershell
git add -A
git commit -m "Set production URL"
git push
npx vercel --prod
```

---

## 4. Post-deploy checks

Four routes must respond on the production domain:

| Route            | What it is                                    |
| ---------------- | --------------------------------------------- |
| `/`              | the landing page                               |
| `/llms.txt`      | AI overview                                    |
| `/catalog.txt`   | machine-readable catalog                       |
| `/ai/about.md`   | one of the files `llms.txt` links to           |

Then paste the production URL into <https://validator.schema.org/> and
confirm both JSON-LD blocks parse (`Organization` and `ItemList`).

---

## Local commands

| Command           | What it does                             |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Dev server at http://localhost:4321      |
| `npm run build`   | Type-check, then build to `dist/`        |
| `npm run preview` | Serve the production build locally       |
| `npm run check`   | Type-check only                          |
