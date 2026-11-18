// Runs inside index.html (or dev.html) through the chrome-devtools evaluate_script tool (sourcePath = this file).
// Checks that the N key really changes the light, not just the menu button: waits for the page, dives in, then
// presses N and records the average brightness of the picture (0..255, from a 64x36 copy of the canvas) every half
// second for nine seconds; then presses N again and records nine more seconds.
// The tab must be in front: a hidden tab draws no frames, so nothing would change.
async () => {
  for (let i = 0; i < 240 && document.body.className !== 'm'; i++) await new Promise((r) => setTimeout(r, 250));
  const canvas = document.querySelector('canvas'), small = document.createElement('canvas'); small.width = 64; small.height = 36;
  const ctx = small.getContext('2d', { willReadFrequently: true });
  const bright = () => new Promise((res) => requestAnimationFrame(() => { ctx.drawImage(canvas, 0, 0, 64, 36); const d = ctx.getImageData(0, 0, 64, 36).data; let s = 0; for (let i = 0; i < d.length; i += 4) s += d[i] * 0.2126 + d[i + 1] * 0.7152 + d[i + 2] * 0.0722; res(+(s / (64 * 36)).toFixed(1)); }));
  const lit = () => document.querySelector('#n .on')?.textContent;
  document.getElementById('d').click(); await new Promise((r) => setTimeout(r, 1500));
  const out = { visible: document.visibilityState, start: { button: lit(), brightness: await bright() }, afterFirstN: [], afterSecondN: [] };
  for (const list of [out.afterFirstN, out.afterSecondN]) {
    dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyN' })); dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyN' }));
    out[list === out.afterFirstN ? 'buttonAfterFirstN' : 'buttonAfterSecondN'] = lit();
    for (let k = 0; k < 18; k++) { await new Promise((r) => setTimeout(r, 500)); list.push(await bright()); }
  }
  return out;
}
