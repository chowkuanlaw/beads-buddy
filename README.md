# Bead Buddy (v3.1)

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

## Hosting

Deploy the repository root `index.html` through GitHub Pages, branch `main`, folder `/(root)`. No build step, CDN, login, or server required. Voice uses the browser's installed speech synthesis voices.

## Limits

The five-rod Soroban represents whole numbers from 0–99,999, intermediate totals must be nonnegative, division must be exact, and multiplication/division equal-group demonstrations are limited to 12 groups. Parentheses are not yet supported.
