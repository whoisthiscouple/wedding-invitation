# CLAUDE.md — Roop & Dhvani Wedding Invite

## Project Overview
Single-page wedding invitation site for **Roop Lala** (groom) & **Dhvani Shah** (bride), married **25 November 2026**.
Premium "dark garden reveal" intro (envelope opens into a paper invitation), then a full scrolling site (story, events, countdown, families, gallery, venue, RSVP, finale). Deployed to GitHub Pages.

**Stack:** React 19 + TypeScript + Vite 7 + Tailwind CSS 4 (CSS-first `@theme`) + Framer Motion.

- Live site: `https://whoisthiscouple.github.io/wedding-invitation/` (official `actions/deploy-pages`, no `gh-pages` branch)
- Remote: `origin` → github.com/whoisthiscouple/wedding-invitation
- Working branch: `main` (deploys on every push to `main`).

## Scripts
```sh
npm run dev        # vite dev server (uses local .env)
npm run build      # vite build → dist/
npm run preview    # preview the production build
npm run typecheck  # tsc --noEmit
```

## Key Files
| Path | Role |
|------|------|
| `src/App.tsx` | Root. `history.scrollRestoration = "manual"` + `scrollTo(0,0)` on mount (resets to top on refresh). Renders `EnvelopeIntro` overlay gating the rest. |
| `src/components/EnvelopeIntro.tsx` | The intro: dark garden scene → envelope → paper invitation → `onComplete`. |
| `src/index.css` | Tailwind `@theme` palette + fonts, `.intro-*` intro styles, `.btn-reveal`, `.text-gold-shine`, keyframes. |
| `src/components/Nav.tsx` | Fixed nav, scroll-triggered bg, mobile hamburger. |
| `src/components/Hero.tsx` | Full-screen emerald hero, R&D logo, gold-shine initials, gold particle rise. |
| `src/components/OurStory.tsx` | Timeline chapters (data-driven). |
| `src/components/Events.tsx` | 3-card event grid (data-driven). |
| `src/components/Countdown.tsx` | Live countdown; golden message when it hits zero. |
| `src/components/Families.tsx` | Two family cards (data-driven). |
| `src/components/Gallery.tsx` | Masonry (CSS columns) + lightbox; images from Google Drive. |
| `src/components/Venue.tsx` | Details "to be announced" but Google Map pinned to Adajan, Surat, Gujarat. |
| `src/components/RSVP.tsx` | Envelope that opens into message + form → StaticForms. |
| `src/components/FinalScene.tsx` | Closing section. |
| `src/components/Divider.tsx` | Gold line + ring motif section divider. |
| `index.html` | Fonts (Playfair Display, Cormorant Garamond, Jost, Great Vibes), inline SVG favicon. |
| `vite.config.ts` | `base: ""` (relative paths for GH Pages), `@` → `src/`. |
| `.env` / `.env.example` | `VITE_STATICFORMS_API_KEY` (`.env` is gitignored). |
| `.github/workflows/deploy.yml` | CI build+deploy on push to `create-invite` (uses secret `STATIC_FORM_API_KEY`). |
| `public/images/` | `logo.png`, `stamp-seal-transparent.png`, `stamp-seal.png`. |

> Reference design project lives in the sibling folder `../reveal-animation` (own Vite app). The intro was adapted from it and recolored to this site's palette — when the reference is updated, port those changes.

## Couple / Event Facts
- **Wedding date:** 25 November 2026 (Countdown uses `2026-11-25T00:00:00+05:30`).
- **Events:**
  1. Bridal Shower — 24 NOVEMBER, 4:00 PM (maroon/gold accent)
  2. The Wedding Ceremony — 25 NOVEMBER, 10:00 AM (emerald accent)
  3. Reception — 25 NOVEMBER, 7:30 PM (gold/emerald accent)
- **Families:**
  - Groom — **Family of Roop**, Mr. & Mrs. Lala: Abhijit (Father), Ruby (Mother), Neha (Sister), Son of Ruby Lala.
  - Bride — **Family of Dhvani**, Mr. & Mrs. Shah: Atul (Father), Sonal (Mother), Manan (Brother), Daughter of Reena Shah.
- **Story chapters:** 2020 Serendipitous Meeting · 2022 Falling in Step · 2023 A Question of Forever · 2026 Two Worlds, One Family · 2026 The Celebration Begins. Note two chapters share `year: "2026"` → the map uses `key={i}`, not the year.

## Design System
### Colors (Tailwind tokens + CSS vars)
| Token | Hex | Use |
|-------|-----|-----|
| `ivory` | `#F8F4EC` | Page BG |
| `emerald` | `#0F5C4D` | Dark sections, headings |
| `emerald-light` | `#1A7A66` | |
| `emerald-dark` | `#0A3F34` | Intro shell gradient base, venue BG |
| `maroon` | `#7A1F2A` | Bride accent, paper names |
| `maroon-light` | `#9A2F3A` | |
| `gold` | `#C9A227` | Accents, borders, buttons |
| `gold-light` | `#E0BE4F` | Hover/shine |
| `gold-dark` | `#A07E1A` | Shine gradient |
| `charcoal` / `charcoal-light` | `#2E2E2E` / `#555555` | Body text |
| `warmwhite` | `#FFFAF5` | Card/envelope/paper BG |

### Fonts
`font-display` Playfair Display · `font-body` Cormorant Garamond · `font-label` Jost (uppercase tracking) · Great Vibes (loaded, unused in HTML).

### Custom CSS (index.css)
- `.text-gold-shine` — metallic gold gradient `background-clip:text` with 4s `gold-shimmer`. Used on R & D initials in Hero and intro names/paper.
- `.btn-reveal` — border-reveal hover (used by Hero/invite CTA class buttons, NOT the intro enter button).
- `.linen-texture` — subtle crosshatch overlay for dark sections.
- `.intro-*` block — all intro styles are namespaced `intro-` to avoid clashes.

## Envelope Intro (EnvelopeIntro.tsx) — details worth knowing
### States & timing
`closed` → `opening` (2200ms) → `revealed` → `exiting` (1200ms) → `onComplete`. Auto-advances on the initial wheel/touchmove (closed) and wheel/touchstart (revealed); front gate is `interactedRef` so scroll ≠ double-trigger.

### Sealed scene
- Dark garden shell: emerald radial glows (big) + `.intro-grain` noise + gold-noise filter.
- Botanical corners: `BotanicalCorner` SVG with `leafNodes` anchored to the stem; leaves sway via `.intro-botanical-leaf` + `intro-leaf-sway` keyframes (disabled under `prefers-reduced-motion`).
- `GLOW_PARTICLES`: gold orbs rising (`intro-particle-rise`), deliberately placed near edges/corners so the middle stays clear, faded halos.
- Names lock-up: staggered word reveal (no filter — filters cause the gradient-shine initials to look right-clipped), `&` pop via spring; initials use `.text-gold-shine` with `padding-right: 0.04em` to avoid cropping.
- Envelope (gold family): `.intro-envelope` with `intro-envelope-back/mark/flap/front`. Wax seal is `stamp-seal-transparent.png` at `clamp(88px,16vw,112px)`, `top:55%` (covers bottom of the V).
- "Break the seal" shimmer button (`.intro-open-cta`) + hint *"The next chapter unfolds beneath this note."*

### Revealed scene
- Envelope unfolds (flap `rotateX 180`, backface hidden); paper card rises.
- Paper (`intro-paper`): ivory, gold inner frame, corner L-markers, emboss pattern. **No** green leaf emboss at top/bottom anymore (removed).
- Content: logo → "Together with Their Families" → **Roop & Dhvani** (maroon, `.text-gold-shine` initials, `white-space: nowrap`, `clamp(2.2rem,6.5vw,2.9rem)` so it never wraps) → "request the pleasure of your company" → date "25 — NOVEMBER — 2026" → "Celebration Venue / details to be announced".
- Enter button: **borderless** (no `.btn-reveal`) → `.intro-enter-btn`; hover = gold underline sweeping from left + arrow nudging up-right + text shifts maroon.
- Caption: *"An invitation, made with love."*

### Responsive
`@media (max-width:540px)` and `(max-width:380px)` scale names, paper names, kicker, date, hint. `(max-height:680px)` and `(max-height:760px)` compact layouts. `.intro-scroll` is `overflow-y:auto` with `100svh` min-height so short screens scroll the intro.

## Gallery
Six photos pulled from **Google Drive** using the thumbnail endpoint:
`https://drive.google.com/thumbnail?id=<FILE_ID>&sz=w1200`
Asset files/prompts live in the parent folder (`Logo-No-BG.png`, `Stamp Seal.png`, `invite.zip`). Original full-size Drive links (convertible) are in the project history; captions: "Traditions, held close" / "The dance dip" / "The ring, the question, the yes" / "Two souls, one frame" / "Hand in hand, always" / "Mehendi, drawn in love".
> Drive images require the file(s) shared as **"Anyone with the link can view"** or they 403.

## Venue
`address` text stays "Venue details to be announced" (shown copy + "VIEW ON MAP" link), but the embedded map iframe + search link query **`mapLocation = "Adajan, Surat, Gujarat"`**.

## RSVP (StaticForms)
- Envelope opens → message: *"He waited this long to ask. Don't be late to celebrate."* + "Roop & Dhvani"; then the form.
- Closed state line: *"We request the pleasure."* (bottom-anchored so the flap doesn't cover it).
- Submit POSTs to `https://api.staticforms.dev/submit` with **`accessKey`** = `import.meta.env.VITE_STATICFORMS_API_KEY` (not `apiKey`).
- StaticForms access key lives in local `.env` (gitignored, see `.env.example`). For CI, the repo secret `STATIC_FORM_API_KEY` holds the same value — never commit the real key.

## Env vars
| Variable | Purpose |
|----------|---------|
| `VITE_STATICFORMS_API_KEY` | StaticForms access key (client-side; always inlined into the bundle). |

## Deploy
- **CI (only method):** push to `main` → `.github/workflows/deploy.yml` builds with the `STATIC_FORM_API_KEY` secret and publishes via the official `actions/deploy-pages`.
- `dist/` is gitignored and never committed. `vite.config.ts` sets `base: "/wedding-invitation/"` so assets resolve under the project-pages subpath.

### How the deploy workflow works (`.github/workflows/deploy.yml`)
1. **Trigger:** `on.push.branches: [main]` plus `workflow_dispatch` for manual runs.
2. **Permissions:** `contents: read`, `pages: write`, `id-token: write` (OIDC for the official Pages deploy, no branch push needed).
3. **Concurrency:** `group: pages`, `cancel-in-progress: true` so overlapping pushes don't queue duplicate deploys.
4. **Build job:** `actions/checkout@v4`, `actions/setup-node@v4` with `node-version: 20` and `cache: npm`, then `npm ci` (fails if `package-lock.json` is out of sync).
5. **Build env:** `npm run build` with `VITE_STATICFORMS_API_KEY: ${{ secrets.STATIC_FORM_API_KEY }}` injected — Vite inlines it into the bundle (same value as local `.env`). Keep the repo secret in sync if the token rotates.
6. **Publish:** `actions/upload-pages-artifact@v3` uploads `dist/`; the `deploy` job (`environment: github-pages`) releases it via `actions/deploy-pages@v4`. Site serves at `https://whoisthiscouple.github.io/wedding-invitation/`.
7. **Result:** each run shows under Actions → "Deploy to GitHub Pages"; green check + updated site means live, usually < 2 minutes.

## Conventions & gotchas
- No code comments unless asked. Concise responses.
- Strict TS: `noUnusedLocals`/`noUnusedParameters` on. Verify with `npm run typecheck` (needs `@types/node`) or `npm run build`.
- Don't add `filter: blur(...)` animations above `.text-gold-shine` text — persistent `blur(0px)` layers clip gradient-clip glyphs (R/D cropped). Fixed via no-filter reveal.
- Names that must stay on a line use `white-space: nowrap` (paper names).
- Keep intro styles namespaced `.intro-`; match the palette tokens rather than hardcoding stray hexes.
- Reference updates in `../reveal-animation` should be ported to `EnvelopeIntro` / `.intro-*` CSS, recolored.