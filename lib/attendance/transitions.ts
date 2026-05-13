import { type WorkStatus, WORK_STATUS } from "./types";

type TransitionMap = Record<WorkStatus, readonly WorkStatus[]>;

const VALID_TRANSITIONS: TransitionMap = {
  OFF_DUTY: [WORK_STATUS.WORKING],
  WORKING: [WORK_STATUS.BREAK, WORK_STATUS.OFF_DUTY],
  BREAK: [WORK_STATUS.WORKING],
};

export function canTransition(from: WorkStatus, to: WorkStatus): boolean {
  return VALID_TRANSITIONS[from].includes(to);
}

export function assertTransition(from: WorkStatus, to: WorkStatus): void {
  if (from === to) {
    throw new Error(`既に${from}状態です`);
  }
  if (!canTransition(from, to)) {
    throw new Error(`${from} から ${to} への遷移は許可されていません`);
  }
}
