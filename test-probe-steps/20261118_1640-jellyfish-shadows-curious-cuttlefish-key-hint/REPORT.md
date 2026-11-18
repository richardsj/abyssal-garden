# Jellyfish shadows, curious cuttlefish, key hint (2026-11-18, about 16:25 to 16:40)

Asked for by the owner in this order: "Jellyfish shadows, then curious cuttlefish please", plus a hint of the keys that
flashes after diving in. Branch `denser-reef-life`, on top of `6f7d528`.

## 1. Jellyfish shadows

**The problem.** The shadow map is drawn once when the page loads, so nothing that moves can cast a shadow. Both blind
critics had named "they do not take part in the scene's sun and shadow" as the top reason the jellyfish look pasted on.

**What was built.** Every frame, one soft disc per jellyfish is drawn into a small texture (1024 x 1024, covering 384 m
of world) as seen looking down the sun's rays. The disc records how much light the bell takes and how high the bell is.
Rock, coral, sponges and kelp leaves look that texture up: anything below a bell is shaded, and the further below, the
wider the lookup, so the shadow softens with distance. The disc shrinks as the bell squeezes. The jellyfish's position
maths moved into one shared shader function (`jctr`) so the animal and its shadow cannot disagree.

**Does it work?** Yes, shown by subtraction. A twin page with the shadow strength set to zero
(`_scratch/build-dev-page-variant-without-jellyfish-shadows.mjs`) was photographed from the same views, and the two sets
subtracted (`diff-round-1-sheet.jpg`, differences multiplied by 6). The only pixels that differ are soft patches on the
seabed, on kelp leaves under the bells and on a rock in the kelp basin. Everything else is identical, which also shows
that adding a tenth texture to the shared bindings disturbed nothing.

**Can you see it?** Barely, in stills. In `pair-without-left-with-right-shadows-on-kelp-crop.jpg` and
`pair-without-left-with-right-shadows-on-seabed-crop.jpg` Claude could not confidently tell the two sides apart: the
shadows blend into the sun dapples and the shade already there. They were strengthened once (0.55 to 0.72 of the
sunlight at the middle, spread narrowed); going further would be wrong for a see-through animal. Whether a moving,
pulsing patch is noticeable in motion has not been seen.

**Not done:** fish, anemone tentacles and the light shafts do not take the shadow; the tentacles cast none.

## 2. Curious but cautious cuttlefish

**What was built.** A new per-frame value, "how settled the viewer has been": about five seconds of keeping still (or
drifting under 1.2 m/s; turning the head does not count) fill it, and swimming off empties it in a third of a second.
Jumping to a viewpoint with 1 to 6 resets it.

- Settled viewer within about 14 m: the cuttlefish glides most of the way over (four fifths of the distance beyond a
  3 m stand-off), rises toward mask height, and faces the viewer more squarely (about 20 degrees off, where it used to
  stay 50 degrees off). At that range its zebra display comes on, as before.
- Viewer swims off: it slips back to its own spot.
- Fast swimmer nearby (the "water stirred" value from the night dive's plankton): it backs a further two metres away
  and blanches.

**Check.** `triptych-cuttlefish-from-5m-unsettled-settled-fast.jpg`, from a camera that does not move: left, at rest,
side on in its mottle; middle, settled viewer, closer, facing the camera, striped; right, fast swimmer, further off and
pale. On the shipped page, left alone at the opening viewpoint for about eight seconds, the cuttlefish there came over
and turned to face the camera.

**Limits.** It moves in a straight line toward the viewer and does not avoid rock or coral on the way (fish already
swim through rock). Views of the first cuttlefish from 8 m showed nothing usable (hidden or too small); the second one
carried the check. Not seen in motion: the glide itself and the retreat.

## 3. Key hint

One second after the first **Dive in**, a see-through rounded box low in the middle shows `?` Keys, `N` Day / night,
`W A S D` Swim, and fades four seconds later. `?` then shows the whole list of keys (the menu's list, copied) until it
is pressed again or the menu opens; the list now ends with "`?` These keys". Hidden on touch screens, which have no
keyboard. Checked on `index.html`: nothing before the dive, the hint lit at 2.2 s, gone by 6.7 s, `?` shows and hides
the list.

## Cost (four benchmark flights back to back, same test window, 2560x1440, High detail, about 16:33 to 16:36)

Graphics-processor time per frame, average, in milliseconds.

| Run | Build | Average | 99th percentile |
|---|---|---|---|
| 1 | before (`6f7d528`) | 9.49 | 21.04 |
| 2 | with these changes | 9.57 | 12.52 |
| 3 | before, again | 11.14 | 16.52 |
| 4 | with these changes, again | 9.73 | 14.02 |

No cost that can be told from the noise. The machine was busier than in the earlier session (load average about 4) and
the two "before" runs disagree by 1.6 ms, so this only rules out a large cost. The test browser had restarted, so this
is a new window (page 26) and these numbers should not be compared with earlier reports.

## Other checks and gaps

- No shader or pipeline errors in the console on `dev.html` or `index.html` (one 404 for the favicon).
- `index.html` is 137,274 bytes (it was 134,142).
- Not loaded: Low or Medium detail with the new texture binding; night with the shadows or the cuttlefish; touch.
- No blind critic.
