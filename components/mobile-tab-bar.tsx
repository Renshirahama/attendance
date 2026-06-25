"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/components/navigation";

export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white/95 backdrop-blur md:hidden">
      <ul className="grid grid-cols-6">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex min-h-16 flex-col items-center justify-center gap-1 px-1 text-[10px] font-medium transition-colors ${
                  active ? "text-blue-700" : "text-zinc-500"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${
                    active ? "text-blue-600" : "text-zinc-400"
                  }`}
                />
                <span className="text-center leading-tight">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
