// ============================================================================
// development tools: only in dev.html (npm run build:dev), never in index.html
// ============================================================================
//   F    fly the camera along the scripted path (FLY in main.js), one minute through the whole world
//   B    the same flight as a benchmark: the resolution stays fixed, every frame is timed, the result is shown at the end
//   F, B or 1-6 during a flight stop it
{
  const LOGN = 1 << 16, logFrame = new Float32Array(LOGN), logGpu = new Float32Array(LOGN), logAt = new Float32Array(LOGN);
  let flying = false, bench = false, last = 0, nFrame = 0, nGpu = 0;
  const stop = () => { flying = bench = false; dynT = 0; };
  const report = () => {
    const st = (a, n) => { const s = Array.from(a.subarray(0, n)).sort((x, y) => x - y); let sum = 0; for (const v of s) sum += v; return { n, avg: sum / n, p99: s[min(n - 1, floor(n * 0.99))], max: s[n - 1] }; };
    const fm = (o) => `avg ${o.avg.toFixed(2)}  p99 ${o.p99.toFixed(2)}  max ${o.max.toFixed(2)} ms`;
    const f = st(logFrame, nFrame), gp = nGpu ? st(logGpu, nGpu) : null;
    info.textContent = `Fly-through ${W}x${H}, ${f.n} frames\nframe  ${fm(f)}\nGPU    ${gp ? fm(gp) : 'timestamp-query unavailable'}`;
    // the same numbers for scripts: window.dev.result and one console line
    const over = (a, n) => { let c = 0; for (let i = 0; i < n; i++) if (a[i] > 16.7) c++; return c; };
    f.over16_7 = over(logFrame, nFrame); if (gp) gp.over16_7 = over(logGpu, nGpu);
    // where the slow frames were: [flight seconds, frame ms, GPU ms reported that frame]
    const slow = []; for (let i = 0; i < nFrame && slow.length < 200; i++) if (logFrame[i] > 16.7 || logGpu[i] > 16.7) slow.push([+logAt[i].toFixed(2), +logFrame[i].toFixed(1), +logGpu[i].toFixed(1)]);
    dev.result = { width: W, height: H, detail: LV, drawDistanceScale: det, frame: f, gpu: gp, slow };
    console.log('BENCH ' + JSON.stringify(dev.result));
  };
  // Scripted control (URL parameters or window.dev from the console / an automation driver):
  //   ?pose=3&time=20   still at viewpoint 3 with the scene clock held at 20 s
  //   ?fly=12.5         still at 12.5 s into the flight (clock held at the same value unless &time= is given)
  //   ?bench=1          run the benchmark flight 3 s after loading
  // Any of them pins the resolution to its maximum (2560x1440 in a window that size) and the draw distance to full.
  let pinned = false, fixT = -1;
  const pin = () => { pinned = true; hud = false; info.textContent = ''; pix = PIXMAX; det = 1; resize(); ui(false); $('o').style.display = 'none'; };
  const startFlight = (b) => { flying = true; bench = b; fixT = -1; F[FLT] = 0; last = F[LAST]; nFrame = nGpu = 0; if (b) { hud = false; info.textContent = ''; dynT = -Infinity; } };
  const dev = window.dev = {
    result: null,
    pose(n, t) { pin(); stop(); lookAt(...POSES[n - 1]); F[VX] = F[VY] = F[VZ] = 0; if (t >= 0) fixT = t; },
    fly(ft, t) { pin(); stop(); F[FLT] = ft; flyAt(); F[VX] = F[VY] = F[VZ] = 0; fixT = t >= 0 ? t : ft; },
    // camera at (x, y, z) looking at (tx, ty, tz), scene clock held at t if given
    look(x, y, z, tx, ty, tz, t) { pin(); stop(); lookAt(x, y, z, tx, ty, tz); F[VX] = F[VY] = F[VZ] = 0; if (t >= 0) fixT = t; },
    terrain: [T.nv, T.start[T.start.length - 1]], FLY, at(t) { F[FLT] = t; flyAt(); return [F[SPL], F[CX], F[CY], F[CZ], F[YAW], F[PIT]]; }, balls: Wd.BALLS, spots: Wd.SPOTS, anemones: Wd.ANEM, fishRanges: Wd.fishR, fish: Wd.fish,
    // What grows where (WORKSTREAM-denser-reef-life.md): counts per kind, and how much rock has nothing growing near it.
    // Rock = terrain vertices below 8 m depth within 170 m of the centre, the same ones the generator places growth on.
    // "bare" = nothing rooted within 2 m. Reef life = sponges, corals, soft corals, anemones, sea whips, polyps;
    // plants = kelp, foliage and ground cover. nearPath = within 10 m of the scripted flight; perSecond = within 10 m
    // of the camera at each second of it.
    // Needs the page opened as dev.html?census=1, which keeps the generator's data instead of freeing it after upload.
    census() {
      if (!T.wp) return { error: 'the generator data was freed: open dev.html?census=1' };
      const C = 2, key = (x, y, z) => floor(x / C) + 512 + 1024 * (floor(y / C) + 512 + 1024 * (floor(z / C) + 512));
      // growth rooted in the same 25 cm cube counts once, so a polyp carpet or kelp column is a few points, not thousands
      const S = 0.25, key2 = (x, y, z) => floor(x / S) + 2048 + 4096 * (floor(y / S) + 2048 + 4096 * (floor(z / S) + 2048)), seen = [new Set(), new Set()];
      const grid = [new Map(), new Map()], put = (g, x, y, z) => { const k2 = key2(x, y, z); if (seen[g].has(k2)) return; seen[g].add(k2); const k = key(x, y, z); let a = grid[g].get(k); if (!a) grid[g].set(k, a = []); a.push(x, y, z); };
      const t0 = performance.now(); let tGrid = 0, truncated = false;
      const props = {}; PROPM.forEach((m, i) => { const d = Wd.props[i].data; props['mesh' + m] = Wd.props[i].n; for (let k = 0; k < d.length; k += 12) put(0, d[k], d[k + 1], d[k + 2]); });
      const td = Wd.tent.data, tk = [0, 0, 0];
      for (let k = 0; k < td.length; k += 12) { const kind = td[k + 8]; tk[kind]++; if (kind !== 1 || !(tk[1] & 7)) put(0, td[k], td[k + 1], td[k + 2]); }
      const leaves = {}; for (const [name, L] of [['big', Wd.big], ['small', Wd.small]]) {
        const f = new Float32Array(L.buf), u8 = new Uint8Array(L.buf);
        const byType = new Uint32Array(256);
        for (let k = 0; k < L.n; k++) { byType[u8[k * 36 + 32]]++; put(1, f[k * 9], f[k * 9 + 1], f[k * 9 + 2]); }
        byType.forEach((n, ty) => { if (n) leaves[name + 'Type' + ty] = n; });
      }
      tGrid = performance.now() - t0;
      // 0 = something within 1 m, 1 = within 2 m, 2 = nothing within 2 m
      const near = (g, x, y, z) => {
        let best = 9;
        for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) for (let c = -1; c <= 1; c++) {
          const arr = grid[g].get(key(x + a * C, y + b * C, z + c * C)); if (!arr) continue;
          for (let i = 0; i < arr.length; i += 3) { const d = (arr[i] - x) ** 2 + (arr[i + 1] - y) ** 2 + (arr[i + 2] - z) ** 2; if (d < best) { best = d; if (d < 1) return 0; } }
        }
        return best < 4 ? 1 : 2;
      };
      const nPath = flyPts.length - POSES.length, tally = () => ({ samples: 0, reefWithin1m: 0, bareOfReef: 0, bareOfAll: 0 });
      const out = { all: tally(), upFacing: tally(), walls: tally(), overhangs: tally(), nearPath: tally() }, perSecond = Array.from({ length: 61 }, tally);
      const add = (t, r, p) => { t.samples++; if (!r) t.reefWithin1m++; if (r > 1) { t.bareOfReef++; if (p > 1) t.bareOfAll++; } };
      const step = max(1, floor(T.nv / 200000));
      for (let v = 0, n = 0; v < T.nv; v += step) {
        if (!(++n & 1023) && performance.now() - t0 > 20000) { truncated = true; break; } // never hang the page
        const x = T.wp[v * 3], y = T.wp[v * 3 + 1], z = T.wp[v * 3 + 2], ny = T.wn[v * 3 + 1];
        if (hypot(x, z) > 170 || y > -8) continue;
        const r = near(0, x, y, z), p = r > 1 ? near(1, x, y, z) : 0;
        add(out.all, r, p); add(ny > 0.5 ? out.upFacing : ny < -0.3 ? out.overhangs : out.walls, r, p);
        let np = false; for (let i = 0; i < nPath; i++) { const q = flyPts[i]; if ((q[0] - x) ** 2 + (q[1] - y) ** 2 + (q[2] - z) ** 2 < 100) { np = true; if (!(i % 10)) add(perSecond[i / 10], r, p); } }
        if (np) add(out.nearPath, r, p);
      }
      // Loose rock: boulders (meshes 0-3) are separate objects resting on the seabed. The floating ones (bob > 0) were
      // removed from the scene on 2026-11-18, so those counts should read 0. "Big" = scale over 1.1.
      const sd = Wd.solids.data, boulders = { floating: 0, floatingBig: 0, resting: 0, restingBig: 0 }, bigFloat = [];
      for (let m = 0; m < 4; m++) { const [s, n] = Wd.solids.ranges[m]; for (let i = s; i < s + n; i++) { const k = i * 12, sc = sd[k + 3], fl = sd[k + 11] > 0; boulders[fl ? 'floating' : 'resting']++; if (sc > 1.1) { boulders[fl ? 'floatingBig' : 'restingBig']++; if (fl) bigFloat.push([+sd[k].toFixed(1), +sd[k + 1].toFixed(1), +sd[k + 2].toFixed(1), +sc.toFixed(2)]); } } }
      bigFloat.sort((a, b) => b[3] - a[3]);
      const pc = (t) => ({ samples: t.samples, reefWithin1mPct: +(100 * t.reefWithin1m / t.samples).toFixed(1), bareOfReefPct: +(100 * t.bareOfReef / t.samples).toFixed(1), bareOfAllPct: +(100 * t.bareOfAll / t.samples).toFixed(1) });
      const rock = {}; for (const k in out) rock[k] = pc(out[k]);
      return {
        detail: LV, terrainVertices: T.nv, sampleStep: step, truncated, gridMs: Math.round(tGrid), totalMs: Math.round(performance.now() - t0),
        distinctPoints: { reef: seen[0].size, plants: seen[1].size },
        props, propTriangles: Object.fromEntries(PROPM.map((m) => ['mesh' + m, meshes[m].ib.length / 3])), anemones: Wd.ANEM.length, anemoneTentacles: tk[0], polyps: tk[1] / 8, seaWhips: tk[2], leaves,
        rockChunks: Wd.chunks.map((c) => c.n), fishPerMesh: Wd.fishR.map((r) => r[1]), fishTotal: Wd.fish.length / 12,
        grown: Wd.grown, // what the denser-reef sections of the generator added (already included in the counts above)
        boulders, bigFloatingBoulders: bigFloat, // [x, y, z, scale], largest first
        rock, samplesPerFlightSecond: perSecond.map((t) => t.samples), bareOfReefPctPerFlightSecond: perSecond.map((t) => t.samples ? Math.round(100 * t.bareOfReef / t.samples) : -1), bareOfAllPctPerFlightSecond: perSecond.map((t) => t.samples ? Math.round(100 * t.bareOfAll / t.samples) : -1),
      };
    },
    bench() { pin(); dev.result = null; startFlight(true); },
    flight() { pin(); startFlight(false); }, get flying() { return flying; },
    get gpu() { return F[GPU]; },
    get size() { return W + 'x' + H; },
  };
  // frame() moves the free camera and then calls render(): step in between and put the camera on the path instead
  const draw = render;
  render = () => {
    if (pinned) { dynT = -Infinity; if (fixT >= 0) F[TIME] = fixT; }
    if (flying) {
      const dtr = F[LAST] - last; last = F[LAST];
      F[FLT] += min(dtr / 1000, 0.1); flyAt();
      if (bench && nFrame < LOGN) { logAt[nFrame] = F[FLT]; logFrame[nFrame++] = dtr; if (F[GPU] > 0) logGpu[nGpu++] = F[GPU]; }
      if (F[FLT] >= FLYT) { if (bench) report(); stop(); }
    }
    draw();
  };
  addEventListener('keydown', (e) => {
    if (menu || e.repeat) return;
    if (e.code === 'KeyF' || e.code === 'KeyB') {
      if (flying) stop();
      // a benchmark hides the stats line and holds the resolution: dynT at -Infinity keeps frame() from tuning it
      else startFlight(e.code === 'KeyB');
    } else if (/Digit[1-6]/.test(e.code)) stop();
  });
  const qp = new URLSearchParams(location.search), num = (k) => qp.has(k) ? +qp.get(k) : -1;
  if (qp.has('pose')) dev.pose(num('pose'), num('time'));
  else if (qp.has('fly')) dev.fly(num('fly'), num('time'));
  else if (qp.has('bench')) { pin(); setTimeout(dev.bench, 3000); }
}
