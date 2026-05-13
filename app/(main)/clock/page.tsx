import { Timer } from "lucide-react";

export default function ClockPage() {
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
        <div className="text-center">
          <p className="text-sm text-zinc-500">2026年5月13日(水)</p>
          <p className="mt-2 text-6xl font-bold tracking-tight text-zinc-900 tabular-nums">
            10:24
          </p>
          <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            勤務中
          </span>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4">
          <button className="rounded-xl bg-blue-600 px-6 py-5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700">
            出勤
          </button>
          <button className="rounded-xl bg-zinc-900 px-6 py-5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-zinc-800">
            退勤
          </button>
          <button className="rounded-xl border border-zinc-200 bg-white px-6 py-5 text-base font-semibold text-zinc-900 transition-colors hover:bg-zinc-50">
            休憩開始
          </button>
          <button className="rounded-xl border border-zinc-200 bg-white px-6 py-5 text-base font-semibold text-zinc-900 transition-colors hover:bg-zinc-50">
            休憩終了
          </button>
        </div>

        <div className="mt-10 border-t border-zinc-100 pt-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-500">今日の勤務時間</span>
            <span className="text-2xl font-semibold tabular-nums text-zinc-900">
              3時間 24分
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-zinc-500">休憩</span>
            <span className="text-sm tabular-nums text-zinc-700">0時間 45分</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-zinc-500">出勤時刻</span>
            <span className="text-sm tabular-nums text-zinc-700">07:00</span>
          </div>
        </div>
      </section>
    </div>
  );
}
