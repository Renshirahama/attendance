"use client";

import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Timer,
  ListFilter,
  FileClock,
  BadgeCheck,
  Settings,
} from "lucide-react";

export type NavItem = {
  readonly href: string;
  readonly label: string;
  readonly icon: LucideIcon;
};

export const navItems: readonly NavItem[] = [
  { href: "/dashboard", label: "ダッシュボード", icon: LayoutDashboard },
  { href: "/clock", label: "打刻", icon: Timer },
  { href: "/attendance", label: "勤怠一覧", icon: ListFilter },
  { href: "/shifts", label: "申請一覧", icon: FileClock },
  { href: "/approvals", label: "承認管理", icon: BadgeCheck },
  { href: "/settings", label: "設定", icon: Settings },
];
