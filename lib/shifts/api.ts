import type { CreateShiftRequest, CreateShiftResponse, Shift } from "./types";

function generateId(): string {
  return `shift-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Mock API - 将来的に実際のAPIエンドポイントに差し替え
 */
export async function createShift(
  request: CreateShiftRequest,
): Promise<CreateShiftResponse> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const now = new Date().toISOString();
  const shift: Shift = {
    id: generateId(),
    userId: "current-user",
    date: request.date,
    startTime: request.startTime,
    endTime: request.endTime,
    reason: request.reason,
    note: request.note,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };

  return { shift };
}
