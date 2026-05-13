"use client";

import { useClock } from "@/hooks/use-clock";
import { formatDate, formatTime } from "@/lib/formatters";

/**
 * リアルタイム時計コンポーネント
 * - useClock により1秒ごとに更新
 * - このコンポーネントのみ rerender される
 */
export function ClockDisplay() {
  const now = useClock();

  if (now === null) {
    return (
      <div className="text-center">
        <p className="text-sm text-zinc-500">&nbsp;</p>
        <p className="mt-2 text-6xl font-bold tracking-tight text-zinc-900 tabular-nums">
          --:--:--
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="text-sm text-zinc-500">{formatDate(now)}</p>
      <p className="mt-2 text-6xl font-bold tracking-tight text-zinc-900 tabular-nums">
        {formatTime(now)}
      </p>
    </div>
  );
}
