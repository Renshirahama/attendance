import type { Shift, ShiftStatus } from "@/lib/shifts";
import { SHIFT_STATUS_LABEL } from "@/lib/shifts";
import { formatDate } from "@/lib/formatters";
import { SkeletonList, StateMessage } from "@/components/data-state";

type ShiftHistoryProps = {
  readonly shifts: readonly Shift[];
  readonly isLoading?: boolean;
  readonly error?: string | null;
};

const STATUS_STYLE: Record<ShiftStatus, string> = {
  pending: "bg-amber-50 text-amber-700",
  approved: "bg-emerald-50 text-emerald-700",
  rejected: "bg-rose-50 text-rose-700",
};

function formatShiftDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return formatDate(date);
}

export function ShiftHistory({
  shifts,
  isLoading = false,
  error = null,
}: ShiftHistoryProps) {
  if (isLoading) {
    return <SkeletonList title="申請履歴を読み込み中です" rows={3} />;
  }

  if (error) {
    return (
      <section className="lg:w-1/2">
        <h2 className="text-base font-semibold text-zinc-900">申請履歴</h2>
        <div className="mt-4">
          <StateMessage
            title="申請履歴を表示できません"
            message={error}
            tone="error"
          />
        </div>
      </section>
    );
  }

  if (shifts.length === 0) {
    return (
      <section className="lg:w-1/2">
        <h2 className="text-base font-semibold text-zinc-900">申請履歴</h2>
        <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <p className="text-center text-sm text-zinc-400">
            申請はまだありません
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="lg:w-1/2">
      <h2 className="text-base font-semibold text-zinc-900">申請履歴</h2>
      <ul className="mt-4 divide-y divide-zinc-100 rounded-2xl border border-zinc-200 bg-white shadow-sm">
        {shifts.map((shift) => (
          <li
            key={shift.id}
            className="flex items-center justify-between px-6 py-4"
          >
            <div>
              <p className="text-sm font-medium text-zinc-900">
                {formatShiftDate(shift.date)}
              </p>
              <p className="mt-0.5 text-sm tabular-nums text-zinc-600">
                {shift.startTime} 〜 {shift.endTime}
              </p>
              <p className="mt-0.5 text-xs text-zinc-500">{shift.reason}</p>
              {shift.note && (
                <p className="mt-0.5 text-xs text-zinc-400">{shift.note}</p>
              )}
            </div>
            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[shift.status]}`}
            >
              {SHIFT_STATUS_LABEL[shift.status]}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
