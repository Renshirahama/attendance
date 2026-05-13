"use client";

import { useEffect, useState } from "react";

/**
 * リアルタイム時計 hook
 * - 1秒ごとに現在時刻を更新
 * - SSR では null を返し hydration mismatch を回避
 * - このhookを使うコンポーネントのみ rerender
 */
export function useClock(): Date | null {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());

    const id = setInterval(() => {
      setNow(new Date());
    }, 1_000);

    return () => clearInterval(id);
  }, []);

  return now;
}
