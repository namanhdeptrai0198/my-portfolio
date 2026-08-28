/**
 * Rebuild public/qr.svg — the code that points a phone camera at the site.
 *
 *   node tools/make-qr.js
 *
 * Run this whenever the site's URL changes. A QR code is opaque: nobody proofreads
 * one, so a stale code goes on being scanned and going to the wrong place long
 * after anyone would have caught a stale link in the page copy.
 *
 * Level H is the point of the whole thing. It tolerates losing about 30% of the
 * symbol, which is the budget the mark in the centre spends. The mark covers 9 of
 * the 37 modules across, so under 6% of the area — a wide margin, but the margin
 * is not the evidence. Both the plain and the branded symbol were rasterised at
 * 720, 360 and 180px and fed back through a decoder (jsQR), and all six reads
 * returned the URL exactly. That check lives outside this script because it needs
 * a browser canvas to rasterise; if you change the size or position of the mark,
 * redo it rather than trusting the percentage.
 */
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import QR from "qrcode";

const URL_ = "https://namanhnguyenngoc.vercel.app";
const at = (p) => fileURLToPath(new URL(p, import.meta.url));
const OUT = at("../public/qr.svg");

const QUIET = 4; // the spec's minimum quiet zone; scanners rely on it being there
const LOGO = 9; // modules across
const SCALE = 16; // px per module for the width/height hint; the SVG itself is vector

const qr = QR.create(URL_, { errorCorrectionLevel: "H" });
const n = qr.modules.size;
const S = n + QUIET * 2;

// The mark, minus its own <svg> wrapper, so it can be nested as a child element.
// It comes from src/app/icon.svg rather than being duplicated here, so a re-trace
// of the logo reaches the QR too.
const icon = fs
  .readFileSync(at("../src/app/icon.svg"), "utf8")
  .replace(/^[\s\S]*?<svg[^>]*>/, "")
  .replace(/<\/svg>\s*$/, "");

let modules = "";
for (let y = 0; y < n; y++)
  for (let x = 0; x < n; x++)
    if (qr.modules.get(x, y)) modules += `M${x + QUIET} ${y + QUIET}h1v1h-1z`;

const o = QUIET + (n - LOGO) / 2;
const pad = 0.5; // half a module of white around the mark, so it reads as inset

fs.writeFileSync(
  OUT,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${
    S * SCALE
  }" height="${S * SCALE}" shape-rendering="crispEdges" role="img"
     aria-label="Quét để mở ${URL_.replace(/^https:\/\//, "")}">
  <rect width="${S}" height="${S}" fill="#fff"/>
  <path fill="#000" d="${modules}"/>
  <rect x="${o - pad}" y="${o - pad}" width="${LOGO + pad * 2}" height="${
    LOGO + pad * 2
  }" rx="1.2" fill="#fff"/>
  <svg x="${o}" y="${o}" width="${LOGO}" height="${LOGO}" viewBox="0 0 512 512">${icon}</svg>
</svg>
`,
);

console.log(`${URL_}`);
console.log(`version ${qr.version}, ${n}x${n} modules, level H -> ${OUT}`);
