"use client";

type StateMessageProps = {
  readonly title: string;
  readonly message: string;
  readonly tone?: "neutral" | "error";
};

type SkeletonListProps = {
  readonly title: string;
  readonly rows?: number;
};

export function StateMessage({
  title,
  message,
  tone = "neutral",
}: StateMessageProps) {
  const accentClass =
    tone === "error"
      ? "border-rose-200 bg-rose-50 text-rose-700"
      : "border-zinc-200 bg-zinc-50 text-zinc-600";

  return (
    <div
      className={`rounded-[28px] border p-8 text-center shadow-sm ${accentClass}`}
    >
      <p className="text-base font-semibold">{title}</p>
      <p className="mt-2 text-sm leading-6">{message}</p>
    </div>
  );
}

export function SkeletonList({
  title,
  rows = 3,
}: SkeletonListProps) {
  return (
    <section className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="h-6 w-40 animate-pulse rounded-full bg-zinc-200" />
      <p className="mt-4 text-sm font-medium text-zinc-500">{title}</p>
      <div className="mt-4 space-y-3">
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4"
          >
            <div className="h-4 w-32 animate-pulse rounded-full bg-zinc-200" />
            <div className="mt-3 h-3 w-48 animate-pulse rounded-full bg-zinc-200" />
            <div className="mt-2 h-3 w-24 animate-pulse rounded-full bg-zinc-200" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function SkeletonBlocks() {
  return (
    <section className="space-y-6">
      <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="h-7 w-48 animate-pulse rounded-full bg-zinc-200" />
        <div className="mt-3 h-4 w-72 max-w-full animate-pulse rounded-full bg-zinc-200" />
        <div className="mt-2 h-4 w-56 max-w-full animate-pulse rounded-full bg-zinc-200" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm"
          >
            <div className="h-4 w-24 animate-pulse rounded-full bg-zinc-200" />
            <div className="mt-5 h-10 w-28 animate-pulse rounded-full bg-zinc-200" />
          </div>
        ))}
      </div>
    </section>
  );
}
