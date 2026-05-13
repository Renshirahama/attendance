// ===== Work Status =====
export const WORK_STATUS = {
  OFF_DUTY: "OFF_DUTY",
  WORKING: "WORKING",
  BREAK: "BREAK",
} as const;

export type WorkStatus = (typeof WORK_STATUS)[keyof typeof WORK_STATUS];

// ===== Status Labels =====
export const STATUS_LABEL: Record<WorkStatus, string> = {
  OFF_DUTY: "勤務外",
  WORKING: "勤務中",
  BREAK: "休憩中",
};

// ===== Attendance Record =====
export type AttendanceRecord = {
  readonly id: string;
  readonly type: "CLOCK_IN" | "CLOCK_OUT" | "BREAK_START" | "BREAK_END";
  readonly timestamp: number;
};

// ===== State =====
export type AttendanceState = {
  readonly status: WorkStatus;
  readonly records: readonly AttendanceRecord[];
  readonly clockInAt: number | null;
  readonly breakStartAt: number | null;
  readonly totalBreakMs: number;
};

// ===== Actions =====
export type AttendanceAction =
  | { readonly type: "CLOCK_IN"; readonly timestamp: number }
  | { readonly type: "CLOCK_OUT"; readonly timestamp: number }
  | { readonly type: "BREAK_START"; readonly timestamp: number }
  | { readonly type: "BREAK_END"; readonly timestamp: number }
  | { readonly type: "RESET" };
