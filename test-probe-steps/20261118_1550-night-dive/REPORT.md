# Night dive (2026-11-18, about 15:45 to 16:05)

Third of the three steps agreed with the owner after the glow work (cuttlefish, jellyfish, night dive). Branch
`denser-reef-life`, on top of `9c65598`.

## What it is

Pressing `N` (or **Night** in the menu, or opening the page with `?night=1`) fades the sun to moonlight over about six
seconds; pressing it again brings the day back. At night:

- everything that comes from the sky (sunlight, skylight, haze, the surface seen from below, the light shafts) falls to
  moonlight: 1.3% of the red, 3% of the green and 6.6% of the blue of daylight;
- the exposure rises 2.2 times, as an eye that has adapted to the dark would;
- what the scene lights itself stays, so it carries the picture: jellyfish (five times their daytime glow before
  exposure), coral and anemone tips, polyps, the kelp specks, the chromis spots, the fluorescent corals' afterglow;
- the diver's lamp, which by day only reaches the rock, now also lights plants, tentacles, fish, jellyfish and the
  drifting specks within a few metres, and sets off the fluorescent pigments of corals near it;
- the glow spreads further (more bloom, the soft halo round bright things);
- plankton sparks: the drifting specks within 12 m flash blue-green when the viewer swims faster than about 1.5 m/s,
  and keep flashing for a couple of seconds after stopping.

## How it is built

- One number, `g.mis.w` (0 day .. 1 night), plus the sky-light colour `g.lit` worked out once per frame in `main.js`.
  The four shared light functions (`sunE`, `amb`, `side`, `fogIn`) multiply by it, so no shader needed its own rules
  for darkness. The uniform block (the values every shader receives each frame) grew from 240 to 272 bytes: it also
  now carries the viewer's velocity and a "how stirred up is the water" value (`g.vel`), which the plankton uses and
  which the curious-cuttlefish idea on the backlog will need.
- The sky light fades by equal ratios, not equal amounts. The first version mixed linearly and its half-way frame
  looked the same as day (see `round-2/fly_2_pose1_dusk.jpg` against `round-3/`).
- A shared `lamp()` function in `shaders.js` for everything but the rock.
- Menu: a **Light: Day / Night** row under the detail row (for touch screens), `N` in the list of keys.
- `dev.night(level, stir)` in the dev tools sets the night level at once and can hold the "stirred" value for stills.

## Tuning rounds (stills in `round-2`, `round-3`, `round-4-final`; captured with
`_scratch/chrome-capture-night-dive-views-as-dataurls.js`)

1. First build (one screenshot, not kept): worked, but the anemone in front of viewpoint 1 was blown out to white, the
   fish schools glowed as flat cut-outs, and the open water was too bright for the glow to stand out.
2. Darker moonlight, tentacle and fish glow turned down, coral afterglow and lamp fluorescence gentler. Dusk frame
   looked like day; plankton sparks too few to see.
3. Even-looking fade; every speck can spark. Sparks then showed as a dozen fat round orbs.
4. Sparks made pinpricks of a fixed apparent size with a tight core. This is the committed state.

## What the stills show (Claude's reading; not seen by the owner or a critic yet)

- All six viewpoints read as a moonlit reef with the reef life lit from within; the shipwreck is a silhouette against
  moonlit water; looking up (viewpoint 3) shows a broken patch of moon glitter and faint shafts.
- Jellyfish are the strongest element at night (`fly_4`, `fly_5`), though the bell reads flatter than by day: the glow
  fills it evenly and the ribs show less.
- The plankton sparks are subtle in a still and look much like the kelp specks. Whether they read as a wake needs
  motion, which the stills cannot show.
- The anemone in front of viewpoint 1 is still the brightest thing in that view, close to white at its tips.
- The golden hunters and other fish with a strong glow of their own still read flat (the critics' older remark).

## Cost (four benchmark flights back to back, same untouched test window, 2560x1440, High detail, 15:51 to 15:55)

GPU = graphics processor time per frame, in milliseconds.

| Run | Build | GPU average | GPU 99th percentile | File |
|---|---|---|---|---|
| 1 | before (`9c65598`) | 9.97 | 14.35 | `bench-1-before-night-dive.json` |
| 2 | night dive, by day | 9.45 | 12.39 | `bench-2-night-dive-build-by-day.json` |
| 3 | night dive, by night | 9.92 | 13.04 | `bench-3-night-dive-build-by-night.json` |
| 4 | before, again | 9.97 | 13.70 | `bench-4-before-night-dive-again.json` |

No measurable cost: the new build is within the run-to-run spread of the old one (and happened to read lower by day).
This is also the first benchmark of the build with the cuttlefish and the final jellyfish batch: 9.97 ms, under the
11 ms aspiration and the 16.7 ms budget. Conditions: load average about 3; the flight does not swim, so the plankton
sparks were not active in run 3. The "before" page was `git show 9c65598:bench.html` served from a temporary folder
(deleted afterwards). Runs 2 and 3 were on the build before the last change, which only restyled the menu label.

Frame times (not GPU times) show 740 to 960 of about 5,500 frames over 16.7 ms in every run, old build and new alike.
That is how this test window paces frames, not something this change did; it was not looked into here.

## Other checks

- No shader or script errors in the console on `dev.html`, `bench.html` or `index.html` (one 404 for the favicon).
- `index.html` at Low detail loads, and the **Night** button, the `N` key and `?night=1` each switch the lit button.
- `index.html` is 133,788 bytes (it was 132,099).

## Not checked

- In motion: the six-second fade, the plankton sparks while swimming, the lamp while approaching things.
- Medium detail; touch devices; the benchmark at night while swimming.
- No blind critic on this build.
