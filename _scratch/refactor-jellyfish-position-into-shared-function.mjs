// One-off (2026-11-18): moves the "where is this jellyfish" part of vsJelly in source/src/shaders.js into a function
// jctr() placed just before it, so the shadow blob (vsJSh) can use the same position. Finds the lines by their text,
// checks them, and refuses to write if anything is not as expected.
import { readFileSync, writeFileSync } from 'node:fs';
const file = 'source/src/shaders.js', L = readFileSync(file, 'utf8').split('\n');
const start = L.findIndex((l) => l.startsWith('  let t = g.cam.w; let R = i.a.w; let s = i.b.x; let sz = i.b.y; let ph = i.b.z;'));
const end = L.findIndex((l, i) => i > start && l.startsWith('  { let dv = P - g.cam.xyz; let lv = length(dv); let rv = 2. + sz;'));
const head = L.findIndex((l) => l.startsWith('@vertex fn vsJelly(i: VI) -> JO {'));
if (start < 0 || end < 0 || head < 0 || end - start !== 10 || start - head !== 2) { console.error('not as expected', { head, start, end }); process.exit(1); }
const body = L.slice(start + 1, end + 1).map((l) => l); // comments and maths, from the pulse to the viewer's push
const fn = [
  '// Where a jellyfish is (xyz) and how far its bell is squeezed (w, 0 open .. 1 shut). Shared by the jellyfish itself',
  '// (vsJelly) and by the shadow it casts (vsJSh), so the two cannot disagree. a, b = its instance data.',
  'fn jctr(a: vec4f, b: vec4f) -> vec4f {',
  '  let t = g.cam.w; let R = a.w; let sz = b.y; let ph = b.z;',
  ...body.map((l) => l.replace('var P = i.a.xyz +', 'var P = a.xyz +')),
  '  return vec4f(P, sq);',
  '}',
];
const call = [
  '  let t = g.cam.w; let s = i.b.x; let sz = i.b.y; let ph = i.b.z;',
  '  let pp = t * (2.6 / (.5 + sz)) + ph * TAU; // the pulse, as in jctr(): the hanging parts follow it late',
  '  let ctr = jctr(i.a, i.b); let P = ctr.xyz; let sq = ctr.w;',
];
const out = [...L.slice(0, head), ...fn, ...L.slice(head, start), ...call, ...L.slice(end + 1)];
writeFileSync(file, out.join('\n'));
console.log('moved', body.length, 'lines into jctr()');
