// Usage: node _scratch/extract-critic-prompts-from-session-transcript.mjs <transcript.jsonl> <output-directory>
// Recovers the prompts that were given to critic subagents from a Claude Code session transcript (one JSON object per
// line; they live in ~/.claude/projects/<project>/). It looks for assistant tool calls that launch a subagent
// (Agent / Task) and whose prompt or description mentions "critic", and writes each prompt to
// <output-directory>/NN_<local date and time>_<description>.md with the time, the description and the prompt verbatim.
// Written 2026-11-18, after it turned out that none of the critic rounds had saved what the critic was asked.
import { createReadStream, mkdirSync, writeFileSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { join } from 'node:path';
const [, , file, outDir] = process.argv;
if (!file || !outDir) { console.error('usage: node extract-critic-prompts-from-session-transcript.mjs <transcript.jsonl> <output-directory>'); process.exit(1); }
mkdirSync(outDir, { recursive: true });
const rl = createInterface({ input: createReadStream(file), crlfDelay: Infinity });
let n = 0; const seen = new Set();
for await (const line of rl) {
  if (!line.includes('critic') && !line.includes('Critic')) continue;
  let row; try { row = JSON.parse(line); } catch { continue; }
  const content = row?.message?.content; if (!Array.isArray(content)) continue;
  for (const item of content) {
    if (item?.type !== 'tool_use' || !/^(Agent|Task)$/.test(item.name || '')) continue;
    const prompt = item.input?.prompt, desc = item.input?.description || '';
    if (typeof prompt !== 'string' || !/critic/i.test(prompt + ' ' + desc) || seen.has(prompt)) continue;
    seen.add(prompt);
    const when = row.timestamp ? new Date(row.timestamp) : null;
    const local = when ? when.toLocaleString('sv-SE', { timeZone: 'Australia/Sydney' }).replace(' ', '_').replace(/:/g, '') : 'unknown-time';
    const name = `${String(++n).padStart(2, '0')}_${local}_${desc.replace(/[^A-Za-z0-9]+/g, '-').slice(0, 50)}.md`;
    writeFileSync(join(outDir, name), `# Critic prompt recovered from a session transcript\n\n- When (Sydney time): ${local}\n- Description given to the subagent: ${desc}\n- Agent type: ${item.input?.subagent_type || '(default)'}\n- Length: ${prompt.length} characters\n\n## The prompt, verbatim\n\n\`\`\`\n${prompt}\n\`\`\`\n`);
    console.log(`${name}  (${prompt.length} characters)`);
  }
}
console.log(`${n} critic prompts written to ${outDir}`);
