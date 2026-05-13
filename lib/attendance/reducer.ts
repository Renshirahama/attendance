import type { AttendanceAction, AttendanceRecord, AttendanceState } from "./types";
import { WORK_STATUS } from "./types";
import { assertTransition } from "./transitions";

export const INITIAL_STATE: AttendanceState = {
  status: WORK_STATUS.OFF_DUTY,
  records: [],
  clockInAt: null,
  breakStartAt: null,
  totalBreakMs: 0,
};

function appendRecord(
  records: readonly AttendanceRecord[],
  type: AttendanceRecord["type"],
  timestamp: number,
): readonly AttendanceRecord[] {
  return [
    ...records,
    { id: `${type}-${timestamp}`, type, timestamp },
  ];
}

export function attendanceReducer(
  state: AttendanceState,
  action: AttendanceAction,
): AttendanceState {
  switch (action.type) {
    case "CLOCK_IN": {
      assertTransition(state.status, WORK_STATUS.WORKING);
      return {
        ...state,
        status: WORK_STATUS.WORKING,
        clockInAt: action.timestamp,
        totalBreakMs: 0,
        records: appendRecord(state.records, "CLOCK_IN", action.timestamp),
      };
    }
    case "CLOCK_OUT": {
      assertTransition(state.status, WORK_STATUS.OFF_DUTY);
      return {
        ...state,
        status: WORK_STATUS.OFF_DUTY,
        records: appendRecord(state.records, "CLOCK_OUT", action.timestamp),
      };
    }
    case "BREAK_START": {
      assertTransition(state.status, WORK_STATUS.BREAK);
      return {
        ...state,
        status: WORK_STATUS.BREAK,
        breakStartAt: action.timestamp,
        records: appendRecord(state.records, "BREAK_START", action.timestamp),
      };
    }
    case "BREAK_END": {
      assertTransition(state.status, WORK_STATUS.WORKING);
      const breakMs = state.breakStartAt
        ? action.timestamp - state.breakStartAt
        : 0;
      return {
        ...state,
        status: WORK_STATUS.WORKING,
        breakStartAt: null,
        totalBreakMs: state.totalBreakMs + breakMs,
        records: appendRecord(state.records, "BREAK_END", action.timestamp),
      };
    }
    case "RESET": {
      return INITIAL_STATE;
    }
  }
}
