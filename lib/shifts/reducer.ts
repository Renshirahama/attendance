import type { ShiftsAction, ShiftsState } from "./types";

export const INITIAL_SHIFTS_STATE: ShiftsState = {
  shifts: [],
  isSubmitting: false,
  error: null,
};

export function shiftsReducer(
  state: ShiftsState,
  action: ShiftsAction,
): ShiftsState {
  switch (action.type) {
    case "SUBMIT_START": {
      return { ...state, isSubmitting: true, error: null };
    }
    case "SUBMIT_SUCCESS": {
      return {
        ...state,
        isSubmitting: false,
        shifts: [action.shift, ...state.shifts],
      };
    }
    case "SUBMIT_ERROR": {
      return { ...state, isSubmitting: false, error: action.error };
    }
    case "CLEAR_ERROR": {
      return { ...state, error: null };
    }
    case "SET_SHIFTS": {
      return { ...state, shifts: action.shifts };
    }
  }
}
