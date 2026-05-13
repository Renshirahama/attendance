import { formatDurationText, formatTimeShort } from "@/lib/formatters";

type WorkSummaryProps = {
  readonly workDurationMs: number;
  readonly breakDurationMs: number;
  readonly clockInAt: number | null;
};

export function WorkSummary({
  workDurationMs,
  breakDurationMs,
  clockInAt,
}: WorkSummaryProps) {
  return (
    <div className="mt-10 border-t border-zinc-100 pt-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-zinc-500">今日の勤務時間</span>
        <span className="text-2xl font-semibold tabular-nums text-zinc-900">
          {formatDurationText(workDurationMs)}
        </span>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm text-zinc-500">休憩</span>
        <span className="text-sm tabular-nums text-zinc-700">
          {formatDurationText(breakDurationMs)}
        </span>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm text-zinc-500">出勤時刻</span>
        <span className="text-sm tabular-nums text-zinc-700">
          {clockInAt !== null
            ? formatTimeShort(new Date(clockInAt))
            : "--:--"}
        </span>
      </div>
    </div>
  );
}
