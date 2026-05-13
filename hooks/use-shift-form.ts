"use client";

import { useCallback, useReducer } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  shiftFormSchema,
  type ShiftFormSchema,
  type Shift,
  createShift,
  shiftsReducer,
  INITIAL_SHIFTS_STATE,
} from "@/lib/shifts";

type UseShiftFormReturn = {
  readonly form: ReturnType<typeof useForm<ShiftFormSchema>>;
  readonly shifts: readonly Shift[];
  readonly isSubmitting: boolean;
  readonly error: string | null;
  readonly handleSubmit: () => void;
  readonly clearError: () => void;
};

const DUMMY_SHIFTS: readonly Shift[] = [
  {
    id: "s1",
    userId: "current-user",
    date: "2026-05-15",
    startTime: "09:00",
    endTime: "18:00",
    reason: "通常勤務",
    note: "",
    status: "pending",
    createdAt: "2026-05-13T00:00:00Z",
    updatedAt: "2026-05-13T00:00:00Z",
  },
  {
    id: "s2",
    userId: "current-user",
    date: "2026-05-16",
    startTime: "10:00",
    endTime: "19:00",
    reason: "休日出勤",
    note: "プロジェクト納期のため",
    status: "approved",
    createdAt: "2026-05-12T00:00:00Z",
    updatedAt: "2026-05-12T00:00:00Z",
  },
  {
    id: "s3",
    userId: "current-user",
    date: "2026-05-12",
    startTime: "13:00",
    endTime: "18:00",
    reason: "遅刻申請",
    note: "授業のため",
    status: "rejected",
    createdAt: "2026-05-10T00:00:00Z",
    updatedAt: "2026-05-11T00:00:00Z",
  },
];

export function useShiftForm(): UseShiftFormReturn {
  const [state, dispatch] = useReducer(shiftsReducer, {
    ...INITIAL_SHIFTS_STATE,
    shifts: DUMMY_SHIFTS,
  });

  const form = useForm<ShiftFormSchema>({
    resolver: zodResolver(shiftFormSchema),
    defaultValues: {
      date: "",
      startTime: "09:00",
      endTime: "18:00",
      reason: "",
      note: "",
    },
  });

  const handleSubmit = useCallback(() => {
    form.handleSubmit(async (data) => {
      dispatch({ type: "SUBMIT_START" });
      try {
        const { shift } = await createShift({
          date: data.date,
          startTime: data.startTime,
          endTime: data.endTime,
          reason: data.reason,
          note: data.note,
        });
        dispatch({ type: "SUBMIT_SUCCESS", shift });
        form.reset();
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "申請に失敗しました";
        dispatch({ type: "SUBMIT_ERROR", error: message });
      }
    })();
  }, [form]);

  const clearError = useCallback(() => {
    dispatch({ type: "CLEAR_ERROR" });
  }, []);

  return {
    form,
    shifts: state.shifts,
    isSubmitting: state.isSubmitting,
    error: state.error,
    handleSubmit,
    clearError,
  };
}
