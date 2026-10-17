interface ProgressBarProps {
  value: number; // 0..100
  label?: string;
}

/**
 * Accessible progress bar. Clamps value to 0..100 and exposes aria values so
 * screen readers announce the percentage.
 */
export default function ProgressBar({ value, label }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className="h-2 w-full overflow-hidden rounded-full bg-gray-200"
    >
      <div
        className="h-full rounded-full bg-indigo-600 transition-all"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
