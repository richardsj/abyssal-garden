// Runs inside dev.html through the chrome-devtools evaluate_script tool (sourcePath = this file, filePath set).
// Close views of the golden hunters (fish with behaviour 3; 12 floats each: x,y,z,R | seed,speed,size,phase |
// colour,behaviour,p1,p2). For the leading hunter of bait balls 0 and 2 at clock 20 s:
//   side_a    side on from 2.4 body lengths (the view used in chrome-capture-ribbon-schools-and-hunters-as-dataurls.js)
//   side_b    the same from the other side (the side away from / toward the sun differs)
//   near      side on from 1.3 body lengths, to see the scales, bars and fin rays
//   front     three-quarter view from ahead and a little above
// and the first view again at night (dev.night(1, 0)).
// Positions use the same formulas as hunter() / ballC() in the fish shader, without the push away from the viewer.
// A camera can end up inside rock (fish swim through rock): `notes` records each camera so a dark frame can be explained.
// Decode with _scratch/decode-captured-dataurls-to-images.mjs (names start with "fly": it builds sheet-flight.jpg).
async () => {
  for (let i = 0; i < 240 && !(window.dev && window.dev.balls); i++) await new Promise((r) => setTimeout(r, 250));
  if (!window.dev) return { error: 'dev tools not present' };
  await new Promise((r) => setTimeout(r, 2000));
  const canvas = document.querySelector('canvas'), d = window.dev, F = d.fish, out = { size: d.size, shots: {}, notes: {} };
  const grab = () => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(() => res(canvas.toDataURL('image/jpeg', 0.92))))));
  let n = 0; const shot = async (label, ...a) => { d.look(...a); const name = 'fly_' + String(n++).padStart(2, '0') + '_' + label; out.shots[name] = await grab(); out.notes[name] = a.slice(0, 3).map((v) => +v.toFixed(2)); };
  const ballC = (o, t) => { const ph = F[o + 7]; return [F[o] + Math.sin(t * 0.07 + ph * 9) * 3, F[o + 1] + Math.sin(t * 0.11 + ph * 5) * 1.2, F[o + 2] + Math.cos(t * 0.06 + ph * 7) * 3]; };
  const hunter = (o, t) => {
    const ph = F[o + 7], k = F[o + 10], R = F[o + 3], u0 = t * 0.13 + k * 2.3 + ph * 6.3, u = u0 - 0.35 * Math.sin(2 * u0), an = k * 2.1 + ph * 4;
    const dx = Math.cos(an), dy = 0.12 * Math.sin(k * 5 + 1), dz = Math.sin(an), c = ballC(o, t), a = R * 3.6 * Math.cos(u), b = R * 1.5 * Math.sin(2 * u);
    return [c[0] + dx * a - dz * b, c[1] + dy * a + 0.35 * b, c[2] + dz * a + dx * b];
  };
  const T = 20; let ball = 0; d.night(0, 0);
  for (let i = 0; i < F.length / 12; i++) {
    const o = i * 12; if (F[o + 9] !== 3 || F[o + 11] !== 0 || F[o + 10] !== 0) continue;
    if (ball !== 1) {
      const p = hunter(o, T), q = hunter(o, T + 0.1), vx = q[0] - p[0], vz = q[2] - p[2], l = Math.hypot(vx, vz) || 1, sz = F[o + 6], ax = vx / l, az = vz / l;
      const side = (k, dist) => [p[0] - az * sz * dist * k + ax * sz * 0.3, p[1] + sz * 0.2, p[2] + ax * sz * dist * k + az * sz * 0.3, p[0], p[1], p[2], T];
      await shot('ball' + ball + '_side_a', ...side(1, 2.4));
      await shot('ball' + ball + '_side_b', ...side(-1, 2.4));
      await shot('ball' + ball + '_near', ...side(1, 1.3));
      await shot('ball' + ball + '_front', p[0] + ax * sz * 1.8 - az * sz * 1.1, p[1] + sz * 0.5, p[2] + az * sz * 1.8 + ax * sz * 1.1, p[0], p[1], p[2], T);
      d.night(1, 0); await shot('ball' + ball + '_side_a_night', ...side(1, 2.4)); d.night(0, 0);
    }
    ball++;
  }
  d.pose(1, T);
  return out;
}
