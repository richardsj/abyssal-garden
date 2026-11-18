// Runs inside one of the water palette pages (built by _scratch/build-water-palette-variant-pages.mjs) through the
// chrome-devtools evaluate_script tool (sourcePath = this file, filePath set so the JSON goes to disk).
// Nine views chosen to show the water: the six fixed viewpoints (clock held at 20 s) and flight seconds 8 (a long view
// down a canyon), 30 (inside the kelp) and 52 (a garden under a cliff). Each picture is drawn at 1600x900 with the
// palette's name stamped in the corner, so strips of the same view across palettes label themselves.
// Join the palettes with _scratch/make-water-palette-comparison-strips.sh.
async () => {
  for (let i = 0; i < 240 && !(window.dev && window.dev.balls); i++) await new Promise((r) => setTimeout(r, 250));
  if (!window.dev) return { error: 'dev tools not present' };
  await new Promise((r) => setTimeout(r, 2000));
  const canvas = document.querySelector('canvas'), name = window.WATER_PALETTE || 'unknown', out = { size: window.dev.size, palette: name, shots: {} };
  const c2 = document.createElement('canvas'); c2.width = 1600; c2.height = 900; const x = c2.getContext('2d');
  // a requestAnimationFrame callback registered now runs after the page's own frame() in the same frame, while the
  // WebGPU canvas still holds the picture that was just drawn
  const grab = (view) => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(() => {
    x.drawImage(canvas, 0, 0, 1600, 900);
    x.font = '600 34px ui-monospace, Menlo, monospace'; x.lineWidth = 6; x.strokeStyle = 'rgba(0,0,0,.75)'; x.fillStyle = '#fff';
    x.strokeText(name, 24, 48); x.fillText(name, 24, 48);
    res(c2.toDataURL('image/jpeg', 0.92));
  }))));
  for (let n = 1; n <= 6; n++) { window.dev.pose(n, 20); out.shots['view' + n + '_viewpoint' + n] = await grab(); }
  let k = 7; for (const t of [8, 30, 52]) { window.dev.fly(t); out.shots['view' + k++ + '_flight' + t + 's'] = await grab(); }
  return out;
}
