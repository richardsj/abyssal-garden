// Runs inside dev.html through the chrome-devtools evaluate_script tool (sourcePath = this file, with
// filePath set so the large JSON goes to disk instead of the conversation).
// Views aimed at five of the largest floating boulder clusters (positions from dev.census(), 2026-11-18), which
// the six fixed viewpoints only catch at the frame edges. Part of the before/after set of the denser-reef-life
// workstream: nothing grows on loose rock in the baseline. The camera sits 10-11 m from the boulder and 3.5 m
// below it, looking up at it as a diver would; scene clock held at 20 s. Each entry: name, boulder x y z, the
// camera's direction from the boulder in degrees (0 = toward the world's centre) and its distance. The directions
// were picked from a probe of several (kelp or rock blocked the others).
// Shot names start with "pose" so _scratch/decode-captured-dataurls-to-images.mjs lays them out as a sheet.
async () => {
  const canvas = document.querySelector('canvas'), out = { size: window.dev.size, shots: {}, cameras: {} };
  const grab = () => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(() => res(canvas.toDataURL('image/jpeg', 0.95))))));
  const ROCKS = [['near_start', -13.3, -9, 5.2, 0, 10], ['north_cluster', 33.4, -12.3, -76.1, 270, 11], ['west_cluster', -61.5, -19.4, -22.2, 0, 10], ['east_cluster', 90.4, -19.8, 25.9, 180, 11], ['south_cluster', 15.4, -10.5, 93.2, 270, 11]];
  let n = 1;
  for (const [name, x, y, z, deg, dist] of ROCKS) {
    const a = Math.atan2(-z, -x) + deg * Math.PI / 180, cx = x + Math.cos(a) * dist, cy = y - 3.5, cz = z + Math.sin(a) * dist;
    window.dev.look(cx, cy, cz, x, y, z, 20);
    out.cameras[name] = [cx, cy, cz, x, y, z];
    out.shots['pose' + n++ + '_floating_rock_' + name] = await grab();
  }
  return out;
}
