# Cuttlefish (2026-11-18)

Part of the denser-reef-life workstream. Owner: "let's do cuttlefish as well (not octopus) but the shimmering and
hovering". First of three steps agreed in this order: cuttlefish, jellyfish, night dive.
Same machine and viewport as the earlier reports. Not benchmarked: 17 creatures of about 600 triangles each on the
existing fish pipeline.

## What was added

- Shape (`world.js`, `meshCuttle`): a plump oval mantle of 11 elliptical rings, a little flatter underneath; a skirt
  fin down both sides (three rows to each body ring, so the wave along it is smooth); a head with two eye bulges;
  eight thick arms held together, closing to a point and drooping a little. It is the ninth fish shape and sits at
  mesh id 36, after the anemone column, because the ids up to 35 are used by number elsewhere.
- Where it is (`shaders.js`, `fpos`, behaviour 5): it hovers over its spot, drifting up to its radius (0.5-1.3 m) on
  slow sines, and eases back from the viewer, mostly sideways (up to 1.3 m, fading over about 3 m). It may come within
  1.6 m of the camera.
- Which way it faces (`vsFish`): a hoverer's direction of travel is meaningless, so the heading is explicit. It turns
  slowly on the spot; within 7 m it starts to swing toward the viewer and by 3 m it holds about 50 degrees off, to one
  side or the other by its seed, so the flank stays in view.
- How it moves: the mantle is rigid (no tail beat); a wave runs back along the skirt fin and the arms stir.
- Skin (`fsFish`, colour 14), computed per pixel from the clock:
  - left alone: blotches of ochre and dark brown with small pale spots, and clouds of dark passing down the mantle;
  - as the viewer comes within 6.5 m, more and more of a display: wavy pale lines across a dark maroon mantle,
    pulsing, with a faint light travelling with the bands;
  - the fin and the arm tips run to an electric blue-green edge; darker on top, pale underneath; a painted eye on each
    eye bulge.
- Where they are (`world.js`): 17 at High detail (three near where viewpoints 1 and 4 look, the rest by gardens
  chosen at random), 0.55-0.9 m long, 0.9-2.2 m above the seabed. Medium and Low keep every 2nd / 4th of the garden
  ones. They use random seed 20 and put the generator's seed back afterwards, so nothing placed later changes.
- `README.md`: a line in the feature list.
- `index.html`: 127,146 bytes (was 124,225).

## Checks

- Loads with no console errors or shader warnings; fish per shape `[7200, 6110, 16, 18, 242, 178, 20, 15, 17]`.
- Anemone 0 and viewpoint 4 look as before, so adding a shape did not shift the soft coral and anemone meshes
  (`portraits/fly_12`, `fly_13`).
- `inspect-3/`: two cuttlefish from the side at 7.5 m, from above, and close up at two moments 0.7 s apart (the bands
  have moved). `portraits/`: three cuttlefish at 6 m, 4 m and 2.6 m.
- Scripts: `_scratch/chrome-inspect-cuttlefish-three-views-as-dataurls.js`,
  `_scratch/chrome-capture-cuttlefish-portraits-as-dataurls.js`.

## How it got here (same session)

1. First version: a thin flat torpedo, pale, with a rainbow sheen that hid the pattern; from the front the ring of thin
   arms read as a scallop shell; and within 3 m it turned to face the viewer squarely, hiding the flank.
2. Plumper mantle, eye bulges, thicker arms; darker, richer skin with the sheen cut from .6 to .3; a three-quarter
   turn. It then read as a cuttlefish, but the fin's wave was a coarse zigzag and the stripes washed to lavender.
3. Three fin rows per body ring; the ripple reduced; a little self-colour so the skin keeps its warmth in blue water.

## Not checked, or not done

- Not seen in motion by Claude: the hover, the turn toward the viewer and the retreat were judged from stills only.
- Low and Medium detail not loaded with cuttlefish present.
- No W-shaped pupil; the two long feeding tentacles are not modelled; no ink.
- They can drift through kelp or a sponge near their spot, as fish do.
