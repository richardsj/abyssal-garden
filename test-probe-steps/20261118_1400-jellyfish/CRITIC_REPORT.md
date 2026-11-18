# Blind visual critic on the jellyfish (2026-11-18)

A fresh agent that saw only ten stills (2560x1440), copied under neutral names to a folder away from the code. It was
told nothing about the implementation and nothing of Claude's hypothesis (that the jellyfish do not take part in the
scene's light). Part A was an open review; only Part B quoted the owner's remark that they look "layered on".
Which picture is which: `critic-set/critic-image-key.txt`; the pictures are `critic-set/fly_*.jpg` (gitignored).
Positions are approximate (x, y) pixels, origin top-left. The report is reproduced as returned.

---

## PART A: open review

### What looks physically part of the scene

- **Rock and seabed.** The most convincing things in the set. Every surface carries the same dappled sunlight (bright
  ripple patches with dark gaps between), has a lit side and a shaded side, and falls into blue haze with distance.
  Image 1 left half, image 8 whole frame, image 2 bottom-right boulder at (1700, 1200).
- **Kelp.** Leaves have light and dark faces, darker stalks, and throw long shadows across the seabed (image 2, dark
  band at (1000, 1050); image 10, shadows at (1900, 800); image 7, shadow at (1700, 700)). Distant kelp fades into the
  water colour (image 9, left third). Foreground kelp is noticeably angular (image 5, right third) but still reads as
  lit by the scene.
- **Sponges and corals.** Dark hollow interiors, shaded sides, and they sit in the local light: in shadow they go dull
  and blue (image 9, right half), in sun they are warm (image 5, top-left at (680, 440)).
- **Wreck** (image 5, right at (1800, 950)): hazed, desaturated, clearly at distance. Well integrated.
- **Small schooling fish** (image 9 at (1100, 850); image 10 around the jellyfish): small, dim, hazed. They fit.

### What looks less than fully part of it

1. **Jellyfish: the clearest case.** They read as tinted transparent shapes placed over the picture, not as bodies
   sitting in the light. Cues:
   - Inside a jellyfish outline, all the light-and-shade you see belongs to what is behind it. The bell adds a flat
     colour wash and little else. Image 6, large yellow jellyfish on the right (1500 to 2560, 100 to 700): the rock's
     ripple pattern and a sponge show through at full sharpness and contrast, only tinted beige. Image 1, centre
     jellyfish (1280, 580): the boulder's shading runs straight through the bell.
   - They look the same in sun and in shade. Image 8: the three cyan jellyfish at (760, 200), (1300, 380) and
     (1280, 600) are equally bright, though the first is over a sunlit boulder and the other two are over a shaded
     wall. They are the brightest things in the frame. Image 5: the lavender jellyfish at (715, 600) sits in front of
     a dark shaded rock face and is brighter than the sunlit rock nearby.
   - No shadows from them. Image 2 looks straight down at six jellyfish over a seabed that carries crisp kelp shadows,
     yet I can find no shadow, not even a faint tinted one, under any jellyfish. (There is purple colouring on the
     seabed under the centre group, but the same purple appears in images 7 and 10 with no jellyfish above, so I read
     it as seabed growth, not shadow.)
   - Hard-edged flat panels inside the bells. Image 7, big yellow jellyfish at (650, 580): overlapping translucent
     rectangles with straight edges. Image 2, centre jellyfish at (1280, 650): a rectangular pink block. Image 3,
     large blue jellyfish: a pale slab hanging at (700, 650) and a dark rectangular patch at (560, 330).
   - Tentacles as flat constant-width ribbons and hairlines. Image 6 (1550 to 2300, 700 to 1440): beige strips of
     uniform colour, brighter where they cross.

2. **Stray tentacle lines from jellyfish that are out of frame.** Image 8, right edge (2450 to 2540, 600 to 1300);
   image 10, bottom-left (0 to 560, 1080 to 1400); image 6, left edge (40, 0 to 600); image 9, top-right (2300 to
   2400, 0 to 200). With no body visible they read as pale scratches drawn across the picture.

3. **Larger yellow fish: mildly.** Image 10, striped fish at left (0 to 580, 700 to 950), and image 9, three yellow
   fish at (1250 to 1450, 680 to 960). They are saturated, crisp and angular against dim blue surroundings, so they
   pop forward. They do show a light-to-dark gradient across the body, so they read as lit; the impression is
   "toy-like", not "layered on". Much weaker than the jellyfish.

4. **Minor, unsure.** The glowing green-yellow dots in the kelp (images 1, 3, 6, 7) are uniform and unhazed, but they
   read acceptably as drifting glowing specks. The flat white blobs on the water surface (image 5 at (800, 120);
   image 9 at (700, 50)) are slightly graphic.

---

## PART B: the jellyfish question

### 1. Agree, partly agree, or disagree?

**Agree**, with one qualification: the fault is not that they look flat. From above (images 2, 7, 10) they are clearly
domed, three-dimensional bells, and opaque things in front cover them correctly. They read as layered on because of
how they take light and how they show what is behind them.

### 2 and 3. Cues, most important first

**Cue 1. No lighting of their own: flat, even self-colour that ignores the scene's sun and shade.**
- Where: image 8, all three cyan jellyfish (equal brightness over sunlit and shaded rock). Image 5 at (715, 600),
  lavender against a dark shaded face. Image 10, centre (1290, 650), the brightest object in a deeply shaded area.
  Image 9, cream jellyfish at right (2270, 300), warm and bright in front of a cold shaded cliff.
- Difference from neighbours: rock, sponges and kelp all have a lit side and a shaded side, carry ripple dapples, and
  go dull and blue in shade. The jellyfish have no top-versus-underside difference, no dapples on the dome, and no
  dimming in shade.
- Expected instead: the top of the dome catching the sunlight and its ripple pattern; a dimmer underside; the whole
  animal dimmer and bluer when it drifts into shade; a brighter glow when it sits in a light shaft. If they are meant
  to glow by themselves, I would expect a little of that colour to spill onto rock within a bell-width. Nothing nearby
  picks up any tint (image 8, the wall right behind (1280, 600) is unchanged).

**Cue 2. The see-through behaves like a coloured filter laid over the image.**
- Where: image 6, big yellow bell (1500 to 2560, 100 to 700); image 7, big yellow bell (400 to 1000, 380 to 860),
  where sunlit rock shows through pin-sharp; image 1, centre bell (1280, 580).
- Difference from neighbours: nothing else in the scene is transparent, so there is no other reference; but the
  background keeps its full sharpness, contrast and position through the bell. Opacity is nearly constant from centre
  to edge on the large bells, and the outline is a hard, clean cut.
- Expected instead: a thick jelly dome should be clearest where you look straight through the middle and milkier
  towards the rim. The background seen through it should be softened and slightly displaced or bent near the edges,
  and lower in contrast. The outline should be softer in places. Images 4 and 9 already show a brighter lower rim,
  which helps; the large close ones in 6 and 7 show almost none.

**Cue 3. No shadow or light exchange with the surroundings.**
- Where: image 2, seabed below the jellyfish at (1280, 650), (1790, 440) and (1050, 580): crisp kelp shadows nearby,
  nothing from the jellyfish. Image 8: jellyfish hang close to a wall on which sponges have dark contact shading, but
  the jellyfish leave no mark.
- Difference from neighbours: kelp throws long dark shadows; rocks and sponges darken the surface around them.
- Expected instead: a soft, faint, slightly tinted shadow (or a bright focused patch with a dim ring) on the seabed or
  wall when a jellyfish is within a few bell-widths of it. I am fairly confident of this absence in image 2, less so
  elsewhere because the walls are busy.

**Cue 4. Hard-edged flat panels and ribbons inside and below the bell.**
- Where: image 7 at (650, 580) and (880, 820); image 2 at (1280, 650); image 3 at (700, 650) and the ribbon tentacles
  from (560, 620) down to (900, 950); image 6, ribbons (1550 to 2300, 700 to 1440).
- Difference from neighbours: sponges and corals are rounded solids with shading. These parts are straight-sided
  translucent sheets of uniform colour, constant width, with squared ends, and they get brighter in steps where they
  overlap.
- Expected instead: frilled, tapering, soft-edged arms that are denser in the middle and fade at the edges; tentacles
  that taper to nothing and vary in width and brightness along their length.

**Cue 5. Doubled bell outline.**
- Where: image 1 (1280, 560); image 4 (1200, 720); image 8 (1280, 590); image 9 (1060, 320); image 6, right.
- What: each bell shows two nested hard dome outlines, the same shape offset, both the same flat fill. Side-on it
  reads as two stacked cut-outs, or in image 9 top-left as two jellyfish overlapping.
- Difference from neighbours: nothing else shows a duplicated silhouette.
- Expected instead: an inner surface that is visibly different from the outer one: fainter, softer, and shaded, so it
  reads as the inside of one thick dome.

**Cue 6. Weaker depth haze than the surroundings (unsure).**
- Where: image 2, far jellyfish at (1250, 160), still clearly pink with a clean outline while the rock around it is
  almost lost in blue. Image 4, the pair at (1870, 640), pinker and brighter than the reef behind them, though they
  are somewhat faded.
- Expected instead: distant jellyfish losing colour and contrast at the same rate as rock at the same distance. This
  may be partly an effect of Cue 1 (they are simply brighter to begin with), so I am not sure it is a separate cue.

**Cue 7. Identical posture.**
- Where: image 4 (six bells, all level, tentacles dead vertical and parallel); image 8; image 9.
- Difference from neighbours: kelp leaves bend in many directions. Every jellyfish is bell-up and level, differing
  only in size.
- Expected instead: some tilted, some mid-pulse with a flatter or more closed bell, tentacles trailing at an angle
  behind the direction of travel. This may be less noticeable in motion; I cannot judge from stills. Images 3 and 7
  show some curve and splay.

**Cue 8. Orphan tentacle lines crossing the frame.**
- Where: image 8 right edge; image 10 bottom-left; image 6 left edge.
- Expected instead: lines that thin out, soften and dim along their length, so they read as fine threads in water,
  not marks on the picture surface.

**Cue 9. Angular rim on the large bells (minor, shared with other objects).**
- Where: image 3, lower rim (250 to 880, 620), straight segments with corners; image 7 (400 to 1000, 800 to 870).
- Kelp and fish are angular too, so this does not single out the jellyfish. It matters only because a clean
  transparent outline shows the corners more.

### 4. The one cue that matters most

**Cue 1: the jellyfish carry no light or shade of their own and look identical in sun and in shade**, in a scene whose
whole character is strong dappled sunlight. Everything else in frame confirms the light direction; the jellyfish are
the only things that do not respond to it.

**Confidence: medium.** Why not high: Cues 1 and 2 show up together in every image, and I cannot separate them in
stills. In images 6 and 7 the "coloured filter" look (Cue 2) is at least as strong as the lighting mismatch. Why not
low: the images where the jellyfish look best (4 and 9) are those where haze and a light shaft happen to give them a
plausible brightness for their place in the scene, and the ones where they look worst (5, 8, 10) are those where a
bright pastel jellyfish sits in front of shaded rock. That pattern points at lighting more than at transparency.

### 5. What already works and should be kept

- **Depth ordering against opaque objects.** Kelp leaves and stalks correctly cover jellyfish: image 5 at (1280, 620),
  image 4 top-right (2380, 60), image 2 top-left (450, 440).
- **The domed form seen from above**, with radial stripes: images 2, 7, 10. The stripes give the bell real roundness.
- **The brighter lower rim** on medium-distance bells: image 4 (1200, 780), image 9 (1280, 610). This is the one place
  the bell reads as having thickness.
- **Image 9 as a whole.** Pale blue-white bells in the light shafts beside the dark cliff are the most convincing
  jellyfish in the set, because their brightness matches where they are.
- **Image 4's group**: size variety, overlap, and partial fading of the far ones give real depth.
- **The palette**: the pink/lavender matches the purple sponges, and the blue variant sits naturally in the water
  colour.
- **Fine tentacles at middle distance** (image 4, image 9) read well as delicate threads; the problem is confined to
  close-up ribbons and out-of-frame streaks.
- **The small fish schooling around the jellyfish in image 10** tie it to the scene's life.

The critic stated that it opened only the ten images, and no other file, shell command or web page.

---

## How the three opinions line up (Claude's note, not the critic's)

| Factor | Owner | Claude, before the critic | Critic |
|---|---|---|---|
| The scene's light (no shadow, no dapples, constant own glow) | not named | main proposal | most important cue, medium confidence |
| How see-through ("coloured filter") | suspected | third | second; could not separate it from the first in stills |
| Order of drawing | suspected "quite likely" | second (order inside each jellyfish) | against other objects: correct, keep. Inside: the doubled bell outline (cue 5) and flat panels (cue 4) |
| They cast no shadow | | not listed | third |
| Haze, posture, stray tentacle lines | | not listed | cues 6 to 8 |

Not Claude's hypothesis but found by the critic: jellyfish cast no shadow on the seabed; every one hangs level with
parallel tentacles; tentacles of out-of-frame jellyfish cross the picture as pale lines. The critic also found the
golden hunters mildly "toy-like".
