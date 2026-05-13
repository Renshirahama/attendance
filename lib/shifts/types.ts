// ===== Shift Status =====
export const SHIFT_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export type ShiftStatus = (typeof SHIFT_STATUS)[keyof typeof SHIFT_STATUS];

export const SHIFT_STATUS_LABEL: Record<ShiftStatus, string> = {
  pending: "申請中",
  approved: "承認済み",
  rejected: "却下",
};

// ===== Domain Model =====
export type Shift = {
  readonly id: string;
  readonly userId: string;
  readonly date: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly reason: string;
  readonly note: string;
  readonly status: ShiftStatus;
  readonly createdAt: string;
  readonly updatedAt: string;
};

// ===== Form Data =====
export type ShiftFormInput = {
  readonly date: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly reason: string;
  readonly note: string;
};

// ===== API Types =====
export type CreateShiftRequest = {
  readonly date: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly reason: string;
  readonly note: string;
};

export type CreateShiftResponse = {
  readonly shift: Shift;
};

export type ListShiftsResponse = {
  readonly shifts: readonly Shift[];
};

// ===== Reducer =====
export type ShiftsState = {
  readonly shifts: readonly Shift[];
  readonly isSubmitting: boolean;
  readonly error: string | null;
};

export type ShiftsAction =
  | { readonly type: "SUBMIT_START" }
  | { readonly type: "SUBMIT_SUCCESS"; readonly shift: Shift }
  | { readonly type: "SUBMIT_ERROR"; readonly error: string }
  | { readonly type: "CLEAR_ERROR" }
  | { readonly type: "SET_SHIFTS"; readonly shifts: readonly Shift[] };
