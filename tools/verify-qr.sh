#!/bin/sh
# Prove public/qr.svg actually scans to the URL make-qr.mjs was told to encode.
#
#   sh tools/verify-qr.sh
#
# Run it after changing the URL, or the size or position of the mark. The "under
# 6% of the area" arithmetic in make-qr.mjs is a reason to expect this to pass,
# not evidence that it does — level H's ~30% budget is spread across the symbol,
# and a mark sitting on the wrong modules can still cost more than its area.
#
# The decoder is Apple's Vision framework, which is what an iPhone camera uses,
# so a pass here is the same judgement the phone in someone's hand will make.
# Both the branded symbol and a logo-less copy are checked, at three sizes: if
# only the branded one fails, the mark is the cause; if both fail, the symbol is.
# 180px is in there because a QR on a business card is read at roughly that.
set -e
cd "$(dirname "$0")/.."

URL=$(sed -n 's/^const URL_ = "\(.*\)";$/\1/p' tools/make-qr.mjs)
[ -n "$URL" ] || { echo "could not read URL_ from tools/make-qr.mjs"; exit 1; }
echo "expecting: $URL"

WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT
cp public/qr.svg "$WORK/branded.svg"

# The logo-less control: drop the white inset pad and the nested <svg> mark.
node -e '
  const fs = require("fs"), f = process.argv[1];
  const plain = fs.readFileSync(f + "/branded.svg", "utf8")
    .replace(/\n  <rect x=[\s\S]*?<\/svg>/, "");
  if (/<svg x=/.test(plain)) throw new Error("failed to strip the mark");
  fs.writeFileSync(f + "/plain.svg", plain);
' "$WORK"

for V in branded plain; do
  for S in 720 360 180; do
    qlmanage -t -s $S -o "$WORK" "$WORK/$V.svg" >/dev/null 2>&1
    mv "$WORK/$V.svg.png" "$WORK/$V-$S.png"
  done
done

cat > "$WORK/decode.swift" <<'SWIFT'
import Foundation
import Vision
import AppKit

let expected = CommandLine.arguments[1]
var pass = 0, total = 0

for path in CommandLine.arguments.dropFirst(2) {
    total += 1
    let name = (path as NSString).lastPathComponent
    guard let img = NSImage(contentsOfFile: path),
          let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
        print("  \(name): could not be loaded"); continue
    }
    let req = VNDetectBarcodesRequest()
    req.symbologies = [.qr]
    try? VNImageRequestHandler(cgImage: cg, options: [:]).perform([req])
    let found = (req.results ?? []).compactMap { $0.payloadStringValue }
    if found == [expected] {
        pass += 1
        print("  \(name): ok")
    } else {
        print("  \(name): FAILED -> \(found)")
    }
}
print("\(pass)/\(total) decoded to exactly the expected URL")
exit(pass == total ? 0 : 1)
SWIFT

swift "$WORK/decode.swift" "$URL" \
  "$WORK/branded-720.png" "$WORK/branded-360.png" "$WORK/branded-180.png" \
  "$WORK/plain-720.png" "$WORK/plain-360.png" "$WORK/plain-180.png"
