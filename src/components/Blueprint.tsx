/**
 * The four "+" registration marks that every framed object in the Industry
 * system wears. The design system styles them via `.blueprint > .corner`, so
 * they must stay *direct* children of the element carrying `.blueprint`.
 *
 * Purely decorative — hidden from screen readers.
 */
export function BlueprintCorners() {
  return (
    <>
      <i className="corner tl" aria-hidden="true" />
      <i className="corner tr" aria-hidden="true" />
      <i className="corner bl" aria-hidden="true" />
      <i className="corner br" aria-hidden="true" />
    </>
  );
}
