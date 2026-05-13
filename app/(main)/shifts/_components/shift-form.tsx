import type { UseFormReturn } from "react-hook-form";
import type { ShiftFormSchema } from "@/lib/shifts";
import { FormField } from "./form-field";

type ShiftFormProps = {
  readonly form: UseFormReturn<ShiftFormSchema>;
  readonly isSubmitting: boolean;
  readonly error: string | null;
  readonly onSubmit: () => void;
  readonly onClearError: () => void;
};

const INPUT_CLASS =
  "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-blue-500 disabled:bg-zinc-50 disabled:text-zinc-400";

export function ShiftForm({
  form,
  isSubmitting,
  error,
  onSubmit,
  onClearError,
}: ShiftFormProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm lg:w-1/2">
      <h2 className="text-base font-semibold text-zinc-900">新規申請</h2>

      {error && (
        <div
          className="mt-4 flex items-center justify-between rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700"
          role="alert"
        >
          <span>{error}</span>
          <button
            type="button"
            onClick={onClearError}
            className="text-rose-500 hover:text-rose-700"
            aria-label="エラーを閉じる"
          >
            &times;
          </button>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        noValidate
        className="mt-5 grid gap-5"
      >
        <FormField label="日付" error={errors.date?.message} required>
          <input
            type="date"
            disabled={isSubmitting}
            className={INPUT_CLASS}
            {...register("date")}
          />
        </FormField>

        <div className="grid grid-cols-2 gap-3">
          <FormField
            label="開始時間"
            error={errors.startTime?.message}
            required
          >
            <input
              type="time"
              disabled={isSubmitting}
              className={INPUT_CLASS}
              {...register("startTime")}
            />
          </FormField>
          <FormField
            label="終了時間"
            error={errors.endTime?.message}
            required
          >
            <input
              type="time"
              disabled={isSubmitting}
              className={INPUT_CLASS}
              {...register("endTime")}
            />
          </FormField>
        </div>

        <FormField label="理由" error={errors.reason?.message} required>
          <input
            type="text"
            placeholder="例: 通常勤務、遅刻申請、休日出勤"
            disabled={isSubmitting}
            className={INPUT_CLASS}
            {...register("reason")}
          />
        </FormField>

        <FormField label="メモ" error={errors.note?.message}>
          <textarea
            rows={3}
            placeholder="補足事項があれば記入"
            disabled={isSubmitting}
            className={`${INPUT_CLASS} resize-none`}
            {...register("note")}
          />
        </FormField>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "送信中..." : "申請する"}
          </button>
        </div>
      </form>
    </section>
  );
}
