import type { AttendanceAction } from "./types";

export function clockIn(timestamp: number = Date.now()): AttendanceAction {
  return { type: "CLOCK_IN", timestamp };
}

export function clockOut(timestamp: number = Date.now()): AttendanceAction {
  return { type: "CLOCK_OUT", timestamp };
}

export function breakStart(timestamp: number = Date.now()): AttendanceAction {
  return { type: "BREAK_START", timestamp };
}

export function breakEnd(timestamp: number = Date.now()): AttendanceAction {
  return { type: "BREAK_END", timestamp };
}

export function reset(): AttendanceAction {
  return { type: "RESET" };
}
