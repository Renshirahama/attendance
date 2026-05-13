"use client";

import { useCallback, useReducer } from "react";
import {
  attendanceReducer,
  INITIAL_STATE,
  actions,
  canTransition,
  WORK_STATUS,
  type AttendanceState,
  type WorkStatus,
} from "@/lib/attendance";

type AvailableActions = {
  readonly canClockIn: boolean;
  readonly canClockOut: boolean;
  readonly canBreakStart: boolean;
  readonly canBreakEnd: boolean;
};

type UseAttendanceReturn = {
  readonly state: AttendanceState;
  readonly available: AvailableActions;
  readonly clockIn: () => void;
  readonly clockOut: () => void;
  readonly breakStart: () => void;
  readonly breakEnd: () => void;
  readonly reset: () => void;
  readonly getWorkDurationMs: (now: number) => number;
  readonly getBreakDurationMs: (now: number) => number;
};

function deriveAvailable(status: WorkStatus): AvailableActions {
  return {
    canClockIn: canTransition(status, WORK_STATUS.WORKING) && status === WORK_STATUS.OFF_DUTY,
    canClockOut: canTransition(status, WORK_STATUS.OFF_DUTY),
    canBreakStart: canTransition(status, WORK_STATUS.BREAK),
    canBreakEnd: canTransition(status, WORK_STATUS.WORKING) && status === WORK_STATUS.BREAK,
  };
}

export function useAttendance(): UseAttendanceReturn {
  const [state, dispatch] = useReducer(attendanceReducer, INITIAL_STATE);

  const clockIn = useCallback(() => dispatch(actions.clockIn()), []);
  const clockOut = useCallback(() => dispatch(actions.clockOut()), []);
  const breakStart = useCallback(() => dispatch(actions.breakStart()), []);
  const breakEnd = useCallback(() => dispatch(actions.breakEnd()), []);
  const reset = useCallback(() => dispatch(actions.reset()), []);

  const getWorkDurationMs = useCallback(
    (now: number): number => {
      if (state.clockInAt === null) return 0;
      const elapsed = now - state.clockInAt;
      const currentBreakMs =
        state.breakStartAt !== null ? now - state.breakStartAt : 0;
      return Math.max(0, elapsed - state.totalBreakMs - currentBreakMs);
    },
    [state.clockInAt, state.breakStartAt, state.totalBreakMs],
  );

  const getBreakDurationMs = useCallback(
    (now: number): number => {
      const currentBreakMs =
        state.breakStartAt !== null ? now - state.breakStartAt : 0;
      return state.totalBreakMs + currentBreakMs;
    },
    [state.breakStartAt, state.totalBreakMs],
  );

  return {
    state,
    available: deriveAvailable(state.status),
    clockIn,
    clockOut,
    breakStart,
    breakEnd,
    reset,
    getWorkDurationMs,
    getBreakDurationMs,
  };
}
