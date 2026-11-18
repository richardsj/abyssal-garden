// Runs inside dev.html through the chrome-devtools evaluate_script tool (sourcePath = this file, filePath set).
// Pictures of jellyfish for a blind critic (and for before/after once something is changed): for five swarms, the
// jellyfish nearest the swarm's middle, seen (a) level from 4.5 m, (b) level from 4.5 m from another side, and
// (c) from 5 m and above, looking down, so that the background is reef and rock and not only the bright surface.
// Positions are recomputed with the formula of vsJelly, without the push away from the viewer. Clock 20 s.
// Some views will have the camera inside rock or behind kelp: look at them and leave those out.
// Decode with _scratch/decode-captured-dataurls-to-images.mjs (names start with "fly": it builds sheet-flight.jpg).
async () => {
  for (let i = 0; i < 240 && !(window.dev && window.dev.balls); i++) await new Promise((r) => setTimeout(r, 250));
  if (!window.dev) return { error: 'dev tools not present' };
  await new Promise((r) => setTimeout(r, 2000));
  const canvas = document.querySelector('canvas'), d = window.dev, J = d.jellies, N = J.length / 8, out = { size: d.size, shots: {}, picked: [] };
  const grab = () => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(() => res(canvas.toDataURL('image/jpeg', 0.93))))));
  let n = 0; const keep = async (label) => { out.shots['fly_' + String(n++).padStart(2, '0') + '_' + label] = await grab(); };
  const T = 20;
  // the thrust of each pulse, as in vsJelly: a quick rise over the first quarter of the pulse, a slow settle after
  const S = (a, b, x) => { const u = Math.min(1, Math.max(0, (x - a) / (b - a))); return u * u * (3 - 2 * u); }, TH = (pp) => (((pp - 0.3) / 6.2831853) % 1 + 1) % 1;
  const at = (o, t) => { const R = J[o + 3], sz = J[o + 5], ph = J[o + 6], pp = t * (2.6 / (0.5 + sz)) + ph * 6.2831853; return [J[o] + R * Math.cos(t * 0.03 + ph * 5), J[o + 1] + 1.5 * Math.sin(t * 0.05 + ph * 9) + 0.55 * sz * (S(0, 0.25, TH(pp)) - S(0.25, 1, TH(pp))), J[o + 2] + R * Math.sin(t * 0.027 + ph * 7)]; };
  for (const [name, cx, cy, cz] of [['a', -18, -12, 4], ['b', 24, -15, -24], ['c', 30, -14, 30], ['d', -58, -14, 0], ['e', -56, -19, -18]]) {
    let best = -1, bd = 1e9;
    for (let i = 0; i < N; i++) { const o = i * 8, p = at(o, T), dd = Math.hypot(p[0] - cx, p[1] - cy, p[2] - cz); if (dd < bd) { bd = dd; best = o; } }
    if (best < 0) continue;
    const p = at(best, T), sz = J[best + 5], ty = p[1] - 0.7 * sz; out.picked.push({ swarm: name, bellRadius: +sz.toFixed(2), kind: J[best + 7], at: p.map((v) => +v.toFixed(1)) });
    d.look(p[0] + 4.5, ty, p[2], p[0], ty, p[2], T); await keep('swarm_' + name + '_level_1');
    d.look(p[0] - 2.2, ty, p[2] + 3.9, p[0], ty, p[2], T); await keep('swarm_' + name + '_level_2');
    d.look(p[0] - 2.5, p[1] + 3.6, p[2] - 2.5, p[0], ty, p[2], T); await keep('swarm_' + name + '_from_above');
  }
  return out;
}
