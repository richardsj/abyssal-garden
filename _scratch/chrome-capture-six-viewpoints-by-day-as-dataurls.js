// Runs inside dev.html through the chrome-devtools evaluate_script tool (sourcePath = this file, filePath set).
// The six viewpoints by day (dev.night(0, 0): full daylight, water still) at clock 20 s, the same moment as the night
// set from chrome-capture-night-dive-views-as-dataurls.js, so day and night pictures pair up. Names pose1..pose6.
// Decode with _scratch/decode-captured-dataurls-to-images.mjs.
async () => {
  for (let i = 0; i < 240 && !(window.dev && window.dev.balls); i++) await new Promise((r) => setTimeout(r, 250));
  if (!window.dev) return { error: 'dev tools not present' };
  await new Promise((r) => setTimeout(r, 2000));
  const canvas = document.querySelector('canvas'), d = window.dev, T = 20, out = { size: d.size, shots: {} };
  const grab = () => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(() => res(canvas.toDataURL('image/jpeg', 0.92))))));
  d.night(0, 0);
  for (let n = 1; n <= 6; n++) { d.pose(n, T); out.shots['pose' + n] = await grab(); }
  return out;
}
