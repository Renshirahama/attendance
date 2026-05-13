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
      className: `${BASE} bg-emerald-600 text-white hover:bg-emerald-700`,
    },
    {
      label: "退勤",
      enabled: canClockOut,
      onClick: onClockOut,
      className: `${BASE} bg-rose-600 text-white hover:bg-rose-700`,
    },
    {
      label: "休憩開始",
      enabled: canBreakStart,
      onClick: onBreakStart,
      className: `${BASE} bg-amber-500 text-white hover:bg-amber-600`,
    },
    {
      label: "休憩終了",
      enabled: canBreakEnd,
      onClick: onBreakEnd,
      className: `${BASE} bg-zinc-400 text-white hover:bg-zinc-500`,
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
