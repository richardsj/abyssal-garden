// Runs inside dev.html through the chrome-devtools evaluate_script tool (sourcePath = this file, filePath set).
// The "curious but cautious" cuttlefish, from a camera that does not move. For the first two cuttlefish (fish with
// behaviour 5; 12 floats each: x,y,z,R | seed,speed,size,phase | colour,behaviour,p1,p2) at clock 20 s, with the camera
// about 8 m from where the cuttlefish hovers when left alone, and again from about 5 m:
//   1_unsettled   dev.curious(0): the viewer has only just arrived; the cuttlefish is at its own spot
//   2_settled     dev.curious(1): the viewer has kept still for five seconds; it should have come most of the way over,
//                 be larger in the frame and face the camera more squarely
//   3_fast        dev.curious(0) and dev.night(0, 1) (water fully stirred, as when swimming fast): it should be further
//                 away than in 1 and paler
// Each camera looks at the cuttlefish's own spot in all three, so the framing is identical and only the animal moves.
// `notes` gives that spot and the camera. A camera may be inside rock (noted earlier: fish swim through rock).
// Decode with _scratch/decode-captured-dataurls-to-images.mjs (names start with "fly": it builds sheet-flight.jpg).
async () => {
  for (let i = 0; i < 240 && !(window.dev && window.dev.balls); i++) await new Promise((r) => setTimeout(r, 250));
  if (!window.dev) return { error: 'dev tools not present' };
  await new Promise((r) => setTimeout(r, 2000));
  const canvas = document.querySelector('canvas'), d = window.dev, F = d.fish, T = 20, out = { size: d.size, shots: {}, notes: {} };
  const grab = () => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(() => res(canvas.toDataURL('image/jpeg', 0.92))))));
  let n = 0, found = 0;
  for (let o = 0; o < F.length && found < 2; o += 12) {
    if (F[o + 9] < 4.5) continue;
    const R = F[o + 3], s = F[o + 4], p = [F[o] + Math.sin(T * 0.11 + s * 31) * R, F[o + 1] + Math.sin(T * 0.23 + s * 17) * 0.2, F[o + 2] + Math.cos(T * 0.09 + s * 23) * R];
    for (const dist of [8, 5]) {
      const cam = [p[0] + dist * 0.72, p[1] + 0.6, p[2] + dist * 0.69];
      const states = [['1_unsettled', 0, 0], ['2_settled', 1, 0], ['3_fast', 0, 1]];
      for (const [label, calm, stir] of states) {
        d.look(cam[0], cam[1], cam[2], p[0], p[1], p[2], T); d.curious(calm); d.night(0, stir);
        const name = 'fly_' + String(n++).padStart(2, '0') + '_cuttlefish' + found + '_from' + dist + 'm_' + label;
        out.shots[name] = await grab(); out.notes[name] = { camera: cam.map((v) => +v.toFixed(2)), ownSpot: p.map((v) => +v.toFixed(2)) };
      }
    }
    found++;
  }
  d.curious(-1); d.night(0, -1); d.pose(1, T);
  return out;
}
