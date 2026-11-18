// Runs inside dev.html through the chrome-devtools evaluate_script tool (sourcePath = this file, filePath set).
// Portraits of the first three cuttlefish (behaviour 5 in the fish data): from the side at 6 m (left alone: the calm
// sandy display), from the side at 4 m at two moments 0.6 s apart (the bands should have moved), and from 2.6 m
// (it turns to face the viewer and flushes into its zebra display). Then anemone 0 and viewpoint 4, to check that the
// soft corals and anemones still draw correctly after a ninth fish shape was added to the mesh list.
// The hover position is recomputed with the formula of fpos() in the fish shader, without the push away from the
// viewer; "the side" is worked out from the slow turn in vsFish. Clock 20 s unless stated.
// Decode with _scratch/decode-captured-dataurls-to-images.mjs (names start with "fly": it builds sheet-flight.jpg).
async () => {
  for (let i = 0; i < 240 && !(window.dev && window.dev.balls); i++) await new Promise((r) => setTimeout(r, 250));
  if (!window.dev) return { error: 'dev tools not present' };
  await new Promise((r) => setTimeout(r, 2000));
  const canvas = document.querySelector('canvas'), d = window.dev, F = d.fish, out = { size: d.size, shots: {}, cuttlefish: 0, fishPerMesh: d.fishRanges.map((r) => r[1]) };
  const grab = () => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(() => res(canvas.toDataURL('image/jpeg', 0.92))))));
  let n = 0; const keep = async (label) => { out.shots['fly_' + String(n++).padStart(2, '0') + '_' + label] = await grab(); };
  const at = (o, t) => { const s = F[o + 4], R = F[o + 3]; return [F[o] + Math.sin(t * 0.11 + s * 31) * R, F[o + 1] + Math.sin(t * 0.23 + s * 17) * 0.2, F[o + 2] + Math.cos(t * 0.09 + s * 23) * R]; };
  let done = 0;
  for (let i = 0; i < F.length / 12; i++) {
    const o = i * 12; if (F[o + 9] !== 5) continue;
    out.cuttlefish++; if (done >= 3) continue;
    const T = 20, p = at(o, T), a0 = F[o + 7] * 6.3 + Math.sin(T * 0.13 + F[o + 4] * 9) * 1.3, sx = -Math.sin(a0), sz = Math.cos(a0); // sideways to its heading
    d.look(p[0] + sx * 6, p[1] + 0.3, p[2] + sz * 6, p[0], p[1], p[2], T); await keep('cuttlefish' + done + '_side_6m');
    d.look(p[0] + sx * 4, p[1] + 0.2, p[2] + sz * 4, p[0], p[1], p[2], T); await keep('cuttlefish' + done + '_side_4m_t20.0');
    d.look(p[0] + sx * 4, p[1] + 0.2, p[2] + sz * 4, p[0], p[1], p[2], T + 0.6); await keep('cuttlefish' + done + '_side_4m_t20.6');
    d.look(p[0] + sx * 2.1 + Math.cos(a0) * 1.5, p[1] + 0.5, p[2] + sz * 2.1 + Math.sin(a0) * 1.5, p[0], p[1], p[2], T); await keep('cuttlefish' + done + '_close_2.6m');
    done++;
  }
  const a = d.anemones[0]; if (a) { d.look(a[0] + 2, a[1] + 0.9, a[2] + 1.5, a[0], a[1], a[2], 20); await keep('check_anemone0'); }
  d.pose(4, 20); await keep('check_viewpoint4');
  return out;
}
