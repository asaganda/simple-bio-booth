## Configure project for static deployment on Netlify

The project currently uses `@lovable.dev/vite-tanstack-config`, which targets a Cloudflare Worker (SSR) build. Netlify static deployment needs a plain client-side SPA build output in `dist/` with `index.html` as the entry, plus the existing `_redirects` for SPA fallback.

The simplest, most reliable approach is to bypass the Lovable Cloudflare-oriented config when building for Netlify and produce a standard Vite SPA build. Since this is a single-page landing page with no server functions, SSR is not needed.

### What the plan does

1. **Add a Netlify-specific Vite config** — `vite.netlify.config.ts` that builds a standard React SPA (no TanStack Start SSR plugin, no Cloudflare plugin). It will include:
   - `@vitejs/plugin-react`
   - `@tailwindcss/vite`
   - `vite-tsconfig-paths`
   - TanStack Router plugin in **code-splitting / file-based routing** mode (generates `routeTree.gen.ts`, no SSR)
   - A tiny `index.html` entry that mounts the router client-side

2. **Add a client entry** — `src/main.tsx` that creates the router via `getRouter()` and renders `<RouterProvider />` into `#root`. This is only used by the Netlify build; the Lovable/Cloudflare build is untouched.

3. **Add `index.html`** at project root (Vite SPA convention) with the meta tags currently in `__root.tsx` hardcoded, plus `<div id="root"></div>` and `<script type="module" src="/src/main.tsx">`.

4. **Add `netlify.toml`** with:
   ```
   [build]
     command = "bun run build:netlify"
     publish = "dist"
   ```
   (SPA fallback is already handled by the existing `public/_redirects`.)

5. **Add `build:netlify` script** to `package.json`:
   ```
   "build:netlify": "vite build --config vite.netlify.config.ts"
   ```

6. **Keep the existing setup intact** — `vite.config.ts`, `wrangler.jsonc`, `src/router.tsx`, `src/routes/__root.tsx`, and `src/routes/index.tsx` are not modified. Lovable preview and publish continue to work exactly as before.

### Deployment steps for you

On Netlify:
- Connect the repo
- Build command: `bun run build:netlify` (or leave blank — `netlify.toml` sets it)
- Publish directory: `dist`
- No environment variables required

### Trade-offs

- **No SSR on Netlify.** The site will be a pure client-rendered SPA. For this landing page that's fine — content is static and SEO-relevant meta tags live in `index.html`.
- If you later add server functions or per-route dynamic `head()` metadata that must be crawlable, we'd need to switch to Netlify's Edge Functions adapter instead. Not needed today.

### Technical notes

- The `__root.tsx` `head()` meta tags won't be injected into the static HTML (no SSR), so the same tags are duplicated into `index.html` for crawlers/social previews. Client-side, TanStack Router will still manage them via `<HeadContent />` during navigation.
- `shellComponent` in `__root.tsx` renders `<html>`/`<body>` — for the SPA build we skip that and let `index.html` provide the shell, rendering `<Outlet />` directly via `RouterProvider`.