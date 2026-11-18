# Second blind critic on the jellyfish, after three changes (2026-11-18, about 15:07)

A fresh agent, not the one of the first run, with the same prompt and the same ten views
(`CRITIC_PROMPT_2_after-lighting-thrust-and-translucency.md`). It was not told there had been an earlier review or that
anything had changed. Build: lighting (`71519b5`), thrust (`72adc7c`), opacity (`1180363`).
Pictures: `critic-set-after-translucency/`, keyed by `critic-set/critic-image-key.txt`. Reproduced as returned.

---

## PART A: open review

### What looks physically part of the scene

- **Rock and boulders.** The strongest element. Every rock face carries hard dappled sun patches and deep blue shadow,
  and the pattern runs continuously from rock onto sand (image 01 whole left half; image 08 whole frame; image 03 right
  half). Rocks fade towards the water colour with distance (image 04 centre wall, image 09 left background).
- **Sand and sea floor.** Same dappled light, with clear shadows cast by kelp and rocks (image 01 bottom right, kelp
  shadows at about 1500-2300, 1150-1350; image 10 right, sharp shadow boundary running diagonally from about 1300, 900
  to 1900, 700).
- **Kelp.** Lit and shaded leaf by leaf, casts shadows, goes to silhouette against the bright water (image 04 right
  edge), and fades into haze at distance (image 09 left half). The very near leaves in image 05 (top and right) are
  large flat facets with straight polygon edges, which is crude modelling, but their light and shade agree with the
  scene.
- **Sponges and corals.** Sit on the rock with shading and shadowed interiors (image 05 left, image 08 centre). Bright
  corals on lit sand (image 10 lower right, image 07 lower right) read as glowing but still attached to the ground.
- **Wreck** (image 05 right, about 1500-2200, 600-1100). Well sunk into haze, convincing depth.
- **Water surface and haze.** Surface ripple (images 01, 04) and light shafts (image 09 top left) give a consistent
  light direction from above.

### What looks less than fully part of it

1. **Jellyfish: the clearest case, in every image.** Details are in Part B. In short, they are evenly lit pastel films
   with clean hard outlines, and they take no part in the sun-and-shadow patterning that defines everything else.
   - Image 08: pale cyan jellies at (770, 200), (1300, 380), (1280, 620) are the brightest things in a frame dominated
     by shadowed rock.
   - Image 06: the huge cream jelly on the right (1500-2560, 0-1300) reads as a beige veil over the picture.
   - Image 03: the large blue bell at (540, 370) reads as a patch of fogged glass.
2. **Larger fish: mild.** The big yellow striped fish in image 10 (0-600, 730-970) and the yellow fish in image 09
   (about 1280-1440, 700-960) are flat, bright, angular shapes with little light-to-shadow variation, in front of dark
   shadowed rock. They read as toy-like. They are opaque and do have some shading, so it is much less marked than with
   the jellyfish. The butterflyfish in image 05 (310, 900) is better.
3. **Glowing yellow-green points on the kelp: mild, possibly a style choice.** Equally bright in sun and shade and at
   any distance. In image 09 (left half) they form a glittery curtain over distant hazy kelp, where nothing else at
   that distance keeps that contrast.
4. **Soft white round blobs** (image 05 at 1130, 780; image 09 at 1080, 595; image 01 at 950, 550). They read as
   near-lens particles on top of the picture. Acceptable as floating matter, but they are an overlay-like element.
5. **Unidentified pale blue translucent shapes.** I am unsure what these are (possibly tentacles of jellyfish outside
   the frame, or a ray). They look like flat tinted strips with no shading:
   - image 02, wedge at bottom left (about 50-230, 1180-1330);
   - image 10, straight ribbons at bottom left (0-450, 1080-1400);
   - image 08, straight lines at the right edge (2380-2560, 650-1000).

## PART B: the jellyfish remark

### 1. Agree, partly agree or disagree

**Partly agree, leaning towards agree.** They are clearly three-dimensional bodies, not flat pictures: we look down
into the bells in images 02, 07 and 10, and they pass correctly behind kelp. But their light, surface and edges behave
differently from everything around them, so they read as a separate translucent layer rather than as flesh in this
water.

### 2 and 3. Cues, most important first, with what I would expect instead

**Cue 1: they do not take part in the scene's sun and shadow.**
- What I see: each bell is evenly lit with at most a soft lighter top. There are no dappled light patches on any bell
  and no shadowed side. A jelly in front of deeply shadowed rock is as bright as one in open sunlit water.
- Where: image 08, (1280, 620) and (1300, 380) against dark wall. Image 09, the cream jelly at (2270, 300) on the
  shaded face of the pillar is as bright as the ones at (1070, 300) in the light shafts. Image 01, the lower-left bell
  (60, 940) is bright lavender against a rock base in deep shadow.
- Contrast: in the same frames the rock, sand, sponges and kelp all show strong dapple and hard shadow boundaries.
- Expected instead: brightness varying with position (dimmer and bluer in rock or kelp shade, brighter in sun), moving
  dapple across the top of the bell near the surface, and a visibly brighter sun side with a glowing rim where light
  passes through.
- Caveat: a jelly high in the water column may really be in sun while the ground behind is shaded (image 10), so
  individual cases can be legitimate. The absence of any variation across about 40 jellies is the cue.

**Cue 2: no shadow cast and no other trace on surroundings, so depth placement is ambiguous.**
- What I see: no jelly leaves even a faint soft shadow on rock or sand.
- Where: image 01, centre jelly (1280, 580) and (830, 720) immediately in front of sunlit rock. Image 08, all three in
  front of the wall. Image 02, jellies over lit floor.
- Contrast: kelp and rocks cast clear shadows (image 01 bottom right; image 10 right).
- Effect: the viewer cannot tell whether a jelly is 0.5 m or 10 m from the wall, so it floats "on the picture".
- Expected instead: a faint, soft, slightly tinted shadow patch on nearby surfaces, weaker than an opaque object's.
- Unsure how near to the surfaces they really are; if they are far away, the lack of shadow is correct.

**Cue 3: the bell is a film of constant density.**
- What I see: opacity and colour are almost the same from centre to edge. The background shows through evenly tinted
  and washed out, like a sheet of coloured tracing paper.
- Where: image 03, large bell (200-880, 110-640) and small bell (1280, 650). Image 06, right-hand cream bell. Image 07,
  purple bell (1280, 640) over kelp.
- Contrast: every other object has surface texture and tonal modelling.
- Expected instead: a nearly clear centre where the wall is seen face-on, a markedly denser and brighter rim where the
  wall is seen edge-on, fine radial structure, some softening of what is seen through it, and a wet highlight on the
  sunlit shoulder.

**Cue 4: hard, geometric shapes inside and out.**
- What I see:
  - The rim outline is made of straight segments (image 03, bottom rim of the big bell about 430-830, 600-640; image
    02, right jelly at 2340, 780).
  - The central body is a straight-sided rectangular column (image 02 at 1280, 640; image 06 at 1270, 620 and 1900,
    400; image 08 at 1290, 730, where it is almost opaque white).
  - Inside the bell are straight dark vertical bars (image 02 centre jelly; image 03; image 07 big bell; image 05 at
    715, 980, which looks like a window frame).
  - The thick tentacles are flat, constant-width, straight-edged ribbons that stack into darker bands where they
    overlap (image 06, 1550-2400, 600-1440).
- Contrast: corals and sponges are lumpy and irregular.
- Expected instead: a smooth curved rim with scalloping, frilly tapering oral arms with soft ragged edges, and
  tentacles that taper and fade.

**Cue 5: a doubled bell with two separate hard outlines.**
- What I see: two nested or offset domes, each with its own crisp edge, like two cut-outs stacked.
- Where: image 09 (1070, 300) and (1230, 590); image 04 (1190, 700); image 06 right; image 01 (1280, 560).
- Expected instead: an inner surface seen softly through the outer one, merging at the rim, without a second sharp
  contour.

**Cue 6: identical upright pose and plumb-line tentacles.**
- What I see: every jelly is bell-up and vertical. Thin tentacles hang as dead-straight, parallel, constant-width
  lines of constant brightness that end abruptly (image 08 at 1200-1450, 700-1250; image 09 at 950-1200, 400-800; image
  04 whole group).
- Contrast: kelp bends and fish point in various directions.
- Expected instead: varied tilt, tentacles trailing in curves behind the direction of travel, tangling, thinning and
  fading at the tips.
- This is a "stamped copies" cue more than a lighting one.

**Cue 7: colour holds up against the water. Low-to-medium certainty.**
- What I see: pink, lilac and cream stay clean pastel at mid-distance, while rock at similar distance has turned
  strongly blue (image 04, pink group at 750-1480, 480-1050 against the blue-hazed wall; right pair at 1880, 640).
- In fairness, the farthest ones do fade (image 02 at 1250, 160; image 09 at 1450, 580), so distance haze is partly
  present.
- Expected instead: warm colours draining towards grey-blue with distance, and contrast falling at the same rate as
  the rock beside them.

**Cue 8: what is seen through large near bells does not line up with the surroundings. Unsure.**
- What I see: in image 07 the big cream bell (370-1020, 330-850) shows bright lit rock texture in its lower half, while
  the area just outside the outline is dark blue. Image 06, right bell (1600-2100, 180-330), is similar.
- Effect: it reads like a glass dome or lens with a sharp picture inside it. That is solid, but hard glass rather than
  soft tissue, with an abrupt jump at the outline.
- Expected instead: gentler displacement that is strongest near the rim and combined with blur.
- I cannot be sure this is not simply the true background.

**Cue 9: scale.**
- Bells range from fish-sized to boulder-sized in one frame (image 07 at 690, 590 against 540, 1010; image 06).
- With no shadow or haze anchor, size cannot be read as distance. This is a minor contributor.

**Checked and not a cue:** I found no wrong overlaps. Kelp correctly covers jellies in image 05 (1270, 620) and image
04 (2440, 80). Jellies overlapping each other composite sensibly (image 04).

### 4. Single most important cue

**Cue 1: the jellyfish are evenly, self-sufficiently lit and ignore the scene's sun, dapple and shadow.**

Confidence: **medium**.

- Why this one: it is the one difference present in all ten images and at every size. The rest of the scene's look is
  built almost entirely on dappled sun against deep blue shadow, so anything exempt from it reads as a separate layer.
- Why not high: in the close-ups (images 03, 06, 07) the constant-density film look (cue 3) together with the hard
  geometric parts (cue 4) is at least as strong. From stills I cannot separate "wrong light" from "wrong material".
  The missing shadows (cue 2) are closely tied to cue 1 and may be what the viewer actually senses.

### 5. Already convincing; keep

- Real see-through bells with scenery and fish visible behind (image 10 at 1280, 660 with the fish school; image 01
  centre).
- Correct occlusion by kelp and correct jelly-over-jelly overlap (images 04, 05).
- Distant and near-surface jellies dissolving into the water (image 05 top left at 520, 200; image 02 at 1250, 160;
  image 09 small ones).
- The backlit, milky look of pale jellies against the dark pillar beside the light shafts (image 09 left group). This
  is the most believable view in the set.
- The soft lighter top of the bell (images 04, 05).
- The fine fringe of thin tentacles as a mass (images 04, 09), and the variety of tints.
- The view down into the bell from above gives real volume (images 02, 10).

---

## Comparing the two runs (Claude's notes, not the critic's)

Same prompt, same ten views, different agent, before and after the lighting, thrust and opacity changes.

| | First run | Second run |
|---|---|---|
| Verdict on "layered on" | agree | partly agree, leaning towards agree |
| Most important cue | no light or shade of their own | the same |
| Confidence | medium | medium |
| "Coloured filter" / constant density | 2nd | 3rd |
| No shadow cast | 3rd | 2nd |
| Hard flat panels and ribbons | 4th | 4th, with more detail: rectangular central column, dark vertical bars |
| Doubled bell outline | 5th | 5th |
| New in the second | | a lens-like sharp picture inside big bells (unsure); scale hard to read |

What this says, plainly:
- The lighting change did not move the critic's top cue. It still sees no dapple on any bell, no shadowed side, and
  the same brightness in front of shaded rock as in open water. The owner did see a difference and prefers it; the
  critic, on stills, does not register one.
- The opacity change did not register either: the critic still calls the bell "a film of constant density ... almost
  the same from centre to edge", which is exactly what the change was meant to end.
- One run each is weak evidence (two different agents, and Part B quotes the same complaint to both), but both changes
  failing to show at all is not noise.

Why, as far as Claude can tell from its own code (not verified by experiment):
- The jellyfish hang in open, sunlit water several metres in front of walls that are in shade. Out there the shadow
  map says "lit", correctly. So they are bright against dark rock for a legitimate reason, as the critic's own caveat
  allows, and adding the shadow term changed little where they actually are.
- The ripple used on them is the coarse one (about 4 m across), wider than a bell, so no dapple can show on a bell.
  Rock uses a finer, stronger pattern.
- Both walls of the bell are drawn and blended, plus the membrane underneath. Looked through the middle that is three
  thin layers, at the edge one dense one, which flattens the "clear centre, dense rim" profile toward even. It also
  averages the sun side with the far side, so no lit shoulder shows.
- The skylight term is large next to the sun term, and it is what keeps them bright in shade.

Still listed by this critic, outside the jellyfish: the golden hunters ("toy-like", third reviewer to say so), close
kelp leaves, the glowing points on kelp, and tentacle strips from jellyfish out of frame.
