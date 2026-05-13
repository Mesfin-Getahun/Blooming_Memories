import { promises as fs } from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const memoriesDir = path.join(projectRoot, "public", "memories");
const outputDir = path.join(projectRoot, "src", "generated");
const outputFile = path.join(outputDir, "memories.ts");
const supportedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });

async function main() {
  const entries = await fs.readdir(memoriesDir, { withFileTypes: true }).catch((error) => {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  });

  const imagePaths = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => supportedExtensions.has(path.extname(name).toLowerCase()))
    .sort(collator.compare)
    .map((name) => `/memories/${name}`);

  const fileContents = `export const memoryImagePaths = ${JSON.stringify(imagePaths, null, 2)} as const;\n`;

  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(outputFile, fileContents, "utf8");

  console.log(`Generated ${path.relative(projectRoot, outputFile)} with ${imagePaths.length} image(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
