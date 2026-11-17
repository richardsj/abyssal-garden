# Workstream: denser reef life

Branch: `denser-reef-life` (created 2026-11-18 from `main` at `c0bdd17`).
This file is the plan and the running status of the workstream. Renders and numbers for each phase go in
`test-probe-steps/YYYYMMDD_HHMM-name/`, as in earlier rounds.

## Goal

More corals, more anemones, more fish, less barren rock. The frame rate is an aspiration, no longer a rigid gate.

## Decisions (2026-11-18)

| Topic | Decision |
|---|---|
| Frame budget | Average GPU (graphics processor) frame time under 16.7 ms on the M5 Max at 2560x1440, i.e. 60 frames per second on average. 11 ms stays the aspiration. Both average and 99th percentile are reported every phase. |
| Scope | Density first, using the kinds of life that already exist. New kinds come afterwards. |
| Verification | Each phase: before/after stills, benchmark, and the owner's own look. One blind critic round (an agent that sees only the renders) at the end. |
| Home | This branch plus this file. A phase is merged to `main`, and so to the live site, only when approved. |

Note on the frame budget: in the last quiet-machine runs the 99th percentile was about 1.4 times the average
(8.5 ms average, 12.3 ms 99th percentile). So once the average passes roughly 11.5-12 ms, about 1 frame in 100
takes longer than 16.7 ms. That is allowed by the decision above, but each phase report will say where it stands.

## Where things stand today (from the code and the 2026-11-16 reports)

- GPU time on a quiet M5 Max: 8.5-8.9 ms average, 12.3 ms 99th percentile
  (`test-probe-steps/20261116_1240-critic-round-6/PERFORMANCE_REPORT.md`).
- Life is cheap: about 14,000 fish, 70 anemones, soft corals, sea whips and polyp carpets cost nothing measurable.
  The frame time went into finer seabed, full-detail corals out to 22 m and finer kelp blades.
- Why rock is bare (`source/src/world.js`):
  - Sponges and corals are scattered from 13,000 candidate spots, but a spot is kept only 45% of the time outside
    five "hot zones" (`ZS`, `zw`).
  - Dense growth exists only in 16 hand-placed gardens (`GARD`): 80-260 pieces each, 16 soft corals, 4 anemones,
    one anthias cloud.
  - Sea whips and polyp carpets come from only 520 candidate spots, with the same 45% rule.
  - Everything is kept 2.2-3.5 m (anemones 6 m) clear of the scripted camera path (`nearFly`), so the rock the
    camera passes closest to is the emptiest.
- The round-6 blind critic already named the result: "dark low-detail rock fills most of the frame" at flight seconds
  17, 23, 52 and 57-58 (milder at 4 and 8), and "twelve consecutive seconds of kelp only" (25-36).
  These are the before/after test moments for this workstream.
- Fish today: 12 ribbon schools, one anthias cloud per garden plus 4, 3 bait balls with hunters, loners near
  gardens (up to 16 triggerfish, 18 parrotfish, 22 pairs of butterflyfish, 10 pairs of idols), clownfish in every
  anemone.

## Phases

Each phase ends with: stills before and after (six viewpoints plus the flight moments above), at least two benchmark
runs with a cool-down between them, the minified size of `index.html`, and the owner's approval before commit.

### Phase 0: baseline (no visual change)

- Count what exists: pieces per kind (corals, sponges, soft corals, anemones, whips, polyps, fish per species).
- A bare-rock number: for a sample of rock surface, the share that has no growth within 2 m. Computed by the
  generator in the dev build, so every later phase can quote one number for "less barren".
- Stills at the six viewpoints and at flight seconds 4, 8, 17, 23, 30, 52, 57.5.
- Benchmark on a cool, quiet machine (twice, a couple of minutes apart).
- Check the limits: instance buffer sizes, world-generation time and memory, what Low and Medium detail scale down.

### Phase 1: cover the bare rock (existing kinds)

- Raise the keep-rate outside the hot zones and the number of candidate spots for corals, sponges, whips and polyps.
- Let low-profile growth (polyp carpets, small corals and sponges) come closer to the camera path than the tall
  pieces do, so the nearest rock is no longer the emptiest. Tall pieces keep their clearance.
- Aim it at the flagged flight moments first, then everywhere.

### Phase 2: more corals and anemones

- More gardens (16 today), sized and placed by the bare-rock number from phase 0, each with soft corals.
- More anemones (70 today), including small groups outside the gardens, each with its clownfish.

### Phase 3: more fish

- An anthias cloud for every new garden, more loners (triggerfish, parrotfish, butterflyfish, idols), more ribbon
  schools, and fish in the kelp-only stretch of the flight (seconds 25-36).

### Phase 4: new kinds (to be chosen after phase 3)

Candidates, none decided: table or plate coral, brain coral, sea fans, encrusting colour patches drawn by the rock
shader (cover with no extra geometry), small reef-hugging fish that stay close to the rock.

### Phase 5: finish

- One blind critic round, the performance report, README update (feature list and numbers), merge to `main`.

## Things to watch

- The camera or a fish clipping through growth placed near the path.
- Low and Medium detail (phones): new content must be thinned by the existing `THIN` and `LV` controls, not added
  at full count.
- Zero allocations per frame: all new instances go into buffers built once at load.
- World-generation time and memory: the placement loops retry up to 300,000-400,000 times per item.
- Bundle size is the third priority: reported every phase, not a gate.
- Benchmark noise on a warm laptop was larger than a small change (2026-11-17: the same build read 8.0 and 14.0 ms).
  Compare only cool, spaced runs.

## Status log

- 2026-11-18: workstream created, decisions recorded. Nothing built yet. Next: phase 0.
