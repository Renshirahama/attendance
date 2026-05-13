import { z } from "zod";

export const shiftFormSchema = z
  .object({
    date: z
      .string()
      .min(1, "日付は必須です")
      .refine((val) => !isNaN(Date.parse(val)), "有効な日付を入力してください"),
    startTime: z
      .string()
      .min(1, "開始時間は必須です")
      .regex(/^\d{2}:\d{2}$/, "HH:MM 形式で入力してください"),
    endTime: z
      .string()
      .min(1, "終了時間は必須です")
      .regex(/^\d{2}:\d{2}$/, "HH:MM 形式で入力してください"),
    reason: z
      .string()
      .min(1, "理由は必須です")
      .max(100, "理由は100文字以内で入力してください")
      .transform((val) => val.trim()),
    note: z
      .string()
      .max(500, "メモは500文字以内で入力してください")
      .transform((val) => val.trim()),
  })
  .refine((data) => data.startTime < data.endTime, {
    message: "終了時間は開始時間より後にしてください",
    path: ["endTime"],
  });

export type ShiftFormSchema = z.infer<typeof shiftFormSchema>;
