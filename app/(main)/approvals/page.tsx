"use client";

import { useMemo, useState } from "react";
import { BadgeCheck, Check, X } from "lucide-react";
import {
  SkeletonBlocks,
  SkeletonList,
  StateMessage,
} from "@/components/data-state";
import { useDemoCollectionState } from "@/hooks/use-demo-collection-state";

type ApprovalStatus = "pending" | "approved" | "rejected";

type ApprovalRequest = {
  readonly id: string;
  readonly employee: string;
  readonly requestType: string;
  readonly targetDate: string;
  readonly detail: string;
  readonly reason: string;
  readonly status: ApprovalStatus;
};

const initialRequests: readonly ApprovalRequest[] = [
  {
    id: "r1",
    employee: "山田 太郎",
    requestType: "打刻修正",
    targetDate: "2026/05/13",
    detail: "退勤時刻を 17:55 → 18:25 に修正",
    reason: "客先対応で退勤打刻が遅れたため",
    status: "pending",
  },
  {
    id: "r2",
    employee: "佐藤 花",
    requestType: "残業申請",
    targetDate: "2026/05/14",
    detail: "残業 2時間",
    reason: "採用イベント準備",
    status: "pending",
  },
  {
    id: "r3",
    employee: "鈴木 健",
    requestType: "休暇申請",
    targetDate: "2026/05/16",
    detail: "午後休",
    reason: "通院",
    status: "approved",
  },
];

const statusStyles: Record<ApprovalStatus, string> = {
  pending: "bg-amber-50 text-amber-700",
  approved: "bg-emerald-50 text-emerald-700",
  rejected: "bg-rose-50 text-rose-700",
};

const statusLabels: Record<ApprovalStatus, string> = {
  pending: "承認待ち",
  approved: "承認済み",
  rejected: "却下",
};

export default function ApprovalsPage() {
  const [requests, setRequests] =
    useState<readonly ApprovalRequest[]>(initialRequests);
  const [selectedId, setSelectedId] = useState<string>(initialRequests[0]?.id ?? "");
  const approvalsState = useDemoCollectionState(requests, {
    errorMessage:
      "承認データの取得に失敗しました。時間をおいて再読み込みしてください。",
  });

  const selectedRequest =
    approvalsState.items.find((request) => request.id === selectedId) ??
    approvalsState.items[0];

  const pendingCount = useMemo(
    () =>
      approvalsState.items.filter((request) => request.status === "pending")
        .length,
    [approvalsState.items],
  );

  const approvedCount = useMemo(
    () =>
      approvalsState.items.filter((request) => request.status === "approved")
        .length,
    [approvalsState.items],
  );

  const rejectedCount = useMemo(
    () =>
      approvalsState.items.filter((request) => request.status === "rejected")
        .length,
    [approvalsState.items],
  );

  function updateStatus(id: string, status: ApprovalStatus) {
    setRequests((current) =>
      current.map((request) =>
        request.id === id ? { ...request, status } : request,
      ),
    );
  }

  const renderHeader = () => (
    <header className="mb-8 rounded-[28px] border border-zinc-200 bg-white px-6 py-6 shadow-sm">
      <div className="flex items-center gap-3">
        <BadgeCheck className="h-6 w-6 text-blue-600" />
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          承認管理
        </h1>
      </div>
      <p className="mt-1 text-sm text-zinc-500">
        申請内容を確認し、承認または却下まで更新できるダミー画面です
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-blue-50 p-4">
          <p className="text-xs font-medium text-blue-600">承認待ち</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-blue-700">
            {pendingCount}
          </p>
        </div>
        <div className="rounded-2xl bg-emerald-50 p-4">
          <p className="text-xs font-medium text-emerald-600">承認済み</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-emerald-700">
            {approvedCount}
          </p>
        </div>
        <div className="rounded-2xl bg-rose-50 p-4">
          <p className="text-xs font-medium text-rose-600">却下</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-rose-700">
            {rejectedCount}
          </p>
        </div>
      </div>
    </header>
  );

  if (approvalsState.isLoading) {
    return (
      <div>
        {renderHeader()}
        <SkeletonBlocks />
        <div className="mt-6">
          <SkeletonList title="申請データを読み込み中です" rows={3} />
        </div>
      </div>
    );
  }

  if (approvalsState.error) {
    return (
      <div>
        {renderHeader()}
        <StateMessage
          title="承認データを表示できません"
          message={approvalsState.error}
          tone="error"
        />
      </div>
    );
  }

  if (approvalsState.isEmpty) {
    return (
      <div>
        {renderHeader()}
        <StateMessage
          title="承認待ちの申請がありません"
          message="新しい申請が追加されると、ここで確認できます。"
        />
      </div>
    );
  }

  return (
    <div>
      {renderHeader()}

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[28px] border border-zinc-200 bg-white shadow-sm">
          <div className="border-b border-zinc-100 px-6 py-4">
            <h2 className="text-base font-semibold text-zinc-900">
              申請一覧
            </h2>
          </div>
          <div className="divide-y divide-zinc-100">
            {approvalsState.items.map((request) => (
              <button
                key={request.id}
                type="button"
                onClick={() => setSelectedId(request.id)}
                className={`flex w-full items-start justify-between gap-4 px-6 py-4 text-left transition hover:bg-zinc-50 ${
                  selectedRequest?.id === request.id ? "bg-blue-50/80" : ""
                }`}
              >
                <div>
                  <p className="text-sm font-semibold text-zinc-900">
                    {request.employee}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {request.requestType} ・ {request.targetDate}
                  </p>
                  <p className="mt-2 text-sm text-zinc-700">{request.detail}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[request.status]}`}>
                  {statusLabels[request.status]}
                </span>
              </button>
            ))}
          </div>
        </section>

        {selectedRequest ? (
          <section className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-zinc-900">
                  {selectedRequest.employee}
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  {selectedRequest.requestType} ・ {selectedRequest.targetDate}
                </p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[selectedRequest.status]}`}>
                {statusLabels[selectedRequest.status]}
              </span>
            </div>

            <dl className="mt-6 space-y-4">
              <div className="rounded-2xl bg-zinc-50 p-4">
                <dt className="text-xs font-medium text-zinc-500">申請内容</dt>
                <dd className="mt-2 text-sm leading-6 text-zinc-900">
                  {selectedRequest.detail}
                </dd>
              </div>
              <div className="rounded-2xl bg-zinc-50 p-4">
                <dt className="text-xs font-medium text-zinc-500">理由</dt>
                <dd className="mt-2 text-sm leading-6 text-zinc-900">
                  {selectedRequest.reason}
                </dd>
              </div>
            </dl>

            <div className="mt-6 rounded-2xl border border-zinc-200 p-4">
              <label className="block text-sm font-medium text-zinc-700">
                却下理由メモ
              </label>
              <textarea
                rows={4}
                defaultValue="差し戻す場合は理由をここに残す想定"
                className="mt-2 w-full resize-none rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-blue-500"
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => updateStatus(selectedRequest.id, "approved")}
                className="inline-flex h-12 items-center gap-2 rounded-2xl bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Check className="h-4 w-4" />
                承認する
              </button>
              <button
                type="button"
                onClick={() => updateStatus(selectedRequest.id, "rejected")}
                className="inline-flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
              >
                <X className="h-4 w-4" />
                却下する
              </button>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
