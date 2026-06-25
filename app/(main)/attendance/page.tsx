"use client";

import { useMemo, useState } from "react";
import { ListFilter, Search } from "lucide-react";
import { SkeletonList, StateMessage } from "@/components/data-state";
import { useDemoCollectionState } from "@/hooks/use-demo-collection-state";

type AttendanceStatus = "勤務中" | "退勤" | "休憩中" | "未出勤";

type AttendanceRow = {
  readonly id: string;
  readonly date: string;
  readonly employee: string;
  readonly department: string;
  readonly clockIn: string;
  readonly clockOut: string;
  readonly total: string;
  readonly status: AttendanceStatus;
};

const attendanceRows: readonly AttendanceRow[] = [
  { id: "a1", date: "2026/05/13", employee: "山田 太郎", department: "営業", clockIn: "08:55", clockOut: "18:02", total: "8h12m", status: "退勤" },
  { id: "a2", date: "2026/05/13", employee: "佐藤 花", department: "人事", clockIn: "09:08", clockOut: "—", total: "6h42m", status: "勤務中" },
  { id: "a3", date: "2026/05/13", employee: "鈴木 健", department: "開発", clockIn: "09:15", clockOut: "—", total: "3h10m", status: "休憩中" },
  { id: "a4", date: "2026/05/13", employee: "田中 美咲", department: "営業", clockIn: "—", clockOut: "—", total: "0h00m", status: "未出勤" },
  { id: "a5", date: "2026/05/12", employee: "山田 太郎", department: "営業", clockIn: "08:57", clockOut: "18:10", total: "8h31m", status: "退勤" },
  { id: "a6", date: "2026/05/12", employee: "佐藤 花", department: "人事", clockIn: "09:02", clockOut: "17:41", total: "7h44m", status: "退勤" },
];

const statusStyles: Record<AttendanceStatus, string> = {
  勤務中: "bg-emerald-50 text-emerald-700",
  退勤: "bg-zinc-100 text-zinc-700",
  休憩中: "bg-amber-50 text-amber-700",
  未出勤: "bg-rose-50 text-rose-700",
};

const statuses = ["すべて", "勤務中", "退勤", "休憩中", "未出勤"] as const;

export default function AttendancePage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof statuses)[number]>("すべて");
  const attendanceState = useDemoCollectionState(attendanceRows, {
    errorMessage:
      "勤怠データの取得に失敗しました。時間をおいて再読み込みしてください。",
  });

  const filteredRows = useMemo(() => {
    return attendanceState.items.filter((row) => {
      const matchQuery =
        query.length === 0 ||
        row.employee.includes(query) ||
        row.department.includes(query) ||
        row.date.includes(query);
      const matchStatus = status === "すべて" || row.status === status;
      return matchQuery && matchStatus;
    });
  }, [attendanceState.items, query, status]);

  const renderHeader = () => (
    <header className="mb-8 rounded-[28px] border border-zinc-200 bg-white px-6 py-6 shadow-sm">
      <div className="flex items-center gap-3">
        <ListFilter className="h-6 w-6 text-blue-600" />
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          勤怠一覧
        </h1>
      </div>
      <p className="mt-1 text-sm text-zinc-500">
        日付・従業員名・状態で検索しながら勤務実績を確認できます
      </p>

      <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_auto]">
        <label className="flex h-12 items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4">
          <Search className="h-4 w-4 text-zinc-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="氏名・部署・日付で検索"
            className="w-full bg-transparent text-sm text-zinc-900 outline-none"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {statuses.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setStatus(item)}
              className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
                status === item
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </header>
  );

  if (attendanceState.isLoading) {
    return (
      <div>
        {renderHeader()}
        <SkeletonList title="勤怠データを読み込み中です" rows={4} />
      </div>
    );
  }

  if (attendanceState.error) {
    return (
      <div>
        {renderHeader()}
        <StateMessage
          title="勤怠一覧を表示できません"
          message={attendanceState.error}
          tone="error"
        />
      </div>
    );
  }

  if (attendanceState.isEmpty) {
    return (
      <div>
        {renderHeader()}
        <StateMessage
          title="勤怠データがありません"
          message="まだ表示できる勤怠データが登録されていません。"
        />
      </div>
    );
  }

  if (filteredRows.length === 0) {
    return (
      <div>
        {renderHeader()}
        <StateMessage
          title="検索結果がありません"
          message="条件に合う勤怠データが見つかりませんでした。"
        />
      </div>
    );
  }

  return (
    <div>
      {renderHeader()}

      <section className="rounded-[28px] border border-zinc-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
          <div>
            <h2 className="text-base font-semibold text-zinc-900">
              検索結果
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              {filteredRows.length} 件の勤怠データ
            </p>
          </div>
          <button className="rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
            CSV出力
          </button>
        </div>

        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-left text-xs font-medium text-zinc-500">
              <tr>
                <th className="px-6 py-3">日付</th>
                <th className="px-6 py-3">氏名</th>
                <th className="px-6 py-3">部署</th>
                <th className="px-6 py-3">出勤</th>
                <th className="px-6 py-3">退勤</th>
                <th className="px-6 py-3">勤務時間</th>
                <th className="px-6 py-3">状態</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredRows.map((row) => (
                <tr key={row.id}>
                  <td className="px-6 py-4 text-zinc-600">{row.date}</td>
                  <td className="px-6 py-4 font-medium text-zinc-900">{row.employee}</td>
                  <td className="px-6 py-4 text-zinc-600">{row.department}</td>
                  <td className="px-6 py-4 tabular-nums text-zinc-700">{row.clockIn}</td>
                  <td className="px-6 py-4 tabular-nums text-zinc-700">{row.clockOut}</td>
                  <td className="px-6 py-4 tabular-nums font-medium text-zinc-900">{row.total}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[row.status]}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 p-4 lg:hidden">
          {filteredRows.map((row) => (
            <article
              key={row.id}
              className="rounded-2xl border border-zinc-200 bg-zinc-50/60 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-zinc-900">{row.employee}</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {row.date} ・ {row.department}
                  </p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[row.status]}`}>
                  {row.status}
                </span>
              </div>
              <dl className="mt-4 grid grid-cols-3 gap-3 text-xs">
                <div>
                  <dt className="text-zinc-400">出勤</dt>
                  <dd className="mt-1 font-medium text-zinc-800">{row.clockIn}</dd>
                </div>
                <div>
                  <dt className="text-zinc-400">退勤</dt>
                  <dd className="mt-1 font-medium text-zinc-800">{row.clockOut}</dd>
                </div>
                <div>
                  <dt className="text-zinc-400">勤務時間</dt>
                  <dd className="mt-1 font-medium text-zinc-800">{row.total}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
