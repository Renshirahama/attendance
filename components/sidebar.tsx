"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Timer,
  Mail,
  CalendarDays,
  FilePenLine,
  Monitor,
  type LucideIcon,
} from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const items: NavItem[] = [
  { href: "/clock", label: "打刻", icon: Timer },
  { href: "/shifts", label: "シフト申請", icon: Mail },
  { href: "/calendar", label: "カレンダー", icon: CalendarDays },
  { href: "/reports", label: "日報", icon: FilePenLine },
  { href: "/dashboard", label: "ダッシュボード", icon: Monitor },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-zinc-200 bg-white">
      <div className="px-6 py-6">
        <p className="text-base font-semibold tracking-tight text-zinc-900">
          勤怠管理
        </p>
        <p className="mt-0.5 text-xs text-zinc-500">Attendance</p>
      </div>

      <nav className="px-3 pb-6">
        <ul className="space-y-1">
          {items.map(({ href, label, icon: Icon }) => {
            const active =
              pathname === href || pathname.startsWith(href + "/");
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-blue-50 text-blue-700"
                      : "text-zinc-700 hover:bg-zinc-50"
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
    </aside>
  );
}
