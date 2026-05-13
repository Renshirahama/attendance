import { Sidebar } from "@/components/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 bg-white">
        <div className="mx-auto max-w-5xl px-12 py-12">{children}</div>
      </main>
    </div>
  );
}
