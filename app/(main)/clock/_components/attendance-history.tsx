import type { AttendanceRecord } from "@/lib/attendance";
import { formatTimeShort } from "@/lib/formatters";
import { SkeletonList, StateMessage } from "@/components/data-state";

type AttendanceHistoryProps = {
  readonly records: readonly AttendanceRecord[];
  readonly isLoading?: boolean;
  readonly error?: string | null;
};

const RECORD_LABEL: Record<AttendanceRecord["type"], string> = {
  CLOCK_IN: "出勤",
  CLOCK_OUT: "退勤",
  BREAK_START: "休憩開始",
  BREAK_END: "休憩終了",
};

const RECORD_STYLE: Record<AttendanceRecord["type"], string> = {
  CLOCK_IN: "text-blue-600",
  CLOCK_OUT: "text-zinc-700",
  BREAK_START: "text-amber-600",
  BREAK_END: "text-emerald-600",
};

export function AttendanceHistory({
  records,
  isLoading = false,
  error = null,
}: AttendanceHistoryProps) {
  if (isLoading) {
    return <SkeletonList title="今日の勤怠履歴を読み込み中です" rows={3} />;
  }

  if (error) {
    return (
      <section className="mt-6">
        <StateMessage
          title="勤怠履歴を表示できません"
          message={error}
          tone="error"
        />
      </section>
    );
  }

  if (records.length === 0) {
    return (
      <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-medium text-zinc-500">今日の勤怠履歴</h2>
        <p className="mt-4 text-center text-sm text-zinc-400">
          まだ打刻データがありません
        </p>
      </section>
    );
  }

  return (
    <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-medium text-zinc-500">今日の勤怠履歴</h2>
      <ul className="mt-4 divide-y divide-zinc-100">
        {records.map((record) => (
          <li
            key={record.id}
            className="flex items-center justify-between py-3"
          >
            <span className={`text-sm font-medium ${RECORD_STYLE[record.type]}`}>
              {RECORD_LABEL[record.type]}
            </span>
            <span className="text-sm tabular-nums text-zinc-500">
              {formatTimeShort(new Date(record.timestamp))}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
