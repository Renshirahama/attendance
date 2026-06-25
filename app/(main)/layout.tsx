import { Sidebar } from "@/components/sidebar";
import { MobileTabBar } from "@/components/mobile-tab-bar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-100/70">
      <Sidebar />
      <main className="flex-1 bg-zinc-100/40">
        <div className="mx-auto min-h-screen max-w-7xl px-4 py-6 pb-24 sm:px-6 lg:px-10 lg:py-10 lg:pb-10">
          {children}
        </div>
      </main>
      <MobileTabBar />
    </div>
  );
}
