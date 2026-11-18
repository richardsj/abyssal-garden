// Runs inside dev.html through the chrome-devtools evaluate_script tool (sourcePath = this file, with
// filePath set so the large JSON goes to disk instead of the conversation).
// The before/after set for the denser-reef-life workstream: the six fixed viewpoints (scene clock held at 20 s)
// plus the flight moments the round-6 blind critic called bare ("dark low-detail rock fills most of the frame" at
// seconds 17, 23, 52, 57-58, milder at 4 and 8) and second 30, the middle of the kelp-only stretch (25-36).
// Straight from the WebGPU canvas at its real resolution (2560x1440 with the emulated viewport), JPEG quality 0.95.
// Decode with _scratch/decode-captured-dataurls-to-images.mjs (it builds sheet-poses.jpg and sheet-flight.jpg).
async () => {
  const canvas = document.querySelector('canvas'), out = { size: window.dev.size, shots: {} };
  // a requestAnimationFrame callback registered now runs after the page's own frame() in the same frame,
  // while the canvas still holds the picture that was just drawn
  const grab = () => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(() => res(canvas.toDataURL('image/jpeg', 0.95))))));
  for (let n = 1; n <= 6; n++) { window.dev.pose(n, 20); out.shots['pose' + n] = await grab(); }
  for (const t of [4, 8, 17, 23, 30, 52, 57.5]) { window.dev.fly(t); out.shots['fly' + String(t).padStart(2, '0')] = await grab(); }
  return out;
}
