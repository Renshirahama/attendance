import { Mail } from "lucide-react";

type ShiftStatus = "pending" | "approved" | "rejected";

const dummyShifts: {
  id: string;
  date: string;
  start: string;
  end: string;
  note: string;
  status: ShiftStatus;
}[] = [
  {
    id: "s1",
    date: "2026-05-15 (金)",
    start: "09:00",
    end: "18:00",
    note: "通常勤務",
    status: "pending",
  },
  {
    id: "s2",
    date: "2026-05-16 (土)",
    start: "10:00",
    end: "19:00",
    note: "",
    status: "approved",
  },
  {
    id: "s3",
    date: "2026-05-12 (火)",
    start: "13:00",
    end: "18:00",
    note: "授業のため遅刻",
    status: "rejected",
  },
];

const statusBadge: Record<ShiftStatus, { label: string; cls: string }> = {
  pending: { label: "申請中", cls: "bg-amber-50 text-amber-700" },
  approved: { label: "承認済み", cls: "bg-emerald-50 text-emerald-700" },
  rejected: { label: "却下", cls: "bg-rose-50 text-rose-700" },
};

export default function ShiftsPage() {
  return (
    <div>
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <Mail className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            シフト申請
          </h1>
        </div>
        <p className="mt-1 text-sm text-zinc-500">
          希望するシフトを申請し、管理者の承認を受けます
        </p>
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h2 className="text-base font-semibold text-zinc-900">新規申請</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-zinc-700">
              日付
            </label>
            <input
              type="date"
              defaultValue="2026-05-20"
              className="mt-1.5 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-zinc-700">
                開始
              </label>
              <input
                type="time"
                defaultValue="09:00"
                className="mt-1.5 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700">
                終了
              </label>
              <input
                type="time"
                defaultValue="18:00"
                className="mt-1.5 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-zinc-700">
              メモ
            </label>
            <textarea
              rows={3}
              placeholder="希望理由などがあれば記入"
              className="mt-1.5 w-full resize-none rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
            申請する
          </button>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-base font-semibold text-zinc-900">申請履歴</h2>
        <ul className="mt-4 divide-y divide-zinc-100 rounded-2xl border border-zinc-200 bg-white shadow-sm">
          {dummyShifts.map((s) => {
            const b = statusBadge[s.status];
            return (
              <li
                key={s.id}
                className="flex items-center justify-between px-6 py-4"
              >
                <div>
                  <p className="text-sm font-medium text-zinc-900">{s.date}</p>
                  <p className="mt-0.5 text-sm tabular-nums text-zinc-600">
                    {s.start} 〜 {s.end}
                  </p>
                  {s.note && (
                    <p className="mt-1 text-xs text-zinc-500">{s.note}</p>
                  )}
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${b.cls}`}
                >
                  {b.label}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
