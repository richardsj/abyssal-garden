// Runs inside dev.html through the chrome-devtools evaluate_script tool (sourcePath = this file, filePath set).
// Before/after views for the fluorescent and bioluminescent colours (denser-reef-life workstream, 2026-11-18):
// three anemones up close (tentacle tips), viewpoints 1, 4 and 6 (corals, sponges, the purple zone), flight seconds
// 4, 52 and 57.5 (growth in shade under cliffs), and one chromis school at two clock times (light spots).
// Clock held at 20 s unless a time is given. Decode with _scratch/decode-captured-dataurls-to-images.mjs
// (shot names start with "fly", so it builds sheet-flight.jpg).
async () => {
  for (let i = 0; i < 240 && !(window.dev && window.dev.balls); i++) await new Promise((r) => setTimeout(r, 250));
  if (!window.dev) return { error: 'dev tools not present' };
  await new Promise((r) => setTimeout(r, 2000));
  const canvas = document.querySelector('canvas'), d = window.dev, F = d.fish, out = { size: d.size, shots: {} };
  const grab = () => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(() => res(canvas.toDataURL('image/jpeg', 0.92))))));
  let n = 0; const keep = async (label) => { out.shots['fly_' + String(n++).padStart(2, '0') + '_' + label] = await grab(); };
  const A = d.anemones;
  for (const [i, dist] of [[0, 2.5], [9, 2.5], [20, 3]]) { const a = A[i]; if (!a) continue; d.look(a[0] + dist * 0.8, a[1] + dist * 0.35, a[2] + dist * 0.6, a[0], a[1], a[2], 20); await keep('anemone' + i); }
  for (const p of [1, 4, 6]) { d.pose(p, 20); await keep('viewpoint' + p); }
  for (const t of [4, 52, 57.5]) { d.fly(t); await keep('flight' + t + 's'); }
  // a chromis school (colour 11): the middle of its ribbon, from 5 m on the inside of its loop
  let o = -1; for (let i = 0; i < F.length / 12 && o < 0; i++) if (F[i * 12 + 9] === 0 && F[i * 12 + 8] === 11) o = i * 12;
  if (o >= 0) for (const T of [20, 50]) {
    const R = F[o + 3], ta = T * F[o + 5] + F[o + 7] * 6.3, p = [F[o] + R * Math.cos(ta), F[o + 1] + 2.2 * Math.sin(3 * ta + F[o + 7] * 17), F[o + 2] + R * 0.6 * Math.sin(ta)];
    const cx = F[o] - p[0], cz = F[o + 2] - p[2], l = Math.hypot(cx, cz) || 1;
    d.look(p[0] + cx / l * 5, p[1] + 0.4, p[2] + cz / l * 5, p[0], p[1], p[2], T); await keep('chromis_t' + T);
  }
  return out;
}
