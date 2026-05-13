import { Monitor } from "lucide-react";

const stats = [
  { label: "今日の出勤者", value: "12", unit: "人", accent: "text-blue-600" },
  { label: "勤務中", value: "8", unit: "人", accent: "text-emerald-600" },
  { label: "未提出日報", value: "3", unit: "件", accent: "text-amber-600" },
  { label: "承認待ちシフト", value: "5", unit: "件", accent: "text-rose-600" },
];

const todayAttendance = [
  { name: "佐藤 太郎", role: "社員", clockIn: "08:55", status: "勤務中" },
  { name: "鈴木 花子", role: "インターン", clockIn: "09:02", status: "休憩中" },
  { name: "高橋 健", role: "アルバイト", clockIn: "10:00", status: "勤務中" },
  { name: "田中 美咲", role: "社員", clockIn: "09:15", status: "退勤" },
  { name: "渡辺 翔", role: "インターン", clockIn: "—", status: "未出勤" },
];

const pendingShifts = [
  { name: "佐藤 太郎", date: "2026-05-15", time: "09:00 - 18:00" },
  { name: "鈴木 花子", date: "2026-05-16", time: "10:00 - 17:00" },
  { name: "田中 美咲", date: "2026-05-17", time: "13:00 - 22:00" },
];

const statusStyle: Record<string, string> = {
  勤務中: "bg-emerald-50 text-emerald-700",
  休憩中: "bg-amber-50 text-amber-700",
  退勤: "bg-zinc-100 text-zinc-700",
  未出勤: "bg-rose-50 text-rose-700",
};

export default function DashboardPage() {
  return (
    <div>
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <Monitor className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            ダッシュボード
          </h1>
        </div>
        <p className="mt-1 text-sm text-zinc-500">
          メンバー全体の勤務状況・申請を一覧で確認できます
        </p>
      </header>

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
          >
            <p className="text-xs font-medium text-zinc-500 whitespace-nowrap text-center">{s.label}</p>
            <p className="mt-4 flex items-baseline justify-center gap-1">
              <span
                className={`text-4xl font-bold tracking-tight tabular-nums ${s.accent}`}
              >
                {s.value}
              </span>
              <span className="text-sm text-zinc-500">{s.unit}</span>
            </p>
          </div>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="text-base font-semibold text-zinc-900">
          今日の勤務状況
        </h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-left text-xs font-medium text-zinc-500">
              <tr>
                <th className="px-6 py-3">名前</th>
                <th className="px-6 py-3">区分</th>
                <th className="px-6 py-3">出勤時刻</th>
                <th className="px-6 py-3">ステータス</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {todayAttendance.map((a) => (
                <tr key={a.name}>
                  <td className="px-6 py-3.5 font-medium text-zinc-900">
                    {a.name}
                  </td>
                  <td className="px-6 py-3.5 text-zinc-600">{a.role}</td>
                  <td className="px-6 py-3.5 tabular-nums text-zinc-700">
                    {a.clockIn}
                  </td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        statusStyle[a.status] ?? "bg-zinc-100 text-zinc-700"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-base font-semibold text-zinc-900">
          承認待ちのシフト申請
        </h2>
        <ul className="mt-4 divide-y divide-zinc-100 rounded-2xl border border-zinc-200 bg-white shadow-sm">
          {pendingShifts.map((s, i) => (
            <li
              key={i}
              className="flex items-center justify-between px-6 py-4"
            >
              <div>
                <p className="text-sm font-medium text-zinc-900">{s.name}</p>
                <p className="mt-0.5 text-sm tabular-nums text-zinc-600">
                  {s.date} ・ {s.time}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
                  却下
                </button>
                <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700">
                  承認
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
