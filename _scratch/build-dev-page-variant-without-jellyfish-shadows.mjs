// Writes a copy of dev.html in which the jellyfish cast no shadow (the strength in fsJSh set to 0), for before/after
// pictures of the same views. Run after `npm run build:dev`.
// Usage: node _scratch/build-dev-page-variant-without-jellyfish-shadows.mjs <output html>
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
const out = process.argv[2]; if (!out) { console.error('usage: <output html>'); process.exit(2); }
const src = readFileSync('dev.html', 'utf8'), m = src.match(/return vec4f\(([.\d]+) \* ss\(([.\d]+), ([.\d]+), length\(i\.uv\)\), i\.h, 0\., 0\.\);/g);
if (!m || m.length !== 1) { console.error('fsJSh strength line found', m ? m.length : 0, 'times, expected 1'); process.exit(1); }
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, src.replace(m[0], 'return vec4f(0., i.h, 0., 0.);'));
console.log('wrote', out, '(replaced:', m[0], ')');
