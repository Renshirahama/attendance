import { CalendarDays } from "lucide-react";

type DayMark = "worked" | "approved" | "pending" | "off";
type DayCell = {
  day: number | null;
  mark?: DayMark;
  isToday?: boolean;
};

const markStyle: Record<DayMark, { dot: string; label: string }> = {
  worked: { dot: "bg-blue-500", label: "出勤実績" },
  approved: { dot: "bg-emerald-500", label: "承認済みシフト" },
  pending: { dot: "bg-amber-500", label: "申請中" },
  off: { dot: "bg-zinc-300", label: "休み" },
};

const calendar: DayCell[] = [
  ...Array.from({ length: 4 }, () => ({ day: null }) as DayCell),
  ...Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    let mark: DayMark | undefined;
    if ([1, 4, 5, 6, 7, 8, 11, 12, 13].includes(day)) mark = "worked";
    else if (day === 13) mark = "worked";
    else if ([14, 15, 18, 19, 20].includes(day)) mark = "approved";
    else if ([22, 25].includes(day)) mark = "pending";
    else if ([2, 3, 9, 10, 16, 17, 23, 24, 30, 31].includes(day)) mark = "off";
    return {
      day,
      mark,
      isToday: day === 13,
    } as DayCell;
  }),
];

const weekDays = ["日", "月", "火", "水", "木", "金", "土"];

export default function CalendarPage() {
  return (
    <div>
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <CalendarDays className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            カレンダー
          </h1>
        </div>
        <p className="mt-1 text-sm text-zinc-500">
          勤務予定・出勤実績・申請中シフトを月単位で確認できます
        </p>
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <button className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50">
            前月
          </button>
          <p className="text-lg font-semibold text-zinc-900">2026年 5月</p>
          <button className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50">
            翌月
          </button>
        </div>

        <div className="mt-6 grid grid-cols-7 gap-px overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 text-sm">
          {weekDays.map((w, i) => (
            <div
              key={w}
              className={`bg-zinc-50 py-2 text-center text-xs font-medium ${
                i === 0
                  ? "text-rose-600"
                  : i === 6
                    ? "text-blue-600"
                    : "text-zinc-600"
              }`}
            >
              {w}
            </div>
          ))}
          {calendar.map((c, idx) => (
            <div
              key={idx}
              className="min-h-[88px] bg-white p-2 text-left"
            >
              {c.day !== null && (
                <>
                  <span
                    className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs tabular-nums ${
                      c.isToday
                        ? "bg-blue-600 font-semibold text-white"
                        : "text-zinc-700"
                    }`}
                  >
                    {c.day}
                  </span>
                  {c.mark && (
                    <div className="mt-2 flex items-center gap-1.5">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${markStyle[c.mark].dot}`}
                      />
                      <span className="text-[11px] text-zinc-600">
                        {markStyle[c.mark].label}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          {(Object.keys(markStyle) as DayMark[]).map((k) => (
            <div key={k} className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${markStyle[k].dot}`} />
              <span className="text-xs text-zinc-600">
                {markStyle[k].label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
