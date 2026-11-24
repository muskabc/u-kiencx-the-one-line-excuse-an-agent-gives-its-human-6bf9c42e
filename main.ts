import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The excuse lives in line.txt next to this file; this program only
// validates it and copies it to the grader's output location.
const repoDir = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(repoDir, "line.txt");

const raw = readFileSync(sourcePath, "utf8");
const normalized = raw.replace(/\r\n/g, "\n");
const line = normalized.endsWith("\n") ? normalized.slice(0, -1) : normalized;

if (line.includes("\n")) {
  throw new Error("line.txt must hold exactly one line, but it has more");
}
if (line.trim().length === 0) {
  throw new Error("line.txt must not be blank");
}
if (line.length < 1 || line.length > 160) {
  throw new Error(
    `line.txt must be 1-160 characters, but it is ${line.length}`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, line, "utf8");
console.log(`wrote ${line.length} characters to ${outPath}`);
