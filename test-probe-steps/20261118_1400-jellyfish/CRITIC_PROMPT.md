# Prompt given to the blind critic on the jellyfish (2026-11-18)

Saved word for word, so the run can be repeated and so the report can be read knowing exactly what was asked.

- Agent: a fresh general-purpose subagent with no access to this conversation.
- Pictures: ten 2560x1440 JPEGs copied to a scratch folder outside the repository under the names `image-01.jpg` to
  `image-10.jpg`. Which is which: `critic-set/critic-image-key.txt`. Captured from the uncommitted jellyfish build
  with `_scratch/chrome-capture-jellyfish-critic-set-as-dataurls.js`, clock held at 20 s.
- What the critic was not told: anything about the code, or Claude's hypothesis that the jellyfish do not take part in
  the scene's light. The owner's remark is quoted, but only in Part B, which the critic was asked to read after
  finishing Part A.
- The scratch folder path below is specific to that session; substitute the folder the pictures are in.
- Result: `CRITIC_REPORT.md`. The run took about 2 minutes 20 seconds and about 102,000 tokens.

## The prompt

```
You are a visual critic reviewing ten rendered still images from a real-time 3D underwater scene. You are judging ONLY what you can see in the pictures.

Strict rules:
- Open ONLY these ten files, with the Read tool (they are 2560x1440 JPEGs):
  /private/tmp/claude-501/-Users-tenzin-projects-abyssal-garden/a3a2cfca-27ad-46ce-bb21-4a10c4233030/scratchpad/critic-review-2026-11-18/image-01.jpg through image-10.jpg (image-01.jpg, image-02.jpg, ... image-10.jpg)
- Do NOT open, list, or search any other file or folder. Do not look for source code, notes or documentation. Do not use the web. Do not run shell commands. If you find yourself wanting more context, do without it: the point of this review is that you have only the pictures.
- Do not guess at how the scene is implemented. Describe what you see and what a viewer would perceive, in plain visual terms (light, shadow, colour, edges, transparency, overlap, scale, sharpness, haze).

Look at all ten images carefully before writing. Then write your report in two parts, and write Part A completely BEFORE you read the Part B instructions below it.

PART A: open review.
For the scene as a whole across the ten images: which kinds of object look like they physically belong in the water and the light of this scene, and which (if any) look out of place, pasted on, or not physically part of it? For each kind of object you single out as not belonging, say exactly which visual cues give it away, citing image numbers and where in the frame to look. Say also what looks well integrated, so the contrast is clear. Do not hold back from saying "nothing looks out of place" if that is your honest view.

PART B: a targeted question. (Read this only after finishing Part A.)
A viewer of this scene said of the jellyfish: "they do look a bit like sprites, something about them is saying I'm not really in this scene, I'm just layered on." 
1. Do you agree, partly agree, or disagree, from these stills? 
2. List every distinct visual cue you can find that could produce that impression, most important first. For each cue: describe it concretely, cite at least one image number and the place in the frame where it is clearest, and say how the jellyfish differ in that respect from other things in the same image (rock, coral, sponges, kelp, fish).
3. For each cue, describe what you would expect to see instead if the jellyfish were physically in the scene.
4. Give your single best guess at the ONE cue that matters most, and say how confident you are (low / medium / high) and why.
5. Note anything about the jellyfish that already looks convincing and should be kept.

Keep the report factual and specific. Where you are unsure whether something is a real cue or just your impression, say so. Do not pad. Return the full report as your final message.
```

## Weaknesses of this prompt, for whoever reuses it

- All ten pictures contain jellyfish and the folder was named `critic-review`, so Part A was not a neutral test of
  whether a critic would single them out unprompted from a mixed set.
- "Read Part B only after finishing Part A" cannot be enforced: the critic receives the whole prompt at once.
- Stills only: nothing about the pulse, the sway or the height movement could be judged.
