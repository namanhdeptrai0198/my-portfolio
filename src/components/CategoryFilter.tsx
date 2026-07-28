"use client";

import type { CategoryKey, CategoryOption } from "@/lib/videos";

type Props = {
  categories: CategoryOption[];
  active: CategoryKey | "all";
  onChange: (key: CategoryKey | "all") => void;
};

/**
 * The segmented control the handoff flagged as missing (Known Gaps #1).
 *
 * Built on native radios on purpose: the design system paints the selected pill
 * with `.seg-opt:has(input:checked)` and hides the input itself, and native
 * radios bring arrow-key navigation and the focus ring for free.
 */
export function CategoryFilter({ categories, active, onChange }: Props) {
  return (
    <div className="seg" role="radiogroup" aria-label="Filter work by category">
      {categories.map((category) => (
        <label key={category.key} className="seg-opt">
          <input
            type="radio"
            name="category"
            value={category.key}
            checked={active === category.key}
            onChange={() => onChange(category.key)}
          />
          {category.label}
        </label>
      ))}
    </div>
  );
}
