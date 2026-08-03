/**
 * The one width where the layout changes shape, written once because four
 * files have to agree on it: the `@media` blocks in app/page.module.css and
 * Spotlight.module.css, and the two components that have to ask the same
 * question in JavaScript — PlaybackProvider, because below this there is no
 * spotlight to play anything in, and VideoGallery, because below this the reel
 * loads more instead of turning pages.
 */
export const WIDE = "(min-width: 900px)";
