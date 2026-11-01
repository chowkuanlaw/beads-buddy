# Bead Buddy · 算盘小达人 (v3.0)

**Website:** https://chowkuanlaw.github.io/beads-buddy/

A bilingual, animated Soroban learning app for children, hosted as a static GitHub Pages website.

## What's new in v3.0

- Compact mobile-first workspace keeps the math question, abacus, formula, step buttons, and answer checker together.
- Unlimited on-demand random generation for four learning levels; select 2, 3, 4, 5, 8, 12, 20 or 30 numbers per generated question.
- Enter custom chained expressions with up to 40 numbers, such as `8 + 5 - 3 + 12 - 7` or `8 + 3 × 4 - 5`.
- Normal multiplication/division precedence, bilingual step narration, animated bead moves, a step-jump progress slider and autoplay.
- Enter an answer to check it immediately, or switch to Try it to move the abacus beads yourself. Earn stars for correct answers.

## Levels

1. Direct addition and subtraction without 5/10 complements
2. Small friends of 5 and big friends of 10 (carrying/borrowing)
3. Two- and three-digit arithmetic
4. Multiplication/division using repeated equal groups

## Deployment

GitHub Pages: Settings → Pages → Deploy from a branch → `main` → `/(root)`.

Everything runs in a single `index.html`; no build step, backend, login or external libraries. English and Mandarin voice use the browser's built-in speech synthesis and installed voices.

## Limits

Five Soroban rods: whole numbers 0–99,999. Each intermediate running total must be nonnegative. Division must be exact. Multiplication/division lessons demonstrate up to 12 groups and are introductory, not advanced Soroban multiplication algorithms. Parentheses are not supported. Random questions are unlimited in repeated generation, not unlimited in difficulty.
