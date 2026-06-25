import Link from "next/link";
import { ShieldCheck, Sparkles, TimerReset } from "lucide-react";

const demoAccounts = [
  { role: "manager", email: "manager@example.com", password: "demo1234" },
  { role: "employee", email: "employee@example.com", password: "demo1234" },
];

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-zinc-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-10 px-4 py-10 lg:flex-row lg:items-center lg:px-6">
        <section className="max-w-xl flex-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700">
            <Sparkles className="h-4 w-4" />
            勤怠管理アプリ
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
            必要な数字と状態が
            <br />
            すぐ見える勤怠管理
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-zinc-600">
            従業員は打刻と申請を迷わず行え、管理者は一覧・承認・ダッシュボードで全体状況をすぐ把握できる、業務アプリ向けのダミー画面です。
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
              <TimerReset className="h-5 w-5 text-blue-600" />
              <p className="mt-3 text-sm font-semibold text-zinc-900">打刻</p>
              <p className="mt-1 text-xs leading-5 text-zinc-500">
                出勤・退勤・当日履歴
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
              <p className="mt-3 text-sm font-semibold text-zinc-900">承認管理</p>
              <p className="mt-1 text-xs leading-5 text-zinc-500">
                登録から更新まで一連で確認
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <p className="mt-3 text-sm font-semibold text-zinc-900">
                ダッシュボード
              </p>
              <p className="mt-1 text-xs leading-5 text-zinc-500">
                KPI と承認待ちを即確認
              </p>
            </div>
          </div>
        </section>

        <section className="w-full max-w-lg rounded-[28px] border border-zinc-200 bg-white p-6 shadow-xl shadow-blue-100/60 sm:p-8">
          <div className="mb-8">
            <p className="text-sm font-medium text-blue-700">Sign in</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
              ダミー環境にログイン
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-500">
              認証はダミーです。ログイン後はダッシュボードを最初に表示します。
            </p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                メールアドレス
              </label>
              <input
                type="email"
                defaultValue={demoAccounts[0].email}
                className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none transition focus:border-blue-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                パスワード
              </label>
              <input
                type="password"
                defaultValue={demoAccounts[0].password}
                className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none transition focus:border-blue-500"
              />
            </div>

            <Link
              href="/dashboard"
              className="flex h-14 w-full items-center justify-center rounded-2xl bg-blue-600 text-base font-semibold text-white transition hover:bg-blue-700"
            >
              ログインしてダッシュボードへ
            </Link>
          </form>

          <div className="mt-8 rounded-2xl bg-zinc-50 p-4">
            <p className="text-xs font-semibold tracking-[0.2em] text-zinc-400">
              DEMO ACCOUNTS
            </p>
            <ul className="mt-3 space-y-3">
              {demoAccounts.map((account) => (
                <li
                  key={account.role}
                  className="rounded-2xl border border-zinc-200 bg-white px-4 py-3"
                >
                  <p className="text-sm font-semibold text-zinc-900">
                    {account.role}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">{account.email}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">
                    password: {account.password}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
