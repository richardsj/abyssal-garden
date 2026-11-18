# Water colour palette (2026-11-18)

Part of the denser-reef-life workstream. Owner: the water "feels a little too thick in its blueness right now,
although obviously it can't be crystal-clear"; try a palette of options and compare the owner's pick with Claude's.
Nothing in `source/` or `index.html` has changed: the options are separate generated pages.

## How the water is set (`source/src/shaders.js`, `S_G`)

| Name | What it does | Now |
|---|---|---|
| `SIG` | how fast red, green, blue fade per metre of water you look through | .058, .0296, .0186 |
| `KD` | how fast red, green, blue sunlight dims per metre of depth | .056, .0288, .0164 |
| `WCOL` | the colour the water scatters: what distant things fade into | .085, .43, .96 |
| skylight in `amb()` | the colour filling the shadows | .18, .54, .86 |
| sky in `W_SURF` | the sky seen up through the surface | .27, .71, 1. |

At 30 m, the present water lets through 18% of an object's red, 41% of its green and 57% of its blue.
`SIG` and `KD` are scaled together in every option: the haze formula uses `SIG - KD * (how steeply you look up)`, which
must stay positive, and physically clearer water also lets light reach deeper. The purple zone's own constants are
untouched.

## The options

| Page | Idea | SIG | KD | WCOL |
|---|---|---|---|---|
| `water-1-current.html` | as it is now | .058, .0296, .0186 | .056, .0288, .0164 | .085, .43, .96 |
| `water-2-same-blue-clearer.html` | the same blue, about a third further to see | .039, .0200, .0126 | .038, .0195, .0111 | .085, .43, .96 |
| `water-3-turquoise.html` | clearer, shifted toward cyan-green | .045, .0165, .0150 | .043, .0160, .0135 | .10, .62, .88 |
| `water-4-pale-aquamarine.html` | the clearest and lightest | .032, .0135, .0115 | .030, .0130, .0105 | .22, .70, .86 |
| `water-5-clear-sapphire.html` | deep blue, much less murky | .036, .0185, .0105 | .034, .0178, .0095 | .06, .36, .98 |

## How to look

- Side by side: `compare/view1_viewpoint1.jpg` to `compare/view9_flight52s.jpg`. Each is one view in all five
  palettes (three across, two rows), every tile stamped with its palette name. Views: the six viewpoints, and flight
  seconds 8 (a long view down a canyon), 30 (inside the kelp) and 52 (a garden under a cliff).
- Swimming: open any page in `pages/` (they are copies of the dev build; the palette's name is in the bottom-left
  corner). They are not committed; rebuild them with
  `npm run build:dev` (in `source/`) then `node _scratch/build-water-palette-variant-pages.mjs <folder>/pages`.
- Claude's ranking is in `CLAUDE-RANKING-open-after-forming-your-own.md`, kept out of this file so the owner can
  choose first.

## Scripts

- `_scratch/build-water-palette-variant-pages.mjs`: writes the pages; the palette table is at its top.
- `_scratch/chrome-capture-water-palette-views-as-dataurls.js`: the nine labelled views from one page.
- `_scratch/make-water-palette-comparison-grids.sh`: decodes the captures and builds `compare/`.

## Limits

- Stills are 1600x900 (the scene renders at 2560x1440 and is scaled down for the grids).
- The palettes change colour and clarity only. Brightness rises with clarity as a side effect; exposure and contrast
  were not adjusted to compensate.
- Fish and coral colours were tuned under the present water and will read differently under another.
- Not benchmarked: only constants differ, so the cost is the same.
