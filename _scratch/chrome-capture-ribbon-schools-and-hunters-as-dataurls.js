// Runs inside dev.html through the chrome-devtools evaluate_script tool (sourcePath = this file, filePath set).
// Before/after views for fish colour changes (denser-reef-life workstream, 2026-11-18):
//   - three ribbon schools, found by their home position so the same schools are shot whatever they are coloured:
//     the two that were silver bait fish (home [-2,-36,-10] and [0,-22,20]) and one fusilier school for reference.
//     Each entry gives the clock times to shoot at and the camera distance; the times were picked from a probe,
//     because at other times the middle of a ribbon is behind kelp or inside rock (fish swim through rock);
//   - the leading hunter of bait balls 0 and 2, side-on from close and with its ball from 9 m. (Ball 1's hunter is
//     inside a rock wall at 20 s.)
// Positions are recomputed with the same formulas as fpos() / hunter() / ballC() in the fish shader.
// Shot names start with "fly" so _scratch/decode-captured-dataurls-to-images.mjs builds sheet-flight.jpg from them.
async () => {
  const canvas = document.querySelector('canvas'), d = window.dev, F = d.fish, out = { size: d.size, shots: {}, found: {} };
  const grab = () => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(() => res(canvas.toDataURL('image/jpeg', 0.92))))));
  let n = 0; const shot = async (label, ...a) => { d.look(...a); out.shots['fly_' + String(n++).padStart(2, '0') + '_' + label] = await grab(); };
  const nFish = F.length / 12;
  // ribbon schools (behaviour 0): the middle of the ribbon at time t
  const ribbon = (o, t) => { const R = F[o + 3], ta = t * F[o + 5] + F[o + 7] * 6.3, ph = F[o + 7] * 17; return [F[o] + R * Math.cos(ta), F[o + 1] + 2.2 * Math.sin(3 * ta + ph), F[o + 2] + R * 0.6 * Math.sin(ta)]; };
  const SCHOOLS = [['school_deep', -2, -36, -10, [[65, 7], [65, 3.5]]], ['school_wide', 0, -22, 20, [[50, 7], [5, 7]]], ['school_fusilier_reference', 8, -30, -70, [[50, 7]]]];
  for (const [name, hx, hy, hz, views] of SCHOOLS) {
    let o = -1; for (let i = 0; i < nFish && o < 0; i++) if (F[i * 12 + 9] === 0 && F[i * 12] === hx && F[i * 12 + 1] === hy && F[i * 12 + 2] === hz) o = i * 12;
    if (o < 0) { out.found[name] = 'not found'; continue; }
    out.found[name] = { colour: F[o + 8], speed: F[o + 5], phase: F[o + 7] };
    for (const [T, dist] of views) {
      const p = ribbon(o, T), cx = F[o] - p[0], cz = F[o + 2] - p[2], l = Math.hypot(cx, cz) || 1; // toward the middle of the loop
      await shot(name + '_t' + T + '_' + dist + 'm', p[0] + cx / l * dist, p[1] + 0.5, p[2] + cz / l * dist, p[0], p[1], p[2], T);
    }
  }
  // hunters (behaviour 3): c.z (slot 10) = which of the ball's two, c.w (slot 11) = 0 for the leader
  const ballC = (o, t) => { const ph = F[o + 7]; return [F[o] + Math.sin(t * 0.07 + ph * 9) * 3, F[o + 1] + Math.sin(t * 0.11 + ph * 5) * 1.2, F[o + 2] + Math.cos(t * 0.06 + ph * 7) * 3]; };
  const hunter = (o, t) => {
    const ph = F[o + 7], k = F[o + 10], R = F[o + 3], u0 = t * 0.13 + k * 2.3 + ph * 6.3, u = u0 - 0.35 * Math.sin(2 * u0), an = k * 2.1 + ph * 4;
    const dx = Math.cos(an), dy = 0.12 * Math.sin(k * 5 + 1), dz = Math.sin(an), c = ballC(o, t), a = R * 3.6 * Math.cos(u), b = R * 1.5 * Math.sin(2 * u);
    return [c[0] + dx * a - dz * b, c[1] + dy * a + 0.35 * b, c[2] + dz * a + dx * b];
  };
  const T = 20; let ball = 0;
  for (let i = 0; i < nFish; i++) {
    const o = i * 12; if (F[o + 9] !== 3 || F[o + 11] !== 0 || F[o + 10] !== 0) continue;
    if (ball !== 1) {
      const p = hunter(o, T), q = hunter(o, T + 0.1), vx = q[0] - p[0], vz = q[2] - p[2], l = Math.hypot(vx, vz) || 1, sz = F[o + 6];
      await shot('hunter_ball' + ball + '_close', p[0] - vz / l * sz * 2.4 + vx / l * sz * 0.3, p[1] + sz * 0.2, p[2] + vx / l * sz * 2.4 + vz / l * sz * 0.3, p[0], p[1], p[2], T);
      await shot('hunter_ball' + ball + '_9m', p[0] - vz / l * 9, p[1] - 1.5, p[2] + vx / l * 9, p[0], p[1], p[2], T);
    }
    ball++;
  }
  return out;
}
