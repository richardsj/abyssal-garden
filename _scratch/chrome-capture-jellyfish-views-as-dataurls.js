// Runs inside dev.html through the chrome-devtools evaluate_script tool (sourcePath = this file, filePath set).
// Views of the jellyfish (dev.jellies: 8 floats each, home xyz, drift | seed, bell radius, phase, kind):
//   the swarm nearest the start, from 10 m to the side and 6 m below, looking up at it against the surface
//   (a second view from the opposite side was tried and put the camera inside rock);
//   the jellyfish of that swarm nearest its middle, from 3 m, at two moments half a pulse apart (bell open / squeezed);
//   the largest jellyfish anywhere, from 4.5 m;
//   viewpoints 1, 3 and 5, to see how the swarms sit in views that are already known.
// Positions are recomputed with the formula of vsJelly, without the push away from the viewer. Clock 20 s unless stated.
// Decode with _scratch/decode-captured-dataurls-to-images.mjs (names start with "fly": it builds sheet-flight.jpg).
async () => {
  for (let i = 0; i < 240 && !(window.dev && window.dev.balls); i++) await new Promise((r) => setTimeout(r, 250));
  if (!window.dev) return { error: 'dev tools not present' };
  await new Promise((r) => setTimeout(r, 2000));
  const canvas = document.querySelector('canvas'), d = window.dev, J = d.jellies, N = J.length / 8, out = { size: d.size, shots: {}, jellyfish: N, kinds: [0, 0, 0, 0] };
  const grab = () => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(() => res(canvas.toDataURL('image/jpeg', 0.92))))));
  let n = 0; const keep = async (label) => { out.shots['fly_' + String(n++).padStart(2, '0') + '_' + label] = await grab(); };
  const rate = (o) => 2.6 / (0.5 + J[o + 5]);
  const at = (o, t) => { const R = J[o + 3], sz = J[o + 5], ph = J[o + 6], pp = t * rate(o) + ph * 6.2831853; return [J[o] + R * Math.cos(t * 0.03 + ph * 5), J[o + 1] + 1.5 * Math.sin(t * 0.05 + ph * 9) + 0.14 * sz * Math.sin(pp - 1), J[o + 2] + R * Math.sin(t * 0.027 + ph * 7)]; };
  if (!N) return out;
  let near = 0, big = 0; const T = 20;
  for (let i = 0; i < N; i++) { const o = i * 8; out.kinds[J[o + 7]]++; if (Math.hypot(J[o], J[o + 2]) < Math.hypot(J[near], J[near + 2])) near = o; if (J[o + 5] > J[big + 5]) big = o; }
  // the middle of the swarm that jellyfish belongs to (those within 14 m of it)
  let cx = 0, cy = 0, cz = 0, c = 0, mid = near, best = 1e9;
  for (let i = 0; i < N; i++) { const o = i * 8; if (Math.hypot(J[o] - J[near], J[o + 2] - J[near + 2]) < 14) { const p = at(o, T); cx += p[0]; cy += p[1]; cz += p[2]; c++; } }
  cx /= c; cy /= c; cz /= c; out.swarm = { count: c, middle: [cx, cy, cz].map((v) => +v.toFixed(1)) };
  for (let i = 0; i < N; i++) { const o = i * 8, p = at(o, T), dd = Math.hypot(p[0] - cx, p[1] - cy, p[2] - cz); if (dd < best) { best = dd; mid = o; } }
  d.look(cx + 8, cy - 6, cz + 6, cx, cy, cz, T); await keep('swarm_from_below');
  const half = Math.PI / rate(mid), p = at(mid, T);
  // pick the two moments so that one is fully open and the other fully squeezed: sin(pp) = -1 and +1
  const pp0 = T * rate(mid) + J[mid + 6] * 6.2831853, tOpen = T + ((3 * Math.PI / 2 - pp0) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) / rate(mid), tShut = tOpen + half;
  for (const [label, t] of [['one_open', tOpen], ['one_squeezed', tShut]]) { const q = at(mid, t); d.look(q[0] + 2.2, q[1] - 0.8, q[2] + 2, q[0], q[1] - 0.6 * J[mid + 5], q[2], t); await keep(label); }
  const b = at(big, T); out.largest = +J[big + 5].toFixed(2);
  d.look(b[0] + 3.4, b[1] - 1.5, b[2] + 3, b[0], b[1] - J[big + 5], b[2], T); await keep('largest');
  for (const v of [1, 3, 5]) { d.pose(v, T); await keep('viewpoint' + v); }
  return out;
}
