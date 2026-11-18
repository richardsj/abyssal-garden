// Usage: node summarise-reef-census-json.mjs <census.json> [<earlier-census.json>]
// Prints the census written by chrome-run-reef-census-return-json.js as markdown tables: how much of each kind of
// life exists, and how much rock is bare (nothing rooted within 2 m). With a second file, every number is followed
// by the earlier one, so a phase of the denser-reef-life workstream can be compared with the baseline.
import { readFileSync } from 'node:fs';
const load = (p) => { const t = readFileSync(p, 'utf8'); return JSON.parse(t.slice(t.indexOf('{'), t.lastIndexOf('}') + 1)); };
const d = load(process.argv[2]), e = process.argv[3] ? load(process.argv[3]) : null;
if (d.error) { console.error(d.error); process.exit(1); }
const was = (now, before) => e ? `${now} (was ${before})` : `${now}`;
const sum = (o, keys) => keys.reduce((s, k) => s + (o[k] || 0), 0);
const life = (c) => ({
  'sponges (meshes 4-6)': sum(c.props, ['mesh4', 'mesh5', 'mesh6']),
  'corals (meshes 7-9)': sum(c.props, ['mesh7', 'mesh8', 'mesh9']),
  'soft coral trees (meshes 33-34)': sum(c.props, ['mesh33', 'mesh34']),
  'anemones': c.anemones,
  'sea whips': c.seaWhips,
  'polyps': c.polyps,
  'kelp and foliage blades (big)': sum(c.leaves, Object.keys(c.leaves).filter((k) => k.startsWith('big'))),
  'ground cover blades (small)': sum(c.leaves, Object.keys(c.leaves).filter((k) => k.startsWith('small'))),
  'rock chunks and pebbles': c.rockChunks.reduce((s, n) => s + n, 0),
  'fish, all': c.fishTotal,
  'fish: bait': c.fishPerMesh[0], 'fish: slim schooling and anthias': c.fishPerMesh[1], 'fish: triggerfish': c.fishPerMesh[2],
  'fish: hunters': c.fishPerMesh[3], 'fish: clownfish': c.fishPerMesh[4], 'fish: disc (tang, butterflyfish)': c.fishPerMesh[5],
  'fish: idols': c.fishPerMesh[6], 'fish: parrotfish': c.fishPerMesh[7], 'cuttlefish (counted with the fish)': c.fishPerMesh[8] || 0,
});
console.log(`Detail level ${d.detail} (0 = High), ${d.size}, world ready within ${d.worldReadyMsAtOrBefore} ms, page memory ${d.jsHeapMB} MB with census data kept\n`);
console.log('| Kind | Count |\n|---|---|');
const L = life(d), LE = e && life(e);
for (const k in L) console.log(`| ${k} | ${was(L[k], LE && LE[k])} |`);
if (d.boulders) {
  console.log('\nLoose rock (separate objects; the bare-rock table below samples the main terrain only and does not include it):\n');
  console.log('| Boulders | All | Large (scale over 1.1) |\n|---|---|---|');
  console.log(`| floating | ${was(d.boulders.floating, e && e.boulders && e.boulders.floating)} | ${was(d.boulders.floatingBig, e && e.boulders && e.boulders.floatingBig)} |`);
  console.log(`| resting on the seabed | ${was(d.boulders.resting, e && e.boulders && e.boulders.resting)} | ${was(d.boulders.restingBig, e && e.boulders && e.boulders.restingBig)} |`);
}
if (d.propTriangles) {
  console.log('\n| Shape | Pieces | Triangles each | Triangles in all |\n|---|---|---|---|');
  for (const k in d.props) console.log(`| ${k} | ${d.props[k]} | ${d.propTriangles[k]} | ${(d.props[k] * d.propTriangles[k] / 1e6).toFixed(2)} million |`);
}
console.log('\n| Rock (below 8 m depth) | Samples | Reef life within 1 m | No reef life within 2 m | Nothing at all within 2 m |\n|---|---|---|---|---|');
const NAMES = { all: 'all rock', upFacing: 'up-facing (floors, ledges)', walls: 'walls', overhangs: 'overhangs', nearPath: 'within 10 m of the flight path' };
for (const k in NAMES) { const r = d.rock[k], q = e && e.rock[k]; console.log(`| ${NAMES[k]} | ${r.samples} | ${was(r.reefWithin1mPct + '%', q && q.reefWithin1mPct + '%')} | ${was(r.bareOfReefPct + '%', q && q.bareOfReefPct + '%')} | ${was(r.bareOfAllPct + '%', q && q.bareOfAllPct + '%')} |`); }
console.log('\nRock within 10 m of the camera, per second of the flight (seconds with fewer than 30 samples left out):\n');
console.log('| Second | Samples | No reef life within 2 m | Nothing at all within 2 m |\n|---|---|---|---|');
d.samplesPerFlightSecond.forEach((n, s) => { if (n >= 30) console.log(`| ${s} | ${n} | ${was(d.bareOfReefPctPerFlightSecond[s] + '%', e && e.bareOfReefPctPerFlightSecond[s] + '%')} | ${was(d.bareOfAllPctPerFlightSecond[s] + '%', e && e.bareOfAllPctPerFlightSecond[s] + '%')} |`); });
