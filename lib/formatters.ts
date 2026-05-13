const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"] as const;

export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const w = WEEKDAYS[date.getDay()];
  return `${y}年${m}月${d}日(${w})`;
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export function formatTimeShort(date: Date): string {
  return date.toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function formatDuration(ms: number): { hours: number; minutes: number } {
  const totalMinutes = Math.floor(ms / 60_000);
  return {
    hours: Math.floor(totalMinutes / 60),
    minutes: totalMinutes % 60,
  };
}

export function formatDurationText(ms: number): string {
  const { hours, minutes } = formatDuration(ms);
  return `${hours}時間 ${String(minutes).padStart(2, "0")}分`;
}
