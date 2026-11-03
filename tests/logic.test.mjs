// Run: node tests/logic.test.mjs  (no dependencies; stubs the DOM and loads the inline script from index.html)
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const src = html.match(/<script>([\s\S]*?)<\/script>/)[1];

const stub = () => new Proxy(function () {}, {
  get: (_t, k) => k === Symbol.iterator ? function* () {} : k === Symbol.toPrimitive ? () => '' : k === 'options' ? [] : stub(),
  set: () => true,
  apply: () => stub(),
});
const win = {};
const ctx = {window: win, document: {title: '', getElementById: stub, querySelector: stub, querySelectorAll: () => [], documentElement: stub()}, navigator: {language: 'en'}, localStorage: {getItem: () => null, setItem() {}}, setTimeout, clearTimeout, console};
win.window = win; Object.assign(ctx, {});
vm.createContext(ctx);
vm.runInContext(src, ctx);
const B = ctx.window.BeadBuddyTest ?? ctx.BeadBuddyTest ?? vm.runInContext('window.BeadBuddyTest', ctx);

let n = 0;
const ok = (name, fn) => { fn(); n++; };

ok('buildSteps ends at the right total (add/sub)', () => {
  for (let a = 0; a <= 150; a += 7) for (let b = 0; b <= 150; b += 3) {
    for (const op of ['+', '-']) {
      const exp = op === '+' ? a + b : a - b;
      if (exp < 0) { assert.throws(() => B.buildSteps(a, op, b)); continue; }
      const st = B.buildSteps(a, op, b);
      assert.equal(B.readDigits(st.at(-1).digits), exp, `${a}${op}${b}`);
    }
  }
});
ok('carry/borrow across columns', () => {
  assert.equal(B.readDigits(B.buildSteps(9999, '+', 1).at(-1).digits), 10000);
  assert.equal(B.readDigits(B.buildSteps(10000, '-', 1).at(-1).digits), 9999);
});
ok('precedence', () => assert.equal(B.parseExpression('2 + 3 × 4').answer, 14));
ok('multiplication is commutative for the group limit', () => {
  assert.equal(B.parseExpression('20 × 3').answer, 60);
  assert.equal(B.parseExpression('3 × 20').answer, 60);
  const p = B.parseExpression('3 × 20'); const st = B.buildExpression(p);
  assert.equal(B.readDigits(st.at(-1).digits), 60);
  assert.throws(() => B.parseExpression('13 × 14'), /limit/);
});
ok('division errors', () => {
  assert.throws(() => B.parseExpression('5 ÷ 0'), /zero/);
  assert.throws(() => B.parseExpression('7 ÷ 2'), /whole/);
});
ok('negative running total rejected', () => assert.throws(() => B.parseExpression('3 - 5'), /nonnegative/));
ok('random questions are valid at every level and length', () => {
  for (const lv of [1, 2, 3, 4]) for (const c of [2, 3, 4, 5, 8, 12, 20, 30]) for (let i = 0; i < 40; i++) {
    const e = B.makeRandom(c, lv);
    try { B.buildExpression(B.parseExpression(e)); } catch (err) { if (!['limit', 'nonnegative', 'whole'].includes(err.message)) throw new Error(`L${lv} c${c} "${e}": ${err.message}`); }
  }
});
ok('level 2 never exceeds requested term count', () => {
  for (let i = 0; i < 300; i++) for (const c of [2, 4, 8, 20]) assert.equal(B.parseExpression(B.makeRandom(c, 2)).count, c);
});
console.log(`${n} test groups passed`);
