/**
 * The one query where the layout changes shape, written once because four
 * places have to agree on it: the `@media` blocks in app/page.module.css and
 * Spotlight.module.css, and — through useMediaQuery, in JavaScript —
 * VideoGallery, because a reel that has become a column beside a fixed card
 * turns pages instead of growing, and PlaybackProvider, because a picked video
 * goes up to the strip where there is one and into a dialog where there is not.
 *
 * Two conditions, because two different things have to be true.
 *
 * Width. The sticky column takes 361.2px off the top of any window it opens in
 * — 40.8px of outer gutter, 300px of column, a 20.4px gap — so at 642px the
 * reel is left with exactly one 280px track and the layout technically fits.
 * It is set higher on purpose: at 642 the card comes out *narrower* than the
 * column beside it and the identity reads as the main content. 700 is where the
 * card first overtakes it (338.8 against 300), and it keeps every iPad in one
 * behaviour — the mini, narrowest of them at 744pt, is the reason this is not
 * 750.
 *
 * Height. A window can be wide without being tall: an iPhone 15 Pro on its
 * side is 852x393, which clears any width test we could write and would then
 * have the identity column eat a third of a screen that has none to spare.
 * This layout is drawn for desktops and for handhelds held upright, and 600px
 * is the line that says so: laptops (~800) and tablets upright (1024+) pass,
 * every phone on its side (393–430) falls back to the stacked layout, and
 * nothing in between exists to be caught in the middle.
 *
 * The quantities behind the width live in page.module.css (column, gap,
 * gutter) and VideoGallery.module.css (track).
 *
 * This was two queries until now. The spotlight had its own — this one plus
 * `pointer: fine` — which kept the strip away from anything driven by a finger,
 * so a tablet upright got the two columns and no strip. That distinction is
 * gone: where there are two columns there is now a spotlight, touchscreen or
 * not. The cost it was buying off is real and now paid on those devices — the
 * strip opens at 62dvh (see `--band-h`) before any work is visible, which on a
 * tablet held upright is most of the first screen.
 */
export const WIDE = "(min-width: 700px) and (min-height: 600px)";
