# Denser reef life, phase 1: cover for the bare rock (2026-11-18)

Compared with the phase 0 baseline (`../20261118_1050-denser-reef-phase-0-baseline/REPORT.md`). Same machine and
method: Apple M5 Max, macOS 27.2.1, Chrome 157, mains power, 2560x1440 at device pixel ratio 1, detail High.

## What changed (`source/src/world.js`, one new block before the fish)

Everything is added in new sections with their own random seeds (17, 18, 19), so nothing that was already placed
moved: the existing corals, sponges, anemones, fish and viewpoints are exactly where they were.

- Terrain: 26,000 more candidate spots for sponge and coral clusters, in patches (a noise mask) rather than evenly.
  Walls and overhangs take most of it; floors keep 30% of their candidates because plants already cover them.
  Overhangs get sponges only, hanging along the rock's normal. Corals are 20% of clusters on walls, 45% on floors.
- 700 more candidate spots for sea whips (one in three) and polyp carpets, the carpets now on walls as well as floors.
- Loose rock: sponges and corals on the floating and resting boulders, rooted at vertices of the boulder's own mesh,
  about 0.95 pieces per square metre, small (sponges 0.18-0.5, corals 0.35-0.9, scaled by boulder size), corals
  mostly on top, a little thinner underneath. On a floating boulder each piece has the boulder's bob amplitude and a
  seed shifted by a multiple of PI / 20, so it moves exactly with the rock and still has its own colour.
- Distance from the scripted flight is now a true distance, not the old 13 m column: corals stay 2.2 m plus their
  size away, sponges 3.5 m plus their size (the round-6 critic found sponges blocky up close), polyps 2 m, whips 4 m.
- New pieces skip any 0.7 m cube that already holds a sponge or coral.
- Medium and Low detail keep every 2nd / 4th new cluster and boulder.

## Result

| Rock | No reef life within 2 m | Nothing at all within 2 m |
|---|---|---|
| all | 29.3% (was 63.8%) | 12.2% (was 31.8%) |
| up-facing (floors, ledges) | 37.0% (was 61.7%) | 7.6% (was 13.3%) |
| walls | 22.7% (was 63.5%) | 16.2% (was 46.8%) |
| overhangs | 23.0% (was 76.2%) | 15.1% (was 50.7%) |
| within 10 m of the flight path | 33.7% (was 59.0%) | 7.9% (was 16.8%) |

Loose rock: all 225 large boulders (87 floating, 138 resting) now carry growth, 588 boulders in all, with 2,313
pieces on floating rock and 2,109 on resting rock. Before: none.

| Kind | Now | Was |
|---|---|---|
| sponges | 35,190 | 9,689 |
| corals | 11,783 | 8,016 |
| sea whips | 1,132 | 481 |
| polyps | 10,655 | 1,714 |
| soft coral trees, anemones, fish, plants | unchanged | |

Along the flight, rock within 10 m of the camera with nothing at all within 2 m (before > after): second 21-22
65% > 10-15%; 15-17 30-36% > 14-23%; 50-52 11-23% > 2-10%; 9 56% > 36%; 55-56 29-30% > 21-22%.
Rock with no reef life in the kelp-only stretch (26-32): 73-99% > 25-59%. Full table: `census-phase-1-summary.md`.

## Cost

| Run | GPU avg | GPU 99th percentile | GPU max | GPU frames over 16.7 ms | Frame avg | Frames |
|---|---|---|---|---|---|---|
| baseline 1 | 8.03 ms | 10.81 ms | 32.11 ms | 2 | 9.07 ms | 6,614 |
| baseline 2 | 7.90 ms | 10.55 ms | 43.78 ms | 8 | 9.03 ms | 6,642 |
| phase 1, run 1 | 8.31 ms | 11.14 ms | 44.43 ms | 5 | 9.30 ms | 6,452 |
| phase 1, run 2 | 8.98 ms | 12.26 ms | 43.19 ms | 4 | 9.88 ms | 6,073 |

- About 0.4-1.0 ms more graphics processor time on average; the two phase 1 runs differ from each other by more than
  the baseline runs did, so the cost is not pinned down better than that. Each run followed a three-minute cool-down
  on a blank tab; the machine was not quiet (window system 29-38% of a core, WiFi Explorer 27% before run 1).
- Under the workstream ceiling (16.7 ms average) by about 7.7-8.4 ms, and still under the 11 ms aspiration.
- Triangles in sponges and corals: 34.9 million in the world (was 20.0), drawn only in visible 24 m cells within 110 m.
- `index.html`: 124,104 bytes minified (was 120,209): 3,895 bytes more.
- World build: ready within about 3.5-3.7 s of opening the page (was 3.1-5.5 s): no measurable change.
- Low detail (forced on this machine, not a phone): loads with no console errors; the new growth thins to 6,746
  sponges, 963 corals, 146 boulders planted. Not tested on a real phone.

## Checks

- Bob: one floating boulder photographed from 6.5 m at clock 20 s and 30.5 s (half a bob period apart). Every sponge
  and coral is at the same place on the rock in both (`bob-check/`).
- Existing layout: in the before/after pairs the earlier pieces are in identical positions.
- Looked at: the flight sheet and the five floating-rock views of each trial build, and the final before/after pairs
  for flight second 52, the floating rock near the start and viewpoint 2. The other final pairs are in `before-after/`
  and were not each inspected.

## Tuning history (same session)

1. First try (0.5 pieces per m2 on boulders, sponges 0.3-0.75): rock numbers as above, but barrel sponges were too big
   for the boulders and read as pots stuck on. Indicative benchmark 9.05 ms (`bench-try-1-indicative.json`).
2. Smaller pieces, corals mostly on top, half the underside candidates skipped: better, but large faces seen from
   below (where a diver looks at floating rock from) were sparse.
3. Final: 0.95 pieces per m2, 30% of underside candidates skipped.

## Not done, or weaker than it sounds

- Second 9 (36% of nearby rock still with nothing) and 55-56 (21-22%): where the flight hugs rock, the clearance
  rules keep the closest rock empty. Polyp carpets are the only new growth allowed nearer than about 2.7 m.
- Sponges are 3.6 times as many, and they are the shape the critic called blocky up close. New ones are kept away from
  the scripted flight, but a free swimmer can go up to any of them. A better sponge shape is a phase 4 candidate.
- No sea whips, polyps or anemones on floating rock (the tentacle shader has no bob).
- The 66,608 rock chunks set into the terrain are still not planted on directly; growth on the terrain beside them
  can be hidden inside a chunk.
- Viewpoint 2 (the shipwreck) looks almost unchanged: its big cliff is a dark silhouette at a distance.
- The kelp-only stretch still has no fish to look at (phase 3).

## Files

- `stills/`, `stills-floating-rocks/`: the same 13 + 5 views as the baseline. `before-after/`: baseline left, phase 1
  right, one file per view (images are gitignored).
- `census-phase-1.json`, `census-phase-1-summary.md`, `bench-phase-1-run-1.json`, `bench-phase-1-run-2.json`.
- New script: `_scratch/make-before-after-image-pairs.sh`.
