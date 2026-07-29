import { Play } from "lucide-react";
import styles from "./PlayMark.module.css";

type Props = {
  /** Diameter in px. VideoCard uses 48, Spotlight uses a larger mark. */
  size: number;
};

/**
 * The circular play affordance shared by every playable thumbnail. A full
 * disc rather than the 4px radius the rest of the page uses — on a play
 * affordance the circle is what reads as "press me".
 */
export function PlayMark({ size }: Props) {
  return (
    <span
      className={styles.mark}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* A triangle centred by its bounding box looks left-heavy inside a
          circle; nudge it onto the optical centre. */}
      <Play
        size={Math.round(size * 0.375)}
        fill="var(--color-bg)"
        stroke="none"
        className={styles.icon}
      />
    </span>
  );
}
