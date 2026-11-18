// Runs inside dev.html through the chrome-devtools evaluate_script tool (sourcePath = this file, filePath set).
// Looks for the shadows the jellyfish cast (drawn each frame into a texture, see vsJSh / jsh() in shaders.js).
// For the three swarms with the most jellyfish near their middle, at clock 20 s:
//   below_a / below_b   from beside the swarm at its own height, looking at the ground about 14 m down the sun's rays
//                       from the swarm's middle, from two sides (one may be inside rock)
//   below_a_t26         the first view six seconds later: the shadows should have moved and pulsed, nothing else
// and viewpoint 5 (looking up through the kelp basin, where a swarm hangs) for the leaves.
// `notes` gives each swarm's middle, how many jellyfish are within 8 m of it and the camera positions.
// Jellyfish positions use the formula of jctr() without the push away from the viewer.
// Decode with _scratch/decode-captured-dataurls-to-images.mjs (names start with "fly": it builds sheet-flight.jpg).
async () => {
  for (let i = 0; i < 240 && !(window.dev && window.dev.balls); i++) await new Promise((r) => setTimeout(r, 250));
  if (!window.dev) return { error: 'dev tools not present' };
  await new Promise((r) => setTimeout(r, 2000));
  const canvas = document.querySelector('canvas'), d = window.dev, J = d.jellies, N = J.length / 8, out = { size: d.size, shots: {}, notes: {} };
  const grab = () => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(() => res(canvas.toDataURL('image/jpeg', 0.92))))));
  let n = 0; const shot = async (label, ...a) => { d.look(...a); const name = 'fly_' + String(n++).padStart(2, '0') + '_' + label; out.shots[name] = await grab(); out.notes[name] = a.slice(0, 3).map((v) => +v.toFixed(2)); };
  const S = (a, b, x) => { const u = Math.min(1, Math.max(0, (x - a) / (b - a))); return u * u * (3 - 2 * u); }, TH = (pp) => (((pp - 0.3) / 6.2831853) % 1 + 1) % 1;
  const at = (o, t) => { const R = J[o + 3], sz = J[o + 5], ph = J[o + 6], pp = t * (2.6 / (0.5 + sz)) + ph * 6.2831853; return [J[o] + R * Math.cos(t * 0.03 + ph * 5), J[o + 1] + 1.5 * Math.sin(t * 0.05 + ph * 9) + 0.55 * sz * (S(0, 0.25, TH(pp)) - S(0.25, 1, TH(pp))), J[o + 2] + R * Math.sin(t * 0.027 + ph * 7)]; };
  const T = 20, sl = Math.hypot(0.27, 1, -0.24), SUN = [0.27 / sl, 1 / sl, -0.24 / sl];
  d.night(0, 0);
  // rank jellyfish by how many others are within 8 m, and take three that are far apart
  const P = []; for (let i = 0; i < N; i++) P.push(at(i * 8, T));
  const near = P.map((p) => P.reduce((k, q) => k + (Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]) < 8 ? 1 : 0), 0));
  const order = P.map((_, i) => i).sort((a, b) => near[b] - near[a]), picks = [];
  for (const i of order) { if (picks.every((j) => Math.hypot(P[i][0] - P[j][0], P[i][2] - P[j][2]) > 30)) picks.push(i); if (picks.length === 3) break; }
  for (let k = 0; k < picks.length; k++) {
    const c = P[picks[k]], g = [c[0] - SUN[0] * 14, c[1] - SUN[1] * 14, c[2] - SUN[2] * 14];
    out.notes['swarm' + k] = { middle: c.map((v) => +v.toFixed(2)), jellyfishWithin8m: near[picks[k]] };
    await shot('swarm' + k + '_below_a', c[0] + 7, c[1] + 0.5, c[2] + 5, g[0], g[1], g[2], T);
    await shot('swarm' + k + '_below_a_t26', c[0] + 7, c[1] + 0.5, c[2] + 5, g[0], g[1], g[2], T + 6);
    await shot('swarm' + k + '_below_b', c[0] - 6, c[1] + 0.5, c[2] - 7, g[0], g[1], g[2], T);
  }
  d.pose(5, T); out.shots['fly_' + String(n++).padStart(2, '0') + '_pose5'] = await grab();
  d.pose(1, T);
  return out;
}
