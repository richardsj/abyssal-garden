# Fluorescent and bioluminescent colours (2026-11-18)

Part of the denser-reef-life workstream. Owner: "make the colours in some flora/fauna fluorescent or bioluminescent".
Built on the "clear sapphire" water (commit `d2e446f`); the "before" pictures here already have that water.
Same machine and viewport as the earlier reports. Not benchmarked: no geometry was added, and the extra shading is
one sine and a few multiplications on pixels that were already being shaded.

## Two different things, both used

- Fluorescence: a pigment takes in blue and green light and gives it back in its own colour, so it keeps that colour
  at depth where ordinary reds are gone. It needs light: brightest in sun, still present in shade. The solid shader
  already had a faint version (`flu`) in the material's own colour.
- Bioluminescence: light the creature makes itself (`emi`). It does not need light, so it shows in shade and under
  overhangs and washes out in direct sun.
- The renderer's bloom is gentle (about 9% of a blurred copy of the picture) and was left alone; the sources were
  made brighter instead, because bloom also acts on the sun's glitter.

## What changed (`source/src/shaders.js`)

| Where | Kind | Change |
|---|---|---|
| Corals (solid shader, the coral branch) | fluorescent | 55% of colonies, chosen by seed, get a pigment colour of their own (`flc`): neon green 25%, cyan 15%, orange 15%, on the branch tips and in polyp speckles. Driven by the green and blue light reaching the surface, plus a faint constant afterglow. |
| Soft corals | bioluminescent | tip glow about seven times stronger, pulsing slowly, each tree in its own time; own-colour fluorescence .3 to .6 |
| Anemones (tentacle shader) | bioluminescent | tip glow .22 to .7 |
| Sea whips | bioluminescent | the row of polyp dots along the stem now glows |
| Polyp carpets | bioluminescent | arm glow about three to four times stronger, brightest at the tip |
| All tentacle life | | the pulse is deeper (plus or minus 35%, was 20%) and runs out toward the tip |
| Purple foliage, magenta ground cover, red-pink fronds, teal plants (leaf types 3, 5, 6, 7) | fluorescent | light-driven glow raised: .02 to .14, .30 to .55, .10 to .25, .04 to .2 |
| Chromis schools (fish colour 11) | bioluminescent | a row of ten round green-cyan light spots along the flank, fading out with distance before they would shimmer |

Left alone: kelp, sponges, rock, the other fish, the bloom.

## Checks

- Loads with no console errors or shader warnings.
- `before/`, `after/`, `before-after/` (before on the left): three anemones up close, viewpoints 1, 4 and 6, flight
  seconds 4, 52 and 57.5, one chromis school at two clock times. Script:
  `_scratch/chrome-capture-glow-views-as-dataurls.js`.
- Looked at: anemone 0, flight second 52, viewpoint 6, viewpoint 4 and the chromis school. The others were not
  each inspected.
- First attempt, corrected the same session: the chromis spots were small pale squares, nearly white.

## How it reads

- Best in the purple zone (viewpoint 6): in the dim violet light the green, cyan and orange colonies stand out.
- In well-lit gardens (flight second 52) the fluorescent colonies read more as mint-green and cyan coral than as glow.
- Anemone tips are only a little brighter in a still; the pulse shows in motion, which stills cannot show.
- The chromis spots show clearly in shade under an overhang.

## Knobs, if it should be stronger or weaker

- Fluorescent coral: share of colonies `fsel < .55`; strength `* 2.2 + .12` in the line that adds `flc`.
- Tentacle glow: `tc * tip * .7` (anemones), `.5 *` (whip dots), `.12 + .5 * tip` (polyps).
- Plants: the fourth number of `pr` for leaf types 3, 5, 6, 7.
- Chromis spots: `* .9` and the spot radius `.013`.

## Open

- A stronger, more obvious glow would need either a darker setting (night, or deeper shade) or more bloom.
- `index.html`: 124,225 bytes (was 123,771).
