# Bead Buddy (v3.2)

Live site: https://chowkuanlaw.github.io/beads-buddy/

A bilingual English/Mandarin Soroban learning app for children.

## v3.1 design update

- No emoji in buttons, navigation, feedback, or scoring.
- Neutral palette, restrained typography, clean spacing, and simple numbered learning levels.
- Tabler Icons inline SVGs for New, Back, Next, Play, Pause, Hear and Check; no runtime icon dependency.
- Mobile-friendly layout keeps the calculation, bead board, formula, controls and answer in one view.
- Existing 25 animated beads, four levels, random question generation, up to 40 numbers in custom expressions, English/Mandarin narration and practice are preserved.

## Open-source icons

Inline action icons sourced from [Tabler Icons](https://github.com/tabler/tabler-icons), copyright (c) 2020–2026 Paweł Kuna, used under the MIT License. See [TABLER_ICONS_LICENSE.txt](./TABLER_ICONS_LICENSE.txt).

## Project layout

- `index.html` – markup; `styles.css` – styles; `app.js` – lesson logic (rods are generated in JS).
- `manifest.webmanifest`, `sw.js`, `icon.svg` – installable, works offline (network-first, cached fallback). Bump `CACHE` in `sw.js` when adding files.
- `tests/logic.test.mjs` – `node tests/logic.test.mjs`, no dependencies.

## Hosting

Deploy the repository root `index.html` through GitHub Pages, branch `main`, folder `/(root)`. No build step, CDN, login, or server required. Voice uses the browser's installed speech synthesis voices.

## Limits

The five-rod Soroban represents whole numbers from 0–99,999, intermediate totals must be nonnegative, division must be exact, and multiplication/division equal-group demonstrations are limited to 12 groups. Parentheses are not yet supported.

## v3.2 changes

- Step slider hit area is no longer clipped; keyboard focus is visible.
- Reveal no longer lets a child earn a point; `3 × 20` now works like `20 × 3`.
- On-screen + − × ÷ keypad; language, level and numbers-per-question are remembered (language defaults from the browser).
- Auto-play waits for narration to finish; bead and keypad labels follow the selected language; errors re-translate on language switch.
- Split into `index.html` / `styles.css` / `app.js`; simplified responsive CSS (page scrolls instead of height hacks); installable PWA with offline support.
- Wording now consistently says "Practice". Added favicon and `tests/logic.test.mjs` (`node tests/logic.test.mjs`).
