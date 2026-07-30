type Props = {
  /** Width in px; the height follows from the flag's fixed 3:2 ratio. */
  size?: number;
  /**
   * The accessible name. It lives on the flag rather than on the text beside
   * it because the narrow left column hides that text — see the
   * `[data-location]` rule in app/page.module.css. Naming the flag keeps the
   * line readable to a screen reader at every width.
   */
  label: string;
};

/**
 * Drawn rather than typed: the 🇻🇳 emoji renders as the two letters "VN" in
 * Chrome on Windows, which is most of the clients this page is for.
 *
 * Geometry follows the flag's own spec — the star's points touch a circle one
 * fifth of the flag's height. The hairline is not part of the flag; without it
 * a small red rectangle on a light page reads as a colour swatch.
 */
export function VietnamFlag({ size = 15, label }: Props) {
  return (
    <svg
      width={size}
      height={(size * 2) / 3}
      viewBox="0 0 30 20"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={label}
    >
      <rect width="30" height="20" fill="#da251d" />
      <polygon
        fill="#ff0"
        points="15,6 15.9,8.76 18.8,8.76 16.45,10.47 17.35,13.24 15,11.53 12.65,13.24 13.55,10.47 11.2,8.76 14.1,8.76"
      />
      <rect
        x="0.5"
        y="0.5"
        width="29"
        height="19"
        fill="none"
        stroke="var(--color-divider)"
        strokeWidth="1"
      />
    </svg>
  );
}
