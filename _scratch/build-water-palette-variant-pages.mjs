// Usage: node _scratch/build-water-palette-variant-pages.mjs OUT_DIR      (run from the project root, after `npm run build:dev`)
// Writes one copy of dev.html per water palette to OUT_DIR (water-1-current.html, water-2-...), differing only in the
// numbers that set the water's colour and clarity. For choosing a palette side by side (denser-reef-life workstream,
// 2026-11-18: the owner finds the water "a little too thick in its blueness"). The chosen one is then typed into
// source/src/shaders.js by hand; index.html is not touched by this script.
//
// What the numbers are (shaders.js, S_G):
//   SIG   how fast red, green, blue fade per metre of water you look through (smaller = clearer)
//   KD    how fast red, green, blue sunlight dims per metre of depth (smaller = brighter, less blue, down deep)
//         SIG and KD are scaled together: the haze formula uses SIG - KD * (how steeply you look up), which must
//         stay positive.
//   WCOL  the colour the water itself scatters: what distant things fade into
//   AMB   the colour of the skylight that fills the shadows
//   SKY   the colour of the sky seen up through the surface
// The purple zone has its own constants (KDZ, PCOL and the second vector in sg()), left alone here.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
const outDir = process.argv[2];
if (!outDir) { console.error('usage: node _scratch/build-water-palette-variant-pages.mjs OUT_DIR'); process.exit(1); }
const NOW = { SIG: '.058, .0296, .0186', KD: '.056, .0288, .0164', WCOL: '.085, .43, .96', AMB: '.18, .54, .86', SKY: '.27, .71, 1.' };
export const PALETTES = [
  ['1-current', 'as it is now', NOW],
  ['2-same-blue-clearer', 'the same blue, about a third further to see', { ...NOW, SIG: '.039, .0200, .0126', KD: '.038, .0195, .0111' }],
  ['3-turquoise', 'clearer, shifted toward cyan-green', { SIG: '.045, .0165, .0150', KD: '.043, .0160, .0135', WCOL: '.10, .62, .88', AMB: '.20, .62, .84', SKY: '.30, .78, 1.' }],
  ['4-pale-aquamarine', 'the clearest and lightest', { SIG: '.032, .0135, .0115', KD: '.030, .0130, .0105', WCOL: '.22, .70, .86', AMB: '.26, .64, .82', SKY: '.36, .80, 1.' }],
  ['5-clear-sapphire', 'deep blue, much less murky', { SIG: '.036, .0185, .0105', KD: '.034, .0178, .0095', WCOL: '.06, .36, .98', AMB: '.16, .48, .88', SKY: '.24, .66, 1.' }],
];
const src = readFileSync('dev.html', 'utf8');
const swap = (text, from, to) => { const n = text.split(from).length - 1; if (n !== 1) throw new Error(`expected exactly one "${from}", found ${n}`); return text.replace(from, to); };
mkdirSync(outDir, { recursive: true });
for (const [name, blurb, p] of PALETTES) {
  let t = src;
  t = swap(t, `const SIG = vec3f(${NOW.SIG});`, `const SIG = vec3f(${p.SIG});`);
  t = swap(t, `const KD = vec3f(${NOW.KD});`, `const KD = vec3f(${p.KD});`);
  t = swap(t, `const WCOL = vec3f(${NOW.WCOL});`, `const WCOL = vec3f(${p.WCOL});`);
  t = swap(t, `mix(vec3f(${NOW.AMB}), vec3f(.34, .56, .82), z)`, `mix(vec3f(${p.AMB}), vec3f(.34, .56, .82), z)`);
  t = swap(t, `let sky = (vec3f(${NOW.SKY}) * 1.3`, `let sky = (vec3f(${p.SKY}) * 1.3`);
  // a label in the corner, so you know which one you are swimming in (not part of the canvas, so not in captures)
  t = swap(t, '</body>', `<div style="position:fixed;bottom:8px;left:10px;font:14px ui-monospace,monospace;color:#fff;text-shadow:0 1px 4px #000;pointer-events:none;z-index:9">water ${name}: ${blurb}</div><script>window.WATER_PALETTE=${JSON.stringify(name)}</script></body>`);
  writeFileSync(join(outDir, `water-${name}.html`), t);
  console.log(`water-${name}.html  SIG ${p.SIG} | KD ${p.KD} | WCOL ${p.WCOL}`);
}
