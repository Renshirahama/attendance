type ActionButtonsProps = {
  readonly canClockIn: boolean;
  readonly canClockOut: boolean;
  readonly canBreakStart: boolean;
  readonly canBreakEnd: boolean;
  readonly onClockIn: () => void;
  readonly onClockOut: () => void;
  readonly onBreakStart: () => void;
  readonly onBreakEnd: () => void;
};

type ButtonConfig = {
  readonly label: string;
  readonly enabled: boolean;
  readonly onClick: () => void;
  readonly className: string;
};

const BASE =
  "rounded-xl px-6 py-5 text-base font-semibold shadow-sm transition-colors";

export function ActionButtons({
  canClockIn,
  canClockOut,
  canBreakStart,
  canBreakEnd,
  onClockIn,
  onClockOut,
  onBreakStart,
  onBreakEnd,
}: ActionButtonsProps) {
  const buttons: readonly ButtonConfig[] = [
    {
      label: "出勤",
      enabled: canClockIn,
      onClick: onClockIn,
      className: `${BASE} bg-blue-600 text-white hover:bg-blue-700`,
    },
    {
      label: "退勤",
      enabled: canClockOut,
      onClick: onClockOut,
      className: `${BASE} bg-zinc-900 text-white hover:bg-zinc-800`,
    },
    {
      label: "休憩開始",
      enabled: canBreakStart,
      onClick: onBreakStart,
      className: `${BASE} border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50`,
    },
    {
      label: "休憩終了",
      enabled: canBreakEnd,
      onClick: onBreakEnd,
      className: `${BASE} border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50`,
    },
  ];

  return (
    <div className="mt-10 grid grid-cols-2 gap-4">
      {buttons.map((btn) => (
        <button
          key={btn.label}
          disabled={!btn.enabled}
          onClick={btn.onClick}
          className={`${btn.className} ${!btn.enabled ? "cursor-not-allowed opacity-40" : ""}`}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}
