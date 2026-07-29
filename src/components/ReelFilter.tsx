"use client";

import type { FilterKey, FilterOption } from "@/lib/videos";

type Props = {
  options: FilterOption[];
  active: FilterKey;
  onChange: (key: FilterKey) => void;
};

/**
 * The segmented control the handoff flagged as missing (Known Gaps #1).
 *
 * Built on native radios on purpose: the design system paints the selected pill
 * with `.seg-opt:has(input:checked)` and hides the input itself, and native
 * radios bring arrow-key navigation and the focus ring for free.
 */
export function ReelFilter({ options, active, onChange }: Props) {
  return (
    <div
      className="seg"
      role="radiogroup"
      aria-label="Filter work by aspect ratio"
    >
      {options.map((option) => (
        <label key={option.key} className="seg-opt">
          <input
            type="radio"
            name="aspect-ratio"
            value={option.key}
            checked={active === option.key}
            onChange={() => onChange(option.key)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}
