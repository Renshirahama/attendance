"use client";

import { CalendarDays } from "lucide-react";
import { SkeletonBlocks, StateMessage } from "@/components/data-state";
import { useDemoCollectionState } from "@/hooks/use-demo-collection-state";

type DayStatus = "worked" | "approved" | "pending" | "rejected";

type DayData = {
  readonly day: number | null;
  readonly status?: DayStatus;
  readonly startTime?: string;
  readonly endTime?: string;
  readonly duration?: string;
  readonly isToday?: boolean;
  readonly isWeekend?: "sun" | "sat";
};

const STATUS_CONFIG: Record<
  DayStatus,
  { border: string; label: string; labelColor: string; dotColor: string }
> = {
  worked: {
    border: "border-l-[3px] border-emerald-500",
    label: "出勤済",
    labelColor: "text-emerald-600",
    dotColor: "bg-emerald-500",
  },
  approved: {
    border: "border-l-[3px] border-emerald-400",
    label: "承認済",
    labelColor: "text-emerald-600",
    dotColor: "bg-emerald-400",
  },
  pending: {
    border: "border-l-[3px] border-dashed border-amber-400",
    label: "申請中",
    labelColor: "text-amber-600",
    dotColor: "bg-amber-400",
  },
  rejected: {
    border: "border-l-[3px] border-rose-400",
    label: "却下",
    labelColor: "text-rose-500",
    dotColor: "bg-rose-400",
  },
};

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"] as const;

function buildCalendar(): readonly DayData[] {
  const offset: DayData[] = Array.from({ length: 4 }, () => ({ day: null }));

  const workData: Record<
    number,
    { status: DayStatus; start?: string; end?: string; duration?: string }
  > = {
    5: { status: "worked", start: "9:00", end: "18:00", duration: "8h15m" },
    6: { status: "worked", start: "9:00", end: "18:00", duration: "8h00m" },
    7: { status: "worked", start: "9:00", end: "18:00", duration: "7h45m" },
    8: { status: "worked", start: "10:00", end: "17:00", duration: "6h30m" },
    9: { status: "worked", start: "9:00", end: "18:00", duration: "8h15m" },
    12: { status: "rejected", start: "13:00", end: "18:00" },
    13: { status: "worked", start: "9:00" },
    15: { status: "pending", start: "9:00", end: "18:00" },
    16: { status: "approved", start: "10:00", end: "19:00" },
  };

  const days: DayData[] = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    const dayOfWeek = (day + 3) % 7; // May 2026: 1st is Thursday (index 4)
    const data = workData[day];
    return {
      day,
      status: data?.status,
      startTime: data?.start,
      endTime: data?.end,
      duration: data?.duration,
      isToday: day === 13,
      isWeekend:
        dayOfWeek === 0 ? "sun" : dayOfWeek === 6 ? "sat" : undefined,
    };
  });

  return [...offset, ...days];
}

const calendar = buildCalendar();

function DayCell({ data }: { readonly data: DayData }) {
  if (data.day === null) {
    return <div className="h-24" />;
  }

  const config = data.status ? STATUS_CONFIG[data.status] : null;
  const isActive = data.isToday && data.status === "worked";

  const dayColor =
    data.isToday
      ? "text-blue-600 font-bold"
      : data.isWeekend === "sun"
        ? "text-rose-300"
        : data.isWeekend === "sat"
          ? "text-blue-300"
          : data.status
            ? "text-zinc-700 font-medium"
            : "text-zinc-400";

  const bgClass = data.isToday
    ? "bg-blue-50 ring-2 ring-blue-500"
    : data.status === "pending"
      ? "bg-amber-50/50"
      : data.status === "approved"
        ? "bg-emerald-50/50"
        : "bg-zinc-50";

  return (
    <div
      className={`h-24 rounded-xl p-2.5 transition-colors ${bgClass} ${config?.border ?? ""} ${
        data.status ? "hover:brightness-95 cursor-pointer" : ""
      }`}
    >
      <span className={`text-xs ${dayColor}`}>{data.day}</span>
      {config && (
        <div className="mt-1.5">
          <p className={`text-[10px] font-medium ${config.labelColor} flex items-center gap-1`}>
            {isActive && (
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
            )}
            {isActive ? "勤務中" : config.label}
          </p>
          {data.startTime && (
            <p className="text-[10px] text-zinc-400 tabular-nums">
              {data.startTime}
              {data.endTime ? ` - ${data.endTime}` : " -"}
            </p>
          )}
          {data.duration && (
            <p className="text-[10px] text-zinc-400">{data.duration}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function CalendarPage() {
  const calendarState = useDemoCollectionState(
    calendar.filter((item) => item.day !== null && item.status),
    {
      errorMessage:
        "カレンダーデータの取得に失敗しました。時間をおいて再読み込みしてください。",
    },
  );

  const renderHeader = () => (
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
  );

  if (calendarState.isLoading) {
    return (
      <div>
        {renderHeader()}
        <SkeletonBlocks />
      </div>
    );
  }

  if (calendarState.error) {
    return (
      <div>
        {renderHeader()}
        <StateMessage
          title="カレンダーを表示できません"
          message={calendarState.error}
          tone="error"
        />
      </div>
    );
  }

  if (calendarState.isEmpty) {
    return (
      <div>
        {renderHeader()}
        <StateMessage
          title="今月の勤務データがありません"
          message="勤務実績や申請が追加されると、ここに反映されます。"
        />
      </div>
    );
  }

  return (
    <div>
      {renderHeader()}

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <button className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm text-zinc-600 hover:bg-zinc-50">
            &larr; 前月
          </button>
          <h3 className="text-xl font-bold text-zinc-900">2026年5月</h3>
          <button className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm text-zinc-600 hover:bg-zinc-50">
            翌月 &rarr;
          </button>
        </div>

        <div className="grid grid-cols-7 mb-2">
          {WEEKDAYS.map((w, i) => (
            <div
              key={w}
              className={`text-center text-xs font-medium py-2 ${
                i === 0
                  ? "text-rose-400"
                  : i === 6
                    ? "text-blue-400"
                    : "text-zinc-500"
              }`}
            >
              {w}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1.5">
          {calendar.map((data, idx) => (
            <DayCell key={idx} data={data} />
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-4 text-xs text-zinc-500">
          {(Object.keys(STATUS_CONFIG) as DayStatus[]).map((key) => (
            <div key={key} className="flex items-center gap-1.5">
              <span className={`h-3 w-1 rounded ${STATUS_CONFIG[key].dotColor}`} />
              {STATUS_CONFIG[key].label}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
