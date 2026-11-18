// Runs inside dev.html through the chrome-devtools evaluate_script tool (sourcePath = this file, filePath set).
// Inspection views of the first two cuttlefish, for judging shape and skin while iterating:
//   a  from the side at 7.5 m: far enough that it has not turned toward the viewer (crop the centre to see it)
//   b  from 2.6 m straight above: the outline of mantle, fin and arms
//   c  from 2.4 m in front and a little to one side: it turns three-quarters on and shows its display
//   d  the same as c, 0.7 s later: the bands should have moved
// The hover position is recomputed with the formula of fpos() in the fish shader, without the push away from the
// viewer. Clock 20 s. Decode with _scratch/decode-captured-dataurls-to-images.mjs.
async () => {
  for (let i = 0; i < 240 && !(window.dev && window.dev.balls); i++) await new Promise((r) => setTimeout(r, 250));
  if (!window.dev) return { error: 'dev tools not present' };
  await new Promise((r) => setTimeout(r, 2000));
  const canvas = document.querySelector('canvas'), d = window.dev, F = d.fish, out = { size: d.size, shots: {}, info: [], fishPerMesh: d.fishRanges.map((r) => r[1]) };
  const grab = () => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(() => res(canvas.toDataURL('image/jpeg', 0.93))))));
  const at = (o, t) => { const s = F[o + 4], R = F[o + 3]; return [F[o] + Math.sin(t * 0.11 + s * 31) * R, F[o + 1] + Math.sin(t * 0.23 + s * 17) * 0.2, F[o + 2] + Math.cos(t * 0.09 + s * 23) * R]; };
  let k = 0;
  for (let i = 0; i < F.length / 12 && k < 2; i++) {
    const o = i * 12; if (F[o + 9] !== 5) continue;
    const T = 20, p = at(o, T), a0 = F[o + 7] * 6.3 + Math.sin(T * 0.13 + F[o + 4] * 9) * 1.3, sx = -Math.sin(a0), sz = Math.cos(a0);
    out.info.push({ home: [F[o], F[o + 1], F[o + 2]].map((v) => +v.toFixed(2)), size: +F[o + 6].toFixed(2), drift: +F[o + 3].toFixed(2) });
    d.look(p[0] + sx * 7.5, p[1] + 0.1, p[2] + sz * 7.5, p[0], p[1], p[2], T); out.shots['pose' + k + 'a_side_7.5m'] = await grab();
    d.look(p[0] + 0.05, p[1] + 2.6, p[2] + 0.05, p[0], p[1], p[2], T); out.shots['pose' + k + 'b_top_2.6m'] = await grab();
    const cx = p[0] + Math.cos(a0) * 2.2 + sx * 0.9, cy = p[1] + 0.3, cz = p[2] + Math.sin(a0) * 2.2 + sz * 0.9;
    d.look(cx, cy, cz, p[0], p[1], p[2], T); out.shots['pose' + k + 'c_close_2.4m_t20.0'] = await grab();
    d.look(cx, cy, cz, p[0], p[1], p[2], T + 0.7); out.shots['pose' + k + 'd_close_2.4m_t20.7'] = await grab();
    k++;
  }
  return out;
}
