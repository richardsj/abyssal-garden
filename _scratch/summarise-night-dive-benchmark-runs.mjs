// Prints one line per benchmark JSON written by chrome-wait-for-load-then-run-benchmark-flight-return-json.js:
// page, canvas size, whether night was on, and the top-level numbers of the result.
// Usage: node _scratch/summarise-night-dive-benchmark-runs.mjs <file.json> [more files...]
import { readFileSync } from 'node:fs';
for (const f of process.argv.slice(2)) {
  const t = readFileSync(f, 'utf8'), d = JSON.parse(t.slice(t.indexOf('{'), t.lastIndexOf('}') + 1)), r = d.result || {};
  const flat = {}; for (const k in r) { const v = r[k]; if (typeof v === 'number' || typeof v === 'string') flat[k] = v; else if (v && typeof v === 'object' && !Array.isArray(v)) for (const j in v) if (typeof v[j] === 'number') flat[k + '.' + j] = v[j]; }
  console.log(f.split('/').pop() + '\n  ' + d.page + '  ' + d.size + '  light: ' + d.nightButtonLit + '\n  ' + JSON.stringify(flat));
}
