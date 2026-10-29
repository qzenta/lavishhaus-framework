// Converts full-page PNG screenshots in an evidence folder to small JPEGs for committing.
// Usage: node scripts/compress-evidence.mjs <dir>
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const dir = process.argv[2];
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".png"))) {
  const input = path.join(dir, f);
  const { width } = await sharp(input).metadata();
  await sharp(input, { limitInputPixels: false })
    .resize({ width: Math.min(width, 720) })
    .jpeg({ quality: 55, mozjpeg: true })
    .toFile(input.replace(/\.png$/, ".jpg"));
}
