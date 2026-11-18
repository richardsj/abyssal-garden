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
| Floating rocks | Removed (owner, 2026-11-18): "a strange aberration ... a little immersion breaking". This overrides the original brief (`prompt.txt` lists floating boulders). Boulders resting on the seabed stay. |
| Waves | The owner wants the surface waves to look more "cool"/realistic. Not yet scoped. |

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
  - Loose rock is bare by construction (owner's observation, 2026-11-18, confirmed in the code): the floating
    boulders (20 clusters, `BOULD`) and the boulders resting on the seabed are separate objects, and all growth is
    placed on vertices of the main terrain only. The six fixed viewpoints catch floating rocks only at the frame
    edges (viewpoint 3 left, viewpoint 5 top), so the standard stills under-report this.
  - A floating rock bobs by `sin(time * .3 + seed * 40) * amplitude` in the solid shader. Sponges and corals use the
    same shader and fields, so one given its boulder's seed and amplitude rides it exactly (the satellite rocks
    already do). Sea whips, polyps and anemones use the tentacle shader, which has no bob.
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
- Stills at the six viewpoints and at flight seconds 4, 8, 17, 23, 30, 52, 57.5, plus views aimed at floating
  rocks, which the fixed viewpoints miss.
- Count the floating and resting boulders (the bare-rock number samples terrain only and does not see them).
- Benchmark on a cool, quiet machine (twice, a couple of minutes apart).
- Check the limits: instance buffer sizes, world-generation time and memory, what Low and Medium detail scale down.

### Phase 1: cover the bare rock (existing kinds)

- Raise the keep-rate outside the hot zones and the number of candidate spots for corals, sponges, whips and polyps.
- Let low-profile growth (polyp carpets, small corals and sponges) come closer to the camera path than the tall
  pieces do, so the nearest rock is no longer the emptiest. Tall pieces keep their clearance.
- Aim it at the flagged flight moments first, then everywhere.
- Growth on loose rock: sponges and corals on the floating boulders (riding the bob) and on the resting boulders.
  Tentacle life on floating rocks needs a bob added to the tentacle shader; decide after seeing sponges and corals.

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

- 2026-11-18: workstream created, decisions recorded.
- 2026-11-18: phase 0 done, no visual change. Report: `test-probe-steps/20261118_1050-denser-reef-phase-0-baseline/REPORT.md`.
  Baseline: 63.8% of rock has no reef life within 2 m, 31.8% has nothing at all (walls 46.8%, overhangs 50.7%);
  0 of 225 large boulders (87 floating, 138 resting) have anything on them; GPU 7.9-8.0 ms average, 10.6-10.8 ms
  99th percentile. Corals cost about ten times a sponge in triangles; shadows are baked once, so more props cost
  only when on screen. Tooling: `dev.html?census=1` + `dev.census()`, scripts in `_scratch/`. Next: phase 1.
- 2026-11-18: phase 1 built and measured, NOT yet approved or committed. Report:
  `test-probe-steps/20261118_1120-denser-reef-phase-1-rock-cover/REPORT.md`. Rock with no reef life within 2 m
  63.8% -> 29.3%, with nothing at all 31.8% -> 12.2% (walls 46.8% -> 16.2%); all 225 large boulders planted, growth
  rides the bob; GPU 8.3-9.0 ms average (baseline 7.9-8.0); `index.html` +3,895 bytes. Existing layout unmoved.
  Open points: sponges are 3.6 times as many and blocky up close; no tentacle life on floating rock; rock chunks
  not planted; rock closest to the flight still bare at seconds 9 and 55-56.
- 2026-11-18: correction. The owner's remark about floating rocks in viewpoints 3 and 5 meant "these should not be
  there", not "these are bare"; decorating them was a misreading. Floating boulder clusters removed from
  `world.js` (random seed 8 unused), the bob line removed from the solid shader, the growth-on-boulders code cut
  down to resting boulders. Folder: `test-probe-steps/20261118_1150-denser-reef-floating-rocks-removed/`.
  The phase 0 and phase 1 notes above about floating rock and bob are history, not current.
- 2026-11-18: phase 1 with the floating rocks removed approved by the owner ("Improved, nice") and committed
  locally (`27defa7`).
- 2026-11-18: more colourful fish, built, NOT yet approved or committed. Two silver schools became bluestripe
  snappers and fairy basslets; hunters became golden trevally. Bait balls stay silver. Report:
  `test-probe-steps/20261118_1215-more-colourful-fish/REPORT.md`.
- 2026-11-18: fish colours approved and committed (`a34d7db`).
- 2026-11-18: water. Five palettes compared (`test-probe-steps/20261118_1235-water-colour-palette/`); the owner
  chose 5, "clear sapphire" (Claude ranked it second, after "same blue, clearer"). Committed (`d2e446f`). The owner
  may suggest values of their own for SIG, KD and WCOL.
- 2026-11-18: fluorescent and bioluminescent colours, built, NOT yet approved or committed: fluorescent coral
  colonies, glowing tentacle tips and polyp dots, brighter fluorescent plants, light spots on the chromis. Report:
  `test-probe-steps/20261118_1300-fluorescent-and-bioluminescent/REPORT.md`.
- 2026-11-18: glow approved by the owner ("I like it. It could be even more bright") and committed. At the owner's
  request the whole branch was fast-forwarded onto `main` and pushed, so the live site now has the denser reef, no
  floating rocks, the colourful fish, the clear sapphire water and the glow.
- 2026-11-18: next three steps agreed, in this order: cuttlefish (shimmering, hovering; not octopus), jellyfish in
  the open water the floating rocks left empty, then a night dive (a key that fades the sun to moonlight so the glow
  carries the scene; fold in the brighter glow and a plankton wake from the drifting particles).
- 2026-11-18: cuttlefish built, NOT yet approved or committed. 17 of them on the fish system: a ninth shape (mesh
  id 36), behaviour 5 (hover, turn three-quarters toward the viewer, ease back), colour 14 (bands that travel; a zebra
  display up close). Report: `test-probe-steps/20261118_1340-cuttlefish/REPORT.md`.
- 2026-11-18: cuttlefish approved ("Cuttlefish great!") and committed locally; not pushed. The owner noticed one by
  the opening scene "didn't move away" and said curious-but-cautious behaviour can be defined "whenever it suits".
  Cause: the retreat is deliberately small (about 0.5 m at 3 m). Doing it properly (drift toward a still diver, back
  off from a fast one) needs the camera's speed passed to the fish shader, which has only its position today.
- 2026-11-18: jellyfish built, NOT yet approved or committed. 137 in eleven swarms where the fixed floating-rock
  clusters were; the first see-through geometry in the scene (drawn after everything solid, no depth written); mesh
  id 37. Level with the build without them once those beyond 110 m are skipped (10.41 against 10.38 ms, same window).
  Report: `test-probe-steps/20261118_1400-jellyfish/REPORT.md`. Next: the night dive.
- 2026-11-18: owner's feedback on the jellyfish. Movement: "pleasing pulsing, but lacking a little bit of ...
  height movement with each thrust" (the lift per pulse is 14% of the bell radius and symmetric; make it a real
  thrust, as its own step). Rendering: "they do look a bit like sprites ... I'm not really in this scene, I'm just
  layered on"; the owner suspects drawing order or how see-through they are. Claude's main proposal: they do not
  take part in the scene's light (no shadow, no caustics, a constant glow of their own); then the order inside each
  jellyfish; then translucency. Rule for now: change one factor at a time. A blind critic was asked first.
- 2026-11-18: blind critic on the jellyfish. It agrees they look layered on; its most important cue is the light
  (medium confidence: it could not separate that from the "coloured filter" translucency in stills). New from the
  critic: they cast no shadow, all hang level with parallel tentacles, and tentacles of out-of-frame jellyfish cross
  the picture as pale lines. `test-probe-steps/20261118_1400-jellyfish/CRITIC_REPORT.md`.
- Rule from now on (owner asked on 2026-11-18 whether critic prompts were being saved; they were not): every critic
  run saves `CRITIC_PROMPT.md` (the prompt word for word, what the critic was and was not told, which pictures)
  next to `CRITIC_REPORT.md`. The six prompts of 2026-11-16 were recovered from that session's transcript with
  `_scratch/extract-critic-prompts-from-session-transcript.mjs` and filed in their round folders.
- 2026-11-18: a second opinion from another model, on the montage of the critic set, supplied by the owner
  (`test-probe-steps/20261118_1400-jellyfish/CRITIC_REPORT_2_other-model-on-the-montage.md`; its prompt is not
  known). Jellyfish: "not simply pasted on" but "diagrammatic", with similar brightness across a group; "more glow
  would amplify their current weakness". Its strongest mismatch is the golden hunters (flat, toy-like: the first
  critic flagged them too), then angular close-up kelp leaves. It also finds the views too busy, with sparkle spread
  too evenly, which runs against this workstream's direction: the owner's call.
- 2026-11-18: jellyfish lighting changed, as the first single factor (owner: "I also weigh the second review less,
  let's make the jellyfish lighting"). Shadow and caustic ripple on them, a lit crown and dimmer underside, own glow
  to a fifth (`JGLOW`). Built, NOT approved or committed. In stills they now respond to shade, but the big close
  bells show the "coloured filter" look more plainly. See the end of the jellyfish REPORT.
- Backlog from the two critics (not decided): shading of the golden hunters; angular close-up kelp leaves; quieter
  areas and more selective light; jellyfish that cast shadows, tilt, and vary in how much structure shows.
- Backlog (owner, 2026-11-18, "not yet, later"): the caustic pattern "looks a little too much like a small
  chessboard and not enough like the strange swirls and spikes of light that come from waves in multiple angles on
  the surface".
- Queue after those: curious-but-cautious cuttlefish; the caustic pattern; the waves (real swell and a wind-driven pattern first, then light tied to the waves); the
  owner may suggest water values of their own.
- 2026-11-18: benchmark method. The reading depends on how much of the browser window is on screen (a run during
  which the owner resized the window to fit the screen read 17 ms against 8-9 ms). Keep the window as it is for
  every run of a comparison and record it; do not compare runs across a resize.
- 2026-11-18, after the owner left the order of steps to Claude ("I prefer this look ... not bad, not as impressive
  as the cuttlefish"): three separate local commits. `71519b5` jellyfish with the lighting; `72adc7c` the thrust (45%
  of the bell radius per pulse, quick up, slow settle; checked with six frames from a fixed camera); `1180363` a
  denser bell, clearest through the middle. Then a second blind critic, same prompt and views as the first
  (`CRITIC_REPORT_2b_after-lighting-thrust-and-translucency.md`; about 103,500 tokens, 2 min 42 s).
- Result of that critic, plainly: neither the lighting nor the opacity change registered. Its top cue is still "they
  do not take part in the scene's sun and shadow" at medium confidence, and it still calls the bell "a film of
  constant density". Verdict softened only from "agree" to "partly agree, leaning towards agree". Claude's reading of
  why (from the code, not tested): the jellyfish hang in sunlit open water in front of shaded walls, so the shadow
  term rarely applies where they are; the ripple used on them is wider than a bell; and three blended layers (both
  walls of the bell plus the membrane) flatten both the opacity profile and any lit side. Next single factor proposed:
  draw only the near wall of the bell and make the membrane faint. Waiting for the owner's own look at the thrust and
  the denser bell first.
- 2026-11-18: the owner looked at the thrust ("about right, maybe even very slightly not enough"), the denser bell
  ("better, could be slightly more solid still") and a big bell ("arms look quite well, the dome is made of vertices")
  and said: "commit and blaze on with multiple improvements as you wish". The one-factor rule is lifted. A batch on
  the jellyfish followed and was committed locally: stronger thrust, denser bell, a 48-segment dome, the near wall of
  the bell in full with the far wall and membrane faint, fine dapples, a wet highlight, a glowing rim, tentacles that
  fade and curve, more lean. Details at the end of the jellyfish REPORT. Not yet seen by the owner or a critic.
- Next, in order: the night dive (agreed third step); then from the critics, the golden hunters' flat shading (three
  reviewers); jellyfish that cast shadows; then the owner's backlog (caustic pattern, curious cuttlefish, waves).
- 2026-11-18, about 16:05: the night dive (third agreed step). `N`, a Day / Night row in the menu, or `?night=1`: the
  sun fades to moonlight over about six seconds, the exposure rises, and the scene's own glow, a wider diver's lamp
  and blue-green plankton sparks (when swimming fast) carry the picture. One night number and one sky-light colour
  feed the four shared light functions. Four back-to-back benchmark flights: 9.97 ms before, 9.45 by day, 9.92 by
  night, 9.97 before again (GPU average), so no measurable cost; this is also the first benchmark of the cuttlefish
  and the final jellyfish batch. Report and stills: `test-probe-steps/20261118_1550-night-dive/`. Not yet seen in
  motion, by the owner or by a critic.
- The uniform block now carries the viewer's velocity and a "water stirred up" value (`g.vel`), which the
  curious-but-cautious cuttlefish needs.
- Seen while tuning, not acted on: the anemone in front of viewpoint 1 is close to white at its tips by day and by
  night; the README still says "one 117 KB HTML file" (it is 133,788 bytes).
- Next, in order: the golden hunters' flat shading (three reviewers); jellyfish that cast shadows; then the owner's
  backlog (caustic pattern, curious cuttlefish, waves).
