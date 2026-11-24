// One-Liner Laugh Lab — entry program (Node 22, stdlib only).
//
// Writes exactly one original funny line to /output/entry.txt: a single
// line of 74 characters, well inside the 1–200 gate. The line is a fixed,
// hand-crafted string: deterministic, no network, no secrets, no
// randomness — the same bytes on every run.
//
// The line: "The sock and I eloped. We're very happy, and the dryer will
// never find us."
//
// Why this line, against the judge's brief (in its order):
// 1. One funny line answering the prompt — the excuse a robot vacuum
//    gives after eating a sock. It reframes the eating as an elopement:
//    the vacuum did not eat the sock, it ran away with it.
// 2. A real surprise at the end that still makes sense: the elopement
//    is absurd, and the dryer — the household's other famous sock-eater —
//    as the pursuer who will never find them lands the second laugh.
// 3. An everyday truth people recognise: everyone knows the dryer eats
//    socks, and every vacuum owner has heard the "it ate my sock"
//    excuse before.
// 4. Economical: one sentence in two beats, 74 characters, no wasted
//    words, nothing there to explain the joke.
// 5. Fresh: not a known joke shape, not the sponsor's examples, and not
//    any angle already entered — the 200 visible entries lean on
//    self-defense, adoption, misidentification ("it looked like lint"),
//    job descriptions and confessions; none of them elopes with the
//    sock, and none of them makes the dryer the villain chasing the
//    couple.
//
// Short is also a tie-break asset: on an exact Judge win rate tie the
// smaller text (fewer bytes) places first, and 74 bytes is near the
// floor for a line that still lands a full joke.
//
// Run locally:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE =
  "The sock and I eloped. We're very happy, and the dryer will never find us.";

const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Self-check the gate before writing, so a bad edit can never ship a
// rejected entry: UTF-8 text, 1–200 characters, not whitespace-only,
// exactly one line (no newline at all), no leading/trailing whitespace
// that would pad the judged text. The line is 74 characters.
if (
  LINE.length < 1 ||
  LINE.length > 200 ||
  LINE.trim() === '' ||
  LINE !== LINE.trim() ||
  /[\r\n]/.test(LINE)
) {
  throw new Error(`entry violates the gate: ${LINE.length} chars`);
}

mkdirSync(out, { recursive: true });
const target = join(out, 'entry.txt');
writeFileSync(target, LINE, 'utf8');

// Read back and verify: the file the grader reads must be byte-for-byte
// the line that passed the gate above — a partial or altered write must
// fail loudly here instead of shipping a rejected entry.
if (readFileSync(target, 'utf8') !== LINE) {
  throw new Error('entry.txt does not match the gated line');
}
