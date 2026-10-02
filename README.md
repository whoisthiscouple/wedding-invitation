# wedding-invitation

Interactive wedding invitation for Roop & Dhvani — 25 November 2026.
React 19 + TypeScript + Vite 7 + Tailwind CSS 4 + Framer Motion.

Live site: https://whoisthiscouple.github.io/wedding-invitation/

## Scripts

```sh
npm run dev        # vite dev server (uses local .env)
npm run build      # vite build → dist/
npm run preview    # preview the production build
npm run typecheck  # tsc --noEmit
```

## Env

Copy `.env.example` to `.env` and fill in the values:

| Variable | Purpose |
|----------|---------|
| `VITE_STATICFORMS_API_KEY` | StaticForms access key for the RSVP form (inlined into the bundle at build time) |

## Deploy

Push to `main` → `.github/workflows/deploy.yml` builds with the
`STATIC_FORM_API_KEY` repo secret and publishes via the official
`actions/deploy-pages` action. No `gh-pages` branch, `dist/` is gitignored.
