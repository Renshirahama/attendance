"use client";

import { Mail } from "lucide-react";
import { useShiftForm } from "@/hooks/use-shift-form";
import { ShiftForm } from "./_components/shift-form";
import { ShiftHistory } from "./_components/shift-history";

export default function ShiftsPage() {
  const { form, shifts, isSubmitting, error, handleSubmit, clearError } =
    useShiftForm();

  return (
    <div>
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <Mail className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            シフト申請
          </h1>
        </div>
        <p className="mt-1 text-sm text-zinc-500">
          希望するシフトを申請し、管理者の承認を受けます
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
        <ShiftHistory shifts={shifts} />
      </div>
    </div>
  );
}
