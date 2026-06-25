"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/components/navigation";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-zinc-200 bg-zinc-50/80 md:flex md:flex-col">
      <div className="border-b border-zinc-200 px-6 py-8">
        <p className="text-base font-semibold tracking-tight text-zinc-900">
          勤怠管理
        </p>
        <p className="mt-0.5 text-xs text-zinc-500">Attendance Control</p>
        <div className="mt-6 rounded-2xl bg-blue-600 p-4 text-white shadow-sm">
          <p className="text-xs font-medium text-blue-100">本日のサマリー</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight">96.2%</p>
          <p className="mt-1 text-xs text-blue-100">出勤率 / 未承認 3件</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6">
        <p className="px-3 text-[11px] font-semibold tracking-[0.2em] text-zinc-400">
          MAIN MENU
        </p>
        <ul className="mt-3 space-y-1.5">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active =
              pathname === href || pathname.startsWith(href + "/");
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                    active
                      ? "bg-white text-blue-700 shadow-sm ring-1 ring-blue-100"
                      : "text-zinc-700 hover:bg-white"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      active ? "text-blue-600" : "text-zinc-500"
                    }`}
                  />
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-zinc-200 px-6 py-5">
        <p className="text-sm font-medium text-zinc-900">山田 課長</p>
        <p className="mt-0.5 text-xs text-zinc-500">manager</p>
      </div>
    </aside>
  );
}
