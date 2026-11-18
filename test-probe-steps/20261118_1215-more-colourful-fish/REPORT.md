# More colourful fish (2026-11-18)

Part of the denser-reef-life workstream. Owner's request: "make some of the fish more colourful".
Same machine and viewport as the earlier reports (M5 Max, 2560x1440, detail High). Not benchmarked: the change is two
extra branches in the fish fragment shader and no extra fish.

## Why these fish

8,100 of the 13,799 fish were silver bait fish and the 18 hunters were grey-blue; the colourful schemes belonged to
the small groups. The round-6 critic had noted the hunters were "the same grey-blue as their prey". The bait balls
stay silver (realistic, and the startle behaviour reads well against it).

## What changed

- Two free-swimming silver schools became colourful species (`world.js`, table `SK`). No fish moved: each fish draws
  one random number whatever its kind.
  - The school by the whale tail (home -2, -36, -10; 520 fish) is now bluestripe snappers: gold shading to a darker
    back, pale belly, pale blue lines along the flank (colour 12).
  - The wide school that loops round the start (home 0, -22, 20; 380 fish) is now fairy basslets: violet head and
    shoulders running into a gold tail (colour 13).
- Hunters (colour 4) are now golden trevally: gold flanks, a row of dark bars, pale belly, dusky back, yellow fins.
  The thin cyan glow line they had is gone.
- Fish counts by shape: bait 7,200 (was 8,100), slim 6,110 (was 5,210); total unchanged at 13,799.
- The snapper lines fade out with distance (using the screen-space rate of change of the pattern) so they do not
  shimmer when a fish is a few pixels tall.
- `README.md`: the fish lines name the new schools and the golden hunters.
- `index.html`: 123,772 bytes (was 123,198).

## Checks

- Loads with no console errors or shader warnings.
- `before/`, `after/`, `before-after/` (before on the left): nine views from identical camera positions and clock
  times, taken with `_scratch/chrome-capture-ribbon-schools-and-hunters-as-dataurls.js`.
- First attempt, corrected the same session: the snappers were a flat lemon yellow with no visible lines, and the
  hunters were more cream than gold with two blotches for bars.

## Found along the way

- A stale page: one reload with the cache bypassed still served the previous build (the fish counts gave it away).
  A changed query string (`&v=...`) forced the new one. Check a number that should have changed before trusting an
  "after" capture.
- A frame that looked like floating rock: it was taken from inside a rock wall, where the terrain's own surface is
  not drawn and only the loose chunks on the cliff face show. Seen from open water the same place is a continuous
  wall. No floating boulders remain. It does mean hunters pass through that wall on part of their loop (ball 1,
  clock 20 s): existing behaviour, not addressed.
- Fish swim through rock generally (ribbon schools too): at some clock times the middle of a school is inside a cliff.

## Open

- Yellow shifts toward green in the present water at 5-10 m. The water colour is to be revisited next; the fish
  colours should be judged again after that.
- Not changed: chromis, fusiliers, loners, anthias. Parrotfish ("not distinctive" per the critic) untouched.
