# Jellyfish (2026-11-18)

Part of the denser-reef-life workstream. Second of three agreed steps: cuttlefish (done, `4594e38`), jellyfish, night
dive. They fill the open water near the surface that removing the floating rocks left empty.
Same machine and viewport as the earlier reports (M5 Max, 2560x1440, detail High).

## What was added

- Shape (`world.js`, `meshJelly`, mesh id 37): a bell of radius 1 (a flattened dome of 28 segments that curls in at a
  scalloped rim), the membrane under it, four frilled arms hanging from the middle, sixteen thin tentacles from the
  rim, every other one longer. About 1,900 triangles. One spare number on each vertex says how it moves: 0 to 1 is the
  bell from crown to rim; below 0 is a hanging part, down to -1 at its tip.
- Motion (`shaders.js`, `vsJelly`), a function of the clock alone like the fish:
  - the pulse: a quick squeeze and a slow opening, slower for a bigger bell; the rim pulls in up to 30% and the dome
    lengthens;
  - hanging parts are gathered in at the root with the rim, sway more toward the tip, and follow each pulse late;
  - each drifts round its home (1-3 m), rises and sinks 1.5 m over minutes, with a small surge after each squeeze,
    and leans a little this way and that;
  - the viewer eases it aside (up to 1.6 m, over about its own size plus 2 m), and it never sits on the lens.
- Drawing (`main.js`, `pJelly`; `fsJelly`): the first see-through geometry in the scene. Drawn after everything solid
  and after the water surface, blended over what is behind, writing no depth, both faces drawn, so the far wall of the
  bell shows through the near one. The membrane is thin seen face-on and denser toward its edges. Sixteen canals from
  crown to rim brighten with each squeeze, and a ring of lights round the rim twinkles. Light passes through: lit
  from behind almost as well as from in front. Four kinds: blue, pink, amber, violet.
- Where (`world.js`): swarms at the eleven places where the fixed clusters of floating boulders used to be, up to 15
  per swarm, each swarm mostly one kind. Bell radius 0.3-0.7 m, about one in six 0.9-1.4 m. 137 at High detail
  (blue 51, pink 56, amber 18, violet 12); Medium and Low keep every 2nd / 4th. They share the cuttlefish's seed block
  (seed 21, generator seed restored), so nothing placed later changes.
- A jellyfish more than 110 m from the camera is not drawn (the water hides it).
- `dev.jellies` exposes the instance data for the capture script.
- `README.md`: a line in the feature list.
- `index.html`: 131,142 bytes (was 127,146 with the cuttlefish).

## Cost

Three consecutive benchmark flights in one untouched window (`bench-jellyfish-same-window-runs.json`):

| Build | GPU avg | GPU 99th percentile |
|---|---|---|
| with jellyfish, all 137 drawn | 11.73 ms | 16.32 ms |
| without jellyfish | 10.38 ms | 14.88 ms |
| with jellyfish, those beyond 110 m skipped (final) | 10.41 ms | 14.48 ms |

- The final build is level with the build without jellyfish (10.41 against 10.38 ms).
- The first of the three may still have carried some of the load that spoiled the run before it (37 ms on a build that
  had not changed: the machine was busy), so "all drawn cost 1.3 ms" is an upper estimate, not a measurement.
- These numbers are not comparable with other days' or other windows' (see the benchmark note in the workstream file).

## Checks

- Loads with no console errors or shader warnings.
- `views/`: the swarm nearest the start from below against the surface; one jellyfish open and squeezed (the bell is
  visibly narrower); the largest (1.39 m); viewpoints 1, 3 and 5. Script:
  `_scratch/chrome-capture-jellyfish-views-as-dataurls.js`.
- Looked at: the swarm, the open / squeezed pair and the largest, at full size. Viewpoints 1, 3 and 5 show few or no
  jellyfish: the swarms are near the surface, away from where those views look.

## How it got here (same session)

1. First run worked: 76 jellyfish, the big ones convincing, but swarms too sparse and small to register, and the
   20-sided bell showed its facets.
2. 28 segments; up to 15 per swarm, tighter, larger bells; more of their own light. 137 jellyfish.
3. Far ones skipped, after the benchmark.

## Not checked, or not done

- Not seen in motion by Claude: the pulse, the sway and the drift aside were judged from stills.
- Low and Medium detail not loaded with jellyfish present.
- No sorting: where two jellyfish overlap on screen they blend in drawing order, not by distance. Not noticed in the
  stills.
- They can drift through kelp, and a bell near a cliff can pass into rock.
- In daylight they read as translucent coloured bells more than as glowing ones; the night dive is where the light
  they give off should count.

## Factor 1 of the "layered on" look: the light (2026-11-18, about 14:55)

The owner said the jellyfish "look a bit like sprites ... just layered on". A blind critic (`CRITIC_REPORT.md`, prompt
in `CRITIC_PROMPT.md`) ranked the light as the most important cue; a second model on the montage
(`CRITIC_REPORT_2_other-model-on-the-montage.md`) pointed the same way less directly. Rule agreed with the owner: one
factor at a time. This is the first, and nothing else about the jellyfish was touched (shape, motion, opacity, drawing
order).

What changed (`shaders.js`, `vsJelly` / `fsJelly`):
- the sun on a jellyfish is multiplied by the shadow map (taken per vertex, as for fish) and by the caustic ripple;
- the sun term uses the way the surface really faces, so the crown of the bell is brightest, with some light through
  from behind; the rim, the membrane underneath and the hanging parts are dimmer (down to 70% and 60%);
- the skylight is cut near walls and in enclosed places, with the same factor the fish use;
- their own light is multiplied by `JGLOW = .2`. At full strength it kept them equally bright everywhere. The night
  dive is meant to raise it again.

Before and after, same fifteen views (`critic-set/` against `critic-set-after-lighting/`; pairs in
`before-after-lighting/`, before on the left). Looked at three pairs:
- `fly_12` (the critic's image 8, cyan jellyfish over a shaded wall): no longer the brightest things in the frame; the
  one over the sunlit boulder is now a little brighter than the two over the shaded wall.
- `fly_06` (its image 4, the pink swarm): brightness now varies through the group, darker and more saturated in the
  kelp's shadow, paler in open light.
- `fly_09` (its image 6, the big amber bell): less convincing in one way. With its own glow cut the bright canals
  are gone and it reads as a pale tinted veil over sharp rock: the critic's second cue, the "coloured filter", is now
  more obvious.

Not done: the other twelve pairs were not inspected; not benchmarked (one shadow lookup per vertex and one caustic
lookup per pixel on the jellyfish); not re-reviewed by a critic; not seen in motion.

Still to do, each as its own step: the height movement with each thrust (owner); then, if they still look layered
on, translucency, then the structure inside the bell (the doubled outline, the flat arm panels, every rib and
tentacle equally visible), then shadows cast.

## The thrust (2026-11-18, about 15:05; its own commit)

Owner: "pleasing pulsing, but lacking a little bit of ... height movement with each thrust". The lift per pulse was a
symmetric bob of 14% of the bell radius (about 7 cm for a typical one). Now each squeeze throws the jellyfish upward by
45% of its bell radius over the first quarter of the pulse, and it settles back over the remaining three quarters
(`vsJelly`, `lift`). Net zero over a pulse, so it is still a function of the clock alone; the slow rise and sink over
minutes is unchanged.

Check: one jellyfish (bell radius 0.62 m, pulse 2.71 s) from a camera that does not move, at six evenly spaced moments
(`thrust-six-moments/strip.jpg`, script `_scratch/chrome-capture-jellyfish-one-pulse-six-moments-as-dataurls.js`).
Height of the bell above the first frame, from the formula: 0, 0.24, 0.34, 0.31, 0.25, 0.20 m (the last values include
about 0.16 m of the slow rise). In the pictures the bell is lowest in the first frame, higher and narrower in the
second, highest in the third and fourth, then wider and settling.

Not seen in motion by Claude. The capture scripts' position formulas were updated to match.
