// Runs inside dev.html through the chrome-devtools evaluate_script tool (sourcePath = this file, filePath set).
// One jellyfish (the one nearest -17.8, -9, 4.8, in the swarm by the start) photographed from a camera that does NOT
// move, at six evenly spaced moments across one pulse. For judging the thrust: the bell should sit higher in the frames
// after the squeeze and settle back. `moments` in the output gives, for each frame, the clock, how far through the
// pulse it is, the squeeze (0 open .. 1 shut) and the height of the bell's centre above its height at the first frame,
// worked out with the formulas of vsJelly (without the push away from the viewer).
// Decode with _scratch/decode-captured-dataurls-to-images.mjs (names start with "fly": it builds sheet-flight.jpg).
async () => {
  for (let i = 0; i < 240 && !(window.dev && window.dev.balls); i++) await new Promise((r) => setTimeout(r, 250));
  if (!window.dev) return { error: 'dev tools not present' };
  await new Promise((r) => setTimeout(r, 2000));
  const canvas = document.querySelector('canvas'), d = window.dev, J = d.jellies, N = J.length / 8, out = { size: d.size, shots: {}, moments: [] };
  const grab = () => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(() => res(canvas.toDataURL('image/jpeg', 0.93))))));
  const S = (a, b, x) => { const u = Math.min(1, Math.max(0, (x - a) / (b - a))); return u * u * (3 - 2 * u); }, TH = (pp) => (((pp - 0.3) / 6.2831853) % 1 + 1) % 1;
  const rate = (o) => 2.6 / (0.5 + J[o + 5]), phase = (o, t) => t * rate(o) + J[o + 6] * 6.2831853;
  const at = (o, t) => { const R = J[o + 3], sz = J[o + 5], ph = J[o + 6], pp = phase(o, t); return [J[o] + R * Math.cos(t * 0.03 + ph * 5), J[o + 1] + 1.5 * Math.sin(t * 0.05 + ph * 9) + 0.55 * sz * (S(0, 0.25, TH(pp)) - S(0.25, 1, TH(pp))), J[o + 2] + R * Math.sin(t * 0.027 + ph * 7)]; };
  let o = 0, bd = 1e9; for (let i = 0; i < N; i++) { const p = at(i * 8, 20), dd = Math.hypot(p[0] + 17.8, p[1] + 9, p[2] - 4.8); if (dd < bd) { bd = dd; o = i * 8; } }
  const sz = J[o + 5], period = 6.2831853 / rate(o);
  // start where the thrust starts (th = 0), so the frames run: about to squeeze, rising, top, settling...
  const pp20 = phase(o, 20), t0 = 20 + (((0.3 - pp20) % 6.2831853) + 6.2831853) % 6.2831853 / rate(o), p0 = at(o, t0);
  out.jellyfish = { bellRadius: +sz.toFixed(2), pulseSeconds: +period.toFixed(2), expectedLift: +(0.55 * sz).toFixed(2) };
  for (let k = 0; k < 6; k++) {
    const t = t0 + k * period / 6, p = at(o, t), pp = phase(o, t);
    d.look(p0[0] + 4.2, p0[1] - 0.5 * sz, p0[2], p0[0], p0[1] - 0.5 * sz, p0[2], t); // fixed: aimed at where it was at the first frame
    out.shots['fly_' + k + '_pulse_' + k + '_of_6'] = await grab();
    out.moments.push({ frame: k, clock: +t.toFixed(2), throughPulse: +TH(pp).toFixed(2), squeeze: +Math.pow(0.5 + 0.5 * Math.sin(pp), 3).toFixed(2), heightAboveFirstFrame: +(p[1] - p0[1]).toFixed(2) });
  }
  return out;
}
