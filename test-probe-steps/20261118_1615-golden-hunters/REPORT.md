# Golden hunters repainted (2026-11-18, about 16:10 to 16:30)

Three reviewers had singled out the golden hunters (the trevally that cut through the bait balls): the two blind
critics on the jellyfish stills and the other model's review of the montage ("yellow fish strongest mismatch",
"toy-like"). Branch `denser-reef-life`, on top of the night dive (`82b593a`).

## What was wrong (from `before/fly_05_hunter_ball0_close.jpg`)

One lemon yellow from back to belly, hard block bars, plain fins of the same yellow that glowed evenly. Nothing on the
body told the eye it was round or wet.

## What changed (fish colour 4 in `fsFish`, `source/src/shaders.js`)

- Shading painted into the skin: bronze back, gold flank with a brighter line along the middle, silver-white belly.
- A fine net of scales (95 to the body length, 16% darker at the edges), which fades out before it would shimmer.
- Bars thinner, uneven in strength, slightly wavy, fading out toward the belly.
- Fins: fine rays, dusky tips, and almost no glow of their own (it was 0.35 of the fin colour, now 0.1).
- A little of the fish's own colour, mostly its red, is added by day so that gold stays gold in blue water (the same
  device the cuttlefish uses). It is switched off at night, where it made the fish glow like lanterns (seen in round 3).

## Rounds (captured with `_scratch/chrome-capture-golden-hunters-close-views-as-dataurls.js`)

1. `after-round-1`: worse in places. Scales a coarse honeycomb, bars nearly gone, fin rays fat stripes, gold turned
   olive under the blue light.
2. `after-round-2`: scales finer and fainter, bars back, rays finer, warmer gold.
3. (stills deleted, superseded) darker back and more warmth; at night the fish glowed with a halo.
4. `after-round-4-final`: warmth off at night, bars a little stronger. Committed state.

`pair-before-left-after-right-hunters-side-view-crop.jpg` and `crop-hunters-side-view-at-night.jpg` are the two
pictures to look at.

## Claude's reading (not seen by the owner or a critic)

A moderate gain, not a transformation. The body now reads as shaded and scaled from about five metres. What still
looks toy-like is outside the paint: the fins are large flat panels (the shape of the mesh), and the eye is the same
white ring and black dot every fish has, which on a fish this size looks cartoonish. At night, lit by the lamp from
five metres, they are the brightest things in the frame.

## Checks and gaps

- No console errors on `dev.html` after the final build.
- Views of the hunters of bait ball 2 put the camera inside rock, as in earlier sessions (fish swim through rock);
  only ball 0's views are usable. Ball 1's hunter was not photographed.
- Not benchmarked: the change adds a few arithmetic steps per pixel, on the hunters only, and no texture lookups.
- Not seen in motion; no blind critic.
