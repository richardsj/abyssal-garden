# Denser reef life, phase 0: baseline (2026-11-18)

No visual change. This is the "before" that every later phase of `WORKSTREAM-denser-reef-life.md` is compared with.
The scene is `main` at `c0bdd17` (the dev-tool additions below do not change `index.html`: it rebuilt byte-identical).

Machine: Apple M5 Max, macOS 27.2.1, Chrome 157, mains power. Viewport 2560x1440 at device pixel ratio 1, detail High.

## What was added (dev build only)

- `dev.census()` in `source/src/dev.js`: counts of every kind of life, and how much rock has nothing growing near it.
  It needs the page opened as `dev.html?census=1`, because `main.js` frees the generator's data once it is on the
  graphics card; `build.mjs` wraps the two lines marked `@census-keeps` so the dev build keeps the data in that case.
- `_scratch/chrome-run-reef-census-return-json.js`, `_scratch/summarise-reef-census-json.mjs` (takes a second file to
  print "now (was before)"), `_scratch/chrome-capture-poses-and-bare-rock-flight-moments-as-dataurls.js`,
  `_scratch/chrome-capture-floating-rock-views-as-dataurls.js`.

## How bare the rock is

"Rock" is the main terrain below 8 m depth within 170 m of the centre (120,381 samples). "Bare" means nothing rooted
within 2 m. Reef life = sponges, corals, soft corals, anemones, sea whips, polyps. Plants = kelp, foliage, ground cover.

| Rock | No reef life within 2 m | Nothing at all within 2 m |
|---|---|---|
| all | 63.8% | 31.8% |
| up-facing (floors, ledges) | 61.7% | 13.3% |
| walls | 63.5% | 46.8% |
| overhangs | 76.2% | 50.7% |
| within 10 m of the flight path | 59.0% | 16.8% |

- Nearly two thirds of the rock has no reef life near it, and that hardly depends on which way the rock faces.
- Plants hide most of the bare floors, so the rock with nothing at all is the walls and overhangs: about half of each.
- Along the flight (rock within 10 m of the camera, per second; full table in `census-baseline-summary.md`):
  - nothing at all: second 9 (56%), 21-22 (65%), 13-17 (23-36%), 49-51 (18-23%), 55-56 (29-30%).
  - no reef life: 26-32, the kelp-only stretch (73-99%, although plants cover everything), 9-12 (74-90%), 57 (92%).
  - These match the round-6 blind critic, who was not shown any numbers: bare rock at 17, 23, 52, 57-58, milder at
    4 and 8, and "twelve consecutive seconds of kelp only" (25-36). Seconds 18-20 and 23-25 have too few samples
    within 10 m to quote.

### Loose rock: not measured above, and entirely bare

Raised by the owner on 2026-11-18 (the six viewpoints catch floating rocks only at frame edges). Boulders are separate
objects; all growth is placed on terrain vertices, so nothing grows on any of them.

| Boulders | All | Large (scale over 1.1) |
|---|---|---|
| floating | 852 | 87 |
| resting on the seabed | 582 | 138 |

Plus 66,608 rock chunks and pebbles set into the terrain, also with nothing placed on them (growth on the terrain
beside a chunk can show next to it).

## What exists

| Kind | Count |
|---|---|
| sponges | 9,689 |
| corals | 8,016 |
| soft coral trees | 256 |
| anemones | 69 |
| sea whips | 481 |
| polyps | 1,714 |
| fish, all | 13,799 |
| of which bait fish | 8,100 |
| slim schooling fish and anthias | 5,210 |
| clownfish | 242 |
| tang and butterflyfish | 178 |
| idols 20, hunters 18, triggerfish 16, parrotfish 15 | 69 |
| kelp and foliage blades | 1,340,131 |
| ground cover blades | 827,034 |

## What more of it would cost

- Corals are the expensive shape: 1,275-2,568 triangles each against 252-324 for a sponge. The 8,016 corals are 16.7
  of the 20.0 million triangles in sponges and corals. Covering rock with sponges, polyps and whips is roughly ten
  times cheaper per piece than covering it with corals.
- The shadow map is baked once at load (`main.js`, "one-time bakes"), so more sponges and corals cost nothing in
  shadows per frame. They cost only when drawn: whole 24 m cells out of view are skipped, nothing is drawn beyond
  110 m, and two of the coral shapes switch to a simpler one beyond 22 m. Sponges have no simpler far shape.
- No fixed-size buffers: every instance buffer is sized to its data at load, so more life cannot overflow anything.
- World build: ready within about 3.1-5.5 s of opening the page (four loads). Page memory after the build is not
  comparable here (the census page keeps about 300 MB that the normal page frees).
- Fish and tentacle life were already measured as free (2026-11-16 performance report).

## Performance baseline

`dev.html`, scripted 60 s flight, resolution pinned to 2560x1440, draw distance full. GPU = graphics processor time
from WebGPU timestamp queries. A cool-down of about three minutes on a blank tab came before each run.

| Run | GPU avg | GPU 99th percentile | GPU max | GPU frames over 16.7 ms | Frame avg | Frames |
|---|---|---|---|---|---|---|
| 1 | 8.03 ms | 10.81 ms | 32.11 ms | 2 | 9.07 ms | 6,614 |
| 2 | 7.90 ms | 10.55 ms | 43.78 ms | 8 | 9.03 ms | 6,642 |

Not a quiet machine: before run 1 Messages was using about 40% of a processor core and the window system about 54%;
before run 2 `searchpartyd` (Find My) was using a full core. The two runs still agree to 0.13 ms on the average, and
with the 8.5-8.9 ms measured on 2026-11-16. Room under the workstream's ceiling (16.7 ms average): about 8.7 ms;
under the 11 ms aspiration: about 3 ms.

## Stills (2560x1440, not committed: images are gitignored)

- `stills/`: the six viewpoints (clock held at 20 s) and flight seconds 4, 8, 17, 23, 30, 52, 57.5.
- `stills-floating-rocks/`: five views looking up at the largest floating boulder clusters (near the start, north,
  west, east, south). Camera positions are in `_scratch/chrome-capture-floating-rock-views-as-dataurls.js`.

## One thing to know when testing

The page lowers its own detail level when a load is interrupted (a crash guard for phones, `quality.js`). Closing a
hung tab during this work did that for the test address, and the first census ran at Medium without saying so loudly.
The census output carries `detail`; check it reads 0 before trusting a run, and clear `localStorage.abyssal` if not.

## What this means for phase 1

- The cheap, large win is sponges, polyp carpets and sea whips on the walls and overhangs, where half the rock has
  nothing at all. Corals should be spent where the camera comes close.
- Loose rock needs its own placement: sponges and corals on boulders can ride the bob with no shader change (same seed
  and amplitude as the boulder); tentacle life on floating rock needs a bob added to the tentacle shader.
- Targets to beat: 63.8% of rock without reef life, 31.8% with nothing; 0 of 225 large boulders with anything on them.
