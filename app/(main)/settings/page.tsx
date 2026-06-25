import { Settings } from "lucide-react";

const settingsSections = [
  {
    title: "基本情報",
    rows: [
      ["氏名", "山田 課長"],
      ["メール", "manager@example.com"],
      ["所属", "営業部"],
      ["ロール", "manager"],
    ],
  },
  {
    title: "勤務ルール",
    rows: [
      ["標準勤務時間", "09:00 - 18:00"],
      ["休憩時間", "60分"],
      ["承認通知", "メール + アプリ内通知"],
    ],
  },
];

export default function SettingsPage() {
  return (
    <div>
      <header className="mb-8 rounded-[28px] border border-zinc-200 bg-white px-6 py-6 shadow-sm">
        <div className="flex items-center gap-3">
          <Settings className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            設定
          </h1>
        </div>
        <p className="mt-1 text-sm text-zinc-500">
          プロフィールや勤務ルールの表示を確認するダミー画面です
        </p>
      </header>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        {settingsSections.map((section) => (
          <section
            key={section.title}
            className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-base font-semibold text-zinc-900">
              {section.title}
            </h2>
            <dl className="mt-5 space-y-4">
              {section.rows.map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 rounded-2xl bg-zinc-50 px-4 py-3"
                >
                  <dt className="text-sm text-zinc-500">{label}</dt>
                  <dd className="text-sm font-medium text-zinc-900">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
