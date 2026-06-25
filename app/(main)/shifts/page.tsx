"use client";

import { Mail } from "lucide-react";
import { useDemoCollectionState } from "@/hooks/use-demo-collection-state";
import { useShiftForm } from "@/hooks/use-shift-form";
import { ShiftForm } from "./_components/shift-form";
import { ShiftHistory } from "./_components/shift-history";

export default function ShiftsPage() {
  const { form, shifts, isSubmitting, error, handleSubmit, clearError } =
    useShiftForm();
  const historyState = useDemoCollectionState(shifts, {
    errorMessage:
      "申請履歴の取得に失敗しました。時間をおいて再読み込みしてください。",
  });

  return (
    <div>
      <header className="mb-8 rounded-[28px] border border-zinc-200 bg-white px-6 py-6 shadow-sm">
        <div className="flex items-center gap-3">
          <Mail className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            申請一覧
          </h1>
        </div>
        <p className="mt-1 text-sm text-zinc-500">
          申請の登録と、自分が出した申請履歴の確認を一つの画面で行います
        </p>
      </header>

      <div className="flex flex-col gap-10 lg:flex-row">
        <ShiftForm
          form={form}
          isSubmitting={isSubmitting}
          error={error}
          onSubmit={handleSubmit}
          onClearError={clearError}
        />
        <ShiftHistory
          shifts={historyState.items}
          isLoading={historyState.isLoading}
          error={historyState.error}
        />
      </div>
    </div>
  );
}
