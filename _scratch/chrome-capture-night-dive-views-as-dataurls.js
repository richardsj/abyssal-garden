// Runs inside dev.html through the chrome-devtools evaluate_script tool (sourcePath = this file, filePath set).
// The night dive (N key; dev.night(level, stir)) at clock 20 s:
//   pose1..pose6            the six viewpoints at full night, water still (names start with "pose": sheet-poses.jpg)
//   fly_1_pose1_day         viewpoint 1 by day, for comparison
//   fly_2_pose1_dusk        viewpoint 1 half way through the fade
//   fly_3_pose1_stirred     viewpoint 1 at night with the plankton fully stirred up (as when swimming fast)
//   fly_4_swarm_from_below  the jellyfish swarm nearest the start, from 10 m to the side and 6 m below
//   fly_5_jelly_close       the jellyfish of that swarm nearest its middle, from 3 m
//   fly_6_cuttlefish        the first cuttlefish, side on from 4 m
//   fly_7_coral_close       1.6 m from the anemone in front of viewpoint 1: the lamp on fluorescent coral
// Jellyfish positions use the formula of vsJelly without the push away from the viewer; the cuttlefish position uses
// the formula of fpos() behaviour 5 without its retreat.
// Decode with _scratch/decode-captured-dataurls-to-images.mjs.
async () => {
  for (let i = 0; i < 240 && !(window.dev && window.dev.balls); i++) await new Promise((r) => setTimeout(r, 250));
  if (!window.dev) return { error: 'dev tools not present' };
  await new Promise((r) => setTimeout(r, 2000));
  const canvas = document.querySelector('canvas'), d = window.dev, T = 20, out = { size: d.size, shots: {}, notes: {} };
  const grab = () => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(() => res(canvas.toDataURL('image/jpeg', 0.92))))));
  const keep = async (name) => { out.shots[name] = await grab(); };
  d.night(1, 0);
  for (let n = 1; n <= 6; n++) { d.pose(n, T); await keep('pose' + n); }
  d.pose(1, T); d.night(0, 0); await keep('fly_1_pose1_day');
  d.night(0.5, 0); await keep('fly_2_pose1_dusk');
  d.night(1, 1); await keep('fly_3_pose1_stirred');
  d.night(1, 0);
  // jellyfish
  const J = d.jellies, N = J.length / 8;
  const S = (a, b, x) => { const u = Math.min(1, Math.max(0, (x - a) / (b - a))); return u * u * (3 - 2 * u); }, TH = (pp) => (((pp - 0.3) / 6.2831853) % 1 + 1) % 1;
  const at = (o, t) => { const R = J[o + 3], sz = J[o + 5], ph = J[o + 6], pp = t * (2.6 / (0.5 + sz)) + ph * 6.2831853; return [J[o] + R * Math.cos(t * 0.03 + ph * 5), J[o + 1] + 1.5 * Math.sin(t * 0.05 + ph * 9) + 0.55 * sz * (S(0, 0.25, TH(pp)) - S(0.25, 1, TH(pp))), J[o + 2] + R * Math.sin(t * 0.027 + ph * 7)]; };
  if (N) {
    let o = 0, bd = 1e9; for (let i = 0; i < N; i++) { const p = at(i * 8, T), dd = Math.hypot(p[0] + 17.8, p[1] + 9, p[2] - 4.8); if (dd < bd) { bd = dd; o = i * 8; } }
    const c = at(o, T);
    d.look(c[0] + 8, c[1] - 6, c[2] + 6, c[0], c[1], c[2], T); await keep('fly_4_swarm_from_below');
    d.look(c[0] + 2.2, c[1] - 0.8, c[2] + 2, c[0], c[1] - 0.6 * J[o + 5], c[2], T); await keep('fly_5_jelly_close');
    out.notes.jellyfish = { at: c.map((v) => +v.toFixed(2)), bellRadius: +J[o + 5].toFixed(2) };
  }
  // cuttlefish: fish with behaviour 5 (12 floats each: x,y,z,R | seed,speed,size,phase | colour,behaviour,p1,p2)
  const Fi = d.fish; let cf = -1; for (let i = 0; i < Fi.length; i += 12) if (Fi[i + 9] > 4.5) { cf = i; break; }
  if (cf >= 0) {
    const R = Fi[cf + 3], s = Fi[cf + 4], p = [Fi[cf] + Math.sin(T * 0.11 + s * 31) * R, Fi[cf + 1] + Math.sin(T * 0.23 + s * 17) * 0.2, Fi[cf + 2] + Math.cos(T * 0.09 + s * 23) * R];
    d.look(p[0] + 2.9, p[1] + 0.3, p[2] + 2.8, p[0], p[1], p[2], T); await keep('fly_6_cuttlefish');
    out.notes.cuttlefish = { at: p.map((v) => +v.toFixed(2)) };
  }
  const a = d.anemones[0]; if (a) { d.look(a[0] + 1.2, a[1] + 0.8, a[2] + 0.9, a[0], a[1], a[2], T); await keep('fly_7_coral_close'); out.notes.anemone = [a[0], a[1], a[2]].map((v) => +v.toFixed(2)); }
  d.pose(1, T);
  return out;
}
