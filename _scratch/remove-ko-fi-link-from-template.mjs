// One-off (2026-11-18): removes the Ko-fi "Support" link from the menu footer in source/template.html, with the red
// button style that only it used. The owner: "it belongs on the original author (where it's present), I'm not
// soliciting donations". Checks that each piece is found exactly once and refuses to write otherwise.
import { readFileSync, writeFileSync } from 'node:fs';
const file = 'source/template.html';
let lines = readFileSync(file, 'utf8').split('\n');
const link = lines.filter((l) => l.includes('ko-fi.com/noniv')).length;
const style = lines.filter((l) => l === 'a + a { background: #ff5e5b; color: #fff; }').length;
const comment = lines.filter((l) => l === '/* GitHub and Ko-fi: always at the bottom of the menu, in their own colours */').length;
if (link !== 1 || style !== 1 || comment !== 1) { console.error('not as expected', { link, style, comment }); process.exit(1); }
lines = lines.filter((l) => !l.includes('ko-fi.com/noniv') && l !== 'a + a { background: #ff5e5b; color: #fff; }')
  .map((l) => l === '/* GitHub and Ko-fi: always at the bottom of the menu, in their own colours */' ? '/* GitHub link: always at the bottom of the menu */' : l);
writeFileSync(file, lines.join('\n'));
console.log('removed the Ko-fi link and its style from', file);
