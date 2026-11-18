# Denser reef life: floating rocks removed (2026-11-18)

Follows phase 1 (`../20261118_1120-denser-reef-phase-1-rock-cover/REPORT.md`), whose notes about growth on floating
rock and about bob are now history.

## Why

The owner's remark that the six viewpoints miss the floating rocks (viewpoint 3 left, viewpoint 5 top) meant they
should not be there: "a strange aberration ... a little immersion breaking". Phase 1 had read it as "they are bare"
and planted sponges and corals on them. That was a misreading. The original brief (`prompt.txt`) lists floating
boulders; this decision overrides it.

## What changed

- `world.js`: the floating boulder clusters are gone (20 clusters, 852 boulders with their satellites; random seed 8
  is unused). The next section reseeds, so the 582 boulders resting on the seabed and everything else are unmoved.
- `world.js`: growth on boulders now covers resting boulders only; the seed-shift logic that matched a floating
  rock's bob is deleted.
- `shaders.js`: the bob line is removed from the solid vertex shader (every remaining object had a bob of zero), which
  saves a sine per vertex of every rock, sponge and coral.
- `README.md`: floating boulders dropped from the feature list and from the list of things you can swim through.

## Result

- Census: floating boulders 0 (was 852); resting 582, all 138 large ones planted (388 boulders, 2,115 pieces).
- Rock cover is as in phase 1: 29.3% of rock with no reef life within 2 m (baseline 63.8%), 12.2% with nothing at all
  (baseline 31.8%). Sponges 33,367, corals 11,299 (phase 1 had 35,190 and 11,783: the difference was on floating rock).
- Stills: viewpoints 3 and 5 and the five former floating-rock views show open water (`before-after/`: baseline left,
  now right). No console errors beyond the test server's missing favicon.
- `index.html`: 123,198 bytes (phase 1: 124,104; baseline: 120,209).

## Performance, and a lesson about the method

| Run | Build | Window | GPU avg | GPU 99th percentile |
|---|---|---|---|---|
| this morning, 2 runs | baseline | as opened by the automation | 7.90, 8.03 ms | 10.55, 10.81 ms |
| this morning, 2 runs | phase 1 | same | 8.31, 8.98 ms | 11.14, 12.26 ms |
| `bench-run-with-interference.json` | this build | same | 8.74 ms | 21.95 ms |
| `bench-run-during-window-resize.json` | this build | resized during the run | 17.25 ms | 35.78 ms |
| `bench-same-window-pair.json` | yesterday's untouched build | 1716x1024 on a 1736x1133 screen | 9.65 ms | 14.29 ms |
| `bench-same-window-pair.json` | this build | same, straight after | 9.57 ms | 13.17 ms |

- The last two rows are the only fair pair for this build: same window, back to back. They are level (9.57 against
  9.65 ms), so the denser reef without floating rocks costs about the same as the untouched scene.
- The 17 ms run is not a result: the owner resized the window to fit the screen during it. The run before it had 106
  slow frames bunched in flight seconds 15-25 while WiFi Explorer was using 79% of a processor core; also not a result.
- Identical code read 7.9-8.0 ms this morning and 9.65 ms after the resize. The reading depends on the window (how
  much of it is on screen) and on what else is running (Screen Sharing and Moonlight were open). Compare only runs
  made with the window untouched, close together in time. The phase 0 and phase 1 numbers are comparable with each
  other but not with the last two rows.
- Removing the floating rocks was not separately measured; it removes 852 always-drawn boulders, which is small.
