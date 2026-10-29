// Builds web masters for catalog photography from the untouched originals in
// photography-inbox/categories/ (gitignored). See docs/lavishhaus-assets.md.
//
//   node scripts/build-images.mjs
//
// Output: public/images/catalog/<id>.jpg (auto-oriented, metadata stripped,
// long edge <= 2000px) plus lib/image-manifest.json with intrinsic size and a
// blur placeholder. next/image then serves responsive AVIF/WebP widths.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const INBOX = "photography-inbox/categories";
const OUT = "public/images/catalog";
const MANIFEST = "lib/image-manifest.json";
const MAX_EDGE = 2000;

// crop: fractions of the auto-oriented original { left, top, width, height }.
// Every crop is a privacy or clutter fix; the reason is noted alongside.
const SOURCES = {
  // Bedroom
  "bed-faceted-01": { src: "bedroom/bed-beige-facet-headboard-01.jpeg" },
  "bed-faceted-02": { src: "bedroom/bed-beige-facet-headboard-02-wide.jpeg" },
  "bed-faceted-03": { src: "bedroom/bed-beige-facet-headboard-03.jpeg" },
  "bed-arch-dresser": { src: "bedroom/bed-black-velvet-arch-headboard-white-dresser.jpeg" },
  "bed-champagne-diamond": { src: "bedroom/bed-champagne-diamond-headboard-gold-trim.jpeg" },
  "bed-cognac-panel": { src: "bedroom/bed-cognac-leather-diamond-headboard.jpeg" },
  "bed-green-chevron": { src: "bedroom/bed-green-velvet-chevron-headboard.jpeg" },
  "bed-grey-square-panel": { src: "bedroom/bed-grey-square-tufted-panel-headboard.jpeg" },
  "bed-grey-diamond-tufted": { src: "bedroom/bed-grey-velvet-diamond-tufted-feather-wallpaper.jpeg" },
  "bed-honeycomb-timber": { src: "bedroom/bed-honeycomb-tufted-headboard-wood-frame.jpeg" },
  // Ladder on the right of the showroom floor.
  "bed-grey-channel-mirror": {
    src: "bedroom/bed-grey-channel-headboard-mirror-panels-bolster-bench.jpeg",
    crop: { left: 0, top: 0.12, width: 0.8, height: 0.64 },
  },
  // Bucket and exercise mat at the edges of the room.
  "bed-navy-channel-wall": {
    src: "bedroom/bed-navy-upholstered-channel-wall-panel-installed.jpeg",
    crop: { left: 0.08, top: 0.04, width: 0.82, height: 0.8 },
  },
  "suite-grey-lacquer-01": { src: "bedroom/bed-grey-lacquer-gold-mirror-stripe-01.jpeg" },
  "suite-grey-lacquer-02": { src: "bedroom/bed-grey-lacquer-gold-mirror-stripe-02-wide.jpeg" },
  "suite-grey-lacquer-03": { src: "bedroom/bed-grey-lacquer-gold-mirror-stripe-03.jpeg" },

  // Dining
  "dining-rose-gold": { src: "dining/dining-table-rose-gold-legs-8-chairs.jpeg" },
  // A person is partly visible at the left edge.
  "dining-black-fluted": {
    src: "dining/dining-set-black-fluted-table-aubergine-velvet-bench.jpeg",
    crop: { left: 0.11, top: 0, width: 0.89, height: 1 },
  },
  "dining-chairs-tufted": { src: "dining/dining-chairs-beige-velvet-button-back-workshop.jpeg" },

  // Kitchen
  "kitchen-island-fluted": { src: "custom-furniture/kitchen-island-fluted-taupe-cabinetry.jpeg" },

  // Office
  "desk-white-pedestal": { src: "office/desk-white-lacquer-leather-trim.jpeg" },

  // Living room
  "sofa-chesterfield": { src: "living-room/chesterfield-sofa-brown-leather.jpeg" },
  "console-white-sculpture": { src: "living-room/console-table-elephant-sculptures.jpeg" },
  "console-brass-drawers": { src: "living-room/console-table-round-mirror-brass-legs.jpeg" },
  // A face is reflected in the mirror above the console; crop below the mirrors.
  "console-floating-fluted": {
    src: "living-room/console-floating-black-fluted-wall-mounted.jpeg",
    crop: { left: 0, top: 0.3, width: 0.86, height: 0.46 },
  },
  "coffee-tables-pebble": { src: "living-room/coffee-tables-black-fluted-pebble-pair.jpeg" },
  "tv-marble-01": { src: "living-room/tv-wall-console-marble-grey-01.jpeg" },
  "tv-marble-02": { src: "living-room/tv-wall-console-marble-grey-02.jpeg" },
  "tv-marble-03": { src: "living-room/tv-wall-console-marble-grey-03.jpeg" },
  "tv-timber": { src: "living-room/tv-wall-console-wood-marshall-speaker.jpeg" },
  "tv-led-01": { src: "living-room/tv-wall-unit-built-in-led-shelving-01.jpeg" },
  "tv-led-02": { src: "living-room/tv-wall-unit-built-in-led-shelving-02-wide.jpeg" },
};

fs.mkdirSync(OUT, { recursive: true });
const manifest = {};

for (const [id, { src, crop }] of Object.entries(SOURCES)) {
  const input = path.join(INBOX, src);
  // Auto-orient first so crop fractions refer to the upright image.
  const oriented = await sharp(input).rotate().toBuffer();
  let image = sharp(oriented);
  if (crop) {
    const { width, height } = await image.metadata();
    image = image.extract({
      left: Math.round(crop.left * width),
      top: Math.round(crop.top * height),
      width: Math.round(crop.width * width),
      height: Math.round(crop.height * height),
    });
    image = sharp(await image.toBuffer());
  }
  const resized = image.resize(MAX_EDGE, MAX_EDGE, { fit: "inside", withoutEnlargement: true });
  // sharp drops EXIF/GPS unless withMetadata() is called.
  const { data, info } = await resized.jpeg({ quality: 80, mozjpeg: true }).toBuffer({ resolveWithObject: true });
  fs.writeFileSync(path.join(OUT, `${id}.jpg`), data);

  const blur = await sharp(data).resize(16, 16, { fit: "inside" }).jpeg({ quality: 50 }).toBuffer();
  manifest[id] = {
    src: `/images/catalog/${id}.jpg`,
    width: info.width,
    height: info.height,
    blurDataURL: `data:image/jpeg;base64,${blur.toString("base64")}`,
  };
  console.log(`${id} ${info.width}x${info.height} ${(data.length / 1024).toFixed(0)}KB`);
}

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`wrote ${Object.keys(manifest).length} images`);

// Open Graph card (1200x630): a real photo with the logo as an ivory
// silhouette over a dark gradient, matching the footer treatment.
{
  const W = 1200;
  const H = 630;
  const photo = await sharp(path.join(OUT, "dining-black-fluted.jpg"))
    .resize(W, H, { fit: "cover", position: "centre" })
    .toBuffer();
  const gradient = Buffer.from(
    `<svg width="${W}" height="${H}"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#16130f" stop-opacity="0.95"/><stop offset="0.6" stop-color="#16130f" stop-opacity="0.75"/><stop offset="1" stop-color="#16130f" stop-opacity="0"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#g)"/></svg>`
  );
  const logoAlpha = await sharp("public/images/logo.png").resize({ width: 420 }).extractChannel("alpha").raw().toBuffer({ resolveWithObject: true });
  const logo = await sharp({ create: { width: logoAlpha.info.width, height: logoAlpha.info.height, channels: 3, background: "#faf7f1" } })
    .joinChannel(logoAlpha.data, { raw: { width: logoAlpha.info.width, height: logoAlpha.info.height, channels: 1 } })
    .png()
    .toBuffer();
  await sharp(photo)
    .composite([
      { input: gradient, left: 0, top: 0 },
      { input: logo, left: 80, top: Math.round((H - logoAlpha.info.height) / 2) },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile("public/og-image.jpg");
  console.log("wrote public/og-image.jpg");
}
