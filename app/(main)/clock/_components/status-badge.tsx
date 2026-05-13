import { STATUS_LABEL, type WorkStatus, WORK_STATUS } from "@/lib/attendance";

type StatusBadgeProps = {
  readonly status: WorkStatus;
};

const STYLE: Record<WorkStatus, { bg: string; text: string; dot: string }> = {
  OFF_DUTY: {
    bg: "bg-zinc-100",
    text: "text-zinc-700",
    dot: "bg-zinc-400",
  },
  WORKING: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  BREAK: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const style = STYLE[status];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${style.bg} ${style.text}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${style.dot} ${status === WORK_STATUS.WORKING ? "animate-pulse" : ""}`}
      />
      {STATUS_LABEL[status]}
    </span>
  );
}
