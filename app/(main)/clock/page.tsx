"use client";

import { Timer } from "lucide-react";
import { useAttendance } from "@/hooks/use-attendance";
import { useClock } from "@/hooks/use-clock";
import { useDemoCollectionState } from "@/hooks/use-demo-collection-state";
import { ClockDisplay } from "./_components/clock-display";
import { StatusBadge } from "./_components/status-badge";
import { ActionButtons } from "./_components/action-buttons";
import { WorkSummary } from "./_components/work-summary";
import { AttendanceHistory } from "./_components/attendance-history";

export default function ClockPage() {
  const {
    state,
    available,
    clockIn,
    clockOut,
    breakStart,
    breakEnd,
    getWorkDurationMs,
    getBreakDurationMs,
  } = useAttendance();
  const now = useClock();
  const nowMs = now?.getTime() ?? Date.now();
  const historyState = useDemoCollectionState(state.records, {
    errorMessage:
      "勤怠履歴の取得に失敗しました。時間をおいて再読み込みしてください。",
  });

  return (
    <div>
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <Timer className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            打刻
          </h1>
        </div>
        <p className="mt-1 text-sm text-zinc-500">
          出勤・退勤・休憩を記録します
        </p>
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-white p-10 shadow-sm">
        <ClockDisplay />

        <div className="mt-5 text-center">
          <StatusBadge status={state.status} />
        </div>

        <ActionButtons
          canClockIn={available.canClockIn}
          canClockOut={available.canClockOut}
          canBreakStart={available.canBreakStart}
          canBreakEnd={available.canBreakEnd}
          onClockIn={clockIn}
          onClockOut={clockOut}
          onBreakStart={breakStart}
          onBreakEnd={breakEnd}
        />

        <WorkSummary
          workDurationMs={getWorkDurationMs(nowMs)}
          breakDurationMs={getBreakDurationMs(nowMs)}
          clockInAt={state.clockInAt}
        />
      </section>

      <AttendanceHistory
        records={historyState.items}
        isLoading={historyState.isLoading}
        error={historyState.error}
      />
    </div>
  );
}
