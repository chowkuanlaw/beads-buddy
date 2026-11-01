# Bead Buddy · 算盘小达人 v2.0

A bilingual, interactive Soroban learning website for young children.

## Open the app
https://chowkuanlaw.github.io/beads-buddy/

## Four learning levels
1. **First Beads:** Simple addition and subtraction (0–9, direct moves).
2. **5 & 10 Friends:** Small-friend 5 and big-friend 10 formulas; carrying and borrowing.
3. **Bigger Numbers:** Two- and three-digit addition and subtraction, showing each rod.
4. **Times & Sharing:** Beginner multiplication through repeated addition and exact division through repeated subtraction; the final answer is shown on the abacus. This is a conceptual introduction, not the advanced formal Soroban multiplication/division algorithm.

## Features
- 25 HTML-rendered beads on five rods, even when JavaScript is disabled.
- Animated step-by-step bead movements and displayed formulas.
- English and Mandarin voice guidance (built-in browser/system speech synthesis).
- Enter a custom question (+, −, × or ÷), select examples, or generate a new question.
- Touch the beads in practice mode and earn stars for correctly solved questions.
- Responsive for iPhone, iPad and desktop; no external APIs or analytics.

## GitHub Pages
Deploy from **main / (root)**. Static `index.html` and `.nojekyll`; no build step.

Supported inputs: non-negative addition/subtraction up to 9,999 operands; multiplication with operands 0–12; division of 0–144 with a divisor 1–12 and an integer quotient no higher than 12. No negative-number lessons or fractional division in this release.

Voice playback depends on system-installed English/Chinese voices and generally needs a user interaction to begin on mobile.
