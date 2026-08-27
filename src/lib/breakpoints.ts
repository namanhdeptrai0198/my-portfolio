/**
 * The query where the layout changes shape, written once because three files
 * have to agree on it: the `@media` block in app/page.module.css, and
 * VideoGallery, which asks the same question in JavaScript because a reel that
 * has become a column beside a fixed card turns pages instead of growing.
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
 */
export const WIDE = "(min-width: 700px) and (min-height: 600px)";

/**
 * Everything WIDE asks, and then one more thing: that a mouse or a trackpad is
 * driving the page. Where the spotlight is allowed to exist — the `@media`
 * block in Spotlight.module.css, and PlaybackProvider, which sends a picked
 * video up to the strip here and opens the dialog everywhere else.
 *
 * `pointer: fine` rather than a wider `min-width`, because width cannot answer
 * this question. A 12.9" iPad on its side is 1366px across, wider than most of
 * the laptops this is meant for, so any width high enough to exclude it would
 * take real desktops with it. What actually separates them is the input:
 * iPadOS reports a coarse primary pointer even with the keyboard case attached,
 * while a laptop reports a fine one.
 *
 * The cost, and it is the intended one: a touchscreen laptop being used in
 * tablet mode with no mouse reports coarse too, and gets the reel's dialog
 * rather than the strip. That is the right answer for how it is being held.
 *
 * The spotlight is the one thing on the page that opens at 62dvh before any
 * work is visible (see `--band-h`), which is affordable on a desktop where the
 * first row of cards clears the fold anyway, and not on a tablet held upright,
 * where it costs the whole first screen.
 */
export const HAS_SPOTLIGHT = `${WIDE} and (pointer: fine)`;
