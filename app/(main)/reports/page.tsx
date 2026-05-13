import { FilePenLine } from "lucide-react";

export default function ReportsPage() {
  return (
    <div>
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <FilePenLine className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            日報
          </h1>
        </div>
        <p className="mt-1 text-sm text-zinc-500">
          本日の業務内容を記録し、管理者と共有します
        </p>
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-zinc-900">
            2026年5月13日(水) の日報
          </h2>
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
            下書き
          </span>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-700">
              今日やったこと
            </label>
            <textarea
              rows={3}
              defaultValue={
                "・打刻画面のレイアウト調整\n・シフト申請フォームの実装\n・チームMTG参加"
              }
              className="mt-1.5 w-full resize-none rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700">
              学んだこと
            </label>
            <textarea
              rows={3}
              defaultValue={
                "Next.js App Router のレイアウト共有方法。Server Componentの境界に注意。"
              }
              className="mt-1.5 w-full resize-none rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700">
              困っていること
            </label>
            <textarea
              rows={3}
              defaultValue={"RLSの設計でadminの判定方法を迷っている。"}
              className="mt-1.5 w-full resize-none rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700">
              明日やること
            </label>
            <textarea
              rows={3}
              defaultValue={
                "・カレンダー画面の出勤実績表示\n・ダッシュボードの集計クエリ"
              }
              className="mt-1.5 w-full resize-none rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button className="rounded-lg border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
            下書き保存
          </button>
          <button className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
            提出
          </button>
        </div>

        <div className="mt-8 rounded-xl border border-zinc-100 bg-zinc-50 p-5">
          <p className="text-xs font-medium text-zinc-500">管理者コメント</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-800">
            お疲れさまでした。RLSの件は明日のMTGで一緒に整理しましょう。
          </p>
          <p className="mt-2 text-xs text-zinc-500">— 山田 管理者</p>
        </div>
      </section>
    </div>
  );
}
