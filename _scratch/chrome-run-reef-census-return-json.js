// Runs inside dev.html through the chrome-devtools evaluate_script tool (sourcePath = this file, filePath set so the
// JSON goes to disk). Waits for the world to be built, then returns window.dev.census(): counts of every kind of
// growth and fish, and the share of rock with nothing growing within 2 m (overall, near the flight path, and per
// second of the flight). Also records when the world became ready (ms since navigation) and the page's JS heap.
// Part of the denser-reef-life workstream: run it before and after each phase and compare the two files.
async () => {
  let readyMs = -1;
  for (let i = 0; i < 240 && !(window.dev && window.dev.balls); i++) await new Promise((r) => setTimeout(r, 250));
  if (!window.dev) return { error: 'dev tools not present: is this dev.html?' };
  readyMs = Math.round(performance.now());
  const t0 = performance.now(), census = window.dev.census();
  return { size: window.dev.size, worldReadyMsAtOrBefore: readyMs, censusMs: Math.round(performance.now() - t0), jsHeapMB: performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1048576) : -1, ...census };
}
