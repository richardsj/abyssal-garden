// Runs inside dev.html or bench.html through the chrome-devtools evaluate_script tool (sourcePath = this file).
// Like chrome-run-benchmark-flight-return-json.js, but first waits for the page to finish loading (window.dev present
// and the world built), then 3 s more for the first frames, so it can be called straight after a navigation.
// Returns the benchmark result plus the page address, the canvas size and whether the night dive is on.
async () => {
  for (let i = 0; i < 240 && !(window.dev && window.dev.balls); i++) await new Promise((r) => setTimeout(r, 250));
  if (!window.dev) return { error: 'dev tools not present' };
  await new Promise((r) => setTimeout(r, 3000));
  window.dev.bench();
  for (let i = 0; i < 150 && !window.dev.result; i++) await new Promise((r) => setTimeout(r, 500));
  const r = window.dev.result || { error: 'benchmark did not finish in 75 s', visible: document.visibilityState };
  return { page: location.pathname + location.search, size: window.dev.size, nightButtonLit: document.querySelector('#n .on')?.textContent || 'no night button (older build)', result: r };
}
