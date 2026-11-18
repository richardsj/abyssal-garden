// Applies a list of exact-string replacements to one file, and refuses to write anything unless every "find" string
// occurs exactly once. Used for multi-line shader edits where a slip would be hard to see.
// Usage: node _scratch/apply-exact-string-replacements-from-json.mjs <target file> <json file>
// The JSON file is an array of { "find": "...", "replace": "...", "why": "..." }.
import { readFileSync, writeFileSync } from 'node:fs';
const [target, listFile] = process.argv.slice(2);
if (!target || !listFile) { console.error('usage: <target file> <json file>'); process.exit(2); }
let text = readFileSync(target, 'utf8');
const list = JSON.parse(readFileSync(listFile, 'utf8'));
let bad = 0;
for (const { find, why } of list) {
  const n = text.split(find).length - 1;
  if (n !== 1) { console.error(`NOT APPLIED (${n} matches): ${why}\n   ${find.slice(0, 110)}`); bad++; }
}
if (bad) { console.error(`${bad} of ${list.length} could not be placed; file left untouched`); process.exit(1); }
for (const { find, replace } of list) text = text.replace(find, () => replace);
writeFileSync(target, text);
console.log(`applied ${list.length} replacements to ${target}`);
